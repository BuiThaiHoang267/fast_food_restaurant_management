import ProductDTO from "./ProductDTO.ts";

class ComboItemDTO {
    public id: number;
    public comboId: number;
    public productId: number;
    public quantity: number;
    public price: number;
    public costPrice: number;
    public name: string;
    public image: string;

    constructor(
        id: number,
        comboId: number,
        productId: number,
        quantity: number,
        price: number,
        costPrice: number,
        name: string,
        image: string
    ) {
        this.id = id;
        this.comboId = comboId;
        this.productId = productId;
        this.quantity = quantity;
        this.price = price;
        this.costPrice = costPrice;
        this.name = name;
        this.image = image;
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