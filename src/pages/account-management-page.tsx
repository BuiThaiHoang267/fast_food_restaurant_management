import {CheckBoxCard} from '../components/card';
import {useEffect, useState} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography, Checkbox,
    TablePagination, Menu,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import {
    bg_grey_100,
    color_black, color_green_primary,
    color_white,
    success_700
} from "../common/constant.ts";
import MenuFieldTable, {MenuFieldProps} from "../components/menu-field.tsx";
import {BranchService} from "../services/BranchService.ts";
import {RoleService} from "../services/RoleService.ts";
import {UserFilter, UserService} from "../services/UserService.ts";
import {UserDTO} from "../dtos/UserDTO.ts";
import DialogUser from "../components/dialog-user.tsx";

const AccountManagementPage = () => {
    const [openFilterTable, setOpenFilterTable] = useState<null | HTMLElement>(null);
    const [selectedRows, setSelectedRows] = useState<UserDTO[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [fields, setFields] = useState<MenuFieldProps[]>([
        { label: 'Mã người dùng', name: 'id', visible: false },
        { label: 'Tên người dùng', name: 'name', visible: true },
        { label: 'Tài khoản', name: 'username', visible: true },
        { label: 'Email', name: 'email', visible: true },
        { label: 'Số điện thoại', name: 'phone', visible: true },
        { label: 'Tên vai trò', name: 'roleName', visible: true },
        { label: 'Role Code', name: 'roleCode', visible: true },
        { label: 'Tên chi nhánh', name: 'branchName', visible: true },

    ]);
    const [openDialogAdd, setOpenDialogAdd] = useState(false);
    const [openDialogDetail, setOpenDialogDetail] = useState(false);
    const [roleFilter, setRoleFilter] = useState<{id: number, label: string, checked: boolean}[]>([]);
    const [branchFilter, setBranchFilter] = useState<{id: number, label: string, checked: boolean}[]>([]);
    const [users, setUsers] = useState<UserDTO[]>([]);
    const [userDetail, setUserDetail] = useState<UserDTO>(
        new UserDTO(0, '','' , '', '', '', 0, '', '', 0, '', true)
    );
    const [userFilter, setUserFilter] = useState<UserFilter>(
        {
            branches: [],
            roles: [],
        }
    );

    useEffect(() => {
        fetchAllBranch()
        fetchAllRole()
        fetchUserByFilters()
    }, []);

    useEffect(() => {
        fetchUserByFilters()
    }, [userFilter]);

    useEffect(() => {
        setPage(0);
    }, [users]);

    const fetchUserByFilters = async () => {
        try{
            const response = await UserService.getUserByFilter(userFilter);
            setUsers(response);
        }
        catch (error){
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

    const handleCloseDialogAdd = (isRerender: boolean) => {
        if(isRerender)
        {
            fetchUserByFilters();
        }
        setOpenDialogAdd(false);
    }

    const handleCloseDialogDetail = (isRerender: boolean) => {
        if(isRerender)
        {
            fetchUserByFilters();
        }
        setOpenDialogDetail(false);
    }

    const handleRoleCardChange = (id: number, label: string, checked: boolean) => {
        setRoleFilter((prevTypeFilter) =>
            prevTypeFilter.map((type) =>
                type.id === id ? { id, label , checked } : type
            )
        );
        setUserFilter((prevFilter) => {
            if(checked){
                return {...prevFilter, roles: [...prevFilter.roles, id]}
            }
            else{
                return {...prevFilter, roles: prevFilter.roles.filter((role) => role !== id)}
            }
        });
    }

    const handleBranchCardChange = (id: number, label: string, checked: boolean) => {
        setBranchFilter((prevTypeFilter) =>
            prevTypeFilter.map((type) =>
                type.id === id ? { id, label , checked } : type
            )
        );
        setUserFilter((prevFilter) => {
            if(checked){
                return {...prevFilter, branches: [...prevFilter.branches, id]}
            }
            else{
                return {...prevFilter, branches: prevFilter.branches.filter((branch) => branch !== id)}
            }
        });
    }

    // Handler for "Select All" checkbox
    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedRows(users);
        } else {
            setSelectedRows([]);
        }
    };
    // Handler for row selection (checkbox and row click)
    const toggleRowSelection = (order: UserDTO) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(order)) {
                return prevSelectedRows.filter((row) => row !== order);
            } else {
                return [...prevSelectedRows, order];
            }
        });
    };
    // Custom action when clicking on a row (other than the checkbox)
    const handleRowClick = (user: UserDTO) => {
        setUserDetail(user);
        setOpenDialogDetail(true);
    };
    // Handler for pagination change
    const handleChangePage = (e: unknown, newPage: number) => {
        console.log(e);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };

    const handleFilterTableOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenFilterTable(event.currentTarget);
    }

    const handleFilterTableClose = () => {
        setOpenFilterTable(null);
    }


    const handleCheckField = (name: string, visible: boolean) => {
        setFields((prevFields) =>
            prevFields.map((field) =>
                field.name === name ? { ...field, visible } : field
            )
        );
    }

    // Determine rows to display on the current page
    const displayedRows = users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="flex flex-row justify-between">
            <div className="w-3/12 flex-col pl-10 pr-5 py-5 space-y-4" style={{width: '350px'}}>
                <CheckBoxCard title="Vai trò" options={roleFilter} onChange={handleRoleCardChange} />
                <CheckBoxCard title="Chi nhánh" options={branchFilter} onChange={handleBranchCardChange} />
            </div>
            <div className="flex-grow flex-col pl-5 pr-10 py-5 space-y-2">
                <div className="flex items-center justify-between">
                    <Typography variant="h5" component="div" gutterBottom sx={{fontWeight: 'bold'}}>
                        Tài khoản
                    </Typography>
                    <div className="flex space-x-2">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => setOpenDialogAdd(true)}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 'bold',
                                borderRadius: '8px',
                                backgroundColor: color_green_primary,
                                '&:hover': {
                                    backgroundColor: success_700,
                                },
                            }}
                        >
                            Thêm tài khoản
                        </Button>
                        <DialogUser
                            open={openDialogAdd}
                            onClose={handleCloseDialogAdd}
                            user={userDetail}
                            isAdd={true}
                            branches={branchFilter}
                            roles={roleFilter}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleFilterTableOpen}
                            sx={{
                                textTransform: 'none',
                                borderRadius: '8px',
                                backgroundColor: color_green_primary,
                                '&:hover': {
                                    backgroundColor: success_700,
                                },
                            }}
                        >
                            <ListIcon/>
                        </Button>
                        <Menu
                            anchorEl={openFilterTable}
                            open={Boolean(openFilterTable)}
                            onClose={handleFilterTableClose}
                            MenuListProps={{
                                onAuxClick: handleFilterTableClose,
                            }}
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
                                    backgroundColor: color_white,
                                    color: color_black,
                                },
                            }}>
                            <MenuFieldTable menuFields={fields} onCheck={(name, visible) => handleCheckField(name, visible)} />
                        </Menu>
                    </div>
                </div>

                <TableContainer component={Paper} sx={{ overflow: 'auto' }}>
                    <Table
                        stickyHeader
                        aria-label="scrollable product table"
                        sx={{ minWidth: 800 , border: '1px solid #e0e0e0', borderRadius: 0}}
                    >
                        <TableHead
                            sx = {{
                                '& th': {
                                    backgroundColor: bg_grey_100,
                                    fontWeight: 'bold',

                                }
                            }}
                        >
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={
                                            selectedRows.length > 0 && selectedRows.length < users.length
                                        }
                                        checked={selectedRows.length === users.length}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                {fields.map((field, index) => (
                                    (field.visible && field.name != "image") && <TableCell key={index}>{field.label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedRows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    hover
                                    onClick={() => handleRowClick(row)}
                                    selected={selectedRows.includes(row)}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                            checked={selectedRows.includes(row)}
                                            onChange={() => toggleRowSelection(row)}
                                        />
                                    </TableCell>
                                    {fields.map((field, index) => (
                                        (field.visible && field.name != "image") && <TableCell key={index}>
                                            {row[field.name as keyof UserDTO]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <DialogUser
                    open={openDialogDetail}
                    onClose={handleCloseDialogDetail}
                    user={userDetail}
                    isAdd={false}
                    branches={branchFilter}
                    roles={roleFilter}
                />
                {/* Pagination Component */}
                <TablePagination
                    component="div"
                    count={users.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    labelRowsPerPage="Số bản ghi"
                />
            </div>
        </div>
    )
}

export default AccountManagementPage;