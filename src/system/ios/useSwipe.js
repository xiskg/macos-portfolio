import { useRef } from 'react'

// ============================================================================
//  useSwipe — dominant-direction swipe detection over pointer events.
//  Attach the returned handlers to an element; the matching handler fires
//  once the gesture passes `threshold` px. Vertical swipes win over
//  horizontal ones (and vice-versa) by dominant axis, so they don't fight
//  with each other.
// ============================================================================

export function useSwipe(handlers, { threshold = 48 } = {}) {
  const start = useRef(null)

  const onPointerDown = (e) => {
    start.current = { x: e.clientX, y: e.clientY }
  }

  const onPointerUp = (e) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    start.current = null
    const ax = Math.abs(dx)
    const ay = Math.abs(dy)
    if (Math.max(ax, ay) < threshold) return
    if (ay > ax) {
      if (dy < 0) handlers.onSwipeUp?.(e, { dx, dy })
      else handlers.onSwipeDown?.(e, { dx, dy })
    } else {
      if (dx < 0) handlers.onSwipeLeft?.(e, { dx, dy })
      else handlers.onSwipeRight?.(e, { dx, dy })
    }
  }

  const onPointerCancel = () => {
    start.current = null
  }

  return { onPointerDown, onPointerUp, onPointerCancel }
}
