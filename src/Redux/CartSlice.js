import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart(state, action) {
      const item = state.find((i) => i.id === action.payload.id);
      if (item) item.qty++;
      else state.push({ ...action.payload, qty: 1 });
    },
    removeFromCart(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
    increase(state, action) {
      const item = state.find((i) => i.id === action.payload);
      if (item) item.qty++;
    },
    decrease(state, action) {
      const item = state.find((i) => i.id === action.payload);
      if (item && item.qty > 1) item.qty--;
    },
  },
});

export const { addToCart, removeFromCart, increase, decrease } =
  CartSlice.actions;
export default CartSlice.reducer;
