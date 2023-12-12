import {
  mobile,
  mobileFallback,
  backend,
  backendFallback,
  framer,
  framerFallback,
  web,
  webFallback,
  javascript,
  javascriptFallback,
  typescript,
  typescriptFallback,
  html,
  htmlFallback,
  css,
  cssFallback,
  reactjs,
  reactjsFallback,
  tailwind,
  tailwindFallback,
  nodejs,
  nodejsFallback,
  mongodb,
  mongodbFallback,
  git,
  gitFallback,
  figma,
  figmaFallback,
  docker,
  dockerFallback,
  threejs,
  sql,
  sqlFallback,
  php,
  phpFallback,
  python,
  pythonFallback,
  virtualbox,
  virtualboxFallback,
  vmware,
  vmwareFallback,
  anonym,
  devTools,
  devToolsFallback,
  hypervisor,
  hypervisorFallback,
  os,
  osFallback,
  world,
  worldFallback,
  learn,
  learnFallback,
  logique,
  logiqueFallback,
  competition,
  competitionFallback,
  team,
  teamFallback,
  windows,
  windowsFallback,
  linux,
  linuxFallback,
  project1,
  project1Fallback,
  project2,
  project2Fallback,
  project3,
  project3Fallback,
} from "../assets";
import { useTranslation } from 'react-i18next';
import Anchor from '../components/libStyleCompo/anchor';
import { useState } from "react";

