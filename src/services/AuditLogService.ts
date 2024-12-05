import axiosInstance from "./base-service/axiosConfig.ts";
import {AuditLogDTO} from "../dtos/AuditLogDTO.ts";
import {AUDIT_LOG_API} from "./base-service/apiEndpoints.ts";

export const AuditLogService = {
    getAuditLogRecent: async () : Promise<AuditLogDTO[]> => {
        try {
            const response = await axiosInstance.get(AUDIT_LOG_API.GET_AUDIT_LOG_RECENT);
            console.log(response);
            const data = response.data.data.map(AuditLogDTO.fromJson);
            console.log(data);
            return data;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
}