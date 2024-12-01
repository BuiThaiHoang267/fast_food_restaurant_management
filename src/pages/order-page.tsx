import {CheckBoxCard, SearchCard} from '../components/card';
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
import {Link} from "react-router-dom";
import {OrderDTO} from "../dtos/OrderDTO.ts";
import CardTimeOrder from "../components/card-time-order.tsx";
import {BranchService} from "../services/BranchService.ts";
import {PaymentMethodService} from "../services/PaymentMethodService.ts";
import {OrderFilter, OrderService} from "../services/OrderService.ts";
import dayjs, {Dayjs} from "dayjs";

const OrderPage = () => {
    const [openFilterTable, setOpenFilterTable] = useState<null | HTMLElement>(null);
    const [selectedRows, setSelectedRows] = useState<OrderDTO[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [fields, setFields] = useState<MenuFieldProps[]>([
        { label: 'Mã hóa đơn', name: 'id', visible: false },
        { label: 'Trạng thái', name: 'status', visible: true },
        { label: 'Số phục vụ', name: 'numberOrder', visible: true },
        { label: 'Chi nhánh', name: 'branchName', visible: true },
        { label: 'PT thanh toán', name: 'paymentMethodName', visible: true },
        { label: 'Ngày tạo', name: 'updatedAt', visible: true },
        { label: 'Tổng hóa đơn', name: 'totalPrice', visible: true },
    ]);
    const [paymentMethodFilter, setPaymentMethodFilter] = useState<{id: number, label: string, checked: boolean}[]>([]);
    const [branchFilter, setBranchFilter] = useState<{id: number, label: string, checked: boolean}[]>([]);
    const [orders, setOrders] = useState<OrderDTO[]>([]);
    const [orderDetail, setOrderDetail] = useState<OrderDTO>();
    const [orderFilter, setOrderFilter] = useState<OrderFilter>(
        {
            id: "",
            paymentMethods: [],
            branches: [],
            startDate: dayjs().add(-1,'day').format('DD/MM/YYYY'),
            endDate: dayjs().format('DD/MM/YYYY'),
        }
    );

    useEffect(() => {
        fetchAllBranch()
        fetchAllPaymentMethod()
        fetchOrderByFilters()
    }, []);

    useEffect(() => {
        fetchOrderByFilters()
    }, [orderFilter]);

    useEffect(() => {
        setPage(0);
    }, [orders]);

    const fetchOrderByFilters = async () => {
        try{
            const response = await OrderService.getOrderByFilters(orderFilter);
            setOrders(response);
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

    const fetchAllPaymentMethod = async () => {
        try{
            const response = await PaymentMethodService.getAllPaymentMethod();
            setPaymentMethodFilter(response.map((payment) => {
                return {id: payment.id, label: payment.name, checked: false}
            }));
        }
        catch (error){
            console.error(error);
        }
    }

    const handleSearch = (value: string) => {
        setOrderFilter((prevFilter) => {
            return {...prevFilter, id: value}
        });
    }

    const handlePaymentMethodCardChange = (id: number, label: string, checked: boolean) => {
        setPaymentMethodFilter((prevTypeFilter) =>
            prevTypeFilter.map((type) =>
                type.id === id ? { id, label , checked } : type
            )
        );
        setOrderFilter((prevFilter) => {
            if(checked){
                return {...prevFilter, paymentMethods: [...prevFilter.paymentMethods, id]}
            }
            else{
                return {...prevFilter, paymentMethods: prevFilter.paymentMethods.filter((payment) => payment !== id)}
            }
        });
    }

    const handleBranchCardChange = (id: number, label: string, checked: boolean) => {
        setBranchFilter((prevTypeFilter) =>
            prevTypeFilter.map((type) =>
                type.id === id ? { id, label , checked } : type
            )
        );
        setOrderFilter((prevFilter) => {
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
            setSelectedRows(orders);
        } else {
            setSelectedRows([]);
        }
    };
    // Handler for row selection (checkbox and row click)
    const toggleRowSelection = (order: OrderDTO) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(order)) {
                return prevSelectedRows.filter((row) => row !== order);
            } else {
                return [...prevSelectedRows, order];
            }
        });
    };
    // Custom action when clicking on a row (other than the checkbox)
    const handleRowClick = (order: OrderDTO) => {
        console.log(order);
        setOrderDetail(order);
    };
    // Handler for pagination change
    const handleChangePage = (e: unknown, newPage: number) => {
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

    const handleChangeDateInOrderFilter = (start: Dayjs, end: Dayjs) => {
        setOrderFilter((prevFilter) => {
            return {...prevFilter, startDate: start.format('DD/MM/YYYY'), endDate: end.format('DD/MM/YYYY')}
        });
    }

    // Determine rows to display on the current page
    const displayedRows = orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="flex flex-row justify-between">
            <div className="w-3/12 flex-col pl-10 pr-5 py-5 space-y-4" style={{width: '25%'}}>
                <SearchCard title="Tìm kiếm" placeholder="Theo mã hóa đơn" onSearch={handleSearch}/>
                <CheckBoxCard title="Phương thức thanh toán" options={paymentMethodFilter} onChange={handlePaymentMethodCardChange} />
                <CardTimeOrder onChangeDate={(start, end) => handleChangeDateInOrderFilter(start, end)}/>
                <CheckBoxCard title="Chi nhánh" options={branchFilter} onChange={handleBranchCardChange} />
            </div>
            <div className="flex-grow flex-col pl-5 pr-10 py-5 space-y-2">
                <div className="flex items-center justify-between">
                    <Typography variant="h5" component="div" gutterBottom sx={{fontWeight: 'bold'}}>
                        Hóa Đơn
                    </Typography>
                    <div className="flex space-x-2">
                        <Link to="/sales">
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
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
                                Nhận gọi món
                            </Button>
                        </Link>
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
                                            selectedRows.length > 0 && selectedRows.length < orders.length
                                        }
                                        checked={selectedRows.length === orders.length}
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
                                            {field.name === 'updatedAt' ? row[field.name].format('DD/MM/YYYY HH:mm') : row[field.name]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* Pagination Component */}
                <TablePagination
                    component="div"
                    count={orders.length}
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

export default OrderPage;