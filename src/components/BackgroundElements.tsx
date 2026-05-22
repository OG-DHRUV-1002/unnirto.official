"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function BackgroundElements() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return (
    <>
      {/* Fixed animated SVG grid */}
      <div className="fixed inset-0 z-[-3] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] animate-pan-grid" />
      
      {/* Fixed ambient aurora glows */}
      <div className="fixed inset-0 z-[-2] pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] rounded-full bg-[#9E8A26] blur-[150px] opacity-10 animate-pulse-aurora" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] rounded-full bg-[#9E8A26] blur-[120px] opacity-[0.08] animate-pulse-aurora" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-[#9E8A26] blur-[180px] opacity-5 animate-pulse-aurora" style={{ animationDelay: "4s" }} />
      </div>

      {/* Lightweight Particles */}
      {init && (
        <Particles
          id="tsparticles"
          className="fixed inset-0 z-[-1] pointer-events-none"
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 60,
            particles: {
              color: {
                value: "#9E8A26",
              },
              links: {
                enable: false,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: true,
                speed: 0.3,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 40,
              },
              opacity: {
                value: 0.3,
                animation: {
                  enable: true,
                  speed: 0.5,
                  minimumValue: 0.1,
                  sync: false,
                }
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </>
  );
}
