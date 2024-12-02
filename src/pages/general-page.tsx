import { BarChart} from "@mui/x-charts";
import CardDashboardResultToday from "../components/card-dashboard-result-today.tsx";
import {bg_blue_500} from "../common/constant.ts";
import CardRecentlyAction from "../components/card-recently-action.tsx";
import dayjs, {Dayjs} from "dayjs";
import {StatisticService} from "../services/StatisticService.ts";
import {AxisDTO, RevenueChartDTO, TopProductDTO} from "../dtos/Order/ResultSaleTodayDTO.ts";
import {InputDurationDropdown} from "../components/input-duration-dropdown.tsx";
import {Box, Tab, Tabs} from "@mui/material";
import {useEffect, useState} from "react";

const generalPage = () => {
    const filterChart1 = [
        "revenueChartByDate",
        "revenueChartByDay",
        "revenueChartByTime"
    ]

    const filterChart2 = [
        "topProductByRevenue",
        "topProductBySale",
    ]

    const [dataChartRevenue, setDataChartRevenue] = useState<RevenueChartDTO>(new RevenueChartDTO(0, {labels: [], data: []}, {labels: [], data: []}, {labels: [], data: []}));
    const [dataChartTopProduct, setDataChartTopProduct] = useState<TopProductDTO>(new TopProductDTO({labels: [], data: []}, {labels: [], data: []}));
    const [startDate, setStartDate] = useState<Dayjs>(dayjs());
    const [endDate, setEndDate] = useState<Dayjs>(dayjs());
    const [startDateProduct, setStartDateProduct] = useState<Dayjs>(dayjs());
    const [endDateProduct, setEndDateProduct] = useState<Dayjs>(dayjs());
    const [tabSelected, setTabSelected] = useState<string>(filterChart1[0]);
    const [tabSelectedProduct, setTabSelectedProduct] = useState<string>(filterChart2[0]);
    const [data1, setData1] = useState<AxisDTO>({labels: [], data: []});
    const [data2, setData2] = useState<AxisDTO>({labels: [], data: []});


    useEffect(() => {
        fetchRevenueChart();
    }, [startDate,endDate]);

    useEffect(() => {
        fetchTop10Product();
    }, [startDateProduct,endDateProduct]);

    useEffect(() => {
        setData1(dataChartRevenue[tabSelected as keyof RevenueChartDTO] as AxisDTO);
    }, [tabSelected,dataChartRevenue]);

    useEffect(() => {
        setData2(dataChartTopProduct[tabSelectedProduct as keyof TopProductDTO] as AxisDTO);
    }, [tabSelectedProduct,dataChartTopProduct]);

    const fetchRevenueChart = async () => {
        try{
            const response = await StatisticService.getRevenueChart(startDate, endDate);
            console.log(response);
            setDataChartRevenue(response);
        }
        catch (error) {
            console.error(error);
        }
    }

    const fetchTop10Product = async () => {
        try{
            const response = await StatisticService.getTopProduct(startDateProduct, endDateProduct);
            console.log(response);
            setDataChartTopProduct(response);
        }
        catch (error) {
            console.error(error);
        }
    }


    const handleChangTab = (event: React.SyntheticEvent, newValue: string) => {
        setTabSelected(newValue);
    }

    const handleChangTabProduct = (event: React.SyntheticEvent, newValue: string) => {
        setTabSelectedProduct(newValue);
    }

    return (
        <div className={"flex flex-col items-center"}>
            <div className={"flex flex-row justify-center gap-4"} style={{width: '80%'}}>
                <div className={"flex flex-1 flex-col"} >
                    <div
                        style=
                            {{
                                marginTop: "16px",
                                height: "150px",
                                backgroundColor: "white",
                                borderRadius: "8px",
                                padding: "16px",
                                boxShadow: "0 0 8px 0 rgba(0,0,0,0.1)"
                            }}
                    >
                        <CardDashboardResultToday/>
                    </div>
                    <div
                        className={"flex flex-col"}
                        style=
                            {{
                                marginTop: "16px",
                                backgroundColor: "white",
                                borderRadius: "8px",
                                padding: "16px",
                                boxShadow: "0 0 8px 0 rgba(0,0,0,0.1)"
                            }}
                    >
                        <div className={'flex flex-row justify-between items-center'}>
                            <div className={'flex flex-row flex-1'}>
                                <span style={{
                                    fontSize: "1rem",
                                    fontWeight: "bold"
                                }}>DOANH SỐ</span>
                                <span style={{
                                    fontSize: "1rem",
                                    fontWeight: "bold",
                                    color: bg_blue_500,
                                    marginLeft: "8px"
                                }}>{dataChartRevenue.totalRevenue.toLocaleString()} VND</span>
                            </div>
                            <div>
                                <InputDurationDropdown isChart={true} onChange={(start, end) => {
                                    setStartDate(start);
                                    setEndDate(end);
                                }}/>
                            </div>
                        </div>
                        <Box sx={{
                            marginBottom: "16px",
                        }}>
                            <Tabs value={tabSelected} onChange={handleChangTab} aria-label="basic tabs example">
                                <Tab label="Theo ngày" value={filterChart1[0]} sx={{ textTransform: 'none'}} />
                                <Tab label="Theo thứ" value={filterChart1[1]} sx={{ textTransform: 'none'}} />
                                <Tab label="Theo giờ" value={filterChart1[2]} sx={{ textTransform: 'none'}} />
                            </Tabs>
                        </Box>
                        <BarChart
                            series={[
                                {data: data1.data,  color: bg_blue_500},
                            ]}
                            height={400}
                            xAxis={[{
                                data: data1.labels,
                                scaleType: 'band',
                                categoryGapRatio: 0.6,
                            }]}
                            margin={{top: 10, bottom: 30, left: 80, right: 10}}
                        ></BarChart>
                    </div>
                </div>
                <div
                    className={"flex flex-col"}
                    style=
                        {{
                            width: '360px',
                            height: '622px',
                            marginTop: "16px",
                            backgroundColor: "white",
                            borderRadius: "8px",
                            padding: "16px 0px",
                            boxShadow: "0 0 8px 0 rgba(0,0,0,0.1)"
                        }}
                >
                    <CardRecentlyAction></CardRecentlyAction>
                </div>
            </div>
            <div
                className={"flex flex-col mb-6"}
                style=
                    {{
                        width: '80%',
                        marginTop: "16px",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        padding: "16px",
                        boxShadow: "0 0 8px 0 rgba(0,0,0,0.1)",
                    }}
            >
                <div className={'flex flex-row justify-between items-center'}>
                    <div className={'flex flex-row flex-1'}>
                        <span style={{
                            fontSize: "1rem",
                            fontWeight: "bold"
                        }}>TOP 10 SẢN PHẨM BÁN CHẠY</span>
                    </div>
                    <div>
                        <InputDurationDropdown isChart={true} onChange={(start, end) => {
                            setStartDateProduct(start);
                            setEndDateProduct(end);
                        }}/>
                    </div>
                </div>
                <Box sx={{
                    marginBottom: "16px",
                }}>
                    <Tabs value={tabSelectedProduct} onChange={handleChangTabProduct} aria-label="basic tabs example">
                        <Tab label="Theo doanh số" value={filterChart2[0]} sx={{ textTransform: 'none'}} />
                        <Tab label="Theo số lượng" value={filterChart2[1]} sx={{ textTransform: 'none'}} />
                    </Tabs>
                </Box>
                <BarChart
                    yAxis={[
                        {
                            scaleType: 'band',
                            data: data2.labels, // Gắn dữ liệu trục y là tên sản phẩm
                            categoryGapRatio: 0.3, // Khoảng cách giữa các cột
                        },
                    ]}
                    series={[
                        {
                            data: data2.data, // Dữ liệu doanh số
                            color: bg_blue_500, // Màu cột
                        },
                    ]}
                    layout="horizontal" // Biểu đồ ngang
                    height={400} // Chiều cao biểu đồ
                    margin={{top: 10, bottom: 20, left: 250, right: 20}} // Khoảng cách các cạnh
                />
            </div>
        </div>
    )
}

export default generalPage;