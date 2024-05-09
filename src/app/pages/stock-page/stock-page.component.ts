import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StocksService } from '../../services/stocks/stocks.service';
import * as StockActions from '../../reducers/stock/stock.actions';
import {
  searchStocks,
  selectStocks,
} from '../../reducers/stock/stock.selectors';

@Component({
  selector: 'app-stock-page',
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.scss'],
})
export class StockPageComponent implements OnInit {
  stocks$ = this.store.select(selectStocks);
  showDialog: boolean = false;
  selectedStockId: string | undefined;

  constructor(private store: Store, private stocksService: StocksService) {}

  ngOnInit(): void {
    this.stocksService.getStocks().subscribe((stocks) => {
      this.store.dispatch(StockActions.setStocks(stocks));
    });

    setInterval(() => {
      this.stocksService.listen().subscribe(({ id, price }) => {
        this.store.dispatch(StockActions.updateStock({ id, price }));
      });
    }, 500);
  }

  filterStocks(searchedText: string) {
    this.stocks$ = this.store.select(searchStocks(searchedText));
  }

  openDialog(id: string) {
    this.showDialog = true;
    this.selectedStockId = id;
  }

  closeDialog() {
    this.showDialog = false;
  }
}
