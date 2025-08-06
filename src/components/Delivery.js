import React, { useState } from "react";
import "./Delivery.css";

const mockDeliveries = [
  {
    id: "DLV001",
    customer: "Ravi Kumar",
    address: "Banjara Hills, Hyderabad",
    contact: "9876543210",
    status: "Out for Delivery",
    amount: 220,
  },
  {
    id: "DLV002",
    customer: "Sneha Rao",
    address: "Madhapur, Hyderabad",
    contact: "9123456789",
    status: "Picked Up",
    amount: 340,
  },
];

export default function DeliveryDashboard() {
  const [deliveries, setDeliveries] = useState(mockDeliveries);

  const markDelivered = (id) => {
    setDeliveries((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "Delivered" } : d
      )
    );
  };

  return (
    <div className="delivery-dashboard">
      <h2>🚚 Delivery Agents</h2>

      <div className="delivery-list">
        {deliveries.map((d) => (
          <div key={d.id} className={`delivery-card ${d.status.toLowerCase().replace(/ /g, "-")}`}>
            <h4>{d.customer}</h4>
            <p><strong>Order ID:</strong> {d.id}</p>
            <p><strong>Address:</strong> {d.address}</p>
            <p><strong>Contact:</strong> {d.contact}</p>
            <p><strong>Amount:</strong> ₹{d.amount}</p>
            <p><strong>Status:</strong> <span className="status">{d.status}</span></p>

            {d.status !== "Delivered" && (
              <button onClick={() => markDelivered(d.id)}>Mark as Delivered</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

