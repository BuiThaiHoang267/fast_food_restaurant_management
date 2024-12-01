import {Typography} from "@mui/material";
import {CookedProductCard, CookingProductCard} from "../components/card.tsx";
import {useEffect, useState} from "react";
import {OrderDTO} from "../dtos/OrderDTO.ts";
import {OrderService} from "../services/OrderService.ts";
import {OrderItemDTO} from "../dtos/OrderItemDTO.ts";
import {OrderItemStatus, OrderStatus} from "../common/order-status.ts";

const KitchenPage = () => {
    const [orderItemCompleted, setOrderItemCompleted] = useState<OrderItemDTO[]>([]);
    const [orderPending, setOrderPending] = useState<OrderDTO[]>([]);


    useEffect(() => {
        fetchOrderPending();
        fetchOrderItemCompleted();
    }, []);

    const fetchOrderPending = async () => {
        try{
            const response = await OrderService.getOrderStatusPending();
            setOrderPending(response);
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchOrderItemCompleted = async () => {
        try{
            const response = await OrderService.getOrderItemStatusCooked();
            setOrderItemCompleted(response);
        }
        catch (error) {
            console.error(error);
        }
    }

    const updateOrderItemStatus = async (orderItem: OrderItemDTO) => {
        try {
            const response = await OrderService.updateOrderItem(orderItem);
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
    }

    const updateOrderStatus = async (order: OrderDTO) => {
        try {
            const response = await OrderService.updateOrder(order);
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleProductComplete = (orderIndex: number, productIndex: number) => {
        setOrderPending((prevOrders) => {
            const updatedOrders = [...prevOrders];
            const order = updatedOrders[orderIndex];

            // Extract the product being completed
            const [movedProduct] = order.orderItems.splice(productIndex, 1);

            // Update the status of the product
            movedProduct.status = OrderItemStatus.COOKED;

            // Remove the order if no products remain
            if (order.orderItems.length === 0) {
                updatedOrders.splice(orderIndex, 1);
            }

            // Update `completedOrders` within the same function
            setOrderItemCompleted((prevCompleted) => [
                ...prevCompleted,
                movedProduct,
            ]);

            // Update the status of the product in the database
            updateOrderItemStatus(movedProduct);

            return updatedOrders;
        });
    };
    const handleOrderComplete = (orderIndex: number) => {
        // Update the status of the order in the database
        const completedOrder = orderPending[orderIndex];
        completedOrder.status = OrderStatus.COMPLETED;
        updateOrderStatus(completedOrder)
            .then(() => {
                setOrderPending((prevOrders) => {
                    const updatedOrders = [...prevOrders];
                    const [completedOrder] = updatedOrders.splice(orderIndex, 1);

                    // Add all products from the completed order to `completedOrders`
                    setOrderItemCompleted((prevCompleted) => [
                        ...prevCompleted,
                        ...completedOrder.orderItems,
                    ]);

                    return updatedOrders;
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };
    const handleRemoveCompleted = (productIndex: number) => {
        //update status of product
        const updatedProduct = orderItemCompleted[productIndex];
        updatedProduct.status = OrderItemStatus.COMPLETED;
        updateOrderItemStatus(updatedProduct);
        setOrderItemCompleted((prevCompleted) => prevCompleted.filter((_, i) => i !== productIndex));
    };

    const handleDeleteCookingProductCard = (orderIndex: number, productIndex: number) => {
        setOrderPending((prevOrders) => {
            // Create a copy of the orders
            const updatedOrders = [...prevOrders];

            // Remove the product from the specified order
            const targetOrder = updatedOrders[orderIndex];
            if (targetOrder) {
                targetOrder.orderItems.splice(productIndex, 1);

                // If the order no longer has any products, remove the order
                if (targetOrder.orderItems.length === 0) {
                    updatedOrders.splice(orderIndex, 1);
                }
            }

            return updatedOrders;
        });
    };
    const handleDeleteCookedProductCard = (productIndex: number) => {
        setOrderItemCompleted((prevCompleted) => prevCompleted.filter((_, i) => i !== productIndex));
    };


    return (
        <div className="flex h-screen bg-blue-800">
            {/*Left section*/}
            <div className="flex flex-col flex-1 h-full">
                <div className="flex flex-row justify-between items-center h-12 px-4">
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: '#fff',
                            fontWeight: 'bold',
                        }}
                    >
                        Chờ chế biến
                    </Typography>

                </div>
                <div
                    className="bg-white rounded-r-xl flex-1 mt-1 mr-4"
                    style={{
                        overflow: 'hidden',
                    }}
                >
                    <div
                        className="flex flex-col my-4 overflow-y-auto"
                        style={{
                            maxHeight: 'calc(100% - 3rem)'
                        }}
                    >
                        {orderPending.map((order, index) => (
                            <CookingProductCard
                                key={index}
                                order={order}
                                index={index}
                                onProcessProduct={(productIndex) => handleProductComplete(index, productIndex)}
                                onProcessOrder={() => handleOrderComplete(index)}
                                onDelete={(productIndex) => handleDeleteCookingProductCard(index, productIndex)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/*Right section*/}
            <div className="flex flex-col flex-1 h-full">
                <div className="flex flex-row justify-between items-center bg-blue-800 h-12 px-8">
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: '#fff',
                            fontWeight: 'bold',
                        }}
                    >
                        Đã xong/ Chờ cung ứng
                    </Typography>
                </div>
                <div
                    className="bg-white rounded-l-xl flex-1 mt-1 ml-4"
                    style={{
                        overflow: 'hidden',
                    }}
                >
                    <div
                        className="flex flex-col my-4 overflow-y-auto"
                        style={{
                            maxHeight: 'calc(100% - 3rem)'
                        }}
                    >
                        {orderItemCompleted.map((orderItem, index) => (
                            <CookedProductCard
                                key={index}
                                orderItem={orderItem}
                                onProcessProduct={() => handleRemoveCompleted(index)}
                                onDelete={() => handleDeleteCookedProductCard(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KitchenPage;