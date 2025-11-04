import { createSlice } from "@reduxjs/toolkit";

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    toggleWishlist(state, action) {
      const item = state.find(i => i.id === action.payload.id);
      if (item) return state.filter(i => i.id !== action.payload.id);
      state.push(action.payload);
    }
  }
});

export const { toggleWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;
