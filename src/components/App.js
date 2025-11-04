import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const discount = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const finalTotal = total - (total * discount) / 100;

  return (
    <div className="container">
      <h1 className="text-center">Shopping Cart</h1>

      <h2 className="text-center">Products</h2>
      <div className="row">
        {products.map((p) => (
          <div key={p.id} className="col-12 custom-card card">
            <div className="card-body text-center">
              <h4>{p.name}</h4>
              <p>${p.price}</p>
              <button
                className="btn btn-primary"
                onClick={() => dispatch(addToCart(p))}
              >
                Add to Cart
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => dispatch(toggleWishlist(p))}
              >
                {wishlist.find((i) => i.id === p.id)
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-center">Cart</h2>
      <div className="row">
        {cart.map((item) => (
          <div key={item.id} className="col-12 custom-card card">
            <div className="card-body text-center">
              <h4>{item.name}</h4>
              <p>
                ${item.price} x {item.qty}
              </p>
              <button
                className="btn btn-success"
                onClick={() => dispatch(increase(item.id))}
              >
                +
              </button>
              <button
                className="btn btn-warning"
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

      <h3 className="text-center">Total: ${finalTotal}</h3>

      <input id="coupon" className="form-control" placeholder="Enter coupon" />
      <button
        className="btn btn-info w-100"
        onClick={() =>
          dispatch(applyCoupon(document.getElementById("coupon").value))
        }
      >
        Apply
      </button>

      <h2 className="text-center">Wishlist</h2>
      <div className="row">
        {wishlist.map((item) => (
          <div key={item.id} className="col-12 custom-card card">
            <div className="card-body text-center">
              <h4>{item.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
