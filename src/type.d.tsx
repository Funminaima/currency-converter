export type ICodes = {
  currencyCode: string;
  currencyName: string;
};
export type IExchangeRates = {
  [key: string]: number;
};
export type IHistory = {
  //   amt: string;
  //   fromCurrency: string;
  //   ToCurrency: string;
  //   convertedAmount: number;
  userAmt: string;
  selectedFromCurrency: string;
  selectedToCurrency: string;
  convertedAmt: number | undefined;
};
