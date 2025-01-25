// In your slice file (yourSliceFile.js)
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ClaimNftInterface } from '../../../Datatypes/interfaces/interface';
import { claimNft } from '../../helpers';

export const ClaimNftSlice = createAsyncThunk(
  'Nft/claim',
  async ({claimNftHandler}: {claimNftHandler:ClaimNftInterface}, { rejectWithValue }) => {
    try {
      return await claimNft({claimNftHandler});
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);