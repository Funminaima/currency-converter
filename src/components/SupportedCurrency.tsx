import React from "react";
import { ICodes } from "../type.d";
interface Props {
  supportedCodes: ICodes[];
}

const SupportedCurrency = ({ supportedCodes }: Props) => {
  return (
    <>
      {supportedCodes &&
        supportedCodes.map((code: ICodes) => {
          return (
            <option value={code.currencyCode} key={code.currencyCode}>
              {code.currencyCode} - {code.currencyName}
            </option>
          );
        })}
    </>
  );
};

export default SupportedCurrency;
