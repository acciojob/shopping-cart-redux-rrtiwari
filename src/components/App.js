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
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="text-center">Shopping Cart</div>
      </nav>

      <div className="main-area">
        <div className="products-block">
          <h3>All Products</h3>

          <div className="product-list">
            {products.map((p, idx) => (
              <div key={p.id} className="custom-card card mb-3">
                <div className="card-body text-center">
                  <h4>{p.name}</h4>
                  <p>
                    <strong>${p.price}</strong>
                  </p>

                  <button
                    className="btn btn-primary"
                    data-testid={`add-${idx}`}
                    onClick={() => dispatch(addToCart(p))}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="btn btn-outline-secondary ml-2"
                    data-testid={`wish-${idx}`}
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
            ))}
          </div>
        </div>

        <div className="cart-block mt-4">
          <h3>Cart</h3>

          <div className="cart-list">
            {cart.length === 0 && (
              <div className="custom-card card mb-2">
                <div className="card-body text-center">
                  <h4>No items in cart</h4>
                </div>
              </div>
            )}

            {cart.map((item) => (
              <div key={item.id} className="custom-card card mb-2">
                <div className="card-body text-center">
                  <h4>{item.name}</h4>
                  <p>
                    ${item.price} <strong>{item.qty}</strong>
                  </p>

                  <div
                    className="input-group"
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    <input
                      type="text"
                      className="form-control"
                      readOnly
                      value={item.qty}
                      style={{ width: 60, textAlign: "center" }}
                      data-testid={`qty-${item.id}`}
                    />
                    <div
                      className="input-group-append"
                      style={{ display: "inline-flex", marginLeft: 8 }}
                    >
                      <button
                        className="btn"
                        onClick={() => dispatch(increase(item.id))}
                        data-testid={`inc-${item.id}`}
                        style={{ marginRight: 6 }}
                      >
                        +
                      </button>
                      <button
                        className="btn"
                        onClick={() => dispatch(decrease(item.id))}
                        data-testid={`dec-${item.id}`}
                      >
                        -
                      </button>
                    </div>
                  </div>

                  <button
                    className="btn btn-danger ml-2"
                    onClick={() => dispatch(removeFromCart(item.id))}
                    data-testid={`remove-${item.id}`}
                    style={{ marginLeft: 12 }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3>Total: ${finalTotal}</h3>

          <div className="coupon-wrap mt-3" style={{ maxWidth: 380 }}>
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
                    dispatch(
                      applyCoupon(document.getElementById("coupon").value)
                    )
                  }
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="wishlist-block mt-4">
          <h3>Wishlist</h3>

          <div className="wishlist-list">
            {wishlist.length === 0 ? (
              <div className="custom-card card mb-2">
                <div className="card-body text-center">
                  <h4>Wishlist empty</h4>
                </div>
              </div>
            ) : (
              wishlist.map((item) => (
                <div key={item.id} className="custom-card card mb-2">
                  <div className="card-body text-center">
                    <h4>{item.name}</h4>
                    <button
                      className="btn btn-secondary ml-2"
                      onClick={() => dispatch(toggleWishlist(item))}
                    >
                      <span className="MuiButton-label">Remove</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
