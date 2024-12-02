import {Typography} from "@mui/material";
import {CheckBoxCard, RadioBoxCard} from "../components/card.tsx";
import CardTimeOrder from "../components/card-time-order.tsx";
import {useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {timeConverter} from "../utils/TimeElapsedConverter.ts";
import {bg_blue_500} from "../common/constant.ts";
import {BarChart} from "@mui/x-charts";


interface ReportProductFilter {
    branch: string,
    categories: number[],
    startDate: string,
    endDate: string
}
const ReportProductPage = () => {
    const reportOptions = [
        {label: "Bán hàng", value: "sale"},
        {label: "Lợi nhuận", value: "profit"},
    ]
    const branchFilters = [
        {label: "Chi nhánh trung tâm", value: "0"},
        {label: "Chi nhánh 1", value: "1"},
    ]

    const [reportOption, setReportOption] = useState<string>("sale");
    const [categoryFilter, setCategoryFilter] = useState<{id: number, label: string, checked: boolean}[]>([]);
    const [branchFilter, setBranchFilter] = useState<string>("");
    const [reportFilter, setReportFilter] = useState<ReportProductFilter>(
        {
            branch: "",
            categories: [],
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

    const handleCategoryCardChange = (id: number, label: string, checked: boolean) => {
        setCategoryFilter((prevTypeFilter) =>
            prevTypeFilter.map((type) =>
                type.id === id ? { id, label , checked } : type
            )
        );
        setReportFilter((prevFilter) => {
            if(checked){
                return {...prevFilter, categories: [...prevFilter.categories, id]}
            }
            else{
                return {...prevFilter, categories: prevFilter.categories.filter((category) => category !== id)}
            }
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
                    Báo cáo hàng hoá
                </Typography>
                <RadioBoxCard title="Mối quan tâm" options={reportOptions} onChange={handleReportOptionChange} selectedValue={reportOption} />
                <RadioBoxCard title="Chi nhánh" options={branchFilters} onChange={handleBranchCardChange} selectedValue={branchFilter}/>
                <CheckBoxCard title="Danh mục" options={categoryFilter} onChange={handleCategoryCardChange} />
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
                    <span style={{fontSize: "1rem", fontWeight: "normal"}}>
                        {reportOption === "sale" && "Top 10 sản phẩm doanh số cao nhất"}
                        {reportOption === "profit" && "Lợi nhuận cao nhất"}
                    </span>

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

                </div>

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
                    <span style={{fontSize: "1rem", fontWeight: "normal"}}>
                        {reportOption === "sale" && "Top 10 sản phẩm bán chạy theo số lượng"}
                        {reportOption === "profit" && "Top 10 hàng hoá theo tỷ suất"}
                    </span>

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
                </div>
            </div>
        </div>
    );
}

export default ReportProductPage;