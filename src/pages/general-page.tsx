import { BarChart} from "@mui/x-charts";
import CardDashboardResultToday from "../components/card-dashboard-result-today.tsx";
import {bg_blue_500} from "../common/constant.ts";
import CardRecentlyAction from "../components/card-recently-action.tsx";

const generalPage = () => {
    const data = [
        { product: 'Product A', sales: 120 },
        { product: 'Product B', sales: 115 },
        { product: 'dhfhjd sdfhhdfs dsfhhsdf sdfhhdfs', sales: 110 },
        { product: 'Product D', sales: 105 },
        { product: 'Product E', sales: 95 },
        { product: 'Product F', sales: 90 },
        { product: 'Product G', sales: 85 },
        { product: 'Product H', sales: 80 },
        { product: 'Product I', sales: 75 },
        { product: 'Product J', sales: 70 },
    ];

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
                        <span style={{fontSize: "1rem", fontWeight: "bold"}}>DOANH SỐ HÔM NAY</span>
                        <BarChart
                            series={[
                                {data: [35, 44, 24, 34, 67, 23, 43], color: bg_blue_500},
                            ]}
                            height={400}
                            xAxis={[{
                                data: [35, 44, 24, 34, 67, 23, 43],
                                scaleType: 'band',
                                categoryGapRatio: 0.6,
                            }]}
                            margin={{top: 10, bottom: 30, left: 40, right: 10}}
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
                className={"flex flex-col"}
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
                <span style={{fontSize: "1rem", fontWeight: "bold"}}>TOP 10 SẢN PHẨM BÁN CHẠY NHẤT</span>
                <BarChart
                    yAxis={[
                        {
                            scaleType: 'band',
                            data: data.map((item) => item.product), // Gắn dữ liệu trục y là tên sản phẩm
                            categoryGapRatio: 0.3, // Khoảng cách giữa các cột
                        },
                    ]}
                    series={[
                        {
                            data: data.map((item) => item.sales), // Dữ liệu doanh số
                            color: bg_blue_500, // Màu cột
                        },
                    ]}
                    layout="horizontal" // Biểu đồ ngang
                    height={400} // Chiều cao biểu đồ
                    margin={{top: 20, bottom: 20, left: 200, right: 20}} // Khoảng cách các cạnh
                />
            </div>
        </div>
    )
}

export default generalPage;