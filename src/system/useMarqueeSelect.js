import { useCallback, useRef, useState } from 'react'

const intersects = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top

/**
 * Click-drag-to-select (rubber-band) over a set of items inside a container.
 * The container must be `position: relative` — the marquee rect this hook
 * returns is meant to be rendered as an absolutely-positioned child of it.
 */
export function useMarqueeSelect() {
  const containerRef = useRef(null)
  const itemRefs = useRef({})
  const drag = useRef(null)
  const [selected, setSelected] = useState(() => new Set())
  const [rect, setRect] = useState(null)

  const registerItem = useCallback((key) => (el) => {
    if (el) itemRefs.current[key] = el
    else delete itemRefs.current[key]
  }, [])

  const onPointerDown = useCallback((e) => {
    if (e.button !== 0 || e.target.closest('[data-select-item]')) return
    e.preventDefault()
    const additive = e.shiftKey || e.metaKey
    const box = containerRef.current.getBoundingClientRect()
    drag.current = { sx: e.clientX, sy: e.clientY, box, base: additive ? new Set(selected) : new Set() }
    if (!additive) setSelected(new Set())
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [selected])

  const onPointerMove = useCallback((e) => {
    const d = drag.current
    if (!d) return
    const x1 = Math.min(d.sx, e.clientX), x2 = Math.max(d.sx, e.clientX)
    const y1 = Math.min(d.sy, e.clientY), y2 = Math.max(d.sy, e.clientY)
    if (x2 - x1 < 4 && y2 - y1 < 4) return
    setRect({ x: x1 - d.box.left, y: y1 - d.box.top, w: x2 - x1, h: y2 - y1 })

    const box = { left: x1, right: x2, top: y1, bottom: y2 }
    const next = new Set(d.base)
    for (const key in itemRefs.current) {
      if (intersects(box, itemRefs.current[key].getBoundingClientRect())) next.add(key)
    }
    setSelected(next)
  }, [])

  const onPointerUp = useCallback(() => {
    drag.current = null
    setRect(null)
  }, [])

  const toggle = useCallback((key, additive) => {
    setSelected((prev) => {
      if (additive) {
        const next = new Set(prev)
        next.has(key) ? next.delete(key) : next.add(key)
        return next
      }
      return new Set([key])
    })
  }, [])

  return {
    containerRef,
    registerItem,
    selected,
    setSelected,
    rect,
    toggle,
    handlers: { onPointerDown, onPointerMove, onPointerUp },
  }
}
