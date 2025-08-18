import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import AutoOrbiter from '../AutoOrbiter';
import OBJViewer from '../OBJViewer';

interface KindOfAsyncModelLoaderProps {
  modelName: string;
}

export default function KindOfAsyncModelLoader({ modelName }: KindOfAsyncModelLoaderProps) {
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const [materialUrl, setMaterialUrl] = useState<string | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const modelLoader = async () => {
      try {
        const modelUrl = await import(`../../assets/models/${modelName}.obj?url`);
        setModelUrl(modelUrl.default);
      } catch (err) {
        console.warn(`Model file for ${modelName} not found: ${err}`);
        setError(true);
      }
    };
    const materialLoader = async () => {
      try {
        const materialUrl = await import(`../../assets/models/${modelName}.mtl?url`);
        setMaterialUrl(materialUrl.default);
      } catch (err) {
        console.warn(`Material file for ${modelName} not found: ${err}`);
      }
    };
    modelLoader();
    materialLoader();
  }, [modelName]);

  if (error) {
    return <div>Error loading model</div>;
  }

  if (!modelUrl) {
    return <div>Loading model...</div>;
  }

  return (
    <Canvas className="background">
      <AutoOrbiter>
        <OBJViewer assetPath={modelUrl} materialPath={materialUrl} />
      </AutoOrbiter>

      <ambientLight intensity={2.5} />
      <directionalLight position={[0, 1, 0]} intensity={3} />
    </Canvas>
  );
}
