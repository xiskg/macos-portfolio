import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const Ctx = createContext(null)
export const useWindows = () => useContext(Ctx)

let zCounter = 100
let idCounter = 0

export const APP_DEFAULTS = {
  finder:        { title: 'Finder',         size: { w: 940, h: 580 } },
  textedit:      { title: 'TextEdit',       size: { w: 660, h: 580 } },
  safari:        { title: 'Safari',         size: { w: 1040, h: 660 } },
  mail:          { title: 'Mail',           size: { w: 980, h: 620 } },
  'mail-compose':{ title: 'New Message',    size: { w: 580, h: 520 } },
  photos:        { title: 'Photos',         size: { w: 1000, h: 640 } },
  terminal:      { title: 'Terminal',       size: { w: 680, h: 470 } },
  about:         { title: 'About This Mac', size: { w: 620, h: 340 }, noResize: true },
}

const MENU_BAR_H = 28

export function WindowManagerProvider({ children }) {
  const [windows, setWindows] = useState([])
  const cascade = useRef(0)

  const openWindow = useCallback((appId, opts = {}) => {
    const def = APP_DEFAULTS[appId] ?? { title: appId, size: { w: 720, h: 520 } }
    const key = opts.multi ? `m${++idCounter}` : opts.key ?? 'main'
    const size = opts.size ?? def.size

    setWindows((ws) => {
      const existing = ws.find((w) => w.appId === appId && w.key === key)
      if (existing) {
        return ws.map((w) =>
          w.id === existing.id
            ? {
                ...w,
                minimized: false,
                z: ++zCounter,
                title: opts.title ?? w.title,
                props: { ...w.props, ...(opts.props ?? {}) },
              }
            : w
        )
      }
      const n = cascade.current++ % 6
      const w = size.w
      const h = size.h
      const x = opts.x ?? Math.max(12, (window.innerWidth - w) / 2 + (n - 2.5) * 36)
      const y = opts.y ?? Math.max(MENU_BAR_H + 8, (window.innerHeight - h) / 2 - 30 + n * 24)
      const win = {
        id: ++idCounter,
        appId,
        key,
        title: opts.title ?? def.title,
        props: opts.props ?? {},
        x, y, w, h,
        z: ++zCounter,
        minimized: false,
        maximized: false,
        prevRect: null,
        noResize: def.noResize ?? false,
        born: Date.now(),
      }
      return [...ws, win]
    })
  }, [])

  const closeWindow = useCallback((id) => {
    setWindows((ws) => ws.filter((w) => w.id !== id))
  }, [])

  const closeAppWindows = useCallback((appId) => {
    setWindows((ws) => ws.filter((w) => w.appId !== appId))
  }, [])

  const focusWindow = useCallback((id) => {
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, z: ++zCounter, minimized: false } : w))
    )
  }, [])

  const minimizeWindow = useCallback((id) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)))
  }, [])

  const restoreWindow = useCallback((id) => {
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, minimized: false, z: ++zCounter } : w))
    )
  }, [])

  const toggleMaximize = useCallback((id) => {
    setWindows((ws) =>
      ws.map((w) => {
        if (w.id !== id) return w
        if (w.maximized) {
          return { ...w, maximized: false, ...(w.prevRect ?? {}), prevRect: null, z: ++zCounter }
        }
        return {
          ...w,
          maximized: true,
          prevRect: { x: w.x, y: w.y, w: w.w, h: w.h },
          x: 0,
          y: MENU_BAR_H,
          w: window.innerWidth,
          h: window.innerHeight - MENU_BAR_H,
          z: ++zCounter,
        }
      })
    )
  }, [])

  const updateRect = useCallback((id, rect) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, ...rect } : w)))
  }, [])

  const updateProps = useCallback((id, patch) => {
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, props: { ...w.props, ...patch } } : w))
    )
  }, [])

  const updateTitle = useCallback((id, title) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, title } : w)))
  }, [])

  // The active window = highest-z, non-minimized window.
  const activeWindow = windows
    .filter((w) => !w.minimized)
    .reduce((best, w) => (best && best.z > w.z ? best : w), null)

  const activeAppId = activeWindow?.appId ?? 'finder'

  const openItem = useCallback(
    (node, pathArr) => {
      switch (node.type) {
        case 'folder':
          openWindow('finder', { props: { path: pathArr }, title: node.name })
          break
        case 'txt':
          openWindow('textedit', {
            key: node.name,
            title: node.name,
            props: { fileName: node.name, content: node.content },
          })
          break
        case 'img':
          openWindow('photos', { props: { projectId: node.projectId } })
          break
        case 'webloc':
          if (node.url.startsWith('mailto:')) {
            window.location.href = node.url
          } else if (node.external) {
            window.open(node.url, '_blank', 'noopener')
          } else {
            openWindow('safari', { props: { url: node.url } })
          }
          break
        default:
          break
      }
    },
    [openWindow]
  )

  const value = useMemo(
    () => ({
      windows,
      activeWindow,
      activeAppId,
      openWindow,
      closeWindow,
      closeAppWindows,
      focusWindow,
      minimizeWindow,
      restoreWindow,
      toggleMaximize,
      updateRect,
      updateProps,
      updateTitle,
      openItem,
    }),
    [
      windows, activeWindow, activeAppId, openWindow, closeWindow, closeAppWindows,
      focusWindow, minimizeWindow, restoreWindow, toggleMaximize, updateRect,
      updateProps, updateTitle, openItem,
    ]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
