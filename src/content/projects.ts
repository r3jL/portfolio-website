import type { Project } from './types'

// Titles, descriptions and GitHub URLs are VERBATIM from PRD §4.
// `pills` are labels lifted from words already inside each PRD description —
// no invented stack items, no metrics, no star counts (the demo mockups
// contained fabricated numbers; those were deliberately dropped).
// `index`/`category`/`slug` are presentational, not claims.
export const projects: Project[] = [
  {
    index: '01',
    category: 'AI PLATFORM',
    slug: 'agentic-onboarding-engine',
    title: 'Agentic Onboarding Engine',
    ownership: 'built solo',
    description:
      'Adaptive employee onboarding platform: parses a resume and job description, analyzes the skill gap, generates a personalized MCQ assessment weighted by gap severity, and builds a week-by-week learning pathway. Runs fully offline on a local Qwen2.5 model via Ollama. FastAPI + SQLite, Firebase auth, Dockerized.',
    impact: 'Replaces generic checklists with role-specific ramp plans cited to internal docs.',
    image: '/images/agentic-onboarding.svg',
    pills: ['Qwen2.5', 'Ollama', 'FastAPI', 'SQLite', 'Firebase', 'Docker'],
    github: 'https://github.com/r3jL/Agentic-Onboarding-Engine',
  },
  {
    index: '02',
    category: 'AGENTS',
    slug: 'data-pipeline-orchestration-agent',
    title: 'Data Pipeline Orchestration Agent',
    ownership: 'built solo',
    description:
      'Agent that turns a single natural-language instruction into a 5-step data pipeline (fetch → transform → chart → report → email). Detects failures by error code, replans automatically (retry, re-aggregate, or escalate to a human) instead of failing silently, and produces a full audit log of every attempt.',
    impact: 'Turns silent pipeline failures into recoverable workflows with a full audit trail.',
    image: '/images/data-pipeline.svg',
    pills: ['5-step pipeline', 'Failure replanning', 'Audit log'],
    github: 'https://github.com/r3jL/Data_Pipeline_Orchestration_Agent',
  },
  {
    index: '03',
    category: 'FULL STACK',
    slug: 'yourresource',
    title: 'YourResource',
    ownership: 'built solo',
    description:
      "Reddit-style platform for finding learning resources: post what you're looking for, the system classifies it into tags and surfaces existing matching resources first — you only submit a new one if nothing fits, cutting duplicate posts. Categorized by type and language, with upvote/downvote ranking.",
    impact: 'Cuts duplicate resource submissions by surfacing existing matches before asking for new ones.',
    image: '/images/yourresource.svg',
    pills: ['Tag classification', 'Duplicate prevention', 'Vote ranking'],
    github: 'https://github.com/r3jL/YourResource',
  },
]
