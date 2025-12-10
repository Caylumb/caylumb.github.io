import './App.scss';
import { Canvas } from '@react-three/fiber';
import AnimatedText from '../../components/AnimatedText';
import AutoOrbiter from '../../components/AutoOrbiter';
import OBJViewer from '../../components/OBJViewer';
import BioCamera from '../../assets/models/Bio_Camera.obj?url';
import BioCameraMtl from '../../assets/models/Bio_Camera.mtl?url';
import { Link } from 'react-router';
import Navigation from '../../components/Navigation';

function App() {
  return (
    <div className="landing">
      <Navigation />

      <Canvas className="landing__canvas">
        <AutoOrbiter>
          <OBJViewer assetPath={BioCamera} materialPath={BioCameraMtl} />
        </AutoOrbiter>
        <ambientLight intensity={2.5} />
        <directionalLight position={[0, 1, 0]} intensity={3} />
      </Canvas>

      <div className="landing__hero">
        <div className="landing__hero-content">
          <AnimatedText text="Watch this space..." />
          <p className="landing__subtitle">Portfolio & Blog</p>
          <div className="landing__cta">
            <Link to="/home" className="landing__button landing__button--primary">
              View Blog
            </Link>
            <Link to="/projects/list" className="landing__button landing__button--secondary">
              Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
