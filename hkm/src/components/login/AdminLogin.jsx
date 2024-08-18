import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../slices/adminSlice";
import "./style.css";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.admin.logindetails.isLogin);
  const [message, setMessage] = useState("");
  const [adminData, setAdminData] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/v1/adminlogin", adminData);
      if (response.statusText === "OK" && response.data.adminlogin) {
        dispatch(adminLogin(response.data));
        navigate("/dashboard/setemployee");
      } else {
        if (response.data.message.length > 0) {
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setMessage(response.data.message);
        }
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Something went wrong");
    }
  };

  if (isLogin) {
    // You can add any additional logic here for when the user is already logged in
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ fontSize: "1.8rem", width: "40rem", padding: "0 2rem" }}
      />

      <div className="login-container">
        <div className="login-box">
          <div className="login-box-container">
            <h1>Manager Login</h1>
            <div className="login-input-container">
              <input
                type="email"
                placeholder="Email or Phone"
                name="email"
                value={adminData.email}
                onChange={handleInput}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={adminData.password}
                onChange={handleInput}
                pattern="[a-zA-Z0-9]+"
                title="Only alphanumeric characters are allowed"
                required
              />
            </div>
            <button className="primary-button" onClick={login}>
              Log In
            </button>
            <button
              className="primary-button empbtn"
              onClick={() => {
                navigate("employee");
              }}
            >
              Employee Login
            </button>
            <p>
              <span style={{ color: "gray" }}> </span>{" "}
              <Link to={"/"} style={{ fontWeight: 300, color: "#fff" }}>
                forgot password
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
