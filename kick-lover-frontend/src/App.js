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
import Adidas from "./pages/Adidas";
import Reebok from "./pages/Reebok";
import Puma from "./pages/Puma";

const App = () => {
  return (
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
            </Routes>
          </ProductProvider>
        </AdminProductProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
