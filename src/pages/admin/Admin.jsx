import React from "react";
import { Link } from "react-router-dom";
import "./Admin.scss";
export default function Admin() {

  const handleLogout =()=>{
    localStorage.removeItem("currentUser");
    window.location.href="/"
}
  return (
    <>
      <header role="banner">
        <h1 className="text-3xl">Admin </h1>
        <ul className="utilities">
          
          <li className="logout warn">
            <Link ><button onClick={handleLogout}>Log Out</button></Link>
          </li>
        </ul>
      </header>

      <nav role="navigation">
        <ul className="main">
          <li className="dashboard">
            <Link to="admin">Người dùng</Link>
          </li>
          <li className="write">
            <Link to="adminProduct">Sản phẩm</Link>
          </li>
          <li className="edit">
            <Link to="adminBill">Bills</Link>
          </li>
        </ul>
      </nav>

      <main role="main"></main>
      {/* <footer role="contentinfo">Easy Admin Style by Melissa Cabral</footer> */}
    </>
  );
}
