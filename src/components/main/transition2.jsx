// Functional component named transition2
export default function transition2() {
  return (
    // Main section with full-screen width and height, and invert/dark mode styles
    <section className="w-screen h-screen relative invert dark:invert-0">
      {/* Background div with a cover image */}
      <div
        className="flex items-center w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url(/main-bg.webp)" }}  // Background image
      >
      </div>

      {/* Absolute positioning of images at the bottom right */}
      <div className="absolute bottom-0 right-0 z-[10]">
        {/* Horse image positioned absolutely at the top right */}
        <img
          src="/horse.png"
          srcSet="/horse.png"
          alt="horse"
          height={300}
          width={300}
          className="absolute right-55 top-40"
          loading="lazy"
        />

        {/* Cliff image positioned absolutely at the bottom right */}
        <img src="/cliff.webp" alt="cliff" width={480} height={480} loading="lazy" />
      </div>

      {/* Absolute positioning of a large trees image at the bottom */}
      <div className="absolute bottom-0 z-[5] w-full h-auto">
        <img
          src="/trees.webp"
          alt="trees"
          width={2000}
          height={2000}
          className="w-full h-full" 
          loading="lazy"
        />
      </div>

      {/* Stars image positioned absolutely at the top left */}
      <img
        src="/stars.avif"
        srcSet="/stars.avif 1x, /stars.png 2x"
        alt="stars"
        height={300}
        width={300}
        className="absolute top-0 left-0 z-[10]"
        loading="lazy"
      />
    </section>
  );
}