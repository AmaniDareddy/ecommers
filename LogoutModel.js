// src/components/LogoutModal.js
import React from "react";
import "./LogoutModel.css";

export default function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="logout-modal-overlay">
      <div className="logout-modal">
        <h3>🚪 Confirm Logout</h3>
        <p>Are you sure you want to logout?</p>
        <div className="logout-buttons">
          <button className="confirm" onClick={onConfirm}>Yes, Logout</button>
          <button className="cancel" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
