import { configureStore } from '@reduxjs/toolkit';

import productsSlice from './slices/ProductsSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice,
  },
});
