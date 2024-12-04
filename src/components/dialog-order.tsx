import {OrderDTO} from "../dtos/OrderDTO.ts";
import {
    bg_blue_300,
    bg_blue_500,
    bg_grey_500,
    bg_grey_600, color_black,
    color_green_primary, color_header_table,
    Error500,
    Error600,
    success_700
} from "../common/constant.ts";
import {InputText} from "./input.tsx";
import {Button, Dialog, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import React, {useEffect, useState} from "react";
import {OrderStatus} from "../common/order-status.ts";
import {OrderService} from "../services/OrderService.ts";
import {useNavigate} from "react-router-dom";

interface DialogOrderProps {
    open: boolean;
    onClose: (isRerender: boolean) => void;
    order: OrderDTO;
}

const DialogOrder: React.FC<DialogOrderProps> = ({open, onClose, order}) => {
    const [orderReq, setOrderReq] = useState<OrderDTO>(
        OrderDTO.constructorOrderDTO()
    );
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/sales', {state: {orderUpdate: orderReq}});
    }

    useEffect(() => {
        if(open)
        {
            setOrderReq(order);
        }
    }, [open]);

    const deleteOrder = async () => {
        try{
            await OrderService.deleteOrder(orderReq.id);
            console.log("Delete order success");
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleDeleteOrder = () => {
        deleteOrder().then(() => {
            onClose(true);
        });
    }


    return (
        <Dialog
            open={open}
            onClose={() => onClose(false)}
            maxWidth={false}

            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '8px',
                    width: '900px',
                },
            }}
        >
            <div className={'flex flex-col p-4 pl-6 pr-6'}>
                <div>
                    <span
                        style={{fontWeight: 'bold', fontSize: '1.2rem', color: bg_blue_500}}>Xem chi tiết hóa đơn</span>
                </div>
                <div className={'flex flex-row gap-8'}>
                    <div className={'flex flex-col flex-1 mt-4 gap-3'}>
                        <InputText label={'Mã đơn hàng'} placeholder={""} value={orderReq.id.toString()} onChange={() => {}}/>
                        <InputText label={'Số phục vụ'} placeholder={''} value={orderReq.numberOrder.toString()} onChange={() => {}}/>
                        <InputText label={'Chi nhánh'} placeholder={''} value={orderReq.branchName} onChange={() => {}}/>
                        <InputText label={'PT thanh toán'} placeholder={''} value={orderReq.paymentMethodName} onChange={() => {}}/>
                    </div>
                    <div className={'flex flex-col flex-1 mt-4 gap-3'}>
                        <InputText label={'Trạng thái'} placeholder={''} value={orderReq.status} onChange={() => {}}/>
                        <InputText label={'Ngày tạo'} placeholder={''} value={orderReq.updatedAt.format("DD/MM/YYYY HH:mm")} onChange={() => {}}/>
                        <InputText label={'Tổng hóa đơn'} placeholder={''} value={orderReq.totalPrice.toLocaleString()} onChange={() => {}}/>
                    </div>
                </div>
                <div className={"mt-6"}>
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
                                height: 40,
                                "& th": {
                                    backgroundColor: color_header_table,
                                }
                            }}
                        >
                            <TableCell
                                sx={{minWidth: 70, padding: "0", paddingX: 1, fontWeight: 'bold'}}>STT</TableCell>
                            <TableCell sx={{minWidth: 300, padding: "0", paddingX: 1, fontWeight: 'bold'}}>Tên món
                                ăn</TableCell>
                            <TableCell sx={{minWidth: 100, padding: "0", paddingX: 1, fontWeight: 'bold'}}>Số
                                lượng</TableCell>
                            <TableCell
                                sx={{minWidth: 80, padding: "0", paddingX: 1, fontWeight: 'bold', textAlign: 'right'}}>Giá
                                bán</TableCell>
                            <TableCell
                                sx={{minWidth: 80, padding: "0", paddingX: 1, fontWeight: 'bold', textAlign: 'right'}}>
                                Thành tiền
                            </TableCell>

                        </TableHead>
                        <TableBody>
                            {orderReq.orderItems.map((item, index) => (
                                <TableRow
                                    key={index}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '0.8rem',
                                            textAlign: 'left',
                                            padding: "0",
                                        }}
                                    >{item.productName}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '0.8rem',
                                            textAlign: 'right',
                                            padding: "0",
                                            paddingX: 1,
                                        }}
                                    >{item.productPrice.toLocaleString()}</TableCell>
                                    <TableCell
                                        sx={{
                                            fontWeight: 'bold',
                                            fontSize: '0.8rem',
                                            textAlign: 'right',
                                            padding: "0",
                                            paddingX: 1,
                                        }}
                                    >{(item.productPrice*item.quantity).toLocaleString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                    {(orderReq.status == OrderStatus.PENDING) && <div className={'flex flex-row gap-2'}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNavigate}
                            sx={{
                                backgroundColor: color_green_primary,
                                textTransform: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: success_700,
                                },
                            }}
                        >
                            Cập Nhật
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleDeleteOrder}
                            sx={{
                                backgroundColor: Error500,
                                textTransform: 'none',
                                borderRadius: '8px',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: Error600,
                                },
                            }}
                        >
                            Xóa
                        </Button>
                    </div>}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onClose(false)}
                        sx={{
                            backgroundColor: bg_grey_500,
                            textTransform: 'none',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            '&:hover': {
                                backgroundColor: bg_grey_600,
                            },
                        }}
                    >
                        Bỏ qua
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

export default DialogOrder;