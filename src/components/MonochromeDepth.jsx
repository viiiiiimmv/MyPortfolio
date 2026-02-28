import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";

function DustField({ reducedMotion }) {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const count = 700;
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      data[i3] = (Math.random() - 0.5) * 18;
      data[i3 + 1] = (Math.random() - 0.5) * 12;
      data[i3 + 2] = (Math.random() - 0.5) * 10;
    }

    return data;
  }, []);

  useFrame((state, delta) => {
    if (reducedMotion || !pointsRef.current) return;

    pointsRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        transparent
        depthWrite={false}
        size={0.02}
        color="#e5e5e5"
        opacity={0.18}
      />
    </points>
  );
}

function FloatingWire({ reducedMotion }) {
  const groupRef = useRef(null);

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) return;

    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = Math.sin(t * 0.17) * 0.12;
    groupRef.current.position.y = Math.cos(t * 0.16) * 0.3;
  });

  return (
    <group ref={groupRef} position={[2.3, -0.5, -1]}>
      <mesh>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial
          wireframe
          transparent
          opacity={0.12}
          color="#fafafa"
        />
      </mesh>

      <mesh rotation={[0.7, 0.4, 0]} scale={0.62}>
        <torusKnotGeometry args={[1.1, 0.08, 84, 9]} />
        <meshBasicMaterial
          wireframe
          transparent
          opacity={0.08}
          color="#f5f5f5"
        />
      </mesh>
    </group>
  );
}

export default function MonochromeDepth() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] opacity-45 [mask-image:radial-gradient(circle_at_center,black_38%,transparent_85%)]">
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 7], fov: 46 }}
        dpr={[1, 1.5]}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[2, 2, 4]} intensity={0.32} color="#ffffff" />
        <DustField reducedMotion={reducedMotion} />
        <FloatingWire reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
