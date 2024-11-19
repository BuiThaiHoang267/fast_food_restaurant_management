import {MenuItem, TextField} from "@mui/material";

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
                variant="standard"
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
                    width: '70%',
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

