// Post-build prerender + critical-CSS inlining.
//
// 1. Injects the server-rendered app HTML into dist/index.html so first
//    paint contains the real content (PLAN §8 LCP — no waiting for the JS
//    bundle to download/parse/mount).
// 2. Inlines the app stylesheet into <head> — the site has exactly one
//    CSS file (~31KB); inlining removes the extra request from the
//    critical path entirely.
// 3. Adds <link rel="preload"> for the latin font files the above-fold
//    text uses, so the font swap (which re-fires the LCP candidate) is
//    not delayed behind CSS-parse-time discovery.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'

// --- 1. prerender HTML ---
const { render } = await import('../dist-ssr/entry-server.js')
const html = render()

const path = 'dist/index.html'
let doc = readFileSync(path, 'utf8')
const marker = '<div id="root"></div>'
if (!doc.includes(marker)) {
  throw new Error(`prerender: root marker not found in ${path}`)
}
doc = doc.replace(marker, `<div id="root">${html}</div>`)

// --- 2. inline the stylesheet ---
const linkRe = /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/
const linkMatch = doc.match(linkRe)
if (!linkMatch) {
  throw new Error('prerender: stylesheet link not found in dist/index.html')
}
const cssPath = `dist${linkMatch[1]}`
let css = readFileSync(cssPath, 'utf8')

// --- 3. preload the latin fonts used above the fold ---
// The largest text (h1 name + hero) uses IBM Plex Sans 700 / 400 latin
// subsets; preloading them lets the font arrive before first paint so the
// LCP candidate fires once, not twice (fallback -> swap).
const assets = readdirSync('dist/assets')
// Exact latin files for the above-fold hero text. A prefix match would
// wrongly pull latin-EXT.
const wanted = [
  /^ibm-plex-sans-latin-700-normal-[a-z0-9_]+\.woff2$/i,
  /^ibm-plex-sans-latin-400-normal-[a-z0-9_]+\.woff2$/i,
]
const preloads = []
for (const re of wanted) {
  const file = assets.find((a) => re.test(a))
  if (file) {
    preloads.push(
      `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>`,
    )
    // The two preloaded hero fonts get font-display: optional — they are
    // preloaded same-origin and reliably arrive inside the ~100ms block
    // period, so users still see IBM Plex Sans on the hero; on very slow
    // links the fallback paints immediately and LCP fires with first paint
    // instead of waiting for the swap. All other fonts keep `swap` so
    // typography always corrects itself.
    // The minified @font-face block lists font-display BEFORE the woff2
    // src, so match the whole block and rewrite the swap inside it.
    const faceRe = new RegExp(`@font-face\\{[^}]*?font-display:\\s*swap[^}]*?${file}[^}]*?\\}`)
    if (!faceRe.test(css)) {
      throw new Error(`prerender: @font-face block not found for ${file}`)
    }
    css = css.replace(
      faceRe,
      (block) => block.replace(/font-display:\s*swap/, 'font-display:optional'),
    )
  } else {
    console.warn(`prerender: WARN font not found for preload: ${re}`)
  }
}
// insert the (font-display-adjusted) stylesheet inline, with the font
// preloads placed before it in <head>
doc = doc.replace(linkMatch[0], `${preloads.join('')}<style>${css}</style>`)

writeFileSync(path, doc)
console.log(
  `prerender: injected ${html.length} chars HTML, inlined ${css.length} chars CSS, ` +
    `${preloads.length} font preloads into ${path}`,
)
