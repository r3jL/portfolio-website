// Link check (PLAN §9, T9.1) — validates every external URL and the
// mailto address against the single source of truth (src/content/*.ts).
// Exits non-zero if any link is broken. LinkedIn's bot wall (999) is
// reported as a warning, not a failure.

import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'

const dir = 'src/content'
const files = (await readdir(dir)).filter((f) => f.endsWith('.ts'))
let source = ''
for (const f of files) source += await readFile(join(dir, f), 'utf8')

const urls = [...new Set(source.match(/https:\/\/[^'"\s)]+/g) ?? [])]

const email = source.match(/email:\s*'([^']+)'/)?.[1]
if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
  console.error('FAIL mailto: invalid or missing email in content/')
  process.exit(1)
}
console.log(`PASS mailto:${email} (well-formed)`)

let failures = 0
for (const url of urls) {
  let res
  try {
    res = await fetch(url, { method: 'HEAD', redirect: 'follow', headers: { 'User-Agent': UA } })
    if ([403, 405, 999].includes(res.status)) {
      res = await fetch(url, { method: 'GET', redirect: 'follow', headers: { 'User-Agent': UA } })
    }
  } catch (err) {
    console.error(`FAIL ${url} — network error: ${err.message}`)
    failures++
    continue
  }
  if (res.status === 999) {
    console.warn(`WARN ${url} — 999 (LinkedIn bot wall; treat as reachable)`)
  } else if (res.status >= 400) {
    console.error(`FAIL ${url} — HTTP ${res.status}`)
    failures++
  } else {
    console.log(`PASS ${url} — HTTP ${res.status}`)
  }
}

console.log(`\n${urls.length} URLs checked, ${failures} failure(s)`)
process.exit(failures > 0 ? 1 : 0)
