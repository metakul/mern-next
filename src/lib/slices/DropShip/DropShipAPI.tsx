import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoadedItems, addItem, updateItem } from './DropShipSlice';
import { ApiError, ApiSuccess } from '../../../Datatypes/interfaces/interface';
import Request from '@/Backend/axiosCall/apiCall';
import { IDropShipItem } from '../../../Datatypes/interfaces/interface';
import { addItemToCart, CartItem, loadCartFromCookies, removeItemFromCart } from './AddToCartSlice';

export const fetchDropShipItemsApi = createAsyncThunk(
  'dropShipCollection/setLoadedItems',
  async ({ pageSize, page, setItemPage, status }: { pageSize?: number, page?: number, setItemPage?: (page: number) => void, status: string }, { rejectWithValue, dispatch }) => {
    dispatch(setLoadedItems({
      loading: true,
    }));
    try {
      const response = await Request({
        endpointId: "GET_DROPSHIP_ITEMS",
        slug: `?status=${status}&pagesize=${pageSize}&page=${page}`,
      });

      const items: IDropShipItem[] = response;
      dispatch(setLoadedItems({ itemData: items, loading: false }));

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Items fetched successfully',
        data: response,
      };
      if (page && setItemPage) {
        setItemPage(page + 1);
      }

      return apiSuccess;

    } catch (error) {
      dispatch(setLoadedItems({
        loading: false,
      }));
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);

export const fetchSingleDropShipItemApi = createAsyncThunk(
  'dropShipCollection/setLoadedItems',
  async ({ itemId }: { itemId?: string }, { rejectWithValue, dispatch }) => {
    dispatch(setLoadedItems({
      loading: true,
    }));
    try {
      const response = await Request({
        endpointId: "GET_SINGLE_DROPSHIP_ITEM",
        slug: `/${itemId}`,
      });

      const item: IDropShipItem = response[0];
      dispatch(setLoadedItems({ itemData: [item], loading: false }));

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Item fetched successfully',
        data: response,
      };

      return apiSuccess;

    } catch (error) {
      dispatch(setLoadedItems({
        loading: false,
      }));
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);

export const addDropShipItemApi = createAsyncThunk(
  'dropShipCollection/addItem',
  async ({ newDropShipItemData, formEvent,clearForm, setIsSaving }: { newDropShipItemData: IDropShipItem,formEvent:any, clearForm: any, setIsSaving: any }, { rejectWithValue, dispatch }) => {
    try {
      let response;

      if (formEvent==="EDIT") {
        // Update item logic
        response = await Request({
          endpointId: "EDIT_DROPSHIP_ITEM",
          slug: `/${newDropShipItemData.id}`,
          data: newDropShipItemData,
        });
        dispatch(updateItem(response));
      } else {
        // Add new item logic
        response = await Request({
          endpointId: "ADD_DROPSHIP_ITEM",
          data: newDropShipItemData,
        });
        clearForm();
        dispatch(addItem(response));
      }

      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Item processed successfully',
        data: response,
      };

      setIsSaving(false);
      return apiSuccess;

    } catch (error) {
      setIsSaving(false);
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);

export const updateDropShipItemStatus = createAsyncThunk(
  'dropShipCollection/updateItem',
  async ({ itemId, status, setIsUpdating }: { itemId?: string, status: string, setIsUpdating: any }, { rejectWithValue, dispatch }) => {
    try {
      setIsUpdating(true);
      const response = await Request({
        endpointId: "UPDATE_DROPSHIP_ITEM_STATUS",
        slug: `/${itemId}`,
        data: { status, id: itemId },
      });

      dispatch(updateItem(response));
      const apiSuccess: ApiSuccess = {
        statusCode: response.status,
        message: 'Item status updated successfully',
        data: response,
      };

      setIsUpdating(false);
      return apiSuccess;

    } catch (error) {
      setIsUpdating(false);
      const castedError = error as ApiError;
      return rejectWithValue(castedError?.error === "string" ? castedError?.error : 'Unknown Error');
    }
  }
);

// Async Thunks

import { toast } from 'react-toastify';

export const addToCartApi = createAsyncThunk(
  'cart/addToCartApi',
  async (
    { item, isAuthenticated }: { item: CartItem; isAuthenticated: boolean },
    { rejectWithValue, dispatch }
  ) => {
    console.log(item);
    
    if (isAuthenticated) {
      try {
        const response = await Request({
          endpointId: 'ADD_TO_CART',
          data: item,
        });
        dispatch(addItemToCart(response));
        return response;
      } catch (error) {
        return rejectWithValue('An error occurred while adding to cart.');
      }
    } else {
      try {
        const existingCart = sessionStorage.getItem('cart');
        let cartItems = existingCart ? JSON.parse(existingCart) : [];

        const existingItemIndex = cartItems.findIndex((cartItem: CartItem) => cartItem.id === item.id);
        if (existingItemIndex !== -1) {
          cartItems[existingItemIndex].quantity += item.quantity;
        } else {
          cartItems.push(item);
        }

        sessionStorage.setItem('cart', JSON.stringify(cartItems));
        dispatch(addItemToCart(item));

        // Show toast notification when item is added to cart in session storage
        toast.success(`${item.name} has been added to your cart!`);

        return { message: 'Item saved to cart in sessionStorage', item };
      } catch (error) {
        return rejectWithValue('Failed to save item to cart in sessionStorage');
      }
    }
  }
);

export const fetchCartApi = createAsyncThunk(
  'cart/fetchCartApi',
  async ({ isAuthenticated }: { isAuthenticated: boolean }, { rejectWithValue, dispatch }) => {
    if (isAuthenticated) {
      try {
        const response = await Request({
          endpointId: 'GET_CART',
        });

        // Update Redux with fetched cart items
        response.cartItems.forEach((item: CartItem) => {
          dispatch(addItemToCart(item));
        });

        return response.cartItems;
      } catch (error) {
        return rejectWithValue('Failed to fetch cart from backend');
      }
    } else {
      try {
        const savedCart = sessionStorage.getItem('cart');
        const cartItems: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

        // Fetch detailed information for each item in the cart
        const detailedCartItems = await Promise.all(
          cartItems.map(async (item) => {
            try {
              // Fetch detailed item info using Request
              const response = await Request({
                endpointId: "GET_SINGLE_DROPSHIP_ITEM",
                slug: `/${item.id}`,
              });

              // Assuming the response contains an array with a single item
              const detailedItem = response[0];
              console.log(detailedItem);
              
              return {
                ...item,
                name: detailedItem.title,
                price: detailedItem.price, 
              };
            } catch (error) {
              console.error(`Failed to fetch details for item ID: ${item.id}`, error);

              // Fallback to random price if fetching fails
              return {
                ...item,
                price:undefined, // Random price between 1 and 100
              };
            }
          })
        );

        // Update Redux state with detailed cart items
        dispatch(loadCartFromCookies(detailedCartItems));
        return detailedCartItems;
      } catch (error) {
        return rejectWithValue('Failed to fetch cart from sessionStorage');
      }
    }
  }
);

export const removeItemQuantityApi = createAsyncThunk(
  'cart/removeItemQuantityApi',
  async (
    { itemId, isAuthenticated }: { itemId: string; isAuthenticated: boolean },
    { rejectWithValue, dispatch }
  ) => {
    if (isAuthenticated) {
      try {
        const response = await Request({
          endpointId: 'REMOVE_ITEM_FROM_CART',
          data: { id: itemId },
        });
        dispatch(removeItemFromCart(itemId));
        return response;
      } catch (error) {
        return rejectWithValue('An error occurred while removing item.');
      }
    } else {
      try {
        const existingCart = sessionStorage.getItem('cart');
        let cartItems = existingCart ? JSON.parse(existingCart) : [];

        const existingItemIndex = cartItems.findIndex((cartItem: CartItem) => cartItem.id === itemId);
        console.log(existingItemIndex);

        if (existingItemIndex !== -1) {
          const item = cartItems[existingItemIndex];

          // Only reduce quantity if it's greater than 1
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            // If quantity is 1 or less, remove the item entirely
            cartItems = cartItems.filter((cartItem: CartItem) => cartItem.id !== itemId);
          }

          // Ensure sessionStorage is updated with the new cart state
          sessionStorage.setItem('cart', JSON.stringify(cartItems));
        }


        dispatch(removeItemFromCart(itemId));
        return { message: 'Item quantity updated in sessionStorage', itemId };
      } catch (error) {
        return rejectWithValue('Failed to update item in sessionStorage');
      }
    }
  }
);
