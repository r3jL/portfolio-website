import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { inject } from '@vercel/analytics'
// Self-hosted IBM Plex (matches the Panel + Tabs demo): latin subset + only
// the weights in use — no render-blocking cross-origin CSS. IBM Plex Sans
// 400/500/600/700 (body + display), IBM Plex Mono 400/500 (labels/tags).
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-sans/latin-600.css'
import '@fontsource/ibm-plex-sans/latin-700.css'
import '@fontsource/ibm-plex-mono/latin-400.css'
import '@fontsource/ibm-plex-mono/latin-500.css'
import './index.css'
import App from './App'

// Vercel Web Analytics — cookieless (PRD §8.1). Injected only off localhost:
// the /_vercel/insights endpoint does not exist locally and would 404.
const isLocalHost =
  location.hostname === 'localhost' || location.hostname === '127.0.0.1'
if (!isLocalHost) inject()

// Flag JS availability for the reveal animation. Added here (not an inline
// head script) so prerendered HTML paints fully visible and the LCP element
// is never hidden by CSS before JS runs.
document.documentElement.classList.add('js')

const rootEl = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Prerendered markup -> hydrate (reuses DOM, no repaint flash).
// Dev server / no prerendered content -> classic client render.
if (rootEl.hasChildNodes()) {
  hydrateRoot(rootEl, app)
} else {
  createRoot(rootEl).render(app)
}
