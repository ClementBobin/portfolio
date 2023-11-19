import Toast from './Toast';
import React, { useRef, useState, forwardRef, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion';
import useDarkMode from './useDarkMode';
import useLang from './english';
import { useNavigate } from 'react-router-dom';
import {
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
    useMatches,
    KBarResults,
    KBarProvider
  } from "kbar";
import Lottie from 'lottie-react'
import { command } from '../../assets/index';
import copyLinkIcon from '../../icons/copy-link.json'
import emailIcon from '../../icons/email.json'
import sourceIcon from '../../icons/source.json'
import aboutIcon from '../../icons/about.json'
import homeIcon from '../../icons/home.json'
import articlesIcon from '../../icons/articles.json'
import projectsIcon from '../../icons/projects.json'
import talksIcon from '../../icons/talks.json'
import podcastsIcon from '../../icons/podcasts.json'
import investingIcon from '../../icons/investing.json'
import usesIcon from '../../icons/uses.json'
import reminderIcon from '../../icons/reminder.json'
import avatarIcons from '../../icons/account.json'
import workIcons from '../../icons/work.json'
import bugIcons from '../../icons/bug.json'
import darkIcons from '../../icons/dark.json'
import lightIcons from '../../icons/light.json'

function RenderResults() {
  const { results } = useMatches()

  return (
    <div className='flex flex-col'>
    {results && results.length != 0 && <div className='border-t-2 border-white pb-3 pt-2'>
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === 'string' ? (
          <div className='text-sm uppercase px-8 pt-3 pb-2 text-black font-black tracking-widest'>{item}</div>
        ) : (
          <ResultItem action={item} active={active} />
        )
      }
    />
      </div>
    }
    </div>
  )
}

const ResultItem = forwardRef(({ action, active }, ref) => {

      if (active) {
        action.icon.props.lottieRef.current?.play();
      } else {
        action.icon.props.lottieRef.current?.stop();
      }

    return (
          <div className='flex flex-col'>
            {action.id.startsWith('#') ? (
              <a href={action.id} className={`flex flex-col ${active && 'cursor-pointer'}`} onMouseEnter={() => action.icon.props.lottieRef.current?.play()} onMouseLeave={() => action.icon.props.lottieRef.current?.stop()}>
              <div className={`flex pl-4 py-3 transition-colors ${active ? 'bg-slate-100 text-slate-700 border-black border-0 border-l-4' : 'text-slate-500'}`}>
                {action.icon && <div className='flex items-center justify-center ml-0 mr-3'>
                  {action.icon}    
                </div>}

                <div className='flex flex-col font-semibold'>
                  <span>{action.name}</span>
                  <span className='text-xs text-slate-400'>{action.subtitle}</span>
                </div>
                {action.shortcut?.length ? (
                  <div className='flex flex-row absolute right-[5%] gap-1'>
                    {action.shortcut.map(shortcut => (
                      <kbd key={shortcut} className='py-1 px-2 bg-slate-200 rounded text-[14px]'>{shortcut}</kbd>
                    ))}
                  </div>
                ) : null}
              </div>
          </a>
            ) : (
              <div className={`flex flex-col ${active && 'cursor-pointer'}`} onMouseEnter={() => action.icon.props.lottieRef.current?.play()} onMouseLeave={() => action.icon.props.lottieRef.current?.stop()}>
                <div className={`flex pl-4 py-3 transition-colors ${active ? 'bg-slate-100 text-slate-700 border-black border-0 border-l-4' : 'text-slate-500'}`}>
                  {action.icon && <div className='flex items-center justify-center ml-0 mr-3'>
                    {action.icon}    
                  </div>}

                  <div className='flex flex-col font-semibold'>
                    <span>{action.name}</span>
                    <span className='text-xs text-slate-400'>{action.subtitle}</span>
                  </div>
                  {action.shortcut?.length ? (
                    <div className='flex flex-row absolute right-[5%] gap-1'>
                      {action.shortcut.map(shortcut => (
                        <kbd key={shortcut} className='py-1 px-2 bg-slate-200 rounded text-[14px]'>{shortcut}</kbd>
                      ))}
                    </div>
                  ) : null}
                </div>
            </div>)}
          </div>
    )
  })

