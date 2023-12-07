import { createAction, createSlice } from "@reduxjs/toolkit";

type CartItem = {
  product_id: string;
  quantity: number;
};

export const addCart = createAction<CartItem>("cart/addCart");

export const cartReducer = createSlice({
  name: "setting",
  initialState: {
    cart: [],
  },
  reducers: {
    initCart(state, action) {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCart, (state: any, action: any) => {
      const productExist = state.cart.find(
        (item: { product_id: string }) =>
          item.product_id === action.payload.product_id
      );

      if (!productExist) {
        state.cart.push(action.payload);
      } else {
        state.cart = state.cart.map(
          (item: { product_id: string; quantity: number }) => {
            if (item.product_id === action.payload.product_id) {
              return {
                ...item,
                quantity: item.quantity + action.payload.quantity,
              };
            }
            return item;
          }
        );
      }
    });
  },
});
export const { initCart } = cartReducer.actions;
export default cartReducer.reducer;
