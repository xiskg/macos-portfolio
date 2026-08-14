import { useCallback, useRef, useState } from 'react'
import { useWindows } from '../system/WindowManager.jsx'
import { useDesktop } from '../system/DesktopContext.jsx'
import { useMarqueeSelect } from '../system/useMarqueeSelect.js'
import { ROOT, getDesktopItemNames, getNode, iconForNode } from '../content/fileSystem.js'
import ContextMenu from './ContextMenu.jsx'
import Icon from './Icon.jsx'
import WelcomeWidget from './WelcomeWidget.jsx'

const ICON_W = 96
const ICON_H = 92
const MARGIN_X = 24
const MARGIN_TOP = 44

export default function Desktop() {
  const { openItem, openWindow } = useWindows()
  const { wallpaper, cycleWallpaper, toggleDark, iconPositions, setIconPosition, cleanUpIcons } = useDesktop()
  const { containerRef, registerItem, selected, setSelected, rect, toggle, handlers } = useMarqueeSelect()
  const [menu, setMenu] = useState(null)

  const items = getDesktopItemNames()
    .map((name) => ({ node: getNode([ROOT, name]), path: [ROOT, name] }))
    .filter((it) => it.node)

  const defaultPos = (i) => ({
    x: window.innerWidth - ICON_W - MARGIN_X,
    y: MARGIN_TOP + i * (ICON_H + 14),
  })

  const onDesktopContext = useCallback((e) => {
    if (e.target.closest('[data-select-item]')) return
    e.preventDefault()
    setSelected(new Set())
    setMenu({
      x: e.clientX,
      y: e.clientY,
      items: [
        { label: 'New Folder', disabled: true },
        { label: 'Get Info', disabled: true },
        'sep',
        { label: 'Clean Up', action: cleanUpIcons },
        { label: 'Change Wallpaper…', action: cycleWallpaper },
        { label: 'Toggle Dark Mode', action: toggleDark },
        'sep',
        { label: 'Open Terminal Here', action: () => openWindow('terminal') },
      ],
    })
  }, [cleanUpIcons, cycleWallpaper, toggleDark, openWindow, setSelected])

  return (
    <>
      <div className={`wallpaper wp-${wallpaper}`} />
      <WelcomeWidget />
      <div
        ref={containerRef}
        className="desktop-icons"
        onContextMenu={onDesktopContext}
        {...handlers}
      >
        {items.map((it, i) => (
          <DesktopIcon
            key={it.node.name}
            item={it}
            pos={iconPositions[it.node.name] ?? defaultPos(i)}
            selected={selected.has(it.node.name)}
            registerRef={registerItem(it.node.name)}
            onSelect={(additive) => toggle(it.node.name, additive)}
            onOpen={() => openItem(it.node, it.path)}
            onMove={(p) => setIconPosition(it.node.name, p)}
          />
        ))}
        {rect && <div className="marquee" style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h }} />}
      </div>
      <ContextMenu menu={menu} onClose={() => setMenu(null)} />
    </>
  )
}

function DesktopIcon({ item, pos, selected, registerRef, onSelect, onOpen, onMove }) {
  const [dragPos, setDragPos] = useState(null)
  const state = useRef(null)

  const onPointerDown = (e) => {
    if (e.button !== 0) return
    onSelect(e.shiftKey || e.metaKey)
    state.current = { sx: e.clientX, sy: e.clientY, moved: false }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    const s = state.current
    if (!s) return
    const dx = e.clientX - s.sx
    const dy = e.clientY - s.sy
    if (!s.moved && Math.hypot(dx, dy) > 5) s.moved = true
    if (s.moved) {
      setDragPos({
        x: Math.min(Math.max(pos.x + dx, 4), window.innerWidth - ICON_W - 4),
        y: Math.min(Math.max(pos.y + dy, 32), window.innerHeight - ICON_H - 76),
      })
    }
  }

  const onPointerUp = () => {
    const s = state.current
    state.current = null
    if (s?.moved && dragPos) {
      onMove(dragPos)
      setDragPos(null)
    }
  }

  const p = dragPos ?? pos

  return (
    <div
      ref={registerRef}
      data-select-item
      className={`dicon${selected ? ' selected' : ''}`}
      style={{ left: p.x, top: p.y }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDoubleClick={onOpen}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="dicon-img">
        <Icon name={iconForNode(item.node)} size={54} />
      </div>
      <div className="dicon-label">{item.node.name.replace(/\.([^.]+)$/, '\u200B.$1')}</div>
    </div>
  )
}
