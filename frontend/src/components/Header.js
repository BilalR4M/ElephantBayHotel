import React, { useState } from "react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/font-awesome.min.css";
import "../assets/plugins/owl-carousel/owl.carousel.min.css";
import "../assets/plugins/Magnific-Popup/magnific-popup.css";
import "../assets/plugins/animate-css/animate.min.css";
import "../assets/plugins/swiper/swiper.min.css";
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import "../assets/css/custom.css";
import "../assets/css/Navbar.css";
import logo2 from "../assets/img/logo2.png";
import { FaRegUserCircle } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/usersSlice";
import ROLE from "../common/role";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  //console.log("user header", user);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const fetchData = await fetch(summaryApi.logout_user.url, {
      method: summaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 1150) {
      setShowMenu(false);
    }
  };

  return (
      <header className="header h-20 shadow-md bg-white fixed w-full z-40">
        <nav className="nav container mx-auto h-full min-w-full flex items-center px-5">
          <div className="-ml-12 -mt-20">
            <Link to={"/"}>
              <img
                className="w-72 max-w-max "
                src={logo2}
                data-rjs="2"
                alt="ecommerce"
              />
            </Link>
          </div>

          <div
            className={`nav__menu ${showMenu ? "show-menu" : ""}`}
            id="nav-menu"
          >
            <ul className="nav__list -mt-6">
              <div className="header-menu">
                <ul>
                  <li onClick={closeMenuOnMobile} className="active">
                    <Link to={"/"} className="cursor-pointer">
                      Home
                    </Link>
                  </li>
                  <li onClick={closeMenuOnMobile}>
                    <Link to={"/rooms"} className="cursor-pointer">
                      Room
                    </Link>
                  </li>
                  <li onClick={closeMenuOnMobile}>
                    <Link to={"/mainevents"} className="cursor-pointer">
                      Event
                    </Link>
                  </li>
                  <li onClick={closeMenuOnMobile} >
                    <Link to={"/offers"} className="cursor-pointer">
                      Offers
                    </Link>
                  </li>
                  <li onClick={closeMenuOnMobile}>
                    <Link to={"/"} className="cursor-pointer">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-12 col-sm-12 col-md-3 top-order">
                <div className="modal-menu-container">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <div className="relative flex justify-center">
                        {user?._id && (
                          <div
                            className=" text-black text-4xl cursor-pointer relative flex justify-center"
                            onClick={() => setMenuDisplay((preve) => !preve)}
                          >
                            {user?.profilepic ? (
                              <img
                                src={user?.profilepic}
                                className="w-10 h-10 rounded-full"
                                alt={user?.name}
                              />
                            ) : (
                              <FaRegUserCircle />
                            )}
                          </div>
                        )}
                      </div>
                      {menuDisplay && (
                        <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded opacity-60">
                          <nav>
                            {user?.role === ROLE.ADMIN && (
                              <Link
                                to={"/admin/default"}
                                className="whitespace-nowrap hidden md:block hover:text-black p-2"
                                onClick={() => setMenuDisplay((prev) => !prev)}
                              >
                                Dashboard
                              </Link>
                            )}
                            {user?.role === ROLE.ADMIN && (
                              <Link
                                to={"admin-panel/all-Rooms"}
                                className="whitespace-nowrap hidden md:block hover:text-black p-2"
                                onClick={() => setMenuDisplay((prev) => !prev)}
                              >
                                Manager
                              </Link>
                            )}
                          </nav>
                        </div>
                      )}
                    </li>
                    <li>
                      <div className="text-3xl relative" title="Cart list">
                        <span className="text-black cursor-pointer">
                          <MdShoppingCart />
                        </span>
                        <div className="bg-red-700 text-yellow-50 w-5 h-5 rounded-full p-0 flex justify-center absolute -top-2 -right-1">
                          <p className="text-sm">0</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div>
                        {user?._id ? (
                          <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-black text-white rounded-sm hover:bg-neutral-800 scale-110 "
                          >
                            Logout
                          </button>
                        ) : (
                          <Link
                            to={"/login"}
                            className="px-4 py-3.5 bg-black text-white rounded-sm hover:bg-neutral-800 scale-110 "
                            title="Login"
                          >
                            Login
                          </Link>
                        )}
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </ul>
            <div className="nav__close" id="nav-close" onClick={toggleMenu}>
              <IoClose />
            </div>
          </div>

          <div
            className="nav__toggle -mt-20"
            id="nav-toggle"
            onClick={toggleMenu}
          >
            <IoMenu />
          </div>
        </nav>
      </header>
  );
};

export default Header;
