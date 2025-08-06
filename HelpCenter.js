import React, { useState } from 'react';

const HelpCenter = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', issue: '', message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    return formData.name && formData.email.includes('@') && formData.issue && formData.message.length > 10;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return alert("Please fill out the form correctly.");
    setSubmitted(true);
  };

  return (
    <div className="help-box">
      <h3>Help Center / Submit a Ticket</h3>
      {submitted ? (
        <p className="success-msg">Thank you! Our team will get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" onChange={handleChange} required />
          <select name="issue" onChange={handleChange} required>
            <option value="">Select Issue Type</option>
            <option value="order">Order Issue</option>
            <option value="payment">Payment</option>
            <option value="delivery">Delivery Delay</option>
          </select>
          <textarea name="message" placeholder="Describe your issue..." onChange={handleChange} required />
          <button type="submit">Submit Ticket</button>
        </form>
      )}
    </div>
  );
};

export default HelpCenter;