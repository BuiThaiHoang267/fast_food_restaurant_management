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
    }
}