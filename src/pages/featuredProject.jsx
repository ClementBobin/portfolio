import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

export default function FeaturedProject(props) {
  const { project } = props;

  const [icon, setIcon] = useState(null)
  const iconRef = useRef();

  useEffect(() => {

    const fetchIcon = async () => {
      try {
        console.log(project.icon)
        const iconLottie = await import(`../assets/icons/${project.icon}.json`);
    
        console.log('Icon:', iconLottie);
        return iconLottie;
      } catch (error) {
        console.error('Error loading icon:', error);
      }
    };
    
    const iconLottie = fetchIcon();
    setIcon(iconLottie);
  }, [project.icon]);

  console.log(icon);

  return (
    <a
      href={project.url}
      target="_blank"
      onMouseEnter={() => iconRef.current?.play()}
      onMouseLeave={() => iconRef.current?.stop()}
      className="flex transition-opacity border-none rounded-lg hover:opacity-100 w-60"
      rel="noopener noreferrer"
    >
      <Animation index={props.index}>
          {icon && (
            <Lottie
            lottieRef={iconRef}
            style={{ width: 24, height: 24, marginBottom: 10 }}
            animationData={icon[props.index + 1]}
            loop={false}
            autoplay={false}
            onComplete={() => console.log('Lottie animation completed')}
            onError={(err) => console.error('Lottie animation error:', err)}
            />
          )}
          <div style={{ flex: '1 1 auto' }}>
            <div className="text-lg font-semibold text-textColor">{project.title}</div>
            <p className="text-secondary leading-6">{project.description}</p>
            {project.stats && (
              <div className="mt-1 uppercase font-medium tracking-wide text-xs">
                {project.stats}
              </div>
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
      {props.children}
    </motion.span>
  );
}