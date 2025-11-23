import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette, ChromaticAberration, DepthOfField } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

// --- PLANETEN-DATEN mit erweiterten Material-Properties ---
const planets = [
  {
    name: "Merkur",
    distance: 10,
    radius: 0.6,
    speed: 0.04,
    color: "#8C7853",
    emissive: "#3d3020",
    roughness: 0.9,
    metalness: 0.1,
    desc: "Der sonnennächste Planet - leblos und verkratert."
  },
  {
    name: "Venus",
    distance: 15,
    radius: 1.1,
    speed: 0.03,
    color: "#FFC649",
    emissive: "#8B6914",
    roughness: 0.3,
    metalness: 0.0,
    desc: "Höllisch heiß mit dichter Wolkendecke."
  },
  {
    name: "Erde",
    distance: 22,
    radius: 1.2,
    speed: 0.02,
    color: "#2B65EC",
    emissive: "#0a1a3d",
    roughness: 0.6,
    metalness: 0.2,
    hasAtmosphere: true,
    desc: "Unser blauer Heimatplanet - voller Leben."
  },
  {
    name: "Mars",
    distance: 30,
    radius: 0.8,
    speed: 0.018,
    color: "#CD5C5C",
    emissive: "#4d2020",
    roughness: 0.9,
    metalness: 0.1,
    desc: "Der rote Wüstenplanet - trocken und kalt."
  },
  {
    name: "Jupiter",
    distance: 45,
    radius: 3.5,
    speed: 0.008,
    color: "#DAA520",
    emissive: "#5d4510",
    roughness: 0.4,
    metalness: 0.0,
    desc: "Gasriese mit dem großen roten Fleck."
  },
  {
    name: "Saturn",
    distance: 60,
    radius: 3,
    speed: 0.006,
    color: "#F4A460",
    emissive: "#6d4820",
    roughness: 0.5,
    metalness: 0.0,
    hasRings: true,
    desc: "Der beringte Gasriese - majestätisch."
  },
  {
    name: "Uranus",
    distance: 78,
    radius: 2,
    speed: 0.004,
    color: "#4FD0E0",
    emissive: "#1d4d55",
    roughness: 0.3,
    metalness: 0.1,
    desc: "Der eisige Riese - auf der Seite liegend."
  },
  {
    name: "Neptun",
    distance: 95,
    radius: 1.9,
    speed: 0.003,
    color: "#4169E1",
    emissive: "#1a2d5d",
    roughness: 0.4,
    metalness: 0.1,
    desc: "Stürmischer blauer Planet am Rand."
  },
];

