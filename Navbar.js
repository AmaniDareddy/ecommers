import React,{useState} from "react";
import { Link, useLocation } from "react-router-dom";
import { useStore } from "../Context/StoreContext";
import { FaBell, FaEnvelope, FaUserCircle, FaBars,FaShoppingCart } from "react-icons/fa";
import ProfileModal from "./ProfileModal";

const CATEGORY_DEFS = [
  { label: "All" },
  { label: "Fruits & Vegetables", match: ["Fruits", "Vegetables"] },
  { label: "Snacks" },
  { label: "Dairy"},
  { label: "Beverages"},
  { label: "Bakery"},
];
export default function Navbar({ toggleSidebar }) {
  const {
    state: { cart },
  } = useStore();
  const cartCount = cart.reduce((total, item) => total + item.qty, 0);
  const location = useLocation();
  const {
      state: { products },
    } = useStore();
  
    const [search, setSearch]   = useState("");
    const [category, setCategory] = useState("All");
    const [showProfile, setShowProfile] = useState(false);
    const user = {
    name: 'Amani',
    membership: 'Gold Member',
    image: 'profile.jpeg',
  };
  
  return (
    <nav className="navbar">
    <img src="ATS.png" alt="Logo" className="logo-image" />
    <FaBars onClick={toggleSidebar} className="toggle-icon" />
      <div className="brand">
        <Link to="/"></Link>
      </div>
      <input
        className="search"
        placeholder="Search for products…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul className="nav-links">
        <li>
          <Link
            className={location.pathname === "/cart" ? "active" : ""}
            to="/cart"
          >
            <FaShoppingCart size={26} color="black" /> 
            <span className="badge">{cart.reduce((a, c) => a + c.qty, 0)}</span>
          </Link>
        </li>
        <div className="nav-icons">
        <div className="icon-container">
          <FaEnvelope />
          <span className="badge">5</span>
        </div>
        <div className="icon-container">
          <FaBell />
          <span className="badge">3</span>
        </div>
        
        <div className="profile-info" onClick={() => setShowProfile(true)}>
        <img src={user.image} alt="Profile" className="profile-img" />
        <div className="profile-details">
          <div className="name">{user.name}</div>
          <div className="membership">{user.membership}</div>
        </div>
        </div>
        </div>
      </ul>
    {showProfile && <ProfileModal onClose={() => setShowProfile(false)} />}  
    </nav>
  );
}

