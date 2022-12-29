import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CreateOrderRequest, OrderType } from 'src/app/core/models/order.model';
import { IServerResponse } from 'src/app/core/models/server-response.interface';
import { OrderService } from 'src/app/core/services/order/order.service';
import { ReferenceService } from 'src/app/core/services/reference/reference.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-new-order',
    templateUrl: './new-order.component.html',
    styleUrls: ['./new-order.component.scss'],
})
export class NewOrderComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
        this._$subscriptions.forEach((e) => {
            if (!e.closed) e.unsubscribe();
        });
    }

    ngOnInit(): void {
        this._configureForm();
        this._getOrderTypes();
        this._subscribeToOrderDraft();
    }

    private _$subscriptions: Subscription[] = [];
    orderTypes: OrderType[] = [];
    orderForm: FormGroup;
    draftedOrderRequest: CreateOrderRequest = null;

    constructor(
        private _orderService: OrderService,
        private _refService: ReferenceService,
        private _snackBar: MatSnackBar,
        private _router: Router,
        private _route: ActivatedRoute
    ) {}

    private _getOrderTypes(): void {
        const subscription: Subscription = this._refService
            .getOrderTypes()
            .subscribe((response: IServerResponse<OrderType[]>) => {
                this.orderTypes = [...this.orderTypes, ...response.data];
            });
        this._$subscriptions.push(subscription);
    }

    private _configureForm(): void {
        this.orderForm = new FormGroup({
            customer: new FormControl(null, Validators.required),
            orderedBy: new FormControl(null, Validators.required),
            orderType: new FormControl(null, Validators.required),
        });
    }

    private _subscribeToOrderDraft(): void {
        const $subscription: Subscription = this._orderService.$onOrderDrafted.subscribe((draft) => {
            this.draftedOrderRequest = draft;
            this._checkAndTryResumeDraft();
        });
        this._$subscriptions.push($subscription);
    }

    private _getOrderRequestPayload(): CreateOrderRequest {
        const payload: CreateOrderRequest = new CreateOrderRequest();
        payload.customer = this.orderForm.controls['customer'].value;
        payload.orderedBy = this.orderForm.controls['orderedBy'].value;
        payload.orderType = this.orderForm.controls['orderType'].value;
        return payload;
    }

    private _checkAndTryResumeDraft(): void {
        const subscription = this._route.queryParamMap.subscribe((params) => {
            if (Boolean(params.get('resumeDraft')) && this.draftedOrderRequest) {
                this.copyDraftToForm();
            }
        });
        this._$subscriptions.push(subscription);
    }

    saveOrder(): void {
        if (!this.orderForm.valid) {
            this._snackBar.open('Please complete the form', 'New Order Form');
            return;
        }
        const payload: CreateOrderRequest = this._getOrderRequestPayload();
        const $subscription = this._orderService.createOrder(payload).subscribe({
            next: () => {
                this._snackBar.open(
                    'Order saved successfully. Any existing draft orders have been cleared',
                    'Navigating to orders'
                );
                this._orderService.createDraftOrder(null);
                this._router.navigate(['.']);
            },
            error: () => {
                this._snackBar.open('Order saved successfully', 'Error', {
                    panelClass: 'accent',
                });
            },
        });
        this._$subscriptions.push($subscription);
    }

    saveOrderAsDraft(): void {
        this._orderService.createDraftOrder(this._getOrderRequestPayload());
        this._snackBar.open(
            'Draft is now available. Click the resume draft button to continue from where you stopped',
            'Success'
        );
        this._router.navigate(['.']);
    }

    copyDraftToForm(): void {
        if (!this.draftedOrderRequest) return;
        this.orderForm.controls['customer'].setValue(this.draftedOrderRequest.customer);
        this.orderForm.controls['orderedBy'].setValue(this.draftedOrderRequest.orderedBy);
        this.orderForm.controls['orderType'].setValue(this.draftedOrderRequest.orderType);
    }
}
