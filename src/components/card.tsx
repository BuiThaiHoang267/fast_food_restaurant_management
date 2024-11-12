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