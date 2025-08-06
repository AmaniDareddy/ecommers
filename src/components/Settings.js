// File: Settings.jsx
import React, { useState } from "react";
import "./Settings.css";

const languages = ["English", "Hindi", "Telugu", "Tamil", "Malayalam"];

export default function Settings() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const handleImageChange = (e) => {
  const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    } else {
        setImage(null);
        setImagePreview(null);
        alert("Please upload a valid image file");
        }
    };
  const [tab, setTab] = useState("profile");
  const [form, setForm] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    address: "",
    notifications: true,
    language: "English",
    profileImage: null,
    darkMode: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email required";
    if (tab === "password") {
      if (!form.currentPassword) newErrors.currentPassword = "Current password required";
      if (form.newPassword.length < 6) newErrors.newPassword = "New password must be at least 6 characters";
      if (form.newPassword !== form.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }
    if (tab === "address" && !form.address.trim()) newErrors.address = "Address is required";
    if (tab === "language" && !form.language) newErrors.language = "Please select a language";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert(`${tab.charAt(0).toUpperCase() + tab.slice(1)} updated successfully!`);
  };

  return (
    <div className="settings">
      <div className="tabs">
        <button onClick={() => setTab("profile")} className={tab === "profile" ? "active" : ""}>Profile</button>
        <button onClick={() => setTab("password")} className={tab === "password" ? "active" : ""}>Password</button>
        <button onClick={() => setTab("address")} className={tab === "address" ? "active" : ""}>Address</button>
        <button onClick={() => setTab("notifications")} className={tab === "notifications" ? "active" : ""}>Notifications</button>
        <button onClick={() => setTab("language")} className={tab === "language" ? "active" : ""}>Language</button>
        <button onClick={() => setTab("appearance")} className={tab === "appearance" ? "active" : ""}>Appearance</button>
      </div>

      <form onSubmit={handleSubmit} className="tab-content">
        {tab === "profile" && (
          <>
            <label>Profile Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" style={{ width: "100px", marginTop: "10px", borderRadius: "8px" }} />
            )}

            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} />
            {errors.name && <span>{errors.name}</span>}

            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} />
            {errors.email && <span>{errors.email}</span>}
          </>
        )}

        {tab === "password" && (
          <>
            <label>Current Password</label>
            <input type="password" name="currentPassword" value={form.currentPassword} onChange={handleChange} />
            {errors.currentPassword && <span>{errors.currentPassword}</span>}

            <label>New Password</label>
            <input type="password" name="newPassword" value={form.newPassword} onChange={handleChange} />
            {errors.newPassword && <span>{errors.newPassword}</span>}

            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
          </>
        )}

        {tab === "address" && (
          <>
            <label>Delivery Address</label>
            <textarea name="address" value={form.address} onChange={handleChange} />
            {errors.address && <span>{errors.address}</span>}
          </>
        )}

        {tab === "notifications" && (
  <div className="setting-option">
    <label htmlFor="notifications">Enable Order Notifications</label>
    <input
      type="checkbox"
      name="notifications"
      checked={form.notifications}
      onChange={handleChange}
      id="notifications"
    />
  </div>
)}

{tab === "appearance" && (
  <div className="setting-option">
    <label htmlFor="darkMode">Enable Dark Mode</label>
    <input
      type="checkbox"
      name="darkMode"
      checked={form.darkMode}
      onChange={handleChange}
      id="darkMode"
    />
  </div>
)}

        {tab === "language" && (
          <>
            <label>Select Language</label>
            <select name="language" value={form.language} onChange={handleChange}>
              <option value="">--Select--</option>
              {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
            {errors.language && <span>{errors.language}</span>}
          </>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
