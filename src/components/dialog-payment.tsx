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
import {PaymentMethodDTO} from "../dtos/PaymentMethodDTO.ts";
import {PaymentMethodService} from "../services/PaymentMethodService.ts";


interface DialogPaymentProps {
    open: boolean;
    onClose: (createSuccess: boolean) => void;
    order: OrderDTO;
}

const DialogPayment: React.FC<DialogPaymentProps> = ({open, onClose, order}) => {
    const [discount, setDiscount] = React.useState<number>(0);
    const [paymentMethod, setPaymentMethod] = React.useState<number>(1);
    const [change, setChange] = React.useState<number>(0);
    const [paymentMoney, setPaymentMoney] = React.useState<number>(0);
    const [paymentMethods, setPaymentMethods] = React.useState<PaymentMethodDTO[]>([]);
    const [orderRequest, setOrderRequest] = React.useState<OrderDTO>(order);

    useEffect(() => {
        getPaymentMethods();
    }, []);

    useEffect(() => {
        if(open){
            setPaymentMoney(order.totalPrice);
            setChange(0);
            setDiscount(0);
            setPaymentMethod(1);
            setOrderRequest(order);
        }
    }, [open]);

    const createOrder = async (order: OrderDTO): Promise<boolean> => {
        try {
            await OrderService.createOrder(order);
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }

    const getPaymentMethods = async () => {
        try {
            const data = await PaymentMethodService.getAllPaymentMethod();
            setPaymentMethods(data);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleChangePaymentMethod = (value: number) => {
        setPaymentMethod(value);
        setOrderRequest({
            ...orderRequest,
            paymentMethodId: value
        });
    }

    const handleCallApiCreateOrder = async () => {
        const createSuccess = await createOrder(orderRequest);
        onClose(createSuccess);
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
                            onClick={() => onClose(false)}
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
                            {paymentMethods.map((item, index) => (
                                <div key={index}>
                                    <Radio
                                        name={"payment-method"}
                                        value={item.id}
                                        checked={paymentMethod === item.id}
                                        onChange={() => handleChangePaymentMethod(item.id)}
                                        color="primary"/>
                                    <span>{item.name}</span>
                                </div>
                            ))}
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