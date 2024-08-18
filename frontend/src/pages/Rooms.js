import React from "react";
import bg from "../assets/img/pattern2.png";
// import CategoryList from "../components/CategoryList";
import AllRoomCategory from "../components/AllRoomCategory";
import RoomSidebar from "../components/RoomSidebar";
import Header from "components/Header";
import Footer from "components/Footer";

const Rooms = () => {
  return (
    <>
    <Header/>
    <div>
      <section className="page-title-inner" data-bg-img={bg}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* page title inner */}
              <div className="page-title-wrap">
                <div className="page-title-heading">
                  <h1 className="h2">
                    Limited<span>rooms</span>
                  </h1>
                </div>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href=" ">home</a>
                  </li>
                  <li className="active">
                    <a href=" ">Rooms</a>
                  </li>
                </ul>
              </div>
              {/* End of page title inner */}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-12">
                  <AllRoomCategory />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  {/* blog pagination */}
                  <div className="blog-pagination-wrap">
                    <ul className="pagination blog-pagination list-unstyled">
                      <li className="disabled">
                        <a href=" ">
                          <i className="fa fa-angle-left"></i>
                        </a>
                      </li>
                      <li>
                        <a href=" ">01</a>
                      </li>
                      <li className="active">
                        <a href=" ">02</a>
                      </li>
                      <li>
                        <a href=" ">03</a>
                      </li>
                      <li>
                        <a href=" ">04</a>
                      </li>
                      <li>
                        <a href=" ">
                          <i className="fa fa-angle-right"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                  {/* End of blog pagination */}
                </div>
              </div>
            </div>
            <RoomSidebar/>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
};

export default Rooms;
