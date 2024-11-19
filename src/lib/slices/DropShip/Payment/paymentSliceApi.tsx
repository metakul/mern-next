import Request from '@/Backend/axiosCall/apiCall';
import { ApiError, ApiSuccess, PaymentInfo } from '../../../../Datatypes/interfaces/interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setError, setPaymentInfo, startLoading } from './paymentSlice';

// Fetch Razorpay Payment IDs
export const fetchPaymentIds = createAsyncThunk(
  'razorpay/fetchPaymentIds',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(startLoading());

        const resposne = await Request({
          endpointId: 'FETCH_PAYMENT_IDS',
        });
        
        const paymentIds: string[] =resposne.data.razorpayPayments
  
        const paymentDetails: PaymentInfo[] = await Promise.all(
          paymentIds.map(async (paymentId) => {
            const paymentInfo: PaymentInfo = await Request({
              endpointId: 'GET_PAYMENT_INFO', 
              slug: `/${paymentId}`,
            });

            console.log(paymentInfo,"paymentInfo");
            
            return paymentInfo;
          })
        );
        const apiSuccess: ApiSuccess = {
          message: 'Payment IDs and details fetched successfully',
          data: paymentDetails,
        };
  
        dispatch(setPaymentInfo(paymentDetails));
  

      return apiSuccess.data;
    } catch (error) {
      const castedError = error as ApiError;

      // Set error in the store
      const errorMessage =
        castedError?.error === 'string' ? castedError?.error : 'Unknown Error';
      dispatch(setError(errorMessage));
      dispatch(setPaymentInfo([]));

      return rejectWithValue(errorMessage);
    }
  }
);

// Add a Razorpay Payment ID
export const addPaymentId = createAsyncThunk(
  'razorpay/addPaymentId',
  async (paymentId: string, { rejectWithValue, dispatch }) => {
    try {
      // Start loading
      dispatch(startLoading());

      const response: PaymentInfo = await Request({
        endpointId: 'ADD_PAYMENT_ID', 
        data: { paymentId },
      });

      const apiSuccess: ApiSuccess = {
        message: 'Payment ID added successfully',
        data: response,
      };

      const paymentInfo: PaymentInfo = await Request({
        endpointId: 'GET_PAYMENT_INFO', 
        slug: `/${paymentId}`,
      });
      dispatch(setPaymentInfo([paymentInfo]));
  

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
