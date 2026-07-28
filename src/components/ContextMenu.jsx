import { useEffect, useLayoutEffect, useRef, useState } from 'react'

/**
 * Generic macOS-style context menu.
 * menu = { x, y, items: [{ label, action, disabled, shortcut } | 'sep'] } | null
 */
export default function ContextMenu({ menu, onClose }) {
  const ref = useRef(null)
  const [pos, setPos] = useState(menu ? { x: menu.x, y: menu.y } : null)

  useLayoutEffect(() => {
    if (!menu) return
    setPos({ x: menu.x, y: menu.y })
    // keep on-screen
    requestAnimationFrame(() => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      setPos({
        x: Math.min(menu.x, window.innerWidth - r.width - 8),
        y: Math.min(menu.y, window.innerHeight - r.height - 8),
      })
    })
  }, [menu])

  useEffect(() => {
    if (!menu) return
    const close = () => onClose()
    const key = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('pointerdown', close)
    window.addEventListener('keydown', key)
    window.addEventListener('blur', close)
    return () => {
      window.removeEventListener('pointerdown', close)
      window.removeEventListener('keydown', key)
      window.removeEventListener('blur', close)
    }
  }, [menu, onClose])

  if (!menu || !pos) return null

  return (
    <div
      ref={ref}
      className="ctxmenu"
      style={{ left: pos.x, top: pos.y }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {menu.items.map((it, i) =>
        it === 'sep' ? (
          <div key={i} className="ctx-sep" />
        ) : (
          <div
            key={i}
            className={`ctx-item${it.disabled ? ' disabled' : ''}`}
            onClick={() => {
              if (it.disabled) return
              onClose()
              it.action?.()
            }}
          >
            <span>{it.label}</span>
            {it.shortcut && <span style={{ color: 'inherit', opacity: 0.6 }}>{it.shortcut}</span>}
          </div>
        )
      )}
    </div>
  )
}
