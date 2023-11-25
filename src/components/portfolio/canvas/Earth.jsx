import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

import CanvasLoader from '../sub/Loader';

// Earth component that loads and renders the 3D Earth model
const Earth = () => {
  // useGLTF is a hook that loads a glTF model
  const earth = useGLTF('./planet/scene.gltf');

  // Render the Earth model as a primitive with specified scale, position, and rotation
  return (
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

// EarthCanvas component that renders the 3D Earth in a canvas
const EarthCanvas = () => {
  return (
    // Use the Canvas component to create a WebGL canvas
    <Canvas
      shadows
      frameloop='demand'
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      {/* Use Suspense to handle asynchronous loading and provide a fallback UI */}
      <Suspense fallback={<CanvasLoader />}>
        {/* Use OrbitControls to enable user interaction for rotating the Earth */}
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        {/* Render the Earth component inside Suspense */}
        <Earth />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;