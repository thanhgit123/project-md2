import React, { useEffect, useState } from "react";
import "./AdminProduct.scss";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../config/firebase";
import confirm from "antd/es/modal/confirm";

export default function AdminProduct() {
  const [getCategory, setGetCategory] = useState([]);
  const [listProduct, setListProduct] = useState([]);

  // chuyen doi tien te
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // upload img
  const [imageUpload, setImageUpload] = useState(null);
  const [urlImage, setUrlImage] = useState(null);

  const changeImage = (e) => {
    let file = e.target.files[0];
    setImageUpload(file);
    const reader = new FileReader();
    reader.onload = () => {
      setUrlImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // lay data tu api
  const handleGetCategory = async () => {
    const response = await axios.get("http://localhost:8099/category");
    setGetCategory(response.data);
  };

  const handleGetProduct = async () => {
    const res = await axios.get("http://localhost:8099/listProduct");
    setListProduct(res.data);
  };
  useEffect(() => {
    handleGetCategory();
    handleGetProduct();
  }, []);

  // lay data tu o input
  const [inputData, setInputData] = useState({
    id: "",
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: "",
  });
  const handleGetValue = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  // xu ly them san pham
  const handleAddProduct = async () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        const response = await axios.post("http://localhost:8099/listProduct", {
          ...inputData,
          image: url,
          stock: 20,
        });
        setListProduct((data) => [...data, response.data]);
        setInputData({
          name: "",
          category: "",
          price: "",
          quantity: "",
          image: "",
        });
        setImageUpload(null);
        setUrlImage(null);
      });
    });
  };

  // bans san pham
  const [edit, setEdit] = useState(false);
  const handleEditProduct = (product) => {
    setInputData(product);
    setEdit(true);
    setUrlImage(product.image);
  };

  const handleEdit = async () => {
    // xu ly
    let newProduct = { ...inputData };
    if (imageUpload) {
      const imageRef = ref(storage, `images/${imageUpload.name}`);
      await uploadBytes(imageRef, imageUpload);
      const url = await getDownloadURL(imageRef);
      newProduct.image = url;
    }
    // Gửi yêu cầu PUT
    const response = await axios.put(
      `http://localhost:8099/listProduct/${newProduct.id}`,
      newProduct
    );

    // Cập nhật state
    setListProduct((data) =>
      data.map((item) => (item.id === newProduct.id ? response.data : item))
    );
    setInputData({
      name: "",
      category: "",
      price: "",
      quantity: "",
      image: "",
    });
    setImageUpload(null);
    setUrlImage(null);
    setEdit(false);
  };

  // xoa\
  const [flag, setFlag] = useState(true);
  const handleDeleteProduct = async (id) => {
    let confirm = window.confirm("Xác nhận xóa ?");
    if (confirm) {
      await axios.delete(`http://localhost:8099/listProduct/${id}`);
      setFlag(!flag);
      setListProduct((data) => data.filter((item) => item.id !== id));
    }
  };

  return (
    <>
      <div className="ml-[230px]   ">
        <div className=" ">
          <div className="p-1 g-col-4  card shadow border-0 px-2 w-[900px] ">
            <div className="card-header ml-7 text-2xl text-rose-600">
              <h5 className="mb-0 ">Thêm sản phẩm</h5>
            </div>
            <div className=" flex justify-around">
              <div className="w-[400px] h-[360px]">
                <div className="mb-1 ">
                  <label htmlFor="name" className="form-label">
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name-product"
                    aria-describedby="emailHelp"
                    name="name"
                    value={inputData.name}
                    onChange={handleGetValue}
                  />
                </div>

                <div className="mb-1 ">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Giá
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="price"
                    name="price"
                    value={inputData.price}
                    onChange={handleGetValue}
                  />
                </div>

                <div className="mb-1 ">
                  <label className="form-label">Loại sản phẩm</label>
                  <select
                    className="form-select form-select "
                    aria-label="Large select example"
                    id="categoryId"
                    name="category"
                    value={inputData.category}
                    onChange={handleGetValue}
                  >
                    {getCategory.map((item, index) => {
                      return (
                        <option key={index} value={item.name}>
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="mb-1 ">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Số lượng
                  </label>
                  <input
                    type="text"
                    className="form-control "
                    id="stock"
                    name="quantity"
                    value={inputData.quantity}
                    onChange={handleGetValue}
                  />
                </div>

                {/* <button
                  onClick={handleAddProduct}
                  className="btn btn-primary w-[150px]  h-[40px] mt-2"
                  id="add"
                >
                  Thêm sản phẩm
                </button> */}
                <button
                  onClick={edit ? handleEdit : handleAddProduct}
                  className="btn btn-primary"
                  id="save"
                >
                  {edit ? "Sửa" : "Thêm sản phẩm"}
                </button>
              </div>

              <div className="mb-3">
                <label htmlFor="formFileSm" className="form-label">
                  Ảnh sản phẩm
                </label>
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  name="image"
                  type="file"
                  // value={inputData.image}
                  onChange={changeImage}
                />
                <img
                  id="image"
                  src={urlImage}
                  alt=""
                  width="200px"
                  height="20px"
                  className="mt-2"
                />
              </div>
            </div>
          </div>
          <br />

          <div className="card p-0 g-col-8 shadow border-0 h-[500px] w-[81vw]  ">
            <div className="card-header">
              <h5 className="mb-0 title">Danh Sách Sản Phẩm</h5>
            </div>
            <div className="table-responsive">
              <table className="table table-hover table-nowrap">
                <thead className="thead-light ">
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Loại</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {listProduct.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>
                          <img
                            src={item.image}
                            alt=""
                            className="max-w-[100px] max-h-[150px] ml-[50px]"
                          />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{VND.format(item.price)}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <button
                            className="bg-rose-400 rounded-3  text-black hover:bg-sky-400 w-[80px]"
                            // variant="contained"
                            onClick={() => handleEditProduct(item)}
                          >
                            Sửa
                          </button>
                          <br />
                          <br />
                          <button
                            className="bg-rose-400 rounded-3  text-black hover:bg-sky-400 w-[80px]"
                            variant="contained"
                            onClick={() => handleDeleteProduct(item.id)}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div id="changePage"></div>
          </div>
        </div>
      </div>
    </>
  );
}
