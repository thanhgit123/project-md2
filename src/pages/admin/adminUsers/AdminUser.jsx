import axios from "axios";
import React, { useEffect, useState } from "react";
import "./AdminUser.scss";
export default function AdminUser() {
  const [users, setUsers] = useState([]);
  const [flag, setFlag] = useState(true);
  const handleGetData = async () => {
    const response = await axios.get("http://localhost:8099/users");
    setUsers(response.data);
  };
  useEffect(() => {
    handleGetData();
  },[flag]);

  // khoa tai khoan
  const handleChangeStatus = async (item) => {
    await axios.put(`http://localhost:8099/users/${item.id}`, {
      ...item,
      status: !item.status,
    });
    setFlag(!flag);
  };

 
  return (
    <>
      <h1 className="text-center text-3xl text-black ">Quản lý người dùng</h1>
      <div className="tableContainer">
        <table className="tableUser  ">
          <tr className="trUser">
            <th>STT</th>
            <th>Email</th>
            <th>Tên người dùng</th>
            <th>Trạng thái</th>
            <th>Tính năng</th>
          </tr>
          {users.map((item, index) => {
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.email}</td>
                <td>{item.username}</td>
                <td>{item.status ? "Hoạt động" : "Khóa"}</td>
                <td>
                  {" "}
                  <button
                    className="bg-rose-200 w-[80px] rounded-5 hover:bg-blue-300 "
                    onClick={() => handleChangeStatus(item)}
                  >
                    {item.status ? "Khóa" : "Mở"}
                  </button>{" "}
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
}
