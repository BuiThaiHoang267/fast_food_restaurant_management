import {useEffect, useState} from "react";
import {Button, Card, CardContent, IconButton, Menu, Radio, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {DateCalendar} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import dayjs from "dayjs";
import {color_green_primary, success_700} from "../common/constant.ts";
import {InputDurationDropdown} from "./input-duration-dropdown.tsx";

const CardTimeOrder = () => {
    const [startDate, setStartDate] = useState<Dayjs>(dayjs());
    const [endDate, setEndDate] = useState<Dayjs>(dayjs());
    const [durationStart, setDurationStart] = useState<Dayjs>(dayjs());
    const [durationEnd, setDurationEnd] = useState<Dayjs>(dayjs());
    const [onOpenCalendar, setOnOpenCalendar] = useState<null | HTMLElement>(null);
    const [checked, setChecked] = useState(true);
    const [expanded, setExpanded] = useState(true);

    const handleCalendarClose = () => {
        setOnOpenCalendar(null);
    };

    useEffect(() => {
        if(checked) {
            console.log('Call API with startDate:', formatDate(startDate), 'endDate:', formatDate(endDate));
        }
    }, [startDate, endDate]);

    const formatDate = (date: Dayjs | null): string => {
        if (!date) return ''; // Nếu không có ngày, trả về chuỗi rỗng
        return date.format('DD/MM/YYYY'); // Định dạng theo dd/MM/yyyy
    };

    const handleExpandClick = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

    const handleClickBtnFind = () => {
        console.log('Call API with startDate:', formatDate(durationStart), 'endDate:', formatDate(durationEnd));
        handleCalendarClose();
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card sx={{ minWidth: 200, padding: 0.5, borderRadius: 1, boxShadow: 1 }}>
            <CardContent sx={{ 'padding-bottom': '0px !important', padding: '4px 8px' }} className="space-y-2">
                <div className="flex items-center justify-between">
                    <Typography variant="body2" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Thời gian
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
                    <div className={'flex flex-col gap-2'}>
                        <div className={'flex flex-row items-center mr-2'}>
                            <Radio
                                name={'type-time'}
                                checked={checked}
                                onChange={() => setChecked(true)}
                                size={'small'}
                            />
                            <InputDurationDropdown onChange={(start, end) => {
                                setStartDate(start);
                                setEndDate(end);
                            }}/>
                        </div>
                        <div className={'flex flex-row items-center'}>
                            <Radio
                                name={'type-time'}
                                checked={!checked}
                                size={'small'}
                                onChange={() => setChecked(false)}
                            />
                            <div className={'flex flex-row justify-between items-center mr-2'}
                                style={{width: '100%', border: '1px solid grey', borderRadius: '8px', padding: '4px 0 4px 12px'}}
                                onClick={(e) => setOnOpenCalendar(e.currentTarget)}
                            >
                                <span style={{fontSize: '0.9rem', textWrap: 'nowrap'}}>
                                    {checked?"--Lựa chọn khác--":`${formatDate(durationStart)} - ${formatDate(durationEnd)}`}
                                </span>
                                <CalendarMonthIcon fontSize={'small'} style={{marginRight: '12px'}}/>

                            </div>
                            <Menu
                                anchorEl={onOpenCalendar}
                                open={Boolean(onOpenCalendar)}
                                onClose={handleCalendarClose}
                                MenuListProps={{
                                    onAuxClick: handleCalendarClose,
                                }}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                sx={{
                                    '& .MuiPaper-root': {
                                        transform: 'translateY(-8px) !important',
                                    },
                                }}>
                                <div className={'flex flex-col'}>
                                    <div className={'flex flex-row'}>
                                        <DateCalendar onChange={setDurationStart} maxDate={dayjs()}/>
                                        <DateCalendar onChange={setDurationEnd} minDate={durationStart} maxDate={dayjs()}/>
                                    </div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleClickBtnFind}
                                        sx={{
                                            textTransform: 'none',
                                            fontWeight: 'bold',
                                            borderRadius: '8px',
                                            marginLeft: 'auto',
                                            padding: '4px 24px',
                                            marginRight: '24px',
                                            transform: 'translateY(-20px)',
                                            backgroundColor: color_green_primary,
                                            '&:hover': {
                                                backgroundColor: success_700,
                                            },
                                        }}
                                    >
                                        Tìm kiếm
                                    </Button>
                                </div>
                            </Menu>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
        </LocalizationProvider>
    )
}

export default CardTimeOrder;