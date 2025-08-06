
import React, { useState, useMemo } from "react";
import "./OrderManagement.css";
import ProductModal from "./ProductModel"; // double‑check filename spelling

const showOffer = (v) =>
  (v == null || v === 0 ? "—" : (typeof v === "number" ? `${v}% off` : String(v)));

export default function OrderCard({ order, onCancel }) {
  const [showModal, setShowModal] = useState(false);

  const {
    id = "N/A",
    date = "N/A",
    items = [],
    total = 0,
    status = "Pending",
    isCancelable = false,
  } = order || {};

  // Format offer nicely even if it’s a number
  const formatOffer = (val) => {
    if (val == null || val === "" || Number(val) === 0) return null;
    return typeof val === "number" ? `${val}% off` : String(val);
  };

  return (
    <div className={`order-card ${String(status).toLowerCase().replace(/\s/g, "-")}`}>
      <div className="order-header">
        <h4>Order ID: {id}</h4>
        <span>{date}</span>
      </div>

      {/* Items (with description + offer) */}
      <div className="order-items">
        <strong>Items:</strong>
        <ul className="items-list">
          {items.map((item, index) => {
            const desc = item.description || item.desc;
            const offer = formatOffer(item.offer || item.promo || item.discountPercent);
            const pack = item.packSize || item.quantity; // e.g., "1kg" (display only)
            return (
              <li key={index} className="item-row">
                <div className="item-line">
                  <span className="item-name">{item.name}</span>
                  {pack ? <span className="item-pack"> · {pack}</span> : null}
                </div>
                {desc ? <div className="item-desc">{desc}</div> : null}
                {offer ? <div className="item-offer">Offer: {offer}</div> : null}
              </li>
            );
          })}
        </ul>
      </div>

      <p><strong>Total:</strong> ₹{total}</p>
      <p>
        <strong>Status:</strong>{" "}
        <span className="status">{status}</span>
      </p>

      {isCancelable && status !== "Cancelled" && (
        <button className="cancel-btn" onClick={() => onCancel(id)}>
          Cancel Order
        </button>
      )}

      <button className="view-btn" onClick={() => setShowModal(true)}>
        View All
      </button>

      {showModal && (
        <ProductModal order={order} onClose={() => setShowModal(false)} />
      )}

      {status === "Delivered" && (
        <button
          className="feedback-btn"
          onClick={() => alert("Redirect to feedback page")}
        >
          Give Feedback
        </button>
      )}
    </div>
  );
}
