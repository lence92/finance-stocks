import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Stocks } from './stock.model';

export const selectStocks = createFeatureSelector<Stocks>('stocks');

export const searchStocks = (searchText: string) =>
  createSelector(selectStocks, (stocks) => {
    const stocksResult: Stocks = {
      stocks: stocks.stocks.filter(
        (stock) => stock.name.indexOf(searchText) !== -1
      ),
    };
    return stocksResult;
  });
