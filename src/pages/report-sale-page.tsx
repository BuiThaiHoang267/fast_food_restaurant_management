import {Typography} from "@mui/material";
import {RadioBoxCard} from "../components/card.tsx";
import {useState} from "react";
import CardTimeOrder from "../components/card-time-order.tsx";
import dayjs, {Dayjs} from "dayjs";
import {BarChart} from "@mui/x-charts";
import {bg_blue_500, bg_green_500, bg_yellow_500} from "../common/constant.ts";
import {timeConverter} from "../utils/TimeElapsedConverter.ts";


interface ReportSaleFilter {
    branch: string,
    startDate: string,
    endDate: string
}
const ReportSalePage = () => {
    const reportOptions = [
        {label: "Thời gian", value: "time"},
        {label: "Lợi nhuận", value: "profit"},
        {label: "Chi nhánh", value: "branch"}
    ]
    const branchFilters = [
        {label: "Chi nhánh trung tâm", value: "0"},
        {label: "Chi nhánh 1", value: "1"},
    ]

    const [reportOption, setReportOption] = useState<string>("time")
    const [branchFilter, setBranchFilter] = useState<string>("");
    const [reportFilter, setReportFilter] = useState<ReportSaleFilter>(
        {
            branch: "",
            startDate: dayjs().add(-1,'day').format('DD/MM/YYYY'),
            endDate: dayjs().format('DD/MM/YYYY'),
        }
    );

    const handleReportOptionChange = (value: string) => {
        setReportOption(value);
    }

    const handleBranchCardChange = (value: string) => {
        setBranchFilter(value);
        setReportFilter((prevFilter) => {
            return {...prevFilter, branch: value}
        });
    }

    const handleChangeDateInReportFilter = (start: Dayjs, end: Dayjs) => {
        setReportFilter((prevFilter) => {
            return {...prevFilter, startDate: start.format('DD/MM/YYYY'), endDate: end.format('DD/MM/YYYY')}
        });
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
                <div
                    className={"flex flex-col"}
                    style=
                        {{
                            marginTop: "16px",
                            backgroundColor: "white",
                            borderRadius: "8px",
                            padding: "16px",
                            boxShadow: "0 0 8px 0 rgba(0,0,0,0.1)",
                            alignItems: "center"
                        }}
                >
                    <span style={{fontSize: "1rem", fontWeight: "normal"}}>Doanh Số {timeConverter(reportFilter.startDate, reportFilter.endDate)}</span>
                    {reportOption === "time" &&
                        <BarChart
                            series={[
                                {
                                    data: [2122700, 3000000, 400000, 510000, 7000000, 7000000, 7000000, 7000000, 7000000, 7000000, 7000000, 7000000],
                                    color: bg_blue_500
                                },
                            ]}
                            height={400}
                            xAxis={[{
                                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12],
                                scaleType: 'band',
                                categoryGapRatio: 0.6,
                            }]}
                            margin={{top: 10, bottom: 30, left: 65, right: 10}}
                        ></BarChart>
                    }
                    {reportOption === "profit" &&
                        <BarChart
                            series={[
                                {
                                    data: [2122700, 3000000, 400000, 510000, 7000000, 7000000, 7000000, 7000000, 7000000, 7000000, 7000000, 7000000],
                                    color: bg_blue_500
                                },
                                {
                                    data: [2122700, 3000000, 400000, 510000, 7000000, 7000000, 7000000, 7000000, 7000000, 7000000, 7000000, 7000000],
                                    color: bg_green_500
                                },
                                {
                                    data: [2122700, 3000000, 400000, 510000, 7000000, 7000000, 7000000, 7000000, 7000000, 7000000, 7000000, 7000000],
                                    color: bg_yellow_500
                                },
                            ]}
                            height={400}
                            xAxis={[{
                                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12],
                                scaleType: 'band',
                                categoryGapRatio: 0.6,
                            }]}
                            margin={{top: 10, bottom: 30, left: 65, right: 10}}
                        ></BarChart>
                    }
                    {reportOption === "branch" &&
                        <BarChart
                            yAxis={[
                                {
                                    scaleType: 'band',
                                    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                                    categoryGapRatio: 0.3, // Khoảng cách giữa các cột
                                },
                            ]}
                            series={[
                                {
                                    data: [2122700, 3000000, 400000, 510000, 7000000, 7000000, 7000000, 7000000, 7000000, 7000000],
                                    color: bg_blue_500, // Màu cột
                                },
                            ]}
                            layout="horizontal" // Biểu đồ ngang
                            height={500} // Chiều cao biểu đồ
                            margin={{top: 20, bottom: 20, left: 100, right: 20}} // Khoảng cách các cạnh
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default ReportSalePage;