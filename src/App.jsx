import React from 'react'
import {Routes,Route,Outlet} from "react-router-dom"
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'
import Login from './pages/login-signup/Login'
import Product from './pages/products/Product'
import Intro from './pages/introduce/Intro'
import Contact from './pages/contact/Contact'
import Homepage from './pages/home/Homepage'

export default function App() {
  return (
    <>
    <Header></Header>
      <Routes>
        <Route path='/' element={<Homepage></Homepage>}></Route>
        <Route path='/product' element={<Product></Product>}></Route>
        <Route path='/introduce' element={<Intro></Intro>}></Route>
        <Route path='/kontact' element={<Contact></Contact>}></Route>
        <Route path='/loggin' element={<Login></Login>}></Route>
      </Routes>
    <Footer></Footer>
    </>
  )
}
