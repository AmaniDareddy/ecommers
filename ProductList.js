
import React, { useState, useEffect } from "react";
import { useStore } from "../Context/StoreContext";
import ProductCard from "./ProductCard";
import "../components/ProductList.css";
import { useNavigate, useParams } from 'react-router-dom';
import SuggestedProducts from "./SuggestedProducts";
import products from "../data/Products";
import Banner from "./Banner";
import Banner1 from "./Banner1"; 

const CATEGORY_DEFS = [
  { key: "Fruits & Vegetables", label: "Fruits & Vegetables", match: ["Fruits", "Vegetables"] },
  { key: "Snacks", label: "Snacks" },
  { key: "Dairy", label: "Dairy" },
  { key: "Beverages", label: "Beverages" },
  { key: "Bakery", label: "Bakery" },
  { key: "Electronics", label: "Electronics" },
  { key: "Baby Products", label: "Baby Products" },
  { key: "Beauty Products", label: "Beauty Products" },
  { key: "Books", label: "Books" },
  { key: "Medicines", label: "Medicines" },
  { key: "Furniture", label: "Furniture" },
];

export default function ProductList() {
  const navigate = useNavigate();
  const { categoryName } = useParams();

  const {
    state: { products = [] },
  } = useStore();

  const def = CATEGORY_DEFS.find(c => c.key === categoryName);
  const selectedCategory = def?.label || "All";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(selectedCategory);

  useEffect(() => {
    setCategory(selectedCategory);
  }, [categoryName]);

  const normalizedProducts = products.map(p => ({
    ...p,
    img: p.img || p.image || "",
  }));

  const filtered = normalizedProducts.filter((p) => {
  const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());

  if (category === "All") return matchesSearch;

  const def = CATEGORY_DEFS.find(c => c.label.toLowerCase() === category.toLowerCase());
  const allowed = def?.match || [def?.label];

  return matchesSearch && allowed.some(a => a.toLowerCase() === p.category.toLowerCase());
});


  return (
    <div>
      {/* Banners and Intro Section */}
      <div className="home-page">
        <Banner/>
        <br></br><br></br>
        <Banner1/>
        {/* <section className="full-width-banners">
          <div className="banner-image banner-discount" onClick={() => navigate('/discounts')}>
            <h2>🔥 Top Discounts</h2>
            <p>Save big on your daily essentials</p>
            <ul className="highlight-points">
             <li>Up to 50% off on fresh produce 🥦</li>
             <li>Buy 1 Get 1 Free on Snacks 🍪</li>
             <li>Special Weekend Offers every Friday 🛍️</li>
            </ul>
            <button className="shop-now-btn">Shop Now</button>
          </div>
          <div className="banner-image banner-trending" onClick={() => navigate('/trending')}>
            <h2>🚀 Trending & New Items</h2>
            <p>Check out the latest arrivals</p>
            <ul className="features-list">
             <li>✨ Handpicked Daily Deals</li>
             <li>🛍️ Popular Categories Updated</li>
             <li>⚡ Limited-Time Launch Offers</li>
            </ul>
           <button className="explore-btn">Explore Now</button>
          </div>
        </section> */}
      </div>

      {/* Categories */}
      <h2 className="page-title">Shop Groceries in Minutes</h2>
      <div className="categories">
        <h2 style={{ marginLeft: "50px" }}>Categories: </h2>
        {CATEGORY_DEFS.map((c) => (
          <button
            key={c.key}
            className={`cat-btn ${categoryName === c.key ? "active" : ""}`}
            onClick={() => navigate(`/category/${c.key}`)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <br />

      <div className="grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        {filtered.length === 0 && (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No products found.
          </p>
        )}
      </div>
      <SuggestedProducts />
    </div>
  );
}

