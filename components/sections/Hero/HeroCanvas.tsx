"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Generates random positions for particles within a sphere.
 */
function generateParticles(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = Math.random() * 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

interface ParticleFieldProps {
  count?: number;
}

/**
 * Animated particle field that slowly rotates and reacts to mouse.
 */
function ParticleField({ count = 300 }: ParticleFieldProps) {
  const ref = React.useRef<THREE.Points>(null);
  const positions = React.useMemo(() => generateParticles(count), [count]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * 0.03;
      ref.current.rotation.y -= delta * 0.05;
    }
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.mouse.x * 0.1,
      0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.mouse.y * 0.1,
      0.05
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
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

/**
 * Three.js canvas with floating warm particle field for the Hero section.
 * aria-hidden as it is purely decorative.
 */
export default function HeroCanvas() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1.5], fov: 75 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true }}
      >
        <ParticleField />
      </Canvas>
    </div>
  );
}
