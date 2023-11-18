import ParticlesContainer from '../sub/ParticlesContainer';
import Avatar from '../sub/Avatar';

import {motion} from 'framer-motion';

import { fadeIn } from '../../utils/motion';

function Hero() {
  return (
    <div className='bg-primary h-[100vh]'>
      <div className='w-full h-full bg-gradient-to-r from-primary via-black/30 to-black/10 invert dark:invert-0'>
        <div className='text-center flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto'>
          <motion.h1
            variants={fadeIn('down', 0.2)}
            initial="hidden"
            animate="show"
            exit='hidden'
            className='text-[35px] leading-tight md:text-[60px] md:leading-[1.3] mb-8 font-semibold'
          >
            Transforming Ideas <br /> Into{''}
            <span className='text-acentuation'> Digital Reality</span>
          </motion.h1>
          <motion.p
           variants={fadeIn('down', 0.3)}
           initial="hidden"
           animate="show"
           exit='hidden'
           className='max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16 leading-[1.8] text-white/60 font-light'
          >
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae hic odio quos possimus dolorum esse aperiam, enim iure temporibus? Minima dolore deserunt quam veritatis eveniet facilis neque adipisci officia dignissimos!
          </motion.p>
        </div>
      </div>
      <div className='w-[100%] h-full absolute right-0 bottom-0 overflow-hidden'>
        <div className='bg-none xl:bg-hero-pattern xl:bg-cover xl:bg-right right-24 xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0 scale-125'></div>
        <ParticlesContainer />
        <motion.div 
          variants={fadeIn('up', 0.2)}
          initial="hidden"
          animate="show"
          exit='hidden'
          transition={{duration: 1, ease: 'easeInOut'}}
          className='w-full h-full max-w-[737px] max-h-[678px] absolute bottom-32 lg:bottom-0 lg:right-[8%]'
        >
          <Avatar />
        </motion.div>
      </div>
    </div>
  )
}

export default Hero