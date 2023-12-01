import { useState } from 'react';
import { motion } from 'framer-motion';

// FeaturedArticle component responsible for displaying individual featured articles
export default function FeaturedArticle(props) {
  // Render a link containing the Animation component with article details
  return (
    <a href={props.href} className="border-0 w-64 md:w-full mx-4 md:mx-0 no-underline hover:opacity-100 first:ml-0">
      <Animation index={props.index} image={props.image} title={props.title} description={props.description} />
    </a>
  );
}

// Animation component to handle hover effects and display article details
function Animation({ image, title, description }) {
  // State to track hover status
  const [hovered, setHovered] = useState(false);

  // Render the Animation component with motion effects and article details
  return (
    <div
      className="relative w-full p-5 transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Display background overlay on hover */}
      {hovered && (
        <motion.div
          layoutId="featuredArticles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-0 right-0 bottom-0 bg-blue-500 rounded-md z-[-1]"
        />
      )}

      {/* Render article details */}
      <div className="flex flex-col">
        <div
          className="w-full h-40 mb-5 bg-cover bg-center rounded-md filter grayscale-100"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="max-w-[450px] md:max-w-full md:mr-0">
          <h3 className="text-primary text-xl mb-2">{title}</h3>
          <p className="text-secondary line-clamp-2 overflow-hidden">{description}</p>
          <p className="mt-1 text-primary uppercase inline-block font-semibold tracking-wider text-sm">
            {/* {stats.text} */}
          </p>
        </div>
      </div>
    </div>
  );
}