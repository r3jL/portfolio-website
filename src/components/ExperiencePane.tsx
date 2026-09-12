import { experience } from '../content'
import { OwnershipTag } from './OwnershipTag'

/**
 * Experience tab: each internship as a role/org header + summary, with its
 * sub-projects on a left rail (dot + ownership tag). Names/descriptions are
 * verbatim from PRD §4 (real data — no invented dates or renames).
 */
export function ExperiencePane() {
  return (
    <section
      aria-labelledby="exp-heading"
      className="p-6 sm:p-9 lg:p-10"
    >
      {experience.map((exp) => (
        <div key={exp.org} className="flex flex-col gap-6">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
            <div className="flex flex-col gap-1.5">
              <div className="font-mono text-[10.5px] font-medium uppercase tracking-[0.11em] text-muted">
                {exp.type}
              </div>
              <div className="font-display text-lg font-semibold text-ink">
                {exp.org}
              </div>
              <h2
                id="exp-heading"
                className="font-display text-2xl font-semibold tracking-tight text-ink"
              >
                {exp.role}
              </h2>
              <div className="text-sm text-muted">{exp.summary}</div>
            </div>
          </div>

          <ol className="relative ml-1 flex flex-col gap-8 border-l border-line">
            {exp.subProjects.map((sub) => (
              <li
                key={sub.name}
                className="relative pl-6"
              >
                <span
                  aria-hidden
                  className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-page bg-ink"
                />
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {sub.name}
                    </h3>
                    <OwnershipTag ownership={sub.ownership} />
                  </div>
                  <p className="text-sm leading-relaxed text-muted">
                    {sub.description}
                  </p>
                  {sub.impact && (
                    <p className="text-sm font-medium text-ink italic">
                      {sub.impact}
                    </p>
                  )}
                  {sub.techStack && sub.techStack.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
                      {sub.techStack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-line px-3 py-1.5 font-mono text-[11.5px] text-muted"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </section>
  )
}
