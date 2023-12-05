// Importing necessary dependencies and assets
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

import { styles } from "../../styles"; // Importing styles
import { github, githubFallback } from "../../assets"; // Importing GitHub icon
import { SectionWrapper } from "../../hoc"; // Importing a section wrapper HOC
import generateData from "../../constants"; // Importing data (projects)
import { fadeIn, textVariant } from "../../utils/motion"; // Importing motion-related utilities

// ProjectCard component for displaying individual project cards
const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  imageFallback,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      {/* Tilt component for interactive card tilting effect */}
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        {/* Container for the project image */}
        <div className='relative w-full h-[230px]'>
          {/* Project image */}
          <img
            src={image}
            srcSet={`${image} 1x, ${imageFallback} 2x`}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
            loading="lazy"
          />

          {/* GitHub icon for the source code link */}
          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                srcSet={`${github} 1x, ${githubFallback} 2x`}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Project details */}
        <div className='mt-5'>
          <h1 className='text-textColor font-bold text-[24px]'>{name}</h1>
          <p className='mt-2 dark:text-secondary text-textColor text-[14px]'>{description}</p>
        </div>

        {/* Project tags */}
        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

// Works component displaying a section with a list of projects
const Works = () => {
  const { t } = useTranslation();
  const { projects } = generateData(); // Fetching projects data from constants

  return (
    <section>
      {/* Section title and subtitle with motion effects */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-20 invert dark:invert-0">My Projects</h1>
      </motion.div>

      {/* Description of the projects section */}
      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 dark:text-secondary text-textColor text-[17px] max-w-3xl leading-[30px]'
        >
          {t('projectDescription')}
        </motion.p>
      </div>

      {/* Displaying individual project cards */}
      <div className='mt-20 flex flex-wrap gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </section>
  );
};

// Exporting the Works component wrapped with the SectionWrapper HOC
export default SectionWrapper(Works, "");