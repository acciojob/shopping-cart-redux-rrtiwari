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
import "../styles/App.css";

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
    <div className="container">
      <nav className="navbar-expand-lg">
        <div className="text-center">
          <h1>Shopping Cart</h1>
        </div>
      </nav>

      <div>
        <h3>Products</h3>
        {products.map((p) => (
          <div key={p.id} className="custom-card card mb-2">
            <div className="card-body">
              <h4>
                {p.name} - ${p.price}
              </h4>
              <button
                className="btn btn-primary me-2"
                onClick={() => dispatch(addToCart(p))}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => dispatch(toggleWishlist(p))}
              >
                {wishlist.find((w) => w.id === p.id)
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3>Cart</h3>
        {cart.map((item) => (
          <div key={item.id} className="custom-card card mb-2">
            <div className="card-body">
              <h4>
                {item.name} - ${item.price} x {item.qty}
              </h4>
              <button
                className="btn btn-success me-2"
                onClick={() => dispatch(increase(item.id))}
              >
                +
              </button>
              <button
                className="btn btn-warning me-2"
                onClick={() => dispatch(decrease(item.id))}
              >
                -
              </button>
              <button
                className="btn btn-danger"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <h3>Total: ${finalTotal}</h3>
      <input
        className="form-control mb-2"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter coupon"
      />
      <button
        className="btn btn-dark mb-3"
        onClick={() => dispatch(applyCoupon(code))}
      >
        Apply
      </button>

      <div>
        <h3>Wishlist</h3>
        {wishlist.map((item) => (
          <div key={item.id} className="custom-card card mb-2">
            <div className="card-body">
              <h4>{item.name}</h4>
              <button
                className="btn btn-secondary"
                onClick={() => dispatch(toggleWishlist(item))}
              >
                Remove from Wishlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
