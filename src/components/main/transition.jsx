import React from "react";
import TransitionContent from "../sub/TransitionContent";

const Transition = () => {
  return (
    <section className="relative h-[100vh] w-full invert dark:invert-0" id="about-me">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute h-full w-full left-0 z-[1] object-cover "
      >
        <source src="/blackhole.webm" type="video/webm" />
      </video>
      <TransitionContent />
    </section>
  );
};

export default Transition;
