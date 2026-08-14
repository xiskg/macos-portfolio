import { useEffect, useState } from 'react'
import { useApps } from '../system/ios/AppSwitcher.jsx'

// ============================================================================
//  AppScreen — full-screen container for an open iOS app.
//  Zooms in from the tapped icon and zooms back out when going Home.
//  The app stays mounted while in the background (state survives).
// ============================================================================

export default function AppScreen({ app, children }) {
  const { activeId, closeApp } = useApps()
  const isActive = activeId === app.id
  // 'open' (visible) -> 'closing' (playing zoom-out) -> 'hidden' (kept mounted,
  // display:none) so the app's own state survives trips to the Home Screen.
  const [phase, setPhase] = useState(isActive ? 'open' : 'hidden')

  useEffect(() => {
    if (isActive) {
      setPhase('open')
      return undefined
    }
    setPhase('closing')
    const t = setTimeout(() => setPhase('hidden'), 340)
    return () => clearTimeout(t)
  }, [isActive])

  const homeSwipe = useSwipe({ onSwipeUp: closeApp }, { threshold: 36 })

  const origin = app.origin
  const style = {}
  if (origin) {
    const cx = origin.left + origin.width / 2
    const cy = origin.top + origin.height / 2
    style.transformOrigin = `${(cx / window.innerWidth) * 100}% ${(cy / window.innerHeight) * 100}%`
  }

  return (
    <div className={`ios-app-screen ${phase}`} style={style}>
      <div className="ios-app-body">{children}</div>
      <button
        className="ios-floating-home"
        onClick={closeApp}
        aria-label="Go Back Home"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path stroke="currentColor" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M14.5 5.5 L8 12 L14.5 18.5" />
        </svg>
        Home
      </button>
    </div>
  )
}
