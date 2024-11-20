import Request from '@/Backend/axiosCall/apiCall';
import { ApiError, ApiSuccess, DeliveryLocation, PaymentInfo } from '../../../../Datatypes/interfaces/interface';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addPaymentInfo, addTrackingInfo, setError, setPaymentInfo, startLoading } from './paymentSlice';
import { fetchCartApi } from '../DropShipAPI';

// Fetch Razorpay Payment IDs
export const fetchPaymentIds = createAsyncThunk(
  'razorpay/fetchPaymentIds',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      dispatch(startLoading());

      const response = await Request({
        endpointId: 'FETCH_PAYMENT_IDS',
      });

      const deliveryInfo: any[] = response.data;

      for (const paymentId of deliveryInfo) {
        try {
          // Fetch payment information
          const paymentInfo: PaymentInfo = await Request({
            endpointId: 'GET_PAYMENT_INFO',
            slug: `/${paymentId.paymentId}`,
          });

          // Dispatch payment info immediately after fetching
          dispatch(addPaymentInfo(paymentInfo));

          // Fetch tracking information
          const trackingInfo = await Request({
            endpointId: 'FETCH_PAYMENT_IDS',
            slug: `/${paymentId.trackingId}`,
          });

          console.log(trackingInfo.trackingInfo.data,"trackingInfo");
          
          // Dispatch tracking info immediately after fetching
          dispatch(addTrackingInfo(trackingInfo.trackingInfo.data));
        } catch (innerError) {
          console.error(
            `Failed to fetch details for Payment ID ${paymentId.paymentId}:`,
            innerError
          );
        }
      }

      return { message: 'Payment IDs and details fetched successfully' };
    } catch (error) {
      console.error('Error fetching payment IDs:', error);

      const castedError = error as ApiError;
      const errorMessage =
        castedError?.error === 'string' ? castedError?.error : 'Unknown Error';

      dispatch(setError('Error Fetching Payment Info'));
      return rejectWithValue(errorMessage);
    }
  }
);


export const addPaymentId = createAsyncThunk(
  'razorpay/addPaymentId',
  async (
    { paymentId, orderDetails }: { paymentId: string; orderDetails: DeliveryLocation },
    { rejectWithValue, dispatch }
  ) => {
    try {
      // Start loading
      dispatch(startLoading());

      // Send the payment ID along with order details
      const response: PaymentInfo = await Request({
        endpointId: 'ADD_PAYMENT_ID',
        data: { paymentId, orderDetails },
      });

      const apiSuccess: ApiSuccess = {
        message: 'Payment ID added successfully',
        data: response,
      };

      // Fetch payment information after adding the payment ID
      const paymentInfo: PaymentInfo = await Request({
        endpointId: 'GET_PAYMENT_INFO',
        slug: `/${paymentId}`,
      });

      // Update the store with the fetched payment information
      dispatch(fetchCartApi({ isAuthenticated: true }));
      dispatch(setPaymentInfo([paymentInfo]));

      return apiSuccess.data;
    } catch (error) {
      const castedError = error as ApiError;

      // Set error in the store
      const errorMessage =
        typeof castedError?.error === 'string' ? castedError?.error : 'Unknown Error';
      dispatch(setError(errorMessage));

      return rejectWithValue(errorMessage);
    }
  }
);

