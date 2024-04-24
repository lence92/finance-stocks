import { createReducer, on } from '@ngrx/store';
import * as StockActions from '../../reducers/stock/stock.actions';
import { Stocks } from './stock.model';

export const initialState: Stocks = {
  stocks: [],
};

export const stockReducer = createReducer(
  initialState,
  on(StockActions.updateStock, (state, { id, price }) => {
    const index = state.stocks.findIndex((stock) => stock.id === id); //finding index of the item
    return {
      ...state,
      stocks: [
        ...state.stocks.slice(0, index),
        {
          ...state.stocks[index],
          price: price,
          changeToday: price - state.stocks[index].price,
        },
        ...state.stocks.slice(index + 1),
      ],
    };
  }),
  on(StockActions.setStocks, (state, { stocks }) => {
    return {
      stocks: stocks,
    };
  })
);
