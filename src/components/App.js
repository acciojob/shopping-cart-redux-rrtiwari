import React from "react";
import "./../styles/App.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, increase, decrease } from "../Redux/CartSlice";
import { toggleWishlist } from "../Redux/WishlistSlice";
import { applyCoupon } from "../Redux/CouponSlice";

const products = [
  { id: 1, name: "Shoes", price: 100 },
  { id: 2, name: "Shirt", price: 50 },
  { id: 3, name: "Bag", price: 80 }
];

export default function App() {
  const cart = useSelector(state => state.cart);
  const wishlist = useSelector(state => state.wishlist);
  const discount = useSelector(state => state.coupon);
  const dispatch = useDispatch();

  const total = cart.reduce((a, b) => a + b.price * b.qty, 0);
  const finalTotal = total - (total * discount) / 100;

  return (
    <div>
      <h1>Shopping App</h1>

      <h2>Products</h2>
      {products.map((p, idx) => (
        <div key={p.id}>
          {p.name} - ${p.price}
          <button data-testid={`add-${idx}`} onClick={() => dispatch(addToCart(p))}>
            Add to Cart
          </button>
          <button data-testid={`wish-${idx}`} onClick={() => dispatch(toggleWishlist(p))}>
            {wishlist.find(i => i.id === p.id) ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      ))}

      <h2>Cart</h2>
      {cart.map(item => (
        <div key={item.id}>
          {item.name} - ${item.price} x {item.qty}
          <button data-testid={`inc-${item.id}`} onClick={() => dispatch(increase(item.id))}>+</button>
          <button data-testid={`dec-${item.id}`} onClick={() => dispatch(decrease(item.id))}>-</button>
          <button data-testid={`remove-${item.id}`} onClick={() => dispatch(removeFromCart(item.id))}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ${finalTotal}</h3>

      <input id="coupon" placeholder="Enter coupon" />
      <button onClick={() => dispatch(applyCoupon(document.getElementById("coupon").value))}>
        Apply
      </button>

      <h2>Wishlists</h2>
      {wishlist.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}



