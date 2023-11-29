import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import Login from "./pages/login-signup/Login";
import Product from "./pages/products/Product";
import Intro from "./pages/introduce/Intro";
import Contact from "./pages/contact/Contact";
import Homepage from "./pages/home/Homepage";
import ListProduct from "./pages/listProduct/ListProduct";
import Cart from "./pages/cart/Cart";
import AdminUser from "./pages/admin/adminUsers/AdminUser";
import AdminProduct from "./pages/admin/adminProduct/AdminProduct";
import Adminbill from "./pages/admin/adminBills/Adminbill";
import Admin from "./pages/admin/Admin";
import Checkout from "./pages/checkout/Checkout";
import ProductDetail from "./pages/productDetail/ProductDetail";
export default function App() {
  return (
    <>
      <Routes>
          <Route path="/"element={<><Header /><Outlet /> <Footer /> </>}>
            <Route path="/" element={<Homepage></Homepage>}></Route>
            <Route path="/introduce" element={<Intro></Intro>}></Route>
            <Route path="/kontact" element={<Contact></Contact>}></Route>
            <Route path="/loggin" element={<Login></Login>}></Route>
            <Route path="/category/:id" element={<Product></Product>} />
            <Route path="/listProduct"element={<ListProduct></ListProduct>}></Route>
            <Route path="/productDetail" element={<ProductDetail></ProductDetail>}></Route>
            <Route path="/cart" element={<Cart></Cart>}></Route>
            <Route path="/checkOut" element={<Checkout></Checkout>}></Route>
          </Route>
        <Route path="admin" element={<><Admin /> <Outlet /> </>}>
          <Route path="admin" element={<AdminUser></AdminUser>}></Route>
          <Route path="adminProduct" element={<AdminProduct></AdminProduct>}></Route>
          <Route path="adminBill" element={<Adminbill></Adminbill>}></Route>
        </Route>
      </Routes>
      {/* <Header></Header>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route path="/introduce" element={<Intro></Intro>}></Route>
        <Route path="/kontact" element={<Contact></Contact>}></Route>
        <Route path="/loggin" element={<Login></Login>}></Route>
        <Route path="/category/:id" element={<Product></Product>} />
        <Route path="/listProduct" element={<ListProduct></ListProduct>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
       

        <Route path="/admin" element={<Admin></Admin>}>
          <Route path="/adminUsers" element={<AdminUser></AdminUser>}></Route>
          <Route path="/adminProduct" element={<AdminProduct></AdminProduct>}></Route>
          <Route path="/adminBill" element={<Adminbill></Adminbill>}></Route>
        </Route>
      </Routes> */}
      {/* <Footer></Footer> */}
    </>
  );
}
