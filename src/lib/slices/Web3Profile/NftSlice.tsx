import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NFTCollectionState } from '../../../Datatypes/interfaces/interface';

const initialState: NFTCollectionState = {
  nfts: [],
};
const nftCollectionSlice = createSlice({
  name: 'nftCollection',
  initialState,
  reducers:(create) => ({
    setLoadedNfts:create.reducer( (state, action: PayloadAction<{ nfts: unknown[] }>) => {
      state.nfts = action.payload.nfts;
      const loadedNfts = action.payload.nfts;
      state.nfts = [...loadedNfts];
    }),
  }),
});

export const { setLoadedNfts } = nftCollectionSlice.actions;

export default nftCollectionSlice.reducer;

export const selectNftCollection = (state: { nftCollection: NFTCollectionState }) =>
  state.nftCollection;
