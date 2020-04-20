
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as AppConfig from '../config';

@Injectable({
  providedIn: 'root'
})
export class TraceabilityService {

  private cfg: any;

  constructor(private http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  savePhoto(data: any): Observable<any> {
    const params = {data};

    return this.http.post<any>(this.cfg.url_backend + this.cfg.savephoto, params, {headers: this.cfg.header});
  }

  getTraceabilities(date: string): Observable<any> {
    const data = { date };
    return this.http.get<any>(this.cfg.url_backend + this.cfg.photos, {headers: this.cfg.header, params: data});
  }
}
