# 🌌 SOLAR ENGINE - 3D Sonnensystem Visualisierung

Eine interaktive 3D-Simulation unseres Sonnensystems mit realistischen Texturen, Post-Processing-Effekten und detaillierter Planetendarstellung.

## ✨ Features

- **Realistische Planeten-Texturen** von NASA / Public Domain
- **Post-Processing Effekte**:
  - Bloom für leuchtende Sonne
  - Vignette für cineastischen Look
  - Film Grain für Realismus
- **Atmosphären-Shader** für Erde (Fresnel-Effekt)
- **Saturn-Ringe** mit prozeduraler Geometrie
- **Interaktive Steuerung**: Zoom, Pan, Auto-Rotation
- **Klickbare Planeten** mit Detailinformationen
- **Responsive Design** mit TailwindCSS

## 🚀 Installation

```bash
# Dependencies installieren
npm install

# Development Server starten
npm run dev

# Für Production bauen
npm run build
```

## 📦 Abhängigkeiten

- React
- Three.js
- @react-three/fiber
- @react-three/drei
- @react-three/postprocessing
- three-stdlib
- TailwindCSS

## 🎮 Steuerung

- **Linke Maustaste + Ziehen**: Kamera rotieren
- **Mausrad**: Zoom
- **Rechte Maustaste + Ziehen**: Kamera verschieben
- **Planeten anklicken**: Detailinformationen anzeigen

## 🌍 Planeten

- Merkur
- Venus
- Erde (mit Atmosphäre)
- Mars
- Jupiter
- Saturn (mit Ringen)
- Uranus
- Neptun

## 🎨 Next-Gen Features

### Bloom & Post-Processing
Die Sonne nutzt emissive Materials mit Bloom-Effekt für realistisches Leuchten.

### Atmosphären-Shader
Planeten mit Atmosphäre (z.B. Erde) haben einen shader-basierten Fresnel-Effekt.

### Tone Mapping
Reinhard Tone Mapping für HDR-ähnliche Farbdarstellung.

## 🚀 Deployment auf Vercel

1. GitHub Repository erstellen und Code pushen
2. Auf [Vercel](https://vercel.com) gehen
3. "New Project" klicken
4. GitHub Repository auswählen
5. Vite-Preset wird automatisch erkannt
6. "Deploy" klicken

Fertig! Die App wird automatisch deployt.

## 📝 Credits

- Texturen: NASA / Wikimedia Commons (Public Domain)
- Framework: React + Three.js
- Post-Processing: @react-three/postprocessing

## 📄 Lizenz

MIT

---

**Made with 🚀 by SolarEngine Team**
