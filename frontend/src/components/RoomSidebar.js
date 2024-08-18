import React, { useState } from "react";
import CategoryList from "./CategoryList";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

const RoomSidebar = () => {
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log("Search value:", search);
    if (search) {
      navigate(`/searchRooms?q=${search}`);
    } else {
      navigate("/searchRooms");
    }
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
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
            <h4>Popular Posts</h4>
          </div>
          {/* End of widget title */}
          <div className="popular-post">
            <ul className="list-unstyled mb-0">
              {/* single popular post */}
              <li>
                <h5>
                  <a href="#">
                    No one rejects, dislikes, or avoids pleasure itself
                  </a>
                </h5>
                <p>
                  by. <a href="#">Puchka Bolle</a>
                </p>
              </li>
              {/* End of single popular post */}

              {/* single popular post */}
              <li>
                <h5>
                  <a href="#">
                    Nor again is there anyone who does loves or pursues desires.
                  </a>
                </h5>
                <p>
                  by. <a href="#">Puchka Bolle</a>
                </p>
              </li>
              {/* End of single popular post */}

              {/* single popular post */}
              <li>
                <h5>
                  <a href="#">who are beguiled and demoralizedlf</a>
                </h5>
                <p>
                  by. <a href="#">Puchka Bolle</a>
                </p>
              </li>
              {/* End of single popular post */}

              {/* single popular post */}
              <li>
                <h5>
                  <a href="#">The pain trouble bound to ensue</a>
                </h5>
                <p>
                  by. <a href="#">Puchka Bolle</a>
                </p>
              </li>
              {/* End of single popular post */}
            </ul>
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

export default RoomSidebar;
