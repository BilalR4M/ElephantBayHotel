import React, { useState } from "react";
import "../assets/css/font-awesome.min.css";
import "../assets/plugins/owl-carousel/owl.carousel.min.css";
import "../assets/plugins/Magnific-Popup/magnific-popup.css";
import "../assets/plugins/animate-css/animate.min.css";
import "../assets/plugins/swiper/swiper.min.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import "../assets/css/custom.css";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import pic from "../assets/img/signin.gif";
import { Link, useNavigate } from "react-router-dom";
import ImageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common/index";
import { toast } from "react-toastify";
import Header from "../components/Header";

const Signup = () => {
  //const [showPassword,setShowPassword] = useState(false)
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmpassword: "",
    profilepic: "",
  });
  const navigate = useNavigate();

  const handleoneChangr = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await ImageTobase64(file);
    setData((preve) => {
      return {
        ...preve,
        profilepic: imagePic,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmpassword) {
      const dataResponse = await fetch(SummaryApi.signUp.url, {
        method: SummaryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      }

      if (dataApi.error) {
        toast.error(dataApi.message);
      }

      console.log("data", dataApi);
    } else {
      toast.error("check password and confirm password");
    }
  };

  console.log("data login", data);
  return (
    <div>
      <Header />
      <section className="page-title-inner pt-6">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* page title inner */}
              <div className="page-title-wrap">
                <div className="page-title-heading">
                  <h1 className="h2">
                    My Account<span>Profile</span>
                  </h1>
                </div>
              </div>
              {/* End of page title inner */}
            </div>
          </div>
        </div>
      </section>
      <section className="pt-0 pb-0">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              {/* login register */}
              <div className="login-register-wrap text-center main-log-regi">
                {/* login register nav */}
                <div className="login-register-nav flex flex-col gap-5">
                  <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
                    <img src={data.profilepic || pic} alt="profile" />
                    <form>
                      <label>
                        <div className="text-xs font-bold text-red-700 bg-opacity-80 bg-slate-200 pb-4 pt-2 top-11 cursor-pointer text-center absolute bottom-0 w-full  left-0">
                          Image
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          onChange={handleUploadPic}
                        />
                      </label>
                    </form>
                  </div>
                  <nav className="nav lr-nav text-center">
                    <Link to={"/login"} id="nav-login-tab2" data-toggle="tab">
                      Log In
                    </Link>
                    <Link
                      to={"/signup"}
                      id="nav-register-tab2"
                      data-toggle="tab"
                      className="active"
                    >
                      Register
                    </Link>
                  </nav>
                </div>
                {/* End of login register nav */}

                {/* login register content */}
                <div className="login-register-content tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="reg2"
                    role="tabpanel"
                    aria-labelledby="nav-register-tab2"
                  >
                    <div className="primary-form parsley-validate">
                      <form onSubmit={handleSubmit}>
                        <div className="email-input input-field">
                          <label>
                            <FaUser />
                          </label>
                          <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={data.name}
                            onChange={handleoneChangr}
                            className="theme-input-style"
                            required
                          />
                        </div>

                        <div className="email-input input-field">
                          <label>
                            <FaUser />
                          </label>
                          <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={data.email}
                            onChange={handleoneChangr}
                            className="theme-input-style"
                            required
                          />
                        </div>

                        <div className="password-input input-field">
                          <label>
                            <FaLock />
                          </label>
                          <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={data.password}
                            onChange={handleoneChangr}
                            className="theme-input-style"
                            required
                          />
                        </div>

                        <div className="password-input input-field">
                          <label>
                            <FaLock />
                          </label>
                          <input
                            type="password"
                            placeholder="Confirm password"
                            name="confirmpassword"
                            value={data.confirmpassword}
                            onChange={handleoneChangr}
                            className="theme-input-style"
                            required
                          />
                        </div>

                        <button className="btn btn-fill-type">Signup</button>
                      </form>
                      <p>
                        Have an account,<Link to={"/login"}>Log In now!</Link>
                      </p>
                    </div>
                  </div>
                </div>
                {/* End of login register content */}
              </div>
              {/* End of login register */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
