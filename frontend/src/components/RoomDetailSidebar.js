import React, { useEffect, useState } from "react";
import sale from "../assets/img/blog/sidebar-add.jpg";
import CategoryList from "./CategoryList";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";
import displayLKRCurrency from "../helpers/displayCurrency";

const RoomDetailsSidebar = (RoomId) => {
  const [data, setData] = useState({
    Roomnumber : "",
    category : "",
    type : "",
    airconditioning : "",
    beds : "",
    RoomImage : [],
    status : ""
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  console.log("id", params);
  const fetchRoomDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.Room_details.url, {
      method: SummaryApi.Room_details.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataReponse = await response.json();

    setData(dataReponse?.data);
  };
  console.log("data", data);
  useEffect(() => {
    fetchRoomDetails();
  }, []);
  return (
    <div className="col-lg-3">
      <aside>
        {/* Single sidebar widget */}
        <div className="single-sidebar-widget mb-60">
          <div
            className="sider-add-inner"
            style={{ backgroundImage: `url(${sale})` }}
          >
            <div className="sidebar-add-text">
              <h2 className="h1 pt-0">{data.discount}%</h2>
              <h3 className="pl-3"> off</h3>
              <div className="text-lg pb-3 text-white text-ellipsis line-clamp-7">
                {data.title}
              </div>
              <div className="hover:text-black transform-none">
                {displayLKRCurrency(data.price)}
              </div>

              <a href=" " className="btn btn-line">
                {" "}
                Booking Now
              </a>
            </div>
          </div>
        </div>
        {/* End of Single sidebar widget */}

        {/* Single sidebar widget */}
        <div className="single-sidebar-widget mb-60">
          <div className="sidebar-social-area">
            <ul className="list-unstyled mb-0">
              {/* single social icon */}
              <li>
                <a href="#">
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              {/* End of single social icon */}

              {/* single social icon */}
              <li>
                <a href="#">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              {/* End of single social icon */}

              {/* single social icon */}
              <li>
                <a href="#">
                  <i className="fa fa-pinterest"></i>
                </a>
              </li>
              {/* End of single social icon */}

              {/* single social icon */}
              <li>
                <a href="#">
                  <i className="fa fa-instagram"></i>
                </a>
              </li>
              {/* End of single social icon */}

              {/* single social icon */}

              {/* End of single social icon */}
            </ul>
          </div>
        </div>
        {/* End of Single sidebar widget */}

        {/* Single sidebar widget */}
        <div className="single-sidebar-widget mb-60">
          {/* widget title */}
          <div className="widget-title">
            <h4>Stay Tuned</h4>
          </div>
          {/* End of widget title */}
          <p>will give you a complete account of the system of the truth.</p>
          <div className="stay-form sidebar-stay-form parsley-validate">
            <form action="#" method="post">
              <input
                type="Email"
                placeholder="Your Email Here"
                className="theme-input-style"
                required
              />
              <button type="submit">
                <i className="fa fa-paper-plane-o"></i>
              </button>
            </form>
          </div>
        </div>
        {/* End of Single sidebar widget */}

        {/* Single sidebar widget */}
        <CategoryList />
        {/* End of Single sidebar widget */}
      </aside>
    </div>
  );
};

export default RoomDetailsSidebar;
