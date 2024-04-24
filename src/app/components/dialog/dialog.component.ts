import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Stock, Stocks } from '../../reducers/stock/stock.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Input() id: string | undefined;
  @Input() stocks: Stocks | null = {
    stocks: [],
  };

  @Output() closed = new EventEmitter();

  stockUpdate: Stock | undefined;

  ngOnInit(): void {
    this.stockUpdate = this.stocks?.stocks.find(
      (stock) => stock.id === this.id
    );
  }

  closeDialog() {
    this.closed.emit();
  }
}
