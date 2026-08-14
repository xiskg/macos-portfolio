import { useEffect, useState } from 'react'
import { useDesktop } from '../system/DesktopContext.jsx'
import { useClock, longDate } from '../system/useClock.js'
import { useSwipe } from '../system/ios/useSwipe.js'
import Icon from '../components/Icon.jsx'

// ============================================================================
//  LockScreen — big clock, date, notifications, swipe up to unlock.
// ============================================================================

export default function LockScreen({ onUnlock }) {
  const now = useClock(1000)
  const { notifications } = useDesktop()
  const [leaving, setLeaving] = useState(false)

  const unlock = () => setLeaving(true)

  useEffect(() => {
    if (!leaving) return undefined
    const t = setTimeout(onUnlock, 420)
    return () => clearTimeout(t)
  }, [leaving, onUnlock])

  const swipe = useSwipe({ onSwipeUp: unlock })

  const h = now.getHours() % 12 || 12
  const m = String(now.getMinutes()).padStart(2, '0')

  return (
    <div className={`ios-lock${leaving ? ' leaving' : ''}`} {...swipe} onClick={unlock}>
      <div className="ios-lock-date">{longDate(now)}</div>
      <div className="ios-lock-clock">
        {h}:{m}
      </div>

      <div className="ios-lock-notifs">
        {notifications.slice(0, 3).map((n) => (
          <div key={n.id} className="ios-notif">
            <div className="ios-notif-icon">
              <Icon name={n.icon ?? 'finder'} size={22} />
            </div>
            <div className="ios-notif-body">
              <div className="ios-notif-top">
                <span className="ios-notif-title">{n.title}</span>
                <span className="ios-notif-time">{n.time}</span>
              </div>
              <div className="ios-notif-text">{n.body}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="ios-lock-hint">Swipe up to open</div>
      <div className="ios-home-indicator static">
        <span />
      </div>
    </div>
  )
}
