import { useEffect, useState } from 'react'
import { DesktopProvider, useDesktop } from './system/DesktopContext.jsx'
import { WindowManagerProvider, useWindows } from './system/WindowManager.jsx'
import { APP_COMPONENTS } from './apps/index.js'
import MenuBar from './components/MenuBar.jsx'
import Desktop from './components/Desktop.jsx'
import Dock from './components/Dock.jsx'
import Window from './components/Window.jsx'
import Spotlight from './components/Spotlight.jsx'
import Launchpad from './components/Launchpad.jsx'
import ControlCenter from './components/ControlCenter.jsx'
import NotificationCenter from './components/NotificationCenter.jsx'

const OVERLAY_CHROME = new Set(['safari']) // apps that draw their own toolbar

// Public visits enter Designer directly, independent of storage and viewport.
export default function App() {
  const [sessionKey, setSessionKey] = useState(0)
  const resetDesktop = () => setSessionKey((key) => key + 1)

  return (
    <DesktopProvider>
      <WindowManagerProvider key={sessionKey}>
        <Shell onRestart={resetDesktop} onShutdown={resetDesktop} onLogout={resetDesktop} />
      </WindowManagerProvider>
    </DesktopProvider>
  )
}

function Shell({ onRestart, onShutdown, onLogout }) {
  const { windows, openWindow } = useWindows()
  const { brightness, setOverlay, overlays } = useDesktop()

  // Deep links: ?open=finder,terminal  &overlay=cc  &case=checksy  &project=nutripharme
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const caseId = params.get('case')
    const projectId = params.get('project')
    const open = params.get('open')
    if (open) {
      open.split(',').forEach((a) => {
        const id = a.trim()
        if (!APP_COMPONENTS[id]) return
        const props = {}
        if (id === 'safari' && caseId) props.url = `case:${caseId}`
        if (id === 'photos' && projectId) props.projectId = projectId
        openWindow(id, { props })
      })
    }
    const overlay = params.get('overlay')
    if (overlay && ['spotlight', 'launchpad', 'cc', 'nc'].includes(overlay)) {
      setOverlay(overlay, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ⌘Space / Ctrl+Space toggles Spotlight, system-wide
  useEffect(() => {
    const key = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault()
        setOverlay('spotlight', !overlays.spotlight)
      }
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [overlays.spotlight, setOverlay])

  return (
    <div className="desktop-root">
      <Desktop />
      {windows.map((w) => {
        const AppView = APP_COMPONENTS[w.appId]
        if (!AppView) return null
        return (
          <Window key={w.id} win={w} chrome={OVERLAY_CHROME.has(w.appId) ? 'overlay' : 'default'}>
            <AppView {...w.props} win={w} />
          </Window>
        )
      })}
      <MenuBar onRestart={onRestart} onShutdown={onShutdown} onLogout={onLogout} />
      <Dock />
      <Spotlight />
      <Launchpad />
      <ControlCenter />
      <NotificationCenter />
      {brightness < 1 && (
        <div className="brightness-overlay" style={{ opacity: (1 - brightness) * 0.9 }} />
      )}
    </div>
  )
}
