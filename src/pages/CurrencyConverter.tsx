import { useState, useEffect, useRef } from "react";
import { getExchangeRates, getSupportedCodes } from "../api/api";
import Converter from "../components/Converter";
import { IExchangeRates, IHistory } from "../type.d";

const CurrencyConverter = () => {
  const [exchangeRates, setExchangeRates] = useState<IExchangeRates>();
  const [history, setHistory] = useState<IHistory[]>([]);
  const [supportedCodes, setSupportedCodes] = useState<any>([]);
  const [userAmt, setuserAmt] = useState("");
  const [selectedFromCurrency, setSelectedFromCurrency] = useState("");
  const [selectedToCurrency, setSelectedToCurrency] = useState("");
  const [convertedAmt, setConvertedAmt] = useState<number>();
  const userAmtRef = useRef(userAmt);

  const convertToObject = (codes: []) => {
    return codes.map((innerArray) => {
      return {
        currencyCode: innerArray[0],
        currencyName: innerArray[1],
      };
    });
  };
  const fetchSupportedCodes = async () => {
    try {
      const codes = await getSupportedCodes();
      const ConvertedCodes = convertToObject(codes);
      setSupportedCodes(ConvertedCodes);
    } catch (error) {
      console.error("Error fetching supported codes:", error);
    }
  };
  useEffect(() => {
    fetchSupportedCodes();
  }, []);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      if (selectedFromCurrency) {
        try {
          const rates = await getExchangeRates(selectedFromCurrency);
          setExchangeRates(rates);
        } catch (error) {
          console.error("Error fetching exchange rates:", error);
        }
      }
    };

    fetchExchangeRates();
  }, [selectedFromCurrency]);

  const onChangeInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserAmt(e.target.value);
  };
  const handleSelectedFromCurrency = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedFromCurrency(e.target.value);
  };
  const handleSelectedToCurrency = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedToCurrency(e.target.value);
  };
  useEffect(() => {
    if (exchangeRates) {
      handleConversion(userAmt, selectedFromCurrency, selectedToCurrency);
    }
  }, [userAmt, selectedFromCurrency, selectedToCurrency]);

  useEffect(() => {
    userAmtRef.current = userAmt;

    const timeoutId = setTimeout(() => {
      if (typeof convertedAmt === "number" && !isNaN(convertedAmt)) {
        const conversionDetails = {
          userAmt,
          selectedFromCurrency,
          selectedToCurrency,
          convertedAmt,
        };

        setHistory((prevHistory: any) => [...prevHistory, conversionDetails]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [convertedAmt]);

  const handleConversion = (
    amt: string,
    fromCurrency: string,
    ToCurrency: string
  ) => {
    if (exchangeRates) {
      const convertedAmount =
        (parseFloat(amt) / exchangeRates[fromCurrency]) *
        exchangeRates[ToCurrency];
      setConvertedAmt(parseFloat(convertedAmount.toFixed(2)));
    }
  };

  return (
    <>
      <Converter
        supportedCodes={supportedCodes}
        handleSelectedFromCurrency={handleSelectedFromCurrency}
        onChangeInputField={onChangeInputField}
        userAmt={userAmt}
        convertedAmt={convertedAmt}
        handleSelectedToCurrency={handleSelectedToCurrency}
        history={history}
      />
    </>
  );
};

export default CurrencyConverter;
