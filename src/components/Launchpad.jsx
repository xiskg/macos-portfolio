import { useEffect, useState } from 'react'
import { useWindows } from '../system/WindowManager.jsx'
import { useDesktop } from '../system/DesktopContext.jsx'
import Icon from './Icon.jsx'

const APPS = [
  { appId: 'finder', name: 'Finder', icon: 'finder' },
  { appId: 'safari', name: 'Safari', icon: 'safari' },
  { appId: 'mail', name: 'Mail', icon: 'mail' },
  { appId: 'photos', name: 'Photos', icon: 'photos' },
  { appId: 'terminal', name: 'Terminal', icon: 'terminal' },
  { appId: 'textedit', name: 'TextEdit', icon: 'textedit' },
  { appId: 'about', name: 'About This Mac', icon: 'spotlightApp' },
]

export default function Launchpad() {
  const { overlays, setOverlay } = useDesktop()
  const { openWindow } = useWindows()
  const [q, setQ] = useState('')

  useEffect(() => {
    if (overlays.launchpad) setQ('')
  }, [overlays.launchpad])

  useEffect(() => {
    const key = (e) => e.key === 'Escape' && setOverlay('launchpad', false)
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [setOverlay])

  if (!overlays.launchpad) return null

  const close = () => setOverlay('launchpad', false)
  const apps = APPS.filter((a) => a.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="launchpad" onPointerDown={(e) => e.target === e.currentTarget && close()}>
      <div className="lp-search">
        <Icon name="search" size={13} />
        <input autoFocus placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="lp-grid">
        {apps.map((a) => (
          <button
            key={a.appId}
            className="lp-item"
            onClick={() => {
              close()
              openWindow(a.appId)
            }}
          >
            <Icon name={a.icon} size={66} />
            <span>{a.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
