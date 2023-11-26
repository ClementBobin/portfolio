// Importing necessary React components and utilities
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useTranslation } from 'react-i18next';

// Importing styles, components, and motion-related utility functions
import { styles } from "../../../styles";
import EarthCanvas from "../canvas/Earth";
import { SectionWrapper } from "../../../hoc";
import { slideIn, fadeIn } from "../../../utils/motion";

// Functional component for the "Contact" section
const Contact = () => {
  // Accessing translation function from i18next
  const { t } = useTranslation();
  
  // Ref for the form and state for form data and loading status
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Handling changes in the form inputs
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  // Handling form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Sending email using emailjs
    emailjs
      .send(
          'service_srjcg7w',
          'template_mlgtzwx',
        {
          from_name: form.name,
          to_name: "Clement Bobin",
          from_email: form.email,
          to_email: "clementbobin21@gmail.com",
          message: form.message,
        },
        'nBWa3mLxHaVdr64CV',
      )
      .then(
        () => {
          setLoading(false);
          // Showing success message and resetting the form
          alert("I will get back to you as soon as possible. Also, thanks for stopping by, and I hope you enjoy exploring my digital space as much as I enjoy creating it! Let's code the future together. Happy coding! ✨");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          // Showing error message in case of failure
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  // Rendering the "Contact" section
  return (
    <section
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      {/* Left side of the section with contact form */}
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
        <p className={styles.sectionSubText}>{t('contactSectionSubText')}</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <p
          className='mt-3 dark:text-secondary text-textColor text-[17px] max-w-3xl leading-[30px]'
        >
          {t('contactSectionDescription')}
      </p>

        {/* Contact form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='mt-12 flex flex-col gap-8'
        >
          {/* Input for name */}
          <label className='flex flex-col'>
            <span className='text-textColor font-medium mb-4'>{t('contactLabelName')}</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder={t('contactFormNamePlaceholder')}
              className='bg-tertiary py-4 px-6 dark:placeholder:text-secondary placeholder:text-textColor text-textColor rounded-lg outline-none border-none font-medium'
            />
          </label>

          {/* Input for email */}
          <label className='flex flex-col'>
            <span className='text-textColor font-medium mb-4'>{t('contactLabelEmail')}</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder={t('contactFormEmailPlaceholder')}
              className='bg-tertiary py-4 px-6 dark:placeholder:text-secondary placeholder:text-textColor text-textColor rounded-lg outline-none border-none font-medium'
            />
          </label>

          {/* Textarea for message */}
          <label className='flex flex-col'>
            <span className='text-textColor font-medium mb-4'>{t('contactLabelMessage')}</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder={t('contactFormMessagePlaceholder')}
              className='bg-tertiary py-4 px-6 dark:placeholder:text-secondary placeholder:text-textColor text-textColor rounded-lg outline-none border-none font-medium'
            />
          </label>

          {/* Submit button */}
          <button
            type='submit'
            className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-textColor font-bold shadow-md shadow-primary'
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
      {/* Right side of the section with EarthCanvas component */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>

    </section>
  );
};

// Exporting the "Contact" section with styling applied by the higher-order component
export default SectionWrapper(Contact, "contact");