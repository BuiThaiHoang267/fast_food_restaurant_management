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
import DialogAddProduct from "../components/dialog-add-product.tsx";
import MenuFieldTable, {MenuFieldProps} from "../components/menu-field.tsx";
import {CategoryService} from "../services/CategoryService.ts";
import CategoryDTO from "../dtos/CategoryDTO.ts";
import {ProductFilter, productService} from "../services/ProductService.ts";
import ProductDTO from "../dtos/ProductDTO.ts";

const ProductCategoryPage = () => {
    const [openFilterTable, setOpenFilterTable] = useState<null | HTMLElement>(null);
    const [openDialogDetail, setOpenDialogDetail] = useState(false);
    const [openDialogAdd, setOpenDialogAdd] = useState(false);
    const [selectedRows, setSelectedRows] = useState<ProductDTO[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [fields, setFields] = useState<MenuFieldProps[]>([
        { label: 'Hình ảnh', name: 'image', visible: true },
        { label: 'Mã hàng', name: 'id', visible: false },
        { label: 'Tên món ăn', name: 'name', visible: true },
        { label: 'Danh mục', name: 'categoryName', visible: true },
        { label: 'Giá vốn', name: 'costPrice', visible: true },
        { label: 'Giá bán', name: 'price', visible: true },
    ]);
    const [categories, setCategories] = useState<CategoryDTO[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<{id: number, label: string, checked: boolean}[]>([]);
    const [typeFilter, setTypeFilter] = useState<{id: number, label: string, checked: boolean}[]>([{id: 1, label: "Combo", checked: false}, {id: 2, label: "Product", checked: false}]);
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [productDetail, setProductDetail] = useState<ProductDTO>();
    const [productFilter, setProductFilter] = useState<ProductFilter>({
        name: "",
        categories: [],
        types: [],
    });
    const [productSelectIndex, setProductSelectIndex] = useState<number>(0);

    useEffect(() => {
        fetchAllCategory();
        fetchProductByFilter();
    }, []);

    useEffect(() => {
        setCategoryFilter(categories.map((category) => ({id: category.id,label: category.name, checked: false})));
    }, [categories]);

    useEffect(() => {
        fetchProductByFilter();
    }, [productFilter]);

    useEffect(() => {
        setPage(0);
    }, [products]);

    const fetchAllCategory = async () => {
        try {
            if(sessionStorage.getItem("categories") !== null) {
                const data = JSON.parse(sessionStorage.getItem("categories") || "");
                console.log("Hello",data);
                setCategories(data);
                return;
            }
            const allCategory = await CategoryService.getAllCategory();
            setCategories(allCategory);
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchProductByFilter = async () => {
        try {
            const data = await productService.getProductByFilter(productFilter);
            setProducts(data);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleSearch = (value: string) => {
        setProductFilter((prevProductFilter) => ({ ...prevProductFilter, name: value }));
    }

    const handleTypeCardChange = (id: number, label: string, checked: boolean) => {
        setTypeFilter((prevTypeFilter) =>
            prevTypeFilter.map((type) =>
                type.id === id ? { id, label , checked } : type
            )
        );
        setProductFilter((prevProductFilter) => {
            if (checked) {
                return { ...prevProductFilter, types: [...prevProductFilter.types, label] };
            } else {
                return {...prevProductFilter, types: prevProductFilter.types.filter((type) => type !== label)};
            }
        });
    }

    const handleCategoryCardChange = (id: number, label: string, checked: boolean) => {
        setCategoryFilter((prevCategoryFilter) =>
            prevCategoryFilter.map((category) =>
                category.id === id ? { id, label , checked } : category
            )
        );
        setProductFilter((prevProductFilter) => {
            if (checked) {
                return { ...prevProductFilter, categories: [...prevProductFilter.categories, id] };
            } else {
                return { ...prevProductFilter, categories: prevProductFilter.categories.filter((category) => category !== id) };
            }
        });
    };
    // Handler for "Select All" checkbox
    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedRows(products);
        } else {
            setSelectedRows([]);
        }
    };
    // Handler for row selection (checkbox and row click)
    const toggleRowSelection = (product: ProductDTO) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(product)) {
                return prevSelectedRows.filter((row) => row !== product);
            } else {
                return [...prevSelectedRows, product];
            }
        });
    };
    // Custom action when clicking on a row (other than the checkbox)
    const handleRowClick = (product: ProductDTO) => {
        console.log(product);
        setProductDetail(product);
        setOpenDialogDetail(true);
        setProductSelectIndex(products.indexOf(product));
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

    const handleDialogAddClose = () => {
        setOpenDialogAdd(false);
    }

    const handleRemoveProduct = () => {
        setProducts((prevProducts) => {
            const newProducts = [...prevProducts];
            newProducts.splice(productSelectIndex, 1);
            return newProducts;
        });
    }

    const handleDialogDetailClose = () => {
        setOpenDialogDetail(false);
        setProductSelectIndex(0);
    }

    const handleCheckField = (name: string, visible: boolean) => {
        setFields((prevFields) =>
            prevFields.map((field) =>
                field.name === name ? { ...field, visible } : field
            )
        );
    }

    // Determine rows to display on the current page
    const displayedRows = products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <div className="flex-row flex">
            <div className="w-3/12 flex-col pl-10 pr-5 py-5 space-y-4" style={{width: '20%'}}>
                <SearchCard title="Tìm kiếm" placeholder="Theo tên món ăn" onSearch={handleSearch}/>
                <CheckBoxCard title="Combo/Món ăn" options={typeFilter} onChange={handleTypeCardChange} />
                <CheckBoxCard title="Danh mục" options={categoryFilter} onChange={handleCategoryCardChange} />
            </div>
            <div className="flex-grow flex-col pl-5 pr-10 py-5 space-y-2">
                <div className="flex items-center justify-between">
                    <Typography variant="h5" component="div" gutterBottom sx={{fontWeight: 'bold'}}>
                        Hàng Hóa
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
                            Thêm mới
                        </Button>
                        <DialogAddProduct open={openDialogAdd} onClose={handleDialogAddClose} onRemove={handleRemoveProduct} isAdd={true}></DialogAddProduct>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleFilterTableOpen}
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
                                            selectedRows.length > 0 && selectedRows.length < products.length
                                        }
                                        checked={selectedRows.length === products.length}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                {fields[0].visible && <TableCell style={{width: 50}}></TableCell>}
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
                                    {fields[0].visible && <TableCell style={{padding: "5px 0"}}><img src={row.image} alt={row.name} width={40} height={40}/></TableCell>}
                                    {fields.map((field, index) => (
                                        (field.visible && field.name != "image") && <TableCell key={index}>{row[field.name]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <DialogAddProduct open={openDialogDetail} onClose={handleDialogDetailClose} productParams={productDetail} onRemove={handleRemoveProduct} isAdd={false}/>
                {/* Pagination Component */}
                <TablePagination
                    component="div"
                    count={products.length}
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