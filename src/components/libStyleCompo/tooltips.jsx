import { useState, Fragment } from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ text, children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  const showTooltip = () => {
    setIsVisible(true);
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  return (
    <div
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
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

Tooltip.propTypes = {
  text: PropTypes.string,
  children: PropTypes.node.isRequired,
  content: PropTypes.node,
};

export default Tooltip;
