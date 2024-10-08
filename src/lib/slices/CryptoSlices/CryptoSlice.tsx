import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {  CryptoData } from '../../../Datatypes/interfaces/interface';

export interface CryptoInfo {
  _id: string;
  cryptoData: CryptoData;
  loading?:boolean
}

const initialState: CryptoInfo[] = [];

const cryptoCollection = createSlice({
  name: 'cryptoCollection',
  initialState,
  reducers:(create)=> ({
    fetchSingleCryptoInfo: create.reducer((state, action: PayloadAction<CryptoInfo>) => {
      const { _id, cryptoData,loading } = action.payload;
      // Check if the ID already exists in state
      const existingCryptoIndex = state.findIndex(item => item._id === _id);
     
      if (existingCryptoIndex !== -1) {
        // If the ID exists, update the crypto data
        state[existingCryptoIndex].cryptoData = cryptoData;
        state[existingCryptoIndex].loading = loading;
        
      } else {
        // If the ID doesn't exist, add a new entry
        state.push({ _id, cryptoData,loading:loading });
      }
    }),
  }),
});

export const { fetchSingleCryptoInfo } = cryptoCollection.actions;

export default cryptoCollection.reducer;

export const selectedCryptos = (state: { cryptoCollection: CryptoInfo[] }) =>
  state.cryptoCollection;
