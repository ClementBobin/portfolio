import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
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

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "Git",
    icon: git,
  },
  {
    name: "Figma",
    icon: figma,
  },
  {
    name: "Docker",
    icon: docker,
  },
  {
    name: "Sql",
    icon: sql,
  },
  {
    name: "Php",
    icon: php,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "Arduino",
    icon: arduino,
  },
  {
    name: "VMware",
    icon: vmware,
  },
  {
    name: "Virtualbox",
    icon: virtualbox,
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

export { services, technologies, experiences, testimonials, projects };