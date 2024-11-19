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

interface DialogAddProductProps {
    open: boolean;
    onClose: () => void;
}

const DialogAddProduct: React.FC<DialogAddProductProps> = ({open, onClose}) => {
    const [data,setData] = useState([
        {id: "1", name: "Cơm gà", quantity: 1, cost: 10000, price: 15000},
        {id: "2", name: "Cơm sườn", quantity: 1, cost: 15000, price: 20000},
        {id: "3", name: "Cơm thịt kho", quantity: 1, cost: 20000, price: 25000},
    ]);

    const sampleRecommendations = ["Pizza", "Burger", "Fries", "Coke", "Salad", "Poco", "Pasta", "Noodles", "Rice", "Biryani", "Gà giòn vui vẻ"];

    const [testText, setTestText] = useState("");
    const [testNumber, setTestNumber] = useState(0);
    const [isCombo, setIsCombo] = useState(false);
    const [product, setProduct] = useState<ProductDTO[]>([]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const allProducts = await productService.getAllProduct();
                setProduct(allProducts);
            }
            catch (error) {
                console.error(error);
            }
        }

        fetchProduct();
    },[]);

    useEffect(() => {
        setTestNumber(0);
        setTestText("");
        setIsCombo(false);
    },[open]);

    const handleDialogClose = () => {
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

    const handleDeleteProductInCombo = (id: string) => {
        setData((prevData) => {
            return prevData.filter((item) => item.id !== id);
        })
    }

    const handleEditQuantity = (id: string, quantity: number) => {
        setData((prevData) => {
            return prevData.map((item) => {
                if(item.id === id) {
                    return {
                        ...item,
                        quantity: quantity,
                        price: item.cost * quantity,
                    }
                }
                return item;
            })
        })
    }

    function getSumCost(): number {
        return data.reduce((sum, item) => sum + item.cost*item.quantity , 0);
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
                        <InputText label={"Tên món ăn"} placeholder={""} value={testText}
                                   onChange={setTestText}/>
                        <InputDropdown label={"Danh mục món ăn"} value={testText} options={["Cơm", "Đồ Uống", "Tráng Miệng"]}
                                       onChange={setTestText}/>
                        <InputText label={"Link ảnh"} placeholder={""} value={testText}
                                   onChange={setTestText}/>
                        <InputDropdown label={"Món ăn/Combo"} value={testText} options={["Product", "Combo"]}
                                       onChange={setTestText}
                                        onClickItem={handleChooseCombo}/>
                    </div>
                    <div className={"flex-[3] flex flex-col gap-2"}>
                        <InputNumber label={"Giá vốn"} value={testNumber} onChange={setTestNumber}/>
                        <InputNumber label={"Giá bán"} value={testNumber} onChange={setTestNumber}/>
                    </div>
                </div>
                {isCombo && (
                    <div className={"mt-6 flex flex-col"}>
                        <div style={{width: '400px',}}>
                            <InputSearchProduct
                                value={testText}
                                onChange={setTestText}
                                recommendations={product.map((item) => item.name)}
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
                                {data.map((row) => (
                                    <TableRow
                                        key={row.id}
                                    >
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>
                                            <InputQuantity
                                                value={row.quantity}
                                                onChange={(quantity) => {
                                                    handleEditQuantity(row.id, quantity);
                                                }}/>
                                        </TableCell>
                                        <TableCell>{row.cost}</TableCell>
                                        <TableCell>{row.price}</TableCell>
                                        <TableCell>
                                            <ClearIcon
                                                sx={{
                                                    cursor: "pointer",
                                                    color: Error600,
                                                }}
                                                onClick={() => {
                                                    handleDeleteProductInCombo(row.id);
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
                                <label className={"text-sm ml-2"}>{getSumCost()}</label>
                            </div>
                        </div>
                    </div>
                )}


                <div className="flex justify-end gap-2 mt-6">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDialogClose}
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