"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 2500;

function Particles() {
  const mesh = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const [positions, originalPositions] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const origPos = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 6;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      origPos[i * 3] = x;
      origPos[i * 3 + 1] = y;
      origPos[i * 3 + 2] = z;
    }
    return [pos, origPos];
  }, []);

  const colors = useMemo(() => {
    const cols = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Blue-to-cyan gradient palette
      const t = Math.random();
      cols[i * 3] = 0.2 + t * 0.2;       // R
      cols[i * 3 + 1] = 0.4 + t * 0.4;   // G
      cols[i * 3 + 2] = 0.8 + t * 0.2;   // B
    }
    return cols;
  }, []);

  const handlePointerMove = useCallback(
    (event: THREE.Event & { point: THREE.Vector3 }) => {
      mouseRef.current.x = (event.point.x / viewport.width) * 2;
      mouseRef.current.y = (event.point.y / viewport.height) * 2;
    },
    [viewport.width, viewport.height]
  );

  useFrame((state) => {
    if (!mesh.current) return;
    const time = state.clock.getElapsedTime();
    const geometry = mesh.current.geometry;
    const positionAttr = geometry.attributes.position;
    const posArray = positionAttr.array as Float32Array;

    const mx = mouseRef.current.x * 3;
    const my = mouseRef.current.y * 3;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];

      // Gentle wave animation
      const wave = Math.sin(time * 0.3 + ox * 0.5) * 0.15;
      const wave2 = Math.cos(time * 0.2 + oy * 0.3) * 0.1;

      // Mouse repulsion
      const dx = ox - mx;
      const dy = oy - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 2.5;
      let pushX = 0;
      let pushY = 0;

      if (dist < maxDist) {
        const force = (1 - dist / maxDist) * 0.8;
        pushX = (dx / dist) * force;
        pushY = (dy / dist) * force;
      }

      // Smooth lerp to target position
      const targetX = ox + pushX + wave2;
      const targetY = oy + pushY + wave;
      const targetZ = oz + Math.sin(time * 0.15 + i * 0.01) * 0.1;

      posArray[i3] += (targetX - posArray[i3]) * 0.05;
      posArray[i3 + 1] += (targetY - posArray[i3 + 1]) * 0.05;
      posArray[i3 + 2] += (targetZ - posArray[i3 + 2]) * 0.05;
    }

    positionAttr.needsUpdate = true;

    // Slow rotation
    mesh.current.rotation.z = time * 0.02;
  });

  return (
    <points ref={mesh} onPointerMove={handlePointerMove}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <Particles />
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
