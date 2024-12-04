import {AppBar, Button, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";
import React, {useEffect, useState} from "react";
import CategoryIcon from '@mui/icons-material/Category';
import {Link, useNavigate} from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DescriptionIcon from '@mui/icons-material/Description';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {bg_blue_500, bg_blue_600, bg_blue_700, bg_blue_800, color_white} from "../common/constant.ts";
import {UserService} from "../services/UserService.ts";
import {UserDTO} from "../dtos/UserDTO.ts";
import {BranchService} from "../services/BranchService.ts";
import {RoleService} from "../services/RoleService.ts";
import DialogUserProfile from "./dialog-user-profile.tsx";

const Navbar = () => {
    const navigate = useNavigate();
    const [openReport, setOpenReport] = useState<null | HTMLElement>(null);
    const [openUserMenu, setOpenUserMenu] = useState<null | HTMLElement>(null);

    const [openDialogDetail, setOpenDialogDetail] = useState(false);
    const [userDetail, setUserDetail] = useState<UserDTO>(
        new UserDTO(0, '','' , '', '', '', 0, '', '', 0, '', true)
    );
    const [branchFilter, setBranchFilter] = useState<{id: number, label: string, checked: boolean}[]>([]);
    const [roleFilter, setRoleFilter] = useState<{id: number, label: string, checked: boolean}[]>([]);

    const handleReportMenuOpen = (event: React.MouseEvent<HTMLElement>) => setOpenReport(event.currentTarget);
    const handleReportMenuClose = () => setOpenReport(null);

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

    useEffect(() => {
        fetchUserInfo();
        fetchAllBranch();
        fetchAllRole();
    }, []);

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
                        {/*<Link to="/report">*/}
                        {/*    <MenuItem className="flex w-full gap-2">*/}
                        {/*        <PieChartIcon fontSize="small"/>*/}
                        {/*        <div>Cuối ngày</div>*/}
                        {/*    </MenuItem>*/}
                        {/*</Link>*/}
                        <Link to="/report-sale">
                            <MenuItem className="flex w-full gap-2">
                                <CategoryIcon fontSize="small"/>
                                <div>Bán hàng</div>
                            </MenuItem>
                        </Link>
                        <Link to="/report-product">
                            <MenuItem className="flex w-full gap-2">
                                <FileCopyIcon fontSize="small"/>
                                <div>Hàng hoá</div>
                            </MenuItem>
                        </Link>
                        {/*<Link to="/report-finance">*/}
                        {/*    <MenuItem className="flex w-full gap-2">*/}
                        {/*        <TrendingUpIcon fontSize="small"/>*/}
                        {/*        <div>Tài chính</div>*/}
                        {/*    </MenuItem>*/}
                        {/*</Link>*/}
                    </Menu>
                </div  >
                <div className="flex-row ml-auto w-fit content-center">
                    {/*Sales*/}
                    <Tooltip title="Thu ngân">
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
                    <Tooltip title="Nhà bếp">
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
                    <Tooltip title="Người dùng">
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
                        <MenuItem onClick={handleProfile}>Hồ sơ</MenuItem>
                        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                    </Menu>
                </div>
            </div>
            <DialogUserProfile
                open={openDialogDetail}
                onClose={() => setOpenDialogDetail(false)}
                user={userDetail}
                isAdd={false}
                branches={branchFilter}
                roles={roleFilter}
            />
        </AppBar>
    )
}

export default Navbar