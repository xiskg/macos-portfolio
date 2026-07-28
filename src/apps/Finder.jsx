import { useEffect, useMemo, useRef, useState } from 'react'
import { useWindows } from '../system/WindowManager.jsx'
import { useMarqueeSelect } from '../system/useMarqueeSelect.js'
import { ROOT, getNode, getChildren, flattenTree, kindOf, sizeOf, iconForNode } from '../content/fileSystem.js'
import Icon from '../components/Icon.jsx'

const SIDEBAR = [
  { section: 'Favorites' },
  { id: 'recents', name: 'Recents', icon: 'clock' },
  { id: 'desktop', name: 'Desktop', icon: 'monitor', path: [ROOT] },
  { id: 'portfolio', name: 'Portfolio', icon: 'folderSm', path: [ROOT, 'Portfolio'] },
  { id: 'work', name: 'Work Experience', icon: 'docSm', path: [ROOT, 'Work Experience'] },
  { section: 'Locations' },
  { id: 'hd', name: ROOT, icon: 'monitor', path: [ROOT] },
  { id: 'airdrop', name: 'AirDrop', icon: 'airdrop', disabled: true },
]

export default function Finder({ win, path: propPath }) {
  const { updateTitle, openItem } = useWindows()
  const [history, setHistory] = useState(() => ({ stack: [propPath ?? [ROOT]], idx: 0 }))
  const [view, setView] = useState('icons')
  const [search, setSearch] = useState('')
  const { containerRef, registerItem, selected, setSelected, rect, toggle, handlers } = useMarqueeSelect()
  const [recentsMode, setRecentsMode] = useState(false)
  const lastPropPath = useRef(propPath)

  const path = history.stack[history.idx]
  const currentNode = getNode(path)

  // External navigation requests (Spotlight, Terminal, desktop icons…)
  useEffect(() => {
    if (propPath && propPath !== lastPropPath.current) {
      lastPropPath.current = propPath
      setRecentsMode(false)
      setHistory((h) => ({ stack: [...h.stack.slice(0, h.idx + 1), propPath], idx: h.idx + 1 }))
    }
  }, [propPath])

  useEffect(() => {
    updateTitle(win.id, recentsMode ? 'Recents' : currentNode?.name ?? 'Finder')
  }, [win.id, path, recentsMode, currentNode, updateTitle])

  const navigate = (p) => {
    setSelected(new Set())
    setRecentsMode(false)
    setHistory((h) => ({ stack: [...h.stack.slice(0, h.idx + 1), p], idx: h.idx + 1 }))
  }

  const go = (delta) => {
    setSelected(new Set())
    setRecentsMode(false)
    setHistory((h) => ({ ...h, idx: Math.min(Math.max(h.idx + delta, 0), h.stack.length - 1) }))
  }

  const rawItems = useMemo(() => {
    if (recentsMode) return flattenTree().filter((e) => e.node.type !== 'folder')
    return getChildren(path).map((node) => ({ node, pathArr: [...path, node.name] }))
  }, [path, recentsMode])

  const items = useMemo(() => {
    if (!search.trim()) return rawItems
    const q = search.toLowerCase()
    return rawItems.filter((e) => e.node.name.toLowerCase().includes(q))
  }, [rawItems, search])

  const open = (entry) => {
    if (entry.node.type === 'folder') navigate(entry.pathArr)
    else openItem(entry.node, entry.pathArr)
  }

  const sidebarClick = (item) => {
    setSelected(new Set())
    setSearch('')
    if (item.id === 'recents') {
      setRecentsMode(true)
      return
    }
    if (item.path) navigate(item.path)
  }

  const activeSidebar = recentsMode
    ? 'recents'
    : SIDEBAR.find((s) => s.path && s.path.join('/') === path.join('/'))?.id

  return (
    <div className="finder">
      <div className="sidebar" style={{ width: 200 }}>
        {SIDEBAR.map((s, i) =>
          s.section ? (
            <div key={i} className="sb-section">{s.section}</div>
          ) : (
            <div
              key={s.id}
              className={`sb-item${activeSidebar === s.id ? ' active' : ''}${s.disabled ? ' disabled' : ''}`}
              onClick={() => !s.disabled && sidebarClick(s)}
            >
              <span className="glyph"><Icon name={s.icon} size={16} /></span>
              {s.name}
            </div>
          )
        )}
      </div>
      <div className="finder-main">
        <div className="toolbar">
          <button className="tbtn" disabled={history.idx === 0} onClick={() => go(-1)} aria-label="Back">
            <Icon name="chevL" size={17} />
          </button>
          <button
            className="tbtn"
            disabled={history.idx >= history.stack.length - 1}
            onClick={() => go(1)}
            aria-label="Forward"
          >
            <Icon name="chevR" size={17} />
          </button>
          <div className="segmented" role="tablist">
            <button className={view === 'icons' ? 'on' : ''} onClick={() => setView('icons')} aria-label="Icon view">
              <Icon name="gridView" size={15} />
            </button>
            <button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')} aria-label="List view">
              <Icon name="listView" size={15} />
            </button>
          </div>
          <div style={{ flex: 1 }} />
          <div className="search-field" style={{ width: 180 }}>
            <Icon name="search" size={13} />
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {items.length === 0 ? (
          <div className="finder-empty">No results</div>
        ) : view === 'icons' ? (
          <div className="finder-icons" ref={containerRef} {...handlers}>
            {items.map((e) => (
              <div
                key={e.pathArr.join('/')}
                ref={registerItem(e.node.name)}
                data-select-item
                className={`fcell${selected.has(e.node.name) ? ' sel' : ''}`}
                onClick={(ev) => toggle(e.node.name, ev.shiftKey || ev.metaKey)}
                onDoubleClick={() => open(e)}
              >
                <div className="fi"><Icon name={iconForNode(e.node)} size={52} /></div>
                <div className="fl">{e.node.name}</div>
              </div>
            ))}
            {rect && <div className="marquee" style={{ left: rect.x, top: rect.y, width: rect.w, height: rect.h }} />}
          </div>
        ) : (
          <div className="finder-list">
            <div className="frow-head">
              <span>Name</span>
              <span>Kind</span>
              <span>Size</span>
            </div>
            {items.map((e) => (
              <div
                key={e.pathArr.join('/')}
                className={`frow${selected.has(e.node.name) ? ' sel' : ''}`}
                onClick={(ev) => toggle(e.node.name, ev.shiftKey || ev.metaKey)}
                onDoubleClick={() => open(e)}
              >
                <span className="fname">
                  <Icon name={iconForNode(e.node)} size={17} />
                  {e.node.name}
                </span>
                <span className="meta">{kindOf(e.node)}</span>
                <span className="meta">{sizeOf(e.node)}</span>
              </div>
            ))}
          </div>
        )}

        <div className="statusbar">
          {items.length} item{items.length === 1 ? '' : 's'}, 42.5 GB available
        </div>
      </div>
    </div>
  )
}
