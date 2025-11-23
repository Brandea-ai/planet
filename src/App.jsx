import React, { useRef, useMemo, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Html, useTexture, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette, ChromaticAberration, DepthOfField, SSAO } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

// --- OPTIMIERTE TEXTUREN VON SOLAR TEXTURES (kleinere, schnellere Versionen) ---
const textureURLs = {
  // Verwende kleinere Texturen von einem zuverlässigen CDN
  sun: "https://www.solarsystemscope.com/textures/download/2k_sun.jpg",
  mercury: "https://www.solarsystemscope.com/textures/download/2k_mercury.jpg",
  venus: "https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg",
  earth: "https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg",
  mars: "https://www.solarsystemscope.com/textures/download/2k_mars.jpg",
  jupiter: "https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg",
  saturn: "https://www.solarsystemscope.com/textures/download/2k_saturn.jpg",
  uranus: "https://www.solarsystemscope.com/textures/download/2k_uranus.jpg",
  neptune: "https://www.solarsystemscope.com/textures/download/2k_neptune.jpg",
};

// --- PLANETEN-DATEN ---
const planets = [
  { name: "Merkur", distance: 10, radius: 0.6, speed: 0.04, texture: textureURLs.mercury, color: "#8C7853", desc: "Der sonnennächste Planet." },
  { name: "Venus", distance: 15, radius: 1.1, speed: 0.03, texture: textureURLs.venus, color: "#FFC649", desc: "Höllisch heiß, dichte Wolken." },
  { name: "Erde", distance: 22, radius: 1.2, speed: 0.02, texture: textureURLs.earth, color: "#4169E1", hasAtmosphere: true, desc: "Unser Heimatplanet." },
  { name: "Mars", distance: 30, radius: 0.8, speed: 0.018, texture: textureURLs.mars, color: "#CD5C5C", desc: "Der rote Wüstenplanet." },
  { name: "Jupiter", distance: 45, radius: 3.5, speed: 0.008, texture: textureURLs.jupiter, color: "#DAA520", desc: "Gasriese, der König." },
  { name: "Saturn", distance: 60, radius: 3, speed: 0.006, texture: textureURLs.saturn, color: "#F4A460", hasRings: true, desc: "Herr der Ringe." },
  { name: "Uranus", distance: 78, radius: 2, speed: 0.004, texture: textureURLs.uranus, color: "#4FD0E0", desc: "Der eisige Riese." },
  { name: "Neptun", distance: 95, radius: 1.9, speed: 0.003, texture: textureURLs.neptune, color: "#4169E1", desc: "Stürmischer Blauer Planet." },
];

