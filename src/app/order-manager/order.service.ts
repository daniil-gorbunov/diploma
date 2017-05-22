import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import {  Headers, Http, RequestOptions, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Order, OrderDish } from './models';
import { API } from '../constants';

@Injectable()
export class OrderService {
  private apiUrl = `${API.ENDPOINT}${API.ORDER}`;

  constructor (private http: Http) {}

  public getOrders(params: object = {}): Observable<Order[]> {
    return this.http.get(this.apiUrl, {search: this.convertParams(params)})
      .map(this.extractData)
      .catch(this.handleError);
  }

  public saveOrder(params = {}): Observable<Order> {
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
    });
    const options: RequestOptions = new RequestOptions({ headers });

    return this.http.post(this.apiUrl, params, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private convertParams(params: object): URLSearchParams {
    const urlParams: URLSearchParams = new URLSearchParams();
    _.each(params, (value, param) => urlParams.set(param, value));

    return urlParams;
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.objects || {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
