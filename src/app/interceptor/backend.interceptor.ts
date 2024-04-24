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
      image:
        'https://s3-alpha-sig.figma.com/img/8535/2aaa/7b1235339eb3c09d2c5f415793dc946a?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hbuBkQS69CJCTkHUmpULdTLAQlv5njaC6be7nZ7iGLPyph-2aK37O6Fw5~PBYC97glXNZ2LcAHz6-y~JZTwBrUuPcDGNL89h84hK5y8vzuMcbR04i18pu8uvS~S1hMx8E3pjndBLJ3bQ97k~Zgr~CbRRVfWJtpVUiXfh8DUZH4nt7kbhfSOgKSuBIGR-Z3LUvFluh~6wNNGPVnPHUCpjG3k7y3N1jTJkzOoQSHMjhMq6ysxV6vXw9tZt3l4Q7xeqC8rL2vzF8zrBHiMxqsVYzT7SJbw5U1Wz3tXL4Tl8~wL4atMzDYrVoZaozKO71qukw0Rl5tq8-i0G31Am7LpXzA__',
      name: 'Vanguard S&P 500 Etf',
      shortName: 'VOO',
      changeToday: 2.62,
      price: 462.61,
    },
    {
      id: uuidv4(),
      image:
        'https://s3-alpha-sig.figma.com/img/aea7/2646/6c684b373eb264d88b155799e669ecaa?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CSLj0clwAsoo3ERVrQfuVxDr3tfmqKjZwIBEcZnn9HyqGMkJGiYbi9wjKQwuNdY3OItU2q3J9pthizOyrHmIoJXSvdE7qykZsIcmLbEUziTvJaVmxJ-VUivQnSgeH5sPz0Ah~qQQjWg68bwcY35d9kWb5kxB2xjz1DUhkWlHsw~6VxJZYLtsMD3DSmC-vQfs9V5Q1ncAZM7Ro37QuVg3Qvcl4z7nRnHHk6f9p0im3nqtuKrmrXQN8wKXKq6qyKOMQrYZPCwllAsf6u1IEE2Jo60amvCZsGwOCGCQ8P1cuppsbN~06eq9WNamQUBIShgEs-Q6eOkVc0BIuig5216iFw__',
      name: 'Telo Genomics Corp',
      shortName: 'TELO',
      changeToday: 0,
      price: 4.23,
    },
    {
      id: uuidv4(),
      image:
        'https://s3-alpha-sig.figma.com/img/e4fb/81fa/4d50aec1a0a78230ef28da2d52e7f88b?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KBLbSWAFpAyT2X57zHdZv3fs6MnuYCFx8Zmk9VMpaCY7Lgkvmx2LllCX0Gj2vCx9xD0Vx9KUfM7ljykdCxeCIsFOwr234EIe~MAnnVOK8ivhZFI2SEo3KuSaZM1oIHnJlTj4C~anrNQljTwZFJQ0lbpw0bU0qo~qa1GnFPnoeet5spTstRWwd93hAmdgfz16o0UNIJfNkTfSBWT1kRdpvnxgX8qhaNcRY2PusnHs-f~pEtfsm20u4Yc~BbXcpre1sB5ZmxD858n6xJdkgGGkYTcalMvoYrRiNNSj9C261OwFMD4B86BamebNaicwbhiBHg2b0x8A7jGTefI8rPNC7w__',
      name: 'Asmi Holding Nv',
      shortName: 'ASML',
      changeToday: -12.4,
      price: 840.0,
    },
    {
      id: uuidv4(),
      image:
        'https://s3-alpha-sig.figma.com/img/269a/c1ad/0009937bf6c287348d4698beca817a8f?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iUC0F7to4gaFQLB5Bu5-SzDTk~~pMvHQVDuzsgfP0Q-~~TfMFSUbZydZ9ZvaC1en4RAO7BF1NSJx5rtRXkz6m~0MCR15GT5Kw4WLmviXTDLoVfNIMwXsPA~Qx5omReYvXAluowjo0OOjzWGnBYRWh-3ZpuzyRIzXMwenmFZNKI4vF8tv3njo4yzAzG8VVSw0Q7UsQjkXZmG41z-zDIUfq3HLD38ENzrKiwSteRUsJgo4L-hsfJV9LAxxfUl7YhQig6k9fUB7vUTEQjNfyMg0CAIFhy4~WKZLOKbP1Gwb5b27UhrlMpMGHUvKQCWsEl0RvHwKIpPNyEJlJSGyNj9Z-A__',
      name: 'Apple Inc',
      shortName: 'AAPL',
      changeToday: 0.22,
      price: 840.0,
    },
    {
      id: uuidv4(),
      image:
        'https://s3-alpha-sig.figma.com/img/3556/2b2b/1986484a87ac99e9de420415bf528f3d?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BqLoeWVuj2t0y318idEnRqrrHYeKgKTh8GSEH00aTcl3SV~3qnqTXSKuaSEhHD9ifAG34aKu5iKPxNosMxzBj8LQL4iMAq6usnydMaOyAzSBwxffAscTGE6a5YXNz7Op-iljOMeNfl6HKw5WqH9YQgC5BFX6xTURM6iob10AaTd9K7rLOQXK2fHNd4WCY1AlhRwCkqY5FmIO1nqe84YQ0jXbHaAnqrhhYejhAElbxroxab4i8aDfJUo5ON-~-bxAJyEK5y7cWUZkpux9B-GL3V0aL1wxr23c3xL~O3M~4hwiBfLHqcntywvyZnEA9z-z1eoMuzgPmB7ud5h006ehtw__',
      name: 'Nvidia Corporation',
      shortName: 'NVDA',
      changeToday: 13.66,
      price: 854.01,
    },
    {
      id: uuidv4(),
      image:
        'https://s3-alpha-sig.figma.com/img/2a82/3904/0b0f743ea3d263baaa0e7d76814de4ae?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=fZPhbYu2FSxHDXPIUrBdJA8~DmZIZuUfiHLkMkQD2RIRBNjdHwBTPCWCzLsUyD15dx-65mrUBl9~8WQ84kHEGtE8LXr9gCFz-kKSwK6-BenSxM8-rWSxZO4Nffwf-VvKItn2vI46gjmzQJcvqHDjuXyLCFnHjOsFasCqPWyyo1Wa-~UKA-k9ophGWGhKRyj3JRUH7sOjgnBYoUJE3WqWRRaT60theI02sCcxgeVKJ2GsIfMGXdzm~Ie-0htMofTROwkhcJ5XdVZSsoXKbcP6WWaDWv-dshbeinttJR2rFYvOEgMX5~qkHTGI91aAMPOvYelh0~HZeWZQdT~MbAJosg__',
      name: 'Tesla Motors Inc.',
      shortName: 'TSLA',
      changeToday: -4.43,
      price: 151.02,
    },
    {
      id: uuidv4(),
      image:
        'https://s3-alpha-sig.figma.com/img/65ba/7042/45f1f1d391061752e7eac32ddde81496?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nJDgzbe7C3ShedQHOpnz7wM39aaWXpfzRVvIzEAkCjyYCoooQluXmsa-pukogCb8yccrcmI08JJi4Q50JtTq0I3jsQQwFqwivGFDOGk2lNDorf15m0R1NQlafsTR4sO31fEFJlKETygVbrQEA2Sgol1SvLFA~PeoRpuWot1Bx0HyW9urc2~LZe18QDz6GYEW31DheK4i7Ue~xf3DMQrfXzXqr0RTDhoPdo0eGf7jz8ZiZ14Fv-PraRbpOj5a0lOQXK3ksCxVSwHOGfMMN0H4~q402gG6hhjgxg33Ko9m4CfHZBvhxzEnjGwenHv1MCes7GbSX9T49Lx5INncN~Nt6w__',
      name: 'Taiwan Semiconductor Manufacturing',
      shortName: 'TSM',
      changeToday: -5.18,
      price: 133.85,
    },
    {
      id: uuidv4(),
      image:
        'https://s3-alpha-sig.figma.com/img/ff4e/bc8d/837c6c7164b5efb587de62d9ad31a928?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Sv3vPIGUYA1es6cGzSV4Zlak0okQ2AXfJPAiq2w71Jrqv5AU2FrqXisDxU79iuwYN2Z-rdPfibhByF6n-P~WJLeCi7D-XiZH~OaDxmeQ~EGNfVm6tA5iEObkCkrHMP7ZB8uNYQCofGck~T3Djnk4iV977ZBu0HP8-FYRFfekDN6v3yB-YW9xpZFIOtZgWJPJZ0ST-9Xe366BAvLDGGs6q7RhL4lAT2RwcK4SAwrlyYR1s6cL2IrqdF1AZczSraMgTTIMwHrBZlSE94quuqymUpX0tntMuoKxd7bHKIHpItOSO9YvqqMswMc3UOFXsUaozxnXETG~mNhs4A4e4BjYQQ__',
      name: 'Direxion Daily China Bull ',
      shortName: 'TSM',
      changeToday: 1.0,
      price: 18.9,
    },
    {
      id: uuidv4(),
      image:
        'https://s3-alpha-sig.figma.com/img/8fd2/52da/d0b1529ad356210abf401d2196e6df20?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eTIz5MssfqCuiSCJcypcbw1zyhWsklDbEULNrCoYndeBn9fI13yRqOjdCDpXtsSrF-hTUTEyS3yyLrvdaoGxrO05QQEqTemmRbUbigTlTgCekja~i4U2QLCYFg1BC-IrNMH2rAM2vKLqxLLR66ynho1gLL3m3i8qHgaaL~ufOxxdXnSnbtiMuB24O7aaN2i0v4-7Q7cIAks3BiszWT~jSEviWW1drWc7KmfqedZuzEySU~mdCR0Gtpk062YbxjDvaxHJzFrm19gmPXdvT2Jv8WQt6cB-N0mz3c4onioZ3HaMNcBsuFhajGiL0ChA71By-WXTpUQOI9d8tYXAIBg2tQ__',
      name: 'Ethereum Tracker',
      shortName: 'XBTE',
      changeToday: 9.26,
      price: 267.81,
    },
    {
      id: uuidv4(),
      image:
        'https://s3-alpha-sig.figma.com/img/804b/ed0f/b80af7ccac77231005491bdc3cc10add?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AQF-uv5klJGza-ghJS-rXbRpCYJGgL-LfOqG~UYzftbABVcIX0b0rlhjkT8YIB4PZxG3SwmmwDaM8MeAUpfIzgGbqcZ6JMjOOZMf7~yaS1Jy2LaoVdoBkE0ixunu35CtPI-0ICV-m6uf0sD2yxxYVdnYLo4IQsz6p3LsIB9SdA1zOaX3d41DblnVJb~MtGuoSSC3BLcqrgGMM3go4uIwZUeuVvtRgR9JMsuXPWZA9h59gdmzQE5qvMyUrYlWKTAeQyr4jr6WohQv5Fkxb4tNbYRx97H7IiJd4QsrrL4uXEuhOy-ti~lEVfVMIoWNDMz31YIFCQD7uGSnEG-PfyKmng__',
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
