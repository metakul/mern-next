// blogAction.tsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSingleCryptoInfo } from './CryptoSlice';
import { ApiError, CryptoData, CryptoInfoProps } from '../../../Datatypes/interfaces/interface';
import { ApiSuccess } from '../../../Datatypes/interfaces/interface';
import axios from 'axios';

const COINMARKET_API_KEY = import.meta.env.VITE_COIN_MARKET_CAP_API;
export const fetchSingleCryptoDispatcher = createAsyncThunk(
  'FetchCryptoInfo',
  async ({ cryptoSymbol,currency }: CryptoInfoProps, { rejectWithValue,dispatch }) => {
    dispatch(fetchSingleCryptoInfo({_id:cryptoSymbol || "", loading: true, cryptoData: {
      cryptoSymbol:cryptoSymbol,
      currency:currency,
      price:"loading",
      marketCap:"loading",
    } })); // Dispatch loading as true
 
    try {
    
      const response = await axios.get('https://pro-api.coinmarketcap.com/v1/exchange/map', {
        headers: {
          'X-CMC_PRO_API_KEY': COINMARKET_API_KEY,
          'Accept': 'application/json',
        },
        params: {
          CMC_PRO_API_KEY: COINMARKET_API_KEY,

        },
      });
      
      //todo add propoer data for cryptoInfo
      const cryptoData: CryptoData = {
        cryptoSymbol:cryptoSymbol,
        currency: response.data?.asset_id_quote,
        price: response?.data?.rate,
        marketCap: response?.data?.time
      };
      dispatch(fetchSingleCryptoInfo({_id:cryptoSymbol || "",cryptoData,loading:false}));

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Crypto Info Fetched SuccessFully',
        data: response
      };
  
      return apiSuccess;

    } catch (error) {
      const castedError =error as ApiError
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);
