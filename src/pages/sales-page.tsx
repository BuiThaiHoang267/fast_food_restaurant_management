import {Button, Divider, IconButton, Tab, Tabs, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {OrderProductCard, SalesProductCard} from "../components/card.tsx";
import {bg_blue_600, bg_blue_700, bg_blue_800, bg_grey_600, color_white} from "../common/constant.ts";
import {useEffect, useMemo, useState} from "react";
import React from "react";
import CategoryDTO from "../dtos/CategoryDTO.ts";
import {CategoryService} from "../services/CategoryService.ts";
import ProductDTO from "../dtos/ProductDTO.ts";
import {productService} from "../services/ProductService.ts";
import {OrderItemDTO} from "../dtos/OrderItemDTO.ts";
import {OrderDTO} from "../dtos/OrderDTO.ts";
import {InputSearchProduct} from "../components/input.tsx";
import DialogPayment from "../components/dialog-payment.tsx";

type Orders = OrderItemDTO[][]; // Array of product arrays for each tab

const SalesPage = () => {

    const [selectedCategory, setSelectedCategory] = useState<CategoryDTO>();
    const [tabValue, setTabValue] = useState(0); // Track selected tab
    const [tabNames, setTabNames] = useState(["00"]);
    const [isEditing, setIsEditing] = useState<number | null>(null); // Track the tab being edited
    const [orders, setOrders] = useState<Orders>([[]]); // Initialize with an empty order for the first tab
    const totals = useMemo(() => {
        const currentTabProducts = orders[tabValue] || [];
        const totalQuantity = currentTabProducts.reduce((sum, product) => sum + (product.quantity || 1), 0);
        const totalPrice = currentTabProducts.reduce((sum, product) => sum + (product.productPrice * (product.quantity || 1)), 0);

        return { totalQuantity, totalPrice };
    }, [orders, tabValue]);
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [orderRequest, setOrderRequest] = useState<OrderDTO>(
        OrderDTO.constructorOrderDTO()
    );
    const [textSearch, setTextSearch] = useState<string>("");
    const [productSearch, setProductSearch] = useState<ProductDTO[]>([]);
    const [openDialogPayment, setOpenDialogPayment] = useState(false);

    useEffect(() => {
        fetchAllCategory();
        fetchProductByCategoryId(0);
    }, []);

    useEffect(() => {
        setSelectedCategory(categories[0]);
    }, [categories]);

    const fetchAllCategory = async () => {
        try {
            const allCategory = await CategoryService.getAllCategory();
            const all = new CategoryDTO(0,"Tất cả","");
            setCategories([all, ...allCategory]);
        }
        catch (error) {
            console.error(error);
        }
    }


    const fetchProductByCategoryId = async (categoryId: number) => {
        try {
            const products = await productService.getProductByCategoryId(categoryId);
            setProducts(products);
            if(productSearch.length === 0 && categoryId === 0) {
                setProductSearch(products);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleCloseDialogPayment = (value: boolean) => {
        setOpenDialogPayment(false);
        if(value){
            handleDeleteTab(tabValue);
        }
    }

    const handleCategoryClick = (category: CategoryDTO) => {
        setSelectedCategory(category);
        fetchProductByCategoryId(category.id);
    }
    const handleProductClick = (product: ProductDTO) => {
        setOrders((prevOrders) => {
            const updatedOrders = [...prevOrders];
            const currentTabProducts = updatedOrders[tabValue] || [];

            // Check if the product already exists in the current tab
            const existingProductIndex = currentTabProducts.findIndex(
                (p) => p.productId === product.id
            );

            if (existingProductIndex !== -1) {
                // Increment the quantity if the product exists
                currentTabProducts[existingProductIndex].quantity! += 1;
            } else {
                // Add the product with quantity 1 if it doesn't exist
                const newOrderItem = new OrderItemDTO(0, 0, product.id, 1, product.price, "", product.price, product.name, product.image, 0,product.comboItems);
                currentTabProducts.push(newOrderItem);
            }

            updatedOrders[tabValue] = currentTabProducts; // Update the current tab
            return updatedOrders;
        });
    };
    const handleUpdateQuantity = (index: number, newQuantity: number) => {
        setOrders((prevOrders) => {
            const updatedOrders = [...prevOrders];
            const currentTabProducts = updatedOrders[tabValue];

            if (currentTabProducts && currentTabProducts[index]) {
                // Update the quantity if the product exists
                currentTabProducts[index].quantity = newQuantity;
            }

            return updatedOrders;
        });
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        if (newValue >= 0 && newValue < tabNames.length) {
            setTabValue(newValue); // Update the selected tab index
            setIsEditing(null);    // Exit edit mode if it was active
        }
    };
    const handleAddTab = () => {
        const newTab = `00`;
        setTabNames([...tabNames, newTab]); // Add new tab dynamically
        setTabValue(tabNames.length); // Switch to the new tab
    };
    const handleDeleteTab = (index: number) => {
        setTabNames((prevTabNames) => {
            const updatedTabNames = prevTabNames.filter((_, i) => i !== index);

            setOrders((prevOrders) => {
                const updatedOrders = prevOrders.filter((_, i) => i !== index);

                // Adjust `tabValue`
                setTabValue((prevTabValue) => {
                    if (updatedTabNames.length === 0) {
                        // Fallback: Create a new default tab if no tabs are left
                        setTabNames(['00']);
                        setOrders([[]]);
                        return 0; // Reset to the first tab
                    }
                    if (prevTabValue >= updatedTabNames.length) {
                        return Math.max(0, updatedTabNames.length - 1); // Decrement to the nearest valid index
                    }
                    return prevTabValue; // Keep the same index if still valid
                });

                return updatedOrders.length > 0 ? updatedOrders : [[]]; // Ensure at least one empty order exists
            });

            return updatedTabNames.length > 0 ? updatedTabNames : ['00']; // Ensure at least one tab exists
        });
    };
    const handleTabRename = (index: number, newName: string) => {
        const updatedTabs = [...tabNames];
        updatedTabs[index] = newName.trim(); // Trim whitespace from the name
        setTabNames(updatedTabs);
        setIsEditing(null); // Exit edit mode
    };
    const handleRenameKeyPress = (
        event: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (event.key === 'Enter') {
            handleTabRename(index, event.currentTarget.value); // Save the new name
        }
    };


    const handleSetOrderRequest = () => {
        const currentOrder = orders[tabValue] || [];
        if (currentOrder.length > 0) {
            setOrderRequest((prevOrderRequest) => {
                const updatedOrderRequest = { ...prevOrderRequest };
                updatedOrderRequest.orderItems = currentOrder;
                updatedOrderRequest.totalPrice = totals.totalPrice;
                updatedOrderRequest.paymentMethodId = 1;
                updatedOrderRequest.branchId = 1;
                updatedOrderRequest.numberOrder = parseInt(tabNames[tabValue], 0); // Parse the tab name as the order number
                console.log("Order Request:", updatedOrderRequest);
                return updatedOrderRequest;
            });
        } else {
            console.log("No items in the current order.");
        }
        setOpenDialogPayment(true);
    };

    return (
        <div className="flex flex-row h-screen">
            {/* Left Section */}
            <div className="flex flex-col flex-1" style={{flex: 5}}>
                <div className="pt-2 pb-3 bg-blue-800 h-12">
                    <div className="w-1/2 h-7 px-4">
                        <InputSearchProduct
                            value={textSearch}
                            onChange={setTextSearch}
                            recommendations={productSearch}
                            onClickItem={(product) => {
                                handleProductClick(product)
                            }}
                            isBlack={false}
                        ></InputSearchProduct>
                    </div>
                </div>
                <div
                    className="flex flex-row gap-2 bg-white px-3 pt-3 pb-3 overflow-x-auto"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#aaa #f0f0f0',
                    }}
                >
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => handleCategoryClick(category)}
                            style={{height: '50px', fontSize: '14px'}}
                            className={`px-3 py-1 text-sm rounded-full flex-shrink-0 ${
                                selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-2">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {products.map((product) => (
                            <SalesProductCard
                                key={product.id}
                                product={product}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleProductClick(product);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col flex-1 bg-white" style={{flex: 5}}>
                {/* Tabs for Orders */}
                <div className="flex items-end justify-between px-4 h-12 bg-blue-800">
                    <div className="flex items-center gap-2 flex-1">
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{
                                minHeight: '30px',
                                maxWidth: '400px',
                                overflowX: 'auto',
                                '& .MuiTabScrollButton-root': {
                                    color: '#fff', // White scroll buttons
                                },
                                '& .MuiTabs-indicator': {
                                    display: 'none',
                                },
                                '& .MuiTab-root': {
                                    minWidth: 'auto',
                                    minHeight: '40px !important',
                                    padding: '0px 14px',
                                    fontSize: '0.875rem',
                                    color: '#fff',
                                    borderRadius: '10px 10px 0 0',
                                    transition: 'background-color 0.3s',
                                    '&.Mui-selected': {
                                        color: bg_blue_800,
                                        backgroundColor: '#fff',
                                        fontWeight: 'bold',
                                        '& .tab-text': {
                                            pointerEvents: 'none',
                                        },
                                    },
                                    '&:not(.Mui-selected):hover': {
                                        backgroundColor: bg_blue_600,
                                    },
                                },
                            }}
                        >
                            {tabNames.map((tab, index) => (
                                <Tab
                                    key={index}
                                    onClick={(e) => {
                                        if (tabValue === index) {
                                            e.stopPropagation(); // Prevent switching tabs when selected
                                            setIsEditing(index); // Activate edit mode on single click
                                        }
                                    }}
                                    label={
                                        <div
                                            className="flex items-center gap-2"
                                            style={{
                                                cursor: tabValue === index ? 'text' : 'pointer',
                                                borderBottom: tabValue === index ? '2px solid #1565C0' : 'none',
                                            }}
                                        >
                                            {/* Editable Input or Static Label */}
                                            {isEditing === index ? (
                                                <input
                                                    type="text"
                                                    value={tab}
                                                    autoFocus
                                                    onChange={(e) => {
                                                        const updatedTabs = [...tabNames];
                                                         // Remove non-numeric characters
                                                        updatedTabs[index] = e.target.value.replace(/[^0-9]/g, ''); // Update the tab name with numeric-only input
                                                        setTabNames(updatedTabs); // Update state
                                                    }}
                                                    onKeyDown={(e) => handleRenameKeyPress(e, index)}
                                                    onBlur={() => handleTabRename(index, tab)}
                                                    className="px-2 py-1"
                                                    style={{
                                                        width: '100px',
                                                        minWidth: '80px',
                                                        maxWidth: '150px',
                                                        fontSize: '0.875rem',
                                                        fontWeight: 'bold',
                                                        color: '#000',
                                                        outline: 'none',
                                                    }}
                                                />
                                            ) : (
                                                <span style={{textTransform: "none", fontWeight: "bold"}}>{"Order " + tab}</span>
                                            )}

                                            {/* Delete Button for Selected Tab Only */}
                                            {tabValue === index && (
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent switching tabs on delete click
                                                        handleDeleteTab(index);
                                                    }}
                                                    sx={{
                                                        padding: '0px',
                                                        color: bg_grey_600,
                                                    }}
                                                >
                                                    <CloseIcon fontSize="small" />
                                                </IconButton>
                                            )}
                                        </div>
                                    }
                                />
                            ))}
                        </Tabs>
                        <IconButton
                            sx={{
                                color: color_white,
                                backgroundColor: bg_blue_600,
                                borderRadius: '50%',
                                padding: '2px',
                                '&:hover': {backgroundColor: bg_blue_700},
                                flexShrink: 0,
                            }}
                            onClick={handleAddTab}
                        >
                            <AddIcon sx={{fontSize: '20px'}}/>
                        </IconButton>
                    </div>
                </div>

                {/*Tabs content*/}
                <div
                    className="flex flex-col overflow-y-auto border-l border-gray-300 h-full"
                    style={{
                        flex: 1,
                        maxHeight: 'calc(100% - 60px)', // Adjust height to avoid overlapping with tabs
                        overflowY: 'auto',
                    }}
                >
                    {orders[tabValue]?.map((product, index) => (
                        <React.Fragment key={index}>
                            <OrderProductCard
                                index={index}
                                name={product.productName}
                                childNames={product.productComboItems.map(item => item.productName) || []}
                                quantity={product.quantity || 1} // Pass quantity from parent state
                                price={product.productPrice}
                                onQuantityChange={(newQuantity) => handleUpdateQuantity(index, newQuantity)} // Pass callback for quantity update
                                onDelete={() => {
                                    setOrders((prevOrders) => {
                                        const updatedOrders = [...prevOrders];
                                        updatedOrders[tabValue] = updatedOrders[tabValue].filter((_, i) => i !== index);
                                        return updatedOrders;
                                    });
                                }}
                            />
                            <Divider />
                        </React.Fragment>
                    ))}
                </div>

                {/*Action center*/}
                <div className="mt-auto px-4 border-t border-l border-gray-300">
                    <div className="flex items-center justify-between px-4 py-2">
                        <div className="flex items-center gap-2 ml-auto">
                            <Typography variant="body2">
                                Tổng tiền
                            </Typography>
                            <div
                                className="flex items-center justify-center border rounded-full"
                                style={{
                                    width: '24px',
                                    height: '24px',
                                    borderColor: '#ccc',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
                                }}
                            >
                                {totals.totalQuantity}
                            </div>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'black',
                                    marginLeft: '8px',
                                }}
                            >
                                {totals.totalPrice.toLocaleString()}đ
                            </Typography>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 p-2">

                        {/* Right Button */}
                        <Button
                            variant="contained"
                            sx={{
                                flex: 3,
                                backgroundColor: bg_blue_600,
                                color: '#fff',
                                borderRadius: '12px', // Increased border radius for a larger look
                                textTransform: 'none', // Keep the text normal case
                                fontSize: '1rem', // Larger font size
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 600, // Bolder text
                                padding: '12px 16px', // Larger padding for a bigger button
                                '&:hover': {
                                    backgroundColor: '', // Darker blue on hover
                                },
                            }}
                            onClick={handleSetOrderRequest}
                        >
                            <AttachMoneyIcon fontSize="medium" sx={{marginRight: '8px'}}/>
                            Thanh toán
                        </Button>
                        <DialogPayment open={openDialogPayment} onClose={(value) => handleCloseDialogPayment(value)} order={orderRequest}></DialogPayment>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesPage;