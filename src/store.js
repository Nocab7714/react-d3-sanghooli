import { configureStore } from "@reduxjs/toolkit";
import productsSlice from './slices/productsSlice';
import cartReducer from "./slices/cartSlice";
import loadingReducer from "./slices/loadingSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartReducer,
    loading: loadingReducer,
  },
});