// --- ATMOSPHÄREN-SHADER ---
const AtmosphereShader = {
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 glowColor;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 3.5);
      vec3 glow = glowColor * intensity;
      gl_FragColor = vec4(glow, 1.0) * intensity;
    }
  `
};

// --- SONNE ---
const Sun = () => {
  const sunRef = useRef();
  const glowRef = useRef();

  useFrame(({ clock }) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
    if (glowRef.current) {
      const pulse = Math.sin(clock.getElapsedTime() * 0.5) * 0.1 + 2.4;
      glowRef.current.material.emissiveIntensity = pulse;
    }
  });

  return (
    <group>
      {/* Sonne */}
      <mesh ref={sunRef} castShadow>
        <sphereGeometry args={[5, 64, 64]} />
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FF8C00"
          emissiveIntensity={2.5}
          roughness={1}
          metalness={0}
          toneMapped={false}
        />
      </mesh>

      {/* Glow Layer */}
      <mesh ref={glowRef} scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshStandardMaterial
          color="#FFA500"
          emissive="#FF4500"
          emissiveIntensity={2}
          transparent
          opacity={0.3}
          toneMapped={false}
        />
      </mesh>

      <pointLight intensity={3.5} distance={400} decay={2} color="#FFE4B5" castShadow shadow-mapSize={[2048, 2048]} />
    </group>
  );
};

// --- SATURN RINGE ---
const SaturnRings = ({ radius }) => {
  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow castShadow>
      <ringGeometry args={[radius * 1.3, radius * 2.3, 128]} />
      <meshStandardMaterial
        color="#E6D5AC"
        side={THREE.DoubleSide}
        transparent
        opacity={0.85}
        roughness={0.7}
        metalness={0.3}
        emissive="#5d4a30"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// --- PLANET ---
const Planet = ({ data, activePlanet, setActivePlanet }) => {
  const ref = useRef();
  const meshRef = useRef();
  const randomOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * data.speed + randomOffset;
    const x = Math.sin(t) * data.distance;
    const z = Math.cos(t) * data.distance;
    ref.current.position.set(x, 0, z);

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <group ref={ref}>
      {/* Planet */}
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); setActivePlanet(data); }}
        onPointerOver={() => document.body.style.cursor = 'pointer'}
        onPointerOut={() => document.body.style.cursor = 'auto'}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[data.radius, 64, 64]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.emissive}
          emissiveIntensity={0.3}
          roughness={data.roughness}
          metalness={data.metalness}
          envMapIntensity={0.8}
        />
      </mesh>

      {/* Atmosphäre */}
      {data.hasAtmosphere && (
        <mesh scale={[1.12, 1.12, 1.12]}>
          <sphereGeometry args={[data.radius, 64, 64]} />
          <shaderMaterial
            vertexShader={AtmosphereShader.vertexShader}
            fragmentShader={AtmosphereShader.fragmentShader}
            uniforms={{
              glowColor: { value: new THREE.Color(0.3, 0.6, 1.0) }
            }}
            blending={THREE.AdditiveBlending}
            side={THREE.BackSide}
            transparent
          />
        </mesh>
      )}

      {/* Ringe */}
      {data.hasRings && <SaturnRings radius={data.radius} />}

      {/* Label */}
      <Html distanceFactor={20} position={[0, data.radius + 1.5, 0]}>
        <div className="text-white text-xs font-mono tracking-widest bg-black/70 px-3 py-1.5 rounded-lg backdrop-blur-md pointer-events-none border border-orange-500/30 shadow-lg">
          {data.name}
        </div>
      </Html>
    </group>
  );
};

// --- ORBIT LINIEN ---
const OrbitLine = ({ radius }) => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.sin(angle) * radius, 0, Math.cos(angle) * radius));
    }
    return pts;
  }, [radius]);

  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color="#ffffff" opacity={0.15} transparent linewidth={1} />
    </line>
  );
};

// --- HUD ---
const HUD = ({ activePlanet, setActivePlanet }) => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start pointer-events-none z-10">
        <div>
          <h1
            className="text-7xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-red-600 font-black tracking-tighter drop-shadow-2xl animate-pulse"
            style={{fontFamily: 'Impact, sans-serif', animationDuration: '3s'}}
          >
            SOLAR<span className="text-white">ENGINE</span>
          </h1>
          <p className="text-orange-400/80 font-mono text-sm mt-2 tracking-widest">
            ULTRA EDITION // V.6.0 // PROCEDURAL GRAPHICS
          </p>
        </div>
      </div>

      {activePlanet && (
        <div className="absolute bottom-10 left-10 w-[420px] bg-gradient-to-br from-black/90 via-black/80 to-orange-900/20 backdrop-blur-2xl border-t-4 border-orange-500 p-8 text-white transform transition-all duration-500 z-20 pointer-events-auto rounded-2xl shadow-2xl">
          <button
            onClick={() => setActivePlanet(null)}
            className="absolute -top-5 -right-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold px-5 py-2 text-sm hover:from-white hover:to-gray-200 hover:text-black transition-all duration-300 cursor-pointer rounded-full shadow-xl border-2 border-white/20"
          >
            ✕ CLOSE
          </button>

          <h2 className="text-6xl font-black mb-3 uppercase bg-clip-text text-transparent bg-gradient-to-r from-white via-orange-200 to-orange-400 tracking-tight">
            {activePlanet.name}
          </h2>
          <p className="text-orange-400 text-sm font-mono mb-5 tracking-wide border-l-4 border-orange-500 pl-3">
            ORBITAL DISTANCE: {activePlanet.distance} AU
          </p>

          <p className="text-base leading-relaxed text-gray-200 mb-6">
            {activePlanet.desc}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm font-mono">
            <div className="bg-gradient-to-br from-white/10 to-white/5 p-3 rounded-lg border border-white/10">
              <div className="text-orange-400 text-xs mb-1 font-bold">RADIUS</div>
              <div className="text-white text-lg font-bold">{(activePlanet.radius * 6000).toFixed(0)} KM</div>
            </div>
            <div className="bg-gradient-to-br from-white/10 to-white/5 p-3 rounded-lg border border-white/10">
              <div className="text-orange-400 text-xs mb-1 font-bold">VELOCITY</div>
              <div className="text-white text-lg font-bold">{(activePlanet.speed * 100).toFixed(2)} AU/s</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- POST PROCESSING ---
const SceneEffects = () => {
  return (
    <EffectComposer multisampling={8}>
      {/* Bloom für Leuchten */}
      <Bloom
        luminanceThreshold={0.15}
        luminanceSmoothing={0.9}
        intensity={2.2}
        mipmapBlur
      />

      {/* Depth of Field */}
      <DepthOfField
        focusDistance={0.02}
        focalLength={0.05}
        bokehScale={2.5}
      />

      {/* Chromatische Aberration */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.001, 0.001]}
      />

      {/* Vignette */}
      <Vignette eskil={false} offset={0.18} darkness={1.3} />
    </EffectComposer>
  );
};

// --- KAMERA RIG ---
const CameraRig = () => {
  useFrame((state) => {
    state.camera.position.x += (state.mouse.x * 4 - state.camera.position.x) * 0.02;
    state.camera.position.y += (state.mouse.y * 4 + 30 - state.camera.position.y) * 0.02;
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
        shadows
        camera={{ position: [0, 35, 70], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
          outputColorSpace: THREE.SRGBColorSpace
        }}
      >
        {/* Beleuchtung */}
        <ambientLight intensity={0.08} />
        <hemisphereLight intensity={0.4} color="#ffffff" groundColor="#0a0a20" />

        {/* Sterne */}
        <Stars
          radius={350}
          depth={80}
          count={12000}
          factor={6}
          saturation={0}
          fade
          speed={0.4}
        />

        {/* Environment für Reflexionen */}
        <Environment preset="night" />

        {/* Sonne */}
        <Sun />

        {/* Orbit Linien */}
        {planets.map((planet, i) => (
          <OrbitLine key={`orbit-${i}`} radius={planet.distance} />
        ))}

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
          enableDamping
          dampingFactor={0.08}
          minDistance={25}
          maxDistance={280}
          autoRotate={!activePlanet}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 1.6}
          minPolarAngle={Math.PI / 6}
        />
      </Canvas>
    </div>
  );
}
