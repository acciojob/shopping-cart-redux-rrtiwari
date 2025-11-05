
import React from "react";
import "../styles/App.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increase,
  decrease,
} from "../Redux/CartSlice";
import { toggleWishlist } from "../Redux/WishlistSlice";

const products = [
  { id: 1, name: "Shoes", price: 100 },
  { id: 2, name: "Shirt", price: 50 },
  { id: 3, name: "Bag", price: 80 },
];

export default function App() {
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="container">

      <h1 className="text-center w-100">Shopping Cart</h1>

      <h2>Products</h2>
      <div className="row">
        {products.map((p) => (
          <div key={p.id} className="col-4 mb-3">
            <div className="custom-card card">
              <div className="card-body">
                <h4>{p.name} - ${p.price}</h4>
                <button
                  className="btn btn-primary"
                  onClick={() => dispatch(addToCart(p))}
                >
                  Add to Cart
                </button>

                <button
                  className="btn btn-secondary ms-2"
                  onClick={() => dispatch(toggleWishlist(p))}
                >
                  {wishlist.find((w) => w.id === p.id)
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Cart</h2>
      <div className="row">
        {cart.map((item) => (
          <div key={item.id} className="col-4 mb-3">
            <div className="custom-card card">
              <div className="card-body">
                <h4>
                  {item.name} - ${item.price} x {item.qty}
                </h4>

                <button
                  className="btn btn-success"
                  onClick={() => dispatch(increase(item.id))}
                >
                  +
                </button>

                <button
                  className="btn btn-warning ms-2"
                  onClick={() => dispatch(decrease(item.id))}
                >
                  -
                </button>

                <button
                  className="btn btn-danger ms-2"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Wishlist</h2>
      <div className="row">
        {wishlist.map((item) => (
          <div key={item.id} className="col-4 mb-3">
            <div className="custom-card card">
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
          </div>
        ))}
      </div>

    </div>
  );
}


