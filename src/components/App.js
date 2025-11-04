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
    <div className="app-wrapper">
      <h2 className="text-center">Shopping Cart</h2>

      {/* Products */}
      <div className="products-block">
        <h3>All Products</h3>
        <div className="row product-list">
          {products.map((p, index) => (
            <div key={p.id} className="col-md-4 mb-3">
              <div className="custom-card card">
                <div className="card-body text-center">
                  <h4>{p.name}</h4>
                  <p>${p.price}</p>

                  <button
                    className="btn btn-primary"
                    data-testid={`add-${index}`}
                    onClick={() => dispatch(addToCart(p))}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="ml-2 wishlist-btn"
                    data-testid={`wish-${index}`}
                    onClick={() => dispatch(toggleWishlist(p))}
                  >
                    <span className="MuiButton-label">
                      {wishlist.find((i) => i.id === p.id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="cart-block mt-4">
        <h3>Cart</h3>
        {cart.map((item) => (
          <div key={item.id} className="cart-item mb-2">
            <span>
              {item.name} - ${item.price}
            </span>

            <div className="input-group-append">
              <button
                className="btn"
                onClick={() => dispatch(increase(item.id))}
              >
                +
              </button>
              <span className="mx-2">{item.qty}</span>
              <button
                className="btn"
                onClick={() => dispatch(decrease(item.id))}
              >
                -
              </button>
            </div>

            <button
              className="btn btn-danger ml-2"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </div>
        ))}

        <h3>Total: ${finalTotal}</h3>

        <div className="coupon-wrap mt-3" style={{ maxWidth: "380px" }}>
          <div className="input-group">
            <input
              id="coupon"
              className="form-control"
              placeholder="Enter coupon"
            />
            <div className="input-group-append">
              <button
                className="btn btn-dark"
                onClick={() =>
                  dispatch(applyCoupon(document.getElementById("coupon").value))
                }
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist */}
      <div className="wishlist-block mt-4">
        <h3>Wishlist</h3>
        <div className="wishlist-list">
          {wishlist.length === 0 ? (
            <h4>Wishlist empty</h4>
          ) : (
            wishlist.map((item) => (
              <div key={item.id} className="custom-card card mb-2">
                <div className="card-body text-center">
                  <h4>{item.name}</h4>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
