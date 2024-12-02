import dayjs, {Dayjs} from "dayjs";

export class ResultSaleTodayDTO {
    constructor(
        public totalRevenueToday: number,
        public totalProfitToday: number,
        public totalOrdersToday: number,
        public totalRevenueYesterday: number,
        public totalProfitYesterday: number,
        public totalOrdersYesterday: number,
        public percentRevenueChange: number,
        public percentProfitChange: number,
        public percentOrdersChange: number,
    ) {
    }

    static fromJSON(data: any): ResultSaleTodayDTO {
        return new ResultSaleTodayDTO(
            data.totalRevenueToday,
            data.totalProfitToday,
            data.totalOrdersToday,
            data.totalRevenueYesterday,
            data.totalProfitYesterday,
            data.totalOrdersYesterday,
            data.percentRevenueChange,
            data.percentProfitChange,
            data.percentOrdersChange,
        );
    }
}

export class RevenueChartDTO {
    constructor(
        public totalRevenue: number,
        public revenueChartByDay: AxisDTO,
        public revenueChartByDate: AxisDTO,
        public revenueChartByTime: AxisDTO,
    ) {
    }

    static fromJSON(data: any): RevenueChartDTO {
        return new RevenueChartDTO(
            data.totalRevenue,
            AxisDTO.fromJSON(data.revenueChartByDay),
            AxisDTO.fromJSON(data.revenueChartByDate),
            AxisDTO.fromJSON(data.revenueChartByTime),
        );
    }
}

export class AxisDTO {
    constructor(
        public labels: string[],
        public data: number[],
    ) {
    }

    static fromJSON(data: any): AxisDTO {
        return new AxisDTO(
            data.labels,
            data.data,
        );
    }
}

export class DateRange {
    constructor(
        public startDate: Dayjs,
        public endDate: Dayjs,
    ) {
    }

    convertToQueryObject(): Record<string, string> {
        return {
            startDate: this.startDate.startOf("day").format(),
            endDate: this.endDate.endOf("day").format(),
        };
    }
}