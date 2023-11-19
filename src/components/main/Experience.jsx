import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

import 'react-vertical-timeline-component/style.min.css';

import { styles } from '../../styles';
import { experiences } from '../../constants';
import { SectionWrapper } from "../../hoc";
import { textVariant } from "../../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ backgroundColor: 'var(--time-line)', color: 'var(--textColor)' }}
      contentArrowStyle={{ borderRight: '7px solid var(--textColor)' }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img src={experience.icon} alt={experience.company_name} className="w-[60%] h-[60%] object-contain"/>
        </div>
      }
    >
      <div>
        <h3 className="text-textColor text-[24px] font-bold">
          {experience.title}
        </h3>
        <p className="dark:text-secondary text-textColor text-[16px] font-semibold" style={{ margin: 0 }}>{experience.company_name}</p>
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
  )
}

const Experience = () => {
  const { t } = useTranslation();

  return (
    <section>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>{t('experienceSectionSubText')}</p>
        <h2 className={styles.sectionHeadText}>Work Experience.</h2>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </section>
  )
}

export default SectionWrapper(Experience, "work")