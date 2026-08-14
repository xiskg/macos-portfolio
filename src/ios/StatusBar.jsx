import { useClock } from '../system/useClock.js'
import { useDesktop } from '../system/DesktopContext.jsx'
import Icon from '../components/Icon.jsx'

// ============================================================================
//  StatusBar — iOS top strip: clock left, cellular/Wi-Fi/battery right.
//  `light` = white text over the wallpaper (Lock Screen / Home); inside apps
//  it follows the current theme like a real iOS nav-bar area.
// ============================================================================

export default function StatusBar({ light = false, swipeHandlers }) {
  const now = useClock(10000)
  const { toggles } = useDesktop()
  const h = now.getHours() % 12 || 12
  const m = String(now.getMinutes()).padStart(2, '0')

  return (
    <div className={`ios-statusbar${light ? ' light' : ''}`} {...(swipeHandlers ?? {})}>
      <span className="ios-sb-time">
        {h}:{m}
      </span>
      <span className="ios-sb-icons">
        {toggles.dnd && <Icon name="moon" size={13} />}
        <CellSignal />
        {toggles.wifi && <Icon name="wifi" size={15} />}
        <Icon name="battery" size={22} />
      </span>
    </div>
  )
}

function CellSignal() {
  return (
    <svg viewBox="0 0 18 12" width="17" height="12" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={i * 4.4}
          y={8 - i * 2.6}
          width="3"
          height={3.4 + i * 2.6}
          rx="1"
          fill="currentColor"
        />
      ))}
    </svg>
  )
}
