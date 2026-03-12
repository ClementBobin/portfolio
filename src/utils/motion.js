// Text animation variant
export const textVariant = (delay = 0) => ({
  hidden: { y: -50, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", duration: 1.25, delay } 
  },
});

// Generic fade-in animation
export const fadeIn = (direction = "up", type = "tween", delay = 0, duration = 1) => {
  let x = 0, y = 0;
  if (direction === "left") x = 100;
  else if (direction === "right") x = -100;
  else if (direction === "up") y = 100;
  else if (direction === "down") y = -100;

  return {
    hidden: { x, y, opacity: 0 },
    show: { 
      x: 0, 
      y: 0, 
      opacity: 1, 
      transition: { type, delay, duration, ease: [0.25, 0.1, 0.25, 1] } 
    },
  };
};

// Zoom-in animation
export const zoomIn = (delay = 0, duration = 0.5) => ({
  hidden: { scale: 0, opacity: 0 },
  show: { 
    scale: 1, 
    opacity: 1, 
    transition: { type: "tween", delay, duration, ease: [0.25,0.1,0.25,1] } 
  },
});

// Slide-in animation (generalized)
export const slideIn = (direction = "up", type = "tween", delay = 0, duration = 0.5) => {
  let x = 0, y = 0;
  if (direction === "left") x = -100;
  else if (direction === "right") x = 100;
  else if (direction === "up") y = -100;
  else if (direction === "down") y = 100;

  return {
    hidden: { x, y, opacity: 0 },
    show: { x: 0, y: 0, opacity: 1, transition: { type, delay, duration, ease: [0.25,0.1,0.25,1] } },
  };
};

// Staggered container animation
export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.1) => ({
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { staggerChildren, delayChildren, when: "beforeChildren" } 
  },
});

// Predefined slide-in variants from directions
export const slideInFromLeft = (delay = 0) => ({
  hidden: { x: -100, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { delay, duration: 0.5, ease: [0.25,0.1,0.25,1] } },
});

export const slideInFromRight = (delay = 0) => ({
  hidden: { x: 100, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { delay, duration: 0.5, ease: [0.25,0.1,0.25,1] } },
});

export const slideInFromTop = (delay = 0) => ({
  hidden: { y: -100, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { delay, duration: 0.5, ease: [0.25,0.1,0.25,1] } },
});

export const slideInFromBottom = (delay = 0) => ({
  hidden: { y: 100, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { delay, duration: 0.5, ease: [0.25,0.1,0.25,1] } },
});