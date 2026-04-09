import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/react2.webp",
  "/images/next2.webp",
  "/images/node2.webp",
  "/images/express.webp",
  "/images/mongo.webp",
  "/images/mysql.webp",
  "/images/typescript.webp",
  "/images/javascript.webp",
];
const textures = imageUrls.map((url) => textureLoader.load(url));

const sphereGeometry = new THREE.SphereGeometry(1, 20, 20); // PERF: 28→20 segments

// PERF: Reduced from 30 to 16 spheres
const spheres = [...Array(16)].map(() => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const easterEggBurst = useRef(false);

  useEffect(() => {
    const onBurst = () => {
      easterEggBurst.current = true;
      setTimeout(() => {
        easterEggBurst.current = false;
      }, 2000);
    };
    window.addEventListener("techstack-easter-egg", onBurst);
    return () => window.removeEventListener("techstack-easter-egg", onBurst);
  }, []);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    // Easter egg: massive chaotic burst
    const burstMultiplier = easterEggBurst.current ? 8 : 1;
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(
        new THREE.Vector3(
          -50 * delta * scale * burstMultiplier,
          -150 * delta * scale * burstMultiplier,
          -50 * delta * scale * burstMultiplier
        )
      );
    if (easterEggBurst.current) {
      // Add random spin for chaos
      const randomTorque = new THREE.Vector3(
        (Math.random() - 0.5) * 200 * delta,
        (Math.random() - 0.5) * 200 * delta,
        (Math.random() - 0.5) * 200 * delta
      );
      api.current?.applyTorqueImpulse(randomTorque, true);
    }
    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

import { getEnvironmentMood } from "../hooks/useEnvironmentMood";

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const mood = getEnvironmentMood();

  useEffect(() => {
    // PERF: Use IntersectionObserver instead of scroll listener
    const techSection = document.querySelector('.techstack');
    if (!techSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsActive(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(techSection);

    return () => observer.disconnect();
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div className="techstack">
      <h2> My Techstack</h2>

      <Canvas
        shadows
        gl={{
          alpha: true,
          stencil: false,
          depth: false,
          antialias: false,  // PERF: disable AA
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => {
          state.gl.toneMappingExposure = 1.5;
          // PERF: Cap pixel ratio on the R3F canvas too
          state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        }}
        className="tech-canvas"
        // PERF: Only render when visible (frameloop demand)
        frameloop={isActive ? "always" : "never"}
      >
        <ambientLight intensity={mood.ambientIntensity * 1.5} color={mood.ambientColor} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color={mood.directionalColor}
          castShadow
          shadow-mapSize={[256, 256]}
        />
        <directionalLight position={[0, 5, -4]} intensity={mood.directionalIntensity * 2} />
        <Physics gravity={[0, 0, 0]} paused={!isActive}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              {...props}
              material={materials[Math.floor(Math.random() * materials.length)]}
              isActive={isActive}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0a0520" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
