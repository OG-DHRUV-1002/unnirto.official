"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { InstancedMesh, Object3D, Color, MathUtils } from "three";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";

const GRID_SIZE = 120;
const COUNT = GRID_SIZE * GRID_SIZE; // 14,400 instances

function CyberGrid() {
  const meshRef = useRef<InstancedMesh>(null);
  const { pointer, camera } = useThree();

  const dummy = useMemo(() => new Object3D(), []);
  
  const colors = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    const color = new Color();
    for (let i = 0; i < COUNT; i++) {
      // Unnitro theme colors: 80% Dark Olive, 20% Metallic Bronze (Highlight nodes)
      const isBronze = Math.random() > 0.8;
      color.set(isBronze ? "#B8860B" : "#2f4f2f");
      
      // Randomly dim some nodes for tech variance and organic feel
      color.multiplyScalar(Math.random() * 0.6 + 0.4);
      color.toArray(arr, i * 3);
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    
    let i = 0;
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let z = 0; z < GRID_SIZE; z++) {
        const px = (x - GRID_SIZE / 2) * 1.5;
        const pz = (z - GRID_SIZE / 2) * 1.5;
        
        // Fluid wave formula (data stream)
        const d = Math.sqrt(px * px + pz * pz);
        const yOffset = Math.sin(d * 0.1 - time * 2) * 1.5 
                      + Math.cos(px * 0.1 + time) * 1.0;
        
        dummy.position.set(px, yOffset - 8, pz);
        
        // Slight rotation to catch light/form (though material is basic, this adds geometric chaos)
        dummy.rotation.x = Math.sin(time + px) * 0.2;
        dummy.rotation.y = Math.cos(time + pz) * 0.2;
        
        // Data pulse scale
        const pulse = Math.max(0.2, Math.sin(time * 3 + d * 0.5));
        dummy.scale.set(pulse, pulse, pulse);
        
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i++, dummy.matrix);
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    // Layer 4: Interactivity & Camera Float
    // Smooth camera target positions
    const targetX = pointer.x * 6; // Parallax tilt based on mouse
    const targetY = pointer.y * 3 + 2; 
    
    camera.position.x = MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = MathUtils.lerp(camera.position.y, targetY, 0.05);
    
    // Slow cinematic pan floating forward/backward
    camera.position.z = MathUtils.lerp(camera.position.z, 30 + Math.sin(time * 0.2) * 8, 0.01);
    
    // Always lock focus on the center horizon
    camera.lookAt(0, -5, 0);
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      {/* Tiny geometric cubes representing data nodes */}
      <boxGeometry args={[0.2, 0.2, 0.2]}>
        <instancedBufferAttribute attach="attributes-color" args={[colors, 3]} />
      </boxGeometry>
      {/* 
        Rule 2: NO complex lighting. 
        Using basic material. toneMapped={false} lets high values blow out in Bloom.
      */}
      <meshBasicMaterial vertexColors toneMapped={false} />
    </instancedMesh>
  );
}

export default function CyberBackground() {
  return (
    <div className="fixed inset-0 z-[-50] pointer-events-none bg-[#020202] overflow-hidden">
      {/* 
        Integration:
        frameloop="always" ensures continuous motion.
        dpr={[1, 1.5]} caps pixel ratio for mobile GPU performance.
      */}
      <Canvas
        frameloop="always"
        dpr={[1, 1.5]}
        camera={{ position: [0, 5, 40], fov: 60 }}
      >
        <color attach="background" args={["#010101"]} />
        
        <CyberGrid />

        <EffectComposer disableNormalPass>
          {/* 
            Layer 2: Cinematic Depth & Motion
            High threshold Bloom so only the brighter Bronze nodes glow intensely.
          */}
          <Bloom luminanceThreshold={0.15} mipmapBlur intensity={1.5} />
          {/* Depth of Field to blur near and far nodes, mimicking an expensive macro lens */}
          <DepthOfField focusDistance={0.05} focalLength={0.02} bokehScale={4} height={480} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
