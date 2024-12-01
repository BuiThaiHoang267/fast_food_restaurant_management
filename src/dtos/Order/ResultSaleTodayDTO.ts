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