import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, forkJoin, switchMap, of, tap } from 'rxjs';
import { CreateOrderRequest, Order, OrderType } from '../core/models/order.model';
import { IServerResponse } from '../core/models/server-response.interface';
import { OrderService } from '../core/services/order/order.service';
import { ReferenceService } from '../core/services/reference/reference.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, OnDestroy {
    private _$subscriptions: Array<Subscription> = [];

    constructor(
        private _refService: ReferenceService,
        private _orderService: OrderService,
        private _snackBar: MatSnackBar
    ) {}

    orderTypes: Array<OrderType> = [];
    orders: Array<Order> = [];
    selectedOrderType: string;
    draftedOrder: CreateOrderRequest = null;
    searchInputValue: string;
    checkAllTableColumns: boolean = false;

    displayedColumns: string[] = ['isSelected', 'key', 'orderedOn', 'orderedBy', 'orderType', 'customer'];

    ngOnInit(): void {
        this._getOrderTypes();
        this._getOrders(null, null);
        this._subscribeToDraftOrder();
    }

    ngOnDestroy(): void {
        this._$subscriptions.forEach((e) => {
            if (!e.closed) e.unsubscribe();
        });
    }

    private _subscribeToDraftOrder(): void {
        const subscription: Subscription = this._orderService.$onOrderDrafted.subscribe((draft) => {
            this.draftedOrder = draft;
        });
        this._$subscriptions.push(subscription);
    }

    private _getOrderTypes(): void {
        const subscription: Subscription = this._refService
            .getOrderTypes()
            .subscribe((response: IServerResponse<OrderType[]>) => {
                this.orderTypes = response.data;
            });
        this._$subscriptions.push(subscription);
    }

    private _getOrders(orderTypeId?: string, customer?: string): void {
        const subscription: Subscription = this._orderService
            .getOrders(orderTypeId, customer)
            .subscribe((response: IServerResponse<Order[]>) => {
                this.orders = response.data;
            });
        this._$subscriptions.push(subscription);
    }

    filterByOrderType(event: MatSelectChange): void {
        this._getOrders(event.value, null);
    }

    deleteOrders(): void {
        // create requests per each selected order
        let deleteRequests = this.orders
            .filter((e) => e.isSelected)
            .map((e) => this._orderService.deleteOrder(<string>e.key));
        if (!deleteRequests.length) {
            this._snackBar.open('No item selected');
            return;
        }
        const subscription: Subscription = forkJoin(deleteRequests).subscribe({
            next: () => {
                this.orders = this.orders.filter((e) => !e.isSelected);
                this._snackBar.open('Item(s) deleted successfully');
                this.checkAllTableColumns = false;
            },
            error: () => {
                this._snackBar.open('An error occurred by performing this action');
            },
        });
        this._$subscriptions.push(subscription);
    }

    /**
     * Searching by ID required taking a round trip to the server
     * and filter against the returned result
     * We don't want to mess with the current in-memory orders
     * because of all its dependencies
     */
    filterByOrderId(): void {
        const subscription: Subscription = this._orderService
            .getOrders()
            .pipe(
                switchMap((response: IServerResponse<Order[]>) => {
                    if (!this.searchInputValue) {
                        return of(response.data);
                    }
                    return of(
                        response.data.filter(
                            (e) => (<string>e.key).toLowerCase() === this.searchInputValue.toLowerCase()
                        )
                    );
                }),
                switchMap((orders: Order[]) => {
                    if (this.selectedOrderType) {
                        return of(
                            orders.filter((e) => e.orderTypeId.toLowerCase() === this.selectedOrderType.toLowerCase())
                        );
                    }
                    return of(orders);
                })
            )
            .subscribe((orders: Order[]) => {
                this.orders = orders;
            });
        this._$subscriptions.push(subscription);
    }

    toggleTableSelections(event: MatCheckboxChange): void {
        this.orders.forEach((order: Order) => {
            order.isSelected = event.checked;
        });
    }
}
