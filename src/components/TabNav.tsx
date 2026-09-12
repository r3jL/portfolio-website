import { useRef, type KeyboardEvent } from 'react'

interface Tab {
  id: string
  label: string
  count?: string
}

/**
 * Accessible tablist (WAI-ARIA): roving tabindex, arrow-key navigation,
 * aria-selected + aria-controls wiring to the tabpanels in App.
 */
export function TabNav({
  tabs,
  active,
  onSelect,
}: {
  tabs: Tab[]
  active: string
  onSelect: (id: string) => void
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const dir = e.key === 'ArrowRight' ? 1 : -1
    const next = (i + dir + tabs.length) % tabs.length
    refs.current[next]?.focus()
    onSelect(tabs[next].id)
  }

  return (
    <div
      role="tablist"
      aria-label="Sections"
      className="sticky top-0 z-20 flex border-b border-line bg-page/85 backdrop-blur"
    >
      {tabs.map((t, i) => {
        const selected = active === t.id
        return (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={selected}
            aria-controls={`panel-${t.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(t.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`relative flex items-baseline gap-1.5 px-5 py-4 text-sm font-medium transition-colors ${
              selected ? 'text-ink' : 'text-muted hover:text-ink'
            }`}
          >
            {t.label}
            {t.count && (
              <span className="font-mono text-[11px] text-muted">{t.count}</span>
            )}
            {selected && (
              <span
                aria-hidden
                className="absolute inset-x-0 -bottom-px h-0.5 bg-ink"
              />
            )}
          </button>
        )
      })}
    </div>
  )
}
