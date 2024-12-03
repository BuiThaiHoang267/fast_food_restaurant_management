import {IconButton, InputAdornment, MenuItem, TextField} from "@mui/material";
import {color_black, color_white} from "../common/constant.ts";
import SearchIcon from "@mui/icons-material/Search";
import React, {useState} from "react";
import ProductDTO from "../dtos/ProductDTO.ts";

interface InputTextProps {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

export const InputText: React.FC<InputTextProps> = ({ label, placeholder, value, onChange }) => {
    return (
        <div className="flex items-center justify-between">
            <div className="text-sm font-bold">{label}</div>
            <TextField
                variant= "standard"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                sx={{ width: '70%', fontSize: '0.8rem'}}
            />
        </div>
    );
}

interface InputDropdownProps {
    label: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
    onClickItem?: (value: string) => void;
}

export const InputDropdown: React.FC<InputDropdownProps> = ({ label, value, options, onChange , onClickItem}) => {

    const handleClickItem = (value: string) => {
        if (onClickItem) {
            onClickItem(value);
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div className="text-sm font-bold">{label}</div>
            <TextField
                select
                variant="standard"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                sx={{
                    width: '70%',
                    fontSize: '0.8rem',
                    '& .MuiSelect-select': {
                        padding: '4px', // Padding trong dropdown
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option} onClick={() => handleClickItem(option)}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
}

interface InputNumberProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
}

export const InputNumber: React.FC<InputNumberProps> = ({ label, value, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Nếu người dùng xóa hết thì set giá trị thành chuỗi rỗng
        if (inputValue === '') {
            onChange("");
            return;
        }

        // Chỉ set giá trị nếu nó là số hợp lệ
        const numericValue = Number(inputValue);
        if (!isNaN(numericValue)) {
            onChange(numericValue);
        }
    };

    return (
        <div className="flex items-center justify-between">
            <div className="text-sm font-bold">{label}</div>
            <TextField
                type="text" // Dùng type="text" thay vì "number" để tránh tự động set về 0
                variant="standard"
                value={value}
                onChange={ handleChange}
                sx={{
                    width: '50%',
                    fontSize: '0.8rem',
                    textAlign: 'end',
                    '& input': {
                        textAlign: 'end',
                    },
                }}
            />
        </div>
    );
}

interface InputNumberCustomProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    width?: string;
}

export const InputNumberCustom: React.FC<InputNumberCustomProps> = ({ label, value, onChange, width }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Nếu người dùng xóa hết thì set giá trị thành chuỗi rỗng
        if (inputValue === '') {
            onChange("");
            return;
        }

        // Chỉ set giá trị nếu nó là số hợp lệ
        const numericValue = Number(inputValue);
        if (!isNaN(numericValue)) {
            onChange(numericValue);
        }
    };

    return (
        <div className="flex items-center justify-between">
            <div>{label}</div>
            <TextField
                type="text" // Dùng type="text" thay vì "number" để tránh tự động set về 0
                variant="standard"
                value={value}
                onChange={ handleChange}
                sx={{
                    width: width?width:'50%',
                    fontSize: '1rem',
                    textAlign: 'end',
                    '& input': {
                        textAlign: 'end',
                    },
                }}
            />
        </div>
    );
}

interface InputQuantityProps {
    value: number;
    onChange: (value: number) => void;
}

export const InputQuantity: React.FC<InputQuantityProps> = ({value, onChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        // Nếu người dùng xóa hết thì set giá trị thành chuỗi rỗng
        if (inputValue === '') {
            onChange("");
            return;
        }

        // Chỉ set giá trị nếu nó là số hợp lệ
        const numericValue = Number(inputValue);
        if (!isNaN(numericValue)) {
            onChange(numericValue);
        }
    };

    return (
        <div className="flex items-center justify-between">
            <TextField
                type="text"
                variant="standard"
                value={value}
                onChange={ handleChange}
                sx={{
                    width: '50px',
                    fontSize: '0.8rem',
                    textAlign: 'end',
                    '& input': {
                        textAlign: 'end',
                    },
                }}
            />
        </div>
    );
}

interface InputSearchProductProps {
    value: string;
    onChange: (value: string) => void;
    recommendations: ProductDTO[];
    onClickItem?: (value: ProductDTO) => void;
    isBlack: boolean;
}

export const InputSearchProduct: React.FC<InputSearchProductProps> = ({ value, onChange, recommendations, onClickItem, isBlack = false}) => {
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
        setShowSuggestions(e.target.value.length > 0);
    };

    const handleSelectSuggestion = (suggestion: ProductDTO) => {
        onChange(suggestion.name);
        setShowSuggestions(false);
        if(onClickItem) {
            onClickItem(suggestion);
        }
    };

    return (
        <div>
            <TextField
                variant="standard"
                value={value}
                onChange={handleInputChange}
                placeholder="Tìm món"
                slotProps={{
                    input: {
                        sx: {
                            color:  isBlack?color_black:color_white,
                            fontSize: '0.875rem',
                        },
                        endAdornment: ( // Move the icon to the end of the input
                            <InputAdornment position="end">
                                <IconButton onClick={() => console.log('Search clicked')} edge="end">
                                    <SearchIcon sx={{color: isBlack?color_black:color_white }} fontSize="small"/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    },
                }}
                sx={{
                    backgroundColor: 'transparent',
                    borderRadius: '4px',
                    paddingLeft: '8px',
                    paddingRight: '8px',
                    width: '100%',
                    '& .MuiInput-underline:before': {
                        borderBottomColor: isBlack?color_black:color_white,
                    },
                    '& .MuiInput-underline:after': {
                        borderBottomColor: isBlack?color_black:color_white,
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottomColor: isBlack?color_black:color_white,
                    },
                }}
            />
            {showSuggestions && (
                <ul className="absolute overflow-y-auto bg-white shadow-lg z-10" style={{width: "400px", maxHeight:"260px"}}>
                    {recommendations
                        .filter((item) =>
                            item.name.toLowerCase().includes(value.toLowerCase())
                        )
                        .map((item, index) => (
                            <li
                                key={index}
                                className="flex flex-row px-4 py-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSelectSuggestion(item)}
                            >
                                <img src={item.image} alt="" className="w-8 h-8 object-cover rounded-full"/>
                                <span>{item.name}</span>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}