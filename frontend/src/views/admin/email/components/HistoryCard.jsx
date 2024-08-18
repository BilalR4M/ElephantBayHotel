import React, { useEffect, useState } from "react";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";

import { FaEthereum } from "react-icons/fa";
import Card from "components/card";
import SummaryApi from "common";
import moment from "moment";

const HistoryCard = () => {

  const [allMessages, setAllMessages] = useState([]);

  const fetchAllMessagese = async () => {
    try {
      const response = await fetch(SummaryApi.get_send_message.url);
      const dataResponse = await response.json();
      console.log("email data", dataResponse);
      setAllMessages(dataResponse?.data || []);
    } catch (error) {
      console.error("Error fetching all messages:", error);
    }
  };

  useEffect(() => {
    fetchAllMessagese();
  }, []);

  return (
    <Card extra={"mt-3 !z-5 overflow-hidden"}>
      {/* HistoryCard Header */}
      <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          Messages
        </div>
        <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          See all
        </button>
        
      </div>

      {/* History CardData */}
      
      {allMessages.map((data, index) => (

        <div key={index}>
          <hr class="h-1 mx-auto my-2 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" />
          <div className="flex h-full w-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700">
            <div className="flex items-center gap-4">
              <div className="h-6 w-6 flex items-center justify-center">
                <img
                  className="h-full w-full rounded-full mb-6"
                  src={Nft3}
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <h5 className="text-sm font-bold text-navy-700 dark:text-white">
                  {data?.firstName} {""}
                </h5>
                <div class="flex flex-col">
                  <p class="-mt-1 text-sm font-normal text-gray-600 overflow-ellipsis">
                    {data?.email}
                  </p>
                </div>
                <div className="ml-0 -mt-3 flex items-center text-sm font-bold text-gray-600  dark:text-white">
                  {data?.subject}
                </div>
              </div>
            </div>

            <div className="mt-0 flex items-center justify-center text-navy-700 dark:text-white">
              {/* <div className="ml-0 flex items-center text-sm font-bold text-navy-700 dark:text-white">
              {data?.subject}
            </div> */}
              <div className="ml-2 mt-4 flex items-center text-sm font-normal text-navy-500 dark:text-white">
                <p> {moment(data?.createdAt).startOf('hour').fromNow()}</p>
                {/* <p className="ml-0">ago</p> */}
              </div>
            </div>

          </div>

          {/* <hr class="h-1 mx-auto my-2 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700" /> */}
        </div>

      ))}
    </Card>
  );
};

export default HistoryCard;
