import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "../../../utils/motion";

const TransitionContent = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center relative justify-center px-20 top-10 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        {/* Welcome box */}
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <h1 className="Welcome-text text-[13px]">
            About me
          </h1>
        </motion.div>

        {/* Title */}
        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-white max-w-[600px] w-auto h-auto"
        >
          <span>
            {t('transitionTitle')}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              {" "}
              {t('transitionAccentuation')}{" "}
            </span>
            {t('transitionTitleFollow')}
          </span>
        </motion.div>

        {/* Subtitle */}  
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 my-5 max-w-[600px]"
        >
          {t('transitionSubtitle')}
        </motion.p>
      </div>

      {/* Image */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        <img
          src="/mainIconsdark.svg"
          alt="work icons"
          style={{ height: "650px", width: "650px" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default TransitionContent;
