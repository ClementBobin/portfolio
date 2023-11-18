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

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

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

const Socials = [
  {
    name: "Discord",
    src: "/instagram.svg",
  },
  {
    name: "Facebook",
    src: "/facebook.svg",
  },
  {
    name: "Instagram",
    src: "/discord.svg",
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

const experiences = [
  {
    title: "College",
    company_name: "Monge",
    icon: starbucks,
    iconBg: "#383E56",
    date: "September 2015 - June 2019",
    points: [
      "Dicovery of a passion about technologie",
    ],
  },
  {
    title: "Lycéen",
    company_name: "Clos Maire",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "September 2019 - June 2023",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, management, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
      "Dicover of my love for code"
    ],
  },
  {
    title: "Student",
    company_name: "Groupe Saint-bénigne",
    icon: Saint_bénigne,
    iconBg: "#45e862",
    date: "September 2023 - currently",
    points: [
      "",
    ]
  }
];

const testimonials = [
  {
    testimonial:
      "Clément was already much more experienced in code and error then me",
    name: "François Meunier",
    designation: "Prof",
    company: "Clos Maire",
    image: anonym,
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
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
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
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
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
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

export { services, Backend_skill, Frontend_skill, Full_stack, Other_skill, Skill_data, experiences, testimonials, projects };