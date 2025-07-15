import { useLoader } from '@react-three/fiber';
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js';

interface OBJViewerProps {
  assetPath: string;
}

function OBJViewer({ assetPath }: OBJViewerProps) {
  const materials = useLoader(MTLLoader, assetPath.replace('.obj', '.mtl'));
  const obj = useLoader(OBJLoader, assetPath, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  return <primitive object={obj} scale={0.4} />;
}

export default OBJViewer;
