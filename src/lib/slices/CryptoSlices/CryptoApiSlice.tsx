// blogAction.tsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSingleCryptoInfo } from './CryptoSlice';
import { ApiError, CryptoData, CryptoInfoProps } from '../../../Datatypes/interfaces/interface';
import Request from '@/Backend/axiosCall/apiCall';
import { ApiSuccess } from '../../../Datatypes/interfaces/interface';

export const fetchSingleCryptoDispatcher = createAsyncThunk(
  'FetchCryptoInfo',
  async ({ cryptoAddress,currency }: CryptoInfoProps, { rejectWithValue,dispatch }) => {
    dispatch(fetchSingleCryptoInfo({_id:cryptoAddress || "", loading: true, cryptoData: {
      cryptoAddress:cryptoAddress,
      currency:currency,
      price:"loading",
      marketCap:"loading",
    } })); // Dispatch loading as true
 
    try {
      const response = await Request({
        endpointId: "FetchCryptoInfo",
        slug: `?address=${cryptoAddress}`,
        data: { cryptoAddress },
      })
      
      //todo add propoer data for cryptoInfo
      const cryptoData: CryptoData = {
        cryptoAddress:cryptoAddress,
        // currency: response?.asset_id_quote,
        price: response.token,
        marketCap: response?.time
      };
      dispatch(fetchSingleCryptoInfo({_id:cryptoAddress || "",cryptoData,loading:false}));

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
