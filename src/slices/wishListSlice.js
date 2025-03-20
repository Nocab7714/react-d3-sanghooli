import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createToast } from './toastSlice';

const loadWishList = () => {
  const savedWishList = JSON.parse(localStorage.getItem('wishList'));
  return savedWishList || {};
};

const initialState = loadWishList();

const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    toggleWishList(state, action) {
      const productId = action.payload;
      state[productId] = !state[productId]; // 切換 true/ false
      // 寫入 localStorage
      localStorage.setItem('wishList', JSON.stringify(state));
    },
  },
});
const asyncToggleWishList = createAsyncThunk(
  'wishList/asyncToggleWishList',
  async function (payload, { getState, dispatch, requestId }) {
    try {
      const wishList = getState().wishList;
      dispatch(toggleWishList(payload));
      dispatch(
        createToast({
          success: true,
          message: wishList[payload]
            ? '成功將商品移除願望清單'
            : '成功將商品加入願望清單',
        })
      );
    } catch (error) {
      dispatch(createToast({ success: false, message: '願望清單操作失敗' }));
    }
  }
);
export { asyncToggleWishList };
export const { toggleWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
