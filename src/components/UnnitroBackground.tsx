"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// --- VRAM & Memory Optimization Constants ---
// Hard-capped particle count based on device to prevent memory spikes
const MAX_PARTICLES_DESKTOP = 80;
const MAX_PARTICLES_MOBILE = 30;
const TARGET_FPS = 60; // Throttled FPS for frameloop hack

const ParticleSystem = ({ isMobile }: { isMobile: boolean }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const geometryRef = useRef<THREE.IcosahedronGeometry>(null);

  const particleCount = isMobile ? MAX_PARTICLES_MOBILE : MAX_PARTICLES_DESKTOP;
  const { invalidate } = useThree();

  // "The Frameloop Hack": Implement manual FPS limiter
  // This throttles the render loop to max 60 FPS, saving significant GPU cycles
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const renderLoop = () => {
      invalidate(); // Trigger a render frame on demand
      timeoutId = setTimeout(renderLoop, 1000 / TARGET_FPS);
    };
    renderLoop();
    return () => clearTimeout(timeoutId);
  }, [invalidate]);

  // Initial positioning and physics state mapped out once
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15
      );
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015
      );
      const rotation = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const rotationSpeed = new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      );
      temp.push({ position, velocity, rotation, rotationSpeed });
    }
    return temp;
  }, [particleCount]);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Enterprise Theme Colors
  const colorBronze = useMemo(() => new THREE.Color("#B8860B"), []); // Metallic Bronze/Copper
  const colorOlive = useMemo(() => new THREE.Color("#4A5D23"), []);  // Dark Olive

  useEffect(() => {
    if (!meshRef.current) return;
    
    // Assign instance colors to match the Unnitro tech vibe
    for (let i = 0; i < particleCount; i++) {
      meshRef.current.setColorAt(i, Math.random() > 0.35 ? colorBronze : colorOlive);
    }
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }

    // --- ABSOLUTE MEMORY CLEANUP ---
    // Safely disposing geometries and materials to avoid the 8GB VRAM leak from the legacy site
    return () => {
      if (geometryRef.current) geometryRef.current.dispose();
      if (materialRef.current) materialRef.current.dispose();
      if (meshRef.current) {
        // Clear matrix and color arrays explicitly
        if (meshRef.current.instanceMatrix) {
          meshRef.current.instanceMatrix.array = new Float32Array(0);
        }
        if (meshRef.current.instanceColor) {
          meshRef.current.instanceColor.array = new Float32Array(0);
        }
        meshRef.current.dispose();
      }
    };
  }, [particleCount, colorBronze, colorOlive]);

  // Update logic (runs on our manually invalidated frames)
  useFrame(() => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      // Linear Movement
      particle.position.add(particle.velocity);
      
      // Infinite bounce bounds
      if (particle.position.x > 15 || particle.position.x < -15) particle.velocity.x *= -1;
      if (particle.position.y > 15 || particle.position.y < -15) particle.velocity.y *= -1;
      if (particle.position.z > 5 || particle.position.z < -20) particle.velocity.z *= -1;

      // Axial Rotation
      particle.rotation.x += particle.rotationSpeed.x;
      particle.rotation.y += particle.rotationSpeed.y;
      particle.rotation.z += particle.rotationSpeed.z;

      dummy.position.copy(particle.position);
      dummy.rotation.copy(particle.rotation);
      
      // Dynamic scaling gives pseudo-depth perspective
      const scale = Math.max(0.1, (particle.position.z + 20) / 20);
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      {/* Detail 0 keeps vertices exceptionally low for VRAM optimization */}
      <icosahedronGeometry ref={geometryRef} args={[0.3, 0]} />
      {/* Wireframe + Additive Blending simulates "glow" without expensive Post-Processing Bloom */}
      <meshBasicMaterial 
        ref={materialRef} 
        wireframe={true} 
        transparent 
        opacity={0.5} 
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
};

export default function UnnitroBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Evaluate once on mount
    window.addEventListener("resize", handleResize, { passive: true });
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: -50, 
        backgroundColor: "#050505" // Obsidian/Deep Space Black void
      }} 
    >
      <Canvas
        frameloop="demand" // The Frameloop Hack: ensures we only render when we call invalidate()
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]} // Hard-cap DPR to prevent ultra-high resolution VRAM spikes
        gl={{ 
            powerPreference: "high-performance",
            antialias: false, // Disabling AA frees up significant VRAM and GPU overhead
            alpha: false, // Opaque backing is structurally cheaper
        }}
      >
        <ParticleSystem isMobile={isMobile} />
        {/* Fog masks objects cleanly in the Z-distance, completing the dark void look */}
        <fog attach="fog" args={["#050505", 5, 20]} />
      </Canvas>
    </div>
  );
}
