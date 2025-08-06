// src/components/PaymentModule.js
import React, { useState, useEffect } from "react";
import "./Payment.css";

const PaymentModule = ({ selected, onSelect, onPaymentDetails }) => {
  const [method, setMethod] = useState(selected || "Card");
  const [details, setDetails] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    onSelect(method);
    onPaymentDetails(details, validate()); // live sync
  }, [method, details]);

  const handleInput = (e) => {
    setDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (method === "Card") {
      if (!/^\d{16}$/.test(details.cardNumber || "")) newErrors.cardNumber = "Card number must be 16 digits";
      if (!/^\d{3}$/.test(details.cvv || "")) newErrors.cvv = "CVV must be 3 digits";
    } else if (method === "UPI") {
      if (!/^[\w.-]+@[\w.-]+$/.test(details.upiId || "")) newErrors.upiId = "Invalid UPI ID";
    } else if (method === "Wallet") {
      if (!details.wallet) newErrors.wallet = "Select wallet";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="payment-module">
      <h4>Select Payment Method:</h4><br></br>
      <div className="tabs">
        {["Card", "UPI", "Wallet", "COD"].map((m) => (
          <button
            key={m}
            className={method === m ? "active" : ""}
            onClick={() => {
              setMethod(m);
              setDetails({});
              setErrors({});
            }}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="payment-fields">
        {method === "Card" && (
          <>
            <input type="text" name="cardNumber" placeholder="Card Number" onChange={handleInput} />
            {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
            <input type="text" name="cvv" placeholder="CVV" onChange={handleInput} />
            {errors.cvv && <span className="error">{errors.cvv}</span>}
          </>
        )}
        {method === "UPI" && (
          <>
            <input type="text" name="upiId" placeholder="UPI ID" onChange={handleInput} />
            {errors.upiId && <span className="error">{errors.upiId}</span>}
          </>
        )}
        {method === "Wallet" && (
          <>
            <select name="wallet" style={{width:"430px",height:"40px",borderRadius:"20px"}} onChange={handleInput}>
              <option value="">Select Wallet</option>
              <option value="Paytm">Paytm</option>
              <option value="PhonePe">PhonePe</option>
              <option value="AmazonPay">Amazon Pay</option>
              {errors.wallet && <span className="error">{errors.wallet}</span>}
            </select>
          </>
        )}
        {method === "COD" && (
          <p className="cod-msg">You will pay upon delivery.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentModule;
