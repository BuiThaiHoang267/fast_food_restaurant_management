export class UserDTO {
    constructor(
        public id: number,
        public name: string,
        public username: string,
        public password: string,
        public email: string,
        public phone: string,
        public roleId: number,
        public roleName: string,
        public roleCode: string,
        public branchId: number,
        public branchName: string,
        public isActive: boolean,
    ) {
    }

    static fromJson(data: any): UserDTO {
        return new UserDTO(
            data.id,
            data.name,
            data.username,
            data.password,
            data.email,
            data.phone,
            data.roleId,
            data.roleName,
            data.roleCode,
            data.branchId,
            data.branchName,
            data.isActive,
        );
    }
}