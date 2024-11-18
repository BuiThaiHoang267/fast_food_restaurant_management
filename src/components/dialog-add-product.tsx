import {Button, Dialog, Table, TableBody, TableCell, TableHead, Typography} from "@mui/material";
import {InputDropdown, InputNumber, InputText} from "./input.tsx";
import {bg_blue_300, bg_blue_500, color_black, success_600, success_700} from "../common/constant.ts";
import {useState} from "react";

interface DialogAddProductProps {
    open: boolean;
    onClose: () => void;
}

const DialogAddProduct: React.FC<DialogAddProductProps> = ({open, onClose}) => {
    const [testText, setTestText] = useState("");
    const [testNumber, setTestNumber] = useState(0);
    const [isCombo, setIsCombo] = useState(false);

    const handleDialogClose = () => {
        onClose();
        setTestNumber(0);
        setTestText("");
    }

    const handleChooseCombo = (value: string) => {
        if(value === "Combo") {
            setIsCombo(true);
        }
        else {
            setIsCombo(false);
        }
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
                <Typography variant="h6" component="div" gutterBottom sx={{fontWeight: 'bold'}}>
                    Thêm Món ăn - Combo
                </Typography>
                <div className={"flex flex-row gap-14"}>
                    <div className={"flex-[7] py-2"}>
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
                    <div className={"flex-[3] py-2"}>
                        <InputNumber label={"Giá vốn"} value={testNumber} onChange={setTestNumber}/>
                        <InputNumber label={"Giá bán"} value={testNumber} onChange={setTestNumber}/>
                    </div>
                </div>
                <div className={"mt-4"}>
                    <div style={{width: '560px',}}>
                        <InputText label={"Chọn món ăn"} placeholder={""} value={testText}
                                   onChange={setTestText}/>
                    </div>
                    {isCombo && (
                        <Table
                            stickyHeader
                            aria-label="scrollable product table"
                            sx={{
                                with: '100%' ,
                            }}
                        >
                            <TableHead
                                sx={{
                                    backgroundColor: bg_blue_300,
                                    color: color_black,
                                    fontWeight: 'bold',
                                }}
                            >
                                <TableCell sx={{ minWidth: 50 }}>Mã</TableCell>
                                <TableCell sx={{ minWidth: 200 }}>Tên hàng</TableCell>
                                <TableCell sx={{ minWidth: 50 }}>Số lượng</TableCell>
                                <TableCell sx={{ minWidth: 50 }}>Giá vốn</TableCell>
                                <TableCell sx={{ minWidth: 50 }}>Giá mới</TableCell>
                            </TableHead>
                            <TableBody>

                            </TableBody>
                        </Table>
                    )}
                </div>

                <div className="flex justify-end gap-2 mt-2">
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