const KBar = () => {
  const copyLinkRef = useRef()
  const emailRef = useRef()
  const sourceRef = useRef()
  const homeRef = useRef()
  const aboutRef = useRef()
  const articlesRef = useRef()
  const projectsRef = useRef()
  const talksRef = useRef()
  const podcastsRef = useRef()
  const investingRef = useRef()
  const usesRef = useRef()
  const reminderRef = useRef()
  const bugRef = useRef()
  const workRef = useRef()
  const avatarRef = useRef()
  const lightRef = useRef()
  const darkRef = useRef()
  const [showToast, setShowToast] = useState(false)
  const [darkMode, setDarkMode] = useDarkMode();
  const [lang, setLang] = useLang();
  const navigate = useNavigate();

  const copyLink = () => {
      navigator.clipboard.writeText(window.location.href)
      setShowToast(true)
  }

  const navigateTo = (path) => {
    // Check if the path starts with '#' and use React Router or direct link accordingly
    if (path.startsWith('#')) {
      // Use React Router for internal navigation
      navigate(path);
    } else {
      // Use direct link for external navigation
      window.location.href = path;
    }
  };

  const actions = [
    {
      id: 'copy',
      name: 'Copy Link',
      shortcut: ['l'],
      keywords: 'copy-link',
      section: 'General',
      perform: copyLink,
      icon: <Lottie lottieRef={copyLinkRef} className='w-6 h-6 invert' animationData={copyLinkIcon} loop={false} autoplay={false} />,
    },
    {
      id: "Résumer",
      name: "Résumer",
      shortcut: ['c','v'],
      keywords: "cv",
      section: 'Perso',
      subtitle: 'MyPorfolio',
      perform: () => (window.location.pathname = "CV"),
      icon: <Lottie lottieRef={avatarRef} className='w-6 h-6 invert' animationData={avatarIcons} loop={false} autoplay={false} />,
    },
    {
      id: "Porfolio",
      name: "portfolio",
      shortcut: ['p'],
      keywords: "about",
      section: 'Perso',
      perform: () => (window.location.pathname = ""),
      icon: <Lottie lottieRef={workRef} className='w-6 h-6 invert' animationData={workIcons} loop={false} autoplay={false} />,
    },
    {
        id: "Test",
        name: "Testing",
        shortcut: ['t'],
        keywords: "test",
        section: 'Test',
        perform: () => (window.location.pathname = "test"),
        icon: <Lottie lottieRef={bugRef} className='w-6 h-6 invert' animationData={bugIcons} loop={false} autoplay={false} />,
    },
    {
      id: '#contact',
      name: 'Send Email',
      shortcut: ['e'],
      keywords: 'send-email',
      section: 'General',
      perform: () => navigateTo('#contact'),
      icon: <Lottie lottieRef={emailRef} className='w-6 h-6 invert' animationData={emailIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'source',
      name: 'View Source',
      shortcut: ['s'],
      keywords: 'view-source',
      section: 'General',
      perform: () =>
        window.open('https://github.com/ClementBobin/portfolio', '_blank'),
      icon: <Lottie lottieRef={sourceRef} className='w-6 h-6 invert' animationData={sourceIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      keywords: 'go-home',
      section: 'Go To',
      perform: () => (window.location.pathname = ''),
      icon: <Lottie lottieRef={homeRef} className='w-6 h-6 invert' animationData={homeIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'about',
      name: 'About',
      shortcut: ['g', 'a'],
      keywords: 'go-about',
      section: 'Go To',
      perform: () => (window.location.pathname = 'about'),
      icon: <Lottie lottieRef={aboutRef} className='w-6 h-6 invert' animationData={aboutIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'articles',
      name: 'Articles',
      shortcut: ['g', 'b'],
      keywords: 'go-articles',
      section: 'Go To',
      perform: () => (window.location.pathname = 'articles'),
      icon: <Lottie lottieRef={articlesRef} className='w-6 h-6 invert' animationData={articlesIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['g', 'p'],
      keywords: 'go-projects',
      section: 'Go To',
      perform: () => (window.location.pathname = 'projects'),
      icon: <Lottie lottieRef={projectsRef} className='w-6 h-6 invert' animationData={projectsIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'talks',
      name: 'Talks',
      shortcut: ['g', 't'],
      keywords: 'go-talks',
      section: 'Go To',
      perform: () => (window.location.pathname = 'talks'),
      icon: <Lottie lottieRef={talksRef} className='w-6 h-6 first:invert' animationData={talksIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'podcasts',
      name: 'Podcasts',
      shortcut: ['g', 'c'],
      keywords: 'go-podcasts',
      section: 'Go To',
      perform: () => (window.location.pathname = 'podcasts'),
      icon: <Lottie lottieRef={podcastsRef} className='w-6 h-6 invert' animationData={podcastsIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'investing',
      name: 'Investing',
      shortcut: ['g', 'i'],
      keywords: 'go-investing',
      section: 'Go To',
      perform: () => (window.location.pathname = 'investing'),
      icon: <Lottie lottieRef={investingRef} className='w-6 h-6 invert' animationData={investingIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'uses',
      name: 'Uses',
      shortcut: ['g', 'u'],
      keywords: 'go-uses',
      section: 'Go To',
      perform: () => (window.location.pathname = 'uses'),
      icon: <Lottie lottieRef={usesRef} className='w-6 h-6 invert' animationData={usesIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'reminder',
      name: 'Reminder',
      shortcut: ['g', 'r'],
      keywords: 'go-reminder',
      section: 'Go To',
      perform: () => (window.location.pathname = 'reminder'),
      icon: <Lottie lottieRef={reminderRef} className='w-6 h-6 invert' animationData={reminderIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'Dark',
      name: 'DarkTheme',
      shortcut: ['g', 'r'],
      keywords: 'DarkTheme',
      section: 'dark',
      perform: () => setDarkMode(true),
      icon: <Lottie lottieRef={darkRef} className='w-6 h-6' animationData={darkIcons} loop={false} autoplay={false} />,
    },
    {
      id: 'Light',
      name: 'LightTheme',
      shortcut: ['g', 'r'],
      keywords: 'LightTheme',
      section: 'light',
      perform: () => setDarkMode(false),
      icon: <Lottie lottieRef={lightRef} className='w-6 h-6' animationData={lightIcons} loop={false} autoplay={false} />,
    },
    {
      id: 'English',
      name: 'English',
      shortcut: ['g', 'r'],
      keywords: 'English lang',
      section: 'lang',
      perform: () => setLang('en'),
      icon: <Lottie lottieRef={darkRef} className='w-6 h-6' animationData={darkIcons} loop={false} autoplay={false} />,
    },
    {
      id: 'french',
      name: 'French',
      shortcut: ['g', 'r'],
      keywords: 'French lang',
      section: 'lang',
      perform: () => setLang('fr'),
      icon: <Lottie lottieRef={lightRef} className='w-6 h-6' animationData={lightIcons} loop={false} autoplay={false} />,
    },
  ];

  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: '50%' });
  }, [controls]);

  return (
    <>
    <KBarProvider actions={actions}>
    <KBarPortal>
        <KBarPositioner className='bg-black/50 backdrop-blur-sm'>
          <KBarAnimator className='rounded-xl bg-white shadow-xl flex flex-col space-x-4 w-[35rem] overflow-hidden dark:invert'>
              <div className='flex px-2 text-xl font-medium text-slate-600'><KBarSearch className='w-full outline-none pl-4 pr-6 py-4 bg-transparent selection:bg-sky-200 selection:text-black' /></div>
              <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
    </KBarPortal>
    </KBarProvider>
    <Toast
        title="Copied :D"
        description="You can now share it with anyone."
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  )
}

export default KBar