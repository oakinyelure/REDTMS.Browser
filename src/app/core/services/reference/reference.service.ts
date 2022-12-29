import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderType } from '../../models/order.model';
import { IServerResponse } from '../../models/server-response.interface';
import { ApiRoute } from '../../utilities/route';

@Injectable({
    providedIn: 'root',
})
export class ReferenceService {
    constructor(private _http: HttpClient) {}

    /**
     * @returns A collection of order types
     */
    getOrderTypes(): Observable<IServerResponse<OrderType[]>> {
        const url = ApiRoute.fromServerUrl('ordertypes');
        return this._http.get<IServerResponse<OrderType[]>>(url);
    }
}
