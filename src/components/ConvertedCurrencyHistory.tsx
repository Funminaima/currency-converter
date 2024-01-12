import React from "react";
import { IHistory } from "../type.d";
interface Props {
  history: IHistory[];
}

const ConvertedCurrencyHistory = ({ history }: Props) => {
  return (
    <>
      <table className="styled-table">
        <thead>
          <tr>
            <th>From Currency</th>
            <th>To Currency</th>
            <th>Amount</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {history &&
            history.map((his: IHistory, idx: number) => {
              return (
                <tr key={idx}>
                  <td>{his.selectedFromCurrency}</td>
                  <td>{his.selectedToCurrency}</td>
                  <td>{his.userAmt}</td>
                  <td>{his.convertedAmt}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default ConvertedCurrencyHistory;
