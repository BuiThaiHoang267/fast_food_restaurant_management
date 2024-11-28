import {OrderItemDTO} from "./OrderItemDTO.ts";

export class OrderDTO {
    constructor(
        public id: number,
        public totalPrice: number,
        public numberOrder: number,
        public status: string,
        public branchId: number,
        public branchName: string,
        public paymentMethodId: number,
        public paymentMethodName: string,
        public updateAt: Date,
        public orderItems: OrderItemDTO[],
    ) {}

    static constructorOrderDTO ()
    {
        return new OrderDTO(0, 0, 0, "", 0, "", 0, "", new Date(), []);
    }
}