import React, { useEffect, useState } from "react";
import fetchCategoryWisePackage from "../helpers/fetchCategoryWisePackage";
import { Link } from "react-router-dom";
import STATUS from "../common/status";
import moment from "moment";

const PackageCard = ({ category }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(5).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const categoryPackage = await fetchCategoryWisePackage(category);
    setLoading(false);

    console.log("horizontal data", categoryPackage.data);
    setData(categoryPackage?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <section className="pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {loading
                ? loadingList.map((pack, index) => {
                    const isEvenIndex = index % 2 === 0;
                    return (
                      <div key={index}>
                        {isEvenIndex ? (
                          // View 1
                          <div className="w-full h-[200px] single-blog-wrap type3">
                            <div className="row align-items-center w-full h-full bg-slate-50 animate-pulse">
                              <div className="col-md-7 col-lg-8">
                                {/* single blog post details */}
                                <div className="single-post-details left-content">
                                  <div className="p-1 w-full  bg-slate-50"></div>
                                  <div className="p-1 w-full bg-slate-50">
                                    <a href=" "></a>
                                  </div>
                                  <div className="post-info">
                                    <ul className="list-unstyled mb-0 p-1 w-full bg-slate-50">
                                      <li></li>
                                    </ul>
                                  </div>
                                  <div className="post-body">
                                    <p className="text-ellipsis line-clamp-3 p-1"></p>
                                    <div className="reading-and-reply d-flex align-items-center justify-content-between">
                                      <Link
                                        to={"package-category-details/"}
                                        className="btn btn-line   bg-slate-50"
                                      ></Link>
                                      <div className="single-reply-comment">
                                        <a href="#"></a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-5 col-lg-4 order-first order-md-last">
                                {/* single blog image */}
                                <Link
                                  to={"package-category-details/"}
                                  className="single-blog-image hover-effect w-full bg-slate-50"
                                >
                                  <img src={""} alt="" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        ) : (
                          // View 2
                          <div className="w-full h-[200px] single-blog-wrap type3">
                            <div className="row align-items-center w-full h-full bg-slate-50 animate-pulse">
                              <div className="col-md-7 col-lg-8">
                                {/* single blog post details */}
                                <div className="single-post-details left-content">
                                  <div className="p-1 w-full  bg-slate-50"></div>
                                  <div className="p-1 w-full bg-slate-50">
                                    <a href=" "></a>
                                  </div>
                                  <div className="post-info">
                                    <ul className="list-unstyled mb-0 p-1 w-full bg-slate-50">
                                      <li></li>
                                    </ul>
                                  </div>
                                  <div className="post-body">
                                    <p className="text-ellipsis line-clamp-3 p-1"></p>
                                    <div className="reading-and-reply d-flex align-items-center justify-content-between">
                                      <Link
                                        to={"package-category-details/"}
                                        className="btn btn-line   bg-slate-50"
                                      ></Link>
                                      <div className="single-reply-comment">
                                        <a href="#"></a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-5 col-lg-4 order-first order-md-last">
                                {/* single blog image */}
                                <Link
                                  to={"package-category-details/"}
                                  className="single-blog-image hover-effect w-full bg-slate-50"
                                >
                                  <img src={""} alt="" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                : data.map((pack, index) => {
                    if (pack?.status === STATUS.Active) {
                      const isEvenIndex = index % 2 === 0;
                      return (
                        <div key={index}>
                          {isEvenIndex ? (
                            // View 1
                            <div className=" single-blog-wrap type3">
                              <div className="row align-items-center">
                                <div className="col-md-7 col-lg-8">
                                  {/* single blog post details */}
                                  <div className="single-post-details left-content">
                                    <p>#{pack.category}</p>
                                    <h3>
                                      <a href="#">{pack.packtName}</a>
                                    </h3>
                                    <div className="post-info">
                                      <ul className="list-unstyled mb-0">
                                        <li>
                                          {moment(data.createAt).format("LL")} -{" "}
                                          {moment(data.endDate).format("LL")}
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="post-body">
                                      <p className="text-ellipsis line-clamp-3">
                                        {pack.title}
                                      </p>
                                      <div className="reading-and-reply d-flex align-items-center justify-content-between">
                                        <Link
                                          to={
                                            "package-category-details/" +
                                            pack._id
                                          }
                                          className="btn btn-line"
                                        >
                                          View Details...
                                        </Link>
                                        <div className="single-reply-comment">
                                          <a href="#">
                                            <i className="fa fa-comment-o"></i>5
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-5 col-lg-4 order-first order-md-last">
                                  {/* single blog image */}
                                  <Link
                                    to={"package-category-details/" + pack._id}
                                    className="w-[300px] h-[200px] single-blog-image hover-effect"
                                  >
                                    <img src={pack.packImage} alt="" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          ) : (
                            // View 2
                            <div className="single-blog-wrap type3">
                              <div className="row align-items-center">
                                <div className="col-md-5 col-lg-4">
                                  {/* single blog image */}
                                  <Link
                                    to={"package-category-details/" + pack._id}
                                    className=" single-blog-image hover-effect"
                                  >
                                    <img src={pack.packImage} alt="" />
                                  </Link>
                                </div>
                                <div className="col-md-7 col-lg-8">
                                  {/* single blog post details */}
                                  <div className="single-post-details right-content">
                                    <p>#{pack.category}</p>
                                    <h3>
                                      <a href="#">{pack.packtName}</a>
                                    </h3>
                                    <div className="post-info">
                                      <ul className="list-unstyled mb-0">
                                        <li>
                                          {moment(data.createAt).format("LL")} -{" "}
                                          {moment(data.endDate).format("LL")}
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="post-body">
                                      <p className="text-ellipsis line-clamp-3">
                                        {pack.title}
                                      </p>
                                      <div className="reading-and-reply d-flex align-items-center justify-content-between">
                                        <Link
                                          to={
                                            "package-category-details/" +
                                            pack._id
                                          }
                                          className="btn btn-line"
                                        >
                                          View Details...
                                        </Link>
                                        <div className="single-reply-comment">
                                          <a href="#">
                                            <i className="fa fa-comment-o"></i>4
                                          </a>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }
                  })}

              {/* single blog post */}
              {/* End of single blog post */}

              {/* blog pagination */}
              {/* <div className="blog-pagination-wrap">
                <ul className="pagination blog-pagination list-unstyled">
                  <li className="disabled">
                    <a href="#">
                      <i className="fa fa-angle-left"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">01</a>{" "}
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
              </div> */}
              {/* End of blog pagination */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackageCard;
