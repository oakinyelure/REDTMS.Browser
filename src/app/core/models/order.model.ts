import { BaseEntity } from './base-entity.model';

export class Order extends BaseEntity {
    orderTypeId?: string;
    orderedOn: Date;
    orderedBy?: string;
    orderType?: string;
    customer?: string;
    isSelected: boolean;
}

export class CreateOrderRequest {
    customer?: string;
    orderType: string;
    orderedBy?: string;
}

export class UpdateOrderRequest extends CreateOrderRequest {
    orderId: string;
}

export class OrderType extends BaseEntity {
    displayName: string;
}
