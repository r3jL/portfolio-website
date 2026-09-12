import { renderToString } from 'react-dom/server'
import App from './App'

/** Build-time prerender entry (see scripts/prerender.mjs). Renders the same
 *  component tree to HTML so the hero ships in index.html itself — LCP no
 *  longer waits for the JS bundle to download, parse, and mount. */
export function render(): string {
  return renderToString(<App />)
}
