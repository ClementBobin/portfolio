/* Style to be reuse as variable */
const styles = {
  /*
   * Define the padding classes for responsive design.
   * The "sm:" prefix represents small devices.
   */
  paddingX: "sm:px-16 px-6", // padding-left and padding-right for small devices and larger
  paddingY: "sm:py-16 py-6", // padding-top and padding-bottom for small devices and larger
  padding: "sm:px-16 px-6 sm:py-16 py-10", // combines the previous two classes for x and y axes

  /*
   * Define the heading text classes for different sections.
   * Use font-weight property with the value of "black" to make the text bold.
   * Adjust the font size and line height based on the viewport size.
   */
  heroHeadText:
    "font-black text-textColor lg:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] lg:leading-[98px] mt-2", // heading text for the hero section
  heroSubText:
    "text-[#dfd9ff] font-medium lg:text-[30px] sm:text-[26px] xs:text-[20px] text-[16px] lg:leading-[40px]", // subheading text for the hero section

  sectionHeadText:
    "text-textColor font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]", // heading text for sections other than the hero section
  sectionSubText:
    "sm:text-[18px] text-[14px] dark:text-secondary text-textColor uppercase tracking-wider", // subheading text for sections other than the hero section
};

export { styles };