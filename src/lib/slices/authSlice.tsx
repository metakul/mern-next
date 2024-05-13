// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../Datatypes/interfaces/interface';

const storedUser = localStorage.getItem('user');
const storedAccessToken = localStorage.getItem('access');
const storedRefreshToken = localStorage.getItem('refresh');
const storedUserType = localStorage.getItem('userType');

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

      console.log(action);
      
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.access = action.payload.token.access;
      state.refresh = action.payload.token.refresh;
      state.userType = action.payload.userType;
      localStorage.setItem('user', action.payload.user);
      localStorage.setItem('access', action.payload.token.access);
      localStorage.setItem('refresh', action.payload.token.refresh);
      localStorage.setItem('userType', action.payload.userType);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.access = null;
      state.refresh = null;
      state.userType = null;
      localStorage.removeItem('user');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      localStorage.removeItem('userType');
    },
    // Define a new action to refresh the access token
    refreshAccessToken: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
      localStorage.setItem('access', action.payload);
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
