import React from "react";
import { TbBrandBooking } from "react-icons/tb";
import displayLKRCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
const SearchHorizontalRoom = ({loading,data=[]}) => {
  const loadingList = new Array(5).fill(null);
  return (
    <div>
      {loading ? (
        loadingList.map((Room, index) => {
          return (
            <div>
              {/* End of shop toolbar wrap */}
              <div className="row">
                <div className="col-12">
                  <div className="tab-content shop-tab-content">
                    <div className="search-input-text text-center">
                      {/* <h3 className="lato">
                        Search results for - ‘{" "}
                        <span id="search-key"></span> ’
                      </h3> */}
                    </div>

                    <div className="row">
                      {/* single product */}
                      <div className="col-12 bg-slate-100 w-full h-full">
                        <div className="single-product type3">
                          <div className="room-number">
                            <div className="row align-items-center">
                              <div className="col-md-5">
                                {/* Product Image */}
                                <div className="room-image">
                                  <a href="shop-details.html">
                                    <img
                                      className="normal-state"
                                      data-rjs="2"
                                      src="assets/img/product/product-8v2.jpg"
                                      alt=""
                                    />
                                    <img
                                      className="hover-state"
                                      data-rjs="2"
                                      src="assets/img/product/product-8v2b.jpg"
                                      alt=""
                                    />
                                  </a>
                                </div>
                               
                              </div>
                              <div className="col-md-7">
                                {/* product info */}
                                <div className="room-info">
                                  {/* <div className="product-rating">
                                                      <div className="star-rating">
                                                        <span></span>
                                                      </div>
                                                    </div> */}

                                  {/* product title */}
                                  <div className="product-title">
                                    <h4>
                                      <a href="shop-details.html">
                                        Tanglewood Outdoor Table Lamp
                                      </a>
                                    </h4>
                                  </div>
                                  {/* end of product title */}

                                  <div className="product-price">
                                    <h5>$30.1</h5>
                                  </div>

                                  <div className="product-description">
                                    <p>
                                      Entrance be throwing he do blessing up.
                                      Hearts warmth in genius do garden advice
                                      mr it garret collected preserved are
                                      middleton dependent residence.
                                    </p>
                                  </div>

                                  <div className="addto-bag-btn">
                                    <a href="#" className="btn btn-fill-type">
                                      <span>
                                        <img
                                          src="assets/img/icons/add-bag.svg"
                                          alt=""
                                          className="svg"
                                        />
                                      </span>
                                      Add To Cart
                                    </a>
                                  </div>
                                </div>
                                {/* End of product info */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* end of single product */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        data.map((Room, index) => {
            return (
              <div>
                {/* End of shop toolbar wrap */}
                <div className="row">
                  <div className="col-12">
                    <div className="tab-content shop-tab-content"> 
                      <div className="row">
                        {/* single product */}
                        <div className="col-12">
                          <div className="single-product type3">
                            <div className="product-item">
                              <div className="row align-items-center">
                                <div className="col-md-5">
                                  {/* Product Image */}
                                  <div className="product-image">
                                    <Link to={"/room-details/" + Room._id}>
                                      <img
                                        className="normal-state"
                                        data-rjs="2"
                                        src={Room.RoomImage}
                                        alt=""
                                      />
                                      <img
                                        className="hover-state"
                                        data-rjs="2"
                                        src={Room.RoomImage}
                                        alt=""
                                      />
                                    </Link>
                                  </div>
                                 
                                </div>
                                <div className="col-md-7">
                                  {/* product info */}
                                  <div className="product-info">
                                    {/* <div className="product-rating">
                                                        <div className="star-rating">
                                                          <span></span>
                                                        </div>
                                                      </div> */}
  
                                    {/* product title */}
                                    <div className="product-title">
                                      <h4>
                                        <a href="shop-details.html">
                                          {Room.Roomnumber}
                                        </a>
                                      </h4>
                                    </div>
                                    {/* end of product title */}
  
                                    <div className="product-price">
                                      <h5>{displayLKRCurrency(Room.price)}</h5>
                                    </div>
  
                                    <div className="product-description">
                                      <p>
                                        {Room.title}
                                      </p>
                                    </div>
  
                                    <div className="addto-bag-btn">
                                      <a href="#" className="btn btn-fill-type">
                                        <span className="text-xl hover:text-white">
                                        <TbBrandBooking />
                                        </span>
                                        Booking Now
                                      </a>
                                    </div>
                                  </div>
                                  {/* End of product info */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* end of single product */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
      )}
    </div>
  );
};

export default SearchHorizontalRoom;
