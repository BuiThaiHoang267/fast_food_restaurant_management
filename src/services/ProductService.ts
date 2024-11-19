import ProductDTO from "../dtos/ProductDTO.ts";
import {PRODUCT_API} from "./base-service/apiEndpoints.ts";
import axiosInstance from "./base-service/axiosConfig.ts";

export const productService = {

    getAllProduct: async (): Promise<ProductDTO[]> => {
        try{
            const response = await axiosInstance.get(PRODUCT_API.GET_ALL_PRODUCT);
            console.log(response);
            return response.data.data.map(ProductDTO.fromJSON);
        }
        catch (error){
            console.error(error);
            throw error;
        }
    }
}