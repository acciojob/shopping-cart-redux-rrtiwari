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
                  <p><strong>${p.price}</strong></p>

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
                    {wishlist.find((i) => i.id === p.id)
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-block mt-4">
          <h3>Cart</h3>
          {cart.length === 0 && <h4>No items in cart</h4>}

          {cart.map((item) => (
            <div key={item.id} className="custom-card card mb-2">
              <div className="card-body text-center">
                <h4>{item.name}</h4>
                <p>${item.price}</p>

                <input
                  readOnly
                  value={item.qty}
                  data-testid={`qty-${item.id}`}
                  className="form-control"
                  style={{ width: 60, margin: "0 auto" }}
                />

                <button
                  className="btn btn-success m-1"
                  data-testid={`inc-${item.id}`}
                  onClick={() => dispatch(increase(item.id))}
                >
                  +
                </button>

                <button
                  className="btn btn-warning m-1"
                  data-testid={`dec-${item.id}`}
                  onClick={() => dispatch(decrease(item.id))}
                >
                  -
                </button>

                <button
                  className="btn btn-danger m-1"
                  data-testid={`remove-${item.id}`}
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <h3>Total: ${finalTotal}</h3>

          <input id="coupon" className="form-control" placeholder="Enter coupon" />
          <button
            className="btn btn-dark mt-2"
            onClick={() =>
              dispatch(applyCoupon(document.getElementById("coupon").value))
            }
          >
            Apply
          </button>
        </div>

        <div className="wishlist-block mt-4">
          <h3>Wishlist</h3>
          {wishlist.length === 0 && <h4>Wishlist empty</h4>}

          {wishlist.map((item) => (
            <div key={item.id} className="custom-card card mb-2">
              <div className="card-body text-center">
                <h4>{item.name}</h4>
                <button
                  className="btn btn-secondary"
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
  );
}



