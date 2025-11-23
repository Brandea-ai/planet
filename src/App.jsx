import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';

// --- PLANETEN-DATEN mit Farben ---
const planets = [
  { name: "Merkur", distance: 10, radius: 0.6, speed: 0.04, color: "#8C7853", desc: "Der sonnennächste Planet." },
  { name: "Venus", distance: 15, radius: 1.1, speed: 0.03, color: "#FFC649", desc: "Höllisch heiß, dichte Wolken." },
  { name: "Erde", distance: 22, radius: 1.2, speed: 0.02, color: "#4169E1", hasAtmosphere: true, desc: "Unser Heimatplanet." },
  { name: "Mars", distance: 30, radius: 0.8, speed: 0.018, color: "#CD5C5C", desc: "Der rote Wüstenplanet." },
  { name: "Jupiter", distance: 45, radius: 3.5, speed: 0.008, color: "#DAA520", desc: "Gasriese, der König." },
  { name: "Saturn", distance: 60, radius: 3, speed: 0.006, color: "#F4A460", hasRings: true, desc: "Herr der Ringe." },
  { name: "Uranus", distance: 78, radius: 2, speed: 0.004, color: "#4FD0E0", desc: "Der eisige Riese." },
  { name: "Neptun", distance: 95, radius: 1.9, speed: 0.003, color: "#4169E1", desc: "Stürmischer Blauer Planet." },
];

// --- SHADER: ATMOSPHÄRE ---
const AtmosphereShader = {
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 4.0);
      gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
    }
  `
};

// --- SONNE ---
const Sun = () => {
  return (
    <mesh>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial
        color="#FDB813"
        emissive="#FDB813"
        emissiveIntensity={2}
      />
      <pointLight intensity={2} distance={300} decay={1} color="#ffddaa" />
    </mesh>
  );
};

// --- SATURN RINGE ---
const SaturnRings = ({ radius }) => {
  return (
    <mesh rotation-x={-Math.PI / 2}>
      <ringGeometry args={[radius * 1.4, radius * 2.5, 64]} />
      <meshStandardMaterial
        color="#C8A882"
        side={THREE.DoubleSide}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
};

// --- PLANET ---
const Planet = ({ data, activePlanet, setActivePlanet }) => {
  const ref = useRef();
  const randomOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * data.speed + randomOffset;
    const x = Math.sin(t) * data.distance;
    const z = Math.cos(t) * data.distance;
    ref.current.position.set(x, 0, z);
    ref.current.rotation.y += 0.01;
  });

  return (
    <group ref={ref}>
      <mesh
        onClick={(e) => { e.stopPropagation(); setActivePlanet(data); }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
      >
        <sphereGeometry args={[data.radius, 32, 32]} />
        <meshStandardMaterial
          color={data.color}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {data.hasAtmosphere && (
        <mesh scale={[1.15, 1.15, 1.15]}>
          <sphereGeometry args={[data.radius, 32, 32]} />
          <shaderMaterial
            vertexShader={AtmosphereShader.vertexShader}
            fragmentShader={AtmosphereShader.fragmentShader}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            transparent
          />
        </mesh>
      )}

      {data.hasRings && <SaturnRings radius={data.radius} />}

      <Html distanceFactor={20} position={[0, data.radius + 1, 0]}>
        <div className="text-white text-xs font-mono tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
          {data.name}
        </div>
      </Html>
    </group>
  );
};

// --- HUD OVERLAY ---
const HUD = ({ activePlanet, setActivePlanet }) => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start pointer-events-none z-10">
        <div>
          <h1 className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 font-black tracking-tighter drop-shadow-lg" style={{fontFamily: 'Impact, sans-serif'}}>
            SOLAR<span className="text-white">ENGINE</span>
          </h1>
          <p className="text-white/60 font-mono text-xs mt-2 tracking-widest">REALTIME ORBITAL SIMULATION // V.4.0</p>
        </div>
      </div>

      {activePlanet && (
        <div className="absolute bottom-10 left-10 w-96 bg-black/70 backdrop-blur-xl border-t-2 border-orange-500 p-6 text-white transform transition-all duration-500 z-20 pointer-events-auto">
          <button
            onClick={() => setActivePlanet(null)}
            className="absolute -top-4 right-0 bg-orange-600 text-black font-bold px-3 py-1 text-xs hover:bg-white transition-colors cursor-pointer"
          >CLOSE TARGET</button>

          <h2 className="text-4xl font-bold mb-1 uppercase">{activePlanet.name}</h2>
          <p className="text-orange-400 text-xs font-mono mb-4">ORBITAL DISTANCE: {activePlanet.distance} AU</p>

          <p className="text-sm leading-relaxed text-gray-300">
            {activePlanet.desc}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-2 text-xs font-mono text-gray-500">
            <div>RADIUS: {activePlanet.radius * 6000} KM</div>
            <div>TEMP: CALCULATING...</div>
          </div>
        </div>
      )}
    </>
  );
};

// --- POST PROCESSING ---
const SceneEffects = () => {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={1.2} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
};

// --- KAMERA RIG ---
const CameraRig = () => {
  useFrame((state) => {
    state.camera.position.x += (state.mouse.x * 2 - state.camera.position.x) * 0.01;
    state.camera.position.y += (state.mouse.y * 2 - state.camera.position.y) * 0.01;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

// --- MAIN APP ---
export default function App() {
  const [activePlanet, setActivePlanet] = useState(null);

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <HUD activePlanet={activePlanet} setActivePlanet={setActivePlanet} />

      <Canvas
        camera={{ position: [0, 30, 60], fov: 35 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        {/* Beleuchtung */}
        <ambientLight intensity={0.1} />

        {/* Sterne */}
        <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />

        {/* Sonne */}
        <Sun />

        {/* Planeten */}
        {planets.map((data, i) => (
          <Planet
            key={i}
            data={data}
            activePlanet={activePlanet}
            setActivePlanet={setActivePlanet}
          />
        ))}

        {/* Effects */}
        <SceneEffects />
        <CameraRig />

        {/* Controls */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          minDistance={15}
          maxDistance={200}
          autoRotate={!activePlanet}
          autoRotateSpeed={0.3}
        />
      </Canvas>
    </div>
  );
}