// Function to generate data for the portfolio
const generateData = () => {
  // Hook to access translation function
  const { t } = useTranslation();
  // State variables for controlling window visibility
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
      id: "technews",
      title: "TechNews",
    },
  ];

   // Services data
  const services = [
    {
      title: "Web Developer",
      icon: web,
      iconFallback: webFallback,
    },
    {
      title: "Fontend Developer",
      icon: mobile,
      iconFallback: mobileFallback,
    },
    {
      title: "Backend Developer",
      icon: backend,
      iconFallback: backendFallback,
    },
  ];

  // Skill categories data
  const Skill_data = [
    {
      skill_name: "Html 5",
      Image: html,
      ImageFallback: htmlFallback,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Css",
      Image: css,
      ImageFallback: cssFallback,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Java Script",
      Image: javascript,
      ImageFallback: javascriptFallback,
      width: 65,
      height: 65,
    },
    {
      skill_name: "Tailwind Css",
      Image: tailwind,
      ImageFallback: tailwindFallback,
      width: 80,
      height: 80,
    },
    {
      skill_name: "React",
      Image: reactjs,
      ImageFallback: reactjsFallback,
      width: 80,
      height: 80,
    },
    {
      skill_name: "NodeJs",
      Image: nodejs,
      ImageFallback: nodejsFallback,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Type Script",
      Image: typescript,
      ImageFallback: typescriptFallback,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Framer Motion",
      Image: framer,
      ImageFallback: framerFallback,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Three JS",
      Image: threejs,
      ImageFallback: "",
      width: 80,
      height: 80,
    },
    {
      skill_name: "Mongo db",
      Image: mongodb,
      ImageFallback: mongodbFallback,
      width: 40,
      height: 40,
    },

  ];

  const Frontend_skill = [
    {
      skill_name: "Html 5",
      Image: html,
      ImageFallback: htmlFallback,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Css",
      Image: css,
      ImageFallback: cssFallback,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Tailwind Css",
      Image: tailwind,
      ImageFallback: tailwindFallback,
      width: 80,
      height: 80,
    },
    {
      skill_name: "React",
      Image: reactjs,
      ImageFallback: reactjsFallback,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Type Script",
      Image: typescript,
      ImageFallback: typescriptFallback,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Java Script",
      Image: javascript,
      ImageFallback: javascriptFallback,
      width: 80,
      height: 80,
    },
  ];

  const Backend_skill = [
    {
      skill_name: "Node js",
      Image: nodejs,
      ImageFallback: nodejsFallback,
      width: 80,
      height: 80,
    },
    {
      skill_name: "PHP",
      Image: php,
      ImageFallback: phpFallback,
      width: 80,
      height: 80,
    },
    {
      skill_name: "Mongo db",
      Image: mongodb,
      ImageFallback: mongodbFallback,
      width: 40,
      height: 40,
    },
    {
      skill_name: "Python",
      Image: python,
      ImageFallback: pythonFallback,
      width: 40,
      height: 40,
    },
    {
      skill_name: "My SQL",
      Image: sql,
      ImageFallback: sqlFallback,
      width: 70,
      height: 70,
    },
  ];

  const Full_stack = [
    {
      skill_name: "React Native",
      Image: reactjs,
      ImageFallback: reactjsFallback,
      width: 70,
      height: 70,
    },
    {
      skill_name: "Docker",
      Image: docker,
      ImageFallback: dockerFallback,
      width: 70,
      height: 70,
    },

    {
      skill_name: "Figma",
      Image: figma,
      ImageFallback: figmaFallback,
      width: 50,
      height: 50,
    },

  ];



  const Other_skill = [
    {
      skill_name: "hypervisor",
      Image: hypervisor,
      ImageFallback: hypervisorFallback,
      width: 40,
      height: 40,
      content: <div><div className="h-6 w-[100%] flex flex-row gap-1 justify-center"><img src={virtualbox} srcSet={`${virtualbox} 1x, ${virtualboxFallback} 2x`} loading="lazy"/><img src={vmware} srcSet={`${vmware} 1x, ${vmwareFallback} 2x`} loading="lazy"/><img src={docker} srcSet={`${docker} 1x, ${dockerFallback} 2x`} loading="lazy"/></div><p>{t('OtherSkillTooltip1')}</p></div>,
    },
    {
      skill_name: "Dev tools",
      Image: devTools,
      ImageFallback: devToolsFallback,
      width: 80,
      height: 80,
      content: <div><div className="h-6 w-[100%] flex flex-row gap-1 justify-center"><img src={git} srcSet={`${git} 1x, ${gitFallback} 2x`} loading="lazy"/></div><p>{t('OtherSkillTooltip2')}</p></div>,
    },
    {
      skill_name: "Os",
      Image: os,
      ImageFallback: osFallback,
      width: 80,
      height: 80,
      content: <div><div className="h-6 w-[100%] flex flex-row gap-1 justify-center"><img src={windows} srcSet={`${windows} 1x, ${windowsFallback} 2x`} loading="lazy"/><img src={linux} srcSet={`${linux} 1x, ${linuxFallback} 2x`} loading="lazy"/></div><p>{t('OtherSkillTooltip3')}</p></div>,
    },
    {
      skill_name: "Ouvert to the world",
      Image: world,
      ImageFallback: worldFallback,
      width: 80,
      height: 80,
      description: t('OtherSkillTooltip4'),
    },
    {
      skill_name: "Fast learner",
      Image: learn,
      ImageFallback: learnFallback,
      width: 80,
      height: 80,
      description: t('OtherSkillTooltip5'),
    },
    {
      skill_name: "Sens pratique",
      Image: logique,
      ImageFallback: logiqueFallback,
      width: 80,
      height: 80,
      description: t('OtherSkillTooltip6'),
    },
    {
      skill_name: "Travail d'équipe",
      Image: competition,
      ImageFallback: competitionFallback,
      width: 80,
      height: 80,
      description: t('OtherSkillTooltip7'),
    },
    {
      skill_name: "Travail d'équipe",
      Image: team,
      ImageFallback: teamFallback,
      width: 80,
      height: 80,
      description: t('OtherSkillTooltip8'),
    },
  ];

  // Experience data
  const experiences = [
    {
      title: t('experienceElement1Title'),
      company_name: "Monge",
      icon: "./company/school.svg",
      iconFallback: "",
      iconBg: "#383E56",
      date: t('experienceElement1Date'),
      points: [
        t('experienceElement1Points'),
      ],
    },
    {
      title: t('experienceElement2Title'),
      company_name: "Clos Maire",
      icon: "./company/school.svg",
      iconFallback: "",
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
      title: t('experienceElement4Title'),
      company_name: "Atelier Cinema",
      icon: "./company/school.svg",
      iconFallback: "",
      iconBg: "#383E56",
      date: t('experienceElement4Date'),
      points: [
        t('experienceElement4Points'),
      ],
    },
    {
      title: t('experienceElement5Title'),
      company_name: "Actemium",
      icon: "./company/school.svg",
      iconFallback: "",
      iconBg: "#383E56",
      date: t('experienceElement5Date'),
      points: [
        t('experienceElement5Points'),
      ],
    },
    {
      title: t('experienceElement3Title'),
      company_name: "Groupe Saint-bénigne",
      icon: "./company/logoSb.svg",
      iconFallback: "",
      iconBg: "#45e862",
      date: t('experienceElement3Date'),
      points: [
        <div><button className="underline" onClick={() => setShowWindowBts(true)}>bts SIO SLAM</button>-{'>'} <button onClick={() => setShowWindowRef(true)} className="underline">Tableau de compétence</button><Anchor title="Référentielle SIO" additionalInfo={<><iframe className="w-[85vw] h-[80vh]" src="./Tableau-Référentiel-SLAM-_2_.html"/><a href="./Tableau%20Référentiel%20SLAM%20(2).xlsx" download>Download Excel File</a></>} showWindow={showWindowRef} setShowWindow={setShowWindowRef}/><Anchor title="Bts SIO" additionalInfo={<><iframe className="w-[85vw] h-[80vh]" src="./referentielle_SIO.html"/></>} showWindow={showWindowBts} setShowWindow={setShowWindowBts}/></div>,
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
      imageFallback: "",
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
          name: "frammer",
          color: "green-text-gradient",
        },
        {
          name: "tailwind",
          color: "pink-text-gradient",
        },
      ],
      image: project1,
      imageFallback: project1Fallback,
      source_code_link: "https://github.com/ClementBobin/portfolio",
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
      image: project2,
      imageFallback: project2Fallback,
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
      image: project3,
      imageFallback: project3Fallback,
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