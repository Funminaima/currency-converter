import React from "react";
import { IHistory } from "../type.d";
interface Props {
  history: IHistory[];
}

const ConvertedCurrencyHistory = ({ history }: Props) => {
  return (
    <>
      {history &&
        history.map((his: IHistory, idx: number) => {
          return (
            <div className="d-flex" key={idx}>
              <div>From:{his.selectedFromCurrency}</div>
              <div>To:{his.selectedToCurrency}</div>
              <div>Amount:{his.userAmt}</div>
              <div>Converted-Amount: {his.convertedAmt}</div>
            </div>
          );
        })}
    </>
  );
};

export default ConvertedCurrencyHistory;
