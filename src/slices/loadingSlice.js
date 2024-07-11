import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: 'loading',
  initialState: false,
  reducers: {
    startSpinner: (state) => true,
    stopSpinner: (state) => false,
  }
})

export const { startSpinner, stopSpinner } = loadingSlice.actions;
export default loadingSlice.reducer