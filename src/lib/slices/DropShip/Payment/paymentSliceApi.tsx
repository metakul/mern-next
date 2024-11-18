import Request from '@/Backend/axiosCall/apiCall';
import { ApiError, ApiSuccess, PaymentInfo } from '../../../../Datatypes/interfaces/interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {  setError, setPaymentInfo, startLoading } from './paymentSlice';

// Updated Async Thunk for Fetching Payment Info
export const fetchPaymentInfo = createAsyncThunk(
  'razorpay/fetchPaymentInfo',
  async (paymentId: string, { rejectWithValue, dispatch }) => {
    try {
      // Start loading
      dispatch(startLoading());

      const response: PaymentInfo= await Request({
        endpointId: 'GET_PAYMENT_INFO',
        slug: `/${paymentId}`,
      });

      const apiSuccess: ApiSuccess = {
        message: 'Payment info fetched successfully',
        data: response,
      };

      // Set the payment info in the store
      dispatch(setPaymentInfo([response]));

      return apiSuccess.data;
    } catch (error) {
      const castedError = error as ApiError;

      // Set error in the store
      const errorMessage =
        castedError?.error === 'string' ? castedError?.error : 'Unknown Error';
      dispatch(setError(errorMessage));

      return rejectWithValue(errorMessage);
    }
  }
);

// Updated Async Thunk for Creating Payment Order
export const createPaymentOrder = createAsyncThunk(
  'razorpay/createPaymentOrder',
  async (
    { amount, currency }: { amount: number; currency: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      // Start loading
      dispatch(startLoading());

      const response:PaymentInfo = await Request({
        endpointId: 'CREATE_PAYMENT_ORDER',
        data: { amount, currency },
      });

      const apiSuccess: ApiSuccess = {
        // statusCode: response.status,
        message: 'Payment order created successfully',
        data: response,
      };

      // Set the payment info in the store
      dispatch(setPaymentInfo([response]));

      return apiSuccess.data;
    } catch (error) {
      const castedError = error as ApiError;

      // Set error in the store
      const errorMessage =
        castedError?.error === 'string' ? castedError?.error : 'Unknown Error';
      dispatch(setError(errorMessage));

      return rejectWithValue(errorMessage);
    }
  }
);
