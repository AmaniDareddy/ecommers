
import React, { useState } from "react";
import OrderCard from "./OrderCard";
import "./OrderManagement.css";
import { useOrders } from "../Context/OrderContext";
import ProductModel from "./ProductModel"; // create this next
import InvoiceModal from "./InvoiceModal";

export default function OrderManagement() {
  const { orders, setOrders } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  const handleCancel = (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, status: "Cancelled", isCancelable: false }
            : order
        )
      );
    }
  };
  
  const handleReturn = (order) => {
    if (window.confirm("Are you sure you want to return this order?")) {
      alert("Return Requested for " + order.id);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all orders?")) {
      setOrders([]);
    }
  };

  const validOrders = orders?.filter(
    (order) => Array.isArray(order.items) && order.items.length > 0 && order.total > 0
  );
  return (
    <div className="order-section">
      <h2>📦 My Orders</h2>

      {/* Clear All Orders Button */}
      {validOrders.length > 0 && (
        <button className="clear-all-button" onClick={handleClearAll}>
          🗑️ Clear All Orders
        </button>
      )}

      {validOrders.length > 0 ? (
        validOrders.map((order) => (
          <div key={order.id} className="order-block">
            <OrderCard order={order} onCancel={handleCancel} />
            {order.status !== "Cancelled" && (
              <button
                className="invoice-button"
                onClick={() => setInvoiceOrder(order)}
              >
                🧾 View Invoice
              </button>
            )}
            {order.status === "Delivered" && (
              <button
                className="return-button"
                onClick={() => handleReturn(order)}
                disabled={
                  new Date() - new Date(order.date) > 7 * 24 * 60 * 60 * 1000
                }
              >
                Request Return
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No orders available.</p>
      )}

      {selectedOrder && (
        <ProductModel
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
      {invoiceOrder && (
        <InvoiceModal
          order={invoiceOrder}
          onClose={() => setInvoiceOrder(null)}
        />
      )}
    </div>
  );
}
