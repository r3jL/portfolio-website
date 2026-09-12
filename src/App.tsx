import { useCallback, useEffect, useState } from 'react'
import { IdentityPanel } from './components/IdentityPanel'
import { TabNav } from './components/TabNav'
import { WorkPane } from './components/WorkPane'
import { ExperiencePane } from './components/ExperiencePane'
import { AboutPane } from './components/AboutPane'
import { safeTrack } from './lib/analytics'

type TabId = 'projects' | 'experience' | 'about'

// Deep-linkable tabs: the URL hash (#projects/#experience/#about) selects
// the pane, so a link to a specific section works and back/forward navigates.
const TABS: { id: TabId; label: string; count?: string }[] = [
  { id: 'projects', label: 'Projects', count: '03' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
]

function tabFromHash(): TabId {
  // SSR/prerender has no window — default to the first tab. On the client
  // the hash selects the deep-linked pane.
  if (typeof window === 'undefined') return 'projects'
  const h = window.location.hash.replace('#', '')
  return TABS.some((t) => t.id === h) ? (h as TabId) : 'projects'
}

export default function App() {
  const [tab, setTab] = useState<TabId>(tabFromHash)

  const selectTab = useCallback((next: string) => {
    const id = next as TabId
    setTab((prev) => {
      if (prev === id) return prev
      history.replaceState(null, '', `#${id}`)
      safeTrack('tab_view', { tab: id })
      // Scroll to top on tab switch — prevents the sticky sidebar from
      // shifting when the new pane is shorter than the previous one.
      window.scrollTo(0, 0)
      return id
    })
  }, [])

  // Keep state in sync with back/forward navigation on the hash.
  useEffect(() => {
    const onHash = () => {
      const t = tabFromHash()
      setTab((prev) => (prev === t ? prev : t))
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:border focus:border-ink/50 focus:bg-page focus:px-4 focus:py-2 focus:font-medium focus:text-ink"
      >
        Skip to content
      </a>

      <div className="min-h-screen border-line lg:flex lg:border">
        <IdentityPanel />

        <main
          id="main"
          tabIndex={-1}
          className="flex min-w-0 flex-1 flex-col border-line focus:outline-none lg:border-l"
        >
          <TabNav tabs={TABS} active={tab} onSelect={selectTab} />

          {/* All panes are rendered (SEO + prerender); inactive ones are
              hidden via the `hidden` attribute, not removed from the DOM. */}
          <div
            role="tabpanel"
            id="panel-projects"
            aria-labelledby="tab-projects"
            hidden={tab !== 'projects'}
            className="tabpanel"
          >
            <WorkPane />
          </div>
          <div
            role="tabpanel"
            id="panel-experience"
            aria-labelledby="tab-experience"
            hidden={tab !== 'experience'}
            className="tabpanel"
          >
            <ExperiencePane />
          </div>
          <div
            role="tabpanel"
            id="panel-about"
            aria-labelledby="tab-about"
            hidden={tab !== 'about'}
            className="tabpanel"
          >
            <AboutPane />
          </div>
        </main>
      </div>

      <footer className="border-t border-line">
        <div className="mx-auto flex flex-wrap items-center justify-between gap-3 px-6 py-7 font-mono text-xs text-muted sm:px-9">
          <span>© {new Date().getFullYear()} Rejul Mohan</span>
          <span>IIT Delhi · built with React + Vite + Tailwind</span>
        </div>
      </footer>
    </>
  )
}
