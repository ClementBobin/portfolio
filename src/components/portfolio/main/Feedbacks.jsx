// Importing necessary React components and utilities
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

// Importing styles, constants, and higher-order component
import { styles } from "../../../styles";
import { SectionWrapper } from "../../../hoc";
import { fadeIn, textVariant } from "../../../utils/motion";
import generateData from "../../../constants";

// Functional component for rendering an individual feedback card
const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className='bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full'
  >
    {/* Quotation mark */}
    <p className='text-textColor font-black text-[48px]'>"</p>

    <div className='mt-1'>
      {/* Testimonial text */}
      <p className='text-textColor tracking-wider text-[18px]'>{testimonial}</p>

      <div className='mt-7 flex justify-between items-center gap-1'>
        <div className='flex-1 flex flex-col'>
          {/* Name, designation, and company information */}
          <p className='text-textColor font-medium text-[16px]'>
            <span className='blue-text-gradient'>@</span> {name}
          </p>
          <p className='mt-1 text-secondary text-[12px]'>
            {designation} of {company}
          </p>
        </div>

        {/* Image of the person providing the feedback */}
        <img
          src={image}
          alt={`feedback_by-${name}`}
          className='w-10 h-10 rounded-full object-cover'
        />
      </div>
    </div>
  </motion.div>
);

// Functional component for the "Testimonials" section
const Feedbacks = () => {
  // Accessing translation function from i18next and fetching testimonial data
  const { t } = useTranslation();
  const { testimonials } = generateData();

  // Rendering the "Testimonials" section
  return (
    <section className={`mt-12 bg-black-100 rounded-[20px]`}>
      <div
        className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}
      >
        <motion.div variants={textVariant()}>
          {/* Subtitle and heading for the section */}
          <p className={styles.sectionSubText}>{t('testimonialsSectionSubText')}</p>
          <h2 className={styles.sectionHeadText}>Testimonials.</h2>
        </motion.div>
      </div>
      {/* Container for the feedback cards */}
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {/* Mapping through each testimonial and rendering a FeedbackCard for each */}
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

// Exporting the "Testimonials" section with styling applied by the higher-order component
export default SectionWrapper(Feedbacks, "");