import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Particles = ({ count = 100 }) => {
  const mesh = useRef();

  // Generate random positions
  const particles = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, [count]);

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.001;
      mesh.current.rotation.x += 0.001;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#D4AF37"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

export default Particles;
