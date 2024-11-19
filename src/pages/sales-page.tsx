import {Button, Divider, IconButton, InputAdornment, Tab, Tabs, TextField, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {OrderProductCard, SalesProductCard} from "../components/card.tsx";
import {bg_blue_600, bg_blue_700, bg_blue_800, bg_grey_600, color_white} from "../common/constant.ts";
import {useMemo, useState} from "react";
import React from "react";

interface Product {
    id: number;
    name: string;
    price: number;
    quantity?: number; // Optional for orders
    childNames?: string[]; // Optional for combos
}
type Orders = Product[][]; // Array of product arrays for each tab

const SalesPage = () => {
    const categories = ['Tất cả', 'Classic Cocktails', 'Tea'];
    const products = [
        { id: 1, name: "Cơm xúc xích", price: 90000 },
        { id: 2, name: "Bánh mì gà", price: 50000 },
        { id: 3, name: "Phở bò đặc biệt", price: 120000 },
        { id: 4, name: "Combo 1", price: 150000, childNames: ["Trà sữa trân châu", "Bánh mì ngọt", "Khoai tây chiên"] },
        { id: 5, name: "Bún chả Hà Nội", price: 85000 },
        { id: 6, name: "Mì quảng Đà Nẵng", price: 75000 },
        { id: 7, name: "Gỏi cuốn tôm thịt", price: 60000 },
        { id: 8, name: "Trà sữa trân châu", price: 45000 },
    ];

    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
    const [currentPage, setCurrentPage] = useState(1);
    const [tabValue, setTabValue] = useState(0); // Track selected tab
    const [tabNames, setTabNames] = useState(['00']);
    const [isEditing, setIsEditing] = useState<number | null>(null); // Track the tab being edited
    const [orders, setOrders] = useState<Orders>([[]]); // Initialize with an empty order for the first tab
    const totalPages = 3;
    const totals = useMemo(() => {
        const currentTabProducts = orders[tabValue] || [];
        const totalQuantity = currentTabProducts.reduce((sum, product) => sum + (product.quantity || 1), 0);
        const totalPrice = currentTabProducts.reduce((sum, product) => sum + (product.price * (product.quantity || 1)), 0);

        return { totalQuantity, totalPrice };
    }, [orders, tabValue]);

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    }
    const handleProductClick = (product: Product) => {
        setOrders((prevOrders) => {
            const updatedOrders = [...prevOrders];
            const currentTabProducts = updatedOrders[tabValue] || [];

            // Check if the product already exists in the current tab
            const existingProductIndex = currentTabProducts.findIndex(
                (p) => p.id === product.id
            );

            if (existingProductIndex !== -1) {
                // Increment the quantity if the product exists
                currentTabProducts[existingProductIndex].quantity! += 1;
            } else {
                // Add the product with quantity 1 if it doesn't exist
                currentTabProducts.push({ ...product, quantity: 1 });
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

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
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

    const handleCheckout = () => {
        const currentOrder = orders[tabValue] || [];
        if (currentOrder.length > 0) {
            console.log("Current Order:", currentOrder);
        } else {
            console.log("No items in the current order.");
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left Section */}
            <div className="flex flex-col flex-1">
                <div className="pt-2 pb-3 bg-blue-800 h-12">
                    <div className="w-1/2 h-7 px-4">
                        <TextField
                            variant="standard"
                            placeholder="Tìm món"
                            slotProps={{
                                input: {
                                    sx: {
                                        color: color_white,
                                        fontSize: '0.875rem',
                                    },
                                    endAdornment: ( // Move the icon to the end of the input
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => console.log('Search clicked')} edge="end">
                                                <SearchIcon sx={{color: color_white}} fontSize="small"/>
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                            sx={{
                                backgroundColor: 'transparent',
                                color: '#fff',
                                borderRadius: '4px',
                                paddingLeft: '8px',
                                paddingRight: '8px',
                                width: '100%',
                                '& .MuiInput-underline:before': {
                                    borderBottomColor: color_white,
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: color_white,
                                },
                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                    borderBottomColor: color_white,
                                },
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-col flex-1 border-r border-gray-300 h-full">
                    <div className="flex gap-2 bg-white p-3 ">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => handleCategoryClick(category)}
                                className={`px-3 py-1 text-sm rounded-full ${
                                    selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                    <div
                        className="flex flex-wrap gap-3 px-5 py-2 overflow-auto"
                        style={{
                            justifyContent: 'left',
                            alignItems: 'center',
                        }}
                    >
                        {products.map((product) => (
                            <SalesProductCard
                                key={product.id}
                                name={product.name}
                                price={product.price}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleProductClick(product);
                                }}
                            />
                        ))}
                    </div>
                    <div className="bg-white px-2 mt-auto">
                        <div className="flex justify-end items-center p-2">
                            <div className="flex items-center gap-2">
                                {/* Previous Button */}
                                <IconButton
                                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    sx={{
                                        backgroundColor: 'gray.100',
                                        color: 'gray.700',
                                        '&:hover': {backgroundColor: 'gray.200'},
                                        borderRadius: '999px', // Makes it fully rounded
                                        minWidth: '20px', // Optional: to control button size
                                        minHeight: '20px', // Optional: to control button size
                                    }}
                                >
                                    <ArrowBackIosIcon fontSize="small"/>
                                </IconButton>

                                {/* Pagination Text */}
                                <div className="text-sm text-gray-700">
                                    <span className="font-bold text-blue-600">{currentPage}</span> / {totalPages}
                                </div>

                                {/* Next Button */}
                                <IconButton
                                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    sx={{
                                        backgroundColor: 'gray.100',
                                        color: 'gray.700',
                                        '&:hover': {backgroundColor: 'gray.200'},
                                        borderRadius: '999px', // Makes it fully rounded
                                        minWidth: '20px', // Optional: to control button size
                                        minHeight: '20px', // Optional: to control button size

                                    }}
                                >
                                    <ArrowForwardIosIcon fontSize="small"/>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col flex-1 bg-white">
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
                                                <span>{tab}</span>
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
                    className="flex flex-col overflow-y-auto"
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
                                name={product.name}
                                childNames={product.childNames || []}
                                quantity={product.quantity || 1} // Pass quantity from parent state
                                price={product.price}
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
                <div className="mt-auto px-4 border-t border-gray-200">
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
                        <Button
                            variant="outlined"
                            sx={{
                                flex: 1,
                                color: bg_blue_600,
                                borderColor: bg_blue_600,
                                borderRadius: '12px', // Increased border radius for a larger look
                                textTransform: 'none', // Keep the text normal case
                                fontSize: '1rem', // Larger font size
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 600, // Bolder text
                                padding: '12px 16px', // Larger padding for a bigger button
                                '&:hover': {
                                    borderColor: bg_blue_800,
                                    backgroundColor: 'rgba(21, 101, 192, 0.1)', // Slight blue background on hover
                                },
                            }}
                        >
                            <NotificationsIcon fontSize="medium" sx={{marginRight: '8px'}}/>
                            Thông báo
                        </Button>

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
                            onClick={handleCheckout}
                        >
                            <AttachMoneyIcon fontSize="medium" sx={{marginRight: '8px'}}/>
                            Thanh toán
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesPage;