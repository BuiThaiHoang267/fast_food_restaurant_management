export class RoleDTO {
    constructor(
        public id: number,
        public name: string,
        public code: string,
        public description: string,
    ) {
    }

    static fromJson(data: any): RoleDTO {
        return new RoleDTO(
            data.id,
            data.name,
            data.code,
            data.description,
        );
    }
}

