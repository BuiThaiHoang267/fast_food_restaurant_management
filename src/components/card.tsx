﻿import {
    ButtonGroup,
    Card,
    CardContent,
    Checkbox, Collapse,
    FormControl,
    FormControlLabel,
    FormGroup,
    IconButton,
    InputAdornment, Radio, RadioGroup,
    TextField,
    Typography
} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import React, {useState} from "react";
import {
    bg_blue_600,
    bg_blue_800,
    bg_grey_600, color_green_primary, color_white,
    Error600,
    success_600
} from "../common/constant.ts";
import ProductDTO from "../dtos/ProductDTO.ts";
import {OrderDTO} from "../dtos/OrderDTO.ts";
import {OrderItemDTO} from "../dtos/OrderItemDTO.ts";
import dayjs from "dayjs";
import {OrderItemStatus} from "../common/order-status.ts";

interface SearchCardProps {
    title: string;
    placeholder: string;
    onSearch: (value: string) => void;
}

export const SearchCard: React.FC<SearchCardProps> = ({title, placeholder, onSearch}) => {
    const [searchValue, setSearchValue] = useState('');

    const handleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        if (e.target.value === '') {
            onSearch('');
        }
    }

    return (
        <Card sx={{minWidth: 200, padding: 0.5, borderRadius: 1, boxShadow: 1}}>
            <CardContent sx={{padding: '4px 8px'}} className="space-y-2">
                <Typography variant="body2" component="div" gutterBottom sx={{fontWeight: 'bold'}}>
                    {title}
                </Typography>
                <TextField
                    variant="standard"
                    placeholder={placeholder}
                    value={searchValue}
                    onChange={handleChanged}
                    fullWidth
                    slotProps={{
                        input: {
                            sx: {fontSize: '0.8rem'},
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => onSearch(searchValue)} edge="end">
                                        <SearchIcon fontSize="small"/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </CardContent>
        </Card>
    )
}

interface CheckBoxCardProps {
    title: string;
    options: { id: number; label: string; checked: boolean }[];
    onChange: (id: number, label: string, checked: boolean) => void;
}

export const CheckBoxCard: React.FC<CheckBoxCardProps> = ({title, options, onChange}) => {
    const [expanded, setExpanded] = useState(true);

    const handleExpandClick = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <Card sx={{minWidth: 200, padding: 0.5, borderRadius: 1, boxShadow: 1}}>
            <CardContent sx={{'padding-bottom': '0px !important', padding: '4px 8px'}} className="space-y-2">
                <div className="flex items-center justify-between">
                    <Typography variant="body2" component="div" gutterBottom sx={{fontWeight: 'bold'}}>
                        {title}
                    </Typography>
                    <IconButton onClick={handleExpandClick} size="small">
                        <ExpandMoreIcon
                            fontSize="small"
                            sx={{
                                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s',
                            }}
                        />
                    </IconButton>
                </div>
                {expanded && (
                    <FormGroup>
                        {options.map((option) => (
                            <FormControlLabel
                                key={option.label}
                                control={
                                    <Checkbox
                                        checked={option.checked}
                                        onChange={(e) => onChange(option.id, option.label, e.target.checked)}
                                        size="small"
                                    />
                                }
                                label={<Typography variant="body2"
                                                   sx={{fontSize: '0.8rem'}}>{option.label}</Typography>}
                            />
                        ))}
                    </FormGroup>
                )}
            </CardContent>
        </Card>
    );
}

interface RadioBoxCardProps {
    title: string;
    options: { label: string; value: string }[];
    selectedValue: string;
    onChange: (value: string) => void;
}
export const RadioBoxCard: React.FC<RadioBoxCardProps> = ({title, options, selectedValue, onChange}) => {
    const [expanded, setExpanded] = useState(true);

    const handleExpandClick = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <Card sx={{minWidth: 200, padding: 0.5, borderRadius: 1, boxShadow: 1}}>
            <CardContent sx={{'padding-bottom': '0px !important', padding: '4px 8px'}} className="space-y-2">
                <div className="flex items-center justify-between">
                    <Typography variant="body2" component="div" gutterBottom sx={{fontWeight: 'bold'}}>
                        {title}
                    </Typography>
                    <IconButton onClick={handleExpandClick} size="small">
                        <ExpandMoreIcon
                            fontSize="small"
                            sx={{
                                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s',
                            }}
                        />
                    </IconButton>
                </div>
                {expanded && (
                    <FormControl component="fieldset">
                        <RadioGroup
                            value={selectedValue}
                            onChange={(e) => onChange(e.target.value)}
                            sx={{padding: '0px 10px'}}
                        >
                            {options.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    value={option.value}
                                    control={<Radio size="small"/>}
                                    label={<Typography variant="body2"
                                                       sx={{fontSize: '0.8rem'}}>{option.label}</Typography>}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                )}
            </CardContent>
        </Card>
    );
}

