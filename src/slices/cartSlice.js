import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { setGlobalLoading } from "./loadingSlice";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


const asyncGetCart = createAsyncThunk(
  'cart/asyncGetCart',
  async function({ skipGlobalLoading = false } = {}, { dispatch }){
    if(!skipGlobalLoading) dispatch(setGlobalLoading(true))
    try {
      const url = `${BASE_URL}/api/${API_PATH}/cart`;
      const response = await axios.get(url);      
      return response.data.data
    } catch (error) {
      // dispatch(createAsyncMessage(error.response.data)) // {success: false, message: '您所查看的API不存在 >_<'}
      console.dir(error)
    } finally{
      if(!skipGlobalLoading) dispatch(setGlobalLoading(false))
    }
  }
)

const asyncAddCart = createAsyncThunk(
  'cart/asyncAddCart',
  async function(payload, { dispatch }){
    const { productId, qty } = payload;
    // setIsLoadingScreen(true);
    try {
      const url = `${BASE_URL}/api/${API_PATH}/cart`;
      const data = {
        "data": {
          "product_id": productId,
          "qty": qty
        }
      }
      await axios.post(url, data);
      dispatch(asyncGetCart());
    } catch (error) {
      // dispatch(createAsyncMessage(error.response.data))
      console.dir(error)
    } finally {
      // setIsLoadingScreen(false)
    }
  }
)

const initialState = {
  carts: null,
  total: 0,
  final_total: 0,
  basketQty: 0,
  cartCategories: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetCart.fulfilled, (state, action) => {
        const { carts, total, final_total } = action.payload;
        state.carts = carts;
        state.total = total;
        state.final_total = final_total;
        state.basketQty = carts.reduce((sum, item) => sum + item.qty, 0);
        state.cartCategories = [...new Set(carts.map((cart) => cart.product.category))];
      })
  }
})
export { asyncGetCart, asyncAddCart };
export const { updateCartData } = cartSlice.actions;
export default cartSlice.reducer;