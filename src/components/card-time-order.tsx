import {useState} from "react";
import {Card, CardContent, IconButton, Menu, Radio, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {DateCalendar} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {Dayjs} from "dayjs";
import dayjs from "dayjs";

const CardTimeOrder = () => {
    const [startDate, setStartDate] = useState<Dayjs>(dayjs());
    const [endDate, setEndDate] = useState<Dayjs>(dayjs());
    const [onOpenCalendar, setOnOpenCalendar] = useState<null | HTMLElement>(null);

    const handleCalendarClose = () => {
        setOnOpenCalendar(null);
    };

    const formatDate = (date: Dayjs | null): string => {
        if (!date) return ''; // Nếu không có ngày, trả về chuỗi rỗng
        return date.format('DD/MM/YYYY'); // Định dạng theo dd/MM/yyyy
    };

    const [expanded, setExpanded] = useState(true);

    const handleExpandClick = () => {
        setExpanded((prevExpanded) => !prevExpanded);
    };

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
                        <div className={'flex flex-row items-center'}>
                            <Radio />
                        </div>
                        <div className={'flex flex-row items-center'}>
                            <Radio />
                            <div className={'flex flex-row justify-between items-center'}
                                style={{width: '100%', border: '1px solid #E0E0E0', borderRadius: '4px', padding: '4px'}}
                                onClick={(e) => setOnOpenCalendar(e.currentTarget)}
                            >
                                <span>{`${formatDate(startDate)} - ${formatDate(endDate)}`}</span>
                                <CalendarMonthIcon fontSize={'small'} />

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
                                        marginTop: '7px',
                                    },
                                }}>
                                <div className={'flex flex-row'}>
                                    <DateCalendar onChange={setStartDate}/>
                                    <DateCalendar onChange={setEndDate} minDate={startDate}/>
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