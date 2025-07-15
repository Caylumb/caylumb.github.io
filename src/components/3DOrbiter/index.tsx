import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImp } from 'three-stdlib';
import { useFrame, useThree } from '@react-three/fiber';
import { Motion } from 'motion-frame';
import { useRef, useState } from 'react';
import { Group, Spherical, Vector3 } from 'three';
import { cartesianToSpherical, lerp } from './helper';

type SpinningOrbiterProps = {
  children: React.ReactNode;
  spinning?: boolean;
};

const SpinningOrbiter: React.FC<SpinningOrbiterProps> = ({ children, spinning }) => {
  const { camera } = useThree();

  const groupRef = useRef<Group>(null);

  const originalPosition = useRef(new Vector3(2, 2, 2));
  const originalSphericalPosition = useRef(
    new Spherical().setFromVector3(originalPosition.current),
  );
  const orbitControlsRef = useRef<OrbitControlsImp>(null);

  const [inactivityTimeout, setInactivityTimeout] = useState<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const [shouldBeSpinning, setShouldBeSpinning] = useState(spinning);

  const motion = useRef(
    new Motion({
      duration: 1500,
      easing: (x) => 1 - Math.pow(1 - x, 4),
      animation: (frame) => {
        const currentPos = cartesianToSpherical(motion.current.state.cameraPosition);
        const originalPos = originalSphericalPosition.current;

        const x = lerp(currentPos.phi, originalPos.phi, frame.progress);

        const targetPosition = new Spherical(currentPos.radius, x, currentPos.theta);

        camera.position.setFromSpherical(targetPosition);
      },
    }),
  );

  const handleOrbitStart = () => {
    motion.current.stop();
    setShouldBeSpinning(false);
    if (inactivityTimeout) clearTimeout(inactivityTimeout);
  };

  const handleOrbitStop = () => {
    if (inactivityTimeout) clearTimeout(inactivityTimeout);
    setInactivityTimeout(
      setTimeout(() => {
        if (orbitControlsRef.current) {
          motion.current.state.cameraPosition = camera.position.clone();
          motion.current.play();
          setShouldBeSpinning(true);
        }
      }, 1000),
    );
  };

  useFrame((_, delta) => {
    if (spinning && shouldBeSpinning && groupRef.current) {
      // Spin the group around the Y-axis
      groupRef.current.rotation.y = (groupRef.current.rotation.y + 0.4 * delta) % (Math.PI * 2);
    }
  });

  return (
    <>
      <group ref={groupRef}>{children}</group>
      <OrbitControls
        ref={orbitControlsRef}
        enablePan={false}
        enableZoom={false}
        onStart={handleOrbitStart}
        onEnd={handleOrbitStop}
      />
    </>
  );
};

export default SpinningOrbiter;
