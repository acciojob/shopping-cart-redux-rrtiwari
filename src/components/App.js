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
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <h1 className="text-center w-100">Shopping Cart</h1>
      </nav>

      <div className="app-main">
        <div className="block-top">
          <h3>Products</h3>

          <div className="row product-list">
            {products.map((p) => (
              <div key={p.id} className="col-md-4 mb-3">
                <div className="custom-card card">
                  <div className="card-body text-center">
                    <h4>{p.name}</h4>
                    <p>${p.price}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => dispatch(addToCart(p))}
                      data-testid={`add-${p.id}`}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="wishlist-action ms-2"
                      onClick={() => dispatch(toggleWishlist(p))}
                      data-testid={`wish-${p.id}`}
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
        </div>

        <div className="block-middle mt-4">
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
                    ${item.price} x {item.qty}
                  </p>

                  <button
                    className="btn btn-success me-2"
                    data-testid={`increase-${item.id}`}
                    onClick={() => dispatch(increase(item.id))}
                  >
                    +
                  </button>

                  <button
                    className="qty-action me-2"
                    data-testid={`decrease-${item.id}`}
                    onClick={() => dispatch(decrease(item.id))}
                  >
                    -
                  </button>

                  <button
                    className="remove-action"
                    data-testid={`remove-${item.id}`}
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="total-box mt-3">
            <h3>Total: ${finalTotal}</h3>
          </div>

          <div className="coupon-wrap mt-3" style={{ maxWidth: 380 }}>
            <input
              id="coupon"
              className="form-control mb-2"
              placeholder="Enter coupon"
            />
            <button
              className="apply-btn btn-dark w-100"
              onClick={() =>
                dispatch(applyCoupon(document.getElementById("coupon").value))
              }
            >
              Apply
            </button>
          </div>
        </div>

        <div className="block-bottom mt-4">
          <h3>Wishlist</h3>

          <div className="wishlist-list">
            {wishlist.length === 0 && (
              <div className="custom-card card mb-2">
                <div className="card-body text-center">
                  <h4>Wishlist empty</h4>
                </div>
              </div>
            )}

            {wishlist.map((item) => (
              <div key={item.id} className="custom-card card mb-2">
                <div className="card-body text-center">
                  <h4>{item.name}</h4>
                  <button
                    className="wishlist-remove"
                    data-testid={`wish-remove-${item.id}`}
                    onClick={() => dispatch(toggleWishlist(item))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
