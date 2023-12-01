// Import necessary dependencies and styles

// React hooks and animation library
import { useRef, useState, forwardRef, useEffect } from 'react';
import { useAnimation } from 'framer-motion';

// Custom hook for managing dark mode
import useDarkMode from './useDarkMode';

// Internationalization hook
import { useTranslation } from 'react-i18next';

// React Router hook for navigation
import { useNavigate } from 'react-router-dom';

// KBar components for interactive search and navigation (doc: https://kbar.vercel.app/docs/getting-started)
import {
    KBarPortal,
    KBarPositioner,
    KBarAnimator,
    KBarSearch,
    useMatches,
    KBarResults,
    KBarProvider
} from "kbar";

// Lottie library for rendering JSON-based animations
import Lottie from 'lottie-react';

// Import Lottie animation files
// Copy link animation
import copyLinkIcon from '../../assets/icons/copy-link.json';

// Email animation
import emailIcon from '../../assets/icons/email.json';

// View source animation
import sourceIcon from '../../assets/icons/source.json';

// Home icon animation
import homeIcon from '../../assets/icons/home.json';

// Avatar icons for personal section
import avatarIcons from '../../assets/icons/account.json';

// Work icons for portfolio section
import workIcons from '../../assets/icons/work.json';

// Bug icons for test section
import bugIcons from '../../assets/icons/bug.json';

// Dark mode icon
import darkIcons from '../../assets/icons/dark.json';

// Light mode icon
import lightIcons from '../../assets/icons/light.json';

// articles icons for portfolio section
import articlesIcon from '../../assets/icons/articles.json';

// projects icons for portfolio section
import projectsIcon from '../../assets/icons/projects.json';

// Materials icons for portfolio section
import usesIcon from '../../assets/icons/uses.json';

// Reminder icons for portfolio section
import reminderIcon from '../../assets/icons/reminder.json';

// language icons for portfolio section
import langIcon from '../../assets/icons/globe.json';

// social icons for portfolio section
import githubIcons from '../../assets/icons/github.json';
import linkedInIcons from '../../assets/icons/linkedIn.json';
import codewarsIcons from '../../assets/icons/codeWar.json';
import coffeIcons from '../../assets/icons/coffe.json';


// Import Toast component for notifications
import Toast from './Toast';


// RenderResults function: Renders the KBar search results
function RenderResults() {
  // Get search results using the useMatches hook from KBar
  const { results } = useMatches();

  // Return the rendered results
  return (
    <div className='flex flex-col'>
      {/* Check if there are results and render them */}
      {results && results.length !== 0 && (
        <div className='border-t-2 border-white pb-3 pt-2'>
          {/* Render the KBarResults component with custom rendering logic */}
          <KBarResults
            items={results}
            onRender={({ item, active }) =>
              // Check if the item is a string (section title) or an action
              typeof item === 'string' ? (
                // Render section title
                <div className='text-sm uppercase px-8 pt-3 pb-2 text-black font-black tracking-widest'>{item}</div>
              ) : (
                // Render ResultItem component for each action
                <ResultItem action={item} active={active} />
              )
            }
          />
        </div>
      )}
    </div>
  );
}

