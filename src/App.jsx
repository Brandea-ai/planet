import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, extend, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { UnrealBloomPass } from 'three-stdlib';

extend({ UnrealBloomPass });

// --- TEXTUR URLs (NASA / Public Domain) ---
const textureURLs = {
  sun: "https://upload.wikimedia.org/wikipedia/commons/9/99/Map_of_the_full_sun.jpg",
  mercury: "https://upload.wikimedia.org/wikipedia/commons/3/30/Mercury_in_color_-_Prockter07_centered.jpg",
  venus: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg",
  earth: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Earthmap1000x500compac.jpg",
  earthClouds: "https://upload.wikimedia.org/wikipedia/commons/archive/2/2c/20111018151936%21Clouds_of_the_Earth.jpg", // Einfache Wolkenmap
  mars: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg",
  jupiter: "https://upload.wikimedia.org/wikipedia/commons/e/e2/Jupiter.jpg",
  saturn: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Saturn_%28planet%29_large.jpg",
  saturnRing: "https://upload.wikimedia.org/wikipedia/commons/6/67/Saturn_Rings_texture.jpg", // Platzhalter, wir nutzen Shader für Ringe
  uranus: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg",
  neptune: "https://upload.wikimedia.org/wikipedia/commons/5/56/Neptune_Full.jpg",
  galaxy: "https://upload.wikimedia.org/wikipedia/commons/8/80/Milky_Way_Panorama.jpg" // Background
};

// --- DATEN ---
const planets = [
  { name: "Merkur", distance: 10, radius: 0.6, speed: 0.04, texture: textureURLs.mercury, desc: "Der sonnennächste Planet." },
  { name: "Venus", distance: 15, radius: 1.1, speed: 0.03, texture: textureURLs.venus, desc: "Höllisch heiß, dichte Wolken." },
  { name: "Erde", distance: 22, radius: 1.2, speed: 0.02, texture: textureURLs.earth, hasAtmosphere: true, desc: "Unser Heimatplanet." },
  { name: "Mars", distance: 30, radius: 0.8, speed: 0.018, texture: textureURLs.mars, desc: "Der rote Wüstenplanet." },
  { name: "Jupiter", distance: 45, radius: 3.5, speed: 0.008, texture: textureURLs.jupiter, desc: "Gasriese, der König." },
  { name: "Saturn", distance: 60, radius: 3, speed: 0.006, texture: textureURLs.saturn, hasRings: true, desc: "Herr der Ringe." },
  { name: "Uranus", distance: 78, radius: 2, speed: 0.004, texture: textureURLs.uranus, desc: "Der eisige Riese." },
  { name: "Neptun", distance: 95, radius: 1.9, speed: 0.003, texture: textureURLs.neptune, desc: "Stürmischer Blauer Planet." },
];

// --- SHADER: ATMOSPHÄRE (Erde) ---
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

// --- KOMPONENTEN ---

const Sun = () => {
    // Wir nutzen hier eine Textur PLUS Emissive Material für maximales Leuchten
    const texture = useTexture(textureURLs.sun);

    return (
        <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial
                map={texture}
                emissiveMap={texture}
                emissiveIntensity={2} // Das bringt den Bloom zum explodieren
                emissive={new THREE.Color("#ffaa00")}
                color="#ffaa00"
            />
            <pointLight intensity={2.5} distance={300} decay={1} color="#ffddaa" />
        </mesh>
    );
};

const Earth = ({ data, isActive }) => {
    const [colorMap] = useLoader(THREE.TextureLoader, [data.texture]);
    const mesh = useRef();
    const atmosRef = useRef();

    useFrame(({ clock }) => {
        // Rotation
        mesh.current.rotation.y += 0.002;
        // Umlaufbahn wird in Parent gemacht, hier ist lokale Rotation
    });

    return (
        <group>
            <mesh ref={mesh}>
                <sphereGeometry args={[data.radius, 64, 64]} />
                <meshStandardMaterial
                    map={colorMap}
                    roughness={0.7}
                    metalness={0.1}
                />
            </mesh>
            {/* Atmosphäre Layer */}
            <mesh ref={atmosRef} scale={[1.1, 1.1, 1.1]}>
                <sphereGeometry args={[data.radius, 64, 64]} />
                <shaderMaterial
                    vertexShader={AtmosphereShader.vertexShader}
                    fragmentShader={AtmosphereShader.fragmentShader}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                    transparent
                />
            </mesh>
        </group>
    )
}

const SaturnRings = ({ radius }) => {
    // Prozedurale Ringe statt Textur für schärfere Kanten
    return (
        <mesh rotation-x={-Math.PI / 2}>
            <ringGeometry args={[radius * 1.4, radius * 2.5, 128]} />
            <meshStandardMaterial
                color="#bfa681"
                side={THREE.DoubleSide}
                transparent
                opacity={0.8}
            />
        </mesh>
    )
}

