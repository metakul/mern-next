import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentInfo } from '@/Datatypes/interfaces/interface';

export interface TrackingInfo {
  id: string;
  trackingId:string
  active: boolean;
  courier_tracking_link: string | null;
  destination_city: string;
  destination_country_iso3: string;
  origin_city: string;
  origin_country_iso3: string;
  pickup_location: string | null;
  delivery_type: string;
  order_id: string;
  subtag: string;
  subtag_message: string;
  checkpoints: any[];
  origin_raw_location:string
  destination_raw_location:string
  tag:string
  tracking_number:string
  // Add other fields as needed from the provided structure
}

export interface RazorpayState {
  paymentInfo: PaymentInfo[]; // Array of PaymentInfo
  trackingInfo: TrackingInfo[]; // Array of TrackingInfo
  loading: boolean;
  error: string | null;
}

const initialState: RazorpayState = {
  paymentInfo: [], // Initialize as an empty array
  trackingInfo: [], // Initialize as an empty array
  loading: false,
  error: null,
};

const razorpaySlice = createSlice({
  name: 'razorpay',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    // Replace existing paymentInfo with a new array
    setPaymentInfo: (state, action: PayloadAction<PaymentInfo[]>) => {
      state.loading = false;
      state.paymentInfo = action.payload;
    },
    // Replace existing trackingInfo with a new array
    setTrackingInfo: (state, action: PayloadAction<TrackingInfo[]>) => {
      state.loading = false;
      state.trackingInfo = action.payload;
    },
    // Add a single PaymentInfo to the existing array if not already present
    addPaymentInfo: (state, action: PayloadAction<PaymentInfo>) => {
      state.loading = false;
      const exists = state.paymentInfo.some((info) => info.id === action.payload.id);
      if (!exists) {
        state.paymentInfo.push(action.payload);
      }
    },
    // Add a single TrackingInfo to the existing array if not already present
    addTrackingInfo: (state, action: PayloadAction<TrackingInfo>) => {
      state.loading = false;
      const exists = state.trackingInfo.some((info) => info.id === action.payload.id);
      if (!exists) {
        state.trackingInfo.push(action.payload);
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
    clearAllInfo: (state) => {
      state.paymentInfo = [];
      state.trackingInfo = [];
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  startLoading,
  setPaymentInfo,
  setTrackingInfo,
  addPaymentInfo,
  addTrackingInfo,
  setError,
  resetError,
  clearAllInfo,
} = razorpaySlice.actions;

export default razorpaySlice.reducer;

// Selectors
// Select the entire Razorpay state
export const selectRazorpayState = (state: { razorpay: RazorpayState }) => state.razorpay;

// Select all PaymentInfo
export const selectPaymentInfo = (state: { razorpay: RazorpayState }) => state.razorpay;

// Select PaymentInfo by ID
export const selectPaymentInfoById = (id: string) => (state: { razorpay: RazorpayState }) =>
  state.razorpay.paymentInfo.find((info) => info.id === id);

// Select all TrackingInfo
export const selectTrackingInfo = (state: { razorpay: RazorpayState }) => state.razorpay.trackingInfo;

// Select TrackingInfo by ID
export const selectTrackingInfoById = (id: string) => (state: { razorpay: RazorpayState }) =>
  state.razorpay.trackingInfo.find((info) => info.id === id);

// Select loading state
export const selectLoading = (state: { razorpay: RazorpayState }) => state.razorpay.loading;

// Select error state
export const selectError = (state: { razorpay: RazorpayState }) => state.razorpay.error;
