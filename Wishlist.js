// import React from "react";
// import "./Wishlist.css";

// const Wishlist = ({ wishlistItems, removeFromWishlist }) => {
//   return (
//     <div className="wishlist-container">
//       <h3>Your Wishlist</h3>
//       {wishlistItems?.length === 0 ? (
//         <p>No items in wishlist.</p>
//       ) : (
//         <div className="wishlist-items">
//           {wishlistItems?.map((item, index) => (
//             <div className="wishlist-card" key={index}>
//               <img src={item.image} alt={item.name} />
//               <div className="wishlist-info">
//                 <h4>{item.name}</h4>
//                 <p>₹{item.price}</p>
//                 <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Wishlist;

import React from "react";
import { useStore } from "../Context/StoreContext";
import "./Wishlist.css";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { state, dispatch } = useStore();

//   const removeFromWishlist = (id) => {
//     dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
//   };
  const removeFromWishlist = (id) => {
  dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
  toast.info("Removed from Wishlist ❌");
 };
  return (
    <div className="wishlist-container">
      <h3>Your Wishlist</h3><br></br>
      {state.wishlist?.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <div className="wishlist-items">
          {state.wishlist.map((item, index) => (
            <div className="wishlist-card" key={index}>
              <img src={item.image || item.img} alt={item.name} />
              <div className="wishlist-info">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
