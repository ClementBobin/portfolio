// Import necessary i18next and react-i18next libraries
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Define translation resources for different languages
const resources = {
  // French translations
  fr: {
    translation: {
      heroTitle: 'Transforme les idées',
      heroLiason: ' en',
      heroAccentuation: ' réalité numérique!',
      heroContent: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae hic odio quos possimus dolorum esse aperiam, enim iure temporibus? Minima dolore deserunt quam veritatis eveniet facilis neque adipisci officia dignissimos!',
      transitionTitle: 'Offrir',
      transitionAccentuation: 'la meilleure',
      transitionTitleFollow: 'expérience de projet',
      transitionSubtitle: "Je suis étudiant en 1er année de BTS SIO (Services informatique aux organisation) et je suis passionné par le développement web. Mon objectif est de devenir ingénieur Full Stack avec de l'expérience dans le développement de sites Web, de mobiles et de logiciels. J'ai une solide maîtrise des languages React, PHP, et Javascript, et je suis déterminé à développer mes compétences pour créer des expériences en ligne exceptionnelles et utile. Consultez mes projets et mes compétences.",
      skillBox: 'Mieux penser avec Next js 13',
      skillTitle: 'Créer des applications avec des technologies modernes',
      skillSubtitle: 'Ne jamais manquer une tâche, une échéance ou une idée',
      experienceSectionSubText: "Ce que j'ai fait jusqu'à présent",
      projectDescription: 'Les projets suivants présentent mes compétences et mon expérience à travers des exemples concrets de mon travail. Chaque projet est brièvement décrit avec des liens vers des dépôts de code et des démonstrations en direct. Il reflète ma capacité à résoudre des problèmes complexes, à travailler avec différentes technologies et à gérer des projets de manière efficace.',
      testimonialsSectionSubText: 'Ce que disent les autres',
      contactSectionSubText: 'CONTACTEZ-MOI',
      contactLabelName: 'Votre nom',
      contactFormNamePlaceholder: "Quel est votre nom ?",
      contactLabelEmail: 'Votre email',
      contactFormEmailPlaceholder: "Quelle est votre adresse email ?",
      contactLabelMessage: 'Votre message',
      contactFormMessagePlaceholder: 'Que voulez-vous dire ?',
      experienceElement1Title: 'College',
      experienceElement1Date: 'Septembre 2015 - Juin 2019',
      experienceElement1Points: 'engouement pour la technologie',
      experienceElement2Title: 'Lycéen',
      experienceElement2Date: 'Septembre 2019 - juin 2023',
      experienceElement2Points1: "Concevoir et assurer la maintenance d'applications web en utilisant React.js et d'autres technologies connexes.",
      experienceElement2Points2: "Participer activement à des projets collaboratifs impliquant des équipes interdisciplinaires, incluant des concepteurs, la direction et d'autres développeurs, afin de concevoir des produits de haute qualité.",
      experienceElement2Points3: 'Concevoir un design réactif et garantir la compatibilité entre les navigateurs.',
      experienceElement2Points4: "S'engager activement dans les revues de code et contribuer de manière constructive en fournissant des commentaires aux autres développeurs.",
      experienceElement2Points5: 'Découverte de ma fascination par le code et cela se ressent dans mon amour pour cette discipline.',
      experienceElement3Title: 'bts SIO',
      experienceElement3Date: 'Septembre 2023 - actuellement',
      testimonialsElement1Description : 'Clément était déjà beaucoup plus expérimenté en code et erreur que moi',
      testimonialsElement1Designation: 'Prof',
      projectsElement1Name: 'location de voitures',
      projectsElement1Description: 'Sur cette plateforme en ligne, les utilisateurs peuvent effectuer des recherches, réserver et gérer des locations de voitures auprès de différents fournisseurs, offrant ainsi une solution pratique et efficace pour les besoins de transport.',
      projectsElement2Name: 'Recherche de travail dans la Tech',
      projectsElement2Description: "Outil en ligne permettant aux utilisateurs de trouver des offres d'emploi, de consulter les salaires estimés pour les postes et de localiser les emplois disponibles en fonction de leur emplacement actuel.",
      projectsElement3Name: "guide d'excursion",
      projectsElement3Description: 'Réservez facilement vos voyages grâce à cette plateforme complète qui vous permet de réserver des vols, des hôtels et des voitures de location, ainsi que des recommandations organisées pour les destinations les plus populaires.',
    },
  },
  // English translations
  en: {
    translation: {
      heroTitle: 'Transforming Ideas',
      heroLiason: ' Into',
      heroAccentuation: ' Digital Reality!',
      heroContent: "👋 Hello there! I'm Clement, a passionate and ambitious student with a dream of becoming a full-stack developer. Welcome to my corner of the internet, where I share my journey and adventures in the world of coding",
      transitionTitle: 'Providing',
      transitionAccentuation: 'the best',
      transitionTitleFollow: 'project experience',
      transitionSubtitle: "🚀 I am on a mission to master both the front-end and back-end realms of web development. From crafting seamless user interfaces to building robust server-side applications, I thrive on the challenge of creating dynamic and interactive web experiences.",
      skillBox: 'Think better with Next js 13',
      skillTitle: '💻 Tech Stack',
      skillSubtitle: "I am well-versed in a variety of technologies, including HTML, CSS, JavaScript for the front end, and Node.js, Express.js, and MongoDB for the back end. Whether it's designing responsive layouts or architecting scalable databases, I love the versatility that full-stack development offers.",
      experienceSectionSubText: 'What I have done so far',
      experienceDescription: "🎓 Join me on this exciting journey through the world of academia and programming. I'm currently pursuing bts SIO at Saint-benigne, and every day brings new challenges and discoveries that I can't wait to share.",
      projectDescription: '🛠️Following projects showcases my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos in it. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.',
      testimonialsSectionSubText: 'What others say',
      contactSectionSubText: 'GET IN TOUCH',
      contactSectionDescription: "🌐 Let's connect! Whether you're a fellow developer, a potential collaborator, or someone with a shared passion for technology, I'm always open to new connections. Feel free to reach out through the contact form or connect with me on LinkedIn and GitHub.",
      contactLabelName: 'Your Name',
      contactFormNamePlaceholder: "What's your good name?",
      contactLabelEmail: 'Your email',
      contactFormEmailPlaceholder: "What's your web address?",
      contactLabelMessage: 'Your Message',
      contactFormMessagePlaceholder: 'What you want to say?',
      experienceElement1Title: 'College',
      experienceElement1Date: 'September 2015 - June 2019',
      experienceElement1Points: 'Dicovery of a passion about technologie',
      experienceElement2Title: 'Lycéen',
      experienceElement2Date: 'September 2019 - June 2023',
      experienceElement2Points1: 'Developing and maintaining web applications using React.js and other related technologies.',
      experienceElement2Points2: 'Collaborating with cross-functional teams including designers, management, and other developers to create high-quality products.',
      experienceElement2Points3: 'Implementing responsive design and ensuring cross-browser compatibility.',
      experienceElement2Points4: 'Participating in code reviews and providing constructive feedback to other developers.',
      experienceElement2Points5: 'Dicover of my love for code',
      experienceElement3Title: 'bts SIO',
      experienceElement3Date: 'September 2023 - currently',
      testimonialsElement1Description : 'Clément was already much more experienced in code and error then me',
      testimonialsElement1Designation: 'Prof',
      projectsElement1Name: 'Car Rent',
      projectsElement1Description: 'Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.',
      projectsElement2Name: 'Job IT',
      projectsElement2Description: 'Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.',
      projectsElement3Name: 'Trip Guide',
      projectsElement3Description: 'A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.',
      defaultTitle: 'Welcome To My Webside',
      defaultCard2SubTitle: 'Choose where you want to go',
      defaultCard2Description: 'You can also navigate by using the kbar interface ',
      defaultCard3Choix1Description: 'A basic portfolio for a quick understanding',
      defaultCard3Choix2Description: 'Advanced Portfolio for better understanding',
      defaultCard3ChoixBtn: 'Continue with this option',
      KBarElement1: 'Copy Link',
      KBarElement2: 'Test Zone',
      KBarElement3: 'Send Email',
      KBarElement4: 'View Source',
      KBarElement5: 'Uses',
      KBarElement6: 'Reminder',
      KBarElementTheme1: 'DarkTheme',
      KBarElementTheme2: 'LightTheme',
    },
  },
};

// Initialize i18next with React support
i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

// Export the configured i18n instance
export default i18n;
