import {IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import {color_white} from "../common/constant.ts";
import SearchIcon from "@mui/icons-material/Search";
import {CookedProductCard, CookingProductCard} from "../components/card.tsx";
import {useState} from "react";

interface CookingProductCardProps {
    orderNumber: string;
    time: Date;
    products: {
        name: string;
        quantity: number;
        time: Date;
        subOrders?: {
            name: string;
            quantity: number;
        }[];
        deletedAt?: Date;
    }[];
}
interface CookedProductCardProps {
    orderNumber: string;
    name: string;
    quantity: number;
    time: Date;
    subOrders?: {
        name: string;
        quantity: number;
    }[];
    deletedAt?: Date;
}
const KitchenPage = () => {
    const [orders, setOrders] = useState<CookingProductCardProps[]>([
        {
            orderNumber: "02",
            time: new Date("2023-11-20T10:00:00"),
            products: [
                { name: "Cơm xúc xích", quantity: 1, time: new Date("2023-11-20T10:00:00") },
                {
                    name: "Combo 1",
                    quantity: 1,
                    time: new Date("2023-11-20T10:00:00"),
                    subOrders: [
                        { name: "Trà sữa trân châu", quantity: 2 },
                        { name: "Bánh mì ngọt", quantity: 1 },
                    ]
                },
            ],
        },
        {
            orderNumber: "03",
            time: new Date("2024-11-20T11:30:00"),
            products: [
                {
                    name: "Phở bò đặc biệt",
                    quantity: 2,
                    time: new Date("2024-11-20T11:30:00"),
                    deletedAt: new Date("2024-11-20T12:00:00")
                }
            ],
        },
        {
            orderNumber: "04",
            time: new Date("2024-11-21T12:00:00"),
            products: [
                { name: "Bún chả Hà Nội", quantity: 1, time: new Date("2024-11-20T12:00:00") },
                {
                    name: "Combo 2",
                    quantity: 2,
                    time: new Date("2024-11-20T12:00:00"),
                    subOrders: [
                        { name: "Khoai tây chiên", quantity: 2 },
                        { name: "Trà sữa trân châu", quantity: 1 }
                    ],
                    deletedAt: new Date("2024-11-20T13:00:00")
                },
            ],
        },
        {
            orderNumber: "05",
            time: new Date("2024-11-20T12:00:00"),
            products: [
                { name: "Bún chả Hà Nội", quantity: 1, time: new Date("2024-11-20T12:00:00") },
                {
                    name: "Combo 2",
                    quantity: 2,
                    time: new Date("2024-11-20T12:00:00"),
                    subOrders: [
                        { name: "Khoai tây chiên", quantity: 2 },
                        { name: "Trà sữa trân châu", quantity: 1 }
                    ],
                },
            ],
        },
        {
            orderNumber: "06",
            time: new Date("2023-11-20T10:00:00"),
            products: [
                { name: "Cơm xúc xích", quantity: 1, time: new Date("2023-11-20T10:00:00") },
                {
                    name: "Combo 1",
                    quantity: 1,
                    time: new Date("2023-11-20T10:00:00"),
                    subOrders: [
                        { name: "Trà sữa trân châu", quantity: 2 },
                        { name: "Bánh mì ngọt", quantity: 1 },
                    ] },
            ],
        }
    ]);

    const [completedOrders, setCompletedOrders] = useState<CookedProductCardProps[]>([]);

    const handleProductComplete = (orderIndex: number, productIndex: number) => {
        setOrders((prevOrders) => {
            const updatedOrders = [...prevOrders];
            const order = updatedOrders[orderIndex];

            // Extract the product being completed
            const [movedProduct] = order.products.splice(productIndex, 1);

            // Remove the order if no products remain
            if (order.products.length === 0) {
                updatedOrders.splice(orderIndex, 1);
            }

            // Update `completedOrders` within the same function
            setCompletedOrders((prevCompleted) => [
                ...prevCompleted,
                { ...movedProduct, time: new Date(), orderNumber: order.orderNumber },
            ]);

            return updatedOrders;
        });
    };
    const handleOrderComplete = (orderIndex: number) => {
        setOrders((prevOrders) => {
            const updatedOrders = [...prevOrders];
            const [completedOrder] = updatedOrders.splice(orderIndex, 1);

            // Add all products from the completed order to `completedOrders`
            setCompletedOrders((prevCompleted) => [
                ...prevCompleted,
                ...completedOrder.products.map((product) => ({
                    ...product,
                    time: new Date(),
                    orderNumber: completedOrder.orderNumber,
                })),
            ]);

            return updatedOrders;
        });
    };
    const handleRemoveCompleted = (productIndex: number) => {
        setCompletedOrders((prevCompleted) => prevCompleted.filter((_, i) => i !== productIndex));
    };

    const handleDeleteCookingProductCard = (orderIndex: number, productIndex: number) => {
        setOrders((prevOrders) => {
            // Create a copy of the orders
            const updatedOrders = [...prevOrders];

            // Remove the product from the specified order
            const targetOrder = updatedOrders[orderIndex];
            if (targetOrder) {
                targetOrder.products.splice(productIndex, 1);

                // If the order no longer has any products, remove the order
                if (targetOrder.products.length === 0) {
                    updatedOrders.splice(orderIndex, 1);
                }
            }

            return updatedOrders;
        });
    };
    const handleDeleteCookedProductCard = (productIndex: number) => {
        setCompletedOrders((prevCompletedOrders) => {
            // Remove the product at the specified index
            const updatedCompletedOrders = [...prevCompletedOrders];
            updatedCompletedOrders.splice(productIndex, 1);
            return updatedCompletedOrders;
        });
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
                    <div className="w-1/2 h-7">
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
                        {orders.map((order, index) => (
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
                        {completedOrders.map((product, index) => (
                            <CookedProductCard
                                key={index}
                                {...product}
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