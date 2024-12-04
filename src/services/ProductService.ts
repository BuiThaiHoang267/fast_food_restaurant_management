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

    getProductByFilter: async (filter: ProductFilter): Promise<ProductDTO[]> => {
        try{
            const queryObject = Object.entries(filter).reduce((acc, [key, value]) => {
                acc[key] = value != null ? String(value) : '';
                return acc;
            }, {} as Record<string, string>);

            const query = new URLSearchParams(queryObject).toString();
            console.log(query);
            const response = await axiosInstance.get(`${PRODUCT_API.GET_PRODUCT_BY_FILTER}?${query}`);
            console.log(response);
            const data = response.data.data.map(ProductDTO.fromJSON)
            console.log(data);

            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },

    getProductByCategoryId: async (categoryId: number): Promise<ProductDTO[]> => {
        try {
            const response = await axiosInstance.get(`${PRODUCT_API.GET_PRODUCT_BY_CATEGORY_ID}/${categoryId}`);
            const data = response.data.data.map(ProductDTO.fromJSON);
            console.log(data);
            return data;
        }
        catch (error) {
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

    deleteProduct: async (productId: number) => {
        try {
            const response = await axiosInstance.patch(`${PRODUCT_API.DELETE_PRODUCT_BY_ID(productId)}`, {});
            console.log(response);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export interface ProductFilter {
    name: string;
    categories: number[];
    types: string[];
}