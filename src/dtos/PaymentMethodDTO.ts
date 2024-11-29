export class PaymentMethodDTO
{
    constructor(
        public id: number,
        public name: string,
    ) {
    }

    static fromJSON(data: any): PaymentMethodDTO
    {
        return new PaymentMethodDTO(data.id, data.name);
    }
}