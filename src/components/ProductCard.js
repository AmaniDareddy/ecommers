
// import React from "react";
// import { useStore } from "../Context/StoreContext";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
// import "./ProductCard.css"; 
// import { Link } from "react-router-dom";

// export default function ProductCard({ product }) {
//   const { state, dispatch } = useStore();
//   const isInWishlist = (state.wishlist || []).some((item) => item.id === product.id);

//   const toggleWishlist = () => {
//     if (isInWishlist) {
//       dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
//     } else {
//       dispatch({ type: "ADD_TO_WISHLIST", payload: product });
//     }
//   };

//   return (
//     <div className="card">
//       <Link to={`/product/${product.id}`}>
//       <img src={product.img || product.image || "fallback.jpg"} alt={product.name} />
//       <h3>{product.name}</h3>
//       <p style={{ color: "black", fontSize: "14px" }}>{product.quantity}</p>
//       <p className="category">{product.category}</p>
//       <p className="price">₹{product.price}</p>
//       </Link>
//       <div className="card-actions">
//         <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}>
//           Add to Cart
//         </button>
//         <button className="wishlist-btn" onClick={toggleWishlist}>
//           {isInWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
//         </button>
//       </div>
//     </div>
//   );
// }


import React from "react";
import { useStore } from "../Context/StoreContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { state, dispatch } = useStore();
  const isInWishlist = (state.wishlist || []).some((item) => item.id === product.id);

  const toggleWishlist = () => {
    if (isInWishlist) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
    } else {
      dispatch({ type: "ADD_TO_WISHLIST", payload: product });
    }
  };

  const offer = product.offer || 0;
  const discountedPrice = offer > 0 ? Math.round(product.price - (product.price * offer) / 100) : product.price;

  return (
    <div className="card">
      <div className="img-wrapper">
        <Link to={`/product/${product.id}`}>
          <img src={product.img || product.image || "fallback.jpg"} alt={product.name} />
          {offer > 0 && (
            <span className="offer-tag">{offer}% OFF</span>
          )}
        </Link>
      </div>
      
      <Link to={`/product/${product.id}`} className="product-info">
        <h3>{product.name}</h3>
        <p style={{ color: "black", fontSize: "14px" }}>{product.quantity}</p>
        <p className="category">{product.category}</p>

        <div className="price-section">
          <span className="discounted-price">₹{discountedPrice}</span>
          {offer > 0 && (
            <span className="original-price">₹{product.price}</span>
          )}
        </div>
      </Link>

      <div className="card-actions">
        <button onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}>
          Add to Cart
        </button>
        <button className="wishlist-btn" onClick={toggleWishlist}>
          {isInWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
}
