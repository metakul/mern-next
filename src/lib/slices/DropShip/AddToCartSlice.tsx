import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  quantity: number;
  price?:any
}

interface CartState {
  cartItems: CartItem[];
  isAuthenticated: boolean;
}

const initialState: CartState = {
  cartItems: [],
  isAuthenticated: false,
};

// Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },

    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload);
      console.log(existingItem,action.payload);
      
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        // If the item has a quantity of 1, remove it from the cart
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      }
    },

    loadCartFromCookies: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems = action.payload;
    },

    setAuthentication: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },

    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// Export actions and reducers
export const { 
  addItemToCart, 
  removeItemFromCart, 
  clearCart, 
  setAuthentication, 
  loadCartFromCookies
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: { cart: { cartItems: CartItem[] } }) => state.cart.cartItems;
export const selectAuthentication = (state: { cart: { isAuthenticated: boolean } }) => state.cart.isAuthenticated;
