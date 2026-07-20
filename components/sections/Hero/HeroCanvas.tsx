"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Hors composant : généré une seule fois au chargement du module
const PARTICLE_COUNT = 300;
const POSITIONS = generateParticles(PARTICLE_COUNT);

function generateParticles(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random() * 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

function ParticleField() {
  const ref = React.useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.03;
      ref.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={POSITIONS} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#C4922A"
        size={0.005}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

export default function HeroCanvas() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1.5], fov: 75 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]} // cap à 1.5x au lieu de laisser 3x sur Retina/mobile
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}