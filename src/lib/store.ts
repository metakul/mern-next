import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import authReducer from "./slices/authSlice"
import NftCollectionReducer from "./slices/MetakulCollection/NftSlice"
import blogCollectionReducer from "./slices/Blogs/BlogSlice"
import cryptoCollectionRedcuer from "./slices/CryptoSlices/CryptoSlice"

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth:authReducer,
        nftCollection:NftCollectionReducer,
        blogsCollection:blogCollectionReducer,
        cryptoCollection:cryptoCollectionRedcuer
        
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