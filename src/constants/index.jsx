import {
  mobile,
  backend,
  creator,
  framer,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  Saint_bénigne,
  carrent,
  jobit,
  tripguide,
  threejs,
  sql,
  php,
  python,
  arduino,
  virtualbox,
  vmware,
  anonym,
} from "../assets";
import { useTranslation } from 'react-i18next';
import Anchor from '../components/libStyleCompo/anchor';
import { useState } from "react";

// Function to generate data for the portfolio
const generateData = () => {
  // Hook to access translation function
  const { t } = useTranslation();
  const [showWindowRef, setShowWindowRef] = useState(false);
  const [showWindowBts, setShowWindowBts] = useState(false);

  // Navigation links
  const navLinks = [
    {
      id: "uses",
      title: "Uses",
    },
    {
      id: "projects",
      title: "Projects",
    },
    {
      id: "reminder",
      title: "Reminder",
    },
    {
      id: "articles",
      title: "Articles",
    },
    {
      id: "cv",
      title: "Cv",
    },
    {
      id: "technews",
      title: "TechNews",
    },
  ];

   // Services data
  const services = [
    {
      title: "Web Developer",
      icon: web,
    },
    {
      title: "Fontend Developer",
      icon: mobile,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
  ];

  // Skill const
  const Skill_data = [
    {
      skill_name: "Html 5",
      Image: html,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Css",
      Image: css,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Java Script",
      Image: javascript,
      width: 65,
      height: 65,
    },
    {
      skill_name: "Tailwind Css",
      Image: tailwind,
      width: 80,
      height: 80,
    },
    {
      skill_name: "React",
      Image: reactjs,
      width: 80,
      height: 80,
    },
    {
      skill_name: "NodeJs",
      Image: nodejs,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Type Script",
      Image: typescript,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Framer Motion",
      Image: framer,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Three JS",
      Image: threejs,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Mongo db",
      Image: mongodb,
      width: 40,
      height: 40,
    },

  ];

  const Frontend_skill = [
    {
      skill_name: "Html 5",
      Image: html,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Css",
      Image: css,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Tailwind Css",
      Image: tailwind,
      width: 80,
      height: 80,
    },
    {
      skill_name: "React",
      Image: reactjs,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Type Script",
      Image: typescript,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Java Script",
      Image: javascript,
      width: 80,
      height: 80,
    },
  ];

  const Backend_skill = [
    {
      skill_name: "Node js",
      Image: nodejs,
      width: 80,
      height: 80,
    },
    {
      skill_name: "PHP",
      Image: php,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Mongo db",
      Image: mongodb,
      width: 40,
      height: 40,
    },
    {
      skill_name: "Python",
      Image: python,
      width: 40,
      height: 40,
    },
    {
      skill_name: "My SQL",
      Image: sql,
      width: 70,
      height: 70,
    },
  ];

  const Full_stack = [
    {
      skill_name: "React Native",
      Image: reactjs,
      width: 70,
      height: 70,
    },
    {
      skill_name: "Docker",
      Image: docker,
      width: 70,
      height: 70,
    },

    {
      skill_name: "Figma",
      Image: figma,
      width: 50,
      height: 50,
    },

  ];



  const Other_skill = [
    {
      skill_name: "Virtualbox",
      Image: virtualbox,
      width: 40,
      height: 40,
      content: <div><div className="h-6 w-[100%] flex flex-row gap-1 justify-center"><img src={virtualbox}/><img src={vmware}/><img src={docker}/></div><p>I can use hypervisor</p></div>,
    },
    {
      skill_name: "Dev tools",
      Image: git,
      width: 80,
      height: 80,
      content: <div><div className="h-6 w-[100%] flex flex-row gap-1 justify-center"><img src={virtualbox}/><img src={vmware}/><img src={docker}/></div><p>I use dev tools</p></div>,
    },
    {
      skill_name: "Os",
      Image: git,
      width: 80,
      height: 80,
      content: <div><div className="h-6 w-[100%] flex flex-row gap-1 justify-center"><img src={virtualbox}/><img src={vmware}/><img src={docker}/></div><p>I have experimented with linux, windows</p></div>,
    },
    {
      skill_name: "Ouvert to the world",
      Image: git,
      width: 80,
      height: 80,
      description: "Ouverture au monde",
    },
    {
      skill_name: "Fast learner",
      Image: git,
      width: 80,
      height: 80,
      description: "📚 Constant Learner: In the fast-evolving tech landscape, I believe in the power of continuous learning. My curiosity drives me to explore new technologies, frameworks, and methodologies, ensuring that I stay ahead of the curve and deliver cutting-edge solutions. Quand j'aime se que je fais je vais tout donner pour apprendre vite et rattraper le niveau de se qui m'apprenne, j'ai toujours réussi a apprendre plus vite que les autres.",
    },
    {
      skill_name: "Sens pratique",
      Image: git,
      width: 80,
      height: 80,
      description: "J'aime quand les choses sont ordonnées et je fais tout pour que mon travail le soit, pour avoir un gain de temps et ne pas en perdre.",
    },
    {
      skill_name: "Travail d'équipe",
      Image: git,
      width: 80,
      height: 80,
      description: "J'aime jouer a des sports d'équipe comme le basketball ou le football, j'aime la compétition et tout faire pour être meilleur et travailler peut créer un espris de compétition.",
    },
  ];

  // Experience data
  const experiences = [
    {
      title: t('experienceElement1Title'),
      company_name: "Monge",
      icon: starbucks,
      iconBg: "#383E56",
      date: t('experienceElement1Date'),
      points: [
        t('experienceElement1Points'),
      ],
    },
    {
      title: t('experienceElement2Title'),
      company_name: "Clos Maire",
      icon: tesla,
      iconBg: "#E6DEDD",
      date: t('experienceElement2Date'),
      points: [
        t('experienceElement2Points1'),
        t('experienceElement2Points2'),
        t('experienceElement2Points3'),
        t('experienceElement2Points4'),
        t('experienceElement2Points5'),
      ],
    },
    {
      title: t('experienceElement3Title'),
      company_name: "Groupe Saint-bénigne",
      icon: Saint_bénigne,
      iconBg: "#45e862",
      date: t('experienceElement3Date'),
      points: [
        <div><button className="underline" onClick={() => setShowWindowBts(true)}>bts SIO SLAM</button>-{'>'} <button onClick={() => setShowWindowRef(true)} className="underline">Tableau de compétence</button><Anchor title="Référentielle SIO" additionalInfo={<><iframe className="w-[85vw] h-[80vh]" src="src/assets/Tableau-Référentiel-SLAM-_2_.html"/><a href="assets/Tableau%20Référentiel%20SLAM%20(2).xlsx" download>Download Excel File</a></>} showWindow={showWindowRef} setShowWindow={setShowWindowRef}/><Anchor title="Bts SIO" additionalInfo={<><iframe className="w-[85vw] h-[80vh]" src="src/assets/Referentielle SIO.html"/></>} showWindow={showWindowBts} setShowWindow={setShowWindowBts}/></div>,
      ]
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      testimonial: t('testimonialsElement1Description'),
      name: "François Meunier",
      designation: t('testimonialsElement1Designation'),
      company: "Clos Maire",
      image: anonym,
    },
  ];

  // Projects data
  const projects = [
    {
      name: t('projectsElement1Name'),
      description: t('projectsElement1Description'),
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "mongodb",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/",
    },
    {
      name: t('projectsElement2Name'),
      description: t('projectsElement2Description'),
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "restapi",
          color: "green-text-gradient",
        },
        {
          name: "scss",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/",
    },
    {
      name: t('projectsElement3Name'),
      description: t('projectsElement3Description'),
      tags: [
        {
          name: "nextjs",
          color: "blue-text-gradient",
        },
        {
          name: "supabase",
          color: "green-text-gradient",
        },
        {
          name: "css",
          color: "pink-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://github.com/",
    },
  ];

  // Return all generated data
  return{
    navLinks,
    services,
    Skill_data,
    Frontend_skill,
    Backend_skill,
    Full_stack,
    Other_skill,
    experiences,
    testimonials,
    projects,
  };
};

// Export the generateData function
export default generateData;