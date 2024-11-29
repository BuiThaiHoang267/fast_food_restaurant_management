import {OrderDTO} from "../dtos/OrderDTO.ts";
import axiosInstance from "./base-service/axiosConfig.ts";
import {ORDER_API} from "./base-service/apiEndpoints.ts";

export const OrderService = {
    createOrder: async (order: OrderDTO) => {
        try {
            const response = await axiosInstance.post(ORDER_API.CREATE_ORDER, order);
            console.log(response);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },

    getOrderByFilters: async (filter: OrderFilter): Promise<OrderDTO[]> => {
        try {
            const queryObject = Object.entries(filter).reduce((acc, [key, value]) => {
                acc[key] = value != null ? String(value) : '';
                return acc;
            }, {} as Record<string, string>);

            const query = new URLSearchParams(queryObject).toString();
            console.log(query);
            const response = await axiosInstance.get(`${ORDER_API.GET_ORDER_BY_FILTERS}?${query}`);
            console.log(response);
            const data = response.data.data.map(OrderDTO.fromJSON);
            console.log(data);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export interface OrderFilter {
    id: string,
    paymentMethods: number[],
    branches: number[],
    startDate: string,
    endDate: string,
}