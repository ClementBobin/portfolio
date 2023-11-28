import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ListItem(props) {
  // Articles
  if (props.href.charAt(0) === '/') {
    return (
      <li className="border-b border-hover last:border-0">
        <Link href={props.href} passHref>
          <a className="text-decoration-none">
            <Animation index={props.index}>
              <span className="block max-w-500 font-bold text-18 leading-40 text-left">
                {props.title}
              </span>
              <span className="block text-secondary font-semibold text-14 min-w-100 text-left md:text-right">
                <BlogDate dateString={props.date} />
              </span>
            </Animation>
          </a>
        </Link>
      </li>
    );
  }

  // Podcasts
  return (
    <li>
      <a href={props.href} target="_blank" className="text-decoration-none">
        <Animation index={props.index}>
          <span className="block max-w-500 font-bold text-18 leading-40 text-left">
            {props.title}
          </span>
          <span className="block text-24">
            <i className="ri-arrow-right-up-line"></i>
          </span>
        </Animation>
      </a>
    </li>
  );
}

function Animation(props) {
  const [hovered, setHovered] = useState('');
  const isHovered = hovered === props.index;

  return (
    <motion.span
      className="border-0 text-secondary cursor-pointer flex justify-between p-20 w-full opacity-100 transition-all duration-300"
      onHoverStart={() => setHovered(props.index)}
      onHoverEnd={() => setHovered('')}
    >
      {isHovered && (
        <motion.span
          layoutId="listItem"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-0 left-[-20px] right-[-20px] bottom-0 bg-hover border-hover border-b border-t border-l rounded-borderRadius z-[-1]"
        />
      )}

      {props.children}
    </motion.span>
  );
}