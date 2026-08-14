import { createContext, useCallback, useContext, useMemo, useState } from 'react'

// ============================================================================
//  APP SWITCHER — the iOS counterpart of WindowManager.
//  One app on screen at a time; opened apps stay mounted in the background
//  so their state survives a trip to the Home Screen (like real iOS).
// ============================================================================

const Ctx = createContext(null)
export const useApps = () => useContext(Ctx)

export function AppSwitcherProvider({ children }) {
  const [openApps, setOpenApps] = useState([]) // [{ id, props, origin }]
  const [activeId, setActiveId] = useState(null)

  // origin (optional): bounding rect of the icon that launched the app,
  // used to anchor the open/close zoom animation.
  const openApp = useCallback((id, props = {}, origin = null) => {
    setOpenApps((list) => {
      const existing = list.find((a) => a.id === id)
      if (existing) {
        return list.map((a) =>
          a.id === id ? { ...a, props: { ...a.props, ...props }, origin: origin ?? a.origin } : a
        )
      }
      return [...list, { id, props, origin }]
    })
    setActiveId(id)
  }, [])

  // Go Home — the app stays alive in the background.
  const closeApp = useCallback(() => setActiveId(null), [])

  // Actually kill an app (app switcher / exit command).
  const quitApp = useCallback((id) => {
    setOpenApps((list) => list.filter((a) => a.id !== id))
    setActiveId((cur) => (cur === id ? null : cur))
  }, [])

  const activeApp = openApps.find((a) => a.id === activeId) ?? null

  const value = useMemo(
    () => ({ openApps, activeId, activeApp, openApp, closeApp, quitApp }),
    [openApps, activeId, activeApp, openApp, closeApp, quitApp]
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
