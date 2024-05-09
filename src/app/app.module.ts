import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { SearchComponent } from './components/search/search.component';
import { StockPageComponent } from './pages/stock-page/stock-page.component';
import { StoreModule } from '@ngrx/store';
import { stockReducer } from './reducers/stock/stock.reducer';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BackendInterceptor } from './interceptor/backend.interceptor';
import { SignNumberPipe } from './pipes/sign-number.pipe';
import { StocksService } from './services/stocks/stocks.service';
import { DialogComponent } from './components/dialog/dialog.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    SearchComponent,
    StockPageComponent,
    SignNumberPipe,
    DialogComponent,
    SidemenuComponent,
    BreadcrumbsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ stocks: stockReducer }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BackendInterceptor,
      multi: true,
    },
    StocksService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
