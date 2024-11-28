import ComboItemDTO from "./ComboItemDTO.ts";
import ProductDTO from "./ProductDTO.ts";

export class OrderItemDTO
{
    constructor(
        public id: number,
        public orderId: number,
        public productId: number,
        public quantity: number,
        public unitPrice: number,
        public status: string,
        public productPrice: number,
        public productName: string,
        public productImage: string,
        public comboItems: ComboItemDTO[] = []
    ) {
    }

    static constructorOrderItemDTO ()
    {
        return new OrderItemDTO(0, 0, 0, 0, 0, "", 0, "", "", []);
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