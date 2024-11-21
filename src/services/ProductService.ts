import ProductDTO from "../dtos/ProductDTO.ts";
import {PRODUCT_API} from "./base-service/apiEndpoints.ts";
import axiosInstance from "./base-service/axiosConfig.ts";

export const productService = {

    getAllProduct: async (): Promise<ProductDTO[]> => {
        try{
            const response = await axiosInstance.get(PRODUCT_API.GET_ALL_PRODUCT);
            console.log(response);
            const data = response.data.data.map(ProductDTO.fromJSON)
            console.log(data);
            return data;
        }
        catch (error){
            console.error(error);
            throw error;
        }
    },

    getByTypeProduct: async (): Promise<ProductDTO[]> => {
        try{
            const response = await axiosInstance.get(PRODUCT_API.GET_PRODUCT_BY_TYPE_PRODUCT);
            console.log(response);
            const data = response.data.data.map(ProductDTO.fromJSON)
            console.log(data);
            return data;
        }
        catch (error){
            console.error(error);
            throw error;
        }
    },

    createProduct: async (product: ProductDTO) => {
        try {
            const response = await axiosInstance.post(PRODUCT_API.CREATE_PRODUCT, product);
            console.log(response);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
}