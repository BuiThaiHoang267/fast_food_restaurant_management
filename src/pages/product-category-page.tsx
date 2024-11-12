import {CheckBoxCard, RadioBoxCard, SearchCard} from '../components/card';
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
    TablePagination
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import {success_600, success_700} from "../common/constant.ts";

const ProductCategoryPage = () => {
    const [categoryOptions, setCategoryOptions] = useState([
        { label: 'Đồ ăn', checked: false },
        { label: 'Đồ uống', checked: false },
        { label: 'Khác', checked: false },
    ]);
    const radioOptionsData = [
        { label: 'Tất cả', value: 'all' },
        { label: 'Dưới định mức tồn', value: 'below' },
        { label: 'Vượt định mức tồn', value: 'above' },
        { label: 'Còn hàng trong kho', value: 'inStock' },
        { label: 'Hết hàng trong kho', value: 'outOfStock' },
    ];
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
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRadioChange = (value: string) => {
        setRadioSelectedValue(value);
    };

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

    // Determine rows to display on the current page
    const displayedRows = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="flex-row flex">
            <div className="w-3/12 flex-col pl-10 pr-5 py-5 space-y-4">
                <SearchCard title="Tìm kiếm" placeholder="Theo mã, tên hàng" onSearch={handleSearch}/>
                <CheckBoxCard title="Loại hàng" options={categoryOptions} onChange={handleCategoryCardChange} />
                <RadioBoxCard title="Tồn kho" options={radioOptionsData} selectedValue={radioSelectedValue} onChange={handleRadioChange}/>
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
                            sx={{
                                backgroundColor: success_600,
                                '&:hover': {
                                    backgroundColor: success_700,
                                },
                            }}
                        >
                            Thêm mới
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                backgroundColor: success_600,
                                '&:hover': {
                                    backgroundColor: success_700,
                                },
                            }}
                        >
                            <ListIcon />
                        </Button>
                    </div>
                </div>

                <TableContainer component={Paper} sx={{ maxWidth: 850, maxHeight: 500, overflow: 'auto' }}>
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
                                <TableCell sx={{ minWidth: 100 }}>Mã hàng hóa</TableCell>
                                <TableCell sx={{ minWidth: 200 }}>Tên hàng</TableCell>
                                <TableCell sx={{ minWidth: 150 }}>Loại hàng</TableCell>
                                <TableCell sx={{ minWidth: 100 }}>Giá vốn</TableCell>
                                <TableCell sx={{ minWidth: 100 }}>Đơn giá nhập cuối</TableCell>
                                <TableCell sx={{ minWidth: 100 }}>Giá mới</TableCell>
                                <TableCell sx={{ minWidth: 100 }}>Giá mới</TableCell>
                                <TableCell sx={{ minWidth: 100 }}>Giá mới</TableCell>
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
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.category}</TableCell>
                                    <TableCell>{row.costPrice.toLocaleString()}</TableCell>
                                    <TableCell>{row.lastPrice.toLocaleString()}</TableCell>
                                    <TableCell>{row.newPrice.toLocaleString()}</TableCell>
                                    <TableCell>{row.newPrice.toLocaleString()}</TableCell>
                                    <TableCell>{row.newPrice.toLocaleString()}</TableCell>
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