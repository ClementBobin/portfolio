import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// translations here
const resources = {
  fr: {
    translation: {
      heroTitle: 'Transforme les idées',
      heroLiason: ' en',
      heroAccentuation: ' réalité numérique!',
      heroContent: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae hic odio quos possimus dolorum esse aperiam, enim iure temporibus? Minima dolore deserunt quam veritatis eveniet facilis neque adipisci officia dignissimos!',
      transitionTitle: 'Offrir',
      transitionAccentuation: 'la meilleure',
      transitionTitleFollow: 'expérience de projet',
      transitionSubtitle: "Je suis un ingénieur Full Stack avec de l'expérience dans le développement de sites Web, de mobiles et de logiciels. Consultez mes projets et mes compétences.",
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
    },
  },
  en: {
    translation: {
      heroTitle: 'Transforming Ideas',
      heroLiason: ' Into',
      heroAccentuation: ' Digital Reality!',
      heroContent: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae hic odio quos possimus dolorum esse aperiam, enim iure temporibus? Minima dolore deserunt quam veritatis eveniet facilis neque adipisci officia dignissimos!',
      transitionTitle: 'Providing',
      transitionAccentuation: 'the best',
      transitionTitleFollow: 'project experience',
      transitionSubtitle: "I'm a Full Stack Engineer with experience in Website, Mobile, and Software development. Check out my projects and skills.",
      skillBox: 'Think better with Next js 13',
      skillTitle: 'Making apps with modern technologies',
      skillSubtitle: 'Never miss a task, deadline or idea',
      experienceSectionSubText: 'What I have done so far',
      experienceDescription: 'Following projects showcases my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos in it. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.',
      testimonialsSectionSubText: 'What others say',
      contactSectionSubText: 'GET IN TOUCH',
      contactLabelName: 'Your Name',
      contactFormNamePlaceholder: "What's your good name?",
      contactLabelEmail: 'Your email',
      contactFormEmailPlaceholder: "What's your web address?",
      contactLabelMessage: 'Your Message',
      contactFormMessagePlaceholder: 'What you want to say?',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
