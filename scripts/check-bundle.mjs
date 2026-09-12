// Bundle budget (PLAN §8, E8.3) — total gzipped JS in dist/assets must
// stay under 100 KB. Exits non-zero when exceeded.

import { readdir, readFile } from 'node:fs/promises'
import { gzipSync } from 'node:zlib'
import { join } from 'node:path'

const BUDGET_KB = 100

const files = (await readdir('dist/assets')).filter((f) => f.endsWith('.js'))
let totalGzip = 0
for (const file of files) {
  const buf = await readFile(join('dist/assets', file))
  const gz = gzipSync(buf).length
  totalGzip += gz
  console.log(`${file}: raw ${(buf.length / 1024).toFixed(1)} KB, gzip ${(gz / 1024).toFixed(1)} KB`)
}

const totalKB = totalGzip / 1024
console.log(`\nTotal gzipped JS: ${totalKB.toFixed(1)} KB (budget ${BUDGET_KB} KB)`)
if (totalKB > BUDGET_KB) {
  console.error('FAIL — bundle budget exceeded')
  process.exit(1)
}
console.log('PASS — within budget')
