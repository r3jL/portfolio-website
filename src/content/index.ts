// Content barrel — components import from '@/content' style path
// '../content' and never reach into individual files.
export { site } from './site'
export { projects } from './projects'
export { experience } from './experience'
export { skillGroups } from './skills'
export type {
  Ownership,
  Project,
  ExperienceSub,
  ExperienceEntry,
  SkillGroup,
  SiteInfo,
} from './types'
