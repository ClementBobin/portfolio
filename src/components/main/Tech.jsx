// Importing necessary modules and components
import generateData from "../../constants/index";
import SkillDataProvider from "../sub/SkillDataProvider.jsx";
import SkillText from "../sub/SkillText.jsx";
import Tooltip from '../libStyleCompo/tooltips';

// Functional component for the "Skills" section
const Skills = () => {
  // Destructuring data from generateData function
  const { Backend_skill, Frontend_skill, Full_stack, Other_skill, Skill_data } = generateData();

  // Rendering the "Skills" section
  return (
    <section
      id="skills"
      className="flex flex-col items-center justify-center gap-1 h-full relative overflow-hidden pb-80 py-20 invert dark:invert-0"
      style={{ transform: "scale(0.9" }}
    >
      {/* Rendering the SkillText component */}
      <SkillText />
      
      {/* General Skill section */}
      <h4>General Skill</h4>
      <div className="flex flex-row justify-around flex-wrap gap-5 items-center invert dark:invert-0">
        {Skill_data.map((image, index) => (
          <Tooltip text={image.skill_name} content={image.content} key={index}>
            <SkillDataProvider
              key={index}
              src={image.Image}
              width={image.width}
              height={image.height}
              index={index}
            />
          </Tooltip>
        ))}
      </div>

      {/* Frontend Skill section */}
      <h4>Frontend Skill</h4>
      <div className="flex flex-row justify-around flex-wrap gap-5 items-center invert dark:invert-0">
        {Frontend_skill.map((image, index) => (
          <Tooltip text={image.skill_name} content={image.content} key={index}>
            <SkillDataProvider
              key={index}
              src={image.Image}
              width={image.width}
              height={image.height}
              index={index}
            />
          </Tooltip>
        ))}
      </div>

      {/* Backend Skill section */}
      <h4>Backend Skill</h4>
      <div className="flex flex-row justify-around flex-wrap gap-5 items-center invert dark:invert-0">
        {Backend_skill.map((image, index) => (
          <Tooltip text={image.skill_name} content={image.content} key={index}>
            <SkillDataProvider
              key={index}
              src={image.Image}
              width={image.width}
              height={image.height}
              index={index}
            />
          </Tooltip>
        ))}
      </div>

      {/* FullStack section */}
      <h4>FullStack</h4>
      <div className="flex flex-row justify-around flex-wrap gap-5 items-center invert dark:invert-0">
        {Full_stack.map((image, index) => (
          <Tooltip text={image.skill_name} content={image.content} key={index}>
            <SkillDataProvider
              key={index}
              src={image.Image}
              width={image.width}
              height={image.height}
              index={index}
            />
          </Tooltip>
        ))}
      </div>

      {/* Other Skill section */}
      <h4>Other Skill & Competence</h4>
      <div className="flex flex-row justify-around flex-wrap gap-5 items-center invert dark:invert-0">
        {Other_skill.map((image, index) => (
          <Tooltip text={image.description} content={image.content} key={index}>
            <SkillDataProvider
              key={index}
              src={image.Image}
              width={image.width}
              height={image.height}
              index={index}
            />
          </Tooltip>
        ))}
      </div>

      {/* Background video element */}
      <div className="w-full h-full absolute z-[-10]">
        <div className="w-full h-full opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
            src="/cards-video.webm"
          />
        </div>
      </div>
    </section>
  );
};

// Exporting the "Skills" component
export default Skills;