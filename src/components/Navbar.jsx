import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import useDarkMode from './useDarkMode';

export default function Navbar() {
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState('');
  const [toggle, setToggle] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();


  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleToggle = () => {
    query(true);
  };

  return (
      <header className={'&{styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary justify-around text-textColor'}>
        <Link 
            to="/"
            className='flex items-center gap-2'
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
          <img src={logo} alt='logo' className='w-9 h-9 object-contain' />
        </Link>

        <nav>
          <ul className='hidden flex-row gap-4 sm:flex'>
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
                  <a href={`#${link.id}`}>
                    {link.title}
                  </a>
                </li>
            ))}
          </ul>
        </nav>

        <aside className='flex flex-row gap-4'>
          <div className="groupbtn">
            <input type="checkbox" name='Theme' id="hide-checkbox" checked={!darkMode} onChange={handleDarkModeToggle} />
            <label htmlFor="hide-checkbox" className="toggle">
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
          <div className='sm:hidden flex flex-1 justify-end items-center'>
            <img 
              src={toggle ? close : menu}
              alt='menu'
              className='w-[28px] h-[28px] object-contain cursor-pointer'
              onClick={() => setToggle(!toggle)}
            />
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
                    <a href={`#${link.id}`}>
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </header>
  )
}