import ComboItemDTO from "./ComboItemDTO.ts";
import ProductDTO from "./ProductDTO.ts";

export class OrderItemDTO
{
    constructor(
        public id: number,
        public orderId: number,
        public productId: number,
        public quantity: number,
        public status: string,
        public productPrice: number,
        public productName: string,
        public productImage: string,
        public comboItems: ComboItemDTO[] = []
    ) {
    }

    // Parse dữ liệu từ ProductDTO sang OrderItemDTO
    fromProductDTO(product: ProductDTO): OrderItemDTO {
        this.productId = product.id;
        this.productPrice = product.price;
        this.productName = product.name;
        this.productImage = product.image;
        this.comboItems = product.comboItems;
        return this;
    }
}