export interface Stock {
  id: string;
  image: string;
  name: string;
  shortName: string;
  changeToday: number;
  price: number;
}

export interface Stocks {
  stocks: Array<Stock>;
}
