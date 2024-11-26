import ProductDTO from "./ProductDTO.ts";

class ComboItemDTO {
    constructor(
        public id: number,
        public comboId: number,
        public productId: number,
        public quantity: number,
        public productPrice: number,
        public productCostPrice: number,
        public productName: string,
        public productImage: string,
    ) {}

    // Parse dữ liệu từ JSON sang ComboItemDTO
    static fromJSON(data: any): ComboItemDTO {
        return new ComboItemDTO(
            data.id,
            data.comboId,
            data.productId,
            data.quantity,
            data.productPrice,
            data.productCostPrice,
            data.productName,
            data.productImage,
        );
    }

    // Parse dữ liệu từ ProductDTO sang ComboItemDTO
    fromProductDTO(product: ProductDTO): ComboItemDTO {
        this.productId = product.id;
        this.quantity = 1;
        this.productPrice = product.price;
        this.productCostPrice = product.costPrice;
        this.productName = product.name;
        this.productImage = product.image;
        return this;
    }

    // Tính tổng giá trị vốn của sản phẩm trong combo
    getCost(): number {
        return this.quantity * this.productCostPrice;
    }
    // Tính tổng giá trị bán của sản phẩm trong combo
    getPrice(): number {
        return this.quantity * this.productPrice;
    }
}

export default ComboItemDTO;