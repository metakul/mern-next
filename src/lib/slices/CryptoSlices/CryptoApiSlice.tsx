// blogAction.tsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSingleCryptoInfo } from './CryptoSlice';
import { ApiError, CryptoData, CryptoInfoProps } from '../../../Datatypes/interfaces/interface';
import { ApiEndpoint } from '@/Datatypes/enums';
import Request from '@/Backend/axiosCall/apiCall';
import { ApiSuccess } from '../../../Datatypes/interfaces/interface';

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
      const response = await Request({
        apiId:ApiEndpoint.FetchCryptoInfo.apiId,
        url: `${ApiEndpoint.FetchCryptoInfo.url}/${cryptoSymbol}/${currency}`,
        method: ApiEndpoint.FetchCryptoInfo.method,
        headers: ApiEndpoint.FetchCryptoInfo.headers,
      })
      console.log(response);
      
      //todo add propoer data for cryptoInfo
      const cryptoData: CryptoData = {
        cryptoSymbol: response.asset_id_base,
        currency: response.asset_id_quote,
        price: response.rate,
        marketCap: response.time
      };
      
      dispatch(fetchSingleCryptoInfo({_id:cryptoSymbol || "",cryptoData,loading:false}));

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Crypto Info Fetched SuccessFully',
        data: response,
      };
  
      console.log(apiSuccess);
      return apiSuccess;

    } catch (error) {
      const castedError =error as ApiError
      console.error('Failed To Load:', error);
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);
