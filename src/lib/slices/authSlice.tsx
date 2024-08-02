// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../Datatypes/interfaces/interface';
import Cookies from 'js-cookie';

const storedUser = Cookies.get('user');
const storedAccessToken = Cookies.get('access');
const storedRefreshToken = Cookies.get('refresh');
const storedUserType = Cookies.get('userType');

const initialState: AuthState = {
  isAuthenticated: false,
  user: storedUser ? storedUser : null,
  access: storedAccessToken ? storedAccessToken : null,
  refresh: storedRefreshToken ? storedRefreshToken : null,
  userType: storedUserType ? storedUserType : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ user: string; token: { access: string, refresh: string }; userType: string }>) => {

      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.access = action.payload.token.access;
      state.refresh = action.payload.token.refresh;
      state.userType = action.payload.userType;
      Cookies.set('user', action.payload.user);
      Cookies.set('access', action.payload.token.access);
      Cookies.set('refresh', action.payload.token.refresh);
      Cookies.set('userType', action.payload.userType);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.access = null;
      state.refresh = null;
      state.userType = null;
      Cookies.remove('user');
      Cookies.remove('access');
      Cookies.remove('refresh');
      Cookies.remove('userType');
    },
    // Define a new action to refresh the access token
    refreshAccessToken: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
      Cookies.set('access', action.payload);
    },
  },
});

export const { setCredentials, logout, refreshAccessToken } = authSlice.actions;

export default authSlice.reducer;

// Selectors remain the same
export const selectUser = (state: { auth: { user: string } }) => state.auth.user;
export const selectToken = (state: { auth: { access: string } }) => state.auth.access;
export const isAuthenticated = (state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated;
export const selectUserType = (state: { auth: { userType: string } }) => state.auth.userType;
