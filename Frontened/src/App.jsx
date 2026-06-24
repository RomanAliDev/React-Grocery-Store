import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserLayout from "./layout/Userlayout";
import AdminLayout from "./layout/AdminLayout";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Shop from "./Pages/Shop";
import Cart from "./Components/Cart";
import AddProduct from "./admin/addproduct";
import EditProduct from "./admin/EditProduct";
import ProductList from "./admin/productlist";
import OrderSuccess from "./Pages/OrderSuccess";
import AdminRoute from "./routes/AdminRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOutAddress from "./Pages/CheckOutAddress";
import Checkout from "./Pages/CheckOut";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* ================= USER LAYOUT ================= */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:categoryName" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout-address" element={<CheckOutAddress />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success/:id" element={<OrderSuccess />} />
        </Route>
        ================= ADMIN LAYOUT =================
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }>
          <Route path="products" element={<ProductList />} />
          <Route path="product/add" element={<AddProduct />} />
          <Route path="products/edit/:id" element={<EditProduct />} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  );
};

export default App;
