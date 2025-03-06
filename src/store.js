import { configureStore } from '@reduxjs/toolkit';
import productsSlice from './slice/productsSlice';
import cartReducer from './slice/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartReducer,
  },
});
