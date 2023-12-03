import {motion} from 'framer-motion'

// Variants for page transition animation
const transitionVariants = {
    initial: {
        x: '100%', // Starting position: right edge of the screen
        width: '100%', // Initial width: 100% of the screen width
    },
    animate: {
        x: '0%', // Final position: left edge of the screen
        with: '0%' // Final width: 0% of the screen width (makes it disappear)
    },
    exit: {
        x: ['0%', '100%'], // Initial position: left edge of the screen, final position: right edge of the screen
        width: ['0%', '100%'], // Initial width: 0% of the screen width, final width: 100% of the screen width (makes it cover the whole screen)
    },
};

// InterPage component for transition between pages
function InterPage() {
 return (
    <>
        <motion.div className='fixed top-0 bottom-0 right-full w-screen z-30 bg-[#2e2257]' variants={transitionVariants} initial='initial' animate='animate' exit='exit' transition={{ delay: 0.2, duration: 0.6, ease: 'easeInOut'}}
        ></motion.div>
        <motion.div className='fixed top-0 bottom-0 right-full w-screen z-20 bg-[#3b2d71]' variants={transitionVariants} initial='initial' animate='animate' exit='exit' transition={{ delay: 0.4, duration: 0.6, ease: 'easeInOut'}}
        ></motion.div>
        <motion.div className='fixed top-0 bottom-0 right-full w-screen z-10 bg-[#4b3792]' variants={transitionVariants} initial='initial' animate='animate' exit='exit' transition={{ delay: 0., duration: 0.6, ease: 'easeInOut'}}
        ></motion.div>
    </>
 )
}

export default InterPage