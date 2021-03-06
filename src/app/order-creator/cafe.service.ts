import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import {  Http, Response, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Cafe } from './cafe.model';
import { API } from '../constants';

@Injectable()
export class CafeService {
  private apiUrl = `${API.ENDPOINT}${API.CAFE}`;

  constructor (private http: Http) {}

  public getCafes(params: object = {}): Observable<Cafe[]> {
    return this.http.get(this.apiUrl, {search: this.convertParams(params)})
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getCafe(id: number): Observable<Cafe> {
    const params = {id};
    return this.http.get(this.apiUrl, {search: this.convertParams(params)})
      .map(this.extractCafe)
      .catch(this.handleError);
  }

  private convertParams(params: object): URLSearchParams {
    const urlParams: URLSearchParams = new URLSearchParams();
    _.each(params, (value, param) => urlParams.set(param, value));

    return urlParams;
  }

  private extractCafe(res: Response) {
    const body = res.json();
    return body.objects[0] || {};
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
