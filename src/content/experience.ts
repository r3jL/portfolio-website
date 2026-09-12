import type { ExperienceEntry } from './types'

// VERBATIM from PRD §4. The PRD renders the org as
// "Latinem (Sobha Group's Global Capability Centre)" across a bold span and
// a parenthetical; both fragments are reproduced exactly.
// No date range: the PRD supplies none, and the demo mockups' "May — Jul
// 2025 · 12 weeks" was invented — omitted rather than guessed.
export const experience: ExperienceEntry[] = [
  {
    type: 'Internship',
    org: 'Sobha',
    role: 'AI Intern',
    summary:
      'Built internal decision-support tools on the AI/automation side — human-in-the-loop by design, not full automation.',
    subProjects: [
      {
        name: 'Lex',
        ownership: 'built solo',
        description:
          'AI assistant for the finance team answering UAE VAT and Corporate Tax questions, cited to FTA law rather than free-answering. Two functions: answers tax questions with citations to source law, escalating to a human instead of guessing when unsure; reads vendor invoices in English and Arabic and computes VAT treatment in code.',
        impact: 'Now the retrieval backend behind two internal tools, always citing source law.',
        techStack: ['FastAPI', 'RAG', 'citation grounding', 'Next.js', 'Neon Postgres', 'OpenRouter'],
      },
      {
        name: 'Workforce Attrition Model',
        ownership: 'built solo',
        description:
          'Predicts resignation risk across Sobha\'s construction workforce — roughly 55,000 people — for HR. Produces a ranked watchlist of workers most likely to leave, generates a 6-month leaver forecast, flags mass-exit early warnings, and has a near-solved model for visa non-renewal specifically.',
        impact: 'Turns workforce signals into a ranked watchlist HR can act on proactively.',
        techStack: ['Python ML', 'React', 'PIN login', 'monthly retraining'],
      },
      {
        name: 'Sobha Prism',
        ownership: 'partnered',
        description:
          'Fully-local tool that turns a Design Brief into a scored, editable 3D concept, pushed toward BIM/Revit workflows. Sits as the concept stage-gate node in Sobha\'s internal PLM system. Form-first input, generates 3D concept, scores match to brief intent, output is editable and feeds into downstream BIM workflows.',
        impact: 'Became the concept stage-gate in Sobha\'s PLM pipeline, replacing manual brief-to-3D translation.',
        techStack: ['Vanilla JS', 'React 18', 'three.js', 'ECharts', 'FastAPI', 'IfcOpenShell', 'pyRevit'],
      },
    ],
  },
]
