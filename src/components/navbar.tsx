import {AppBar, Button, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import React, {useState} from "react";
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import PieChartIcon from '@mui/icons-material/PieChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {bg_blue_500, bg_blue_600, bg_blue_700, bg_blue_800, color_white} from "../common/constant.ts";

const Navbar = () => {

    const [openReport, setOpenReport] = useState<null | HTMLElement>(null);
    const [openUserMenu, setOpenUserMenu] = useState<null | HTMLElement>(null);

    const handleReportMenuOpen = (event: React.MouseEvent<HTMLElement>) => setOpenReport(event.currentTarget);
    const handleReportMenuClose = () => setOpenReport(null);

    const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => setOpenUserMenu(event.currentTarget);
    const handleUserMenuClose = () => setOpenUserMenu(null);

    return (
        <AppBar className={'flex flex-row justify-center items-center'} position="static" sx={{'--AppBar-background': bg_blue_600, flexDirection: 'row'}}>
            <div className={'flex flex-row justify-between items-center'} style={{width: '95%'}}>
                <div className="flex-row w-fit bg-inherit" style={{padding: '8px 0'}}>
                    {/*General*/}
                    <Link to="/">
                        <Button
                            startIcon={<VisibilityIcon/>}
                            color="inherit"
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                padding: '0 10px',
                                outline: 'none', // Remove outline
                                '&:focus': {outline: 'none'},
                            }}>
                            Tổng quan
                        </Button>
                    </Link>

                    {/*Product*/}
                    <Link to={'/product-category'}>
                        <Button
                            startIcon={<CategoryIcon/>}
                            color="inherit"
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                padding: '0 10px',
                                outline: 'none', // Remove outline
                                '&:focus': {outline: 'none'},
                            }}>
                            Hàng hóa
                        </Button>
                    </Link>

                    <Link to={'/orders'}>
                        <Button
                            startIcon={<DescriptionIcon/>}
                            color="inherit"
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                padding: '0 10px',
                                outline: 'none', // Remove outline
                                '&:focus': {outline: 'none'},
                            }}>
                            Hóa đơn
                        </Button>
                    </Link>

                    {/*Employee*/}
                    <Link to={'/account-management'}>
                        <Button
                            startIcon={<PeopleIcon/>}
                            color="inherit"
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                padding: '0 10px',
                                outline: 'none', // Remove outline
                                '&:focus': {outline: 'none'},
                            }}>
                            Tài khoản
                        </Button>
                    </Link>

                    {/*Report*/}
                    <Button
                        startIcon={<AssessmentIcon/>}
                        onMouseEnter={handleReportMenuOpen}
                        color="inherit"
                        sx={{
                            textTransform: 'none',
                            fontWeight: 'bold',
                            padding: '0 10px',
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
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        sx={{
                            '& .MuiPaper-root': {
                                backgroundColor: bg_blue_600,
                                color: color_white,
                                marginTop: '7px'
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
                </div  >
                <div className="flex-row ml-auto w-fit content-center">
                    {/*Sales*/}
                    <Tooltip title="Sales">
                        <Link to="/sales">
                            <IconButton
                                className="h-full"
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
                        </Link>
                    </Tooltip>

                    {/*Kitchen*/}
                    <Tooltip title="Kitchen">
                        <Link to="/kitchen">
                            <IconButton
                                className="h-full"
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
                        </Link>
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
            </div>
        </AppBar>
    )
}

export default Navbar