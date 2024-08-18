import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SummaryApi from "../common";
import displayLKRCurrency from "../helpers/displayCurrency";
import Header from "../components/Header";
import Footer from "../components/Footer";
const Booking = () => {
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
    <div>
      <Header/>
      <section className="page-title-inner py-6">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* page title inner */}
              <div className="page-title-wrap">
                <div className="page-title-heading">
                  <h1 className="h2">
                    Booking<span>check-in</span>
                  </h1>
                </div>
                <ul className="list-unstyled mb-0">
                  <li>
                    <a href=" ">Offers</a>
                  </li>
                  <li className="active">
                    <a href=" ">check-in</a>
                  </li>
                </ul>
              </div>
              {/* End of page title inner */}
            </div>
          </div>
        </div>
      </section>
      <section className="pt-0 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="billing-details-wrap">
                <form>
                  <div className="row justify-content-center">
                    <div className="col-lg-6">
                      <div className="billing-details">
                        <div className="billing-heading">
                          <h3>Billing Details</h3>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <span className="woocommerce-input-wrapper">
                              <input
                                type="text"
                                className="theme-input-style"
                                placeholder="Package Name"
                                value={data.packtName}
                                readOnly
                              />
                            </span>
                          </div>
                          <div className="col-md-6">
                            <span className="woocommerce-input-wrapper">
                              <input
                                type="text"
                                className="theme-input-style"
                                placeholder="Category"
                                value={data.category}
                                readOnly
                              />
                            </span>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <span className="woocommerce-input-wrapper">
                              <input
                                type="text"
                                className="theme-input-style"
                                placeholder=""
                                value={displayLKRCurrency(data.price)}
                                readOnly
                              />
                            </span>
                          </div>
                          <div className="col-md-6">
                            <span className="woocommerce-input-wrapper">
                              <input
                                type="text"
                                className="theme-input-style"
                                placeholder="Discount"
                                value={data.discount + "%"}
                                readOnly
                              />
                            </span>
                          </div>
                        </div>
                        {/* <div className="row">
                          <div className="col-12">
                            <span className="woocommerce-input-wrapper">
                              <input
                                type="text"
                                className="theme-input-style"
                                placeholder="Title"
                                required
                              />
                            </span>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="terms-and-conditions-wrapper text-center">
                        <button
                          type="submit"
                          className="billing-submit-button btn btn-fill-type"
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Booking;
