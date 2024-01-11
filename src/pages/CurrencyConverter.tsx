import { useState, useEffect } from "react";
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
      //   console.log(ConvertedCodes, " ConvertedCodes");
    } catch (error) {
      console.error("Error fetching supported codes:", error);
    }
  };
  useEffect(() => {
    fetchSupportedCodes();
  }, []);

  //   const fetchExchangeRates = async () => {
  //     try {
  //       const rates = await getExchangeRates(selectedFromCurrency);
  //     return rates
  //     } catch (error) {
  //       console.error("Error fetching exchange rates:", error);
  //     }
  //   };
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
    handleConversion(userAmt, selectedFromCurrency, e.target.value);
  };
  useEffect(() => {
    if (exchangeRates) {
      //   const convertedAmount =
      //     (parseFloat(userAmt) / exchangeRates[selectedFromCurrency]) *
      //     exchangeRates[selectedToCurrency];
      //   setConvertedAmt(convertedAmount);
      //   console.log(convertedAmount, "convertedAmount in exchange");
      handleConversion(userAmt, selectedFromCurrency, selectedToCurrency);
    }
  }, [userAmt, selectedFromCurrency, selectedToCurrency]);
  useEffect(() => {
    const conversionDetails = {
      userAmt,
      selectedFromCurrency,
      selectedToCurrency,
      convertedAmt,
    };
    if (userAmt !== "") {
      setHistory([...history, conversionDetails]);
    }
  }, [selectedToCurrency]);
  const onChangeConvertedAmount = (e: any) => {
    alert("hello");
    console.log("hello");
  };

  const handleConversion = (
    amt: string,
    fromCurrency: string,
    ToCurrency: string
  ) => {
    if (exchangeRates) {
      const convertedAmount =
        (parseFloat(amt) / exchangeRates[fromCurrency]) *
        exchangeRates[ToCurrency];
      setConvertedAmt(convertedAmount);
      //   console.log(convertedAmount, "convertedAmount in exchange");
      //   const conversionDetails = {
      //     amt,
      //     fromCurrency,
      //     ToCurrency,
      //     convertedAmount,
      //   };
      //   if (amt !== "") {
      //     setHistory([...history, conversionDetails]);
      //   }
    }
  };

  console.log(history, "history");
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
        onChangeConvertedAmount={onChangeConvertedAmount}
      />
    </>
  );
};

export default CurrencyConverter;
