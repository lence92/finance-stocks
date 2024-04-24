import { Component, Input } from '@angular/core';
import { Stock, Stocks } from 'src/app/reducers/stock/stock.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  _stocks: ReadonlyArray<Stock> = [];
  @Input() set stocks(value: Stocks) {
    this._stocks = value.stocks;
  }
}
