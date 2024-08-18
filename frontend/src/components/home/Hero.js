import React, { useMemo } from "react";
import bg from "../../assets/img/blog/pexels-rachel-claire-5490747.jpg"
import ButtonPrimary from "./misc/ButtonPrimary";
import { motion } from "framer-motion";
import getScrollAnimation from "./utils/getScrollAnimation";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import { MdOutlineLocalOffer } from "react-icons/md";
import { IoMdGift } from "react-icons/io";
import { GiTakeMyMoney } from "react-icons/gi";
const Hero = ({
  listUser = [
    {
      name: "Up to discount",
      number: "20%",
      icon: <MdOutlineLocalOffer className="h-10 w-10 text-gray-800"/>,
    },
    {
      name: "cancellation",
      number: "Flexible",
      icon: <GiTakeMyMoney className="h-10 w-10 text-gray-800"/>,
    },
    {
      name: "reward",
      number: "LKR:10000",
      icon: <IoMdGift className="h-10 w-10 text-gray-800"/>,
    },
  ],
}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <>
      <ScrollAnimationWrapper>
        <motion.div
          className="relative h-screen"
          variants={scrollAnimation}
        >
          {/* Background Image */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={bg}
              alt="VPN Illustrasi"
              quality={100}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center text-white">
            <p className="text-9xl lg:text-4xl xl:text-9xl text-left font-bold  mr-96 -ml-60 mt-72 mb-7">
              Let Us Be<br />
              Your Getaway<br />
              to Luxury Living<br />
              in <strong>Elephantbay</strong>.
            </p>
            <p className="text-lg lg:text-2xl text-left  text-gray-200 mb-3">
              Escape the everyday and discover serenity at HotelElephantbay. Our tranquil location and rejuvenating experiences will leave you feeling refreshed and restored.
            </p>
            {/* <ButtonPrimary>Get Started</ButtonPrimary> */}
          </div>
        </motion.div>

      </ScrollAnimationWrapper>
      <div
        className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto"
        id="about"
      >

        <div className="relative w-full flex">
          <ScrollAnimationWrapper
            className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">
            {listUser.map((listUsers, index) => (
              <motion.div
                className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-8/12 px-4 sm:w-auto mx-auto sm:mx-0"
                key={index}
                custom={{ duration: 2 + index }}
                variants={scrollAnimation}
              >
                <div className="flex mx-auto w-40 sm:w-auto">
                  <div className="flex items-center justify-center bg-gray-100 w-12 h-12 mr-6 rounded-full">
                      {listUsers.icon}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-3xl text-black-600 font-semibold">
                      {listUsers.number}
                    </p>
                    <p className="text-2xl text-black-500 -mt-7">{listUsers.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </ScrollAnimationWrapper>
          <div
            className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
            style={{ filter: "blur(114px)" }}
          ></div>
        </div>
      </div>
    </>

  );
};

export default Hero;
