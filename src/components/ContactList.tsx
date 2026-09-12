import { site } from '../content'
import { GithubIcon, LinkedinIcon, MailIcon } from './icons'
import { safeTrack } from '../lib/analytics'

/**
 * Contact list inside the identity panel (PRD §7.6). External links open in a
 * new tab with rel="noopener noreferrer"; mailto carries the bare address.
 */
export function ContactList() {
  const { email, github, linkedin } = site.contact

  const items = [
    {
      kind: 'email',
      label: 'Email me',
      href: `mailto:${email}`,
      external: false,
      Icon: MailIcon,
    },
    {
      kind: 'github',
      label: 'GitHub',
      href: github,
      external: true,
      Icon: GithubIcon,
    },
    {
      kind: 'linkedin',
      label: 'LinkedIn',
      href: linkedin,
      external: true,
      Icon: LinkedinIcon,
    },
  ] as const

  return (
    <div className="flex flex-col overflow-hidden rounded-md border border-line bg-page">
      {items.map(({ kind, label, href, external, Icon }, i) => (
        <a
          key={kind}
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          onClick={() => safeTrack('contact_click', { kind })}
          className={`flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-ink transition-colors hover:bg-surface ${
            i < items.length - 1 ? 'border-b border-line' : ''
          }`}
        >
          <span>{label}</span>
          <Icon className="h-4 w-4 text-muted" aria-hidden="true" />
        </a>
      ))}
    </div>
  )
}
