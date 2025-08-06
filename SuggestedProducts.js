import React from 'react';
import './SuggestedProducts.css';

const suggested = [
  { id: 1, name: "Bananas", category: "Fruits", price: 45, image: "https://2.wlimg.com/product_images/bc-full/2024/6/13367104/watermark/fresh-robusta-banana-1715841644-7431117.jpeg"}, 
  { id: 2, name: "Tomatoes", category: "Vegetables", price: 30, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD2wJ5QdF-R79Q8JVcy1in217h7pvNmFeILw&s" },
  { id: 3, name: "Cookies", category: "Snacks", price: 85, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYLreq-yJJI_kwZcsQY01amlDTO4EIRMm7VQ&s" },
  { id: 4, name: "Milk", category: "Dairy", price: 40, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThvSiqUMhuMYNWoImXBUdTezg3ljI_5kIGHw&s" },
  { id: 12, name: "Bread Loaf", category: "Bakery", price: 45, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqUB_NxUzsNS5qq1gm6x8OKMABSzbi2Rongw&s"},
  { id: 13, name: "Strawberries", category: "Fruits", price: 140, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0gRT71EwtApQ8ACXCGyfvsCkuxwIXsx2z8Q&s"},
  { id: 14, name: "Broccoli", category: "Vegetables", price: 50, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5HI921PGF_R6Kqm0ESAHt9BT9snCb1lghkQ&s"},
  { id: 15, name: "Eggs Pack (12)", category: "Dairy", price: 75, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkvqjzkASmxjAjPDXLRdREH-Mpm9XDtRt2bg&s"},
  { id: 148, name: "Sofa Set", category: "Furniture", price: 8500, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6DVVdi31AGtB4j2lsoIlkbPCqa2rJ6rn2sQ&s"},
  { id: 143, name: "Antacid Tablets", category: "Medicines", price: 60, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAhSf9GV441Xk-MnrxyqQAms-S1ivPQC-wOg&s",quantity: "1 Sheet",description: "Antacid tablets are medications designed to neutralize excess stomach acid, providing relief from symptoms like heartburn, indigestion, and acid reflux."},
];

const validateProduct = (p) =>
  p?.id && p?.name && p?.category && p?.price && p?.image;

const SuggestedProducts = () => {
  return (
    <div className="suggested-products">
      <h2>Suggested for You</h2>
      <div className="suggested-grid">
        {suggested.map(product =>
          validateProduct(product) ? (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <p className="name">{product.name}</p>
              <span className="category">{product.category}</span>
              <span className="price">₹{product.price}</span>
            </div>
          ) : (
            <div key={Math.random()} className="error-card">Invalid product data</div>
          )
        )}
      </div>
    </div>
  );
};

export default SuggestedProducts;
