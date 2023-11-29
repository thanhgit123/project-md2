import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Homepage.scss";
import axios from "axios";
import PopularProduct from "./popularProduct/PopularProduct"
export default function Homepage() {
  const images = [
    "https://firebasestorage.googleapis.com/v0/b/projectmd2-d11df.appspot.com/o/iamges%2Fnew%20slie%20tim.jpg?alt=media&token=07e7d147-e9a7-4de7-9c4a-6b28d2d99055",
    "https://mega.com.vn/media/news/0206_hinh-nen-messi-pc5.jpg",
    "https://firebasestorage.googleapis.com/v0/b/projectmd2-d11df.appspot.com/o/iamges%2Fnn.jpg?alt=media&token=c785c677-86e7-4fcd-88e5-ee2cad1d080b",
    "https://firebasestorage.googleapis.com/v0/b/projectmd2-d11df.appspot.com/o/iamges%2Fmmm.jpg?alt=media&token=83c2db56-c28c-41e3-87fe-f094205adc2c",
  ];
  const [mainPointOne, setmainPointOne] = useState([]);
  const [mainPointTwo, setmainPointTwo] = useState([]);

  const handleGetData = async () => {
    const response = await axios.get(
      "http://localhost:8099/mainPointProductOne"
    );
    setmainPointOne(response.data);
  };
  const handleGetData2 = async () => {
    const res = await axios.get("http://localhost:8099/mainPointProductTwo");
    setmainPointTwo(res.data);
  };

  useEffect(() => {
    handleGetData();
    handleGetData2();
  },[]);

  return (
    <>
      <Slide>
        <div className="each-slide-effect">
          <div style={{ backgroundImage: `url(${images[0]})` }}></div>
        </div>
        <div className="each-slide-effect">
          <div style={{ backgroundImage: `url(${images[1]})` }}></div>
        </div>
        <div className="each-slide-effect">
          <div style={{ backgroundImage: `url(${images[2]})` }}></div>
        </div>
        <div className="each-slide-effect">
          <div style={{ backgroundImage: `url(${images[3]})` }}></div>
        </div>
      </Slide>
      <br />

      <p className="text-3xl">Điểm Chú Ý</p>

      <div className="h-[550px] bg-rose-100 pt-3 flex justify-around ">
        <div className="w-[600px] h-[520px] bg-red-200 pt-3 pl-9  rounded-lg ">
          {mainPointOne?.map((item, index) => {
            return (
              <div key={index} className="flex  h-[165px] w-[550px]  ">
                <img src={item.image} alt="" className="w-[150px] h-[150px]" />
                <div className="leading-10 pl-7 pt-2">
                  <p>{item.name}</p>
                  <p>{item.salePrice}</p>
                  <p className="line-through">{item.price}</p>
                </div>
                <img src="src/assets/image/sale_4396.png" className="m-auto w-[80px] h-[70px] mb-6" alt=""/>

              </div>
              
            );
          })}
          
        </div>
        <div className="w-[600px] h-[520px] bg-red-200 pt-3 pl-9  rounded-lg ">
          {mainPointTwo.map((item, index) => {
            return (
              <div key={index} className="flex  h-[165px] ">
                <img
                  src={item.image}
                  alt=""
                  className="w-[150px] h-[150px] rounded-lg"
                />
                <div className="leading-10 pl-7 pt-2">
                  <p>{item.name}</p>
                  <p>{item.salePrice}</p>
                  <p className="line-through">{item.price}</p>
                </div>
                <img src="src/assets/image/sale_4396.png" className="m-auto  w-[80px] h-[70px] mb-6" alt=""/>
              </div>
            );
          })}
        </div>
      </div>

      <div  iv className=" h-[500px] flex justify-around poster" >
        <div className="flex flex-col justify-around  h-[400px] w-[400px] pt-[60px] mt-10 ">
          <div className="text-5xl leading-[60px]">
            <p>Nike Free X</p>
            <p>Metcon 2</p>
          </div>
          <div className="text-2xl leading-9">
            <p className="text-red-500">69.69$</p>
            <p className="text-red-500">New Fashion</p>
            <p>It is a long established fact that a reader will be.</p>
          </div>
        </div>
          <img
            src={
              "https://firebasestorage.googleapis.com/v0/b/projectmd2-d11df.appspot.com/o/iamges%2FShoes.png?alt=media&token=cbe6ff33-d02d-4f4d-891c-b5c4ea9066d4"
            }
            className=" h-[500px]"
            alt=""
          />
      </div><br />
      
        <PopularProduct></PopularProduct>
        <br />

    </>
  );
}
