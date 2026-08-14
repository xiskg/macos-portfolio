import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { notificationsSeed } from '../content/portfolio.js'

const Ctx = createContext(null)
export const useDesktop = () => useContext(Ctx)

export const WALLPAPERS = [
  'My Mac',
  'Olympus Trip 35 - 35390002',
  'Olympus Trip 35 - 35390011',
  'Olympus Trip 35 - 35390015',
  'Olympus Trip 35 - 35390019',
]

const load = (k, fallback) => {
  try {
    const v = localStorage.getItem(`macos-portfolio:${k}`)
    return v === null ? fallback : JSON.parse(v)
  } catch {
    return fallback
  }
}

// Allow ?dark=1 / ?wallpaper=2 deep-link overrides
const urlParam = (k) => new URLSearchParams(window.location.search).get(k)
const save = (k, v) => {
  try {
    localStorage.setItem(`macos-portfolio:${k}`, JSON.stringify(v))
  } catch {
    /* private mode — ignore */
  }
}

export function DesktopProvider({ children }) {
  const [wallpaper, setWallpaperState] = useState(() => {
    const p = urlParam('wallpaper')
    return p !== null && !Number.isNaN(+p) ? +p % WALLPAPERS.length : load('wallpaper', 0)
  })
  const [dark, setDark] = useState(() => urlParam('dark') === '1' || load('dark', false))
  const [brightness, setBrightness] = useState(1)
  const [volume, setVolume] = useState(0.6)
  const [toggles, setToggles] = useState({ wifi: true, bluetooth: true, airdrop: false, dnd: false })
  const [iconPositions, setIconPositions] = useState(() => load('iconPositions', {}))
  const [overlays, setOverlays] = useState({ spotlight: false, launchpad: false, cc: false, nc: false })
  const [notifications, setNotifications] = useState([])
  const seeded = useRef(false)

  useEffect(() => {
    if (!seeded.current) {
      seeded.current = true
      setNotifications(notificationsSeed.map((n, i) => ({ ...n, id: `seed-${i}` })))
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    save('dark', dark)
  }, [dark])

  const setWallpaper = useCallback((i) => {
    setWallpaperState(i)
    save('wallpaper', i)
  }, [])

  const cycleWallpaper = useCallback(() => {
    setWallpaperState((w) => {
      const next = (w + 1) % WALLPAPERS.length
      save('wallpaper', next)
      return next
    })
  }, [])

  const toggleDark = useCallback(() => setDark((d) => !d), [])
  const toggle = useCallback((name) => setToggles((t) => ({ ...t, [name]: !t[name] })), [])

  const setIconPosition = useCallback((name, pos) => {
    setIconPositions((p) => {
      const next = { ...p, [name]: pos }
      save('iconPositions', next)
      return next
    })
  }, [])

  const setOverlay = useCallback((name, open) => {
    setOverlays((o) => {
      const next = { spotlight: false, launchpad: false, cc: false, nc: false }
      if (open) next[name] = true
      return next
    })
  }, [])

  const closeOverlays = useCallback(() => {
    setOverlays({ spotlight: false, launchpad: false, cc: false, nc: false })
  }, [])

  const anyOverlayOpen = Object.values(overlays).some(Boolean)

  const pushNotification = useCallback((n) => {
    const id = `n-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    setNotifications((list) => [{ id, time: 'now', ...n }, ...list])
  }, [])

  const clearNotifications = useCallback(() => setNotifications([]), [])

  const cleanUpIcons = useCallback(() => {
    setIconPositions({})
    save('iconPositions', {})
  }, [])

  const value = useMemo(
    () => ({
      wallpaper,
      setWallpaper,
      cycleWallpaper,
      dark,
      toggleDark,
      brightness,
      setBrightness,
      volume,
      setVolume,
      toggles,
      toggle,
      iconPositions,
      setIconPosition,
      cleanUpIcons,
      overlays,
      setOverlay,
      closeOverlays,
      anyOverlayOpen,
      notifications,
      pushNotification,
      clearNotifications,
    }),
    [
      wallpaper, setWallpaper, cycleWallpaper, dark, toggleDark, brightness, volume,
      toggles, toggle, iconPositions, setIconPosition, cleanUpIcons, overlays, setOverlay,
      closeOverlays, anyOverlayOpen, notifications, pushNotification, clearNotifications,
    ]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
