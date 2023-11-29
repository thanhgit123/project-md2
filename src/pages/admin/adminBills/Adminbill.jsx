import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

export default function adminBill() {
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
  const handleAccept = async (id, status) => {
    await axios.patch(`http://localhost:8099/bills`, { status: status });
    setFlag(!flag);
  };

  const handleRefuse = async (id, status) => {
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
          <p className="text-center text-3xl ml-11">Quản lý đơn hàng</p>
          <div className="col-md-5 w-[1290px] mt-11 h-[100%] ml-[190px] ">
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
                      <td className="flex flex-col items-center justify-around ]">
                        <Button
                          className="bg-sky-500  hover:text-black hover:bg-green-300 w-[98px] rounded-2  "
                          onClick={() => handleAccept(item.id, "Đã duyệt")}
                        >
                          Duyệt
                        </Button>
                        <Button
                          className="bg-sky-500  hover:text-black  hover:bg-green-300  rounded-2 mt-2 "
                          onClick={() => handleRefuse(item.id, "Từ chối")}
                        >
                          Từ chối
                        </Button>
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

      <br />
    </>
  );
}
