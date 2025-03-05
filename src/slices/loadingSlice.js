import { createSlice } from "@reduxjs/toolkit";

const  loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    globalLoading: false,
    actionLoading: false,
  },
  reducers: {
    setGlobalLoading(state, action) {
      state.globalLoading = action.payload
    },
    setActionLoading(state, action) {
      state.actionLoading = action.payload
    },
  }
})
export const { setGlobalLoading, setActionLoading } = loadingSlice.actions;
export default loadingSlice.reducer;