import React, { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate, Link } from "react-router-dom";
import SummaryApi from "../common";
import STATUS from "../common/status";
const PackageSidebar = () => {
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Search value:", search);
    if (search) {
      navigate(`/search?q=${search}`);
    } else {
      navigate("/search");
    }
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  //Display Popular Packages
  const [allPackage, setAllPackage] = useState([]);
  const fetchAllPackage = async () => {
    try {
      const response = await fetch(SummaryApi.allPackage.url);
      const dataResponse = await response.json();
      console.log("package data", dataResponse);
      setAllPackage(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching all packages:", error);
    }
  };

  useEffect(() => {
    fetchAllPackage();
  }, []);

  // Filter active packages and get first two
  const popularPackages = allPackage
    .filter((pack) => pack?.status === STATUS.Active)
    .slice(0, 3);

  //email form
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can perform any necessary validation or processing of the email

    // Navigate to the "/send-email" route and pass the email as state
    navigate("/send-email", { state: { email } });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="col-lg-3">
      <aside>
        {/* Single sidebar widget */}
        <div className="single-sidebar-widget mb-60">
          <div className="search-form sidebar-search-form parsley-validate">
            <form onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search Here"
                className="theme-input-style"
                onChange={handleInputChange}
                required
              />
              <button className="text-lg" type="submit" value={search}>
                <IoSearch />
              </button>
            </form>
          </div>
        </div>
        {/* End of Single sidebar widget */}

        {/* Single sidebar widget */}
        <div className="single-sidebar-widget mb-60">
          {/* widget title */}
          <div className="widget-title">
            <h4>Popular Packages</h4>
          </div>
          {/* End of widget title */}

          <div className="popular-post">
            {popularPackages.map((pack, index) => {
              if (pack?.status === STATUS.Active) {
                return (
                  <ul className="list-unstyled mb-0" key={index}>
                    {/* single popular post */}
                    <Link to={"package-details/" + pack._id}>
                      <li>
                        <h5 className="text-ellipsis line-clamp-3">
                          <a href=" ">{pack?.description}</a>
                        </h5>
                        <p className="text-black capitalize  hover:text-slate-600">
                          by.{pack?.packtName}
                        </p>
                      </li>
                    </Link>
                    {/* End of single popular post */}
                  </ul>
                );
              }
              return null; // or any other fallback if needed
            })}
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
            </ul>
          </div>
        </div>
        {/* End of Single sidebar widget */}

        {/* Single sidebar widget */}
        <div className="single-sidebar-widget mb-60">
          {/* widget title */}
          <div className="widget-title">
            <h4>ElephantBay INSIDER</h4>
          </div>
          {/* End of widget title */}
          <p>JOIN Elephantbay INSIDER AND SAVE 30%.</p>
          <div className="stay-form sidebar-stay-form parsley-validate">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="theme-input-style"
                placeholder="your email here"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <button type="submit">
                <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
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

export default PackageSidebar;
