import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

// FeaturedProject component responsible for displaying individual project details
export default function FeaturedProject(props) {
  const { project } = props;

  // State to store the loaded Lottie animation data
  const [icon, setIcon] = useState(null);
  // Ref to control Lottie animation playback
  const iconRef = useRef();

  // useEffect to fetch and set the Lottie animation data when project.icon changes
  useEffect(() => {
    // Async function to fetch Lottie animation data
    const fetchIcon = async () => {
      try {
        // Importing the Lottie animation JSON file dynamically
        const iconLottie = await import(`../assets/icons/${project.icon}.json`);
        return iconLottie;
      } catch (error) {
        console.error('Error loading icon:', error);
      }
    };

    // Fetch and set the Lottie animation data
    const iconLottie = fetchIcon();
    setIcon(iconLottie);
  }, [project.icon]);

  // Log the loaded icon for debugging
  console.log(icon);

  // Render the project details with Lottie animation
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
        {/* Render Lottie animation if icon is loaded */}
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
        {/* Render project details */}
        <div style={{ flex: '1 1 auto' }}>
          <div className="text-lg font-semibold text-textColor">{project.title}</div>
          <p className="text-secondary leading-6">{project.description}</p>
          {/* Render project statistics if available */}
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

// Animation component to handle hover effects
function Animation(props) {
  // State to track hover status
  const [hovered, setHovered] = useState('');
  // Check if the component is being hovered
  const isHovered = hovered === props.index;

  // Render the animation with motion effects
  return (
    <motion.span
      onHoverStart={() => setHovered(props.index)}
      onHoverEnd={() => setHovered('')}
      className="relative w-full p-5"
    >
      {/* Display overlay on hover */}
      {isHovered && (
        <motion.span
          layoutId="featuredProjects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-0 right-0 rounded-xl bottom-0 z-[-1]"
        />
      )}
      {/* Render child components */}
      {props.children}
    </motion.span>
  );
}
