import Request from '@/Backend/axiosCall/apiCall';
import { ApiError, ApiSuccess } from '../../../../Datatypes/interfaces/interface';
import { createAsyncThunk } from '@reduxjs/toolkit';


// Async Thunk for Fetching Payment Info
export const fetchPaymentInfo = createAsyncThunk(
    'razorpay/fetchPaymentInfo',
    async (paymentId: string, { rejectWithValue }) => {
      try {
        const response = await Request({
          endpointId: 'GET_PAYMENT_INFO',
          slug: `/${paymentId}`, 
        });
  
        const apiSuccess: ApiSuccess = {
          statusCode: response.status,
          message: 'Payment info fetched successfully',
          data: response,
        };
  
        return apiSuccess.data;
      } catch (error) {
        const castedError = error as ApiError;
        return rejectWithValue(
          castedError?.error === 'string' ? castedError?.error : 'Unknown Error'
        );
      }
    }
  );
  
  // Async Thunk for Creating Payment Order
  export const createPaymentOrder = createAsyncThunk(
    'razorpay/createPaymentOrder',
    async (
      { amount, currency }: { amount: number; currency: string },
      { rejectWithValue }
    ) => {
      try {
        const response = await Request({
          endpointId: 'CREATE_PAYMENT_ORDER',
          data: { amount, currency },
        });
  
        const apiSuccess: ApiSuccess = {
          statusCode: response.status,
          message: 'Payment order created successfully',
          data: response,
        };
  
        return apiSuccess.data;
      } catch (error) {
        const castedError = error as ApiError;
        return rejectWithValue(
          castedError?.error === 'string' ? castedError?.error : 'Unknown Error'
        );
      }
    }
  );
  