import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// ListItem component for rendering either an article or a podcast link
export default function ListItem(props) {
  // If the link is an internal article
  if (props.href.charAt(0) === '/') {
    return (
      // List item with a border and transition styling
      <li className="border-b border-hover last:border-0">
        {/* Internal link using react-router-dom's Link */}
        <Link to={props.href} className="text-decoration-none">
          {/* Link container with animation */}
          <a>
            {/* Animation component for smooth transitions */}
            <Animation index={props.index}>
              {/* Article title */}
              <span className="block max-w-500 font-bold text-18 leading-40 text-left">
                {props.title}
              </span>
              {/* Article date */}
              <span className="block text-secondary font-semibold text-14 min-w-100 text-left md:text-right">
                {/* Custom component for formatting the date */}
                <BlogDate dateString={props.date} />
              </span>
            </Animation>
          </a>
        </Link>
      </li>
    );
  }

  // If the link is an external podcast
  return (
    // List item for external link
    <li>
      {/* External link using anchor tag with target="_blank" */}
      <a href={props.href} target="_blank" className="text-decoration-none" rel="noopener noreferrer">
        {/* Link container with animation */}
        <Animation index={props.index}>
          {/* Podcast title */}
          <span className="block max-w-500 font-bold text-18 leading-40 text-left">
            {props.title}
          </span>
          {/* Podcast icon */}
          <span className="block text-24">
            {/* Assume ri-arrow-right-up-line represents a link to a podcast */}
            <i className="ri-arrow-right-up-line"></i>
          </span>
        </Animation>
      </a>
    </li>
  );
}

// Animation component for hover effect
function Animation(props) {
  // State to track hovered state
  const [hovered, setHovered] = useState('');
  // Check if the current item is being hovered
  const isHovered = hovered === props.index;

  return (
    // Motion component for smooth transitions
    <motion.span
      className="border-0 text-secondary cursor-pointer flex justify-between p-20 w-full opacity-100 transition-all duration-300"
      // Event handlers for hover effect
      onHoverStart={() => setHovered(props.index)}
      onHoverEnd={() => setHovered('')}
    >
      {/* Display hover effect overlay when hovered */}
      {isHovered && (
        // Overlay with motion properties for smooth transition
        <motion.span
          layoutId="listItem"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-[-20px] right-[-20px] bottom-0 bg-hover border-hover border-b border-t border-l rounded-borderRadius z-[-1]"
        />
      )}

      {/* Render children (title, date, or icon) */}
      {props.children}
    </motion.span>
  );
}