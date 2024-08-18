import React, { useEffect, useState } from "react";
import sale from "../assets/img/blog/sidebar-add.jpg";
import CategoryList from "./CategoryList";
import { Link, useParams } from "react-router-dom";
import SummaryApi from "../common";
import displayLKRCurrency from "../helpers/displayCurrency";
const PackageDetailsSidebar = (packageID) => {
  const [data, setData] = useState({
    packtName: "",
    title: "",
    description: "",
    category: "",
    packImage: [],
    price: "",
    discount: "",
    endDate: "",
  });
  const params = useParams();
  const [loading, setLoading] = useState(true);
  console.log("id", params);
  const fetchPackDetails = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.package_details.url, {
      method: SummaryApi.package_details.method,
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
    fetchPackDetails();
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
              <div className="text-slate-300 hover:text-green-400 transform-none">
                {displayLKRCurrency(data.price)}
              </div>

              <div className="btn btn-line">
                <Link to={"/booking/" + data._id}>Booking Now</Link>
              </div>
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
          <p>JOIN Elephantbay INSIDER AND SAVE 30%.</p>
          <div className="stay-form sidebar-stay-form parsley-validate">
            <form>
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

export default PackageDetailsSidebar;
