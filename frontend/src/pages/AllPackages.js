import React, { useEffect, useState } from "react";
import UploadPackage from "../components/uploadPackage";
import SummaryApi from "../common";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { Spinner } from "@material-tailwind/react";
import STATUS from "../common/status";
import AdminEditPackage from "../components/AdminEditPackage";
import displayLKRCurrency from "../helpers/displayCurrency";
import AdminDeletePackage from "../components/AdminDeletePackage";
import moment from "moment";
const AllPackages = () => {
  const [openUploadPackage, setOpenUploadPackage] = useState(false);
  const [allPackage, setAllPackage] = useState([]);
  const [editPackage, setEditPackage] = useState(null);
  const [deletePackage, setDeletePackage] = useState(null);
  const [loading, setLoading] = useState(false);

  const categoryLoading = new Array(5).fill(null);

  const fetchAllPackage = async () => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.allPackage.url);
      const dataResponse = await response.json();
      console.log("package data", dataResponse);
      setAllPackage(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching all packages:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPackage();
  }, []);

  return (
    <main id="main" class="main">
      <div className="">
        <section className="pt-5 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col">
                <div className="woocommerce">
                  <div className="cart-product-wrap">
                    <div className=" -px-7 pb-40 flex justify-between items-center">
                      <div className="hidden lg:flex items-center w-80 justify-between max-w-sm border rounded-sm  pl-2" title="search">
                        <input type="text" className="w-full outline-none bg-transparent" placeholder="Search" />
                        <div className="text-lg min-w-[50px] h-10 bg-black flex items-center justify-center rounded-r-sm text-white">
                          <BsSearch />
                        </div>
                      </div>

                      <button
                        className="border-2 py-2 px-3 text-sm bg-black text-white  dark:text-white"
                        onClick={() => setOpenUploadPackage(true)}
                      >
                        <div className="flex justify-between items-center text-right gap-2">
                          <div className="text-lg">
                            <FiPlus />
                          </div>
                          New Offer
                        </div>
                      </button>
                    </div>
                    <table className="shop_table shop_table_responsive cart woocommerce-cart-form__contents text-lg  text-navy-700  dark:text-white">
                      <tbody>
                        <tr>
                          <td className="product-name"><div className="text-navy-700 dark:text-white">Image</div></td>
                          <td className="product-name pl-0"><div className="text-navy-700 dark:text-white">Name</div></td>
                          <td className=""><div className="text-navy-700 dark:text-white">Category</div></td>
                          <td className="product-quantity"><div className="text-navy-700 dark:text-white">Price/Rs:</div></td>
                          <td className=""><div className="text-navy-700 dark:text-white">Discount</div></td>
                          <td className="product-name"><div className="text-navy-700 dark:text-white">Exp-Date</div></td>
                          <td className=""><div className="text-navy-700 dark:text-white">Status</div></td>
                          <td>&nbsp;</td>
                        </tr>
                        {loading ? (
                          categoryLoading.map(() => (
                            <tr
                              className="woocommerce-cart-form__cart-item cart_item"
                            >
                              <td className="product-thumbnail">
                                    <div className="product-details ">
                                    <Spinner className="h-12 w-12 text-navy-300/50" />
                                    </div>
                                  </td>
                            </tr>
                          ))
                        ) : (
                          <>
                            {allPackage.map((data, index) => {
                              const isExpired = moment().isSameOrAfter(moment(data?.endDate))
                              const status = isExpired ? STATUS.Deactivate : data?.status
                              return (
                                <tr
                                  className="woocommerce-cart-form__cart-item cart_item"
                                  key={index}
                                >

                                  <td className="product-thumbnail">
                                    <div className="product-details">
                                      <img src={data?.packImage[0]} alt="" />
                                    </div>
                                  </td>
                                  <td>
                                    <div className="w-24 font-black text-left text-navy-700  dark:text-white">
                                      {data?.packtName}
                                    </div>
                                  </td>
                                  <td>
                                    <div className="pl-4 text-left product-details text-navy-700  dark:text-white">
                                      {data?.category}
                                    </div>
                                  </td>
                                  <td>
                                    <span className="text-navy-700  dark:text-white">
                                      {displayLKRCurrency(data?.price)}
                                    </span>
                                  </td>
                                  <td>
                                    <div className="text-navy-700  dark:text-white">
                                      <span className="minus">
                                        {data?.discount}%
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="product-details">
                                      {moment(data?.endDate).format("LL")}
                                    </div>
                                  </td>
                                  <td className="product-remove">
                                    <div
                                      className="text-3xl pl-5 hover:scale-110"
                                      title={
                                        status === STATUS.Deactivate
                                          ? "Deactivated"
                                          : "Active"
                                      }
                                      onClick={() => setEditPackage(data)}
                                    >
                                      <div
                                        className={
                                          status === STATUS.Deactivate
                                            ? "text-red-500"
                                            : "text-green-500"
                                        }
                                      >
                                        <MdCheckCircle />
                                      </div>
                                    </div>
                                  </td>
                                  <td className="product-remove">
                                    <div className="remover-field">
                                      <div
                                        className="text-3xl text-red-500  hover:text-red-700  hover:scale-110 cursor-pointer"
                                        title="delete"
                                        onClick={() => setDeletePackage(data)}
                                      >
                                        <MdCancel />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )


                            })}
                            {editPackage && (
                              <AdminEditPackage
                                onClose={() => setEditPackage(null)}
                                packageData={editPackage}
                                fetchData={fetchAllPackage}
                              />
                            )}
                            {deletePackage && (
                              <AdminDeletePackage
                                onClose={() => setDeletePackage(null)}
                                packageData={deletePackage}
                                fetchData={fetchAllPackage}
                              />
                            )}
                          </>

                        )

                        }


                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* create Package */}
      {openUploadPackage && (
        <UploadPackage
          onClose={() => setOpenUploadPackage(false)}
          fetchdata={fetchAllPackage}
        />
      )}
    </main>
  );
};
export default AllPackages;
