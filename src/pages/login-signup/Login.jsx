import React, { useEffect, useState } from "react";
import "./Login.scss";
import api from "../../service/apis/api.user";
import { success, failed } from "../../utils/notify";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [isLoginFormVisible, setLoginFormVisible] = useState(true);
  const handleLoginClick = () => {
    setLoginFormVisible(true);
  };
  const handleSignupClick = () => {
    setLoginFormVisible(false);
  };
 

  // register
  const [registerUser, setRegisterUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleGetValue = (e) => {
    setRegisterUser({ ...registerUser, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
      // validate
      const regexName = /^.{4,}$/;
      const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const regexPass = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

      if (
        !registerUser.username ||
        !registerUser.password ||
        !registerUser.email 
    ) {
        failed("Không Được Để Trống");
        return;
    }
      if (!regexName.test(registerUser.username)) {
        failed("Tên phải có tối thiểu 5 ký tự");
        return;
      }
      if (!regexPass.test(registerUser.password)) {
        failed("Mật khẩu phải có chữ cái viết hoa và số ");
        return
      }

    api.checkRegister(registerUser.email).then((res) => {
      if (res.data.length != 0) {
        failed("Email đã tồn tại");
        return;
      }
      api.register({
        ...registerUser,
        cart: [],
      });
      success("Đăng kí thành công");
      setRegisterUser({
        username: "",
        email: "",
        password: "",
      });
    });
  
  };

  // login
  const navigate = useNavigate()
      const [loginUser,setLoginUser]= useState({
        email:"",
        password:"",
      })

      const handleChange=(e)=>{
        const {name,value} = e.target;
        setLoginUser({
          ...loginUser,[name]:value
        })
      }
      const handleLogin= async()=>{
   

        if (
          !loginUser.password ||
          !loginUser.email 
          ) {
        failed("Không Được Để Trống");
        return;
         }
        api.checkLogin(loginUser.email,loginUser.password).then((res) => {
          if (res.data.length != 0) {
            success ("Đăng nhâp thành công");
            navigate("/")
          }else{
             failed("Tài khoản không hợp lệ");
          }   
        });    
      }

  return (
    <>
      <div className="bigDiv">
        <div className="signUpContainer">
          <div
            className={`form-structor ${isLoginFormVisible ? "" : "slide-up"}`}
          >
            <div className="signup">
              <h2 className="form-title" id="signup" onClick={handleLoginClick}>
                <span>or</span>Sign Up
              </h2>
              <div className="form-holder">
                <input
                  type="text"
                  className="input"
                  placeholder="Name"
                  onChange={handleGetValue}
                  name="username"
                  value={registerUser.username}
                />
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  onChange={handleGetValue}
                  name="email"
                  value={registerUser.email}
                />
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  onChange={handleGetValue}
                  name="password"
                  value={registerUser.password}
                />
              </div>
              <button className="submit-btn" onClick={handleRegister}>
                Sign up
              </button>
            </div>

            {/* login */}

            <div className={`login ${isLoginFormVisible ? "slide-up" : ""}`}>
              <div className="center">
                <h2
                  className="form-title"
                  id="login"
                  onClick={handleSignupClick}
                >
                  <span>or</span>Log In
                </h2>
                <div className="form-holder">
                  <input
                    type="email"
                    className="input"
                    placeholder="Email"
                    onChange={handleChange}
                    name="email"
                  />
                  <input
                    type="password"
                    className="input"
                    placeholder="Password"
                    onChange={handleChange}
                    name="password"
                  />
                </div>
                <button className="submit-btn" onClick={handleLogin} >Log in</button>
              </div>
            </div>
          </div>
        </div>

        <div className="switchContainer">
          <div className="questionLogin">
            {isLoginFormVisible ? (
              <p>
                Already have an account? {"  "}
                <span className="switchLink" onClick={handleSignupClick}>
                  Log In
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span className="switchLink" onClick={handleLoginClick}>
                  Sign Up
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

