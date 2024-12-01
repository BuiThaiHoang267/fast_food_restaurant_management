import {BranchDTO} from "../dtos/BranchDTO.ts";
import axiosInstance from "./base-service/axiosConfig.ts";
import {BRANCH_API} from "./base-service/apiEndpoints.ts";

export const BranchService = {
    getAllBranch: async (): Promise<BranchDTO[]> => {
        try {
            const response = await axiosInstance.get(BRANCH_API.GET_ALL_BRANCH);
            const data = response.data.data.map(BranchDTO.fromJSON);
            console.log(data);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}