import React, { useEffect, useState } from "react";
import "./ProductDetail.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { success } from "../../utils/notify";
export default function ProductDetail() {
  
  const [product, setProduct] = useState({});

  const getInfoProduct = async () => {
    const id = JSON.parse(localStorage.getItem("idProduct"));
    const result = await axios.get(`http://localhost:8099/listProduct/${id}`);
    setProduct(result.data);
  };

  useEffect(() => {
    getInfoProduct();
  }, []);

useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    setCart(currentUser?.cart || []);
  }, []);

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // them vao gio hang
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [cart, setCart] = useState(currentUser?.cart);

  const handleAddToCart = () => {
    const index = cart.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      success("Sản phẩm đã có trong giỏ hàng!");
      const updatedCart = [...cart];
      updatedCart[index].quantity += 1;
      setCart(updatedCart);
    } else {
      const updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
      setCart(updatedCart);
      success("Đã thêm vào giỏ hàng");
    }
  };

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ ...currentUser, cart })
    );
  }, [cart]);

  return (
    <>
      <div>
        <p className="text-2xl ml-[100px] mt-3 text-black">
          <Link to="/listProduct"> Xem tiếp</Link>
        </p>

        <div className="w-[100%] flex h-[100vh] justify-around mt-3">
          <div className="col-md-6 ">
            <div className="pro-img-details bg-rose-100 w-[600px] ml-[100px]">
              <a href="#/">
                <img
                  src={product?.image}
                  alt=""
                  className="w-[100px] h-[500px]"
                />
              </a>
              {/* <div className="pro-img-list ml-2">
                <a href="#/">
                  <img src={product?.image} alt="" />
                </a>
                <a href="#/">
                  <img src={product?.image} alt="" />
                </a>
                <a href="#/">
                  <img src={product?.image} alt="" />
                </a>
                <a href="#/">
                  <img src={product?.image} alt="" />
                </a>
              </div> */}
            </div>
          </div>

          <div className="col-md-6 h-[500px] leading-11">
            <h4 className="pro-d-title">
              <p className="">
                <strong className="text-2xl">{product?.name}</strong>
              </p>
            </h4>
            <p className="leading-7">
              <ul className="list-disc">
                <li>
                  Giày thể thao nam nữ kiểu dáng thể thao, giày dior phù hợp với
                  các bạn trong độ tuổi 12-35.
                </li>
                <li>
                  Thích hợp khi tham gia các hoạt động thể thao, đi chơi theo
                  nhóm, giày sneaker đôi, giày nhóm...
                </li>
                <li>Hàng thật 100% như hình, video.</li>
                <li>
                  Thời gian chuẩn bị: Giày có sẵn, thời gian chuẩn bị hàng và
                  gửi hàng nhanh nhất.
                </li>
                <li>
                  Chính sách đổi trả miễn phí khi giày không giống hình, nhầm
                  mẫu, số lượng, giày thể thao sneaker nam nữ bị lỗi.
                </li>
                <li>
                  Click đặt hàng ngay để sở hữu cho mình đôi Giày Thể Thao Nam
                  Nữ - Giày Full Box Bill này trong thời gian còn khuyến mãi
                  nhé!
                </li>
              </ul>
            </p>

            <div className="product_meta">
              <div className="posted_in flex">
                <p>Loại:</p>
                <p rel="tag">{product.category}</p>
              </div>
              <br />
              <span className="tagged_as">
                <strong>Tags: </strong>
                <a rel="tag" href="#/">
                  nam,
                </a>

                <a rel="tag" href="#/">
                  nữ
                </a>
              </span>
            </div>
            <div className="m-bot15">
              <strong>Giá : </strong>
              {/* <span className="amount-old">$1.200.000</span> */}
              <span className="pro-price"> {VND.format(product?.price)}</span>
            </div>

            <br />
            <p>
              <button
                className="btn btn-round btn-danger bg-rose-700"
                type="button"
                onClick={ handleAddToCart}

              >
                <i className="fa fa-shopping-cart"></i> Add to Cart
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
