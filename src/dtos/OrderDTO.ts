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
        public updateAt: string,
        public orderItems: OrderItemDTO[],
    ) {}

    static constructorOrderDTO ()
    {
        return new OrderDTO(0, 0, 0, "", 0, "", 0, "", "", []);
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
            dayjs(data.updateAt).format('YYYY-MM-DD HH:mm'),
            data.orderItems.map(OrderItemDTO.fromJSON),
        );
    }
}