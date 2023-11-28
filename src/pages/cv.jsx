import { logo } from '../assets';

// The cv component for rendering the CV page
function Cv() {
  return (
      <section className='bg-white text-black flex flex-col items-center min-h-screen'>
          <img src={logo} alt="Profile photo" className='rounded-full w-100 h-100 m-[0_auto_5px]' />
          <div className='w-10'>Clément Bobin</div>
          <span className='inline-block text-[#697c8e]'></span>
          <button className='block bg-[#5558c9] text-white p-[10px_15px] w-[125px] m-[10px auto] rounded-sm hover:bg-[#7377ff]'>
            <a href=''>View More</a>
          </button>
          <div>
            <small className='left-0 absolute'>Skills</small>
            <div className=''>
              <div>

              </div>
              <div>

              </div>
            </div>
          </div>
      </section>
  )
}

export default Cv