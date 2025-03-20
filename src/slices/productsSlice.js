import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { asyncSetLoading } from './loadingSlice';

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
    // 更新後 (篩選條件)
    setFilteredProductsData: (state, action) => {
      state.filteredProductsData = action.payload;
    },
    // 清除篩選條件
    clearFilters: (state) => {
      state.filteredProductsData = {
        festival: '',
        relation: '',
        category: '',
        priceRange: '',
        searchValue: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload; // 更新 Redux state
      })
      .addCase(getProducts.rejected, (state, action) => {
        console.error('API 請求失敗:', action.payload);
      });
  },
});

export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (payload, { dispatch, rejectWithValue }) => {
    dispatch(asyncSetLoading(['globalLoading', true]));
    try {
      const res = await axios.get(`${baseUrl}/api/${apiPath}/products/all`);
      return res.data.products; // 回傳全部商品資料
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message); // 回傳取得產品失敗資訊
    } finally {
      dispatch(asyncSetLoading(['globalLoading', false]));
    }
  }
);

export const { setFilteredProductsData, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
