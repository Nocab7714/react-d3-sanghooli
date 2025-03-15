import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: null,
  title: "請設定標題",
  text: "",
  icon: "success",
  confirmText: "確定",
  confirmColor: "#3085d6", // 預設為 SweetAlert2 的藍色
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    createAlert(state, action){
      const {success, message} = action.payload
      state.show = true;
      state.title = message;
      state.icon = success ? "success" : "error"
    },
    removeAlert(state) {
      return initialState
    }
  }
})
export const { createAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer