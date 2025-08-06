import React from "react";
import "./ProfileModal.css";

export default function ProfileModal({ onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>User Profile</h2>
        <div className="profile-info">
          <p><strong>Name:</strong> Amani</p>
          <p><strong>Email:</strong> amani@example.com</p>
          <p><strong>Membership:</strong> Gold</p>
          <p><strong>Phone:</strong> +91-9876543210</p>
          <p><strong>Address:</strong> Hyderabad, Telangana</p>
          {/* Add more fields as needed */}
        </div>
      </div>
    </div>
  );
}