const Planet = ({ data, activePlanet, setActivePlanet }) => {
    const texture = useTexture(data.texture);
    const ref = useRef();
    const randomOffset = useMemo(() => Math.random() * Math.PI * 2, []);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * data.speed + randomOffset;
        const x = Math.sin(t) * data.distance;
        const z = Math.cos(t) * data.distance;
        ref.current.position.set(x, 0, z);
        ref.current.rotation.y += 0.01;
    });

    return (
        <group ref={ref}>
            {/* Klickbarer Bereich */}
            <mesh
                onClick={(e) => { e.stopPropagation(); setActivePlanet(data); }}
                onPointerOver={() => document.body.style.cursor = 'pointer'}
                onPointerOut={() => document.body.style.cursor = 'auto'}
            >
                <sphereGeometry args={[data.radius, 64, 64]} />
                <meshStandardMaterial map={texture} />
            </mesh>

            {data.hasAtmosphere && (
                <mesh scale={[1.2, 1.2, 1.2]}>
                    <sphereGeometry args={[data.radius, 64, 64]} />
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

            {/* Orbit Linie */}
            <mesh rotation-x={Math.PI / 2} position={[-ref.current?.position.x || 0, 0, -ref.current?.position.z || 0]}>
                 {/* Dies ist ein Hack: Wir zeichnen den Orbit relativ zur Sonne, aber innerhalb der Planetengruppe ist das schwer.
                     Besser: Orbits global zeichnen. Der Einfachheit halber lassen wir die Linien hier weg für den "Cinematic Look"
                     und konzentrieren uns auf die Planeten. */}
            </mesh>

             {/* Name Label */}
            <Html distanceFactor={20} position={[0, data.radius + 1, 0]}>
                <div className="text-white text-xs font-mono tracking-widest bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                    {data.name}
                </div>
            </Html>
        </group>
    );
};

// --- SZENEN HINTERGRUND (Milky Way) ---
const Background = () => {
    // Wir erstellen eine riesige Kugel von innen für das Universum
    const texture = useTexture(textureURLs.galaxy);
    return (
        <mesh scale={[-1, 1, 1]}> {/* Invertieren, damit Textur innen ist */}
            <sphereGeometry args={[400, 64, 64]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    )
}

// --- UI OVERLAY ---
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
                <div className="absolute bottom-10 left-10 w-96 bg-black/70 backdrop-blur-xl border-t-2 border-orange-500 p-6 text-white transform transition-all duration-500 z-20">
                     <button
                        onClick={() => setActivePlanet(null)}
                        className="absolute -top-4 right-0 bg-orange-600 text-black font-bold px-3 py-1 text-xs hover:bg-white transition-colors"
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
    )
}

// --- POST PROCESSING & KAMERA ---
const SceneEffects = () => {
    return (
        <EffectComposer>
            {/* Bloom lässt helle Bereiche (Sonne, Atmosphäre) glühen */}
            <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={300} intensity={1.5} />
            {/* Vignette für den Kino-Look (dunkle Ecken) */}
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
            {/* Leichtes Film Grain für Realismus */}
            <Noise opacity={0.02} />
        </EffectComposer>
    )
}

// --- KAMERA CONTROLLER ---
// Eine Kamera, die sanft mitfliegt, wenn man nichts macht
const CameraRig = () => {
    useFrame((state) => {
        // Leichte Maus-Bewegungsparallaxe
        state.camera.position.x += (state.mouse.x * 2 - state.camera.position.x) * 0.01;
        state.camera.position.y += (state.mouse.y * 2 - state.camera.position.y) * 0.01;
        state.camera.lookAt(0, 0, 0);
    })
    return null;
}

export default function App() {
  const [activePlanet, setActivePlanet] = useState(null);

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <HUD activePlanet={activePlanet} setActivePlanet={setActivePlanet} />

      {/* Canvas Einstellungen für maximale Qualität */}
      <Canvas
        camera={{ position: [0, 30, 60], fov: 35 }}
        dpr={[1, 2]} // High DPI Rendering für scharfe Kanten auf Handys
        gl={{ antialias: false, toneMapping: THREE.ReinhardToneMapping, toneMappingExposure: 1.5 }} // Tone Mapping für realistische Farben
        shadows
      >
        <React.Suspense fallback={<Html center><div className="text-white font-mono">LOADING UNIVERSE...</div></Html>}>
            {/* Environment */}
            <Background />
            <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade />

            {/* Lighting */}
            <ambientLight intensity={0.05} /> {/* Sehr dunkel, Weltraum ist dunkel! */}

            {/* Objects */}
            <Sun />

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
                minDistance={10}
                maxDistance={200}
                autoRotate={!activePlanet} // Dreht sich automatisch, wenn nichts ausgewählt ist
                autoRotateSpeed={0.5}
            />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
