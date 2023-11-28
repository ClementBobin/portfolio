import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

export default function FeaturedProject(props) {
  const { project } = props;

  /* const icon = require(`../public/static/icons/${project.icon}.json`); */
  const icon = (`../src/icons/about.json`);
  const iconRef = useRef();

  return (
    <a
      href={project.url}
      target="_blank"
      onMouseEnter={() => iconRef.current?.play()}
      onMouseLeave={() => iconRef.current?.stop()}
      className="flex transition-opacity border-none rounded-lg hover:opacity-100"
    >
      <div className="p-5">
        <Lottie
          lottieRef={iconRef}
          style={{ width: 24, height: 24, marginBottom: 10 }}
          animationData={icon}
          loop={false}
          autoplay={false}
        />
        <div className="flex-1">
          <p className="text-primary text-lg font-semibold">{project.title}</p>
          <p className="text-secondary leading-6">{project.description}</p>
          {project.stats && (
            <p className="mt-1 text-primary uppercase font-medium tracking-wide text-xs">
              {project.stats}
            </p>
          )}
        </div>
      </div>
      <Animation index={props.index} />
    </a>
  );
}

function Animation(props) {
  const [hovered, setHovered] = useState('');
  const isHovered = hovered === props.index;

  return (
    <motion.span
      onHoverStart={() => setHovered(props.index)}
      onHoverEnd={() => setHovered('')}
      className="relative w-full p-5"
    >
      {isHovered && (
        <motion.span
          layoutId="featuredProjects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-0 right-0 bottom-0 bg-hover rounded-lg z-[-1]"
        />
      )}
    </motion.span>
  );
}