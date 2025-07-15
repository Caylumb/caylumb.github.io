import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';

interface AutoOrbiterProps {
  children: React.ReactNode;
}

function AutoOrbiter({ children }: AutoOrbiterProps) {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Spin the group around the Y-axis
      const newX = (groupRef.current.rotation.x + 0.15 * delta) % (Math.PI * 2);
      const newY = (groupRef.current.rotation.y + 0.15 * delta) % (Math.PI * 2);
      const newZ = (groupRef.current.rotation.z + 0.05 * delta) % (Math.PI * 2);
      groupRef.current.rotation.set(newX, newY, newZ);
    }
  });

  return <group ref={groupRef}>{children}</group>;
}

export default AutoOrbiter;
