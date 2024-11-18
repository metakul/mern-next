import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces
interface PaymentInfo {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

interface RazorpayState {
  paymentInfo: PaymentInfo | null;
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: RazorpayState = {
  paymentInfo: null,
  loading: false,
  error: null,
};

// Razorpay Slice
const razorpaySlice = createSlice({
  name: 'razorpay',
  initialState,
  reducers: {
    // Start Loading
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },

    // Set Payment Info
    setPaymentInfo: (state, action: PayloadAction<PaymentInfo>) => {
      state.loading = false;
      state.paymentInfo = action.payload;
    },

    // Set Error
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear Payment Info
    clearPaymentInfo: (state) => {
      state.paymentInfo = null;
      state.error = null;
      state.loading = false;
    },
  },
});

// Export Actions and Reducer
export const { startLoading, setPaymentInfo, setError, clearPaymentInfo } = razorpaySlice.actions;
export default razorpaySlice.reducer;


// Selectors
// Selectors
export const selectRazorpayState = (state: { razorpay: RazorpayState }) => state.razorpay;

export const selectPaymentInfo = (state: { razorpay: RazorpayState }) => state.razorpay;
export const selectLoading = (state: { razorpay: RazorpayState }) => state.razorpay.loading;
export const selectError = (state: { razorpay: RazorpayState }) => state.razorpay.error;

export const useSelectedPaymentInfo = (state: { razorpay: RazorpayState }) =>
  state.razorpay.paymentInfo;
