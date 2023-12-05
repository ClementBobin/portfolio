// Importing necessary React components and utilities
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

// Importing styles, components, and motion-related utility functions
import 'react-vertical-timeline-component/style.min.css';
import { styles } from '../../styles';
import generateData from '../../constants';
import { SectionWrapper } from "../../hoc";
import { textVariant, fadeIn } from "../../utils/motion";

// Functional component for each work experience card in the timeline
const ExperienceCard = ({ experience }) => {
  
  return (
    <VerticalTimelineElement
      contentStyle={{ backgroundColor: 'var(--time-line)', color: 'var(--textColor)' }}
      contentArrowStyle={{ borderRight: '7px solid var(--textColor)' }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img src={experience.icon} srcSet={experience.iconFallback} alt={experience.company_name} className="w-[60%] h-[60%] object-contain" loading="lazy"/>
        </div>
      }
    >
      <div>
        {/* Title of the work experience */}
        <h3 className="text-textColor text-[24px] font-bold">
          {experience.title}
        </h3>
        {/* Company name */}
        <p className="dark:text-secondary text-textColor text-[16px] font-semibold" style={{ margin: 0 }}>{experience.company_name}</p>
        {/* List of bullet points describing the experience */}
        <ul className="mt-5 list-disc ml-5 space-y-2">
          {experience.points.map((point, index) => (
            <li
              key={`experience-point-${index}`}
              className="text-white-100 text-[14px] pl-1 tracking-wider"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </VerticalTimelineElement>
  );
};

// Functional component for the "Experience" section
const Experience = () => {
  // Accessing translation function from i18next and fetching experience data
  const { t } = useTranslation();
  const { experiences } = generateData();

  // Rendering the "Experience" section
  return (
    <section>
      <motion.div variants={textVariant()}>
        {/* Subtitle and heading for the section */}
        <p className={styles.sectionSubText}>{t('experienceSectionSubText')}</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>
      <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 dark:text-secondary text-textColor text-[17px] max-w-3xl leading-[30px]'
        >
          {t('experienceDescription')}
      </motion.p>

      {/* Container for the work experience timeline */}
      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {/* Mapping through each experience and rendering an ExperienceCard for each */}
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </section>
  );
};

// Exporting the "Experience" section with styling applied by the higher-order component
export default SectionWrapper(Experience, "work");