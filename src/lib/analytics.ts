import { track } from '@vercel/analytics'

/**
 * Fire a Vercel Analytics custom event without ever throwing.
 * Safe before `inject()` has finished loading the script (PLAN E7.1)
 * and in local dev where the endpoint does not exist.
 * Event names/props must stay PII-free (PLAN E7.3).
 */
export function safeTrack(
  event: string,
  data?: Record<string, string | number | boolean>,
): void {
  try {
    track(event, data)
  } catch {
    // analytics is best-effort; never break the UI for it
  }
}
