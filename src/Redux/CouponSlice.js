import { createSlice } from "@reduxjs/toolkit";

const CouponSlice = createSlice({
  name: "coupon",
  initialState: 0,
  reducers: {
    applyCoupon(state, action) {
      if (action.payload === "DISCOUNT10") return 10;
      if (action.payload === "DISCOUNT20") return 20;
      return 0;
    },
  },
});

export const { applyCoupon } = CouponSlice.actions;
export default CouponSlice.reducer;
