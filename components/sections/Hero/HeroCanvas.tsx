"use client";

import dynamic from "next/dynamic";

const AnimatedGradient = dynamic(() => import("@/components/ui/animated-gradient"), { ssr: false });
const LightRays = dynamic(() => import("@/components/ui/light-rays"), { ssr: false });

/**
 * Hero background: AnimatedGradient (WebGL-style swirl) + LightRays overlay.
 * Replaces the previous canvas particle sphere.
 */
export default function HeroCanvas() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      {/* Deep animated swirl gradient */}
      <AnimatedGradient
        config={{
          preset: "custom",
          color1: "#0a0a0f",
          color2: "#1a1025",
          color3: "#0d1a2e",
          speed: 12,
          swirl: 70,
        }}
        noise={{ opacity: 0.04 }}
      />

      {/* Gold light rays emanating from top center */}
      <LightRays
        intensity={8}
        rays={24}
        reach={14}
        position={-10}
        raysColor={{ mode: "single", color: "#c4922a" }}
        animation={{ animate: true, speed: 18 }}
        style={{ opacity: 0.45 }}
      />
    </div>
  );
}
