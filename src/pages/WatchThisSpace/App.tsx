import './App.scss';
import { Canvas } from '@react-three/fiber';
import AnimatedText from '../../components/AnimatedText';
import AutoOrbiter from '../../components/AutoOrbiter';
import OBJViewer from '../../components/OBJViewer';

function App() {
  return (
    <div className="app">
      <Canvas className="background">
        <AutoOrbiter>
          <OBJViewer assetPath="/src/assets/Bio_Camera.obj" />
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
