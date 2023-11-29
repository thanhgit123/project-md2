import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";

export default function PopularProduct() {
  const [popularProduct, setpopularProduct] = useState([]);
  const [popularProductTwo, setpopularProductTwo] = useState([]);

  const handleGetData = async () => {
    const response = await axios.get("http://localhost:8099/popularProduct");
    setpopularProduct(response.data);
  };

  const handleGetDataTwo = async () => {
    const res = await axios.get("http://localhost:8099/popularProductTwo");
    setpopularProductTwo(res.data);
  };
  useEffect(() => {
    handleGetData();
    handleGetDataTwo();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <span className="text-3xl">Phổ Biến Gần Đây</span>
        <NavLink to="/listProduct" className="flex text-rose-400">
          Xem thêm <HiArrowNarrowRight className="mt-1" />{" "}
        </NavLink>
      </div>
      <br />

      <div className="flex justify-around">
        <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/projectmd2-d11df.appspot.com/o/iamges%2F123.jpg?alt=media&token=303fbb3b-d799-458a-882f-74cf342efcc7"
          }
          alt=""
        />
        {popularProduct.map((item, index) => {
          return (
            <div key={index}>
              <img src={item.image} alt="" className="w-[200px]" />
              <p>{item.name}</p>
              <br />
              <p className="flex ">
                <FaStar className="text-orange-600" />
                <FaStar className="text-orange-600" />
                <FaStar className="text-orange-600" />
                <FaStar className="text-orange-600" />
                <FaStarHalf className="text-orange-600" />
              </p>
              <p>${item.salePrice}</p>
              <p className="line-through">{item.price}</p>
            </div>
          );
        })}
      </div>
      <br />

      <div className="flex justify-around">
        {popularProductTwo.map((item, index) => {
          return (
            <div key={index}>
              <img src={item.image} alt="" className="w-[200px]" />
              <p>{item.name}</p>
              <br />
              <p className="flex ">
                <FaStar className="text-orange-600" />
                <FaStar className="text-orange-600" />
                <FaStar className="text-orange-600" />
                <FaStar className="text-orange-600" />
                <FaStarHalf className="text-orange-600" />
              </p>
              <p>${item.salePrice}</p>
              <p className="line-through">{item.price}</p>
            </div>
          );
        })}
        <img
          src={
            "https://firebasestorage.googleapis.com/v0/b/projectmd2-d11df.appspot.com/o/iamges%2Fsq.jpg?alt=media&token=faada41e-c5f2-4d62-9fb8-013984463b26"
          }
          alt=""
        />
      </div>
      <br />

      <div className=" h-[300px] flex justify-evenly">
        <div className="flex bg-orange-400 w-[700px]">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/projectmd2-d11df.appspot.com/o/iamges%2Fp%201.png?alt=media&token=d2dabdfd-367f-41d4-9177-ceac883197a3"
            }
            alt=""
          />
          <div className="text-white w-[140px] m-auto leading-10 ">
            <p className="text-lg">Bán Chạy</p>
            <p className="text-3xl">NIKE AIR</p>
            <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl w-36 text-black hover:text-white">
              <Link to="/listProduct" className="hover:text-white">
                Xem Thêm
              </Link>
            </button>
          </div>
        </div>

        <div className="flex bg-teal-600 w-[700px]">
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/projectmd2-d11df.appspot.com/o/iamges%2Fa%201.png?alt=media&token=05d98192-28f9-484b-ad30-cd52fd4000b4"
            }
            alt=""
          />
          <div className="text-white w-[140px] m-auto leading-10 ">
            <p className="text-lg">Bán Chạy</p>
            <p className="text-3xl">NIKE AIR</p>
            <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl w-36 text-black hover:text-white">
              <Link to="/listProduct" className="hover:text-white">
                Xem Thêm
              </Link>
            </button>
          </div>
        </div>
      </div>
      <br />

      <div className="bg-[url('assets/image/sale.jpg')] bg-no-repeat bg-cover h-[250px] pt-20 pl-10 ">
        <div className=" w-[450px] leading-9 text-lg">
          <p className="text-2xl text-black">Giảm giá bỏi AMARA</p>
          <p>Đăng ký tài khoản tại AMARA được ưu đãi lên tới 45%</p>
          <button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl w-36 hover:text-white">
            <Link to="/loggin" className="hover:text-white">
              Đăng ký
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
