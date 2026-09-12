// Shared content types (PLAN §3).
// Every string that reaches the UI is plain text and is rendered as text,
// never as HTML (PLAN E3.3 — no dangerouslySetInnerHTML anywhere).

/** Ownership signal required by PRD §3/§7.3. Union type rejects any other
 *  value at compile time (PLAN E3.1) — no runtime validation needed. */
export type Ownership = 'built solo' | 'partnered'

export interface Project {
  /** Zero-padded display index, e.g. "01". */
  index: string
  /** Short uppercase category label shown above the title. */
  category: string
  /** Repo-style slug used in the typographic figure. */
  slug: string
  title: string
  ownership: Ownership
  description: string
  /** Impact or outcome line (qualitative is fine). */
  impact?: string
  /** Tech/behaviour labels — derived only from words already in the PRD
   *  description. Never invent metrics or stack items. */
  pills: string[]
  /** null => no link element is rendered at all (PLAN T4.1). */
  github: string | null
}

export interface ExperienceSub {
  name: string
  ownership: Ownership
  description: string
  /** Impact or outcome line (qualitative is fine). */
  impact?: string
  /** Tech stack used. */
  techStack?: string[]
}

export interface ExperienceEntry {
  type: string
  org: string
  role: string
  summary: string
  subProjects: ExperienceSub[]
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface SiteInfo {
  name: string
  /** "Production & Industrial Engineering, IIT Delhi" — verbatim PRD §4. */
  identity: string
  /** Hero statement — verbatim fragment of the PRD §4 hero tagline. */
  statement: string
  /** Short focus line under the statement (demo copy, no PRD conflict). */
  focus: string
  availability: string
  /** Verbatim PRD §4 About paragraph. */
  pitch: string
  /** "currently:" footer line — verbatim fragment of the PRD §4 About. */
  currently: string
  location: string
  education: { degree: string; org: string }
  contact: { email: string; github: string; linkedin: string }
}
