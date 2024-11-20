class ProductDTO{
    constructor(
        public id: number,
        public name: string,
        public type: string,
        public description: string,
        public price: number,
        public costPrice: number,
        public image: string,
        public categoryId: number
    ) {}

    // Factory method để tạo ProductDTO từ dữ liệu JSON
    static fromJSON(data: any): ProductDTO {
        return new ProductDTO(
            data.id,
            data.name,
            data.type,
            data.description,
            data.price,
            data.costPrice,
            data.image,
            data.categoryId
        );
    }
}

export default ProductDTO;