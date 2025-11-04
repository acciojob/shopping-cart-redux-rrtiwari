import React from "react";
import "./../styles/App.css";
import { useDispatch, useSelector } from "react-redux";
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
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const discount = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const finalTotal = total - (total * discount) / 100;

  return (
    <div className="container">
      <h1>Shopping App</h1>

      <h2 className="section-title">Products</h2>
      <div className="list">
        {products.map((p) => (
          <div className="row" key={p.id}>
            <span>
              {p.name} - ${p.price}
            </span>
            <div className="buttons">
              <button onClick={() => dispatch(addToCart(p))}>
                Add to Cart
              </button>
              <button onClick={() => dispatch(toggleWishlist(p))}>
                {wishlist.find((i) => i.id === p.id)
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="section-title">Cart</h2>
      <div className="cart">
        {cart.map((item) => (
          <div className="row" key={item.id}>
            <span>
              {item.name} - ${item.price} x {item.qty}
            </span>
            <div className="buttons">
              <button
                className="quantity-btn"
                onClick={() => dispatch(increase(item.id))}
              >
                +
              </button>
              <button
                className="quantity-btn"
                onClick={() => dispatch(decrease(item.id))}
              >
                -
              </button>
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="total-box">Total: ${finalTotal}</div>

      <input id="coupon" placeholder="Enter coupon" />
      <button
        onClick={() =>
          dispatch(applyCoupon(document.getElementById("coupon").value))
        }
      >
        Apply
      </button>

      <h2 className="section-title">Wishlist</h2>
      <div className="wishlist">
        {wishlist.map((item) => (
          <div className="row" key={item.id}>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
