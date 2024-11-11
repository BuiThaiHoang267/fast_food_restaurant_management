import {AppBar, Button, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import {useState} from "react";
import CategoryIcon from '@mui/icons-material/Category';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ListIcon from '@mui/icons-material/List';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PieChartIcon from '@mui/icons-material/PieChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {bg_blue_500, bg_blue_700, bg_blue_800, color_white} from "../common/constant.ts";

const Navbar = () => {
    const navItemWidth = '125px';

    const [openProduct, setOpenProduct] = useState<null | HTMLElement>(null);
    const [openReport, setOpenReport] = useState<null | HTMLElement>(null);
    const [openUserMenu, setOpenUserMenu] = useState<null | HTMLElement>(null);

    const handleProductMenuOpen = (event: React.MouseEvent<HTMLElement>) => setOpenProduct(event.currentTarget);
    const handleProductMenuClose = () => setOpenProduct(null);

    const handleReportMenuOpen = (event: React.MouseEvent<HTMLElement>) => setOpenReport(event.currentTarget);
    const handleReportMenuClose = () => setOpenReport(null);

    const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => setOpenUserMenu(event.currentTarget);
    const handleUserMenuClose = () => setOpenUserMenu(null);

    return (
        <AppBar position="static" sx={{'--AppBar-background': bg_blue_500, flexDirection: 'row'}}>
            <div className="flex-row w-fit bg-inherit">
                {/*General*/}
                <Button
                    startIcon={<VisibilityIcon/>}
                    color="inherit"
                    sx={{
                        width: navItemWidth,
                        outline: 'none', // Remove outline
                        '&:focus': {outline: 'none'},
                    }}>
                    Tổng quan
                </Button>

                {/*Product*/}
                <Button
                    startIcon={<CategoryIcon/>}
                    onMouseEnter={handleProductMenuOpen}
                    // onMouseLeave={handleMenuClose}
                    color="inherit"
                    sx={{
                        width: navItemWidth,
                        outline: 'none', // Remove outline
                        '&:focus': {outline: 'none'},
                    }}>
                    Hàng hóa
                </Button>
                <Menu
                    anchorEl={openProduct}
                    open={Boolean(openProduct)}
                    onClose={handleProductMenuClose}
                    MenuListProps={{
                        onMouseLeave: handleProductMenuClose,
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    sx={{
                        '& .MuiPaper-root': {
                            backgroundColor: bg_blue_500,
                            color: color_white,
                        },
                    }}>
                    <MenuItem className="flex w-full gap-2">
                        <ListIcon fontSize="small"/>
                        <div>Category</div>
                    </MenuItem>
                    <MenuItem className="flex w-full gap-2">
                        <LocalOfferIcon fontSize="small"/>
                        <div>Price Setting</div>
                    </MenuItem>
                </Menu>

                {/*Employee*/}
                <Button
                    startIcon={<PeopleIcon/>}
                    color="inherit"
                    sx={{
                        width: navItemWidth,
                        outline: 'none', // Remove outline
                        '&:focus': {outline: 'none'},
                    }}>
                    Nhân viên
                </Button>

                {/*Report*/}
                <Button
                    startIcon={<AssessmentIcon/>}
                    onMouseEnter={handleReportMenuOpen}
                    color="inherit"
                    sx={{
                        width: navItemWidth,
                        outline: 'none', // Remove outline
                        '&:focus': {outline: 'none'},
                    }}>
                    Báo cáo
                </Button>
                <Menu
                    anchorEl={openReport}
                    open={Boolean(openReport)}
                    onClose={handleReportMenuClose}
                    MenuListProps={{
                        onMouseLeave: handleReportMenuClose,
                    }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    sx={{
                        '& .MuiPaper-root': {
                            backgroundColor: bg_blue_500,
                            color: color_white,
                        },
                    }}>
                    <MenuItem className="flex w-full gap-2">
                        <PieChartIcon fontSize="small"/>
                        <div>Cuối ngày</div>
                    </MenuItem>
                    <MenuItem className="flex w-full gap-2">
                        <CategoryIcon fontSize="small"/>
                        <div>Bán hàng</div>
                    </MenuItem>
                    <MenuItem className="flex w-full gap-2">
                        <FileCopyIcon fontSize="small"/>
                        <div>Hàng hoá</div>
                    </MenuItem>
                    <MenuItem className="flex w-full gap-2">
                        <TrendingUpIcon fontSize="small"/>
                        <div>Tài chính</div>
                    </MenuItem>
                </Menu>
            </div>
            <div className="flex-row ml-auto w-fit">
                {/*Sales*/}
                <Tooltip title="Sales">
                    <IconButton
                        color="inherit"
                        sx={{
                            backgroundColor: bg_blue_700,
                            borderRadius: '5%',
                            '&:focus': {outline: 'none'},
                            '&:hover': {
                                backgroundColor: bg_blue_800,
                            },
                        }}
                    >
                        <AttachMoneyIcon/>
                    </IconButton>
                </Tooltip>

                {/*Kitchen*/}
                <Tooltip title="Kitchen">
                    <IconButton
                        color="inherit"
                        sx={{
                            backgroundColor: bg_blue_700,
                            borderRadius: '5%',
                            '&:focus': {outline: 'none'},
                            '&:hover': {
                                backgroundColor: bg_blue_800,
                            },
                        }}
                    >
                        <LunchDiningIcon/>
                    </IconButton>
                </Tooltip>

                {/*User*/}
                <Tooltip title="User">
                    <IconButton
                        onClick={handleUserMenuOpen}
                        color="inherit"
                        sx={{
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
                    <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handleUserMenuClose}>Settings</MenuItem>
                    <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
                </Menu>
            </div>
        </AppBar>
    )
}

export default Navbar