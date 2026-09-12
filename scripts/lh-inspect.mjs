// Lighthouse report inspection helper
import { readFileSync } from 'node:fs'

const r = JSON.parse(readFileSync('.lighthouse/lh.json', 'utf8'))
const a = r.audits

const lcp = a['largest-contentful-paint']
console.log('LCP score/val:', lcp.score, lcp.displayValue)
const items = lcp?.details?.items?.[0]?.items ?? []
items.forEach((it) => console.log('LCP node:', JSON.stringify(it).slice(0, 300)))

const ph = a['metrics']?.details?.items?.[0] ?? {}
console.log('observed LCP (ms):', ph.observedLargestContentfulPaint)

const errs = a['errors-in-console']?.details?.items ?? []
errs.forEach((e) => console.log('CONSOLE:', JSON.stringify(e).slice(0, 300)))

const net = a['network-requests']?.details?.items ?? []
net
  .filter((i) => ['Script', 'Stylesheet', 'Font', 'Document'].includes(i.resourceType))
  .forEach((i) =>
    console.log(i.resourceType, `${Math.round(i.networkEndTime - i.networkRequestTime)}ms`, i.url.slice(0, 80)),
  )
