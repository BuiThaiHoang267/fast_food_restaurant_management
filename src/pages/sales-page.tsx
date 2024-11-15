import {Button, Divider, IconButton, InputAdornment, Tab, Tabs, TextField, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {SalesProductCard} from "../components/card.tsx";

const SalesPage = () => {
    return (
        <div className="flex h-screen">
            {/* Left Section */}
            <div className="flex flex-col flex-1 border-r border-gray-300">
                <div className="mb-4 p-2 bg-blue-800">
                    <div className="w-1/3">
                        <TextField
                            variant="standard"
                            placeholder="Tìm món"
                            slotProps={{
                                input: {
                                    sx: {
                                        color: '#fff',
                                        fontSize: '0.875rem',
                                    },
                                    endAdornment: ( // Move the icon to the end of the input
                                        <InputAdornment position="end">
                                            <IconButton onClick={() => console.log('Search clicked')} edge="end">
                                                <SearchIcon sx={{ color: '#fff' }} fontSize="small"/>
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
                                    borderBottomColor: '#fff', // White underline when not focused
                                },
                                '& .MuiInput-underline:after': {
                                    borderBottomColor: '#fff', // White underline when focused
                                },
                                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                                    borderBottomColor: '#fff', // White underline on hover
                                },
                            }}
                        />
                    </div>
                </div>
                <div className="mb-4 flex gap-2 px-3">
                    <SalesProductCard name="Cơm xúc xích" price={90000} />
                    <SalesProductCard name="Cơm xúc xích" price={1000} />
                    <SalesProductCard name="Cơm xúc xích" price={100000} />
                    <SalesProductCard name="Cơm xúc xích" price={100000} />
                </div>

                {/* Product List Area */}
                <div className="grid grid-cols-3 gap-4 flex-1 overflow-auto">
                    {/* Product Cards Placeholder */}
                    {/* Repeat or map this div for other product cards */}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-4">
                    <Typography variant="body2">Page 1 of 3</Typography>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col flex-1 p-4 bg-white">
            {/* Tabs for Orders */}
                <div className="flex items-center justify-between mb-4">
                    <Tabs value={0} aria-label="Order Tabs">
                        <Tab label="HD001"/>
                        <Tab label="HD002"/>
                    </Tabs>
                    <Button variant="contained" sx={{minWidth: '40px'}}>+</Button>
                </div>

                {/* Order Details Section */}
                <div className="flex-1 overflow-auto mb-4">
                    <Typography variant="h6" gutterBottom>
                        Order ID: HD001
                    </Typography>
                    {/* Order Items Placeholder */}
                    <div className="flex justify-between mb-2 items-center">
                        <Typography variant="body1">Món ăn 1</Typography>
                        <div className="flex items-center gap-2">
                            <Button variant="text">-</Button>
                            <Typography variant="body1">1</Typography>
                            <Button variant="text">+</Button>
                            <Typography variant="body1">30,000</Typography>
                            <Button variant="text" color="error">🗑️</Button>
                        </div>
                    </div>
                    <Divider />
                    {/* Repeat the order item block above for additional items */}
                </div>

                {/* Payment Section */}
                <div>
                    <Divider />
                    <div className="flex justify-between items-center py-4">
                        <Typography variant="h6">Tổng tiền</Typography>
                        <Typography variant="h6" color="primary">300,000</Typography>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outlined" fullWidth>
                            Thông báo
                        </Button>
                        <Button variant="contained" color="primary" fullWidth>
                            Thanh toán
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SalesPage;