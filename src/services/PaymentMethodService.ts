import {PaymentMethodDTO} from "../dtos/PaymentMethodDTO.ts";
import axiosInstance from "./base-service/axiosConfig.ts";
import {PAYMENT_METHOD_API} from "./base-service/apiEndpoints.ts";

export const PaymentMethodService = {
    getAllPaymentMethod: async (): Promise<PaymentMethodDTO[]> => {
        try {
            const response = await axiosInstance.get(PAYMENT_METHOD_API.GET_ALL_PAYMENT_METHOD);
            const data = response.data.data.map(PaymentMethodDTO.fromJSON);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}