import {ResultSaleTodayDTO} from "../dtos/Order/ResultSaleTodayDTO.ts";
import {STATISTIC_API} from "./base-service/apiEndpoints.ts";
import axiosInstance from "./base-service/axiosConfig.ts";

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
    }
}