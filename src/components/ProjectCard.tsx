import type { Project } from '../content'
import { OwnershipTag } from './OwnershipTag'
import { GithubIcon } from './icons'
import { safeTrack } from '../lib/analytics'

// On-theme "plate" for the card's left column. The demo placeholder art was a
// dark raster that fought the light editorial theme; this is a light,
// generated figure instead — a hairline panel with a faint diagonal hatch, the
// project index set large, and the repo slug as a mono caption. It stretches to
// fill the column height so cards with more text don't leave an awkward gap.
function CardPlate({ index, slug, category }: Pick<Project, 'index' | 'slug' | 'category'>) {
  return (
    <div
      aria-hidden
      className="relative min-h-[132px] w-full flex-1 overflow-hidden rounded-lg border border-line"
      style={{
        backgroundImage:
          'repeating-linear-gradient(135deg, var(--color-surface) 0 7px, var(--color-page) 7px 14px)',
      }}
    >
      <span className="absolute left-3.5 top-3 font-mono text-[9.5px] font-medium uppercase tracking-[0.14em] text-muted/80">
        {category}
      </span>
      <span className="absolute inset-0 flex items-center justify-center font-display text-[64px] font-semibold leading-none tracking-tighter text-ink/[0.08]">
        {index}
      </span>
      <span className="absolute bottom-3 left-3.5 right-3.5 truncate font-mono text-[11px] text-muted">
        {slug}
      </span>
    </div>
  )
}

/**
 * Project card: generated plate + GitHub link on the left, info column on the
 * right with index/category, title, ownership tag, description, an impact
 * line, and tech/feature pills.
 */
export function ProjectCard({ project }: { project: Project }) {
  const { index, category, slug, title, ownership, description, impact, pills, github } = project

  return (
    <article className="card-glow flex flex-col gap-5 rounded-xl border border-line bg-page p-5 transition-colors sm:flex-row sm:gap-7 sm:p-6">
      <div className="flex flex-col items-start gap-3 sm:w-[250px] sm:shrink-0">
        <CardPlate index={index} slug={slug} category={category} />
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => safeTrack('project_github_click', { project: slug })}
            className="inline-flex items-center gap-1.5 font-mono text-[11.5px] text-muted transition-colors hover:text-accent"
          >
            <GithubIcon className="h-4 w-4" /> View on GitHub ↗
          </a>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3.5">
        <div className="flex items-center gap-2.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.11em] text-muted">
          <span className="text-ink">{index}</span>
          <span aria-hidden className="text-line">/</span>
          <span>{category}</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-[23px]">
            {title}
          </h3>
          <OwnershipTag ownership={ownership} />
        </div>

        <p className="text-sm leading-relaxed text-muted sm:text-[15px]">
          {description}
        </p>

        {impact && (
          <p className="flex items-start gap-2.5 text-sm leading-relaxed text-ink sm:text-[15px]">
            <span aria-hidden className="mt-px font-mono text-accent">→</span>
            <span className="font-medium">{impact}</span>
          </p>
        )}

        <ul className="mt-1 flex flex-wrap gap-2">
          {pills.map((pill) => (
            <li
              key={pill}
              className="rounded-full border border-line bg-page px-2.5 py-1 font-mono text-[11px] text-muted transition-colors hover:border-ink/25 hover:text-ink"
            >
              {pill}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
