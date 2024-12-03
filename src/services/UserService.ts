import {USER_API} from "./base-service/apiEndpoints.ts";
import axiosInstance from "./base-service/axiosConfig.ts";
import {jwtDecode} from "jwt-decode";
import {ClaimTypes} from "../common/claim-types.ts";
import {UserDTO} from "../dtos/UserDTO.ts";

export const UserService = {
    login: async (username: string, password: string) : Promise<string> => {
        try {
            const response = await axiosInstance.post(USER_API.LOGIN, {
                username: username,
                password: password
            });
            console.log(response);
            const data = response.data.data;
            console.log(data);

            // Luu data vao session storage
            sessionStorage.setItem("token", JSON.stringify(data));
            const decode: never = jwtDecode(data);
            const name = decode["Name"];
            const userId = decode[ClaimTypes.NAME_IDENTIFIER];
            const userName = decode[ClaimTypes.NAME];
            const roleId = decode["Role Id"];
            const role = decode[ClaimTypes.ROLE];
            const branchId = decode["Branch Id"];
            const branchName = decode["Branch"];

            sessionStorage.setItem("name", JSON.stringify(name));
            sessionStorage.setItem("userId", JSON.stringify(userId));
            sessionStorage.setItem("userName", JSON.stringify(userName));
            sessionStorage.setItem("roleId", JSON.stringify(roleId));
            sessionStorage.setItem("role", JSON.stringify(role));
            sessionStorage.setItem("branchId", JSON.stringify(branchId));
            sessionStorage.setItem("branchName", JSON.stringify(branchName));

            // console.log(decode);
            // console.log(name);
            // console.log(userId);
            // console.log(userName);
            // console.log(roleId);
            // console.log(role);
            // console.log(branchId);
            // console.log(branchName);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },

    getUserByFilter: async (filter: UserFilter) : Promise<UserDTO[]> => {
        try {
            const queryObject = Object.entries(filter).reduce((acc, [key, value]) => {
                acc[key] = value != null ? String(value) : '';
                return acc;
            }, {} as Record<string, string>);

            const query = new URLSearchParams(queryObject).toString();

            const response = await axiosInstance.get(`${USER_API.GET_USER_BY_FILTER}?${query}`);
            console.log(response);
            const data = response.data.data.map(UserDTO.fromJson);
            console.log(data);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },

    register: async (user: UserDTO) : Promise<UserDTO> => {
        try {
            const response = await axiosInstance.post(USER_API.REGISTER, user);
            console.log(response);
            const data = response.data.data;
            console.log(data);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },

    updateUser: async (user: UserDTO) => {
        try {
            const response = await axiosInstance.patch(USER_API.UPDATE_USER(user.id), user);
            console.log(response);
            const data = response.data.data;
            console.log(data);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    },

    deleteUser: async (id: number) => {
        try {
            const response = await axiosInstance.delete(USER_API.DELETE_USER(id));
            console.log(response);
            const data = response.data.data;
            console.log(data);
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export interface UserFilter {
    branches: number[],
    roles: number[],
}