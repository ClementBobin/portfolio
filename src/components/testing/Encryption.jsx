import React from "react";
import { motion } from "framer-motion";
import { slideInFromTop } from "../../utils/motion";

const Encryption = () => {
  return (
    // Main container for the Encryption component
    <div className="flex flex-row relative items-center justify-center min-h-screen w-full h-full">
      {/* Container for the animated text */}
      <div className="absolute w-auto h-auto top-0 z-[5]">
        {/* Animated text with motion variant */}
        <motion.div
          variants={slideInFromTop}
          className="text-[40px] font-medium text-center text-gray-200"
        >
          Performance
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            {" "}
            &{" "}
          </span>
          Security
        </motion.div>
      </div>

      {/* Container for lock images and welcome box */}
      <div className="flex flex-col items-center justify-center translate-y-[-50px] absolute z-[20] w-auto h-auto">
        {/* Group of lock images with hover effect */}
        <div className="flex flex-col items-center group cursor-pointer w-auto h-auto">
          {/* Lock top image */}
          <img
            src="/LockTop.png"
            alt="Lock top"
            width={50}
            height={50}
            className="w-[50px] translate-y-5 transition-all duration-200 group-hover:translate-y-11"
            loading="lazy"
          />
          {/* Lock main image */}
          <img
            src="/LockMain.png"
            alt="Lock Main"
            width={70}
            height={70}
            className="z-10"
            loading="lazy"
          />
        </div>

        {/* Welcome box with encryption title */}
        <div className="Welcome-box px-[15px] py-[4px] z-[20] border my-[20px] border-[#7042f88b] opacity-[0.9]">
          <h1 className="Welcome-text text-[12px]">Encryption</h1>
        </div>
      </div>

      {/* Bottom text container */}
      <div className="absolute z-[20] bottom-[10px] px-[5px]">
        {/* Cursive text about encryption */}
        <div className="cursive text-[20px] font-medium text-center text-gray-300">
          Secure your data with end-to-end encryption
        </div>
      </div>

      {/* Container for the video */}
      <div className="w-full flex items-start justify-center absolute">
        {/* Video element with specified attributes */}
        <video
          loop
          muted
          autoPlay
          playsInline
          preload="false"
          className="w-full h-auto"
          src="/encryption.webm/"
        />
      </div>
    </div>
  );
};

export default Encryption;