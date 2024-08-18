import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import STATUS from "../common/status";
import { Link } from "react-router-dom";
import moment from "moment";

const AllPackageCategory = () => {
  const [allPackage, setAllPackage] = useState([]);
  const [activePackageCount, setActivePackageCount] = useState(0);
  const [inactivePackageCount, setInactivePackageCount] = useState(0);
  const fetchAllPackage = async () => {
    try {
      const response = await fetch(summaryApi.allPackage.url);
      const dataResponse = await response.json();
      console.log("package data", dataResponse);
      const packages = dataResponse?.data || [];
      setAllPackage(packages);
    } catch (error) {
      console.error("Error fetching all packages:", error);
    }
  };

  useEffect(() => {
    fetchAllPackage();
  }, []);

  return (
    <div>
      
      {allPackage.filter(pack => pack?.status === STATUS.Active).
      map((pack, index) => {
        const isEvenIndex = index % 2 === 0;
          return (
            <div key={index}>
              {isEvenIndex ? (
                <div className="single-blog-wrap type3">
                  <div className="row align-items-center">
                    <div className="col-md-7">
                      <div className="single-post-details left-content">
                        <p>#{pack.category}</p>
                        <h3>
                          <Link to={"package-details/" + pack._id}>
                            {pack.packtName}
                          </Link>
                        </h3>
                        <div className="post-info">
                          <ul className="list-unstyled mb-0">
                            <li>
                              {moment(pack?.createAt).format("LL")} -{" "}
                              {moment(pack?.endDate).format("LL")}
                            </li>
                          </ul>
                        </div>
                        <div className="post-body">
                          <p className="text-ellipsis line-clamp-3">
                            {pack.title}
                          </p>
                          <div className="reading-and-reply d-flex align-items-center justify-content-between">
                            <Link
                              to={"package-details/" + pack._id}
                              className="btn btn-line"
                            >
                              View Details...
                            </Link>
                            {/* <div className="single-reply-comment">
                              <a href="#">
                                <i className="fa fa-comment-o"></i>4
                              </a>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 order-first order-md-last">
                      <div className="w-[300px] h-[200px] single-blog-image hover-effect">
                        <Link to={"package-details/" + pack._id}>
                          <img src={pack.packImage} alt="" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="single-blog-wrap type3">
                  <div className="row align-items-center">
                    <div className="col-md-5">
                      <div className="w-[300px] h-[200px] single-blog-image hover-effect">
                        <Link to={"package-details/" + pack._id}>
                          <img src={pack.packImage} alt="" />
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="single-post-details right-content">
                        <p>#{pack.category}</p>
                        <h3>
                          <Link to={"package-details/" + pack._id}>
                            {pack.packtName}
                          </Link>
                        </h3>
                        <div className="post-info">
                          <ul className="list-unstyled mb-0">
                            <li>
                              {moment(pack?.createAt).format("LL")} -{" "}
                              {moment(pack?.endDate).format("LL")}
                            </li>
                          </ul>
                        </div>
                        <div className="post-body">
                          <p className="text-ellipsis line-clamp-3">
                            {pack.title}
                          </p>
                          <div className="reading-and-reply d-flex align-items-center justify-content-between">
                            <Link
                              to={"package-details/" + pack._id}
                              className="btn btn-line"
                            >
                              View Details...
                            </Link>
                            {/* <div className="single-reply-comment">
                              <a href="#">
                                <i className="fa fa-comment-o"></i>4
                              </a>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )

      })}
    </div>
  );
};

export default AllPackageCategory;
