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
    // Add a single PaymentInfo to the existing array if not already present
    addPaymentInfo: (state, action: PayloadAction<PaymentInfo>) => {
      state.loading = false;
      const exists = state.paymentInfo.some(
        (info) => info.id === action.payload.id // Assuming each PaymentInfo has a unique `id`
      );
      if (!exists) {
        state.paymentInfo.push(action.payload);
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
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
  resetError,
  clearPaymentInfo,
} = razorpaySlice.actions;
export default razorpaySlice.reducer;

// Selectors
export const selectRazorpayState = (state: { razorpay: RazorpayState }) => state.razorpay;

export const selectPaymentInfo = (state: { razorpay: RazorpayState }) =>
  state.razorpay;

export const selectPaymentInfoById = (id: string) => (state: { razorpay: RazorpayState }) =>
  state.razorpay.paymentInfo.find((info) => info.id === id);

export const selectLoading = (state: { razorpay: RazorpayState }) => state.razorpay.loading;

export const selectError = (state: { razorpay: RazorpayState }) => state.razorpay.error;
