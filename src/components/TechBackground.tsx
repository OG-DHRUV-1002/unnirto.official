"use client";

import React, { useEffect, useRef } from "react";

export default function TechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const mouse = {
      x: -1000,
      y: -1000,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.6; // Slightly faster drift
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(160, 175, 190, 0.5)"; // Soft tech gray
        ctx.fill();
      }
    }

    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 70); // Max 70 particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Node connections
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(160, 175, 190, ${0.15 - distance / 1000})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Mouse interaction
        const dxMouse = particles[i].x - mouse.x;
        const dyMouse = particles[i].y - mouse.y;
        const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distanceMouse < 180) {
          ctx.beginPath();
          // Glow effect connection (Copper accent)
          ctx.strokeStyle = `rgba(205, 127, 50, ${0.4 - distanceMouse / 450})`; 
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();

          // Subtle repel effect
          const repelFactor = (180 - distanceMouse) / 180;
          particles[i].x += (dxMouse / distanceMouse) * repelFactor * 1.5;
          particles[i].y += (dyMouse / distanceMouse) * repelFactor * 1.5;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-50] pointer-events-none bg-[#050505] overflow-hidden">
      {/* Dynamic Keyframes for Orbs injected directly for component decoupling */}
      <style>{`
        @keyframes aurora-pulse-1 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.15; }
          50% { transform: translate(5%, 8%) scale(1.15); opacity: 0.25; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
        }
        @keyframes aurora-pulse-2 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.15; }
          50% { transform: translate(-8%, -5%) scale(1.2); opacity: 0.2; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
        }
        @keyframes aurora-pulse-3 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.1; }
          50% { transform: translate(-10%, 10%) scale(1.1); opacity: 0.2; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.1; }
        }
        .animate-aurora-1 { animation: aurora-pulse-1 25s ease-in-out infinite; }
        .animate-aurora-2 { animation: aurora-pulse-2 28s ease-in-out infinite; }
        .animate-aurora-3 { animation: aurora-pulse-3 22s ease-in-out infinite; }
      `}</style>

      {/* Layer 1: Obsidian Void & SVG Grid Blueprint */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%23ffffff' fill-opacity='0.15' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Layer 2: Ambient Aurora (CSS Radial Gradients) */}
      <div className="absolute top-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-[radial-gradient(circle,rgba(205,127,50,0.8)_0%,transparent_60%)] blur-[120px] animate-aurora-1 opacity-20" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[65vw] h-[65vw] rounded-full bg-[radial-gradient(circle,rgba(85,107,47,0.8)_0%,transparent_60%)] blur-[120px] animate-aurora-2 opacity-20" />
      <div className="absolute top-[35%] left-[55%] w-[45vw] h-[45vw] rounded-full bg-[radial-gradient(circle,rgba(205,127,50,0.6)_0%,transparent_60%)] blur-[120px] animate-aurora-3 opacity-20" />

      {/* Layer 3: Command Architecture Network (Vanilla Canvas) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
}
