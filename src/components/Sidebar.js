import { useState } from "react";
import { FaHome, FaCog, FaClipboardList, FaTruck,FaHeart } from 'react-icons/fa';
import {BsChatDots} from 'react-icons/bs';
import {HiOutlineLogout} from "react-icons/hi";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import LogoutModel from "./LogoutModel";

const Sidebar = ({ isOpen }) => {
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    
  return (
  <div className={`sidebar ${isOpen ? "open" : "collapsed"}`}>
  <div className="sidebar-title"></div>
  <ul className="sidebar-menu">
    <li className="home">
      <Link className={location.pathname === "/" ? "active" : ""} to="/" style={{ textDecoration: "none", color: "black" }}>
        <FaHome className="icon" style={{ color:" green" }}/> {isOpen && <span>Home</span>}
      </Link>
    </li>
    <li className="home">
      <Link to="/orders" className="nav-link" style={{ textDecoration: "none", color: "black" }}>
        <FaClipboardList className="icon" style={{ color:" green" }}/> {isOpen && <span>My Orders</span>}
      </Link>
    </li>
    <li className="home">
      <Link to="/delivery" className="nav-link" style={{ textDecoration: "none", color: "black" }}>
        <FaTruck className="icon" style={{ color:" green" }}/> {isOpen && <span>Delivery</span>}
      </Link>
    </li>
    <li className="home">
      <Link to="/wishlist" className="nav-link" style={{ textDecoration: "none", color: "black" }}>
        <FaHeart className="icon" style={{ color:" green" }}/> {isOpen && <span>Wishlist</span>}
      </Link>
    </li>
    <li className="home">
      <Link to="/settings" className="nav-link" style={{ textDecoration: "none", color: "black" }}>
        <FaCog className="icon" style={{ color:" green" }}/> {isOpen && <span>Settings</span>}
      </Link>
    </li>
    <li className="home">
      <Link to="/support" className="nav-link" style={{ textDecoration: "none", color: "black" }}>
        <BsChatDots className="icon" style={{ color:" green" }}/> {isOpen && <span>Support</span>}
      </Link>
    </li>
     <>
      <li
        className="home logout-item"
        onClick={() => setShowModal(true)}
        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
      >
        <HiOutlineLogout className="icon" style={{ color: "red", fontSize: "1.5rem" }} />
        {isOpen &&<span style={{ fontWeight: "500", color:"black", marginLeft:"3px" }}>Logout</span>}
      </li>

      {showModal && (
        <LogoutModel
          onConfirm={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("cart");
            localStorage.removeItem("token");
            window.location.href = "/login"; // or use useNavigate
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  </ul>
</div>

);
};
export default Sidebar;
