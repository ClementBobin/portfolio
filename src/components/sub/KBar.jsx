// Import necessary dependencies and styles
import { useRef, useState, useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { Command } from 'cmdk';

// Custom hook for managing dark mode
import useDarkMode from './useDarkMode';

// Internationalization hook
import { useTranslation } from 'react-i18next';

// React Router hook for navigation
import { useNavigate } from 'react-router-dom';

// Lottie library for rendering JSON-based animations
import Lottie from 'lottie-react';

// Import Lottie animation files
import copyLinkIcon from '../../assets/icons/copy-link.json';
import emailIcon from '../../assets/icons/email.json';
import sourceIcon from '../../assets/icons/source.json';
import homeIcon from '../../assets/icons/home.json';
import workIcons from '../../assets/icons/work.json';
import bugIcons from '../../assets/icons/bug.json';
import darkIcons from '../../assets/icons/dark.json';
import lightIcons from '../../assets/icons/light.json';
import articlesIcon from '../../assets/icons/articles.json';
import projectsIcon from '../../assets/icons/projects.json';
import usesIcon from '../../assets/icons/uses.json';
import reminderIcon from '../../assets/icons/reminder.json';
import langIcon from '../../assets/icons/globe.json';
import githubIcons from '../../assets/icons/github.json';
import linkedInIcons from '../../assets/icons/linkedIn.json';
import codewarsIcons from '../../assets/icons/codeWar.json';
import coffeIcons from '../../assets/icons/coffe.json';

// Import Toast component for notifications
import Toast from './Toast';

// Main KBar component (now using cmdk)
const KBar = () => {
  // State for modal visibility
  const [open, setOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Refs for Lottie animations
  const copyLinkRef = useRef();
  const emailRef = useRef();
  const sourceRef = useRef();
  const homeRef = useRef();
  const articlesRef = useRef();
  const projectsRef = useRef();
  const usesRef = useRef();
  const reminderRef = useRef();
  const bugRef = useRef();
  const workRef = useRef();
  const lightRef = useRef();
  const darkRef = useRef();
  const langRef = useRef();
  const codewarsRef = useRef();
  const githubRef = useRef();
  const linkedInRef = useRef();
  const coffeRef = useRef();

  // Dark mode hook
  const [darkMode, setDarkMode] = useDarkMode();

  // Translation hook
  const { i18n, t } = useTranslation();

  // Navigation hook
  const navigate = useNavigate();

  // Animation controls
  const controls = useAnimation();

  // Copy current url(+path) of website
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowToast(true);
    setOpen(false);
  };

  const navigateTo = (path) => {
    if (path.startsWith('#')) {
      navigate(path);
    } else {
      window.location.href = path;
    }
    setOpen(false);
  };

  // Function to change the language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  // Action definitions for cmdk
  const actions = [
    {
      category: 'General',
      items: [
        {
          id: 'copy',
          name: t('KBarElement1'),
          shortcut: ['l'],
          keywords: 'copy-link',
          perform: copyLink,
          icon: <Lottie lottieRef={copyLinkRef} className='w-6 h-6 invert' animationData={copyLinkIcon} loop={false} autoplay={false} />,
        },
        {
          id: '#contact',
          name: t('KBarElement3'),
          shortcut: ['e'],
          keywords: 'send-email',
          perform: () => navigateTo('#contact'),
          icon: <Lottie lottieRef={emailRef} className='w-6 h-6 invert' animationData={emailIcon} loop={false} autoplay={false} />,
        },
        {
          id: 'source',
          name: t('KBarElement4'),
          shortcut: ['s'],
          keywords: 'view-source',
          perform: () => window.open('https://github.com/ClementBobin/portfolio', '_blank'),
          icon: <Lottie lottieRef={sourceRef} className='w-6 h-6 invert' animationData={sourceIcon} loop={false} autoplay={false} />,
        },
      ],
    },
    {
      category: 'Go To',
      items: [
        {
          id: 'home',
          name: 'Home',
          shortcut: ['g', 'h'],
          keywords: 'go-home',
          perform: () => (window.location.pathname = ''),
          icon: <Lottie lottieRef={homeRef} className='w-6 h-6 invert' animationData={homeIcon} loop={false} autoplay={false} />,
        },
        {
          id: 'Porfolio',
          name: 'Portfolio',
          shortcut: ['p'],
          keywords: 'about',
          perform: () => (window.location.pathname = 'portfolio'),
          icon: <Lottie lottieRef={workRef} className='w-6 h-6 invert' animationData={workIcons} loop={false} autoplay={false} />,
        },
        {
          id: 'articles',
          name: 'Articles',
          shortcut: ['g', 'b'],
          keywords: 'go-articles',
          perform: () => (window.location.pathname = 'portfolio/articles'),
          icon: <Lottie lottieRef={articlesRef} className='w-6 h-6 invert' animationData={articlesIcon} loop={false} autoplay={false} />,
        },
        {
          id: 'projects',
          name: 'Projects',
          shortcut: ['g', 'p'],
          keywords: 'go-projects',
          perform: () => (window.location.pathname = 'portfolio/projects'),
          icon: <Lottie lottieRef={projectsRef} className='w-6 h-6 invert' animationData={projectsIcon} loop={false} autoplay={false} />,
        },
        {
          id: 'uses',
          name: t('KBarElement5'),
          shortcut: ['g', 'u'],
          keywords: 'go-uses',
          perform: () => (window.location.pathname = 'portfolio/uses'),
          icon: <Lottie lottieRef={usesRef} className='w-6 h-6 invert' animationData={usesIcon} loop={false} autoplay={false} />,
        },
        {
          id: 'reminder',
          name: t('KBarElement6'),
          shortcut: ['g', 'r'],
          keywords: 'go-reminder',
          perform: () => (window.location.pathname = 'portfolio/reminder'),
          icon: <Lottie lottieRef={reminderRef} className='w-6 h-6 invert' animationData={reminderIcon} loop={false} autoplay={false} />,
        },
        {
          id: 'technews',
          name: 'TechNews',
          shortcut: ['g', 't'],
          keywords: 'go-tech',
          perform: () => (window.location.pathname = 'portfolio/technews'),
          icon: <Lottie lottieRef={usesRef} className='w-6 h-6 invert' animationData={usesIcon} loop={false} autoplay={false} />,
        },
      ],
    },
    {
      category: 'Project',
      items: [
        {
          id: 'note',
          name: 'MyNote',
          shortcut: ['w', 'n'],
          keywords: 'view-note',
          perform: () => window.open('https://note-clement.vercel.app/', '_blank'),
          icon: <Lottie lottieRef={sourceRef} className='w-6 h-6 invert' animationData={sourceIcon} loop={false} autoplay={false} />,
        },
      ],
    },
    {
      category: 'Theme',
      items: [
        {
          id: 'Dark',
          name: t('KBarElementTheme1'),
          shortcut: ['d', 't'],
          keywords: 'DarkTheme',
          perform: () => setDarkMode(true),
          icon: <Lottie lottieRef={darkRef} className='w-6 h-6' animationData={darkIcons} loop={false} autoplay={false} />,
        },
        {
          id: 'Light',
          name: t('KBarElementTheme2'),
          shortcut: ['l', 't'],
          keywords: 'LightTheme',
          perform: () => setDarkMode(false),
          icon: <Lottie lottieRef={lightRef} className='w-6 h-6' animationData={lightIcons} loop={false} autoplay={false} />,
        },
      ],
    },
    {
      category: 'Language',
      items: [
        {
          id: 'English',
          name: 'English',
          shortcut: ['e', 'n'],
          keywords: 'English lang',
          perform: () => changeLanguage('en'),
          icon: <Lottie lottieRef={langRef} className='w-6 h-6 dark:invert scale-150' animationData={langIcon} loop={false} autoplay={false} />,
        },
        {
          id: 'french',
          name: 'Français',
          shortcut: ['f', 'r'],
          keywords: 'French lang',
          perform: () => changeLanguage('fr'),
          icon: <Lottie lottieRef={langRef} className='w-6 h-6 dark:invert scale-150' animationData={langIcon} loop={false} autoplay={false} />,
        },
        {
          id: 'German',
          name: 'German',
          shortcut: ['d', 'e'],
          keywords: 'German lang',
          perform: () => changeLanguage('de'),
          icon: <Lottie lottieRef={langRef} className='w-6 h-6 dark:invert scale-150' animationData={langIcon} loop={false} autoplay={false} />,
        },
        {
          id: 'Spanish',
          name: 'Spanish',
          shortcut: ['e', 's'],
          keywords: 'Spanish lang',
          perform: () => changeLanguage('es'),
          icon: <Lottie lottieRef={langRef} className='w-6 h-6 dark:invert scale-150' animationData={langIcon} loop={false} autoplay={false} />,
        },
      ],
    },
    {
      category: 'Social',
      items: [
        {
          id: 'github',
          name: 'Github',
          shortcut: ['g', 'i', 't'],
          keywords: 'Github link social',
          perform: () => window.open('https://github.com/ClementBobin', '_blank'),
          icon: <Lottie lottieRef={githubRef} className='w-6 h-6 dark:invert scale-[2.5]' animationData={githubIcons} loop={false} autoplay={false} />,
        },
        {
          id: 'linkedIn',
          name: 'LinkedIn',
          shortcut: ['l', 'i'],
          keywords: 'LinkedIn link social',
          perform: () => window.open('https://www.linkedin.com/in/cl%C3%A9ment-bobin-958559293/', '_blank'),
          icon: <Lottie lottieRef={linkedInRef} className='w-6 h-6 dark:invert scale-150' animationData={linkedInIcons} loop={false} autoplay={false} />,
        },
        {
          id: 'codewars',
          name: 'Codewars',
          shortcut: ['c', 'w'],
          keywords: 'Codewars link social',
          perform: () => window.open('https://www.codewars.com/users/ClementBobin', '_blank'),
          icon: <Lottie lottieRef={codewarsRef} className='w-6 h-6 dark:invert scale-[2]' animationData={codewarsIcons} loop={false} autoplay={false} />,
        },
        {
          id: 'buymeacoffee',
          name: 'Buy me a coffee',
          shortcut: ['c', 'f'],
          keywords: 'Coffe donation link social',
          perform: () => window.open('https://www.buymeacoffee.com/clementbobin', '_blank'),
          icon: <Lottie lottieRef={coffeRef} className='w-6 h-6 dark:invert-0 scale-[2.25]' animationData={coffeIcons} loop={false} autoplay={false} />,
        },
      ],
    },
    {
      category: 'Test',
      items: [
        {
          id: 'Test',
          name: t('KBarElement2'),
          shortcut: ['t'],
          keywords: 'test',
          perform: () => (window.location.pathname = 'test'),
          icon: <Lottie lottieRef={bugRef} className='w-6 h-6 invert' animationData={bugIcons} loop={false} autoplay={false} />,
        },
      ],
    },
  ];

  // Initial animation when the component mounts
  useEffect(() => {
    controls.start({ opacity: 1, y: '50%' });
  }, [controls]);

  return (
    <>
      {/* Overlay backdrop */}
      {open && (
        <div
          className='fixed inset-0 z-40 bg-black/50 backdrop-blur-sm'
          onClick={() => setOpen(false)}
        />
      )}

      {/* Command Palette */}
      <Command className={`fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl rounded-xl bg-white shadow-xl dark:bg-slate-900 dark:text-white transition-all ${
        open ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        {/* Search input */}
        <div className='flex items-center px-4 border-b border-slate-200 dark:border-slate-700'>
          <Command.Input
            placeholder='Search actions, pages, or social links...'
            className='w-full py-4 bg-transparent outline-none text-lg'
          />
        </div>

        {/* Results list */}
        <Command.List className='max-h-96 overflow-y-auto p-2'>
          <Command.Empty className='text-center text-slate-400 py-8'>
            No results found
          </Command.Empty>

          {/* Render grouped results */}
          {actions.map((group) => (
            <Command.Group
              key={group.category}
              heading={group.category}
              className='overflow-hidden [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-slate-500'
            >
              {group.items.map((item) => (
                <Command.Item
                  key={item.id}
                  value={item.name}
                  onSelect={() => item.perform()}
                  className='flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer data-[selected]:bg-slate-100 dark:data-[selected]:bg-slate-700 transition-colors'
                >
                  <div className='flex-shrink-0'>{item.icon}</div>
                  <div className='flex-1 min-w-0'>
                    <div className='font-semibold text-sm'>{item.name}</div>
                  </div>
                  {item.shortcut && (
                    <div className='flex gap-1 ml-auto'>
                      {item.shortcut.map((key) => (
                        <kbd
                          key={key}
                          className='px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 rounded'
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  )}
                </Command.Item>
              ))}
            </Command.Group>
          ))}
        </Command.List>

        {/* Help text */}
        <div className='border-t border-slate-200 dark:border-slate-700 px-4 py-3 text-xs text-slate-500 dark:text-slate-400'>
          <p>Press <kbd className='px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded'>Ctrl+K</kbd> or <kbd className='px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700 rounded'>Cmd+K</kbd> to toggle</p>
        </div>
      </Command>

      {/* Toast component for displaying copy notification */}
      <Toast
        title='Copied :D'
        description='You can now share it with anyone.'
        isSuccess={true}
        showToast={showToast}
        setShowToast={setShowToast}
      />
    </>
  );
};

export default KBar;