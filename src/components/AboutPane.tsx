import { site, skillGroups } from '../content'

/**
 * About tab: the real PRD "About" paragraph, skills grouped by category
 * (PRD §4 — no invented "traced to" provenance), and education.
 */
export function AboutPane() {
  return (
    <section
      aria-labelledby="about-heading"
      className="flex flex-col gap-9 p-6 sm:p-9 lg:p-10"
    >
      <div className="flex flex-col gap-3.5">
        <h2
          id="about-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink"
        >
          About
        </h2>
        <p className="text-[17px] leading-relaxed text-ink">{site.pitch}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="font-mono text-[10.5px] font-medium uppercase tracking-[0.13em] text-muted">
          Skills
        </div>
        <div className="flex flex-col">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="grid grid-cols-1 gap-2 border-t border-line py-4 sm:grid-cols-[160px_1fr]"
            >
              <div className="font-semibold text-ink">{group.label}</div>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-3 py-1.5 font-mono text-sm text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="border-t border-line" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="font-mono text-[10.5px] font-medium uppercase tracking-[0.13em] text-muted">
          Education
        </div>
        <div className="flex flex-wrap items-end justify-between gap-2 border-t border-line pt-4">
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-ink">{site.education.degree}</div>
            <div className="text-sm text-muted">{site.education.org}</div>
          </div>
          <div className="font-mono text-[12.5px] text-muted">2023 — 2027</div>
        </div>
      </div>
    </section>
  )
}
