import { useEffect, useRef, useState } from 'react'
import { useWindows } from '../system/WindowManager.jsx'
import { useDesktop } from '../system/DesktopContext.jsx'
import Icon from './Icon.jsx'

const BASE = 52 // icon slot size in px
const RANGE = 115 // magnification falloff
const MAX = 1.6 // max magnification

const DOCK_APPS = [
  { id: 'finder', name: 'Finder' },
  { id: 'launchpad', name: 'Launchpad' },
  { id: 'safari', name: 'Safari' },
  { id: 'mail', name: 'Mail' },
  { id: 'photos', name: 'Photos' },
  { id: 'terminal', name: 'Terminal' },
  { id: 'textedit', name: 'TextEdit' },
]

export default function Dock() {
  const { windows, openWindow, restoreWindow, focusWindow, activeWindow } = useWindows()
  const { setOverlay, pushNotification } = useDesktop()
  const [mouseX, setMouseX] = useState(null)
  const [bouncing, setBouncing] = useState(null)
  const itemRefs = useRef({})
  const prevApps = useRef(new Set())

  // Bounce the icon of a freshly-opened app
  useEffect(() => {
    const nowApps = new Set(windows.map((w) => w.appId))
    for (const a of nowApps) {
      const w = windows.find((x) => x.appId === a)
      if (!prevApps.current.has(a) && w && Date.now() - w.born < 1500) {
        setBouncing(a)
        setTimeout(() => setBouncing(null), 780)
        break
      }
    }
    prevApps.current = nowApps
  }, [windows])

  const clickApp = (id) => {
    if (id === 'launchpad') return setOverlay('launchpad', true)
    const appWins = windows.filter((w) => w.appId === id)
    if (appWins.length === 0) {
      openWindow(id)
      setBouncing(id)
      setTimeout(() => setBouncing(null), 780)
      return
    }
    const minimized = appWins.filter((w) => w.minimized)
    if (minimized.length) return restoreWindow(minimized[minimized.length - 1].id)
    const top = appWins.reduce((a, b) => (a.z > b.z ? a : b))
    if (activeWindow?.id !== top.id) focusWindow(top.id)
  }

  const clickTrash = () => {
    pushNotification({
      app: 'Finder',
      icon: 'trash',
      title: 'Trash',
      body: 'Nothing here — this Mac is brand new. Unlike my experience.',
    })
  }

  // Magnification: each slot grows to match its icon, so neighbors get pushed
  // apart instead of the enlarged icon overlapping them — classic dock ripple.
  const size = (id) => {
    if (mouseX == null) return BASE
    const el = itemRefs.current[id]
    if (!el) return BASE
    const r = el.getBoundingClientRect()
    const center = r.left + r.width / 2
    const d = Math.abs(mouseX - center)
    const s = 1 + (MAX - 1) * Math.max(0, 1 - d / RANGE)
    return Math.round(BASE * s)
  }

  const renderItem = (id, name, iconName, onClick, running) => {
    const s = size(id)
    return (
      <div
        key={id}
        className={`dock-item${bouncing === id ? ' bouncing' : ''}`}
        ref={(el) => (itemRefs.current[id] = el)}
        style={{ width: s }}
      >
        <div className="dock-tip" style={{ bottom: s + 12 }}>{name}</div>
        <button
          className="dock-icon-btn"
          data-dock-app={id}
          style={{ width: s, height: s }}
          onClick={onClick}
          aria-label={name}
          data-cuelume-press="press"
        >
          <Icon name={iconName} size={52} />
        </button>
        {running && <div className="dock-dot" />}
      </div>
    )
  }

  return (
    <div className="dock-wrap">
      <div className="dock" onPointerMove={(e) => setMouseX(e.clientX)} onPointerLeave={() => setMouseX(null)}>
        {DOCK_APPS.map((app) =>
          renderItem(
            app.id,
            app.name,
            app.id,
            () => clickApp(app.id),
            app.id === 'finder' || windows.some((w) => w.appId === app.id)
          )
        )}
        <div className="dock-sep" />
        {renderItem('trash', 'Trash', 'trash', clickTrash, false)}
      </div>
    </div>
  )
}
