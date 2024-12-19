import {Divider, Typography} from "@mui/material";
import {RadioBoxCard} from "../components/card.tsx";
import {useEffect, useState} from "react";
import CardTimeOrder from "../components/card-time-order.tsx";
import dayjs, {Dayjs} from "dayjs";
import {AxisConfig, BarChart, ChartsXAxisProps, ChartsYAxisProps} from "@mui/x-charts";
import {
    bg_blue_500,
    bg_blue_600,
    bg_green_500,
    bg_grey_500,
    bg_yellow_500, color_green_primary,
    Error500,
} from "../common/constant.ts";
import {timeConverter} from "../utils/TimeElapsedConverter.ts";
import {BranchService} from "../services/BranchService.ts";
import {StatisticService} from "../services/StatisticService.ts";
import {StatisticSaleDTO} from "../dtos/StatisticSaleDTO.ts";
import {AxisDTO} from "../dtos/ResultSaleTodayDTO.ts";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MovingIcon from "@mui/icons-material/Moving";
import DescriptionIcon from "@mui/icons-material/Description";

const ReportSalePage = () => {
    const reportOptions = [
        {label: "Thời gian", value: "time"},
        {label: "Lợi nhuận", value: "profit"},
        {label: "Chi nhánh", value: "branch"}
    ]
    const [reportOption, setReportOption] = useState<string>("time")
    const [branchFilter, setBranchFilter] = useState<string>("");
    const [startDate, setStartDate] = useState<Dayjs>(dayjs());
    const [endDate, setEndDate] = useState<Dayjs>(dayjs());
    const [data, setData] = useState<StatisticSaleDTO>(
        new StatisticSaleDTO(0, 0, 0, 0, [], [], [], [], new AxisDTO([], []))
    );

    const [branchFilters, setBranchFilters] = useState([
        {label: "Tất cả", value: ""},
    ]);

    useEffect(() => {
        fetchAllBranch()
        getReportSale()
    }, []);

    useEffect(() => {
        getReportSale()
    }, [startDate, endDate, branchFilter]);

    const getReportSale = async () => {
        try {
            const response = await StatisticService.getDataStatisticalReportSale(branchFilter, startDate, endDate);
            setData(response);
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchAllBranch = async () => {
        try {
            const response = await BranchService.getAllBranch();
            console.log(response);
            setBranchFilters((prevFilters) => {
                return [...prevFilters, ...response.map((branch) => {
                    return {label: branch.name, value: branch.id.toString()}
                })]
            });
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleReportOptionChange = (value: string) => {
        setReportOption(value);
    }

    const handleBranchCardChange = (value: string) => {
        setBranchFilter(value);

    }

    const handleChangeDateInReportFilter = (start: Dayjs, end: Dayjs) => {
        setStartDate(start);
        setEndDate(end);
    }

    return (
        <div className="flex flex-row justify-between">
            <div className="w-3/12 flex-col pl-10 pr-5 py-5 space-y-4" style={{width: '25%'}}>
                <Typography variant="h6" component="div" gutterBottom sx={{fontWeight: 'bold'}}>
                    Báo cáo bán hàng
                </Typography>
                <RadioBoxCard title="Mối quan tâm" options={reportOptions} onChange={handleReportOptionChange} selectedValue={reportOption} />
                { reportOption !== "branch" &&
                    <RadioBoxCard title="Chi nhánh" options={branchFilters} onChange={handleBranchCardChange} selectedValue={branchFilter}/>
                }
                <CardTimeOrder onChangeDate={(start, end) => handleChangeDateInReportFilter(start, end)}/>
            </div>
            <div className="flex-grow flex-col pl-5 pr-10 py-5 space-y-2">

                <div className={'flex flex-col p-4'}
                     style=
                         {{
                             marginTop: "48px",
                             backgroundColor: "white",
                             borderRadius: "4px",
                             boxShadow: "0 0 8px 0 rgba(0,0,0,0.1)",
                         }}>
                    <span style={{fontSize: "1rem", fontWeight: "bold"}}>THỐNG KÊ TỔNG QUAN</span>
                    <div
                        className={'flex flex-row flex-1 items-center pt-2'}
                    >
                        <div className={'flex flex-row flex-1 items-center'}>
                            <div
                                className={'flex flex-row items-center justify-center'}
                                style={{height: 36, width: 36, borderRadius: 36, backgroundColor: bg_blue_600}}
                            >
                                <AttachMoneyIcon fontSize="medium" fontWeight='bold' sx={{color: 'white'}}/>
                            </div>
                            <div className={'flex-1 flex flex-col pl-4'}>
                                <span
                                    style={{fontSize: "0.9rem", fontWeight: "bold", color: bg_grey_500}}>Doanh số</span>
                                <div className={'flex flex-row items-center'}>
                                    <div style={{
                                        fontSize: "1.3rem",
                                        color: bg_blue_600
                                    }}>{data.totalRevenue.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>

                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{margin: '0 16px'}}
                        />

                        <div className={'flex flex-row flex-1 items-center'}>
                            <div
                                className={'flex flex-row items-center justify-center'}
                                style={{height: 36, width: 36, borderRadius: 36, backgroundColor: color_green_primary}}
                            >
                                <MovingIcon fontSize="medium" fontWeight='bold' sx={{color: 'white'}}/>
                            </div>
                            <div className={'flex-1 flex flex-col pl-4'}>
                                <span style={{
                                    fontSize: "0.9rem",
                                    fontWeight: "bold",
                                    color: bg_grey_500
                                }}>Lợi nhuận</span>
                                <div className={'flex flex-row items-center'}>
                                    <div style={{
                                        fontSize: "1.3rem",
                                        color: color_green_primary
                                    }}>{data.totalProfit.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>

                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{margin: '0 16px'}}
                        />

                        <div className={'flex flex-row flex-1 items-center'}>
                            <div
                                className={'flex flex-row items-center justify-center'}
                                style={{height: 36, width: 36, borderRadius: 36, backgroundColor: 'orange'}}
                            >
                                <MovingIcon fontSize="medium" fontWeight='bold' sx={{color: 'white'}}/>
                            </div>
                            <div className={'flex-1 flex flex-col pl-4'}>
                                <span style={{
                                    fontSize: "0.9rem",
                                    fontWeight: "bold",
                                    color: bg_grey_500
                                }}>Lợi nhuận</span>
                                <div className={'flex flex-row items-center'}>
                                    <div style={{
                                        fontSize: "1.3rem",
                                        color: 'orange'
                                    }}>{data.totalProfit.toLocaleString()}</div>
                                </div>
                            </div>
                        </div>

                        <Divider
                            orientation="vertical"
                            flexItem
                            sx={{margin: '0 16px'}}
                        />

                        <div className={'flex flex-row flex-1 items-center'}>
                            <div
                                className={'flex flex-row items-center justify-center'}
                                style={{height: 36, width: 36, borderRadius: 36, backgroundColor: Error500}}
                            >
                                <DescriptionIcon fontSize="small" fontWeight='bold' sx={{color: 'white'}}/>
                            </div>
                            <div className={'flex-1 flex flex-col pl-4'}>
                                <span
                                    style={{fontSize: "0.9rem", fontWeight: "bold", color: bg_grey_500}}>Hóa đơn</span>
                                <div className={'flex flex-row items-center'}>
                                    <div style={{fontSize: "1.3rem", color: Error500}}>{data.totalOrder}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div
                    className={"flex flex-col"}
                    style=
                        {{
                            marginTop: "16px",
                            backgroundColor: "white",
                            borderRadius: "4px",
                            padding: "16px",
                            boxShadow: "0 0 8px 0 rgba(0,0,0,0.1)",
                            alignItems: "center"
                        }}
                >
                    <span style={{
                        fontSize: "1rem",
                        fontWeight: "normal"
                    }}>Doanh Số {timeConverter(startDate.format("DD/MM/YYYY"), endDate.format("DD/MM/YYYY"), true)}</span>
                    {reportOption === "time" &&
                        <BarChart
                            series={[
                                {
                                    data: data.revenue,
                                    label: "Doanh số",
                                    color: bg_blue_500
                                },
                            ]}
                            height={400}
                            xAxis={[
                                {
                                    data: data.labels,
                                    scaleType: 'band',
                                    categoryGapRatio: 0.6,
                                }  as AxisConfig<'band', string, ChartsXAxisProps>
                            ]}
                            margin={{top: 40, bottom: 30, left: 65, right: 10}}
                        ></BarChart>
                    }
                    {reportOption === "profit" &&
                        <BarChart
                            series={[
                                {
                                    data: data.revenue,
                                    label: "Doanh số",
                                    color: bg_blue_500
                                },
                                {
                                    data: data.profit,
                                    label: "Lợi nhuận",
                                    color: bg_green_500
                                },
                                {
                                    data: data.cost,
                                    label: "Chi phí",
                                    color: bg_yellow_500
                                },
                            ]}
                            height={400}
                            xAxis={[
                                {
                                    data: data.labels,
                                    scaleType: 'band',
                                    categoryGapRatio: 0.6,
                                }   as AxisConfig<'band', string, ChartsXAxisProps>
                            ]}
                            margin={{top: 40, bottom: 30, left: 65, right: 10}}
                        ></BarChart>
                    }
                    {reportOption === "branch" &&
                        <BarChart
                            yAxis={[
                                {
                                    scaleType: 'band',
                                    data: data.revenueByBranch.labels,
                                    categoryGapRatio: 0.3, // Khoảng cách giữa các cột
                                }   as AxisConfig<'band', string, ChartsYAxisProps>,
                            ]}
                            series={[
                                {
                                    data: data.revenueByBranch.data,
                                    label: "Doanh số",
                                    color: bg_blue_500, // Màu cột
                                },
                            ]}
                            layout="horizontal" // Biểu đồ ngang
                            height={500} // Chiều cao biểu đồ
                            margin={{top: 40, bottom: 20, left: 100, right: 20}} // Khoảng cách các cạnh
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default ReportSalePage;