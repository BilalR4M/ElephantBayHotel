import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "./utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import summaryApi from '../../common';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import avatar from '../../assets/img/avatars/avatar4.png'
import moment from 'moment';
const Pricing = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState('');
  const [deletefeedback, setDeleteFeedback] = useState(null);

  const fetchFeedbacks = async () => {
    try {
      const fetchData = await fetch(summaryApi.get_feedback.url, {
        method: summaryApi.get_feedback.method,
        credentials: 'include'
      });
      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setFeedbacks(dataResponse.data);
      }
      if (dataResponse.error) {
        toast.error(dataResponse.message);
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const filteredFeedbacks = searchDate
    ? feedbacks.filter(feedback => new Date(feedback.date).toISOString().split('T')[0] === searchDate)
    : feedbacks;

  const generateStars = (rating) => {
    const stars = [];
    const minRating = 0;
    if (rating > minRating) {
      for (let i = 0; i < rating; i++) {
        stars.push(<span key={i} className="star text-yellow-500">★</span>);
      }
    }
    return stars;
  };

  return (
    <div
      className="bg-gradient-to-b from-white-300 to-white-500 w-full py-14"
      id="pricing"
    >
      <div className="max-w-screen-xl  px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        

        <div className="flex flex-col w-full my-16" id="testimoni">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-normal w-9/12 sm: lg:w-4/12 mx-auto">
              Trusted by Thousands of Happy Customer{" "}
            </motion.h3>
            <motion.p
              variants={scrollAnimation}
              className="leading-normal mx-auto mb-2 mt-4 w-10/12 sm:w-7/12 lg:w-6/12"
            >
              These are the stories of our customers who have joined us with great
              pleasure when using this crazy feature.
            </motion.p>
          </ScrollAnimationWrapper>
          <div className="mx-3 md:flex items-start">
              {filteredFeedbacks.map((data, index) => {
                if (data.rating > 4) {
                  return (
                    <div className="px-3 md:w-1/3" key={index}>
                      <div className="w-full mx-auto rounded-lg bg-white border border-gray-100 p-5 text-gray-800 font-light mb-6">
                        <div className="w-full flex mb-4 items-center">
                          <div className="overflow-hidden rounded-full w-10 h-10 bg-gray-50 border border-gray-200">
                            <img src={avatar} alt="" />
                          </div>
                          <div className="flex-grow pl-3">
                            <h6 className="font-bold text-base text-left  text-gray-800">{data?.name}</h6>
                            <div className="font-bold flex right-0">{generateStars(data?.rating)}</div>
                          </div>
                          <div className="flex-grow pl-4 mb-4">
                            <h6 className="font-bold text-xs uppercase text-gray-600">{moment(data?.createdAt).format('LL')}</h6>
                          </div>
                        </div>
                        <div className="w-full">
                          <p className="text-sm leading-tight"><span className="text-lg leading-none italic font-bold text-gray-400 mr-1">"</span>{data?.suggestions}<span className="text-lg leading-none italic font-bold text-gray-400 ml-1">"</span></p>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
