
import React,{useState,useMemo} from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../Context/OrderContext";
import PaymentModule from "./PaymentModule";
import { useLocation } from "react-router-dom";
import { useCart } from "../Context/CartContext";


import "./Checkout.css";

export default function Checkout() {
  const navigate = useNavigate();
  const { addOrder } = useOrders();
  const location = useLocation();
  const directProduct = location.state?.product || null;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // --- helper: parse offer to a percent number (supports 20 or "20%" or "20% off") ---
  const offerPct = (val) => {
    if (val == null || val === "") return 0;
    if (typeof val === "number") return val;
    const m = String(val).match(/(\d+(\.\d+)?)\s*%/);
    return m ? parseFloat(m[1]) : 0;
  };

  // --- build enriched cart items (adds description, offer, packSize, lineTotal) ---
  const enrichedItems = useMemo(() => {
    return cart.map((item) => {
      const qty = Number(item.qty ?? 1);
      const unitPrice = Number(item.price ?? 0);
      const pct = offerPct(item.offer ?? item.discountPercent);
      const discountAmt = (unitPrice * qty * pct) / 100;
      const lineTotal = unitPrice * qty - discountAmt;

      return {
        id: item.id,
        name: item.name,
        image: item.image || item.img || "",
        // pack size from your product definition (e.g., "1kg"); display only
        packSize: item.quantity,          // <-- don't use for math
        quantity: qty,                    // numeric purchase quantity for math
        unitPrice,                        // keep unit price explicit
        price: unitPrice,                 // if other components read `price`, keep it too
        description: item.description || item.desc || "",
        offer: item.offer ?? item.discountPercent ?? null, // keep raw; render as "20% off" later
        discountPercent: pct,             // numeric, handy for calculations
        discountAmount: Number(discountAmt.toFixed(2)),
        lineTotal: Number(lineTotal.toFixed(2)),
      };
    });
  }, [cart]);

  // --- totals (you can add delivery/tax here if you use them) ---
  const totals = useMemo(() => {
    const subtotal = enrichedItems.reduce((s, it) => s + it.unitPrice * it.quantity, 0);
    const discount = enrichedItems.reduce((s, it) => s + it.discountAmount, 0);
    const delivery = 0;           // set if you charge delivery
    const taxRate = 0;            // e.g., 5  (percent). If you have it, set here or pass from state.
    const tax = ((taxRate / 100) * (subtotal - discount));
    const grandTotal = subtotal - discount + delivery + tax;
    return {
      subtotal: Number(subtotal.toFixed(2)),
      discount: Number(discount.toFixed(2)),
      delivery,
      taxRate,
      tax: Number(tax.toFixed(2)),
      grandTotal: Number(grandTotal.toFixed(2)),
    };
  }, [enrichedItems]);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", street: "", city: "", pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentValid, setPaymentValid] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!formData.street.trim()) newErrors.street = "Street is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Pincode must be 6 digits";
    if (!paymentMethod) newErrors.payment = "Select a payment method";
    if (!paymentValid && paymentMethod !== "COD") newErrors.payment = "Enter valid payment details";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const { cartItems, clearCart } = useCart(); // assuming context
  // const { addOrder } = useOrders(); // assuming context

const handlePlaceOrder = () => {
  if (!validateForm()) return;

  const orderItems = enrichedItems.length > 0 ? enrichedItems : [{
    ...directProduct,
    quantity: 1,
    unitPrice: Number(directProduct.price ?? 0),
    price: Number(directProduct.price ?? 0),
    discountPercent: offerPct(directProduct.offer ?? directProduct.discountPercent),
    discountAmount: 0,
    lineTotal: Number(directProduct.price ?? 0),
    status: "Placed",
    date: new Date().toLocaleDateString()
  }];

  const newOrder = {
    id: "ORD" + Date.now(),
    date: new Date().toISOString(),
    items: orderItems,
    total: totals.grandTotal,
    status: "Placed",
    isCancelable: true,
    paymentMethod,
    paymentDetails,
    totals,
    customer: {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.street}, ${formData.city} - ${formData.pincode}`,
    },
  };

  addOrder(newOrder);
  clearCart();
  localStorage.removeItem("cart");
  navigate("/orders");
};


  return (
    <div className="checkout-section">
      <h2>🧾 Checkout</h2>
      <div className="checkout-form">
        <input type="text" placeholder="Full Name" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <span className="error">{errors.name}</span>}

        <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}

        <input type="tel" placeholder="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <span className="error">{errors.phone}</span>}

        <input type="text" placeholder="Street Address" name="street" value={formData.street} onChange={handleChange} />
        {errors.street && <span className="error">{errors.street}</span>}

        <input type="text" placeholder="City" name="city" value={formData.city} onChange={handleChange} />
        {errors.city && <span className="error">{errors.city}</span>}

        <input type="text" placeholder="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} />
        {errors.pincode && <span className="error">{errors.pincode}</span>}

        <PaymentModule
          selected={paymentMethod}
          onSelect={setPaymentMethod}
          onPaymentDetails={(details, valid) => {
            setPaymentDetails(details);
            setPaymentValid(valid);
          }}
        />
        {errors.payment && <span className="error">{errors.payment}</span>}

        <button className="place-order-btn" onClick={handlePlaceOrder}>
          ✅ Place Order (₹{totals.grandTotal.toFixed(2)})
        </button>
      </div>
    </div>
  );
}
