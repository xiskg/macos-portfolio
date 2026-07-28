import { useEffect } from 'react'
import { useDesktop } from '../system/DesktopContext.jsx'
import { useClock, longDate } from '../system/useClock.js'
import Icon from './Icon.jsx'

export default function NotificationCenter() {
  const { overlays, setOverlay, notifications, clearNotifications } = useDesktop()
  const now = useClock(30000)

  useEffect(() => {
    if (!overlays.nc) return
    const down = (e) => {
      if (!e.target.closest('.nc') && !e.target.closest('.mb-clock')) setOverlay('nc', false)
    }
    const key = (e) => e.key === 'Escape' && setOverlay('nc', false)
    window.addEventListener('pointerdown', down)
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('keydown', key)
    }
  }, [overlays.nc, setOverlay])

  return (
    <div className={`nc${overlays.nc ? '' : ' hidden'}`}>
      <div className="nc-head">
        <div className="nc-date">{longDate(now)}</div>
        {notifications.length > 0 && <button onClick={clearNotifications}>Clear All</button>}
      </div>
      {notifications.length === 0 ? (
        <div className="nc-empty">No New Notifications</div>
      ) : (
        notifications.map((n) => (
          <div key={n.id} className="nc-card">
            <div className="nc-icon">
              <Icon name={n.icon ?? 'finder'} size={34} />
            </div>
            <div className="nc-body">
              <div className="nc-top">
                <span className="nc-title">{n.title}</span>
                <span className="nc-time">{n.time}</span>
              </div>
              <div className="nc-text">{n.body}</div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
