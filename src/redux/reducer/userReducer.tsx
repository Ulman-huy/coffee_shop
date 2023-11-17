import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMe } from "../../service/user";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const getMe = createAsyncThunk("user/getMe", async () => {
  const response = await fetchMe();
  return response;
});

export const {} = userReducer.actions;

export default userReducer.reducer;
