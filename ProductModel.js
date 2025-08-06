
import React from "react";
import "./ProductModel.css";

const OrderModal = ({ order, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>🛍 Order #{order.id}</h3>
        <p>Status: {order.status}</p>
        <p>Date: {order.date}</p>

        <div className="modal-items">
          {order.items.map((item, index) => (
            <div key={index} className="order-item">
              <img src={item.image || item.img} alt={item.name} className="item-image" />
              <h4>{item.name}</h4>
              {/* <p>{item.description || "No description available"}</p> */}
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
            </div>
          ))}
        </div>

        <p><strong>Total: ₹{order.total}</strong></p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default OrderModal;
