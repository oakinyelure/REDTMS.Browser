import { TestBed, waitForAsync } from '@angular/core/testing';
import { OrderType } from '../../models/order.model';
import { IServerResponse } from '../../models/server-response.interface';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ReferenceService } from './reference.service';

describe('ReferenceService', () => {
    let refService: ReferenceService;
    let httpController: HttpTestingController;

    beforeEach(waitForAsync(async () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ReferenceService],
        });
        httpController = TestBed.inject(HttpTestingController);
        refService = TestBed.inject(ReferenceService);
    }));

    afterEach(() => {
        httpController.verify();
    });

    it('should be created', () => {
        expect(refService).toBeTruthy();
    });

    describe('getOrderTypes', () => {
        it('should return all order types', (done: DoneFn) => {
            const expected: IServerResponse<OrderType[]> = { data: [new OrderType(), new OrderType()] };

            refService.getOrderTypes().subscribe((response) => {
                expect(response.data).not.toBeNull();
                expect(response.data?.length).toEqual(expected.data?.length);
                done();
            });
            const req = httpController.expectOne((context) => context.method === 'GET');
            req.flush(expected);
        });
    });
});
