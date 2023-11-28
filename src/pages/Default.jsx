import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { slideInFromTop, slideInFromBottom } from '../utils/motion.js';
// Internationalization hook
import { useTranslation } from 'react-i18next';
import Anchor from '../components/libStyleCompo/anchor.jsx';

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

function Default() {
  // Translation hook
  const { i18n, t } = useTranslation();

  const [showWindowKbar, setShowWindowKbar] = useState(false);
  const [showWindowPortfolioAdvance, setShowWindowPortfolioAdvance] = useState(false);
  const [showWindowPortfolioBasic, setShowWindowPortfolioBasic] = useState(false);

  // Function to change the language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    console.log(i18n)
  };

  return (
    <main className="main flow overflow-hidden w-[100vw] h-[100vh]">
      <h1 className="main__heading">Welcome To My Webside</h1>
      <div className="main__cards cards">
        <motion.div className="cards__inner">
          <motion.div
            className="cards__card card"
            variants={slideInFromTop}
            initial="hidden"
            animate="visible"
          >
            <h2 className="card__heading">Language</h2>
            <ul role="list" className="card__bullets flow">
              <li>
                <img src='/language-tree.webp' />    
              </li>
              <li>
                <button className="card__cta cta" onClick={() => changeLanguage('fr')}>
                  French
                </button>
              </li>
              <li>
                <button href="" className="card__cta cta" onClick={() => changeLanguage('en')}>
                  English
                </button>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="cards__card card"
            variants={slideInFromBottom}
            initial="hidden"
            animate="visible"
          >
            <h2 className="card__heading">Navigation</h2>
            <ul role="list" className="card__bullets flow">
              <li>{t('defaultCard2SubTitle')}</li>
              <li>
                <img src="https://user-images.githubusercontent.com/12195101/143491194-1d3ad5d6-24ac-4e6e-8867-65f643ac2d24.gif" className='cursor-pointer' onClick={() => setShowWindowKbar(true)} />
              </li>
              <li>
                {t('defaultCard2Description')}
                <ShortcutHome/>
              </li>
            </ul>
          </motion.div>

          <motion.div
            className="cards__card card"
            variants={slideInFromTop}
            initial="hidden"
            animate="visible"
          >
            <h2 className="card__heading">Portfolio</h2>
            <ul role="list" className="card__bullets flow">
              <li>
                <ul>
                  <li>
                    {t('defaultCard3Choix1Description')}
                  </li>
                  <li>
                    <video src="/src/assets/portfolio.webm" className='h-28 w-full cursor-pointer' onClick={() => setShowWindowPortfolioBasic(true)} />
                  </li>
                  <li>
                    <button onClick={() => (window.location.pathname = "portfolio2")} className="card__cta cta">
                      {t('defaultCard3ChoixBtn')}
                    </button>
                  </li>
                </ul>
              </li>
              <li>
                <ul>
                  <li>
                    {t('defaultCard3Choix2Description')}
                  </li>
                  <li>
                    <video src="/src/assets/portfolioAvance.webm" className='h-28 w-full cursor-pointer' onClick={() => setShowWindowPortfolioAdvance(true)} />
                  </li>
                  <li>
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
      <Anchor title="Portfolio Advanced" additionalInfo={<video controls className='w-[85vw] h-[70vh]'><source src="/src/assets/portfolioAvance.webm" type="video/mp4" />Your browser does not support the video tag.</video>} showWindow={showWindowPortfolioAdvance} setShowWindow={setShowWindowPortfolioAdvance} />
      <Anchor title="Portfolio Basic" additionalInfo={<video controls className='w-[85vw] h-[70vh]'><source src="/src/assets/portfolio.webm" type="video/mp4" />Your browser does not support the video tag.</video>} showWindow={showWindowPortfolioBasic} setShowWindow={setShowWindowPortfolioBasic} />
      <Anchor title="Kbar" additionalInfo={<img src='https://user-images.githubusercontent.com/12195101/143491194-1d3ad5d6-24ac-4e6e-8867-65f643ac2d24.gif' className='min-w-[80vw] h-[75vh]' />} showWindow={showWindowKbar} setShowWindow={setShowWindowKbar} />
    </main>
  );
}

export default Default;