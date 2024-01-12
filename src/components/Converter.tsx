import React from "react";
import SupportedCurrency from "./SupportedCurrency";
import ConvertedCurrencyHistory from "./ConvertedCurrencyHistory";
import { ICodes, IHistory } from "../type.d";
interface Props {
  supportedCodes: [];
  handleSelectedFromCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeInputField: (e: React.ChangeEvent<HTMLInputElement>) => void;
  userAmt: string;
  convertedAmt: number | undefined;
  handleSelectedToCurrency: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  history: IHistory[];
}
const Converter = ({
  supportedCodes,
  handleSelectedFromCurrency,
  onChangeInputField,
  userAmt,
  convertedAmt,
  handleSelectedToCurrency,
  history,
}: Props) => {
  return (
    <main className="container">
      <div className="card">
        <h1 className="title">Currency Converter </h1>
        <section className="first-section">
          <form action="">
            <div className="d-flex">
              <div className="form-field">
                <label htmlFor="from">From</label>
                <select name="" id="from" onChange={handleSelectedFromCurrency}>
                  <option value=""></option>
                  <SupportedCurrency supportedCodes={supportedCodes} />
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="amt1">Amount</label>
                <input
                  type="number"
                  id="amt1"
                  onChange={onChangeInputField}
                  value={userAmt}
                />
              </div>
            </div>
            <div className="d-flex">
              <div className="form-field">
                <label htmlFor="to">To</label>
                <select name="" id="to" onChange={handleSelectedToCurrency}>
                  <option value=""></option>
                  <SupportedCurrency supportedCodes={supportedCodes} />
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="amt2">Converted Amount</label>
                <input
                  type="number"
                  id="amt2"
                  defaultValue={convertedAmt}
                  readOnly
                />
              </div>
            </div>
          </form>
        </section>
        {history.length !== 0 && (
          <section className="second-section">
            <h3>Conversion History</h3>
            <ConvertedCurrencyHistory history={history} />
          </section>
        )}
      </div>
    </main>
  );
};

export default Converter;
