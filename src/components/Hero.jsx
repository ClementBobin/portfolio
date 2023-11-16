import { motion } from 'framer-motion';
import { styles } from '../styles';
import ComputersCanvas from './canvas/Computers';

const Hero = () => {
  return (
    <section className='relative w-full h-screen mx-auto'>
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-7x1 mx-auto flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5'>
          <div className='w-5 h-5 rounded-full bg-acentuation' />
          <div className='w-1 sm:h-80 h-40 violet-gradient' />
        </div>
        <div>
          <h1 className={`${styles.heroHeadText} text-textColor`}>Hi, I'm <span className='text-acentuation'>Clément</span></h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>I am a student, but <br className='sm:block hidden' />in my left hover time im trying to learn new <small className="text-acentuation">'desing/style/animation/coding'</small> language while trying to upgrade my<small className="text-acentuation">syntax reading/protocole of coding</small></p>
        </div>
      </div>
      <ComputersCanvas />

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href="#about" className='text-transparent'>
          about
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div 
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