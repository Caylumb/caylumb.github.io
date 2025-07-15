import { Canvas } from '@react-three/fiber';
import React, { useRef } from 'react';
import './index.scss';

type CustomCanvasProps = {
  children: React.ReactNode;
  cursorControl?: boolean;
  className?: string;
};

const CustomCanvas = ({ children, className = '', cursorControl = false }: CustomCanvasProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={divRef} className={`orbiter ${className}`}>
      <Canvas
        style={{ width: '100%', height: '100%' }}
        camera={{ position: [2, 2, 2] }}
        onMouseDown={() => {
          if (cursorControl && divRef.current) {
            divRef.current.style.cursor = 'grabbing';
          }
        }}
        onMouseUp={() => {
          if (cursorControl && divRef.current) {
            divRef.current.style.cursor = 'grab';
          }
        }}
      >
        <ambientLight intensity={2.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        {children}
      </Canvas>
    </div>
  );
};

export default CustomCanvas;
