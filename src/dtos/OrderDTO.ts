import {OrderItemDTO} from "./OrderItemDTO.ts";

export class OrderDTO {
    constructor(
        public id: number,
        public totalPrice: number,
        public numberOrder: number,
        public status: string,
        public branchId: number,
        public paymentMethodId: number,
        public orderItems: OrderItemDTO[],
    ) {}
}