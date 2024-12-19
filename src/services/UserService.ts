import {USER_API} from "./base-service/apiEndpoints.ts";
import axiosInstance from "./base-service/axiosConfig.ts";
import {jwtDecode} from "jwt-decode";
import {ClaimTypes} from "../common/claim-types.ts";
import {UserDTO} from "../dtos/UserDTO.ts";
import {toast} from "react-toastify";

export const UserService = {
    login: async (username: string, password: string) => {
        try {
            const response = await axiosInstance.post(USER_API.LOGIN, {
                username: username,
                password: password
            });
            console.log(response);
            const data = response.data.data;
            console.log(data);

            // Luu data vao session storage
            sessionStorage.setItem("token", data);
            const decode: never = jwtDecode(data);
            const name = decode["Name"];
            const userId = decode[ClaimTypes.NAME_IDENTIFIER];
            const userName = decode[ClaimTypes.NAME];
            const roleId = decode["Role Id"];
            const role = decode[ClaimTypes.ROLE];
            const branchId = decode["Branch Id"];
            const branchName = decode["Branch"];

            sessionStorage.setItem("name", name);
            sessionStorage.setItem("userId", userId);
            sessionStorage.setItem("userName", userName);
            sessionStorage.setItem("roleId", roleId);
            sessionStorage.setItem("role", role);
            sessionStorage.setItem("branchId", branchId);
            sessionStorage.setItem("branchName", branchName);

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
        catch (error : any) {
            toast.error(error.response.data.message);

            // console.error(error);
            // throw error;
        }
    },

    logout: () => {
        // Clear session data
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("branchId");
        sessionStorage.removeItem("branchName");
    },

    getProfile: async () : Promise<UserDTO> => {
        try {
            const userIdString = sessionStorage.getItem("userId");

            // Check if userId exists and if it can be converted to a number
            if (!userIdString) {
                throw new Error("User is not authenticated. Redirecting to login page.");
            }

            const userId = parseInt(userIdString, 10); // Convert string to number

            // Handle invalid userId (e.g., NaN if the string is not a valid number)
            if (isNaN(userId)) {
                throw new Error("Invalid user ID. Redirecting to login page.");
            }

            const response = await axiosInstance.get(USER_API.GET_USER_BY_ID(userId));
            console.log(response);
            const data = response.data.data;
            console.log(UserDTO.fromJson(data));
            return UserDTO.fromJson(data);
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
            if (user.name === '') {
                toast.error("Name must not be empty");
                throw new Error("Name must not be empty");
            }
            if (user.username === '') {
                toast.error("User name must not be empty");
                throw new Error("User name must not be empty");
            }
            if (user.password === '') {
                toast.error("Password must not be empty");
                throw new Error("Password must not be empty");
            }
            const response = await axiosInstance.post(USER_API.REGISTER, user, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            });
            console.log(response);
            const data = response.data.data;
            console.log(data);
            toast.success("Register success");
            return data;
        }
        catch (error : any) {
            console.log(error);
            toast.error(JSON.stringify(error.response.data.errors));
            throw error;
        }
    },

    updateUser: async (user: UserDTO) => {
        try {
            const response = await axiosInstance.patch(USER_API.UPDATE_USER(user.id), user, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            });
            console.log(response);
            const data = response.data.data;
            console.log(data);
            toast.success("Cập nhật thông tin tài khoản thành công");
            return data;
        }
        catch (error : any) {
            toast.error(JSON.stringify(error.response.data.errors));
            // console.log(JSON.stringify(error.response.data.errors));
            // throw error;
        }
    },

    deleteUser: async (id: number) => {
        try {
            const response = await axiosInstance.delete(USER_API.DELETE_USER(id), {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
                }
            });
            console.log(response);
            const data = response.data.data;
            console.log(data);
            toast.success("Delete success");
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