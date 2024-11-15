import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
// import logger from 'redux-logger'
import authReducer from "./slices/authSlice"
import chatReducer from "./slices/Chatgpt/ChatGptSlice"
import userReducer from "./slices/RegisterUsers/RegisterSlice"
import dropShipSlice from "./slices/DropShip/DropShipSlice"
import cryptoCollectionRedcuer from "./slices/CryptoSlices/CryptoSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth:authReducer,
        user:userReducer,
        chat: chatReducer,
        cryptoCollection:cryptoCollectionRedcuer,
        dropShipCollection:dropShipSlice
    }, 
    // middleware:getDefaultMiddlerware =>
    //   getDefaultMiddlerware().concat(logger),
    //   devTools:true
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>