import { createAsyncThunk } from '@reduxjs/toolkit';
import { setLoadedItems, addItem, updateItem } from './DropShipSlice';
import { ApiError, ApiSuccess } from '../../../Datatypes/interfaces/interface';
import Request from '@/Backend/axiosCall/apiCall';
import { IDropShipItem } from '../../../Datatypes/interfaces/interface';

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
  async ({ newDropShipItemData, closeDialog, clearForm, setIsSaving }: { newDropShipItemData: IDropShipItem, closeDialog: any, clearForm: any, setIsSaving: any }, { rejectWithValue, dispatch }) => {
    try {
      let response;

      if (newDropShipItemData.id) {
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

      closeDialog();
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
