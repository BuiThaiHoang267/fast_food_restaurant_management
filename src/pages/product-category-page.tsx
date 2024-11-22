import {CheckBoxCard, SearchCard} from '../components/card';
import {useState} from "react";
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
import { color_black, color_white, success_600, success_700} from "../common/constant.ts";
import DialogAddProduct from "../components/dialog-add-product.tsx";
import MenuFieldTable, {MenuFieldProps} from "../components/menu-field.tsx";

const ProductCategoryPage = () => {
    const [categoryOptions, setCategoryOptions] = useState([
        { label: 'Đồ ăn', checked: false },
        { label: 'Đồ uống', checked: false },
        { label: 'Khác', checked: false },
    ]);

    const data = [
        { id: 'SP000020', name: 'Lemon Juice', category: 'Beverages', costPrice: 7000, lastPrice: 7000, newPrice: 15000 },
        { id: 'SP000021', name: 'Bia Heineken', category: 'Beverages', costPrice: 20500, lastPrice: 20500, newPrice: 30000 },
        { id: 'SP000022', name: 'Bia Hà Nội', category: 'Beverages', costPrice: 20500, lastPrice: 20500, newPrice: 30000 },
        { id: 'SP000023', name: 'Thuốc lá Vinataba', category: 'Cigarettes', costPrice: 20500, lastPrice: 20500, newPrice: 30000 },
        { id: 'SP000024', name: 'Thuốc lá Marlboro', category: 'Cigarettes', costPrice: 20500, lastPrice: 20500, newPrice: 30000 },
        { id: 'SP000025', name: 'Thuốc lá Kent HD', category: 'Cigarettes', costPrice: 20500, lastPrice: 20500, newPrice: 30000 },
        { id: 'SP000010', name: 'Xúc xích Đức nướng mu tạt vàng', category: 'Snacks', costPrice: 100500, lastPrice: 100500, newPrice: 125000 },
        { id: 'SP000011', name: 'Súp kem rau 4 mùa', category: 'Soup', costPrice: 100500, lastPrice: 100500, newPrice: 125000 },
        { id: 'SP000012', name: 'Súp kem gà nấm hoàng', category: 'Soup', costPrice: 100500, lastPrice: 100500, newPrice: 125000 },
    ];

    const [radioSelectedValue, setRadioSelectedValue] = useState('all');
    const [openFilterTable, setOpenFilterTable] = useState<null | HTMLElement>(null);
    const [openDialogAdd, setOpenDialogAdd] = useState(false);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [fields, setFields] = useState<MenuFieldProps[]>([
        { label: 'Mã hàng', name: 'id', visible: true },
        { label: 'Tên hàng', name: 'name', visible: true },
        { label: 'Loại hàng', name: 'category', visible: true },
        { label: 'Giá vốn', name: 'costPrice', visible: true },
        { label: 'Giá cuối', name: 'lastPrice', visible: true },
        { label: 'Giá mới', name: 'newPrice', visible: true },
    ]);



    const handleSearch = () => {
        console.log('searching...');
    }
    const handleCategoryCardChange = (label: string, checked: boolean) => {
        setCategoryOptions((prevOptions) =>
            prevOptions.map((option) =>
                option.label === label ? { ...option, checked } : option
            )
        );
    };
    // Handler for "Select All" checkbox
    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedRows(data.map((row) => row.id)); // Select all row IDs
        } else {
            setSelectedRows([]); // Deselect all rows
        }
    };
    // Handler for row selection (checkbox and row click)
    const toggleRowSelection = (id: string) => {
        setSelectedRows((prevSelected) =>
            prevSelected.includes(id)
                ? prevSelected.filter((rowId) => rowId !== id)
                : [...prevSelected, id]
        );
    };
    // Custom action when clicking on a row (other than the checkbox)
    const handleRowClick = (id: string) => {
        // Replace this with your custom action, like opening a detail view
        console.log(`Row clicked with ID: ${id}`);
    };
    // Handler for pagination change
    const handleChangePage = (event: unknown, newPage: number) => {
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

    const handleDialogAddClose = () => {
        setOpenDialogAdd(false);
    }

    const handleCheckField = (name: string, visible: boolean) => {
        setFields((prevFields) =>
            prevFields.map((field) =>
                field.name === name ? { ...field, visible } : field
            )
        );
    }

    // Determine rows to display on the current page
    const displayedRows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="flex-row flex">
            <div className="w-3/12 flex-col pl-10 pr-5 py-5 space-y-4">
                <SearchCard title="Tìm kiếm" placeholder="Theo mã, tên hàng" onSearch={handleSearch}/>
                <CheckBoxCard title="Loại hàng" options={categoryOptions} onChange={handleCategoryCardChange} />
                {/*<RadioBoxCard title="Tồn kho" options={radioOptionsData} selectedValue={radioSelectedValue} onChange={handleRadioChange}/>*/}
            </div>
            <div className="flex-grow flex-col pl-5 pr-10 py-5 space-y-2">
                <div className="flex items-center justify-between">
                    <Typography variant="h6" component="div" gutterBottom sx={{fontWeight: 'bold'}}>
                        Hàng hóa
                    </Typography>
                    <div className="flex space-x-2">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={() => setOpenDialogAdd(true)}
                            sx={{
                                backgroundColor: success_600,
                                '&:hover': {
                                    backgroundColor: success_700,
                                },
                            }}
                        >
                            Thêm mới
                        </Button>
                        <DialogAddProduct open={openDialogAdd} onClose={handleDialogAddClose}></DialogAddProduct>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleFilterTableOpen}
                            sx={{
                                backgroundColor: success_600,
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
                        sx={{ minWidth: 800 }}
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        indeterminate={
                                            selectedRows.length > 0 && selectedRows.length < data.length
                                        }
                                        checked={selectedRows.length === data.length}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                {fields.map((field, index) => (
                                    field.visible && <TableCell key={index}>{field.label}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedRows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    hover
                                    onClick={() => handleRowClick(row.id)}
                                    selected={selectedRows.includes(row.id)}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                                        <Checkbox
                                            checked={selectedRows.includes(row.id)}
                                            onChange={() => toggleRowSelection(row.id)}
                                        />
                                    </TableCell>
                                    {fields.map((field, index) => (
                                        field.visible && <TableCell key={index}>{row[field.name]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* Pagination Component */}
                <TablePagination
                    component="div"
                    count={data.length}
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

export default ProductCategoryPage;