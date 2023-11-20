import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET } from "../../service";

export const userReducer = createSlice({
  name: "user",
  initialState: {
    data: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const getMe = createAsyncThunk("user/getMe", async (token: string) => {
  const response = await GET({
    url: "user/me",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response;
});

export const { setUser } = userReducer.actions;

export default userReducer.reducer;
