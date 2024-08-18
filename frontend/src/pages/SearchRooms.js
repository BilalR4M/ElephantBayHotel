import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { IoSearch } from "react-icons/io5";
import SearchHorizontalRoom from "../components/SearchHorizontalRoom";

const SearchRoom = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("query", query.search);
  const fetchProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.search_Room.url + query.search);
    const dataResponse = await response.json();
    setLoading(false);
    console.log("dataResponse", dataResponse);
    setData(dataResponse.data);
  };
  useEffect(() => {
    fetchProduct();
  }, [query]);

  //search handl
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
  //end search handl

  return (
    <div className="">
      <section className="pt-100 pb-40">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* shop toolbar wrap */}
              <div className="shop-toolbar-wrap type2">
                <div className="shop-toolbar-filter">
                  <div className="row align-items-center">
                    <div className="col-md-4 position-static">
                      <div className="search-form position-relative search-page">
                        <form onSubmit={handleSearch}>
                          <input
                            type="text"
                            placeholder="What you looking for"
                            className="theme-input-style"
                            onChange={handleInputChange}
                            required
                          />
                          <button
                            className="text-lg"
                            type="submit"
                            value={search}
                          >
                            <IoSearch />
                          </button>
                        </form>
                      </div>
                    </div>
                    <div className="col-md-8 col-lg-7 col-xl-6 offset-xl-2 offset-lg-1 position-static">
                      {/* product filter inner */}
                      <div className="product-filter-inner">
                        {/* product found */}
                        <div className="product-found product-count">
                          <span>
                            Showing 1–{data.length} of{" "}
                            {data.length} results
                          </span>
                        </div>
                        {/* End of product found */}

                        {/* product filter */}
                        <div className="product-filter catalog-filter">
                          <div className="product-filter-mobile">
                            <a href="#" className="d-lg-none d-block">
                              <i className="fa fa-sliders"></i>
                            </a>
                          </div>
                          <a
                            href="#"
                            className="d-none d-lg-block product-filter-btn"
                          >
                            <i className="fa fa-filter"></i>
                            <span>Filter</span>
                            <i className="fa fa-angle-down"></i>
                          </a>

                          {/* product filter menu */}
                          <div className="product-filter-menu">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="woocommerce-products-header">
                                  <div className="shope-filter-item">
                                    <ul>
                                      <li>
                                        <a href="#">Category by</a>
                                        <ul className="category-list">
                                          <li>
                                            <a href="#" className="active">
                                              Prints (5)
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">Illustrations (4)</a>
                                          </li>
                                          <li>
                                            <a href="#">Type (8)</a>
                                          </li>
                                          <li>
                                            <a href="#">Decoration (9)</a>
                                          </li>
                                          <li>
                                            <a href="#">Graphics (6)</a>
                                          </li>
                                          <li>
                                            <a href="#">Posters (5)</a>
                                          </li>
                                        </ul>
                                      </li>
                                      <li>
                                        <a href="#">By Price</a>
                                        <ul className="price-list">
                                          <li>
                                            <a href="#" className="active">
                                              $0.00 - $50.00
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">$51.00 - $100.00</a>
                                          </li>
                                          <li>
                                            <a href="#">$101.00 - $300.00</a>
                                          </li>
                                          <li>
                                            <a href="#">$301.00 - $800.00</a>
                                          </li>
                                          <li>
                                            <a href="#">$801.00 - $1500.00</a>
                                          </li>
                                          <li>
                                            <a href="#">$1501.00 - $3000.00</a>
                                          </li>
                                          <li>
                                            <a href="#">$3001.00 +</a>
                                          </li>
                                        </ul>
                                      </li>
                                      <li>
                                        <a href="#">By Color</a>
                                        <ul className="color-list">
                                          <li>
                                            <a
                                              href="#"
                                              className="color color1 active"
                                            ></a>
                                          </li>
                                          <li>
                                            <a
                                              href="#"
                                              className="color color2"
                                            ></a>
                                          </li>
                                          <li>
                                            <a
                                              href="#"
                                              className="color color3"
                                            ></a>
                                          </li>
                                          <li>
                                            <a
                                              href="#"
                                              className="color color4"
                                            ></a>
                                          </li>
                                          <li>
                                            <a
                                              href="#"
                                              className="color color5"
                                            ></a>
                                          </li>
                                          <li>
                                            <a
                                              href="#"
                                              className="color color6"
                                            ></a>
                                          </li>
                                          <li>
                                            <a
                                              href="#"
                                              className="color color7"
                                            ></a>
                                          </li>
                                          <li>
                                            <a
                                              href="#"
                                              className="color color8"
                                            ></a>
                                          </li>
                                          <li>
                                            <a
                                              href="#"
                                              className="color color9"
                                            ></a>
                                          </li>
                                          <li>
                                            <a
                                              href="#"
                                              className="color color10"
                                            ></a>
                                          </li>
                                        </ul>
                                      </li>
                                      <li>
                                        <a href="#">By Size</a>
                                        <ul className="size-list">
                                          <li>
                                            <a href="#" className="active">
                                              <span className="product-size">
                                                L
                                              </span>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <span className="product-size">
                                                M
                                              </span>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <span className="product-size">
                                                S
                                              </span>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <span className="product-size">
                                                30
                                              </span>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <span className="product-size">
                                                40
                                              </span>
                                            </a>
                                          </li>
                                        </ul>
                                      </li>
                                      <li>
                                        <a href="#">Tags</a>
                                        <ul className="tag-list">
                                          <li>
                                            <a href="#">bags</a>,
                                          </li>
                                          <li>
                                            <a href="#">chair</a>,
                                          </li>
                                          <li>
                                            <a href="#">clock</a>,
                                          </li>
                                          <li>
                                            <a href="#">comestic</a>,
                                          </li>
                                          <li>
                                            <a href="#">fashion</a>,
                                          </li>
                                          <li>
                                            <a href="#">furniture</a>,
                                          </li>
                                          <li>
                                            <a href="#">holder</a>,
                                          </li>
                                          <li>
                                            <a href="#">men</a>,
                                          </li>
                                          <li>
                                            <a href="#">oil</a>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* End of product filter menu */}
                        </div>
                        {/*End of product filter */}
                      </div>
                      {/* product filter inner */}
                    </div>
                  </div>
                </div>
                {loading && (
                  <p className="text-xl text-center text-slate-400 animate-pulse">
                    Loading...
                  </p>
                )}
                {data.length == 0 && !loading && (
                  <h3 className="search-input-text text-center  lato">
                    Search results for - ‘{" "}
                    <span id="search-key">Not Found...</span> ’
                  </h3>
                )}

                {data.length !== 0 && !loading && (
                  <div>
                    <div className="search-input-text text-center">
                      <h3 className="lato">
                        Search results for - ‘{search}
                        <span id="search-key"></span> ’
                      </h3>
                    </div>
                    <SearchHorizontalRoom loading={loading} data={data} />
                  </div>
                )}

                <div className="row">
                  <div className="col-12">
                    {/* blog pagination */}
                    <div className="blog-pagination-wrap">
                      <ul className="pagination blog-pagination list-unstyled">
                        <li className="disabled">
                          <a href="#">
                            <i className="fa fa-angle-left"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">01</a>
                        </li>
                        <li className="active">
                          <a href="#">02</a>
                        </li>
                        <li>
                          <a href="#">03</a>
                        </li>
                        <li>
                          <a href="#">04</a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-angle-right"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                    {/* End of blog pagination */}
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

export default SearchRoom;
