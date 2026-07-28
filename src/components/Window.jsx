import { useCallback, useEffect, useRef, useState } from 'react'
import { useWindows } from '../system/WindowManager.jsx'
import Icon from './Icon.jsx'

const MIN_W = 340
const MIN_H = 220
const MENU_BAR_H = 28

// Apps without their own Dock icon minimize toward a related one
const DOCK_ALIAS = { 'mail-compose': 'mail', about: 'finder' }

/**
 * Generic macOS window chrome: traffic lights, title bar, drag, resize,
 * minimize-to-dock animation and zoom. App content goes in `children`.
 * Apps with `chrome="overlay"` draw their own toolbar and mark it with
 * the `data-drag-handle` attribute so it drags the window.
 */
export default function Window({ win, children, chrome = 'default' }) {
  const { focusWindow, closeWindow, minimizeWindow, toggleMaximize, updateRect, activeWindow } =
    useWindows()
  const isActive = activeWindow?.id === win.id
  const rootRef = useRef(null)

  // minimize/restore animation state
  const [minAnim, setMinAnim] = useState(null) // {dx, dy} | null
  const [hidden, setHidden] = useState(false)
  const wasMinimized = useRef(win.minimized)

  useEffect(() => {
    if (win.minimized && !wasMinimized.current) {
      // animate toward the app's Dock icon
      const el = rootRef.current
      const dockEl = document.querySelector(`[data-dock-app="${DOCK_ALIAS[win.appId] ?? win.appId}"]`)
      if (el && dockEl) {
        const r = el.getBoundingClientRect()
        const d = dockEl.getBoundingClientRect()
        const dx = d.left + d.width / 2 - (r.left + r.width / 2)
        const dy = d.top + d.height / 2 - (r.top + r.height / 2)
        setMinAnim({ dx, dy })
        const t = setTimeout(() => setHidden(true), 390)
        return () => clearTimeout(t)
      }
      setHidden(true)
    }
    if (!win.minimized && wasMinimized.current) {
      setHidden(false)
      // let it paint at the minimized transform, then release
      requestAnimationFrame(() => requestAnimationFrame(() => setMinAnim(null)))
    }
    wasMinimized.current = win.minimized
  }, [win.minimized, win.appId])

  // ---- drag -------------------------------------------------------------
  const dragState = useRef(null)

  const onDragStart = useCallback(
    (e) => {
      if (win.maximized || e.button !== 0) return
      if (e.target.closest('.tl') || e.target.closest('button') || e.target.closest('input') || e.target.closest('textarea') || e.target.closest('a')) return
      focusWindow(win.id)
      dragState.current = { mode: 'drag', sx: e.clientX, sy: e.clientY, ox: win.x, oy: win.y }
      e.preventDefault()
    },
    [win.id, win.x, win.y, win.maximized, focusWindow]
  )

  const onResizeStart = useCallback(
    (dir) => (e) => {
      if (win.noResize || win.maximized || e.button !== 0) return
      focusWindow(win.id)
      dragState.current = { mode: dir, sx: e.clientX, sy: e.clientY, rect: { x: win.x, y: win.y, w: win.w, h: win.h } }
      e.preventDefault()
      e.stopPropagation()
    },
    [win.id, win.x, win.y, win.w, win.h, win.noResize, win.maximized, focusWindow]
  )

  useEffect(() => {
    const move = (e) => {
      const s = dragState.current
      if (!s) return
      const dx = e.clientX - s.sx
      const dy = e.clientY - s.sy
      if (s.mode === 'drag') {
        const x = Math.min(Math.max(s.ox + dx, -win.w + 90), window.innerWidth - 90)
        const y = Math.min(Math.max(s.oy + dy, MENU_BAR_H), window.innerHeight - 40)
        updateRect(win.id, { x, y })
      } else {
        const r = s.rect
        let { x, y, w, h } = r
        if (s.mode.includes('e')) w = Math.max(MIN_W, r.w + dx)
        if (s.mode.includes('s')) h = Math.max(MIN_H, r.h + dy)
        if (s.mode.includes('w')) {
          const nw = Math.max(MIN_W, r.w - dx)
          x = r.x + (r.w - nw)
          w = nw
        }
        if (s.mode.includes('n')) {
          const nh = Math.max(MIN_H, r.h - dy)
          y = Math.max(MENU_BAR_H, r.y + (r.h - nh))
          h = r.h + (r.y - y)
        }
        updateRect(win.id, { x, y, w, h })
      }
    }
    const up = () => (dragState.current = null)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [win.id, win.w, updateRect])

  // Double-click title bar = zoom (like macOS)
  const onTitleDouble = useCallback(
    (e) => {
      if (e.target.closest('.tl')) return
      if (!win.noResize) toggleMaximize(win.id)
    },
    [win.id, win.noResize, toggleMaximize]
  )

  const style = {
    left: win.x,
    top: win.y,
    width: win.w,
    height: win.h,
    zIndex: win.z,
    display: hidden ? 'none' : undefined,
    ...(minAnim
      ? { transform: `translate(${minAnim.dx}px, ${minAnim.dy}px) scale(0.06)`, opacity: 0 }
      : {}),
  }

  const cls = [
    'window',
    isActive ? 'active' : 'inactive',
    win.maximized ? 'maximized' : '',
    minAnim ? (win.minimized ? 'minimizing' : 'restoring') : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div ref={rootRef} className={cls} style={style} onPointerDown={() => focusWindow(win.id)}>
      <div className="window-frame">
        {chrome === 'default' ? (
          <div className="window-titlebar" onPointerDown={onDragStart} onDoubleClick={onTitleDouble}>
            <Traffic win={win} closeWindow={closeWindow} minimizeWindow={minimizeWindow} toggleMaximize={toggleMaximize} />
            <div className="wt-title">{win.title}</div>
          </div>
        ) : (
          <Traffic
            win={win}
            overlay
            closeWindow={closeWindow}
            minimizeWindow={minimizeWindow}
            toggleMaximize={toggleMaximize}
          />
        )}
        <div
          className="window-content"
          onPointerDown={(e) => {
            if (e.target.closest('[data-drag-handle]') && !e.target.closest('button,input,textarea,a,.tl')) onDragStart(e)
          }}
          onDoubleClick={(e) => {
            if (e.target.closest('[data-drag-handle]') && !e.target.closest('button,input,textarea,a')) onTitleDouble(e)
          }}
        >
          {children}
        </div>
      </div>
      {!win.noResize && !win.maximized && (
        <>
          <div className="rz rz-n" onPointerDown={onResizeStart('n')} />
          <div className="rz rz-s" onPointerDown={onResizeStart('s')} />
          <div className="rz rz-e" onPointerDown={onResizeStart('e')} />
          <div className="rz rz-w" onPointerDown={onResizeStart('w')} />
          <div className="rz rz-ne" onPointerDown={onResizeStart('ne')} />
          <div className="rz rz-nw" onPointerDown={onResizeStart('nw')} />
          <div className="rz rz-se" onPointerDown={onResizeStart('se')} />
          <div className="rz rz-sw" onPointerDown={onResizeStart('sw')} />
        </>
      )}
    </div>
  )
}

function Traffic({ win, overlay = false, closeWindow, minimizeWindow, toggleMaximize }) {
  return (
    <div className={`traffic${overlay ? ' overlay' : ''}`}>
      <button className="tl close" aria-label="Close" onClick={() => closeWindow(win.id)}>
        <Icon name="x" size={8} />
      </button>
      <button className="tl min" aria-label="Minimize" onClick={() => minimizeWindow(win.id)}>
        <Icon name="minus" size={8} />
      </button>
      <button
        className="tl max"
        aria-label="Zoom"
        onClick={() => !win.noResize && toggleMaximize(win.id)}
        style={win.noResize ? { visibility: 'hidden' } : undefined}
      >
        <Icon name="plus" size={8} />
      </button>
    </div>
  )
}
