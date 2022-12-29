import { TestBed, waitForAsync } from '@angular/core/testing';
import { CreateOrderRequest, Order, UpdateOrderRequest } from '../../models/order.model';
import { IServerResponse } from '../../models/server-response.interface';
import { OrderService } from './order.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('OrderService', () => {
    let orderService: OrderService;
    let httpController: HttpTestingController;

    beforeEach(waitForAsync(async () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [OrderService],
        });
        httpController = TestBed.inject(HttpTestingController);
        orderService = TestBed.inject(OrderService);
    }));

    afterEach(() => {
        httpController.verify();
    });

    it('should be created', () => {
        expect(orderService).toBeTruthy();
    });

    describe('getOrder', () => {
        it('should return expected expected orders', (done: DoneFn) => {
            const expected: IServerResponse<Order[]> = { data: [new Order(), new Order(), new Order()] };

            orderService.getOrders().subscribe((response) => {
                expect(response.data).not.toBeNull();
                expect(response.data?.length).toEqual(expected.data?.length);
                done();
            });

            const req = httpController.expectOne((context) => context.method === 'GET');
            req.flush(expected);
        });
    });

    describe('createOrder', () => {
        it('should update order and return updated order', (done: DoneFn) => {
            const expected: IServerResponse<Order> = { data: new Order() };
            const payload = new CreateOrderRequest();
            payload.customer = 'Test Customer';

            orderService.createOrder(payload).subscribe((response) => {
                expect(response.data).not.toBeNull();
                expect(response.data).toEqual(expected.data);
                done();
            });

            const req = httpController.expectOne((context) => context.method === 'POST');
            req.flush(expected);
        });
    });

    describe('updateOrder', () => {
        it('should update order and return updated order', (done: DoneFn) => {
            const expected: IServerResponse<Order> = { data: new Order() };
            const payload = new UpdateOrderRequest();
            payload.customer = 'Test Customer';

            orderService.updateOrder('orderid', payload).subscribe((response) => {
                expect(response.data).not.toBeNull();
                expect(response.data).toEqual(expected.data);
                done();
            });

            const req = httpController.expectOne((context) => context.method === 'PUT');
            req.flush(expected);
        });
    });

    describe('deleteOrder', () => {
        it('should delete order and return deleted instance', (done: DoneFn) => {
            const expected: IServerResponse<Order> = { data: new Order() };
            const payload = new UpdateOrderRequest();
            payload.customer = 'Test Customer';

            orderService.deleteOrder('orderid').subscribe((response) => {
                expect(response.data).not.toBeNull();
                expect(response.data).toEqual(expected.data);
                done();
            });

            const req = httpController.expectOne((context) => context.method === 'DELETE');
            req.flush(expected);
        });
    });
});
