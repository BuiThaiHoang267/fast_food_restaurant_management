import dayjs, {Dayjs} from "dayjs";

export class AuditLogDTO{
    constructor(
        public id: number,
        public userName: string,
        public action: string,
        public tableName: string,
        public description: string,
        public createdAt: Dayjs,
    ) {
    }

    static fromJson(json: any): AuditLogDTO {
        return new AuditLogDTO(
            json.id,
            json.userName,
            json.action,
            json.tableName,
            json.description,
            dayjs(json.createdAt)
        );
    }
}