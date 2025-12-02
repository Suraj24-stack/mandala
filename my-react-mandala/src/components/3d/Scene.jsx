import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

const Scene = ({
  children,
  className = "absolute inset-0 z-0 pointer-events-none",
}) => {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          {children}
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
