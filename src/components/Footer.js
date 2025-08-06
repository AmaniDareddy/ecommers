
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h4>About Us</h4>
          <p>Astrolite is your trusted shopping destination for everything you need, at the best prices.</p>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/orders">My Orders</a></li>
            <li><a href="/support">Support</a></li>
            <li><a href="/wishlist">Wishlist</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact</h4>
          <ul>
            <li>Email: support@astrolite.com</li>
            <li>Phone: +91 9876543210</li>
            <li>Location: Hyderabad, India</li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Astrolite. All rights reserved.</p>
      </div>
    </footer>
  );
}
