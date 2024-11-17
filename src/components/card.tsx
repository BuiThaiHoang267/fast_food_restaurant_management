import {
    Card,
    CardContent,
    Checkbox,
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
import {useState} from "react";

interface SearchCardProps {
    title: string;
    placeholder: string;
    onSearch: () => void;
}
export const SearchCard: React.FC<SearchCardProps> = ({ title, placeholder, onSearch }) => {
    return (
        <Card sx={{ minWidth: 200, padding: 0.5, borderRadius: 1, boxShadow: 1 }}>
            <CardContent sx={{ padding: '4px 8px' }} className="space-y-2">
                <Typography variant="body2" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {title}
                </Typography>
                <TextField
                    variant="standard"
                    placeholder={placeholder}
                    fullWidth
                    slotProps={{
                        input: {
                            sx: { fontSize: '0.8rem' },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={onSearch} edge="end">
                                        <SearchIcon fontSize="small" />
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
    options: { label: string; checked: boolean }[];
    onChange: (label: string, checked: boolean) => void;
}
export const CheckBoxCard: React.FC<CheckBoxCardProps> = ({ title, options, onChange }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <Card sx={{ minWidth: 200, padding: 0.5, borderRadius: 1, boxShadow: 1 }}>
            <CardContent sx={{ 'padding-bottom': '0px !important', padding: '4px 8px' }} className="space-y-2">
                <div className="flex items-center justify-between">
                    <Typography variant="body2" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
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
                                        onChange={(e) => onChange(option.label, e.target.checked)}
                                        size="small"
                                    />
                                }
                                label={<Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{option.label}</Typography>}
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
export const RadioBoxCard: React.FC<RadioBoxCardProps> = ({ title, options, selectedValue, onChange }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    return (
        <Card sx={{ minWidth: 200, padding: 0.5, borderRadius: 1, boxShadow: 1 }}>
            <CardContent sx={{ 'padding-bottom': '0px !important', padding: '4px 8px' }} className="space-y-2">
                <div className="flex items-center justify-between">
                    <Typography variant="body2" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
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
                        >
                            {options.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    value={option.value}
                                    control={<Radio size="small" />}
                                    label={<Typography variant="body2" sx={{ fontSize: '0.8rem' }}>{option.label}</Typography>}
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
    name: string;
    price: number;
    img?: string;
    onClick: () => void;
}
export const SalesProductCard: React.FC<ProductCardProps> = ({ name, price, img, onClick }) => {
    return (
        <Card
            onClick={onClick}
            sx={{
                width: 130,
                height: 150,
                borderRadius: 2,
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
                    backgroundColor: '#E3F2FD', // Light blue background
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end', // Align price at the bottom
                    paddingBottom: '0px', // Add padding at the bottom for spacing
                }}
            >
                {img ? (
                    <img src={img} alt={name} style={{ width: '50%', height: 'auto' }} />
                ) : (
                    <RestaurantIcon sx={{ fontSize: 30, color: '#90CAF9' }} />
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
                        {price.toLocaleString()}
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
                    }}
                >
                    {name}
                </Typography>
            </div>
        </Card>
    );
}