import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const { VITE_BASE_URL: baseUrl, VITE_API_PATH: apiPath } = import.meta.env;

export const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [], // 存放 API 取得的產品資料
    filteredProductsData: {
      festival: '',
      relation: '',
      category: '',
      priceRange: '',
      searchValue: '',
    }, // 存放篩選條件
  },
  reducers: {
    setFilteredProductsData: (state, action) => {
      state.filteredProductsData = action.payload;
      console.log('Redux state 更新後 (篩選條件):', state.filteredProductsData);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        console.log('Redux state 更新前:', state.products); // 測試 Redux state 更新前
        state.products = action.payload; // 更新 Redux state
        console.log('Redux state 更新後:', state.products); //  測試 Redux state 更新後
      })
      .addCase(getProducts.rejected, (state, action) => {
        console.error('API 請求失敗:', action.payload);
      });
  },
});

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseUrl}/api/${apiPath}/products/all`);
      // console.log('API 回傳的商品資料:', res.data.products);
      return res.data.products;
    } catch (error) {
      alert('取得產品失敗');
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const { setFilteredProductsData } = productsSlice.actions;
export default productsSlice.reducer;
