import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increase,
  decrease,
} from "../Redux/CartSlice";
import { toggleWishlist } from "../Redux/WishlistSlice";
import { applyCoupon } from "../Redux/CouponSlice";

const products = [
  { id: 1, name: "Shoes", price: 100 },
  { id: 2, name: "Shirt", price: 50 },
  { id: 3, name: "Bag", price: 80 },
];

export default function App() {
  const cart = useSelector((s) => s.cart);
  const wishlist = useSelector((s) => s.wishlist);
  const discount = useSelector((s) => s.coupon);
  const dispatch = useDispatch();
  const [code, setCode] = useState("");

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const finalTotal = total - (total * discount) / 100;

  return (
    <div>
      <h1>Shopping Cart</h1>

      <h3>Products</h3>
      {products.map((p) => (
        <div key={p.id}>
          <span>
            {p.name} - ${p.price}
          </span>
          <button onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
          <button onClick={() => dispatch(toggleWishlist(p))}>
            {wishlist.find((w) => w.id === p.id)
              ? "Remove from Wishlist"
              : "Add to Wishlist"}
          </button>
        </div>
      ))}

      <h3>Cart</h3>
      {cart.map((item) => (
        <div key={item.id}>
          <span>
            {item.name} - ${item.price} x {item.qty}
          </span>
          <button onClick={() => dispatch(increase(item.id))}>+</button>
          <button onClick={() => dispatch(decrease(item.id))}>-</button>
          <button onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ${finalTotal}</h3>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter coupon"
      />
      <button onClick={() => dispatch(applyCoupon(code))}>Apply</button>

      <h3>Wishlist</h3>
      {wishlist.map((item) => (
        <div key={item.id}>
          <span>{item.name}</span>
          <button onClick={() => dispatch(toggleWishlist(item))}>
            Remove from Wishlist
          </button>
        </div>
      ))}
    </div>
  );
}
