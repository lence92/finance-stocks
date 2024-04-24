import { createAction, props } from '@ngrx/store';
import { Stocks } from './stock.model';

export const updateStock = createAction(
  '[Stock Component] Update Stock',
  props<{ id: string; price: number }>()
);

export const setStocks = createAction(
  '[Stock Component] Set Stock',
  props<Stocks>()
);
