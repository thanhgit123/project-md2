import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

export default function Checkout() {
  const [getDataBill, setGetDataBill] = useState([]);
  const handleGetDataBill = async () => {
    const response = await axios.get("http://localhost:8099/bills");
    setGetDataBill(response.data);
  };
  useEffect(() => {
    handleGetDataBill();
  }, []);
  // tien te
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  
  const [lgShow, setLgShow] = useState(false);
  const [detailInf, setDetailInf] = useState([]);
  const handleShow = (item) => {
    setLgShow(true);
    setDetailInf(item);
  };

  const [flag, setFlag] = useState(true);
  const handleStatusChange = (id, status) => {
    let confirm = window.confirm("Bạn muốn hủy đơn?");
    if (confirm) {
      axios.patch(`http://localhost:8099/bills/${id}`, { status: status });
      setFlag(!flag);
    }
  };
  useEffect(() => {
    handleGetDataBill();
  }, [flag]);
  return (
    <>
      <div className="h-[100vh]">
        <div className="row mt-7 ml-6">
          {/* <div className="col-md-7 w-[700px] ">
            <div className="card">
              <div className="card-header">
                <h4>Thông tin khách hàng</h4>
              </div>
              <div className="card-body ">
                <div className="row ">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> Họ</label>
                      <input
                        type="text"
                        name="firstname"
                        className="form-control"
                      />
                      <small className="text-danger"></small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> Tên</label>
                      <input
                        type="text"
                        name="lastname"
                        className="form-control"
                      />
                      <small className="text-danger"></small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> Số điện thoại</label>
                      <input
                        type="number"
                        name="phone"
                        className="form-control"
                      />
                      <small className="text-danger"></small>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label> Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                      />
                      <small className="text-danger"></small>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-3">
                      <label>Địa chỉ thường trú</label>
                      <textarea
                        rows="3"
                        name="address"
                        className="form-control"
                      ></textarea>
                      <small className="text-danger"></small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>Thành phố</label>
                      <input type="text" name="city" className="form-control" />
                      <small className="text-danger"></small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>Huyện</label>
                      <input
                        type="text"
                        name="state"
                        className="form-control"
                      />
                      <small className="text-danger"></small>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group mb-3">
                      <label>Mã Zip</label>
                      <input
                        type="text"
                        name="zipcode"
                        className="form-control"
                      />
                      <small className="text-danger"></small>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group text-end">
                      <button
                        type="button"
                        className="btn btn-primary mx-1 bg-blue-500"
                      >
                        Đặt hàng
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <Link to="/listProduct" className="text-2xl  ">Mua lại</Link>

          <div className="col-md-5 w-[1480px] mt-11 h-[100%] ">
            <table className="table table-bordered border border-red-600">
              <thead>
                <tr>
                  <th>Stt</th>
                  <th>Sản phẩm</th>
                  <th>Thông tin người mua</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                  <th>Hủy Đơn</th>
                </tr>
              </thead>

              {getDataBill.map((item, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        <Button
                          onClick={() => handleShow(item.detailOrder)}
                          className="bg-sky-500  hover:text-black hover:bg-green-300  "
                        >
                          Chi tiết sản phẩm
                        </Button>
                      </td>
                      <td>
                        Địa chỉ: {item.addressBill}
                        <br />
                        Sdt: {item.phoneBill}
                      </td>
                      <td>{VND.format(item.total)}</td>
                      <td>
                        {item.status === "Chờ xác nhận" ? (
                          <span>Chờ xác nhận</span>
                        ) : item.status === "Đã duyệt" ? (
                          <span>Đã duyệt</span>
                        ) : (
                          <span>Từ chối</span>
                        )}
                      </td>
                      <td>
                        {item.status === "Chờ xác nhận" ? (
                          <button
                            className="bg-sky-500 w-[80px] rounded-2  hover:bg-green-300 text-white "
                            onClick={() => handleStatusChange(item.id, "Hủy")}
                          >
                            Hủy Đơn
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>

      <Modal
        size="xl"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton className="bg-black text-white">
          <Modal.Title id="example-modal-sizes-title-lg">
            Chi tiết sản phẩm
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Ảnh</th>
                <th>Tên</th>
                <th>Loại</th>
                <th>Giá</th>
                <th>Số lượng</th>
              </tr>
            </thead>

            {detailInf.map((item, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.image}
                        alt=""
                        className="w-[100px] ml-[80px]"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{VND.format(item.price)}</td>
                    <td>{item.quantity}</td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
        </Modal.Body>
      </Modal>
      {/* <div>
        <div
          className="modal fade"
          id="payOnlineModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Online Payment Mode
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <hr />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <br />
    </>
  );
}
