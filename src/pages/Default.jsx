import { useState } from 'react';
import { motion } from 'framer-motion';
import { slideInFromTop, slideInFromBottom } from '../utils/motion.js';
// Internationalization hook
import { useTranslation } from 'react-i18next';
import Anchor from '../components/libStyleCompo/anchor.jsx';

// Component for displaying instructions based on user's platform
function ShortcutHome() {
  const isMac = /(Mac)/i.test(navigator.userAgent)
  const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent)

  if (isMobile) {
    return (
      <button>
        Tap to start →
      </button>
    )
  } else if (isMac) {
    return (
      <button>
        Press <kbd>⌘</kbd> <kbd>K</kbd> to start →
      </button>
    )
  } else {
    return (
      <button>
        Press <kbd>ctrl</kbd> <kbd>K</kbd> to start →
      </button>
    )
  }
}

// Default component for the main content of the page
function Default() {
  // Translation hook
  const { i18n, t } = useTranslation();

  // State variables for managing visibility of different sections
  const [showWindowKbar, setShowWindowKbar] = useState(false);
  const [showWindowPortfolioAdvance, setShowWindowPortfolioAdvance] = useState(false);
  const [showWindowPortfolioBasic, setShowWindowPortfolioBasic] = useState(false);

  // Function to change the language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    console.log(i18n)
  };

  // Render the main content with motion effects
  return (
    <main className="main flow md:overflow-hidden w-[100vw] h-[100vh]">
      {/* Welcome heading */}
      <h1 className="main__heading">Welcome To My Website</h1>

      {/* Cards section with motion effects */}
      <div className="main__cards cards">
        <motion.div className="cards__inner">
          {/* Language card with motion effect */}
          <motion.div
            className="cards__card card"
            variants={slideInFromTop}
            initial="hidden"
            animate="visible"
          >
            {/* Language card content */}
            <h2 className="card__heading">Language</h2>
            <ul role="list" className="card__bullets flow">
              <li>
                <img src='/language-tree.webp' loading="lazy" />    
              </li>
              <li>
                {/* Language change button for French */}
                <button className="card__cta cta" onClick={() => changeLanguage('fr')}>
                  French
                </button>
              </li>
              <li>
                {/* Language change button for English */}
                <button href="" className="card__cta cta" onClick={() => changeLanguage('en')}>
                  English
                </button>
              </li>
            </ul>
          </motion.div>

          {/* Navigation card with motion effect */}
          <motion.div
            className="cards__card card"
            variants={slideInFromBottom}
            initial="hidden"
            animate="visible"
          >
            {/* Navigation card content */}
            <h2 className="card__heading">Navigation</h2>
            <ul role="list" className="card__bullets flow">
              <li>{t('defaultCard2SubTitle')}</li>
              <li>
                {/* Clickable Kbar image */}
                <img src="/kbar.gif" className='cursor-pointer' onClick={() => setShowWindowKbar(true)} loading="lazy" />
              </li>
              <li>
                {/* Description and shortcut instructions */}
                {t('defaultCard2Description')}
                <ShortcutHome/>
              </li>
            </ul>
          </motion.div>

          {/* Portfolio card with motion effect */}
          <motion.div
            className="cards__card card"
            variants={slideInFromTop}
            initial="hidden"
            animate="visible"
          >
            {/* Portfolio card content */}
            <h2 className="card__heading">Portfolio</h2>
            <ul role="list" className="card__bullets flow">
              {/* First portfolio option */}
              <li>
                <ul>
                  <li>
                    {/* Description for the first portfolio option */}
                    {t('defaultCard3Choix1Description')}
                  </li>
                  <li>
                    {/* Clickable video for the first portfolio option */}
                    <video src="/portfolio.webm" className='h-28 w-full cursor-pointer' onClick={() => setShowWindowPortfolioBasic(true)} />
                  </li>
                  <li>
                    {/* Button to navigate to the first portfolio option */}
                    <button onClick={() => (window.location.pathname = "portfolio2")} className="card__cta cta">
                      {t('defaultCard3ChoixBtn')}
                    </button>
                  </li>
                </ul>
              </li>
              {/* Second portfolio option */}
              <li>
                <ul>
                  <li>
                    {/* Description for the second portfolio option */}
                    {t('defaultCard3Choix2Description')}
                  </li>
                  <li>
                    {/* Clickable video for the second portfolio option */}
                    <video
                      autoPlay
                      className="h-28 w-full cursor-pointer"
                      onClick={() => setShowWindowPortfolioAdvance(true)} 
                    >
                      <source src="/portfolioAvance.webm" type="video/webm" />
                    </video>
                  </li>
                  <li>
                    {/* Button to navigate to the second portfolio option */}
                    <button onClick={() => (window.location.pathname = "portfolio")} className="card__cta cta">
                      {t('defaultCard3ChoixBtn')}
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Anchors for opening additional windows */}
      <Anchor title="Portfolio Advanced" additionalInfo={<video controls className='w-[85vw] h-[70vh]'><source src="/portfolioAvance.webm" type="video/webm" />Your browser does not support the video tag.</video>} showWindow={showWindowPortfolioAdvance} setShowWindow={setShowWindowPortfolioAdvance} />
      <Anchor title="Portfolio Basic" additionalInfo={<video controls className='w-[85vw] h-[70vh]'><source src="/portfolio.webm" type="video/mp4" />Your browser does not support the video tag.</video>} showWindow={showWindowPortfolioBasic} setShowWindow={setShowWindowPortfolioBasic} />
      <Anchor title="Kbar" additionalInfo={<img src='/kbar.gif' className='min-w-[80vw] h-[75vh]' loading="lazy" />} showWindow={showWindowKbar} setShowWindow={setShowWindowKbar} />
    </main>
  );
}

export default Default;