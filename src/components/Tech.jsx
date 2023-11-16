import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import BallCanvas from "./canvas/Ball";
import { technologies } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const Tech = () => {
  const icons = Object.values(technologies).map((technology) => technology.icon);

  return (
    <div className={`mt-12 bg-transparent rounded-[20px]`}>
      <div className={`relative bg-transparent backdrop-filter backdrop-blur-lg border border-textColor border-opacity-20 rounded-lg z-[8] hover:backdrop-blur-none hover:border-none ${styles.padding}`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>EXPERIENCES (CONT.)</p>
          <h2 className={styles.sectionHeadText}>Technologies.</h2>
        </motion.div>
      </div>
      <div className='relative w-[100vw] h-[100vh] z-[5] top-[-247px]'>
          <BallCanvas icons={icons} />
      </div>
    </div>
  );
}

export default Tech;