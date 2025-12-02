# Vercel Automatic Deployment Setup

## Deployed URLs

- **Production**: https://planet-id9sjtt0q-brandea.vercel.app
- **Vercel Dashboard**: https://vercel.com/brandea/planet

## GitHub Secrets Configuration

Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

| Secret Name | Value |
|-------------|-------|
| `VERCEL_TOKEN` | `9nfRfCzSC8odYMYybxvlge7J` |
| `VERCEL_ORG_ID` | `team_krbwBPkpvW8E1IgoHTdghzN5` |
| `VERCEL_PROJECT_ID` | `prj_3M5P6tyd5gQ1sjw2a1quIm1IGUNC` |

## Automatic Deployment Triggers

The GitHub Actions workflows are configured for:

### CI Workflow (`.github/workflows/ci.yml`)
- Runs on **every push** to any branch
- Runs on **every pull request**
- Executes: linting, build verification

### Vercel Deployment (`.github/workflows/vercel-deploy.yml`)
- **Preview Deployments**: On pull requests
- **Production Deployments**: On push to `main`, `master`, or `claude/**` branches

## Manual Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Set environment variables
export VERCEL_ORG_ID=team_krbwBPkpvW8E1IgoHTdghzN5
export VERCEL_PROJECT_ID=prj_3M5P6tyd5gQ1sjw2a1quIm1IGUNC
export VERCEL_TOKEN=9nfRfCzSC8odYMYybxvlge7J

# Pull project settings
vercel pull --yes --environment=production --token=$VERCEL_TOKEN

# Build and deploy
vercel build --prod --token=$VERCEL_TOKEN
vercel deploy --prebuilt --prod --token=$VERCEL_TOKEN
```

## Project Structure

```
planet/
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI: build & lint checks
│       └── vercel-deploy.yml   # Automatic Vercel deployments
├── .vercel/
│   └── project.json            # Vercel project configuration
├── src/
│   └── App.jsx                 # Main 3D solar system application
├── vercel.json                 # Vercel build configuration
└── package.json                # Dependencies
```

## Technology Stack

- React 19 + Vite 7
- Three.js + React Three Fiber
- Post-processing effects (Bloom, DOF, Vignette)
- TailwindCSS 4
