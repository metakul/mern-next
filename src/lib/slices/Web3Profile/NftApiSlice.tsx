// In your slice file (yourSliceFile.js)
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ClaimNftInterface } from '../../../Datatypes/interfaces/interface';
import { claimNft } from '../../helpers';

export const ClaimNftSlice = createAsyncThunk(
  'Nft/claim',
  async (data: ClaimNftInterface, { rejectWithValue }) => {
    try {
      return await claimNft(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);