import {BarChart} from "@mui/x-charts";

const generalPage = () => {
    return (
        <div className={"flex flex-row justify-center"}>
            <div className={"flex flex-col"} style={{width: "60%"}}>
                <div
                    className={"flex flex-row"}
                    style=
                        {{
                            height: "300px" ,
                            backgroundColor: "white",
                            margin: "16px",
                            borderRadius: "8px",
                            padding: "16px",
                            boxShadow: "0 0 8px 0 rgba(0,0,0,0.1)"
                        }}
                >
                    <span style={{fontSize: "1rem", fontWeight: "bold"}}>KẾT QUẢ BÁN HÀNG HÔM NAY</span>
                </div>
                <div
                    className={"flex flex-col h-full"}
                    style=
                        {{
                            backgroundColor: "white",
                            margin: "8px 16px",
                            borderRadius: "8px",
                            padding: "16px",
                            boxShadow: "0 0 8px 0 rgba(0,0,0,0.1)"
                        }}
                >
                    <span style={{fontSize: "1rem", fontWeight: "bold"}}>DOANH SỐ HÔM NAY</span>
                    <BarChart
                        series={[
                            { data: [35, 44, 24, 34] },
                            { data: [51, 6, 49, 30] },
                            { data: [15, 25, 30, 50] },
                            { data: [60, 50, 15, 25] },
                        ]}
                        height={290}
                        xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
                        margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                    />
                </div>
            </div>
            <div
                className={"flex flex-col"}
                style=
                    {{
                        width: "20%",
                        backgroundColor: "white",
                        margin: "16px 8px 8px 8px",
                        borderRadius: "8px",
                        padding: "16px",
                        boxShadow: "0 0 8px 0 rgba(0,0,0,0.1)"
                    }}
            >
                <span style={{fontSize: "1rem", fontWeight: "bold"}}>CÁC HOẠT ĐỘNG GẦN ĐÂY</span>

            </div>
        </div>
    )
}

export default generalPage;