// ResultItem component: Renders each item in the KBar search results
const ResultItem = forwardRef(({ action, active }, ref) => {
  // Play or stop Lottie animation based on the active state
  if (active) {
    action.icon.props.lottieRef.current?.play();
  } else {
    action.icon.props.lottieRef.current?.stop();
  }

  // Return the rendered ResultItem component
  return (
    <div className='flex flex-col'>
      {/* Check if the action ID starts with '#' (internal link) */}
      {action.id.startsWith('#') ? (
        // Render as a link if it's an internal link
        <a
          href={action.id}
          className={`flex flex-col ${active && 'cursor-pointer'}`}
          onMouseEnter={() => action.icon.props.lottieRef.current?.play()}
          onMouseLeave={() => action.icon.props.lottieRef.current?.stop()}
        >
          <div className={`flex pl-4 py-3 transition-colors ${active ? 'bg-slate-100 text-slate-700 border-black border-0 border-l-4' : 'text-slate-500'}`}>
            {/* Render the action icon if available */}
            {action.icon && <div className='flex items-center justify-center ml-0 mr-3'>{action.icon}</div>}

            {/* Render action details */}
            <div className='flex flex-col font-semibold'>
              <span>{action.name}</span>
              <span className='text-xs text-slate-400'>{action.subtitle}</span>
            </div>

            {/* Render shortcuts if available */}
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
        // Render as a div if it's an external link
        <div
          className={`flex flex-col ${active && 'cursor-pointer'}`}
          onMouseEnter={() => action.icon.props.lottieRef.current?.play()}
          onMouseLeave={() => action.icon.props.lottieRef.current?.stop()}
        >
          <div className={`flex pl-4 py-3 transition-colors ${active ? 'bg-slate-100 text-slate-700 border-black border-0 border-l-4' : 'text-slate-500'}`}>
            {/* Render the action icon if available */}
            {action.icon && <div className='flex items-center justify-center ml-0 mr-3'>{action.icon}</div>}

            {/* Render action details */}
            <div className='flex flex-col font-semibold'>
              <span>{action.name}</span>
              <span className='text-xs text-slate-400'>{action.subtitle}</span>
            </div>

            {/* Render shortcuts if available */}
            {action.shortcut?.length ? (
              <div className='flex flex-row absolute right-[5%] gap-1'>
                {action.shortcut.map(shortcut => (
                  <kbd key={shortcut} className='py-1 px-2 bg-slate-200 rounded text-[14px]'>{shortcut}</kbd>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
});

// Main KBar component
const KBar = () => {
  // Refs for Lottie animations
  const copyLinkRef = useRef()
  const emailRef = useRef()
  const sourceRef = useRef()
  const homeRef = useRef()
  const articlesRef = useRef()
  const projectsRef = useRef()
  const usesRef = useRef()
  const reminderRef = useRef()
  const bugRef = useRef()
  const workRef = useRef()
  const avatarRef = useRef()
  const lightRef = useRef()
  const darkRef = useRef()
  const langRef = useRef()
  const codewarsRef = useRef()
  const githubRef = useRef()
  const linkedInRef = useRef()
  const coffeRef = useRef()
  // State for displaying toast notification
  const [showToast, setShowToast] = useState(false);

  // Dark mode hook
  const [darkMode, setDarkMode] = useDarkMode();

  // Translation hook
  const { i18n, t } = useTranslation();

  // Navigation hook
  const navigate = useNavigate();
  
  // Animation controls
  const controls = useAnimation();

  // copy current url(+path) of website
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

  // Function to change the language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Action definitions for KBar
  const actions = [
    // Copy Link action
    {
      id: 'copy',
      name: t('KBarElement1'),
      shortcut: ['l'],
      keywords: 'copy-link',
      section: 'General',
      perform: copyLink,
      icon: <Lottie lottieRef={copyLinkRef} className='w-6 h-6 invert' animationData={copyLinkIcon} loop={false} autoplay={false} />,
    },
    // Résumer action
    {
      id: "Résumer",
      name: "Résumer",
      shortcut: ['c','v'],
      keywords: "cv",
      section: 'Perso',
      subtitle: 'MyPorfolio',
      perform: () => (window.location.pathname = "portfolio/cv"),
      icon: <Lottie lottieRef={avatarRef} className='w-6 h-6 invert' animationData={avatarIcons} loop={false} autoplay={false} />,
    },
    // Portfolio action
    {
      id: "Porfolio",
      name: "portfolio",
      shortcut: ['p'],
      keywords: "about",
      section: 'Perso',
      perform: () => (window.location.pathname = "portfolio"),
      icon: <Lottie lottieRef={workRef} className='w-6 h-6 invert' animationData={workIcons} loop={false} autoplay={false} />,
    },
    // Test Zone action
    {
        id: "Test",
        name: t('KBarElement2'),
        shortcut: ['t'],
        keywords: "test",
        section: 'Test',
        perform: () => (window.location.pathname = "test"),
        icon: <Lottie lottieRef={bugRef} className='w-6 h-6 invert' animationData={bugIcons} loop={false} autoplay={false} />,
    },
    // Send Email action
    {
      id: '#contact',
      name: t('KBarElement3'),
      shortcut: ['e'],
      keywords: 'send-email',
      section: 'General',
      perform: () => navigateTo('#contact'),
      icon: <Lottie lottieRef={emailRef} className='w-6 h-6 invert' animationData={emailIcon} loop={false} autoplay={false} />,
    },
    // View Source action
    {
      id: 'source',
      name: t('KBarElement4'),
      shortcut: ['s'],
      keywords: 'view-source',
      section: 'General',
      perform: () => window.open('https://github.com/ClementBobin/portfolio', '_blank'),
      icon: <Lottie lottieRef={sourceRef} className='w-6 h-6 invert' animationData={sourceIcon} loop={false} autoplay={false} />,
    },
    // Home action
    {
      id: 'home',
      name: 'Home',
      shortcut: ['g', 'h'],
      keywords: 'go-home',
      section: 'Go To',
      perform: () => (window.location.pathname = ''),
      icon: <Lottie lottieRef={homeRef} className='w-6 h-6 invert' animationData={homeIcon} loop={false} autoplay={false} />,
    },
    // go to Note
    {
      id: 'note',
      name: t('KBarElement7'),
      shortcut: ['w', 'n'],
      keywords: 'view-note',
      section: 'General',
      perform: () => window.open('https://note-clement.vercel.app/', '_blank'),
      icon: <Lottie lottieRef={sourceRef} className='w-6 h-6 invert' animationData={sourceIcon} loop={false} autoplay={false} />,
    },
    // Articles Tabs
    {
      id: 'articles',
      name: 'Articles',
      shortcut: ['g', 'b'],
      keywords: 'go-articles',
      section: 'Go To',
      perform: () => (window.location.pathname = 'portfolio/articles'),
      icon: <Lottie lottieRef={articlesRef} className='w-6 h-6 invert' animationData={articlesIcon} loop={false} autoplay={false} />,
    },
    // Projects tabs
    {
      id: 'projects',
      name: 'Projects',
      shortcut: ['g', 'p'],
      keywords: 'go-projects',
      section: 'Go To',
      perform: () => (window.location.pathname = 'portfolio/projects'),
      icon: <Lottie lottieRef={projectsRef} className='w-6 h-6 invert' animationData={projectsIcon} loop={false} autoplay={false} />,
    },
    // Materials tabs
    {
      id: 'uses',
      name: t('KBarElement5'),
      shortcut: ['g', 'u'],
      keywords: 'go-uses',
      section: 'Go To',
      perform: () => (window.location.pathname = 'portfolio/uses'),
      icon: <Lottie lottieRef={usesRef} className='w-6 h-6 invert' animationData={usesIcon} loop={false} autoplay={false} />,
    },
    // reminder tabs
    {
      id: 'reminder',
      name: t('KBarElement6'),
      shortcut: ['g', 'r'],
      keywords: 'go-reminder',
      section: 'Go To',
      perform: () => (window.location.pathname = 'portfolio/reminder'),
      icon: <Lottie lottieRef={reminderRef} className='w-6 h-6 invert' animationData={reminderIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'technews',
      name: "TechNews",
      shortcut: ['g', 't'],
      keywords: 'go-tech',
      section: 'Go To',
      perform: () => (window.location.pathname = 'portfolio/technews'),
      icon: <Lottie lottieRef={usesRef} className='w-6 h-6 invert' animationData={usesIcon} loop={false} autoplay={false} />,
    },
    // Dark Theme action
    {
      id: 'Dark',
      name: t('KBarElementTheme1'),
      shortcut: ['d', 't'],
      keywords: 'DarkTheme',
      section: 'Theme',
      perform: () => setDarkMode(true),
      icon: <Lottie lottieRef={darkRef} className='w-6 h-6' animationData={darkIcons} loop={false} autoplay={false} />,
    },
    // Light Theme action
    {
      id: 'Light',
      name: t('KBarElementTheme2'),
      shortcut: ['l', 't'],
      keywords: 'LightTheme',
      section: 'Theme',
      perform: () => setDarkMode(false),
      icon: <Lottie lottieRef={lightRef} className='w-6 h-6' animationData={lightIcons} loop={false} autoplay={false} />,
    },
    // English language action
    {
      id: 'English',
      name: 'English',
      shortcut: ['e', 'n'],
      keywords: 'English lang',
      section: 'lang',
      perform: () => changeLanguage('en'),
      icon: <Lottie lottieRef={langRef} className='w-6 h-6 dark:invert scale-150' animationData={langIcon} loop={false} autoplay={false} />,
    },
    // French language action
    {
      id: 'french',
      name: 'Français',
      shortcut: ['f', 'r'],
      keywords: 'French lang',
      section: 'lang',
      perform: () => changeLanguage('fr'),
      icon: <Lottie lottieRef={langRef} className='w-6 h-6 dark:invert scale-150' animationData={langIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'Korean',
      name: 'Korean',
      shortcut: ['k', 'o'],
      keywords: 'Korean lang',
      section: 'lang',
      perform: () => changeLanguage('ko'),
      icon: <Lottie lottieRef={langRef} className='w-6 h-6 dark:invert scale-150' animationData={langIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'German',
      name: 'German',
      shortcut: ['d', 'e'],
      keywords: 'German lang',
      section: 'lang',
      perform: () => changeLanguage('de'),
      icon: <Lottie lottieRef={langRef} className='w-6 h-6 dark:invert scale-150' animationData={langIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'Portuguese',
      name: 'Portuguese',
      shortcut: ['p', 't'],
      keywords: 'Portuguese lang',
      section: 'lang',
      perform: () => changeLanguage('pt'),
      icon: <Lottie lottieRef={langRef} className='w-6 h-6 dark:invert scale-150' animationData={langIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'Arabic',
      name: 'Arabic',
      shortcut: ['a', 'r'],
      keywords: 'Arabic lang',
      section: 'lang',
      perform: () => changeLanguage('ar'),
      icon: <Lottie lottieRef={langRef} className='w-6 h-6 dark:invert scale-150' animationData={langIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'Russian',
      name: 'Russian',
      shortcut: ['r', 'u'],
      keywords: 'Russian lang',
      section: 'lang',
      perform: () => changeLanguage('ru'),
      icon: <Lottie lottieRef={langRef} className='w-6 h-6 dark:invert scale-150' animationData={langIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'Japanese',
      name: 'Japanese',
      shortcut: ['j', 'a'],
      keywords: 'Japanese lang',
      section: 'lang',
      perform: () => changeLanguage('ja'),
      icon: <Lottie lottieRef={langRef} className='w-6 h-6 dark:invert scale-150' animationData={langIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'Tunisian',
      name: 'Tunisian',
      shortcut: ['t', 'n'],
      keywords: 'Tunisian lang',
      section: 'lang',
      perform: () => changeLanguage('tn'),
      icon: <Lottie lottieRef={langRef} className='w-6 h-6 dark:invert scale-150' animationData={langIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'Chinese',
      name: 'Chinese',
      shortcut: ['z', 'h'],
      keywords: 'Chinese lang',
      section: 'lang',
      perform: () => changeLanguage('zh'),
      icon: <Lottie lottieRef={langRef} className='w-6 h-6 dark:invert scale-150' animationData={langIcon} loop={false} autoplay={false} />,
    },
    {
      id: 'Spanish',
      name: 'Spanish',
      shortcut: ['e', 's'],
      keywords: 'Spanish lang',
      section: 'lang',
      perform: () => changeLanguage('es'),
      icon: <Lottie lottieRef={langRef} className='w-6 h-6 dark:invert scale-150' animationData={langIcon} loop={false} autoplay={false} />,
    },
    // Social section
    {
      id: 'github',
      name: 'Github',
      shortcut: ['g', 'i', 't'],
      keywords: 'Github link social',
      section: 'Social',
      perform: () => window.open('https://github.com/ClementBobin', '_blank'),
      icon: <Lottie lottieRef={githubRef} className='w-6 h-6 dark:invert scale-[2.5]' animationData={githubIcons} loop={false} autoplay={false} />,
    },
    {
      id: 'linkedIn',
      name: 'LinkedIn',
      shortcut: ['l', 'i'],
      keywords: 'LinkedIn link social',
      section: 'Social',
      perform: () => window.open('https://www.linkedin.com/in/cl%C3%A9ment-bobin-958559293/', '_blank'),
      icon: <Lottie lottieRef={linkedInRef} className='w-6 h-6 dark:invert scale-150' animationData={linkedInIcons} loop={false} autoplay={false} />,
    },
    {
      id: 'codewars',
      name: 'Codewars',
      shortcut: ['c', 'w'],
      keywords: 'Codewars link social',
      section: 'Social',
      perform: () => window.open('https://www.codewars.com/users/ClementBobin', '_blank'),
      icon: <Lottie lottieRef={codewarsRef} className='w-6 h-6 dark:invert scale-[2]' animationData={codewarsIcons} loop={false} autoplay={false} />,
    },
    {
      id: 'buymeacoffee',
      name: 'Buy me a coffee',
      shortcut: ['c', 'f'],
      keywords: 'Coffe donation link social',
      section: 'Social',
      perform: () => window.open('https://www.buymeacoffee.com/clementbobin', '_blank'),
      icon: <Lottie lottieRef={coffeRef} className='w-6 h-6 dark:invert scale[2.5]' animationData={coffeIcons} loop={false} autoplay={false} />,
    },
  ];

  // Initial animation when the component mounts
  useEffect(() => {
    controls.start({ opacity: 1, y: '50%' });
  }, [controls]);

  // Render the KBar component
  return (
    <>
      {/* KBarProvider to define available actions */}
      <KBarProvider actions={actions}>
        {/* KBarPortal to render the KBar */}
        <KBarPortal>
          {/* KBarPositioner to position the KBar */}
          <KBarPositioner className='bg-black/50 backdrop-blur-sm'>
            {/* KBarAnimator for animation and styling */}
            <KBarAnimator className='rounded-xl bg-white shadow-xl flex flex-col space-x-4 w-[35rem] overflow-hidden dark:invert'>
              {/* Search input in the KBar */}
              <div className='flex px-2 text-xl font-medium text-slate-600'>
                <KBarSearch className='w-full outline-none pl-4 pr-6 py-4 bg-transparent selection:bg-sky-200 selection:text-black' />
              </div>
              {/* Render the search results */}
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
      </KBarProvider>
      {/* Toast component for displaying copy notification */}
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