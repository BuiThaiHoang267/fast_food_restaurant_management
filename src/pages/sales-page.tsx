import {Button, Divider, IconButton, InputAdornment, Tab, Tabs, TextField, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {SalesProductCard} from "../components/card.tsx";
import {useState} from "react";
import {bg_blue_600, bg_blue_800, bg_grey_600, color_white} from "../common/constant.ts";

const SalesPage = () => {
    const categories = ['Tất cả', 'Classic Cocktails', 'Tea'];

    const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
    const [currentPage, setCurrentPage] = useState(1);
    const [tabValue, setTabValue] = useState(0); // Track selected tab
    const [tabs, setTabs] = useState(['2-2', '2-1']); // Dynamic tabs
    const totalPages = 3;

    const handleCategoryClick = (category: string) => {
        setSelectedCategory(category);
    }
    const handleProductClick = () => {
        console.log('Product clicked');
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    const handleAddTab = () => {
        const newTab = `2-${tabs.length + 1}`;
        setTabs([...tabs, newTab]); // Add new tab dynamically
        setTabValue(tabs.length); // Switch to the new tab
    };
    const handleDeleteTab = (index: number) => {
        const newTabs = tabs.filter((_, i) => i !== index);
        setTabs(newTabs);
        if (tabValue >= newTabs.length) {
            setTabValue(newTabs.length - 1); // Adjust selected tab index
        }
    };
    return (
        <div className="flex h-screen">
            {/* Left Section */}
            <div className="flex flex-col flex-1 border-r border-gray-300">
                <div className="pt-2 pb-3 bg-blue-800">
                    <div className="w-1/3 h-7">
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
                <div className="flex gap-2 bg-white p-2 ">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className={`px-3 py-1 text-sm rounded-full ${
                                selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
                <div className="mb-4 flex flex-wrap gap-2 px-3">
                    <SalesProductCard name="Cơm xúc xích" price={90000} onClick={handleProductClick}/>
                    <SalesProductCard name="Cơm xúc xích" price={1000} onClick={handleProductClick}/>
                    <SalesProductCard name="Cơm xúc xích" price={100000} onClick={handleProductClick}/>
                    <SalesProductCard name="Cơm xúc xích" price={100000} onClick={handleProductClick}/>
                    <SalesProductCard name="Cơm xúc xích" price={100000} onClick={handleProductClick}/>
                    <SalesProductCard name="Cơm xúc xích" price={1000} onClick={handleProductClick}/>
                    <SalesProductCard name="Cơm xúc xích" price={100000} onClick={handleProductClick}/>
                    <SalesProductCard name="Cơm xúc xích" price={100000} onClick={handleProductClick}/>
                    <SalesProductCard name="Cơm xúc xích" price={100000} onClick={handleProductClick}/>
                    <SalesProductCard name="Cơm xúc xích" price={1000} onClick={handleProductClick}/>
                    <SalesProductCard name="Cơm xúc xích" price={100000} onClick={handleProductClick}/>
                    <SalesProductCard name="Cơm xúc xích" price={100000} onClick={handleProductClick}/>
                </div>
                <div className="flex justify-end items-center bg-white p-2">
                    <div className="flex items-center gap-2">
                        {/* Previous Button */}
                        <IconButton
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                            sx={{
                                backgroundColor: 'gray.100',
                                color: 'gray.700',
                                '&:hover': { backgroundColor: 'gray.200' },
                                borderRadius: '999px', // Makes it fully rounded
                                minWidth: '20px', // Optional: to control button size
                                minHeight: '20px', // Optional: to control button size
                            }}
                        >
                            <ArrowBackIosIcon fontSize="small"/>
                        </IconButton>

                        {/* Pagination Text */}
                        <div className="text-sm text-gray-700">
                            <span className="font-bold text-blue-600">{currentPage}</span> / {totalPages}
                        </div>

                        {/* Next Button */}
                        <IconButton
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            sx={{
                                backgroundColor: 'gray.100',
                                color: 'gray.700',
                                '&:hover': { backgroundColor: 'gray.200' },
                                borderRadius: '999px', // Makes it fully rounded
                                minWidth: '20px', // Optional: to control button size
                                minHeight: '20px', // Optional: to control button size

                            }}
                        >
                            <ArrowForwardIosIcon fontSize="small"/>
                        </IconButton>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col flex-1 bg-white">
                {/* Tabs for Orders */}
                <div
                    className="flex items-center justify-between mb-4"
                    style={{
                        backgroundColor: bg_blue_800, // Blue background
                    }}
                >
                    {/* Tabs */}
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        sx={{
                            '& .MuiTabs-indicator': {
                                display: 'none', // Hide the border/indicator below tabs
                            },
                            '& .MuiTab-root': {
                                minWidth: 'auto', // Compact tabs
                                padding: '4px 12px', // Adjust padding inside tabs
                                fontSize: '0.875rem', // Smaller font size
                                color: '#fff', // White text color for unselected tabs
                                borderRadius: '10px 10px 0 0', // Add rounded corners to tabs
                                transition: 'background-color 0.3s',
                                '&.Mui-selected': {
                                    color: bg_blue_800, // Blue text for selected tab
                                    backgroundColor: '#fff', // White background for selected tab
                                    fontWeight: 'bold',
                                    '& .tab-text': {
                                        pointerEvents: 'none', // Disable interaction for the text only
                                    },
                                },
                                '&:not(.Mui-selected):hover': {
                                    backgroundColor: bg_blue_600, // Slightly darker blue on hover for unselected tabs
                                },
                            },
                        }}
                    >
                        {tabs.map((tab, index) => (
                            <Tab
                                key={index}
                                label={
                                    tabValue === index ? (
                                        <div className="flex items-center">
                                            {tab}
                                            <IconButton
                                                size="small"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent tab change on delete button click
                                                    handleDeleteTab(index);
                                                }}
                                                sx={{
                                                    marginLeft: '4px',
                                                    padding: '4px',
                                                    color: bg_grey_600, // Gray color for delete icon
                                                }}
                                            >
                                                <CloseIcon fontSize="inherit" />
                                            </IconButton>
                                        </div>
                                    ) : (
                                        tab
                                    )
                                }
                            />
                        ))}
                    </Tabs>

                    {/* Add New Tab Button */}
                    <IconButton
                        sx={{
                            color: '#fff',
                            backgroundColor: '#1976D2',
                            borderRadius: '50%',
                            '&:hover': {backgroundColor: '#1565C0'},
                            marginLeft: '8px',
                        }}
                        onClick={handleAddTab}
                    >
                        <AddIcon/>
                    </IconButton>
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
                    <Divider/>
                    {/* Repeat the order item block above for additional items */}
                </div>

                {/* Payment Section */}
                <div>
                    <Divider/>
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