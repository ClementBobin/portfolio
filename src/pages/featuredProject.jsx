/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

export default function FeaturedProject(props) {
  const { project } = props;

  const loadIcon = async () => {
    const icon = await import(`../../../icons/${project.icon}.json`);
    return icon;
  };

  const [icon, setIcon] = useState(null);

  const iconRef = useRef();

  useEffect(() => {
    const fetchIcon = async () => {
      const iconData = await loadIcon();
      setIcon(iconData);
    };

    fetchIcon();
  }, []);

  return (
    <a
      href={project.url}
      target="_blank"
      onMouseEnter={() => iconRef.current?.play()}
      onMouseLeave={() => iconRef.current?.stop()}
      className="flex transition-opacity border-none rounded-lg hover:opacity-100"
    >
      <Animation index={props.index}>
          {icon && (
            <Lottie
              lottieRef={iconRef}
              style={{ width: 24, height: 24, marginBottom: 10 }}
              animationData={icon}
              loop={false}
              autoplay={false}
            />
          )}
          <div className="flex-1">
            <p className="text-primary text-lg font-semibold">{project.title}</p>
            <p className="text-secondary leading-6">{project.description}</p>
            {project.stats && (
              <p className="mt-1 text-primary uppercase font-medium tracking-wide text-xs">
                {project.stats}
              </p>
            )}
          </div>
      </Animation>
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
          className="absolute top-0 left-0 right-0 rounded-xl bottom-0 z-[-1]"
        />
      )}
    </motion.span>
  );
}