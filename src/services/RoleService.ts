import axiosInstance from "./base-service/axiosConfig.ts";
import {ROLE_API} from "./base-service/apiEndpoints.ts";
import {RoleDTO} from "../dtos/RoleDTO.ts";

export const RoleService = {
    getAllRole: async () : Promise<RoleDTO[]> => {
        try {
            const response = await axiosInstance.get(ROLE_API.GET_ALL_ROLE);
            console.log(response);
            const data = response.data.data.map(RoleDTO.fromJson);
            console.log(data);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },
}