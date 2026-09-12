import type { SiteInfo } from './types'

// Identity + site chrome. Prose strings are VERBATIM from PRD §4 (§9: copy
// is locked, no paraphrasing). Labels/headings are UI chrome, not copy.
//
// Placement note: the PRD hero tagline is one sentence joined by an em dash
// — "Production & Industrial Engineering, IIT Delhi — building at the
// intersection of software, AI, and engineering." The Statement design
// splits that into an identity line + a statement headline, so both halves
// are used verbatim and nothing is rewritten (only the leading capital).
export const site: SiteInfo = {
  name: 'Rejul Mohan',
  identity: 'Production & Industrial Engineering, IIT Delhi',
  statement: 'Building at the intersection of software, AI, and engineering.',
  availability: 'Open to internships',
  focus:
    'Focused on practical AI: agents that finish real tasks, local models, and grounded, checkable output.',
  pitch:
    "Second-year engineering student focused on practical AI/ML — agents, local models, grounded outputs — with a production/industrial engineering foundation underneath. Previously interned on the AI/automation side at Latinem, Sobha Group's Global Capability Centre.",
  currently: 'agents · local models · grounded outputs',
  location: 'New Delhi · IST (UTC+5:30)',
  education: {
    degree: 'B.Tech, Production & Industrial Engineering',
    org: 'Indian Institute of Technology Delhi',
  },
  contact: {
    email: 'me2252036@mech.iitd.ac.in',
    github: 'https://github.com/r3jL',
    linkedin: 'https://www.linkedin.com/in/rejul-mohan/',
  },
}
