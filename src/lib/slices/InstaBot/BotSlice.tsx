import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BotData } from './BotApiSlice';

interface BotsState {
  bots: BotData[];
  loading: boolean;
  error: string | null;
  message: string;
}

const initialState: BotsState = {
  bots: [],
  loading: false,
  error: null,
  message: '',
};

const botsSlice = createSlice({
  name: 'bots',
  initialState,
  reducers: {
    clearBots: (state) => {
      state.bots = [];
      state.loading = false;
      state.error = null;
      state.message = '';
    },
    fetchMyNots: (state) => {
      state.bots = [];
      state.loading = false;
      state.error = null;
      state.message = '';
    },
    fetchBotsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBotsSuccess: (state, action: PayloadAction<{ data: BotData[], message: string }>) => {
      state.loading = false;
      state.bots = action.payload.data;
      state.message = action.payload.message;
    },
    fetchBotsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearBots, fetchMyNots, fetchBotsRequest, fetchBotsSuccess, fetchBotsFailure } = botsSlice.actions;

export default botsSlice.reducer;

// Selector to access bots from state
export const selectBots = (state: { botsSlice: BotsState }) => state.botsSlice;
