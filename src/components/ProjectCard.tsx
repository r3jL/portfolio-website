import type { Project } from '../content'
import { OwnershipTag } from './OwnershipTag'
import { GithubIcon } from './icons'
import { safeTrack } from '../lib/analytics'

/**
 * Project card: image + GitHub link on the left, info column on the right
 * with index/category, title, ownership tag, description, impact line,
 * tech/feature pills. Description flows to the card edge.
 */
export function ProjectCard({ project }: { project: Project }) {
  const { index, category, slug, title, ownership, description, impact, image, pills, github } =
    project

  return (
    <article className="card-glow flex flex-col gap-4 rounded-xl border border-line bg-page p-6 transition-colors sm:flex-row sm:gap-6">
      <div className="flex flex-col gap-2.5 sm:w-[200px] sm:shrink-0">
        {image && (
          <img
            src={image}
            alt={title}
            className="h-auto w-full rounded-lg border border-line object-cover"
          />
        )}
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

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="flex items-center gap-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.11em] text-muted">
          <span className="text-ink">{index}</span>
          <span aria-hidden>—</span>
          <span>{category}</span>
        </div>

        <div className="flex flex-wrap items-start gap-2.5">
          <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-2xl">
            {title}
          </h3>
          <OwnershipTag ownership={ownership} />
        </div>

        <p className="text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>

        {impact && (
          <p className="text-sm font-medium text-ink italic sm:text-base">
            {impact}
          </p>
        )}

        <ul className="flex flex-wrap gap-2">
          {pills.map((pill) => (
            <li
              key={pill}
              className="rounded-full border border-line px-3 py-1.5 font-mono text-[11.5px] text-muted"
            >
              {pill}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
