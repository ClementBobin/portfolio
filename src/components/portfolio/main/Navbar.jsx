// Importing necessary dependencies and assets
import { useState } from 'react';
import { Link } from 'react-router-dom'
import generateData from '../../../constants';
import { logo, menu, close } from '../../../assets';
import useDarkMode from '../sub/useDarkMode';

// Navbar component for the website header
export default function Navbar() {
  // State for tracking the active navigation link and the mobile menu toggle
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);

  // Custom hook for managing dark mode
  const [darkMode, setDarkMode] = useDarkMode();

  // Fetching navigation links from constants
  const { navLinks } = generateData();

  // Function to handle toggling dark mode
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className={'w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-10'}>
      <div className="w-full h-full flex flex-row items-center justify-between m-auto px-[10px]">
        {/* Logo linking to the home page */}
        <Link 
          to="/portfolio"
          className='h-auto w-auto flex flex-row items-center'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain cursor-pointer hover:animate-slowspin' />
        </Link>

        {/* Navigation menu for larger screens */}
        <nav className='w-[500px] h-full flex flex-row items-center justify-between md:mr-20 max-sm:hidden'>
          <ul className='flex items-center justify-between w-full h-auto border border-[#7042f861] bg-[#0300145e] mr-[15px] px-[20px] py-[10px] rounded-full text-gray-200'>
            {navLinks.map((link) => (
              <li 
                key={link.id}
                className={`${
                  active === link.title ? "text-textColor" : "text-white-100"
                } font-poppins font-medium cursor-pointer text-[16px]`}
                onClick={() => {
                  setToggle(!toggle);
                  setActive(link.title);
                }}
              >
                <Link to={`/portfolio/${link.id}`}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Toggle for dark mode and mobile menu */}
        <aside className='flex flex-row gap-4'>
          {/* Dark mode toggle */}
          <div className="groupbtn">
            <input type="checkbox" name='Theme' id="hide-checkbox" checked={!darkMode} onChange={handleDarkModeToggle} />
            <label htmlFor="hide-checkbox" className="toggle">
              {/* Star and crater animation for the toggle */}
              <span className="toggle-button">
                <span className="crater crater-1"></span>
                <span className="crater crater-2"></span>
                <span className="crater crater-3"></span>   
                <span className="crater crater-4"></span>
                <span className="crater crater-5"></span>
                <span className="crater crater-6"></span>
                <span className="crater crater-7"></span>
              </span>
              <span className="star star-1"></span>
              <span className="star star-2"></span>
              <span className="star star-3"></span>
              <span className="star star-4"></span>
              <span className="star star-5"></span>
              <span className="star star-6"></span>
              <span className="star star-7"></span>
              <span className="star star-8"></span>
            </label>
          </div>

          {/* Mobile menu toggle */}
          <div className='sm:hidden flex flex-1 justify-end items-center'>
            <img 
              src={toggle ? close : menu}
              alt='menu'
              className='w-[28px] h-[28px] object-contain cursor-pointer'
              onClick={() => setToggle(!toggle)}
            />
            {/* Mobile menu */}
            <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
              <ul className='list-none flex justify-end items-start flex-col gap-4'>
                {navLinks.map((link) => (
                  <li 
                    key={link.id}
                    className={`${
                      active === link.title ? "text-textColor" : "text-secondary"
                    } font-poppins font-medium cursor-pointer text-[16px]`}
                    onClick={() => {
                      setToggle(!toggle);
                      setActive(link.title);
                    }}
                  >
                    <Link href={`/portfolio/${link.id}`}>
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </header>
  )
}