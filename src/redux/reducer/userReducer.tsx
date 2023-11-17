import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const userReducer = createSlice({
  name: "user",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {},
});

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (token) => {
    
  }
);

export const {} = userReducer.actions;

export default userReducer.reducer;
