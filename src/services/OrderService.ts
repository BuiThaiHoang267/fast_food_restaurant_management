import {OrderDTO} from "../dtos/OrderDTO.ts";
import axiosInstance from "./base-service/axiosConfig.ts";
import {ORDER_API} from "./base-service/apiEndpoints.ts";
import {OrderItemDTO} from "../dtos/OrderItemDTO.ts";

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
    },

    getOrderStatusPending: async (): Promise<OrderDTO[]> => {
        try{
            const response = await axiosInstance.get(ORDER_API.GET_ORDER_STATUS_PENDING);
            console.log(response);
            const data = response.data.data.map(OrderDTO.fromJSON);
            console.log(data);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },

    getOrderItemStatusCooked: async (): Promise<OrderItemDTO[]> => {
        try{
            const response = await axiosInstance.get(ORDER_API.GET_ORDER_ITEM_BY_STATUS_COOKED);
            console.log(response);
            const data = response.data.data.map(OrderItemDTO.fromJSON);
            console.log(data);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateOrderItem: async (orderItem: OrderItemDTO) => {
        try {
            const response = await axiosInstance.patch(ORDER_API.UPDATE_ORDER_ITEM(orderItem.id), orderItem);
            console.log(response);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateOrder: async (order: OrderDTO) => {
        try{
            const response = await axiosInstance.patch(ORDER_API.UPDATE_ORDER(order.id), order);
            console.log(response);
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