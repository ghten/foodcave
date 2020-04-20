
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as AppConfig from '../config';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  private cfg: any;

  constructor(private http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  setTemperature(data: any): Observable<any> {

    const params = new URLSearchParams();
    params.set('data', data);

    return this.http.post<any>(this.cfg.url_backend + this.cfg.temperature, params.toString(), {headers: this.cfg.header});
  }

  getTemperature(date: string): Observable<any> {
    const data = { date };
    return this.http.get<any>(this.cfg.url_backend + this.cfg.temperature, {headers: this.cfg.header, params: data});
  }
}
