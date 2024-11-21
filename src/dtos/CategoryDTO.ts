class CategoryDTO {
    constructor(
        public id: number,
        public name: string,
        public image: string,
    ) {}

    // Parse dữ liệu từ JSON sang CategoryDTO
    static fromJSON(data: any): CategoryDTO {
        return new CategoryDTO(
            data.id,
            data.name,
            data.image
        );
    }
}

export default CategoryDTO;