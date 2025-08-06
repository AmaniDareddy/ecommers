import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import products from "../data/Products.js"; // Your product list
import "./ProductDetails.css"; // CSS file

const reviews = [
  {
    id: 1,
    name: "Ravi Kumar",
    rating: 5,
    comment: "Excellent product! Totally worth the price.",
    date: "2025-07-20"
  },
  {
    id: 2,
    name: "Sneha Patel",
    rating: 4,
    comment: "Good quality but delivery was slightly delayed.",
    date: "2025-07-18"
  },
  {
    id: 3,
    name: "Amit Singh",
    rating: 3,
    comment: "Average performance. Expected better battery life.",
    date: "2025-07-15"
  }
];
function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/checkout", { state: { product } }); // Passing product for checkout
  };

  useEffect(() => {
    const item = products.find((p) => p.id === parseInt(id));
    setProduct(item);
  }, [id]);

  if (!product) {
    return <h2 className="no-product">Product not found.</h2>;
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <img
          src={product.image || product.img}
          alt={product.name}
          className="detail-img"
        />
        <div className="detail-content">
          <h2>{product.name}</h2>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          <p><strong>Price:</strong> ₹{product.price}</p>
          <p><strong>Description:</strong> {product.description || "No description available"}</p>
          <p><strong>Offer:</strong> {product.offer}%</p>
          {/* <button className="buy-now-btn" onClick={handleBuyNow}>Buy Now</button> */}
          <button
  className="buy-now-btn"
  onClick={() =>
    navigate("/checkout", { state: { product: product } })
  }
>
  Buy Now
</button>

        </div>
      </div>
      <div className="review-section">
  <h3>🗣️ Customer Reviews</h3>
  {reviews.map((review) => (
    <div key={review.id} className="review-card">
      <div className="review-name">{review.name}</div>
      <div className="review-rating">
        {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
      </div>
      <p className="review-comment">{review.comment}</p>
      <div className="review-date">{review.date}</div>
    </div>
  ))}
</div>

    </div>
  );
}

export default ProductDetails;
