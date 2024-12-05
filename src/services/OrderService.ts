import {OrderDTO} from "../dtos/OrderDTO.ts";
import axiosInstance from "./base-service/axiosConfig.ts";
import {ORDER_API} from "./base-service/apiEndpoints.ts";
import {OrderItemDTO} from "../dtos/OrderItemDTO.ts";
import {toast} from "react-toastify";
import {OrderItemStatus, OrderStatus} from "../common/order-status.ts";

export const OrderService = {
    createOrder: async (order: OrderDTO) => {
        try {
            const response = await axiosInstance.post(ORDER_API.CREATE_ORDER, order, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            });
            console.log(response);
            toast.success("Order successfully!");
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
            const branchId = sessionStorage.getItem("branchId");
            const response = await axiosInstance.get(ORDER_API.GET_ORDER_STATUS_PENDING(branchId? branchId : "1"));
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
            const branchId = sessionStorage.getItem("branchId");
            const response = await axiosInstance.get(ORDER_API.GET_ORDER_ITEM_BY_STATUS_COOKED(branchId? branchId : "1"));
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
            const response = await axiosInstance.patch(ORDER_API.UPDATE_ORDER_ITEM(orderItem.id), orderItem, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            });
            if(orderItem.status === OrderItemStatus.COOKED)
            {
                toast.success(`Đã nấu xong ${orderItem.productName}!`);
            }
            else if(orderItem.status === OrderItemStatus.COMPLETED)
            {
                toast.success(`${orderItem.productName} được phục vụ!`);
            }
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
            toast.success(`Hoàn thành order ${order.numberOrder} thành công!`);
            console.log(response);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteOrder: async (id: number) => {
        try{
            const response = await axiosInstance.delete(ORDER_API.DELETE_ORDER(id), {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            });
            console.log(response);
            toast.success("Delete order successfully!")
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