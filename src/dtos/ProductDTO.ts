class ProductDTO{
    constructor(
        public id: number,
        public name: string,
        public type: string,
        public description: string,
        public price: number,
        public image: string,
        public categoryId: number
    ) {}

    // Factory method để tạo ProductDTO từ dữ liệu JSON
    static fromJSON(data): ProductDTO {
        return new ProductDTO(
            data.id,
            data.name,
            data.type,
            data.description,
            data.price,
            data.image,
            data.categoryId
        );
    }
}

export default ProductDTO;