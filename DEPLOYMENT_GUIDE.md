# 🚀 Deployment Anleitung

## Schritt 1: GitHub Repository erstellen

Da `gh` CLI nicht verfügbar ist, erstelle das Repository manuell:

1. Gehe zu https://github.com/new
2. Repository Name: `planet`
3. Beschreibung: `3D Solar System Visualization with React & Three.js`
4. Visibility: `Public` (oder `Private`, wie gewünscht)
5. **NICHT** "Initialize this repository with a README" anklicken
6. Klicke auf "Create repository"

## Schritt 2: GitHub Remote hinzufügen und Code pushen

Nach dem Erstellen des Repositories auf GitHub, führe folgende Befehle aus:

```bash
cd /home/user/planet

# Remote hinzufügen (ersetze USERNAME mit deinem GitHub-Username)
git remote add origin https://github.com/USERNAME/planet.git

# Code pushen
git push -u origin main
```

**WICHTIG:** Ersetze `USERNAME` mit deinem tatsächlichen GitHub-Benutzernamen!

## Schritt 3: Auf Vercel deployen

### Option A: Via Vercel Dashboard (Empfohlen)

1. Gehe zu https://vercel.com
2. Klicke auf "Add New..." → "Project"
3. Wähle "Import Git Repository"
4. Suche nach deinem `planet` Repository
5. Klicke auf "Import"
6. Vercel erkennt automatisch Vite
7. Klicke auf "Deploy"

**Fertig!** Deine App wird jetzt automatisch gebaut und deployed.

### Option B: Via Vercel CLI

```bash
# Vercel CLI installieren (falls noch nicht installiert)
npm i -g vercel

# In das Projektverzeichnis wechseln
cd /home/user/planet

# Vercel Login (öffnet Browser)
vercel login

# Deploy
vercel
```

Folge den Anweisungen im Terminal.

## Schritt 4: Automatische Deployments

Sobald das Projekt mit Vercel verbunden ist:
- Jeder Push zu `main` löst automatisch ein neues Deployment aus
- Pull Requests erhalten Preview-Deployments
- Vercel generiert automatisch HTTPS-URLs

## 🔧 Umgebungsvariablen

Dieses Projekt benötigt **keine** Umgebungsvariablen, da alle Ressourcen (Texturen) von öffentlichen URLs geladen werden.

Falls du später eigene API-Keys hinzufügen möchtest:

1. Gehe zu deinem Vercel-Dashboard
2. Wähle dein Projekt
3. Klicke auf "Settings" → "Environment Variables"
4. Füge deine Variablen hinzu

## 🌐 Deine Live-URL

Nach dem Deployment findest du deine App unter:
```
https://planet.vercel.app
```
oder
```
https://planet-[username].vercel.app
```

## 📊 Performance-Optimierungen

Die App ist bereits für Production optimiert:
- ✅ Vite Build-Optimierung
- ✅ Tree-shaking
- ✅ Code-splitting
- ✅ Asset-Optimierung
- ✅ Gzip-Kompression (automatisch durch Vercel)

## 🐛 Troubleshooting

### Problem: "Error: Cannot find module"
**Lösung:** Stelle sicher, dass alle Dependencies installiert sind:
```bash
npm install
```

### Problem: Build schlägt fehl
**Lösung:** Teste den Build lokal:
```bash
npm run build
```

### Problem: Texturen laden nicht
**Lösung:** Alle Texturen kommen von Wikipedia/Wikimedia Commons. Stelle sicher, dass die URLs erreichbar sind.

## 📝 Weitere Hilfe

- Vercel Docs: https://vercel.com/docs
- Vite Docs: https://vitejs.dev
- React Three Fiber: https://docs.pmnd.rs/react-three-fiber

---

**Happy Deploying! 🚀**
