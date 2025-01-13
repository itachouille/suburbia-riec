import { Billboard } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface HotspotProps {
  position: [number, number, number];
  isVisible: boolean;
  color?: string;
}

export function Hotspot({ position, isVisible, color }: HotspotProps) {
  const hotspotRef = useRef<THREE.Mesh>(null);
  const waveRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    if (waveRef.current) {
      const waveScale = 0.5 + (time % 1); // Circle grows from scale 1 to 3
      const waveOpacity = 1 - (time % 1); // Opacity decreases from 1 to 0
      waveRef.current.scale.set(waveScale, waveScale, waveScale);
      const waveMaterial = waveRef.current.material as THREE.MeshBasicMaterial;
      waveMaterial.opacity = waveOpacity;
    }
  });

  return (
    <Billboard position={position} follow={true}>
      {/* Inner static pulsating circle */}
      <mesh ref={hotspotRef} visible={isVisible}>
        <circleGeometry args={[0.02, 32]} />
        <meshStandardMaterial color={color} transparent opacity={1} />
      </mesh>

      {/* Outer wave effect */}
      <mesh
        ref={waveRef}
        visible={isVisible}
        onPointerOver={() => {
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          document.body.style.cursor = "default";
        }}
      >
        <circleGeometry args={[0.03, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} />
      </mesh>
    </Billboard>
  );
}
