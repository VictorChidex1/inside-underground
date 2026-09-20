import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Restores scroll position on navigation.
 *
 * - On a pathname change (navigating to a new page): scroll to the top
 *   instantly, so the user lands at the top of the new page rather than
 *   inheriting the previous scroll position or a mid-page section.
 * - On a hash-only change (in-page anchor like `/#how-it-works`): smooth
 *   scroll to the targeted element, preserving section navigation within
 *   the same page.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''))
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}