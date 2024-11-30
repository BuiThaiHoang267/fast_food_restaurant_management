import {OrderItemDTO} from "./OrderItemDTO.ts";
import dayjs, {Dayjs} from "dayjs";

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
        public updatedAt: Dayjs,
        public orderItems: OrderItemDTO[],
    ) {}

    static constructorOrderDTO ()
    {
        return new OrderDTO(0, 0, 0, "", 0, "", 0, "", dayjs(), []);
    }

    static fromJSON(data: any): OrderDTO {
        return new OrderDTO(
            data.id,
            data.totalPrice,
            data.numberOrder,
            data.status,
            data.branchId,
            data.branchName,
            data.paymentMethodId,
            data.paymentMethodName,
            dayjs(data.updatedAt),
            data.orderItems.map(OrderItemDTO.fromJSON),
        );
    }
}