import React, { useEffect, useState } from "react";
import "./Banner.css";

const bannerImages = [
"https://cdn.pixabay.com/photo/2023/05/02/14/09/sushi-7965400_960_720.jpg",
"https://cdn.pixabay.com/photo/2025/07/17/12/58/fruit-9719503_960_720.jpg",

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
        <h2>🔥 Top Discounts</h2>
        <p>Save big on your daily essentials</p>
        <ul className="highlight-points">
          <li>Up to 50% off on fresh produce 🥦</li>
          <li>Buy 1 Get 1 Free on Snacks 🍪</li>
          <li>Special Weekend Offers every Friday 🛍️</li>
        </ul>
        <button className="shop-now-btn">Shop Now</button>
      </div> */}
    </div>
  );
}
