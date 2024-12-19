import dayjs, {Dayjs} from "dayjs";
import React, {useState} from "react";
import {MenuItem, TextField} from "@mui/material";
import {bg_blue_600} from "../common/constant.ts";

interface InputDurationDropdownProps {
    onChange: (startDate: Dayjs, endDate: Dayjs) => void;
    isChart?: boolean;
}

interface Duration {
    label: string;
    startDate: Dayjs;
    endDate: Dayjs;
}

export const InputDurationDropdown: React.FC<InputDurationDropdownProps> = ({onChange, isChart}) => {
    const [duration] = useState<Duration[]>(
        [
            {label: 'Hôm nay', startDate: dayjs(), endDate: dayjs()},
            {label: 'Hôm qua', startDate: dayjs().subtract(1, 'day'), endDate: dayjs().subtract(1, 'day')},
            {label: '7 ngày qua', startDate: dayjs().subtract(7, 'day'), endDate: dayjs()},
            {label: '30 ngày qua', startDate: dayjs().subtract(29, 'day'), endDate: dayjs()},
            {label: 'Tuần này', startDate: dayjs().startOf('week'), endDate: dayjs()},
            {label: 'Tháng này', startDate: dayjs().startOf('month'), endDate: dayjs()},
            {label: 'Toàn thời gian', startDate: dayjs("2024-11-15"), endDate: dayjs()},
        ]
    );

    const [value, setValue] = useState('Hôm nay');

    const handleClickItem = (value: Duration) => {
        setValue(value.label);
        onChange(value.startDate, value.endDate);
    }

    return (
        <TextField
            select
            variant="standard"
            value={value}
            sx={{
                width: '100%',
                fontSize: '0.8rem',
                '& .MuiSelect-select': {
                    padding: '4px',
                    color: isChart? bg_blue_600: 'black',
                    fontWeight: isChart? 'bold': 'normal',
                },
            }}
        >
            {duration.map((option, index) => (
                <MenuItem key={index} value={option.label} onClick={() => handleClickItem(option)}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>
    );
}