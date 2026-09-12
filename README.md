# portfolio-website

Personal portfolio for **Rejul Mohan** — a Production & Industrial
Engineering student at IIT Delhi building practical AI/ML (agents, RAG, and
local models). A single-page, tabbed site with an editorial light theme,
server-side prerendered for fast first paint and clean SEO.

**Live:** _(set at deploy time)_

## Highlights

- **Editorial, content-first design** — near-white paper background, warm
  ink, hairline borders, and one restrained blue accent. Type is IBM Plex
  Sans / Mono.
- **Sticky identity panel + deep-linkable tabs** — `#projects`,
  `#experience`, and `#about` select a pane, so any section is directly
  linkable and back/forward navigation works.
- **Accessible by construction** — a WAI-ARIA tablist (roving tabindex,
  arrow-key navigation), a skip link, visible focus rings, and panes that
  stay in the DOM (hidden, not unmounted) so content is present without JS.
- **Prerendered** — the client bundle is built, then the app is rendered to
  static HTML with critical CSS inlined and fonts preloaded, so the page is
  readable before hydration.
- **No fabricated claims** — all copy, links, and tech labels come from a
  single content source (`src/content/`); labels are derived only from words
  already in each description — no invented metrics or star counts.

## Tech stack

| Area       | Choice                                   |
| ---------- | ---------------------------------------- |
| Framework  | React 19                                 |
| Build tool | Vite 8                                   |
| Styling    | Tailwind CSS 4 (`@theme` tokens)         |
| Language   | TypeScript                               |
| Fonts      | IBM Plex Sans / Mono (`@fontsource`)     |
| Prerender  | Vite SSR build + a static render script  |
| Analytics  | Vercel Analytics (loaded lazily)         |
| Lint       | oxlint                                   |

## Getting started

```bash
npm install      # install dependencies (Node >= 20)
npm run dev      # start the Vite dev server
```

Then open the URL Vite prints (default http://localhost:5173).

## Scripts

| Command                | What it does                                              |
| ---------------------- | -------------------------------------------------------- |
| `npm run dev`          | Vite dev server with HMR                                  |
| `npm run build`        | Type-check, client build, SSR build, then prerender HTML  |
| `npm run preview`      | Serve the production build locally                       |
| `npm run lint`         | Lint `src` with oxlint                                    |
| `npm run check:links`  | Validate every external URL + the mailto in `content/`   |
| `npm run check:bundle` | Guard against bundle-size regressions                    |

## Project structure

```
src/
  App.tsx                # tab state, hash routing, page shell
  index.css              # Tailwind import + theme tokens
  content/               # single source of truth for all copy + data
    site.ts              #   identity, statement, contact, education
    projects.ts          #   the three project cards
    experience.ts        #   internship + sub-projects
    skills.ts            #   skill groups
    types.ts             #   shared content types
  components/
    IdentityPanel.tsx    # sticky left rail: name, statement, résumé, contact
    TabNav.tsx           # accessible tablist
    WorkPane.tsx         # Projects tab
    ProjectCard.tsx      # a single project card
    ExperiencePane.tsx   # Experience tab (timeline of sub-projects)
    AboutPane.tsx        # About tab: pitch, at-a-glance, skills, education
    ContactList.tsx      # email / GitHub / LinkedIn
    OwnershipTag.tsx     # "solo" / "partnered" chip
    icons.tsx            # inline SVG icons
  lib/analytics.ts       # safe analytics wrapper
scripts/                 # prerender, link check, bundle check, lighthouse
public/                  # favicon, résumé, robots.txt, llms.txt
```

## Editing content

All visible text lives in `src/content/`. To update a project, experience
entry, skill, or contact link, edit the relevant file there — the components
render whatever the content exports, so no component changes are needed for
copy updates.

---

Built with React + Vite + Tailwind.
