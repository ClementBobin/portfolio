import { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Tooltip Component
 * 
 * @param {Object} props - Component properties.
 * @param {string} props.text - Text content for the tooltip.
 * @param {ReactNode} props.children - Child elements to trigger the tooltip.
 * @param {ReactNode} props.content - Additional content to be displayed in the tooltip.
 * @returns {JSX.Element} - Rendered component.
 */
const Tooltip = ({ text, children, content }) => {
  // State to manage tooltip visibility
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Show the tooltip.
   */
  const showTooltip = () => {
    setIsVisible(true);
  };

  /**
   * Hide the tooltip.
   */
  const hideTooltip = () => {
    setIsVisible(false);
  };

  return (
    // Container for the tooltip
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {/* Child elements that trigger the tooltip */}
      {children}
      {/* Tooltip content (visible only when `isVisible` is true) */}
      {isVisible && (
        <div
          style={{
            position: 'absolute',
            borderRadius: '3px',
            borderTop: '5px solid white',
            top: '100%',
            left: '50%',
            width: '50vw',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            padding: '5px',
            whiteSpace: 'normal',
            overflowWrap: 'break-word',
            maxWidth: '300px',
            zIndex: '1',
            textAlign: 'center',
          }}
        >
          {/* Render either provided content or default text */}
          {content ? (
            <Fragment>{content}</Fragment>
          ) : (
            <Fragment>{text}</Fragment>
          )}
        </div>
      )}
    </div>
  );
};

// PropTypes for type-checking and documentation
Tooltip.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node.isRequired,
  content: PropTypes.node,
};

export default Tooltip;