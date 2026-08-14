import { useState } from 'react'
import { useDesktop } from '../system/DesktopContext.jsx'
import { AppSwitcherProvider, useApps } from '../system/ios/AppSwitcher.jsx'
import BootScreen from '../components/BootScreen.jsx'
import StatusBar from './StatusBar.jsx'
import HomeScreen from './HomeScreen.jsx'
import AppScreen from './AppScreen.jsx'
import LockScreen from './LockScreen.jsx'
import { IOS_APP_COMPONENTS } from './apps/index.jsx'

// ============================================================================
//  IOSShell — the whole phone: boot → lock → home + apps.
//  Rendered by App.jsx instead of the desktop shell under 760px.
// ============================================================================

export default function IOSShell() {
  const [phase, setPhase] = useState('boot') // 'boot' | 'lock' | 'home'
  const { wallpaper, brightness } = useDesktop()

  return (
    <AppSwitcherProvider>
      <div className="ios-root">
        <div className={`wallpaper wp-${wallpaper}`} />
        <ShellBody phase={phase} setPhase={setPhase} />
        {brightness < 1 && (
          <div className="brightness-overlay" style={{ opacity: (1 - brightness) * 0.9 }} />
        )}
      </div>
    </AppSwitcherProvider>
  )
}

function ShellBody({ phase, setPhase }) {
  const { openApps, activeApp } = useApps()

  // White status bar over the wallpaper; themed inside apps.
  const light = phase !== 'home' || !activeApp

  return (
    <>
      {phase === 'home' && (
        <>
          <HomeScreen />
          {openApps.map((app) => {
            const AppView = IOS_APP_COMPONENTS[app.id]
            if (!AppView) return null
            return (
              <AppScreen key={app.id} app={app}>
                <AppView {...app.props} />
              </AppScreen>
            )
          })}
        </>
      )}
      <StatusBar light={light} />
      {phase === 'lock' && <LockScreen onUnlock={() => setPhase('home')} />}
      {phase === 'boot' && <BootScreen onDone={() => setPhase('lock')} />}
    </>
  )
}
