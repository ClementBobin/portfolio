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
import Anchor from '../components/anchor';
import { useState } from "react";

// Function to generate data for the portfolio
const generateData = () => {
  // Hook to access translation function
  const { t } = useTranslation();
  const [showWindow, setShowWindow] = useState(false);

  // Navigation links
  const navLinks = [
    {
      id: "about",
      title: "about",
    },
    {
      id: "work",
      title: "work",
    },
    {
      id: "contact",
      title: "contact",
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
    },
    {
      skill_name: "VMware",
      Image: vmware,
      width: 40,
      height: 40,
    },
    {
      skill_name: "Git",
      Image: git,
      width: 80,
      height: 80,
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
        <p>bts SIO -{'>'} <button onClick={() => setShowWindow(true)}>Référentiel</button> / <button>Tableau de compétence</button><Anchor title="Référentielle SIO" additionalInfo={<><iframe className="w-[85vw] h-[80vh]" src="src/assets/Tableau-Référentiel-SLAM-_2_.html"/><a href="assets/Tableau%20Référentiel%20SLAM%20(2).xlsx" download>Download Excel File</a></>} showWindow={showWindow} setShowWindow={setShowWindow}/></p>,
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