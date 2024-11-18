import { PaymentInfo } from '@/Datatypes/interfaces/interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces
export interface RazorpayState {
  paymentInfo: PaymentInfo[]; // Array of PaymentInfo
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: RazorpayState = {
  paymentInfo: [], // Initialize as an empty array
  loading: false,
  error: null,
};

// Razorpay Slice
const razorpaySlice = createSlice({
  name: 'razorpay',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Replace existing paymentInfo with new array
    setPaymentInfo: (state, action: PayloadAction<PaymentInfo[]>) => {
      state.loading = false;
      state.paymentInfo = action.payload;
    },
    // Add a single PaymentInfo to the existing array
    addPaymentInfo: (state, action: PayloadAction<PaymentInfo>) => {
      state.loading = false;
      state.paymentInfo = [...state.paymentInfo, action.payload];
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearPaymentInfo: (state) => {
      state.paymentInfo = [];
      state.error = null;
      state.loading = false;
    },
  },
});

// Export Actions and Reducer
export const {
  startLoading,
  setPaymentInfo,
  addPaymentInfo,
  setError,
  clearPaymentInfo,
} = razorpaySlice.actions;
export default razorpaySlice.reducer;

// Selectors
export const selectRazorpayState = (state: { razorpay: RazorpayState }) => state.razorpay;

export const selectPaymentInfo = (state: { razorpay: RazorpayState }) =>
  state.razorpay;

export const selectLoading = (state: { razorpay: RazorpayState }) => state.razorpay.loading;

export const selectError = (state: { razorpay: RazorpayState }) => state.razorpay.error;
