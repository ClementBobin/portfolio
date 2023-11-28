import React from 'react'
import {motion} from 'framer-motion'
import { useTranslation } from 'react-i18next';
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '../../utils/motion'

// SkillText component with Framer Motion animations
const SkillText = () => {
  const { t } = useTranslation();

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center'>
      {/* Animated welcome box */}
      <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-[#7042f88b] opacity-[0.9]"
        >
          <h1 className="Welcome-text text-[13px]">
            {t('skillBox')}
          </h1>
        </motion.div>
        
        {/* Animated skill title */}
        <motion.div
        variants={slideInFromLeft(0.5)}
        className='text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]'
        >
            {t('skillTitle')}
        </motion.div>

        {/* Animated skill subtitle */}
        <motion.div
        variants={slideInFromRight(0.5)}
        className='cursive text-[20px] text-gray-200 mb-10 mt-[10px] text-center'
        >
            {t('skillSubtitle')}
        </motion.div>
    </div>
  )
}

export default SkillText