// --- ATMOSPHÄREN-SHADER (Verbessert) ---
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
      float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 3.0);
      vec3 glow = glowColor * intensity;
      gl_FragColor = vec4(glow, 1.0) * intensity;
    }
  `
};

// --- SONNE MIT TEXTUREN ---
const Sun = () => {
  const texture = useTexture(textureURLs.sun);
  const sunRef = useRef();

  useFrame(({ clock }) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={sunRef} castShadow>
      <sphereGeometry args={[5, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        emissive="#FFA500"
        emissiveMap={texture}
        emissiveIntensity={2.5}
        toneMapped={false}
      />
      <pointLight intensity={3} distance={400} decay={2} color="#FFEAA7" castShadow />
    </mesh>
  );
};

// --- SATURN RINGE (Verbessert) ---
const SaturnRings = ({ radius }) => {
  return (
    <mesh rotation-x={-Math.PI / 2} receiveShadow castShadow>
      <ringGeometry args={[radius * 1.3, radius * 2.2, 128]} />
      <meshStandardMaterial
        color="#C9B181"
        side={THREE.DoubleSide}
        transparent
        opacity={0.9}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
};

// --- PLANET MIT TEXTUREN ---
const Planet = ({ data, activePlanet, setActivePlanet }) => {
  const ref = useRef();
  const meshRef = useRef();
  const randomOffset = useMemo(() => Math.random() * Math.PI * 2, []);

  // Texture loading with fallback
  const [texture, setTexture] = useState(null);
  const [useTexture, setUseTexture] = useState(true);

  // Try to load texture, fallback to color if it fails
  React.useEffect(() => {
    if (useTexture && data.texture) {
      const loader = new THREE.TextureLoader();
      loader.load(
        data.texture,
        (loadedTexture) => {
          setTexture(loadedTexture);
        },
        undefined,
        () => {
          // On error, use color instead
          setUseTexture(false);
        }
      );
    }
  }, [data.texture, useTexture]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * data.speed + randomOffset;
    const x = Math.sin(t) * data.distance;
    const z = Math.cos(t) * data.distance;
    ref.current.position.set(x, 0, z);

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={ref}>
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
          map={texture}
          color={!texture ? data.color : "#FFFFFF"}
          roughness={0.8}
          metalness={0.1}
          envMapIntensity={0.5}
        />
      </mesh>

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

      {data.hasRings && <SaturnRings radius={data.radius} />}

      <Html distanceFactor={20} position={[0, data.radius + 1.5, 0]}>
        <div className="text-white text-xs font-mono tracking-widest bg-black/60 px-2 py-1 rounded backdrop-blur-md pointer-events-none border border-white/20">
          {data.name}
        </div>
      </Html>
    </group>
  );
};

// --- ORBIT LINIEN ---
const OrbitLine = ({ radius }) => {
  const points = [];
  for (let i = 0; i <= 64; i++) {
    const angle = (i / 64) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.sin(angle) * radius, 0, Math.cos(angle) * radius));
  }
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color="#ffffff" opacity={0.1} transparent />
    </line>
  );
};

// --- HUD ---
const HUD = ({ activePlanet, setActivePlanet }) => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full p-8 flex justify-between items-start pointer-events-none z-10">
        <div>
          <h1 className="text-6xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-red-600 font-black tracking-tighter drop-shadow-2xl" style={{fontFamily: 'Impact, sans-serif'}}>
            SOLAR<span className="text-white">ENGINE</span>
          </h1>
          <p className="text-white/70 font-mono text-xs mt-2 tracking-widest">REALTIME ORBITAL SIMULATION // V.5.0 ULTRA</p>
        </div>
      </div>

      {activePlanet && (
        <div className="absolute bottom-10 left-10 w-96 bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-2xl border-t-2 border-orange-500 p-6 text-white transform transition-all duration-500 z-20 pointer-events-auto rounded-lg shadow-2xl">
          <button
            onClick={() => setActivePlanet(null)}
            className="absolute -top-4 right-0 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold px-4 py-1 text-xs hover:from-white hover:to-gray-200 hover:text-black transition-all duration-300 cursor-pointer rounded shadow-lg"
          >✕ CLOSE</button>

          <h2 className="text-5xl font-bold mb-2 uppercase bg-clip-text text-transparent bg-gradient-to-r from-white to-orange-300">{activePlanet.name}</h2>
          <p className="text-orange-400 text-xs font-mono mb-4 tracking-wide">ORBITAL DISTANCE: {activePlanet.distance} AU</p>

          <p className="text-sm leading-relaxed text-gray-300 mb-4">
            {activePlanet.desc}
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="bg-white/5 p-2 rounded">
              <div className="text-gray-500 text-[10px]">RADIUS</div>
              <div className="text-white font-bold">{activePlanet.radius * 6000} KM</div>
            </div>
            <div className="bg-white/5 p-2 rounded">
              <div className="text-gray-500 text-[10px]">SPEED</div>
              <div className="text-white font-bold">{(activePlanet.speed * 100).toFixed(1)} AU/s</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// --- POST PROCESSING (ULTRA HIGH-END) ---
const SceneEffects = () => {
  return (
    <EffectComposer multisampling={8}>
      {/* SSAO für realistische Schatten */}
      <SSAO
        blendFunction={BlendFunction.MULTIPLY}
        samples={16}
        radius={0.5}
        intensity={30}
      />

      {/* Bloom für Leuchteffekte */}
      <Bloom
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        intensity={1.8}
        mipmapBlur
      />

      {/* Depth of Field für Tiefenschärfe */}
      <DepthOfField
        focusDistance={0.01}
        focalLength={0.05}
        bokehScale={3}
      />

      {/* Chromatische Aberration für Realismus */}
      <ChromaticAberration
        blendFunction={BlendFunction.NORMAL}
        offset={[0.0005, 0.0005]}
      />

      {/* Vignette für Kino-Look */}
      <Vignette eskil={false} offset={0.15} darkness={1.2} />
    </EffectComposer>
  );
};

// --- KAMERA RIG (Verbessert) ---
const CameraRig = () => {
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    state.camera.position.x += (state.mouse.x * 3 - state.camera.position.x) * 0.02;
    state.camera.position.y += (state.mouse.y * 3 + 30 - state.camera.position.y) * 0.02;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
};

// --- LOADING FALLBACK ---
const LoadingScreen = () => (
  <Html center>
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      <div className="text-white font-mono text-sm tracking-widest">LOADING UNIVERSE...</div>
    </div>
  </Html>
);

// --- MAIN APP ---
export default function App() {
  const [activePlanet, setActivePlanet] = useState(null);

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <HUD activePlanet={activePlanet} setActivePlanet={setActivePlanet} />

      <Canvas
        shadows
        camera={{ position: [0, 30, 60], fov: 40 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.3,
          outputColorSpace: THREE.SRGBColorSpace
        }}
      >
        <Suspense fallback={<LoadingScreen />}>
          {/* Beleuchtung */}
          <ambientLight intensity={0.05} />
          <hemisphereLight intensity={0.3} color="#ffffff" groundColor="#080820" />

          {/* Sterne */}
          <Stars
            radius={300}
            depth={60}
            count={8000}
            factor={5}
            saturation={0}
            fade
            speed={0.3}
          />

          {/* Environment Map für Reflexionen */}
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
            dampingFactor={0.05}
            minDistance={20}
            maxDistance={250}
            autoRotate={!activePlanet}
            autoRotateSpeed={0.4}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
