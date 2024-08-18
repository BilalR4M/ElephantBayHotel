import React, { useEffect, useState } from "react";
import summaryApi from "../common";
import STATUS from "../common/status";
import { Link } from "react-router-dom";

const AllRoomCategory = () => {
  const [allRoom, setAllRoom] = useState([]);

  const fetchAllRoom = async () => {
    try {
      const response = await fetch(summaryApi.allRoom.url);
      const dataResponse = await response.json();
      console.log("room data", dataResponse);
      setAllRoom(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching all rooms:", error);
    }
  };

  useEffect(() => {
    fetchAllRoom();
  }, []);

  return (
    <div>
      {allRoom.map((Room, index) => {
        if (Room?.status === STATUS.Active) {
          const isEvenIndex = index % 2 === 0;

          return (
            <div key={index}>
              {isEvenIndex ? (
                <div className="single-blog-wrap type3">
                  <div className="row align-items-center">
                    <div className="col-md-7">
                      <div className="single-post-details left-content">
                        <p>#{Room.category}</p>
                        <h3>
                          <Link to={"room-details/" + Room._id}>
                            {Room.category}
                          </Link>
                        </h3>
                        {/* <div className="post-info">
                          <ul className="list-unstyled mb-0">
                            <li>
                              {pack.endDate} - {pack.endDate}
                            </li>
                          </ul> */}
                        <div className="post-body">
                          <p className="text-ellipsis line-clamp-3">
                            {Room.type}
                          </p>
                          <div className="reading-and-reply d-flex align-items-center justify-content-between">
                            <Link
                              to={"room-details/" + Room._id}
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
                    <div className="col-md-5 order-first order-md-last">
                      <div className="w-[300px] h-[200px] single-blog-image hover-effect">
                        <Link to={"Room-details/" + Room._id}>
                          <img src={Room.RoomImage} alt="" />
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
                        <Link to={"Room-details/" + Room._id}>
                          <img src={Room.RoomImage} alt="" />
                        </Link>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="single-post-details right-content">
                        <p>#{Room.category}</p>
                        <h3>
                          <Link to={"Room-details/" + Room._id}>
                            {Room.Roomnumber}
                          </Link>
                        </h3>
                        {/* <div className="post-info">
                          <ul className="list-unstyled mb-0">
                            <li>
                              {pack.endDate} - {pack.endDate}
                            </li>
                          </ul>
                        </div> */}
                        <div className="post-body">
                          <p className="text-ellipsis line-clamp-3">
                            {Room.type}
                          </p>
                          <div className="reading-and-reply d-flex align-items-center justify-content-between">
                            <Link
                              to={"Room-details/" + Room._id}
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
        } else {
          return null; // Skip rendering if status is not Active
        }
      })}
    </div>
  );
};

export default AllRoomCategory;
