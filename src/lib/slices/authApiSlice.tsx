// authActions.tsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCredentials, setLoading } from './authSlice';
import { ApiError, LoginData } from '../../Datatypes/interfaces/interface';
import Request from '@/Backend/axiosCall/apiCall';
// import { ApiSuccess } from '../../Datatypes/interfaces/interface';

// interface JwtPayload {
//   sub: string;
//   walletAddress: string;
//   user_type: string; 
// }
// TODO create custom Payload

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password, OnFormSuccess,userType }: LoginData, { rejectWithValue, dispatch }) => {
    try {
      
      dispatch(setLoading({ isLoading: true }));
console.log("Loading state set to true");

      const response = await Request({
        endpointId: "MAIN_LOGIN",
        data: { userType,email, password,deviceId:"550e8400-e29b-41d4-a716-446655440000" },
      })
      
      // Assuming the response contains user information and a token
      const {  accessToken,refreshToken } = response.data.token;

      // $TODO save access and refresh in cookies and apply the refresh logic
      // Dispatch the setCredentials action to update the authentication state
      // const apiSuccess: ApiSuccess = {
      //   statusCode: response?.status,
      //   message: 'Login Request successful',
      //   data: response?.data,
      // };
      
      
      dispatch(setCredentials({ user:response?.data?.email, token:{accessToken,refreshToken}, userType:response?.data?.category,isLoading:false }));
      OnFormSuccess()
      return response.data;

    } catch (error) {
      dispatch(setLoading({ isLoading: false }));

      const castedError =error as ApiError
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);
