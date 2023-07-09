import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

import { styles } from '../styles';
import { ComputersCanvas } from './canvas';

const Hero = () => {
  return (
    <section className='relative w-full h-screen mx-auto'>
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-7x1 mx-auto flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-[#915eff]' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>Hi, I'm <span className='text-[#915eff]'>Clément</span></h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>I am a student, but <br className='sm:block hidden' />in my left hover time im trying to learn new
            <TypeAnimation
              cursor={false} // omit the default css typing animation class, otherwise we won't be able to manipulate it manually

              className={"text-[#915eff]"} // pass custom cursor className that will be manipulated (defaults below)
              sequence={[
                ' desing',
                1000,
                ' style',
                1000,
                ' animation',
                1000,
                ' coding language',
                1000,
              ]}
              repeat={5000}
            />
            &nbsp; while trying to upgrade my
            <TypeAnimation
                cursor={false} // omit the default css typing animation class, otherwise we won't be able to manipulate it manually

                className={"text-[#915eff]"} // pass custom cursor className that will be manipulated (defaults below)
                sequence={[
                  ' syntax reading',
                  1000,
                  ' protocole of coding',
                  1000,
                ]}
                repeat={5000}
                delay={300}
            />
        </p>
        </div>
      </div>
      <ComputersCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href="#about">
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.dev 
              animate={{
                y: [0, 24, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop',
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  )
}

export default Hero