import axios, { AxiosResponse } from "axios";
import { IExchangeRates } from "../type.d";

export const getSupportedCodes = async () => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `https://v6.exchangerate-api.com/v6/1397283d90b2e6fcb32cac3c/codes`
    );
    return response.data.supported_codes;
  } catch (error) {
    console.error("Error fetching all supported currencies:", error);
  }
};
export const getExchangeRates = async (currency: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(
      `https://open.er-api.com/v6/latest/${currency}`
    );
    return response.data.rates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
  }
};
