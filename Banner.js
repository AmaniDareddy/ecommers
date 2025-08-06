import React, { useEffect, useState } from "react";
import "./Banner.css";

const bannerImages = [
  "https://static.vecteezy.com/system/resources/previews/002/453/548/non_2x/sale-discount-banner-template-promotion-illustration-free-vector.jpg",
  "https://cdn.pixabay.com/photo/2024/07/11/20/49/vegetable-8889068_960_720.jpg",
  "https://images.pexels.com/photos/5677795/pexels-photo-5677795.jpeg",
  "https://images.pexels.com/photos/5965988/pexels-photo-5965988.jpeg",
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(intervalId); // Cleanup
  }, []);

  return (
    <div
      className="banner"
      style={{ backgroundImage: `url(${bannerImages[currentIndex]})` }}
    >
      {/* <div className="banner-text">
        <h2>🚀 Trending & New Items</h2>
        <p>Check out the latest arrivals</p>
        <ul className="features-list">
            <li>✨ Handpicked Daily Deals</li>
             <li>🛍️ Popular Categories Updated</li>
             <li>⚡ Limited-Time Launch Offers</li>
            </ul>
           <button className="explore-btn">Explore Now</button>
      </div> */}
    </div>
  );
}
