import React from 'react';
import './ProductDetailModal.css';

const ProductDetailModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={product.image} alt={product.name} className="modal-image" />
        <h2>{product.name}</h2>
        <p className="modal-description">
          This is a detailed description of {product.name}. It's a great product for your daily needs!
        </p>
        <div className="modal-price">Price: ₹{product.price}</div>
        <button className="add-to-cart-btn" onClick={() => alert("Added to cart!")}>
          Add to Cart
        </button>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default ProductDetailModal;
