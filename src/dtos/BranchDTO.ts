export class BranchDTO {
    constructor(
        public id: number,
        public name: string,
        public location: string,
        public phone: string,
        public email: string,
        public isActive: boolean
    ) { }

    static fromJSON(data: any): BranchDTO {
        return new BranchDTO(
            data.id,
            data.name,
            data.location,
            data.phone,
            data.email,
            data.isActive
        );
    }
}