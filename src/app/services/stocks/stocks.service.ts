import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stocks } from '../../reducers/stock/stock.model';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  constructor(private httpClient: HttpClient) {}

  getStocks(): Observable<Stocks> {
    return this.httpClient.get<Stocks>('http://localhost:4200/stocks');
  }

  listen(): Observable<{ id: string; price: number }> {
    return this.httpClient.get<{ id: string; price: number }>(
      'http://localhost:4200/updateStock'
    );
  }
}
