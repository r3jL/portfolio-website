import type { Ownership } from '../content'

// Light-theme ownership chip. `solo` is neutral; `partnered` uses the blue
// accent (soft bg + accent-ink text) so the two read as distinct without
// relying on color alone — the label text carries the meaning (PLAN E5.3).
const STYLES: Record<Ownership, string> = {
  'built solo': 'border-line bg-surface text-muted',
  partnered: 'border-accent/40 bg-accent-soft text-accent-ink',
}

export function OwnershipTag({ ownership }: { ownership: Ownership }) {
  const label = ownership === 'partnered' ? 'partnered' : 'solo'
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[11px] leading-none ${STYLES[ownership]}`}
    >
      {label}
    </span>
  )
}
