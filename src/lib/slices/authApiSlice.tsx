// authActions.tsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCredentials } from './authSlice';
import { ApiError, LoginData } from '../../Datatypes/interfaces/interface';
import { ApiEndpoint } from '@/Datatypes/enums';
import Request from '@/Backend/axiosCall/apiCall';
import { ApiSuccess } from '../../Datatypes/interfaces/interface';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  sub: string;
  walletAddress: string;
  user_type: string; 
}
// TODO create custom Payload

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password, OnFormSuccess,userType }: LoginData, { rejectWithValue, dispatch }) => {

    try {
      const response = await Request({
        endpointId: userType== "ADMIN" ? "LOGIN" : "USER_LOGIN",
        data: { email, password,deviceId:"550e8400-e29b-41d4-a716-446655440000" },
        
       
      })
      
      // Assuming the response contains user information and a token
      const {  accessToken,refreshToken } = response.token;
      const user:JwtPayload=jwtDecode(accessToken)


      // $TODO save access and refresh in cookies and apply the refresh logic
      // Dispatch the setCredentials action to update the authentication state
      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Login Request successful',
        data: response.data,
      };
      
      dispatch(setCredentials({ user:user, token:{accessToken,refreshToken}, userType:user.user_type,isLoading:false }));
      OnFormSuccess()

      return apiSuccess;

    } catch (error) {

      const castedError =error as ApiError
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);
