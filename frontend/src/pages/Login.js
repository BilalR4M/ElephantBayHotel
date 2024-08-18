import React, { useContext, useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import summaryApi from "../common";
import profilepic from "../assets/img/signin.gif";
import "../assets/css/font-awesome.min.css";
import "../assets/plugins/owl-carousel/owl.carousel.min.css";
import "../assets/plugins/Magnific-Popup/magnific-popup.css";
import "../assets/plugins/animate-css/animate.min.css";
import "../assets/plugins/swiper/swiper.min.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import "../assets/css/custom.css";
import context from "../context";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(summaryApi.signIn.url, {
      method: summaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <div>
      <Header />
      <section className="page-title-inner pt-6">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="page-title-wrap">
                <div className="page-title-heading">
                  <h1 className="h2">
                    My Account<span>Profile</span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pt-0 pb-">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="login-register-wrap text-center main-log-regi">
                <div className="login-register-nav ">
                  <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
                    <div>
                      <img src={profilepic} alt="profile" />
                    </div>
                    <form>
                      <label>
                        <div className="text-xs font-bold text-red-700 bg-opacity-80 bg-slate-200 pd-2 pt-2  top-11 cursor-pointer text-center absolute bottom-0 w-full  left-0">
                          Image
                        </div>
                        <input type="file" className="hidden" />
                      </label>
                    </form>
                  </div>
                  <nav className="nav lr-nav text-center">
                    <Link
                      to={"/login"}
                      id="nav-login-tab2"
                      data-toggle="tab"
                      className="active"
                    >
                      Log In
                    </Link>
                    <Link
                      to={"/signup"}
                      id="nav-register-tab2"
                      data-toggle="tab"
                    >
                      Register
                    </Link>
                  </nav>
                </div>

                <div className="login-register-content tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="login2"
                    role="tabpanel"
                    aria-labelledby="nav-login-tab2"
                  >
                    <div className="primary-form parsley-validate">
                      <form onSubmit={handleSubmit}>
                        <div className="email-input input-field">
                          <label>
                            <FaUser />
                          </label>
                          <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={data.email}
                            onChange={handleOnChange}
                            className="theme-input-style"
                            required
                          />
                        </div>
                        <div>
                          <div className="password-input input-field">
                            <label>
                              <FaLock />
                            </label>
                            <input
                              type="password"
                              placeholder="password"
                              name="password"
                              value={data.password}
                              onChange={handleOnChange}
                              className="theme-input-style"
                              required
                            />
                          </div>
                          <Link
                            to={"/forgot-password"}
                            className="-my-9 block w-fit ml-auto hover:underline hover:text-red-500"
                          >
                            Forget password
                          </Link>
                        </div>
                        <button
                          type="submit"
                          className="my-20 btn btn-fill-type"
                        >
                          LogIn
                        </button>
                      </form>
                      <p>
                        Don’t have an account,
                        <Link to={"/signup"}>Register now!</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
