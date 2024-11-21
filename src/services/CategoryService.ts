import axiosInstance from "./base-service/axiosConfig.ts";
import CategoryDTO from "../dtos/CategoryDTO.ts";
import {CATEGORY_API} from "./base-service/apiEndpoints.ts";

export const CategoryService = {
    getAllCategory: async (): Promise<CategoryDTO[]> => {
        try{
            const response = await axiosInstance.get(CATEGORY_API.GET_ALL_CATEGORY);
            console.log(response);
            const data = response.data.data.map(CategoryDTO.fromJSON)
            console.log(data);
            return data;
        }
        catch (error){
            console.error(error);
            throw error;
        }
    }
}