import './App.scss';
import { Canvas } from '@react-three/fiber';
import AnimatedText from '../../components/AnimatedText';
import AutoOrbiter from '../../components/AutoOrbiter';
import OBJViewer from '../../components/OBJViewer';

import BioCamera from '../../assets/Bio_Camera.obj?url';
import BioCameraMtl from '../../assets/Bio_Camera.mtl?url';

function App() {
  return (
    <div className="app">
      <Canvas className="background">
        <AutoOrbiter>
          <OBJViewer assetPath={BioCamera} materialsPath={BioCameraMtl} />
        </AutoOrbiter>

        <ambientLight intensity={2.5} />
        <directionalLight position={[0, 1, 0]} intensity={3} />
      </Canvas>
      <div className="hero">
        <AnimatedText text="Watch this space..." />
      </div>
    </div>
  );
}

export default App;
