import { useEffect, useState } from 'react'
import { DesktopProvider, useDesktop } from './system/DesktopContext.jsx'
import { WindowManagerProvider, useWindows } from './system/WindowManager.jsx'
import { setFSPersona } from './content/fileSystem.js'
import { APP_COMPONENTS } from './apps/index.js'
import BootScreen from './components/BootScreen.jsx'
import LoginScreen from './components/LoginScreen.jsx'
import MenuBar from './components/MenuBar.jsx'
import Desktop from './components/Desktop.jsx'
import Dock from './components/Dock.jsx'
import Window from './components/Window.jsx'
import Spotlight from './components/Spotlight.jsx'
import Launchpad from './components/Launchpad.jsx'
import ControlCenter from './components/ControlCenter.jsx'
import NotificationCenter from './components/NotificationCenter.jsx'
import Icon from './components/Icon.jsx'
import MobileNotice from './components/MobileNotice.jsx'

const OVERLAY_CHROME = new Set(['safari']) // apps that draw their own toolbar

function useIsMobile() {
  const [narrow, setNarrow] = useState(() => window.innerWidth < 760)

  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 760)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return narrow
}

export default function App() {
  const isMobile = useIsMobile()
  const [phase, setPhase] = useState('off') // 'boot' | 'login' | 'on' | 'off'
  const [bootKey, setBootKey] = useState(0)
  const [fsKey, setFsKey] = useState(0)

  if (isMobile) {
    return <MobileNotice />
  }

  const restart = () => {
    setBootKey((k) => k + 1)
    setPhase('boot')
  }
  const shutdown = () => setPhase('off')
  const logout = () => {
    setBootKey((k) => k + 1)
    setPhase('login')
  }

  return (
    <DesktopProvider>
      {phase === 'off' ? (
        <PowerOffScreen onPowerOn={() => {
          setBootKey((k) => k + 1)
          setPhase('boot')
        }} />
      ) : (
        <WindowManagerProvider key={bootKey}>
          <Shell onRestart={restart} onShutdown={shutdown} onLogout={logout} />
          {(phase === 'boot' || phase === 'login') && (
            <LoginScreen onSleep={shutdown} onPersonaSelected={(persona) => {
               setFSPersona(persona)
               setFsKey((k) => k + 1)
            }} onLogin={() => {
               setPhase('on')
            }} />
          )}
          {phase === 'boot' && <BootScreen onDone={() => setPhase('login')} />}
        </WindowManagerProvider>
      )}
    </DesktopProvider>
  )
}

function PowerOffScreen({ onPowerOn }) {
  const { wallpaper } = useDesktop()

  return (
    <div className="poweroff" style={{ backgroundImage: `url('/wallpapers/custom.jpg')` }}>
      <div className="poweroff-blur" />
      <div className="poweroff-content">
        <h1>João de Almeida</h1>
        <p>Brand Design & Creative Development</p>
        
        <button onClick={onPowerOn} className="poweroff-btn">
          <Icon name="apple" size={32} />
          <span>Click to power on</span>
        </button>
      </div>
    </div>
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
