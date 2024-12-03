import {AxisDTO} from "./ResultSaleTodayDTO.ts";

export class StatisticSaleDTO {
    constructor(
        public totalRevenue: number,
        public totalProfit: number,
        public totalCost: number,
        public totalOrder: number,
        public revenue: number[],
        public profit: number[],
        public cost: number[],
        public labels: string[],
        public revenueByBranch: AxisDTO,
    ) {
    }

    static fromJSON(data: any): StatisticSaleDTO {
        return new StatisticSaleDTO(
            data.totalRevenue,
            data.totalProfit,
            data.totalCost,
            data.totalOrder,
            data.revenue,
            data.profit,
            data.cost,
            data.labels,
            AxisDTO.fromJSON(data.revenueByBranch),
        );
    }
}

export class StatisticProductDTO {
    constructor(
        public topProductByRevenue: AxisDTO,
        public topProductBySale: AxisDTO,
        public topProductByProfit: AxisDTO,
    ) {
    }

    static fromJSON(data: any): StatisticProductDTO {
        return new StatisticProductDTO(
            AxisDTO.fromJSON(data.topProductByRevenue),
            AxisDTO.fromJSON(data.topProductBySale),
            AxisDTO.fromJSON(data.topProductByProfit),
        );
    }
}