import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { asyncSetLoading } from "./loadingSlice";
import { createToast } from "./toastSlice";

// 環境變數
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;


const asyncGetCart = createAsyncThunk(
  'cart/asyncGetCart',
  async function({ skipSectionLoading = true } = {}, { dispatch }){
    if(!skipSectionLoading) dispatch(asyncSetLoading(['sectionLoading', true]));
    
    try {
      const url = `${BASE_URL}/api/${API_PATH}/cart`;
      const response = await axios.get(url);      
      return response.data.data
    } catch (error) {
      console.dir(error)
    } finally{
      if(!skipSectionLoading) dispatch(asyncSetLoading(['sectionLoading', false]));
    }
  }
)

const asyncAddCart = createAsyncThunk(
  'cart/asyncAddCart',
  async function(payload, { dispatch }){
    const { productId, qty } = payload;
    dispatch(asyncSetLoading(['sectionLoading', true]))
    try {
      const url = `${BASE_URL}/api/${API_PATH}/cart`;
      const data = {
        "data": {
          "product_id": productId,
          "qty": Number(qty)
        }
      }
      const response = await axios.post(url, data)
      dispatch(createToast(response.data))
      dispatch(asyncGetCart());
    } catch (error) {
      const { success, message} = error.response.data;
      dispatch(createToast({ success, message: `加入購物車失敗！${message}`}))
    } finally {
      dispatch(asyncSetLoading(['sectionLoading', false]))
    }
  }
)

const initialState = {
  carts: null,
  total: 0,
  final_total: 0,
  basketQty: 0,
  cartCategories: [],
  coupon: ""
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
        state.coupon = carts.find(cart => cart.coupon)?.coupon.code ?? "";
      })
  }
})
export { asyncGetCart, asyncAddCart };
export const { updateCartData } = cartSlice.actions;
export default cartSlice.reducer;