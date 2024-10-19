import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import supplierReducer from './supplierSlice'
import categoryReducer from './categorySlice'
import productReducer from './productSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user: userReducer,
  supplier: supplierReducer,
  category:categoryReducer,
  product:productReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
