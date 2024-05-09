import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Stocks } from 'src/app/reducers/stock/stock.model';
import { v4 as uuidv4 } from 'uuid';

const stocksData: Stocks = {
  stocks: [
    {
      id: uuidv4(),
      image: 'VOO.jpg',
      name: 'Vanguard S&P 500 Etf',
      shortName: 'VOO',
      changeToday: 2.62,
      price: 462.61,
    },
    {
      id: uuidv4(),
      image: 'TELO.jpg',
      name: 'Telo Genomics Corp',
      shortName: 'TELO',
      changeToday: 0,
      price: 4.23,
    },
    {
      id: uuidv4(),
      image: 'ASML.jpg',
      name: 'Asmi Holding Nv',
      shortName: 'ASML',
      changeToday: -12.4,
      price: 840.0,
    },
    {
      id: uuidv4(),
      image: 'AAPL.jpg',
      name: 'Apple Inc',
      shortName: 'AAPL',
      changeToday: 0.22,
      price: 840.0,
    },
    {
      id: uuidv4(),
      image: 'NVDA.jpg',
      name: 'Nvidia Corporation',
      shortName: 'NVDA',
      changeToday: 13.66,
      price: 854.01,
    },
    {
      id: uuidv4(),
      image: 'TSLA.jpg',
      name: 'Tesla Motors Inc.',
      shortName: 'TSLA',
      changeToday: -4.43,
      price: 151.02,
    },
    {
      id: uuidv4(),
      image: 'TSM.jpg',
      name: 'Taiwan Semiconductor Manufacturing',
      shortName: 'TSM',
      changeToday: -5.18,
      price: 133.85,
    },
    {
      id: uuidv4(),
      image: 'DDCB.jpg',
      name: 'Direxion Daily China Bull',
      shortName: 'DDCB',
      changeToday: 1.0,
      price: 18.9,
    },
    {
      id: uuidv4(),
      image: 'XBTE.jpg',
      name: 'Ethereum Tracker',
      shortName: 'XBTE',
      changeToday: 9.26,
      price: 267.81,
    },
    {
      id: uuidv4(),
      image: 'BCAT.jpg',
      name: 'Blackrock Capital Allocation Trust',
      shortName: 'BCAT',
      changeToday: 0.29,
      price: 76.1,
    },
  ],
};

@Injectable()
export class BackendInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.method === 'GET' &&
      request.url === 'http://localhost:4200/stocks'
    ) {
      return of(new HttpResponse({ status: 200, body: stocksData }));
    } else if (
      request.method === 'GET' &&
      request.url === 'http://localhost:4200/updateStock'
    ) {
      const randomStock = Math.floor(Math.random() * stocksData.stocks.length);

      const precision = 100; // 2 decimals
      const randomnum =
        Math.floor(
          Math.random() * (10 * precision - 1 * precision) + 1 * precision
        ) /
        (1 * precision);

      return of(
        new HttpResponse({
          status: 200,
          body: {
            id: stocksData.stocks[randomStock].id,
            price: stocksData.stocks[randomStock].price + randomnum,
          },
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
