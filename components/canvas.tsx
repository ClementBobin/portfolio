"use client";

import { useEffect, useRef } from "react";
import { createTimer } from "animejs";

const PARTICLE_COUNT = 300;

interface Particle {
  x: number;
  y: number;
  z: number;
}

function generateParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const r = Math.random() * 2;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    particles.push({
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.sin(phi) * Math.sin(theta),
      z: r * Math.cos(phi),
    });
  }
  return particles;
}

const PARTICLES = generateParticles(PARTICLE_COUNT);


/**
 * Renders the animated particle sphere background for the hero section.
 * Uses a canvas-based animation and runs as a decorative visual layer.
 */
export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * Math.min(window.devicePixelRatio, 1.5);
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 1.5);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const timer = createTimer({
      loop: true,
      onUpdate(self) {
        const t = self.currentTime / 1000; // seconds
        rotationRef.current.x = t * 0.03;
        rotationRef.current.y = t * 0.05;

        const w = canvas.width;
        const h = canvas.height;
        const cx = w / 2;
        const cy = h / 2;
        const scale = Math.min(w, h) * 0.35;
        const fov = 3; // perspective divisor

        ctx.clearRect(0, 0, w, h);

        const rx = rotationRef.current.x;
        const ry = rotationRef.current.y;
        const cosX = Math.cos(rx), sinX = Math.sin(rx);
        const cosY = Math.cos(ry), sinY = Math.sin(ry);

        for (const p of PARTICLES) {
          // Rotate Y then X
          const x1 = p.x * cosY - p.z * sinY;
          const z1 = p.x * sinY + p.z * cosY;
          const y2 = p.y * cosX - z1 * sinX;
          const z2 = p.y * sinX + z1 * cosX;

          // Perspective projection
          const perspective = fov / (fov + z2);
          const sx = cx + x1 * scale * perspective;
          const sy = cy + y2 * scale * perspective;
          const r = Math.max(0.5, 1.5 * perspective);
          const alpha = 0.15 + 0.35 * perspective;

          ctx.beginPath();
          ctx.arc(sx, sy, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(196, 146, 42, ${alpha})`;
          ctx.fill();
        }
      },
    });

    return () => {
      timer.cancel();
      ro.disconnect();
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}