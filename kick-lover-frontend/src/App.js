import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Nike from "./pages/Nike";
import SneakerPage from "./pages/SneakerPage";
import { AdminProductProvider } from "./context/AdminProductContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import Adidas from "./pages/Adidas";
import Reebok from "./pages/Reebok";
import Puma from "./pages/Puma";
import AboutUs from "./components/Footer/AboutUs";
import Footer from "./components/Footer";
import Contact from "./components/Footer/Contact";
import FAQ from "./components/Footer/FAQ";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Profile from "./pages/Profile";
import OrderDetail from "./pages/OrderDetail";

const App = () => {
  return (
    <OrderProvider>
      <CartProvider>
        <ThemeProvider>
          <AuthProvider>
            <AdminProductProvider>
              <ProductProvider>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/men" element={<Men />} />
                  <Route path="/women" element={<Women />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/nike" element={<Nike />} />
                  <Route path="/adidas" element={<Adidas />} />
                  <Route path="/reebok" element={<Reebok />} />
                  <Route path="/puma" element={<Puma />} />
                  <Route path="/sneakers/:id" element={<SneakerPage />} />
                  <Route path="/aboutus" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="faq" element={<FAQ />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/order/:id" element={<OrderDetail />} />
                </Routes>
                <hr className="border-t border-gray-300 dark:border-gray-700 my-4" />
                <Footer />
              </ProductProvider>
            </AdminProductProvider>
          </AuthProvider>
        </ThemeProvider>
      </CartProvider>
    </OrderProvider>
  );
};

export default App;
