import type { SkillGroup } from './types'

// VERBATIM from PRD §4 (order and wording preserved).
// Note: "Frontend" was intentionally removed per the PRD's own instruction.
export const skillGroups: SkillGroup[] = [
  { label: 'Languages', items: ['C++', 'Python', 'TypeScript/JavaScript', 'C'] },
  { label: 'AI / ML', items: ['LLM applications', 'RAG', 'agents', 'local models (Ollama)'] },
  { label: 'Backend', items: ['FastAPI', 'SQLite', 'Firebase'] },
]