interface ProductCardProps {
    product: ProductDTO
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const SalesProductCard: React.FC<ProductCardProps> = ({product, onClick}) => {
    return (
        <Card
            onClick={onClick}
            sx={{
                width: 140,
                height: 160,
                borderRadius: 2,
                border: '1px solid #ddd', // Light gray border
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'hidden',
                padding: 0,
                transition: 'box-shadow 0.2s ease-in-out', // Smooth transition for hover effect
                boxShadow: 'none', // No shadow in normal state
                cursor: 'pointer', // Indicate the card is clickable
                '&:hover': {
                    boxShadow: 4, // Add shadow on hover
                },
            }}
        >
            {/* Top Section with Image/Icon and Price */}
            <div
                style={{
                    width: '100%',
                    height: '60%',
                    backgroundColor: color_white, // Light blue background
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end', // Align price at the bottom
                    paddingBottom: '0px', // Add padding at the bottom for spacing
                }}
            >
                {product.image ? (
                    <img src={product.image} alt={""} style={{width: '50%', height: 'auto'}}/>
                ) : (
                    <RestaurantIcon sx={{fontSize: 30, color: '#90CAF9'}}/>
                )}
                {/* Price with White Background and Border */}
                <div
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: '4px 4px 0 0',
                        padding: '0px 6px', // Reduced padding for smaller appearance
                        marginTop: '4px',
                        display: 'inline-block',
                    }}
                >
                    <Typography
                        variant="caption" // Changed to caption for a smaller font size
                        sx={{
                            color: '#1E88E5',
                            fontWeight: 'bold',
                            fontSize: '0.75rem', // 12px font size for smaller text
                        }}
                    >
                        {product.price.toLocaleString()}
                    </Typography>
                </div>
            </div>

            {/* Bottom Section with Product Name */}
            <div
                style={{
                    width: '100%',
                    height: '40%',
                    backgroundColor: '#F5F5F5', // Light gray background for name section
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start', // Align name at the top
                    paddingTop: '0px', // Add padding at the top for spacing
                    flexDirection: 'column',
                }}
            >
                <Typography
                    variant="caption"
                    sx={{
                        color: '#424242',
                        fontSize: '0.75rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {product.name}
                </Typography>
            </div>
        </Card>
    );
}

interface OrderProductCardProps {
    index: number
    name: string;
    childNames: string[];
    quantity: number; // Controlled by parent
    price: number;
    onQuantityChange: (newQuantity: number) => void;
    onDelete: () => void;
}

export const OrderProductCard: React.FC<OrderProductCardProps> = ({
                                                                      index,
                                                                      name,
                                                                      childNames,
                                                                      quantity,
                                                                      price,
                                                                      onQuantityChange,
                                                                      onDelete,
                                                                  }) => {
    const handleIncrement = () => {
        onQuantityChange(quantity + 1); // Notify parent of increment
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            onQuantityChange(quantity - 1); // Notify parent of decrement
        }
    };

    return (
        <div
            className="transition-shadow hover:shadow-md"
            style={{
                border: '1px solid transparent', // No border by default
                borderRadius: 0, // No rounded corners
                transition: 'border-color 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = bg_blue_800; // Blue border on hover
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent'; // Reset border on mouse leave
            }}
        >
            {/* Order Item */}
            <div className="flex justify-between items-center p-4">
                {/* Product Name */}
                <div className="flex-grow max-w-[200px]">
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: 'bold',
                            whiteSpace: 'normal', // Allow wrapping
                            wordWrap: 'break-word', // Break words if they are too long
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >
                        {index + 1}. {name}
                    </Typography>
                    <div>
                        {childNames.map((child, index) => (
                            <Typography
                                key={index}
                                variant="body2"
                                sx={{
                                    fontSize: '0.875rem',
                                    color: '#666', // Grey color for child items
                                    display: 'block', // Ensure each child is on a new line
                                }}
                            >
                                {`${index + 1} ${child}`}
                            </Typography>
                        ))}
                    </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center flex-shrink-0 gap-2">
                    <ButtonGroup
                        size="small"
                        variant="outlined"
                        sx={{
                            borderRadius: '12px',
                            '& .MuiButtonGroup-grouped:not(:last-of-type)': {
                                borderColor: '#ddd',
                            },
                            '& .MuiButtonGroup-grouped': {
                                minWidth: '30px',
                                padding: '2px 6px',
                            },
                        }}
                    >
                        <IconButton
                            onClick={handleDecrement}
                            sx={{
                                border: '1px solid',
                                borderColor: bg_blue_800,
                                borderBottomRightRadius: '0',
                                borderTopRightRadius: '0',
                                borderRight: '0',
                                padding: '4px',
                                minWidth: '24px',
                            }}
                        >
                            <RemoveIcon fontSize="small"/>
                        </IconButton>
                        <Typography
                            variant="body2"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0 8px',
                                border: '1px solid',
                                borderColor: bg_blue_800,
                                borderLeft: '0',
                                borderRight: '0',
                                minWidth: '32px',
                            }}
                        >
                            {quantity}
                        </Typography>
                        <IconButton
                            onClick={handleIncrement}
                            sx={{
                                border: '1px solid',
                                borderColor: bg_blue_800,
                                borderBottomLeftRadius: '0',
                                borderTopLeftRadius: '0',
                                borderLeft: '0',
                                padding: '4px',
                                minWidth: '24px',
                            }}
                        >
                            <AddIcon fontSize="small"/>
                        </IconButton>
                    </ButtonGroup>
                </div>

                {/* Price and Delete */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    <Typography
                        variant="body2"
                        sx={{
                            width: '100px', // Fixed width for price
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            textAlign: 'right',
                        }}
                    >
                        {(price).toLocaleString()}đ
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 'bold',
                            width: '100px', // Fixed width for price
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            textAlign: 'right',
                        }}
                    >
                        {(quantity * price).toLocaleString()}đ
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={onDelete}
                        color="error"
                        sx={{
                            flexShrink: 0,
                        }}
                    >
                        <DeleteOutlineIcon fontSize="small"/>
                    </IconButton>
                </div>
            </div>
        </div>
    );
};

