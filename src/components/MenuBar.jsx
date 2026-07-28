import { useEffect, useRef, useState } from 'react'
import { useWindows } from '../system/WindowManager.jsx'
import { useDesktop } from '../system/DesktopContext.jsx'
import { useClock, menuBarDate } from '../system/useClock.js'
import { profile } from '../content/portfolio.js'
import Icon from './Icon.jsx'

const APP_NAMES = {
  finder: 'Finder',
  textedit: 'TextEdit',
  safari: 'Safari',
  mail: 'Mail',
  'mail-compose': 'Mail',
  photos: 'Photos',
  terminal: 'Terminal',
  about: 'Finder',
}

export default function MenuBar({ onRestart, onShutdown }) {
  const { activeAppId, activeWindow, openWindow, closeWindow, closeAppWindows, minimizeWindow, toggleMaximize } =
    useWindows()
  const { toggles, toggle, toggleDark, cycleWallpaper, setOverlay, overlays, dark, pushNotification } = useDesktop()
  const now = useClock()
  const [open, setOpen] = useState(null) // { id, x }
  const [battery, setBattery] = useState(100)
  const barRef = useRef(null)

  useEffect(() => {
    let batt = null
    const update = () => batt && setBattery(Math.round(batt.level * 100))
    navigator.getBattery?.().then((b) => {
      batt = b
      update()
      b.addEventListener('levelchange', update)
    }).catch(() => {})
    return () => batt?.removeEventListener('levelchange', update)
  }, [])

  useEffect(() => {
    if (!open) return
    const down = (e) => {
      if (!e.target.closest('.mb-menu') && !e.target.closest('.mb-item')) setOpen(null)
    }
    const key = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('pointerdown', down)
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('keydown', key)
    }
  }, [open])

  const appName = APP_NAMES[activeAppId] ?? 'Finder'
  const activeAppWinId = activeWindow?.id

  const menus = {
    apple: [
      { label: 'About This Mac', action: () => openWindow('about') },
      'sep',
      { label: 'System Settings…', disabled: true },
      { label: 'App Store…', disabled: true },
      'sep',
      { label: 'Recent Items', disabled: true },
      'sep',
      { label: 'Force Quit…', shortcut: '⌥⌘⎋', disabled: true },
      'sep',
      { label: 'Sleep', action: onShutdown },
      { label: 'Restart…', action: onRestart },
      { label: 'Shut Down…', action: onShutdown },
      'sep',
      { label: `Log Out ${profile.name}…`, shortcut: '⇧⌘Q', disabled: true },
    ],
    app: [
      { label: `About ${appName}`, action: () => openWindow('about') },
      'sep',
      { label: 'Settings…', shortcut: '⌘,', disabled: true },
      'sep',
      { label: `Quit ${appName}`, shortcut: '⌘Q', action: () => closeAppWindows(activeAppId) },
    ],
    file: [
      { label: 'New Finder Window', shortcut: '⌘N', action: () => openWindow('finder', { multi: true }) },
      { label: 'New Folder', shortcut: '⇧⌘N', disabled: true },
      'sep',
      { label: 'Get Info', shortcut: '⌘I', disabled: true },
      'sep',
      {
        label: 'Close Window',
        shortcut: '⌘W',
        disabled: !activeAppWinId,
        action: () => activeAppWinId && closeWindow(activeAppWinId),
      },
    ],
    edit: [
      { label: 'Undo', shortcut: '⌘Z', disabled: true },
      { label: 'Redo', shortcut: '⇧⌘Z', disabled: true },
      'sep',
      { label: 'Cut', shortcut: '⌘X', disabled: true },
      { label: 'Copy', shortcut: '⌘C', disabled: true },
      { label: 'Paste', shortcut: '⌘V', disabled: true },
      { label: 'Select All', shortcut: '⌘A', disabled: true },
    ],
    view: [
      { label: dark ? 'Turn Dark Mode Off' : 'Turn Dark Mode On', action: toggleDark },
      { label: 'Change Wallpaper…', action: cycleWallpaper },
      'sep',
      { label: 'Show Toolbar', disabled: true },
      { label: 'Enter Full Screen', shortcut: 'fn F', disabled: true },
    ],
    window: [
      {
        label: 'Minimize',
        shortcut: '⌘M',
        disabled: !activeAppWinId,
        action: () => activeAppWinId && minimizeWindow(activeAppWinId),
      },
      {
        label: 'Zoom',
        disabled: !activeAppWinId,
        action: () => activeAppWinId && toggleMaximize(activeAppWinId),
      },
      'sep',
      { label: 'Bring All to Front', disabled: true },
    ],
    help: [
      { label: 'macOS Help', disabled: true },
      'sep',
      {
        label: 'About This Portfolio',
        action: () =>
          pushNotification({
            app: 'Finder',
            icon: 'finder',
            title: 'About this portfolio',
            body: 'A macOS Tahoe clone built with React + Vite. Open Terminal and type `neofetch`.',
          }),
      },
    ],
  }

  const leftMenus = [
    { id: 'apple', node: <Icon name="apple" size={15} />, cls: 'mb-apple' },
    { id: 'app', node: appName, cls: 'bold' },
    { id: 'file', node: 'File' },
    { id: 'edit', node: 'Edit' },
    { id: 'view', node: 'View' },
    { id: 'window', node: 'Window' },
    { id: 'help', node: 'Help' },
  ]

  const clickMenu = (id) => (e) => {
    if (open?.id === id) return setOpen(null)
    const r = e.currentTarget.getBoundingClientRect()
    setOpen({ id, x: Math.max(4, r.left - (id === 'apple' ? 2 : 6)) })
  }

  const hoverMenu = (id) => (e) => {
    if (open && open.id !== id) {
      const r = e.currentTarget.getBoundingClientRect()
      setOpen({ id, x: Math.max(4, r.left - 6) })
    }
  }

  return (
    <div className="menubar" ref={barRef}>
      <div className="menubar-left">
        {leftMenus.map((m) => (
          <div
            key={m.id}
            className={`mb-item ${m.cls ?? ''}${open?.id === m.id ? ' open' : ''}`}
            onPointerDown={clickMenu(m.id)}
            onPointerEnter={hoverMenu(m.id)}
          >
            {m.node}
          </div>
        ))}
      </div>
      <div className="menubar-right">
        <div className="mb-status" title={`Battery: ${battery}%`}>
          <span className="mb-battery-label">{battery}%</span>
          <Icon name="battery" size={23} />
        </div>
        <div
          className="mb-status"
          title={toggles.wifi ? 'Wi-Fi: connected' : 'Wi-Fi: off'}
          onClick={() => toggle('wifi')}
        >
          <Icon name="wifi" size={17} style={toggles.wifi ? undefined : { opacity: 0.45 }} />
        </div>
        <div className="mb-status" title="Spotlight (⌘Space)" onClick={() => setOverlay('spotlight', true)}>
          <Icon name="search" size={15} />
        </div>
        <div
          className={`mb-status${overlays.cc ? ' open' : ''}`}
          title="Control Center"
          onClick={() => setOverlay('cc', true)}
        >
          <Icon name="cc" size={16} />
        </div>
        <div
          className="mb-status mb-clock"
          title="Notification Center"
          onClick={() => setOverlay('nc', true)}
        >
          {menuBarDate(now)}
        </div>
      </div>
      {open && (
        <div className="mb-menu" style={{ left: open.x }}>
          {menus[open.id].map((it, i) =>
            it === 'sep' ? (
              <div key={i} className="sep" />
            ) : (
              <div
                key={i}
                className={`mi${it.disabled ? ' disabled' : ''}`}
                onClick={() => {
                  if (it.disabled) return
                  setOpen(null)
                  it.action?.()
                }}
              >
                <span>{it.label}</span>
                {it.shortcut && <span className="shortcut">{it.shortcut}</span>}
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
