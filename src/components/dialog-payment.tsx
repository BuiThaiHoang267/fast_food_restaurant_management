import {OrderDTO} from "../dtos/OrderDTO.ts";
import {
    Button,
    Dialog,
    IconButton,
    Radio,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {
    bg_blue_200,
    bg_blue_300, bg_blue_600, bg_grey_500,
    bg_grey_600, color_black,
    success_600,
} from "../common/constant.ts";
import CloseIcon from "@mui/icons-material/Close";
import React, {useEffect} from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import DateRangeIcon from '@mui/icons-material/DateRange';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import {InputNumberCustom} from "./input.tsx";
import {OrderService} from "../services/OrderService.ts";


interface DialogPaymentProps {
    open: boolean;
    onClose: () => void;
    order: OrderDTO;
}

const DialogPayment: React.FC<DialogPaymentProps> = ({open, onClose, order}) => {
    const [discount, setDiscount] = React.useState<number>(0);
    const [paymentMethod, setPaymentMethod] = React.useState<number>(1);
    const [change, setChange] = React.useState<number>(0);
    const [paymentMoney, setPaymentMoney] = React.useState<number>(0);

    useEffect(() => {
        if(open){
            setPaymentMoney(order.totalPrice);
            setChange(0);
        }
    }, [open]);

    const createOrder = async (order: OrderDTO) => {
        try {
            await OrderService.createOrder(order);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleCallApiCreateOrder = () => {
        createOrder(order);
        onClose();
    }


    const handleChangePaymentMoney = (value: number) => {
        setPaymentMoney(value);
        setChange(value - (order.totalPrice - discount));
    }

    const handleChangeDiscount = (value: number) => {
        setDiscount(value);
        setChange(paymentMoney - (order.totalPrice - value));
    }

    return (
        <Dialog
            open={open}
            onClose={() => onClose()}
            maxWidth={false}
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: '8px',
                    width: '1000px',
                },
            }}
        >
            <div className={"flex flex-col"}>
                <div className={"flex flex-row justify-between pt-4 pl-4 pr-4"}>
                    <div>
                        <Typography
                            variant="caption"
                            sx={{
                                color: '#424242',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                            }}
                        >
                            Phiếu thanh toán - {order.numberOrder}
                        </Typography>
                    </div>
                    <div>
                        <IconButton
                            size="small"
                            onClick={() => onClose()}
                            sx={{
                                padding: '0px',
                                color: bg_grey_600,
                            }}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </div>
                </div>
                <div className={"flex flex-row justify-between p-4 gap-6"}>
                    <div className={"flex-1"}>
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
                                        backgroundColor: bg_blue_200,
                                    }
                                }}
                            >
                                <TableCell sx={{minWidth: 70, padding: "0", paddingX: 1, fontWeight: 'bold'}}>Món ăn</TableCell>
                                <TableCell sx={{minWidth: 300}}></TableCell>
                                <TableCell sx={{minWidth: 100}}></TableCell>
                                <TableCell sx={{width: 100}}></TableCell>

                            </TableHead>
                            <TableBody>
                                {order.orderItems.map((item,index) => (
                                    <TableRow
                                        key={index}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell 
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '0.8rem',
                                            }}
                                        >{item.productName}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell
                                            sx={{
                                                fontWeight: 'bold',
                                                fontSize: '0.8rem',
                                                textAlign: 'right',
                                            }}
                                        >{item.productPrice.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className={"flex-1 flex flex-col"}>
                        <div className={"flex flex-row justify-end mt-2"}>
                            <span style={{color: bg_grey_500, fontSize: "0.9rem"}}>26/11/2024 22:43</span>
                            <DateRangeIcon fontSize="small" sx={{marginLeft: '4px', color: bg_grey_500}}/>
                            <AccessTimeIcon fontSize="small" sx={{marginLeft: '4px', color: bg_grey_500}}/>
                        </div>
                        <div className={"flex flex-row justify-between mt-2"}>
                            <span>Tổng tiền hàng</span>
                            <span>{order.totalPrice.toLocaleString()}</span>
                        </div>
                        <div className={"mt-2"}>
                            <InputNumberCustom label={"Giảm giá"} value={discount}
                                               onChange={(value) => handleChangeDiscount(value)} width={"30%"}/>
                        </div>
                        <div className={"flex flex-row justify-between mt-2"}>
                            <span>Khách cần trả</span>
                            <span style={{
                                color: bg_blue_600,
                                fontWeight: 'bold'
                            }}>{order.totalPrice.toLocaleString()}</span>
                        </div>
                        <div className={"mt-2"}>
                            <InputNumberCustom label={"Khách thanh toán"} value={paymentMoney}
                                               onChange={(value) => handleChangePaymentMoney(value)} width={"30%"}/>
                        </div>
                        <div className={"flex flex-row mt-2 items-center"}>
                            <Radio
                                name={"payment-method"}
                                value={1}
                                checked={paymentMethod === 1}
                                onChange={() => setPaymentMethod(1)}
                                color="primary"/>
                            <span>Tiền mặt</span>
                            <Radio
                                name={"payment-method"}
                                value={2}
                                checked={paymentMethod === 2}
                                onChange={() => setPaymentMethod(2)}
                                color="primary"/>
                            <span>Chuyển khoản</span>
                            <Radio
                                name={"payment-method"}
                                value={3}
                                checked={paymentMethod === 3}
                                onChange={() => setPaymentMethod(3)}
                                color="primary"/>
                            <span>Quẹt thẻ</span>
                        </div>
                        {(paymentMethod === 1) &&<div className={"flex flex-row justify-between mt-2"}>
                            <span>Tiền thừa trả khách</span>
                            <span style={{
                                color: bg_blue_600,
                                fontWeight: 'bold'
                            }}>{change.toLocaleString()}</span>
                        </div>}
                    </div>
                </div>
                <div className={"flex flex-row p-4"}>
                    <div className={"flex-1"}></div>
                    <Button
                        className={"justify-between"}
                        variant="contained"
                        sx={{
                            color: '#fff',
                            borderRadius: '12px', // Increased border radius for a larger look
                            textTransform: 'none', // Keep the text normal case
                            fontSize: '1rem', // Larger font size
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: success_600,
                            fontWeight: 600, // Bolder text
                            padding: '8px 50px', // Larger padding for a bigger button
                            '&:hover': {
                                backgroundColor: '', // Darker blue on hover
                            },
                        }}
                        onClick={handleCallApiCreateOrder}
                    >
                        <AttachMoneyIcon fontSize="small" sx={{marginRight: '2px'}}/>
                        Thanh toán
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default DialogPayment;