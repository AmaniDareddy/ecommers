import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../Context/StoreContext";

export default function Cart() {
  const {
    state: { cart },
    dispatch,
  } = useStore();

  const navigate = useNavigate();

  const handleQtyChange = (id, qty) => {
    dispatch({ type: "UPDATE_QTY", payload: { id, qty: parseInt(qty) } });
  };

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);
  
  return (
    <div className="cart-table">
      <h2 className="page-title">Your Cart</h2>
      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>Your cart is empty.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Image</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img src={item.image || item.img} alt={item.name} width="50" height="50" style={{ borderRadius: "6px" }} />
                    <div>
                      <strong>{item.name}</strong>
                      <p style={{ margin: 0, fontSize: "12px", color: "#555" }}>{item.description}</p>
                    </div>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.qty}
                      min="1"
                      onChange={(e) => handleQtyChange(item.name, e.target.value)}
                    />
                  </td>
                  <td>₹{item.qty * item.price}</td>
                  <td>
                    <button
                      className="link-btn"
                      onClick={() =>
                        dispatch({ type: "REMOVE_FROM_CART", payload: item.name })
                      }
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>
            <button className="primary" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
