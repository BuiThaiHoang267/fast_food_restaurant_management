import {
    Button,
    Dialog,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {InputDropdown, InputNumber, InputQuantity, InputSearchProduct, InputText} from "./input.tsx";
import {
    bg_blue_300,
    bg_blue_500, bg_blue_600,
    color_black,
    Error600,
    success_600,
    success_700
} from "../common/constant.ts";
import ClearIcon from '@mui/icons-material/Clear';
import {useState, useEffect} from "react";
import ProductDTO from "../dtos/ProductDTO.ts";
import {productService} from "../services/ProductService.ts";
import ComboItemDTO from "../dtos/ComboItemDTO.ts";
import CategoryDTO from "../dtos/CategoryDTO.ts";
import {CategoryService} from "../services/CategoryService.ts";

interface DialogAddProductProps {
    open: boolean;
    onClose: () => void;
}

const DialogAddProduct: React.FC<DialogAddProductProps> = ({open, onClose}) => {
    const [isCombo, setIsCombo] = useState(false);
    const [product, setProduct] = useState<ProductDTO[]>([]);
    const [productAdd, setProductAdd] = useState<ProductDTO>(new ProductDTO(0,"","","",0,0,"",0,"",[]));
    const [textSearch, setTextSearch] = useState("");
    const [category, setCategory] = useState<CategoryDTO[]>([]);

    useEffect(() => {
        fetchProduct();
        fetchAllCategory();
    },[]);

    useEffect(() => {
        if(open)
        {
            setProductAdd(new ProductDTO(0,"","","",0,0,"",0,"",[]));
            setIsCombo(false);
            setTextSearch("");
        }
    },[open]);

    const fetchProduct = async () => {
        try {
            const allProducts = await productService.getByTypeProduct();
            setProduct(allProducts);
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchAllCategory = async () => {
        try {
            if(sessionStorage.getItem("categories") !== null) {
                const data = JSON.parse(sessionStorage.getItem("categories") || "");
                console.log("Hello",data);
                setCategory(data);
                return;
            }
            const allCategory = await CategoryService.getAllCategory();
            setCategory(allCategory);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleDialogClose = () => {
        console.log(productAdd);
        onClose();
    }

    const handleSaveProduct = () => {
        console.log(productAdd);
        const saveProduct = async () => {
            try {
                await productService.createProduct(productAdd);
            }
            catch (error) {
                console.error(error);
            }
        }
        saveProduct();
        onClose();
    }

    const handleChooseCombo = (value: string) => {
        if(value === "Combo") {
            setIsCombo(true);
        }
        else {
            setIsCombo(false);
        }
    }

    const handleAddProductToCombo = (product: ProductDTO) => {
        const comboItem = new ComboItemDTO(0,0,0,0,0,0,"","");
        comboItem.fromProductDTO(product);
        setProductAdd((prevData) => {
            return {...prevData, comboItems: [...prevData.comboItems, comboItem]};
        });
    }

    const handleDeleteProductInCombo = (comboItem: ComboItemDTO) => {
        setProductAdd((prevData) => {
            return {...prevData, comboItems: prevData.comboItems.filter((item) => item.productId !== comboItem.productId)};
        });
    }

    const handleEditQuantity = (comboItem: ComboItemDTO, quantity: number) => {
        setProductAdd((prevData) => {
            return {...prevData, comboItems: prevData.comboItems.map((item) => {
                    if(item.productId === comboItem.productId) {
                        item.quantity = quantity;
                    }
                    return item;
                })};
        });
    }

    const handleSelectCategory = (categoryName: string) => {
        const categoryId = category.find((item) => item.name === categoryName)?.id;
        setProductAdd((prevData) => {
            return {...prevData, categoryName: categoryName, categoryId: categoryId?categoryId:category[0].id};
        });
    }

    const handleChangeBaseFieldOfProduct = (field: string, value: any) => {
        setProductAdd((prevData) => {
            return {...prevData, [field]: value};
        });
    }

    function getSumCost(): number {
        return productAdd.comboItems.reduce((sum, item) => sum + item.getCost(), 0);
    }

    function getSumPrice(): number {
        return productAdd.comboItems.reduce((sum, item) => sum + item.getPrice(), 0);
    }

    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
            maxWidth={false}
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '8px',
                    width: '900px',
                },
            }}
        >
            <div className="p-5">
                <Typography variant="h6" component="div" gutterBottom sx={{fontWeight: 'bold', color: bg_blue_600}}>
                    Thêm Món ăn - Combo
                </Typography>
                <div className={"flex flex-row gap-14"}>
                    <div className={"flex-[7] flex flex-col gap-2"}>
                        <InputText label={"Tên món ăn"} placeholder={""} value={productAdd.name}
                                   onChange={(value) => handleChangeBaseFieldOfProduct("name",value)}/>
                        <InputDropdown label={"Danh mục món ăn"} value={productAdd.categoryName} options={category.map((item) => item.name)}
                                       onChange={(value) => {handleSelectCategory(value)}}/>
                        <InputText label={"Link ảnh"} placeholder={""} value={productAdd.image}
                                   onChange={(value) => handleChangeBaseFieldOfProduct("image",value)}/>
                        <InputDropdown label={"Món ăn/Combo"} value={productAdd.type} options={["Product", "Combo"]}
                                       onChange={(value) => handleChangeBaseFieldOfProduct("type",value)}
                                        onClickItem={handleChooseCombo}/>
                    </div>
                    <div className={"flex-[3] flex flex-col gap-2"}>
                        <InputNumber label={"Giá vốn"} value={productAdd.costPrice} onChange={(value) => handleChangeBaseFieldOfProduct("costPrice",value)}/>
                        <InputNumber label={"Giá bán"} value={productAdd.price} onChange={(value) => handleChangeBaseFieldOfProduct("price",value)}/>
                    </div>
                </div>
                {isCombo && (
                    <div className={"mt-6 flex flex-col"}>
                        <div style={{width: '400px',}}>
                            <InputSearchProduct
                                value={textSearch}
                                onChange={setTextSearch}
                                recommendations={product}
                                onClickItem={(product) => {handleAddProductToCombo(product)}}
                            ></InputSearchProduct>
                        </div>
                        <Table
                            stickyHeader
                            aria-label="scrollable product table"
                            size={"small"}
                            sx={{
                                with: '100%',
                            }}
                        >
                            <TableHead
                                sx={{
                                    backgroundColor: bg_blue_300,
                                    color: color_black,
                                    fontWeight: 'bold',
                                    height: 50,
                                }}
                            >
                                <TableCell sx={{minWidth: 50}}>Mã</TableCell>
                                <TableCell sx={{minWidth: 200}}>Tên hàng</TableCell>
                                <TableCell sx={{minWidth: 50}}>Số lượng</TableCell>
                                <TableCell sx={{width: 90}}>Giá vốn</TableCell>
                                <TableCell sx={{width: 100}}>Thành tiền</TableCell>
                                <TableCell sx={{
                                    width: 50,
                                    justifySelf: "flex-end"
                                }}>
                                </TableCell>
                            </TableHead>
                            <TableBody>
                                {productAdd.comboItems.map((item,index) => (
                                    <TableRow
                                        key={index}
                                    >
                                        <TableCell>{item.productId}</TableCell>
                                        <TableCell>{item.productName}</TableCell>
                                        <TableCell>
                                            <InputQuantity
                                                value={item.quantity}
                                                onChange={(quantity) => {
                                                    handleEditQuantity(item, quantity);
                                                }}/>
                                        </TableCell>
                                        <TableCell>{item.productCostPrice}</TableCell>
                                        <TableCell>{item.getCost()}</TableCell>
                                        <TableCell>
                                            <ClearIcon
                                                sx={{
                                                    cursor: "pointer",
                                                    color: Error600,
                                                }}
                                                onClick={() => {
                                                    handleDeleteProductInCombo(item);
                                                }}></ClearIcon>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className={"flex flex-col ml-auto"}>
                            <div className={"flex flex-row"}>
                                <label className={"text-sm font-bold"}>Tổng giá trị vốn:</label>
                                <label className={"text-sm ml-2"}>{getSumCost()}</label>
                            </div>
                            <div className={"flex flex-row"}>
                                <label className={"text-sm font-bold"}>Tổng giá trị bán:</label>
                                <label className={"text-sm ml-2"}>{getSumPrice()}</label>
                            </div>
                        </div>
                    </div>
                )}


                <div className="flex justify-end gap-2 mt-6">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveProduct}
                        sx={{
                            backgroundColor: success_600,
                            '&:hover': {
                                backgroundColor: success_700,
                            },
                        }}
                    >
                        Lưu
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDialogClose}
                        sx={{
                            backgroundColor: bg_blue_500,
                            '&:hover': {
                                backgroundColor: bg_blue_500,
                            },
                        }}
                    >
                        Hủy
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

export default DialogAddProduct;