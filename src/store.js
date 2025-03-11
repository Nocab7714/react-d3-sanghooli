import { configureStore } from "@reduxjs/toolkit";
import productsSlice from './slices/productsSlice';
import cartReducer from "./slices/cartSlice";
import loadingReducer from "./slices/loadingSlice";
import wishListReducer from "./slices/wishListSlice";
import alertReducer from "./slices/alertSlice";
import toastReducer from "./slices/toastSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartReducer,
    loading: loadingReducer,
    wishList: wishListReducer,
    alert: alertReducer,
    toast: toastReducer,
  },
});
