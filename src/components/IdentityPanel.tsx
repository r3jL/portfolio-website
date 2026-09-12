import { site } from '../content'
import { ContactList } from './ContactList'

/**
 * Left sticky identity panel (demo-UI "Panel + Tabs"): availability badge,
 * name, identity line, statement, short focus line, and the contact list +
 * meta footer. On large screens it is a full-height sticky rail; on mobile it
 * stacks above the tabbed content.
 */
export function IdentityPanel() {
  const { name, identity, statement, availability, focus, location } = site

  return (
    <aside className="border-line border-b lg:sticky lg:top-0 lg:h-screen lg:w-[360px] lg:shrink-0 lg:overflow-y-auto lg:border-r lg:border-b-0">
      <div className="flex flex-col lg:min-h-screen">
        <div className="sticky top-0 z-10 bg-page p-7 pb-0 lg:px-9 lg:pt-12">
          <div className="flex flex-col gap-7 border-b border-line pb-7">
            <div className="flex items-center gap-2.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.13em] text-muted">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              {availability}
            </div>

            <h1 className="font-display text-4xl font-semibold leading-[1.02] tracking-[-0.02em] text-ink sm:text-[44px]">
              {name}
            </h1>

            <div className="font-mono text-[13px] leading-relaxed text-muted">
              {identity}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-7 p-7 pt-7 lg:px-9 lg:pb-12 lg:pt-8">
          <blockquote className="border-l-2 border-ink pl-4 font-display text-lg leading-snug text-ink">
            “{statement}”
          </blockquote>

          <p className="text-sm leading-relaxed text-muted">{focus}</p>

          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center gap-2 rounded-md bg-ink px-4 py-2.5 text-sm font-medium text-page transition-colors hover:bg-ink/90"
          >
            Download résumé
            <span className="font-mono text-xs opacity-65">PDF</span>
          </a>
        </div>

        <div className="flex flex-col gap-6 border-t border-line p-7 pt-6 lg:px-9 lg:pb-12">
          <ContactList />
          <div className="border-t border-line pt-5 font-mono text-[11.5px] leading-relaxed text-muted">
            <div>{location}</div>
            <div>Updated Sep 2026</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
