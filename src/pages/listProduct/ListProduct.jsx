import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { success } from "../../utils/notify";
import { BiSearch } from "react-icons/bi";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

export default function ListProduct() {
  const [listProducts, setlistProducts] = useState([]);

  const navigate = useNavigate();
  const handleGetData = async () => {
    const response = await axios.get("http://localhost:8099/listProduct");
    setlistProducts(response.data);
  };

  useEffect(() => {
    handleGetData();
  }, []);

  // chuyen doi tien te
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [cart, setCart] = useState(currentUser?.cart);

  const handleAddToCart = (itemCart) => {
    let index = cart.findIndex((item) => item.id === itemCart.id);
    if (index != -1) {
      success("Sản phẩm đã có trong giỏ hàng!");
      cart[index].quantity += 1;
      setCart([...cart]);
    } else {
      cart.push({
        ...itemCart,
        quantity: 1,
      });

      setCart([...cart]);
      success("Đã thêm vào giỏ hàng");
    }
  };
  useEffect(() => {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ ...currentUser, cart })
    );
  }, [cart]);

  // serach
  const [searchProduct, setSearchProduct] = useState([]);
  const handleSearch = (e) => {
    setSearchProduct(e.target.value.toLowerCase());
  };
  const filterProduct = () => {
    return listProducts.filter((item) =>
      item.name.toLowerCase().includes(searchProduct)
    );
  };
  const showPage = filterProduct();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const endIndex = currentPage * itemsPerPage;
  const startIndex = endIndex - itemsPerPage;
  const displayedProducts = showPage.slice(startIndex, endIndex);
  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleClickProduct = (id) => {
    localStorage.setItem("idProduct", JSON.stringify(id));
    navigate("/productDetail");
  };

  return (
    <>
      <div className="h-[400px] bg-[url('assets/image/sanpham.png')]"></div>
      <br />
      <div className=" flex items-center ml-[400px] ">
        <div className="h-7 flex ">
          <input
            className="w-[700px] h-[30px] border-2 border-rose-300 rounded-sm m-auto"
            type="text"
            placeholder="Tìm Kiếm"
            style={{ fontSize: "14px" }}
            onChange={handleSearch}
          />
          <Button variant="contained">
            <BiSearch></BiSearch>
          </Button>
        </div>
        <br />
      </div>

      <div className="grid grid-cols-4 gap-4 pl-10 mt-7">
        {displayedProducts
          .filter((item) => item.name.toLowerCase().includes(searchProduct))
          .map((item, index) => {
            return (
              <div
                className="text-center w-[300px] border-2 border-purple-700 shadow-s   shadow-zinc-400  h-[450px] flex flex-col items-center justify-evenly"
                key={index}
              >
                <div onClick={() => handleClickProduct(item.id)}>
                  <img
                    src={item.image}
                    alt=""
                    className="w-[200px] h-auto hover:h-200 transform hover:scale-110 transition-all duration-200"
                  />
                </div>

                <p className="text-3xl text-black">{item.category}</p>
                <p className="text-2xl">{item.name}</p>
                <p className="text-lg"> {VND.format(item.price)}</p>
                <div
                  onClick={() => handleAddToCart(item)}
                  className="bg-gradient-to-r from-violet-500 to-fuchsia-500 cursor-pointer text-white w-[200px] h-[40px] pt-2 "
                >
                  Thêm vào giỏ hàng
                </div>
              </div>
            );
          })}
      </div>
      <br />
      <br />
      <Pagination
        current={currentPage}
        onChange={onPageChange}
        pageSize={itemsPerPage}
        total={showPage.length}
        className="ml-[45%]"
      />
      <br />
    </>
  );
}