interface CookingProductCardProps {
    index: number;
    order: OrderDTO;
    onProcessProduct: (productIndex: number) => void;
    onProcessOrder: () => void;
    onDelete: (productIndex: number) => void;
}

export const CookingProductCard: React.FC<CookingProductCardProps> = ({
                                                                          index,
                                                                          order,
                                                                          onProcessProduct,
                                                                          onProcessOrder,
                                                                          onDelete
                                                                      }) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
        setCollapsed((prev) => !prev);
    };

    // Check if all products are deleted
    const allProductsDeleted = order.orderItems.every((product) => product.status === 'Canceled');

    return (
        <div
            className={`p-2 border ${
                (index % 2 == 1) ? "bg-blue-50" : "bg-white"
            }`}
        >
            <div className="flex items-center">
                {/* Collapse Button */}
                <IconButton
                    onClick={toggleCollapse}
                    sx={{
                        transition: "transform 0.2s",
                        transform: collapsed ? "rotate(90deg)" : "rotate(0deg)",
                    }}
                >
                    <KeyboardArrowRightIcon/>
                </IconButton>

                {/* Order Number and Time Elapsed */}
                <div className="flex flex-col ml-2 flex-shrink-0" style={{width: "100px"}}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: "bold",
                            color: bg_blue_600,
                            fontSize: "0.875rem",
                        }}
                    >
                        Order {order.numberOrder}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: bg_grey_600,
                            fontSize: "0.75rem", // Smaller text size for time elapsed
                        }}
                    >
                        {order.updatedAt.format('DD/MM/YYYY')}
                    </Typography>
                </div>

                {/* Total Quantity */}
                <div
                    className="flex items-center justify-center ml-auto flex-shrink-0"
                    style={{
                        textAlign: "center",
                        width: "40px",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: bg_blue_600,
                            fontSize: "0.875rem",
                        }}
                    >
                        {order.orderItems.reduce((acc, product) => acc + product.quantity, 0)}
                    </Typography>
                </div>

                {/* Process Button */}
                <div
                    className="flex items-end justify-end ml-4 flex-shrink-0"
                    style={{
                        width: "200px",
                    }}
                >
                    {!allProductsDeleted && (
                        <IconButton
                            size="large"
                            sx={{
                                color: Error600,
                            }}
                            onClick={onProcessOrder}
                        >
                            <KeyboardDoubleArrowRightIcon/>
                        </IconButton>
                    )}
                </div>

            </div>

            {/* Collapsible Product List */}
            <Collapse in={collapsed}>
                <div className="mt-2">
                    {order.orderItems.map((orderItem, index) => (
                        <div
                            key={index}
                            className={`py-2 ml-16 rounded flex justify-between items-center`}
                        >
                            <div className="flex flex-col flex-grow">
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontWeight: "bold",
                                        fontSize: "0.875rem",
                                    }}
                                >
                                    <img
                                        src={orderItem.productImage}
                                        alt={orderItem.productName}
                                        style={{
                                            width: "40px",
                                            height: "40px",
                                            marginRight: "4px",
                                        }}/>
                                    <span>{orderItem.productName}</span>
                                </Typography>
                                {orderItem.productComboItems && (
                                    <div className="mt-1">
                                        {orderItem.productComboItems.map((comboItem, subIndex) => (
                                            <Typography
                                                key={subIndex}
                                                variant="body2"
                                                sx={{
                                                    color: success_600,
                                                }}
                                            >
                                                {comboItem.quantity} {comboItem.productName}
                                            </Typography>
                                        ))}
                                    </div>
                                )}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        marginTop: '4px',
                                        color: bg_grey_600,
                                        fontSize: "0.75rem", // Smaller text size for time elapsed
                                    }}
                                >
                                    {order.updatedAt.format('DD/MM/YYYY HH:mm')}
                                </Typography>
                            </div>
                            <div
                                className="flex items-center justify-center ml-auto flex-shrink-0"
                                style={{
                                    textAlign: "center",
                                    width: "40px",
                                }}
                            >
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        fontSize: "0.875rem",
                                    }}
                                >
                                    {orderItem.quantity}
                                </Typography>
                            </div>

                            <div
                                className="flex items-end justify-end ml-4 flex-shrink-0"
                                style={{
                                    width: "200px",
                                }}
                            >
                                {(orderItem.status === 'Canceled') ? (
                                    <div className="flex flex-row items-center">
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: bg_grey_600,
                                                fontSize: "0.75rem", // Smaller text size for time elapsed
                                            }}
                                        >
                                            Huỷ vào {order.updatedAt.format('DD/MM/YYYY HH:mm')}
                                        </Typography>
                                        <IconButton
                                            size="large"
                                            onClick={() => onDelete(index)}
                                            color="default"
                                        >
                                            <DeleteOutlineIcon fontSize="small"/>
                                        </IconButton>
                                    </div>
                                ) : (
                                    <IconButton
                                        size="large"
                                        onClick={() => onProcessProduct(index)}
                                    >
                                        <KeyboardDoubleArrowRightIcon sx={{color: Error600}}/>
                                    </IconButton>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Collapse>
        </div>
    );
};

