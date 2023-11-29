import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(user);
    return user?.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default Private;