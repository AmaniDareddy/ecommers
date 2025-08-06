import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import React,{useState,useEffect} from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { StoreProvider } from "./Context/StoreContext";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import OrderManagement from "./components/OrderManagement";
import DeliveryDashboard from "./components/Delivery";
import Settings from "./components/Settings";
import CategoryPage from "./components/CategoryPage";
import Wishlist from "./components/Wishlist";
import { AddressProvider } from "./Context/AddressContext";
import { OrderProvider } from "./Context/OrderContext";
import PaymentModule from "./components/PaymentModule";
import Support from "./components/Support";
import ProductDetails from "./components/ProductDetails";
import products from "./data/Products";
import LogoutModel from "./components/LogoutModel";
import { CartProvider } from "./Context/CartContext";



export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const [wishlistItems, setWishlistItems] = useState([]);

  const addToWishlist = (product) => {
    if (!wishlistItems.find((item) => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const isWishlisted = (id) => wishlistItems.some((item) => item.id === id);

  return (
    <StoreProvider>
      <div className="app">
        <Navbar toggleSidebar={toggleSidebar}/>
        <Sidebar isOpen={sidebarOpen} />
        <main className={`main-content ${sidebarOpen ? "with-sidebar" : ""}`}>
          <CartProvider>
          <OrderProvider>
          <AddressProvider>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/delivery" element={<DeliveryDashboard />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/payment" element={<PaymentModule/>} />
            <Route path="/support" element={<Support />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/logoutModel" element={<LogoutModel />} />
          </Routes>
          </AddressProvider>
          </OrderProvider>
          </CartProvider>
          <Footer />
        </main>
      </div>
    </StoreProvider>
  );
}
