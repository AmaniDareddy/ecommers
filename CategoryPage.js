
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../Context/StoreContext";
import ProductCard from "./ProductCard";
import "../components/ProductList.css";

export const CATEGORY_DEFS = [
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

const CategoryPage = () => {
  const { categoryName } = useParams();
  const {
    state: { products = [] }
  } = useStore();

  const [priceFilter, setPriceFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const formattedLabel = categoryName.replace(/-/g, " ");
  const def = CATEGORY_DEFS.find((c) => c.label.toUpperCase() === formattedLabel.toUpperCase());
  const allowed = def?.match || [formattedLabel];

  const normalizedProducts = products.map(p => ({
    ...p,
    img: p.img || p.image || "",
    type: p.type?.toLowerCase() || "",
    name: p.name || "",
    category: p.category || "",
    price: p.price || 0
  }));

  const filtered = normalizedProducts.filter((p) =>
    allowed.some(a => a.toLowerCase() === p.category.toLowerCase()) &&
    (priceFilter === "all" ||
      (priceFilter === "low" && p.price <= 50) ||
      (priceFilter === "mid" && p.price > 50 && p.price <= 100) ||
      (priceFilter === "high" && p.price > 100)) &&
    (typeFilter === "all" || p.type === typeFilter.toLowerCase()) &&
    (searchTerm.trim() === "" || p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      <h2 style={{ marginLeft: "70px", textAlign: "center" }}>{formattedLabel}</h2><br />

      {/* 🔍 Filters and Search */}
      <div className="filters" style={{ display: "flex", justifyContent: "right", flexWrap: "wrap", gap: "20px", marginBottom: "20px" }}>
        <select onChange={(e) => setPriceFilter(e.target.value)} value={priceFilter}>
          <option value="all">All Prices</option>
          <option value="low">₹0-50</option>
          <option value="mid">₹51-100</option>
          <option value="high">₹101+</option>
        </select>

        {/* {allowed.includes("Fruits") || allowed.includes("Vegetables") ? (
          <select onChange={(e) => setTypeFilter(e.target.value)} value={typeFilter}>
            <option value="all">All Types</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
          </select>
        ) : null} */}

        <input
          type="text"
          placeholder="Search product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "15px",
            width: "200px"
          }}
        />
      </div>

      {/* 🛒 Product Grid */}
      <div className="grid">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            No products found matching your filters or search.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

