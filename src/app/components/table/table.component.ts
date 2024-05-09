import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Stock, Stocks } from 'src/app/reducers/stock/stock.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input({
    transform: (value: Stocks) => value.stocks,
  })
  stocks: Array<Stock> = [];

  @Output() onBuySellClick: EventEmitter<string> = new EventEmitter();

  onBuySellClickEvent(id: string) {
    this.onBuySellClick.emit(id);
  }
}
