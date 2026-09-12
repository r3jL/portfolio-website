import { projects } from '../content'
import { ProjectCard } from './ProjectCard'

/** Work tab: intro line + the three project cards. */
export function WorkPane() {
  return (
    <section
      aria-labelledby="projects-heading"
      className="p-6 sm:p-8 lg:p-10"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <h2
          id="projects-heading"
          className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
        >
          Projects
        </h2>
        <p className="max-w-[56ch] text-sm leading-relaxed text-muted sm:text-base">
          Three things I built end-to-end — problem, system, and what actually
          shipped. Code is public.
        </p>
      </div>

      <ul className="flex flex-col gap-5">
        {projects.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  )
}
