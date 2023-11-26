// Importing React library and the TransitionContent component
import TransitionContent from "../sub/TransitionContent";

// Functional component for the Transition section
const Transition = () => {
  return (
    <section className="relative h-[100vh] w-full invert dark:invert-0" id="about-me">
      {/* Background video element */}
      <video
        autoPlay  // Automatically starts playing the video
        muted    // Mutes the audio of the video
        loop     // Loops the video continuously
        className="rotate-180 absolute h-full w-full left-0 z-[1] object-cover "
      >
        <source src="/blackhole.webm" type="video/webm" />  {/* Source of the video file */}
      </video>

      {/* Rendering the TransitionContent component */}
      <TransitionContent />
    </section>
  );
};

// Exporting the Transition component
export default Transition;
