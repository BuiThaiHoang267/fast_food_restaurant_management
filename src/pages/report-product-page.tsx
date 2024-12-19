import {Typography} from "@mui/material";
import { RadioBoxCard} from "../components/card.tsx";
import CardTimeOrder from "../components/card-time-order.tsx";
import {useEffect, useState} from "react";
import dayjs, {Dayjs} from "dayjs";
import {bg_blue_500, color_green_primary} from "../common/constant.ts";
import {AxisConfig, BarChart, ChartsYAxisProps} from "@mui/x-charts";
import {BranchService} from "../services/BranchService.ts";
import {CategoryService} from "../services/CategoryService.ts";
import {StatisticService} from "../services/StatisticService.ts";
import {StatisticProductDTO} from "../dtos/StatisticSaleDTO.ts";
import {AxisDTO} from "../dtos/ResultSaleTodayDTO.ts";

const ReportProductPage = () => {
    const reportOptions = [
        {label: "Doanh thu", value: "revenue"},
        {label: "Lợi nhuận", value: "profit"},
        {label: "Số lượng bán", value: "sale"},
    ]

    const [reportOption, setReportOption] = useState<string>("revenue");
    const [categoryFilter, setCategoryFilter] = useState<string>("");
    const [branchFilter, setBranchFilter] = useState<string>("");
    const [startDate, setStartDate] = useState<Dayjs>(dayjs());
    const [endDate, setEndDate] = useState<Dayjs>(dayjs());
    const [branchFilters, setBranchFilters] = useState([
        {label: "Tất cả", value: ""},
    ]);
    const [categoryFilters, setCategoryFilters] = useState([
        {label: "Tất cả", value: ""},
    ]);
    const [data, setData] = useState<StatisticProductDTO>(new StatisticProductDTO(new AxisDTO([], []), new AxisDTO([], []), new AxisDTO([], [])));

    useEffect(() => {
        fetchAllBranch();
        fetchAllCategory();
        getTopProduct();
    }, []);

    useEffect(() => {
        getTopProduct();
    }, [startDate, endDate, branchFilter, categoryFilter]);

    const getTopProduct = async () => {
        try {
            const response = await StatisticService.getDataStatisticalReportProduct(startDate, endDate, branchFilter, categoryFilter);
            console.log(response);
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

    const fetchAllCategory = async () => {
        try {
            const response = await CategoryService.getAllCategory();
            console.log(response);
            setCategoryFilters((prevFilters) => {
                return [...prevFilters, ...response.map((category) => {
                    return {label: category.name, value: category.id.toString()}
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

    const handleCategoryCardChange = (value: string) => {
        setCategoryFilter(value);
    }

    const handleChangeDateInReportFilter = (start: Dayjs, end: Dayjs) => {
        setStartDate(start);
        setEndDate(end);
    }

    return (
        <div className="flex flex-row justify-between">
            <div className="w-3/12 flex-col pl-10 pr-5 py-5 space-y-4" style={{width: '25%'}}>
                <Typography variant="h6" component="div" gutterBottom sx={{fontWeight: 'bold'}}>
                    Báo cáo hàng hoá
                </Typography>
                <RadioBoxCard title="Mối quan tâm" options={reportOptions} onChange={handleReportOptionChange} selectedValue={reportOption} />
                <RadioBoxCard title="Chi nhánh" options={branchFilters} onChange={handleBranchCardChange} selectedValue={branchFilter}/>
                <CardTimeOrder onChangeDate={(start, end) => handleChangeDateInReportFilter(start, end)}/>

                <RadioBoxCard title="Danh mục" options={categoryFilters} onChange={handleCategoryCardChange} selectedValue={categoryFilter}/>
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

                    {reportOption === "revenue" &&
                        <BarChart
                            yAxis={[
                                {
                                    scaleType: 'band',
                                    data: data.topProductByRevenue.labels,
                                    categoryGapRatio: 0.3, // Khoảng cách giữa các cột
                                } as AxisConfig<'band', string, ChartsYAxisProps>,
                            ]}
                            series={[
                                {
                                    data: data.topProductByRevenue.data,
                                    color: bg_blue_500, // Màu cột
                                },
                            ]}
                            layout="horizontal" // Biểu đồ ngang
                            height={500} // Chiều cao biểu đồ
                            margin={{top: 20, bottom: 20, left: 170, right: 20}} // Khoảng cách các cạnh
                        />
                    }

                    {reportOption === "profit" &&
                        <BarChart
                            yAxis={[
                                {
                                    scaleType: 'band',
                                    data: data.topProductByProfit.labels,
                                    categoryGapRatio: 0.3, // Khoảng cách giữa các cột
                                } as AxisConfig<'band', string, ChartsYAxisProps>,
                            ]}
                            series={[
                                {
                                    data: data.topProductByProfit.data,
                                    color: color_green_primary, // Màu cột
                                },
                            ]}
                            layout="horizontal" // Biểu đồ ngang
                            height={500} // Chiều cao biểu đồ
                            margin={{top: 20, bottom: 20, left: 170, right: 20}} // Khoảng cách các cạnh
                        />
                    }

                    {reportOption === "sale" &&
                        <BarChart
                            yAxis={[
                                {
                                    scaleType: 'band',
                                    data: data.topProductBySale.labels,
                                    categoryGapRatio: 0.3, // Khoảng cách giữa các cột
                                } as AxisConfig<'band', string, ChartsYAxisProps>,
                            ]}
                            series={[
                                {
                                    data: data.topProductBySale.data,
                                    color: "orange", // Màu cột
                                },
                            ]}
                            layout="horizontal" // Biểu đồ ngang
                            height={500} // Chiều cao biểu đồ
                            margin={{top: 20, bottom: 20, left: 170, right: 20}} // Khoảng cách các cạnh
                        />
                    }

                </div>
            </div>
        </div>
    );
}

export default ReportProductPage;