interface CookedProductCardProps {
    orderItem: OrderItemDTO;
    onProcessProduct: () => void;
    onDelete: () => void;
}

export const CookedProductCard: React.FC<CookedProductCardProps> = ({orderItem, onProcessProduct, onDelete}) => {
    return (
        <div>
            <div
                className="py-2 px-4 rounded flex justify-between items-center"
            >
                <div className="flex flex-col flex-grow">
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: "bold",
                            fontSize: "0.875rem",
                        }}
                    >
                        <img
                            src={orderItem.productImage}
                            alt={orderItem.productName}
                            style={{
                                width: "40px",
                                height: "40px",
                                marginRight: "4px",
                            }}/>
                        {orderItem.productName}
                    </Typography>
                    {orderItem.productComboItems && (
                        <div className="mt-1">
                            {orderItem.productComboItems.map((comboItem, subIndex) => (
                                <Typography
                                    key={subIndex}
                                    variant="body2"
                                    sx={{
                                        color: color_green_primary,
                                    }}
                                >
                                    {comboItem.quantity} {comboItem.productName}
                                </Typography>
                            ))}
                        </div>
                    )}
                    <div className={'flex flex-row justify-start items-end'}>
                        <span
                            style={{
                                color: color_green_primary,
                                fontSize: "0.9rem",
                                lineHeight: "0.9rem",
                                fontWeight: "700",
                            }}
                        >
                            Order {orderItem.orderNumberOrder}
                        </span>
                        <span
                            style={{
                                color: bg_grey_600,
                                fontSize: "0.75rem",
                                lineHeight: "0.75rem",
                                marginLeft: 12,
                            }}
                        >
                            {dayjs().format('DD/MM/YYYY HH:mm')}
                        </span>
                    </div>
                </div>
                <div
                    className="flex items-center justify-center ml-auto flex-shrink-0"
                    style={{
                        textAlign: "center",
                        width: "40px",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontSize: "0.875rem",
                        }}
                    >
                        {orderItem.quantity}
                    </Typography>
                </div>

                <div
                    className="flex items-end justify-end ml-4 flex-shrink-0"
                    style={{
                        width: "200px",
                    }}
                >
                    {(orderItem.status == OrderItemStatus.CANCELLED) ? (
                        <div className="flex flex-row items-center">
                            <Typography
                                variant="body2"
                                sx={{
                                    color: bg_grey_600,
                                    fontSize: "0.75rem", // Smaller text size for time elapsed
                                }}
                            >
                                Huỷ vào {dayjs().format('DD/MM/YYYY')}
                            </Typography>
                            <IconButton
                                size="large"
                                onClick={() => onDelete()}
                                color="default"
                            >
                                <DeleteOutlineIcon fontSize="small"/>
                            </IconButton>
                        </div>
                    ) : (
                        <IconButton
                            size="large"
                            onClick={onProcessProduct}
                        >
                            <KeyboardDoubleArrowRightIcon sx={{color: success_600}}/>
                        </IconButton>
                    )}
                </div>
            </div>
        </div>
    )
}

