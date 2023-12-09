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
    likeProduct: (state: any, action) => {
      state.data.like.push(action.payload._id);
    },
    dislikeProduct: (state: any, action) => {
      state.data.like = state.data.like.filter(
        (item: string) => item != action.payload._id
      );
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

export const { setUser, likeProduct, dislikeProduct } = userReducer.actions;

export default userReducer.reducer;
