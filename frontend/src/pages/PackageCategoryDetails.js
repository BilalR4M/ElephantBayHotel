import React, { useEffect, useState } from "react";
import Sidebar from "../components/PackageDetailSidebar";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";
import moment from "moment";
import Header from "components/Header";
import Footer from "components/Footer";
const PackageCategoryDetails = () => {
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
  const ImageListLoading = new Array(1).fill(null);

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
    <>
      <Header />
      <section className="pt-100 pb-70">
        {loading ? (
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-12">
                    <div className="row justify-content-center">
                      <div className="col-lg-12">
                        <div className="post-main-content text-center">
                          <div className="post-mata pb-0">
                            <ul className="list-unstyled mb-0">
                              <li>
                                <p className="text-sm bg-slate-100 animate-pulse">
                                  <span></span>
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className="post-heading pt-0">
                            <h2 className="w-ful p-2 bg-slate-100 animate-pulse"></h2>
                          </div>
                          <div className="post-main-image ">
                            <div
                              className="h-[400px] w-full  p-2 bg-slate-100 overflow-hidden relative animate-pulse" //relative
                            >
                              <div
                                className="absolute inset-0 bg-center bg-cover"
                                style={{}}
                              ></div>
                            </div>

                            <div className="image-caption mt-1">
                              <p className="w-ful p-2 bg-slate-100 animate-pulse"></p>
                            </div>
                            {/* <div className=" text-lg text-slate-950 font-bold text-left pt-1 "><p className=""></p></div> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="post-details-body">
                          <div className="single-post-content">
                            <h5>
                              <div className=" w-full p-2 bg-slate-100 font-semibold animate-pulse"></div>
                            </h5>
                            <h5>
                              <div className=" w-ful p-2 bg-slate-100 font-semibold animate-pulse"></div>
                            </h5>
                            <h5 className="w-ful p-2 bg-slate-100 animate-pulse"></h5>

                            <div className="h-full w-full bg-slate-100 overflow-hidden animate-pulse">
                              <textarea
                                className="h-[370px] w-full  p-2 bg-slate-100 animate-pulse"
                                style={{
                                  overflow: "hidden",
                                  resize: "none",
                                  border: "none",
                                }}
                                readOnly
                              />
                            </div>

                            <blockquote></blockquote>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        {/* share and tag border */}
                        <div className="share-and-tag">
                          <div className="row justify-content-center">
                            <div className="col-lg-12">
                              {/* single post tag and share */}
                              <div className="single-post-tag-share w-full p-2 bg-slate-100 animate-pulse">
                                {/* single post tags */}
                                <div className="single-blog-tag "></div>
                                {/* End of single post tags */}

                                {/* single blog share on */}
                                <div className="single-blog-share">
                                  <ul className="list-unstyled mb-0">
                                    <li className=" w-5 h-5 rounded-full bg-slate-300 animate-pulse"></li>
                                    <li className=" w-5 h-5 rounded-full bg-slate-300 animate-pulse"></li>
                                    <li className=" w-5 h-5 rounded-full bg-slate-300 animate-pulse"></li>
                                    <li className=" w-5 h-5 rounded-full bg-slate-300 animate-pulse"></li>
                                  </ul>
                                </div>
                                {/* End of single blog share on */}
                              </div>
                              {/* End of single post tag and share */}
                            </div>
                          </div>
                        </div>
                        {/* End of share and tag border */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Sidebar packageID={data._id} />
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-12">
                    <div className="row justify-content-center">
                      <div className="col-lg-12">
                        <div className="post-main-content text-center">
                          <div className="post-mata pb-0">
                            <ul className="list-unstyled mb-0">
                              <li>
                                <p className="text-sm text-slate-300">
                                  <span></span>
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className="post-heading pt-0">
                            <h2>{data.packtName}</h2>
                          </div>
                          <div className="post-main-image ">
                            {data.packImage.map((imageUrl, index) => {
                              return (
                                <div
                                  key={index}
                                  className="h-[400px] w-full  overflow-hidden relative" //relative
                                >
                                  <div
                                    className="absolute inset-0 bg-center bg-cover"
                                    style={{
                                      backgroundImage: `url(${imageUrl})`,
                                    }}
                                  ></div>
                                </div>
                              );
                            })}

                            <div className="image-caption mt-1">
                              <p className="">#{data.category}</p>
                            </div>
                            {/* <div className=" text-lg text-slate-950 font-bold text-left pt-1 "><p className=""></p></div> */}
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <div className="post-details-body">
                          <div className="single-post-content">
                            <h5>
                              Available Hotels{" "}
                              <div className=" text-slate-400 font-semibold ">
                                Elphantbay Hotel
                              </div>
                            </h5>
                            <h5>
                              Available Dates{" "}
                              <div className=" text-slate-400 font-semibold ">
                                {moment(data.createAt).format("LL")} -{" "}
                                {moment(data.endDate).format("LL")}
                              </div>
                            </h5>
                            <h5>{data.title}</h5>

                            <div className="h-full w-full overflow-hidden">
                              <textarea
                                className="h-[370px] w-full"
                                style={{
                                  overflow: "hidden",
                                  resize: "none",
                                  border: "none",
                                }}
                                value={data.description}
                                readOnly
                              />
                            </div>

                            <blockquote></blockquote>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        {/* share and tag border */}
                        <div className="share-and-tag">
                          <div className="row justify-content-center">
                            <div className="col-lg-12">
                              {/* single post tag and share */}
                              <div className="single-post-tag-share">
                                {/* single post tags */}
                                <div className="single-blog-tag">
                                  <span>tags:</span>
                                  <a href="#" className="capitalize">
                                    {data.category}
                                  </a>
                                  ,<a href="#">elphantbay</a>,
                                  <a href="#">SriLanka</a>
                                </div>
                                {/* End of single post tags */}

                                {/* single blog share on */}
                                <div className="single-blog-share">
                                  <ul className="list-unstyled mb-0">
                                    <li>
                                      <a href="#">
                                        <i className="fa fa-facebook"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i className="fa fa-twitter"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i className="fa fa-pinterest"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i className="fa fa-linkedin"></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i className="fa fa-google-plus"></i>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                {/* End of single blog share on */}
                              </div>
                              {/* End of single post tag and share */}
                            </div>
                          </div>
                        </div>
                        {/* End of share and tag border */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Sidebar packageID={data._id} />
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>

  );
};
export default PackageCategoryDetails;
