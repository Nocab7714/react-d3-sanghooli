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
    setFilteredProductsData: (state, action) => {
      state.filteredProductsData = action.payload;
      console.log('Redux state 更新後 (篩選條件):', state.filteredProductsData);
    },
    clearFilters: (state) => {
      state.filteredProductsData = {
        festival: '',
        relation: '',
        category: '',
        priceRange: '',
        searchValue: '',
      }; // 清空篩選條件
      console.log('Redux state 已清除篩選條件:', state.filteredProductsData);
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
      alert('取得產品失敗');
      return rejectWithValue(error.response?.data || error.message);
    } finally {
      dispatch(asyncSetLoading(['globalLoading', false]));
    }
  }
);

export const { setFilteredProductsData, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
