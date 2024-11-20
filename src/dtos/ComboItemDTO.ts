import ProductDTO from "./ProductDTO.ts";

class ComboItemDTO {
    constructor(
        public id: number,
        public comboId: number,
        public productId: number,
        public quantity: number,
        public price: number,
        public costPrice: number,
        public name: string,
        public image: string,
    ) {}

    // Parse dữ liệu từ JSON sang ComboItemDTO
    static fromJSON(data: any): ComboItemDTO {
        return new ComboItemDTO(
            data.id,
            data.comboId,
            data.productId,
            data.quantity,
            data.price,
            data.costPrice,
            data.name,
            data.image
        );
    }

    // Parse dữ liệu từ ProductDTO sang ComboItemDTO
    fromProductDTO(product: ProductDTO): ComboItemDTO {
        this.productId = product.id;
        this.quantity = 1;
        this.price = product.price;
        this.costPrice = product.costPrice;
        this.name = product.name;
        this.image = product.image;
        return this;
    }

    // Tính tổng giá trị vốn của sản phẩm trong combo
    getCost(): number {
        return this.quantity * this.costPrice;
    }
    // Tính tổng giá trị bán của sản phẩm trong combo
    getPrice(): number {
        return this.quantity * this.price;
    }
}

export default ComboItemDTO;