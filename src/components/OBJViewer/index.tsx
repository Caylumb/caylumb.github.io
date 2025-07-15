import { useLoader } from '@react-three/fiber';
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js';

interface OBJViewerProps {
  assetPath: string;
  materialsPath?: string;
}

function OBJViewer({ assetPath, materialsPath }: OBJViewerProps) {
  const materials = useLoader(MTLLoader, materialsPath || '', () => {
    if (!materialsPath) return null;
  });
  const obj = useLoader(OBJLoader, assetPath, (loader) => {
    if (materials && materialsPath) {
      materials.preload();
      loader.setMaterials(materials);
    }
  });

  return <primitive object={obj} scale={0.4} />;
}

export default OBJViewer;
