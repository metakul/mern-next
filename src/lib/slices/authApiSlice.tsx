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
  async ({ email, password, OnFormSuccess }: LoginData, { rejectWithValue, dispatch }) => {

    try {
      const response = await Request({
        endpointId:"LOGIN",
        data: { email, password },
       
      })
      
      // Assuming the response contains user information and a token
      const {  access,refresh } = response.token;
      const user:JwtPayload=jwtDecode(access)


      // $TODO save access and refresh in cookies and apply the refresh logic
      // Dispatch the setCredentials action to update the authentication state
      dispatch(setCredentials({ user:user, token:{access,refresh}, userType:user.user_type,isLoading:false }));
      OnFormSuccess()
      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Login Request successful',
        data: response.data,
      };
  

      return apiSuccess;

    } catch (error) {
    dispatch(setCredentials({ user:"", token:{access:"",refresh:""}, userType:"",isLoading:false }));

      const castedError =error as ApiError
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);
