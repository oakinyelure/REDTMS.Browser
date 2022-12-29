import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CreateOrderRequest, Order, UpdateOrderRequest } from '../../models/order.model';
import { IServerResponse } from '../../models/server-response.interface';
import { ApiRoute } from '../../utilities/route';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    $onOrderDrafted: BehaviorSubject<CreateOrderRequest> = new BehaviorSubject<CreateOrderRequest>(null);

    constructor(private _http: HttpClient) {}

    /**
     * @param orderTypeId
     * @param customerName
     * @returns All orders matching the query params
     */
    getOrders(orderTypeId?: string, customerName?: string): Observable<IServerResponse<Order[]>> {
        const params = new URLSearchParams();
        if (orderTypeId) params.append('orderTypeId', orderTypeId);
        if (customerName) params.append('customer', customerName);
        const url = ApiRoute.fromServerUrl(`orders?${params.toString()}`);
        return this._http.get<IServerResponse<Order[]>>(url).pipe(
            tap((response) => {
                response.data.forEach((item: Order) => {
                    item.orderedOn = new Date(item.orderedOn);
                });
            })
        );
    }

    /**
     * Updates an order
     * @param orderId
     * @param payload
     * @returns
     */
    updateOrder(orderId: string, payload: UpdateOrderRequest): Observable<IServerResponse<Order>> {
        const url = ApiRoute.fromServerUrl(`orders/${orderId}`);
        return this._http.put<IServerResponse<Order>>(url, payload).pipe(
            tap((response) => {
                response.data.orderedOn = new Date(response.data.orderedOn);
            })
        );
    }

    /**
     * Deletes an order
     * @param orderId
     * @returns
     */
    deleteOrder(orderId: string): Observable<IServerResponse<Order>> {
        const url = ApiRoute.fromServerUrl(`orders/${orderId}`);
        return this._http.delete<IServerResponse<Order>>(url).pipe(
            tap((response) => {
                response.data.orderedOn = new Date(response.data.orderedOn);
            })
        );
    }

    /**
     * Creates an order
     * @param orderId
     * @param payload
     * @returns
     */
    createOrder(payload: CreateOrderRequest): Observable<IServerResponse<Order>> {
        const url = ApiRoute.fromServerUrl(`orders`);
        return this._http.post<IServerResponse<Order>>(url, payload).pipe(
            tap((response) => {
                response.data.orderedOn = new Date(response.data.orderedOn);
            })
        );
    }

    createDraftOrder(payload: CreateOrderRequest): void {
        this.$onOrderDrafted.next(payload);
    }
}
