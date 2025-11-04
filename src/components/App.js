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
      <nav className="navbar-expand-lg">
        <h1 className="text-center">Shopping cart</h1>
      </nav>

      <h2>Products</h2>
      <div className="row">
        {products.map((p) => (
          <div key={p.id} className="col-4">
            <div className="custom-card card">
              <div className="card-body text-center">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">${p.price}</p>
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
          </div>
        ))}
      </div>

      <h2>Cart</h2>
      {cart.map((item) => (
        <div key={item.id} className="custom-card card">
          <div className="card-body">
            <h5>
              {item.name} - ${item.price} x {item.qty}
            </h5>
            <button className="btn" onClick={() => dispatch(increase(item.id))}>
              +
            </button>
            <button className="btn" onClick={() => dispatch(decrease(item.id))}>
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

      <h3>Total: ${finalTotal}</h3>

      <input id="coupon" placeholder="Enter coupon" className="form-control" />
      <button
        className="btn btn-success"
        onClick={() =>
          dispatch(applyCoupon(document.getElementById("coupon").value))
        }
      >
        Apply
      </button>

      <h2>Wishlist</h2>
      {wishlist.map((item) => (
        <div key={item.id} className="custom-card card">
          <div className="card-body">
            <h5>{item.name}</h5>
          </div>
        </div>
      ))}
    </div>
  );
}
