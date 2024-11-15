import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDropShipItem } from '../../../Datatypes/interfaces/interface';

interface DropShipState {
  dropShipItems: IDropShipItem[];
  loading: boolean;
}

const initialState: DropShipState = {
  dropShipItems: [] as IDropShipItem[],
  loading: false,
};

const dropShipSlice = createSlice({
  name: 'dropShipCollection',
  initialState,
  reducers: {
    setLoadedItems: (state, action: PayloadAction<{ itemData?: IDropShipItem[]; loading: boolean }>) => {
      const loadedItems = action.payload.itemData;
      loadedItems &&
        loadedItems.forEach((item) => {
          if (!state.dropShipItems.some((existingItem) => existingItem.id === item.id)) {
            state.dropShipItems.push(item);
          }
        });
      state.loading = action.payload.loading;
    },
    addItem: (state, action: PayloadAction<IDropShipItem>) => {
      state.dropShipItems.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<IDropShipItem>) => {
      const updatedItem = action.payload;
      const itemIndex = state.dropShipItems.findIndex((item) => item.id === updatedItem.id);
      if (itemIndex !== -1) {
        state.dropShipItems[itemIndex] = updatedItem;
      }
    },
  },
});

export const { setLoadedItems, addItem, updateItem } = dropShipSlice.actions;

export default dropShipSlice.reducer;

export const selectedDropShipItems = (state: { dropShipCollection: DropShipState }) =>
  state.dropShipCollection;

export const useSelectedDropShipItem = (itemId: string | undefined) => (state: { dropShipCollection: DropShipState }) =>
  state.dropShipCollection.dropShipItems.find((item) => item.id === itemId);
