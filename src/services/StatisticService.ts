import {DateRange, ResultSaleTodayDTO, RevenueChartDTO, TopProductDTO} from "../dtos/ResultSaleTodayDTO.ts";
import {STATISTIC_API} from "./base-service/apiEndpoints.ts";
import axiosInstance from "./base-service/axiosConfig.ts";
import {Dayjs} from "dayjs";
import {StatisticProductDTO, StatisticSaleDTO} from "../dtos/StatisticSaleDTO.ts";

export const StatisticService = {
    getResultSaleToday: async (): Promise<ResultSaleTodayDTO> => {
        try {
            const response = await axiosInstance.get(STATISTIC_API.GET_STATISTIC_RESULT_TODAY);
            console.log(response);
            const data = ResultSaleTodayDTO.fromJSON(response.data.data);
            console.log(data);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },

    getRevenueChart: async (startDate: Dayjs, endDate: Dayjs ): Promise<RevenueChartDTO> => {
        try {
            const dateRange = new DateRange(startDate, endDate);
            const query = new URLSearchParams(dateRange.convertToQueryObject()).toString();

            console.log(query);
            const response = await axiosInstance.get(`${STATISTIC_API.GET_REVENUE_CHART}?${query}`);
            console.log(response);
            const data = RevenueChartDTO.fromJSON(response.data.data);
            console.log(data);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },

    getTopProduct: async (startDate: Dayjs, endDate: Dayjs): Promise<TopProductDTO> => {
        try {
            const dateRange = new DateRange(startDate, endDate);
            const query = new URLSearchParams(dateRange.convertToQueryObject()).toString();

            const response = await axiosInstance.get(`${STATISTIC_API.GET_TOP_PRODUCT}?${query}`);
            console.log(response);
            const data = TopProductDTO.fromJSON(response.data.data);
            console.log(data);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },

    getDataStatisticalReportSale: async (branchId: string, startDate: Dayjs, endDate: Dayjs): Promise<StatisticSaleDTO> => {
        try {
            const dateRange = new DateRange(startDate, endDate);
            const query = (branchId === "") ? new URLSearchParams(dateRange.convertToQueryObject()).toString() : new URLSearchParams({...dateRange.convertToQueryObject(), branchId}).toString();

            const response = await axiosInstance.get(`${STATISTIC_API.GET_STATISTICAL_REPORT_SALE}?${query}`);
            console.log(response);
            const data = StatisticSaleDTO.fromJSON(response.data.data);
            console.log(data);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },

    getDataStatisticalReportProduct: async (startDate: Dayjs, endDate: Dayjs, branchId: string, categoryId: string): Promise<StatisticProductDTO> => {
        try {
            const dateRange = new DateRange(startDate, endDate);
            let query = new URLSearchParams(dateRange.convertToQueryObject()).toString();
            if (branchId !== "") {
                query += `&branchId=${branchId}`;
            }
            if (categoryId !== "") {
                query += `&categoryId=${categoryId}`;
            }

            const response = await axiosInstance.get(`${STATISTIC_API.GET_STATISTICAL_REPORT_PRODUCT}?${query}`);
            console.log(response);
            const data = StatisticProductDTO.fromJSON(response.data.data);
            console.log(data);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}