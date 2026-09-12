import { site, skillGroups, projects, experience } from '../content'

// Quick facts — every value is derived from real content (counts from the
// projects/experience arrays, fields from site), never invented. This gives
// the About tab a scannable summary without fabricating claims.
const shippedTools = experience.reduce((n, e) => n + e.subProjects.length, 0)

const facts: { label: string; value: string }[] = [
  { label: 'Focus', value: 'Practical AI / ML' },
  { label: 'Projects', value: `${projects.length} shipped · code public` },
  {
    label: 'Experience',
    value: `AI intern · ${shippedTools} internal tools`,
  },
  { label: 'Education', value: 'IIT Delhi · 2023 – 2027' },
  { label: 'Based in', value: site.location },
  { label: 'Availability', value: site.availability },
]

/**
 * About tab: the PRD "About" paragraph, a "currently" line and an at-a-glance
 * facts grid (both from real data), skills grouped by category, and education.
 */
export function AboutPane() {
  return (
    <section
      aria-labelledby="about-heading"
      className="flex flex-col gap-10 p-6 sm:p-9 lg:p-10"
    >
      <div className="flex max-w-[68ch] flex-col gap-4">
        <h2
          id="about-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink"
        >
          About
        </h2>
        <p className="text-[17px] leading-relaxed text-ink">{site.pitch}</p>

        <div className="mt-1 flex flex-col gap-2.5 rounded-xl border border-line bg-surface/50 p-4 sm:flex-row sm:items-center sm:gap-4">
          <span className="shrink-0 font-mono text-[10.5px] font-medium uppercase tracking-[0.13em] text-accent-ink">
            Currently
          </span>
          <ul className="flex flex-wrap gap-2">
            {site.currently.split('·').map((item) => (
              <li
                key={item}
                className="rounded-full border border-accent/30 bg-accent-soft px-3 py-1 font-mono text-[12px] text-accent-ink"
              >
                {item.trim()}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="font-mono text-[10.5px] font-medium uppercase tracking-[0.13em] text-muted">
          At a glance
        </div>
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1.5 bg-page p-4">
              <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
                {fact.label}
              </dt>
              <dd className="text-[15px] font-medium text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
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
