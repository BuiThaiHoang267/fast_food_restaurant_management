import {IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {CookedProductCard, CookingProductCard} from "../components/card.tsx";
import React, {useEffect, useState} from "react";
import {OrderDTO} from "../dtos/OrderDTO.ts";
import {OrderService} from "../services/OrderService.ts";
import {OrderItemDTO} from "../dtos/OrderItemDTO.ts";
import {OrderItemStatus, OrderStatus} from "../common/order-status.ts";
import {bg_blue_500, color_white} from "../common/constant.ts";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {Link, useNavigate} from "react-router-dom";
import {UserDTO} from "../dtos/UserDTO.ts";
import {UserService} from "../services/UserService.ts";
import {BranchService} from "../services/BranchService.ts";
import {RoleService} from "../services/RoleService.ts";
import DialogUserProfile from "../components/dialog-user-profile.tsx";

const KitchenPage = () => {

    const navigate = useNavigate();
    const [openUserMenu, setOpenUserMenu] = useState<null | HTMLElement>(null);

    const [openDialogDetail, setOpenDialogDetail] = useState(false);
    const [userDetail, setUserDetail] = useState<UserDTO>(
        new UserDTO(0, '','' , '', '', '', 0, '', '', 0, '', true)
    );
    const [branchFilter, setBranchFilter] = useState<{id: number, label: string, checked: boolean}[]>([]);
    const [roleFilter, setRoleFilter] = useState<{id: number, label: string, checked: boolean}[]>([]);

    const [orderItemCompleted, setOrderItemCompleted] = useState<OrderItemDTO[]>([]);
    const [orderPending, setOrderPending] = useState<OrderDTO[]>([]);


    useEffect(() => {
        fetchUserInfo();
        fetchAllBranch();
        fetchAllRole();

        fetchOrderPending();
        fetchOrderItemCompleted();
    }, []);

    const fetchUserInfo = async () => {
        try{
            const response = await UserService.getProfile();
            setUserDetail(response)
            console.log(response);
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchAllBranch = async () => {
        try{
            const response = await BranchService.getAllBranch();
            setBranchFilter(response.map((branch) => {
                return {id: branch.id, label: branch.name, checked: false}
            }));
        }
        catch (error){
            console.error(error);
        }
    }

    const fetchAllRole = async () => {
        try{
            const response = await RoleService.getAllRole();
            setRoleFilter(response.map((role) => {
                return {id: role.id, label: role.name, checked: false}
            }));
        }
        catch (error){
            console.error(error);
        }
    }

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

    const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => setOpenUserMenu(event.currentTarget);
    const handleUserMenuClose = () => setOpenUserMenu(null);

    const handleLogout = () => {
        UserService.logout();
        setOpenUserMenu(null);
        navigate('/login');
    }
    const handleProfile = async () => {
        await fetchUserInfo();
        setOpenUserMenu(null);
        setOpenDialogDetail(true);
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
            <DialogUserProfile
                open={openDialogDetail}
                onClose={() => setOpenDialogDetail(false)}
                user={userDetail}
                isAdd={false}
                branches={branchFilter}
                roles={roleFilter}
            />
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
                        Đã xong / Chờ phục vụ
                    </Typography>
                    <div className="flex items-center gap-2 flex-1 justify-end">
                        <Tooltip title="Người dùng">
                            <IconButton
                                onClick={handleUserMenuOpen}
                                sx={{
                                    color: color_white,
                                    ml: 2,
                                    '&:focus': {outline: 'none'},
                                }}
                            >
                                <AccountCircleIcon/>
                            </IconButton>
                        </Tooltip>
                        {/* User Menu */}
                        <Menu
                            anchorEl={openUserMenu}
                            open={Boolean(openUserMenu)}
                            onClose={handleUserMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            sx={{
                                '& .MuiPaper-root': {
                                    backgroundColor: bg_blue_500,
                                    color: color_white,
                                },
                            }}
                        >
                            <MenuItem onClick={handleProfile}>Hồ sơ</MenuItem>
                            <Link to="/">
                                <MenuItem>Quản lý</MenuItem>
                            </Link>
                            <Link to="/sales">
                                <MenuItem>Thu ngân</MenuItem>
                            </Link>
                            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                        </Menu>
                    </div>
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