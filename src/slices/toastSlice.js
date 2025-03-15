import { createSlice } from "@reduxjs/toolkit";

// show = false, title = "請設定 Toast 的標題", icon = "success", onClose }

const initialState = {
  id: Date.now(),
  show: false,
  title: "請設定 Toast 的標題",
  icon: "success",
}
const toastSlice = createSlice({
  name: 'toast',
  initialState,   
  reducers: {
    createToast(state, action){
      const {success, message} = action.payload;
      state.id = Date.now();
      state.show = true;
      state.title = message;
      state.icon = success ? 'success' : 'error'
    },
    resetToast(state){
      state.show = false;
    }
  }
})
export const { createToast, resetToast } = toastSlice.actions;
export default toastSlice.reducer;