import { useEffect, useMemo, useRef, useState } from 'react'
import { useWindows } from '../system/WindowManager.jsx'
import { useDesktop } from '../system/DesktopContext.jsx'
import { flattenTree, kindOf, iconForNode } from '../content/fileSystem.js'
import Icon from './Icon.jsx'

const APP_ENTRIES = [
  { appId: 'finder', name: 'Finder', icon: 'finder' },
  { appId: 'safari', name: 'Safari', icon: 'safari' },
  { appId: 'mail', name: 'Mail', icon: 'mail' },
  { appId: 'photos', name: 'Photos', icon: 'photos' },
  { appId: 'terminal', name: 'Terminal', icon: 'terminal' },
  { appId: 'textedit', name: 'TextEdit', icon: 'textedit' },
]

export default function Spotlight() {
  const { overlays, setOverlay } = useDesktop()
  const { openWindow, openItem } = useWindows()
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)
  const flat = useMemo(() => flattenTree(), [])

  useEffect(() => {
    if (overlays.spotlight) {
      setQuery('')
      setActive(0)
      setTimeout(() => inputRef.current?.focus(), 30)
    }
  }, [overlays.spotlight])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return { apps: [], files: [] }
    const apps = APP_ENTRIES.filter((a) => a.name.toLowerCase().includes(q))
    const files = flat
      .filter((e) => e.node.type !== 'folder' || e.pathArr.length > 1)
      .filter((e) => {
        if (e.node.name.toLowerCase().includes(q)) return true
        if (e.node.type === 'txt' && e.node.content.toLowerCase().includes(q)) return true
        return false
      })
      .slice(0, 9)
    return { apps, files }
  }, [query, flat])

  const allRows = useMemo(
    () => [
      ...results.apps.map((a) => ({ kind: 'app', ...a })),
      ...results.files.map((f) => ({ kind: 'file', entry: f })),
    ],
    [results]
  )

  if (!overlays.spotlight) return null

  const close = () => setOverlay('spotlight', false)

  const openRow = (row) => {
    if (!row) return
    close()
    if (row.kind === 'app') openWindow(row.appId)
    else openItem(row.entry.node, row.entry.pathArr)
  }

  const onKey = (e) => {
    if (e.key === 'Escape') close()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, allRows.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      openRow(allRows[active])
    }
  }

  return (
    <>
      <div className="spotlight-backdrop" onPointerDown={close} />
      <div className="spotlight" onKeyDown={onKey}>
        <div className="spot-input">
          <Icon name="search" size={21} />
          <input
            ref={inputRef}
            placeholder="Spotlight Search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
            }}
          />
        </div>
        {query.trim() && (
          <div className="spot-results">
            {allRows.length === 0 && <div className="spot-empty">No results for “{query}”</div>}
            {results.apps.length > 0 && <div className="spot-group">Applications</div>}
            {results.apps.map((a, i) => (
              <div
                key={a.appId}
                className={`spot-row${active === i ? ' active' : ''}`}
                onPointerEnter={() => setActive(i)}
                onClick={() => openRow(allRows[i])}
              >
                <Icon name={a.icon} size={26} />
                <span className="sr-name">{a.name}</span>
                <span className="sr-kind">Application</span>
              </div>
            ))}
            {results.files.length > 0 && <div className="spot-group">Files &amp; Folders</div>}
            {results.files.map((f, j) => {
              const i = results.apps.length + j
              return (
                <div
                  key={f.pathArr.join('/')}
                  className={`spot-row${active === i ? ' active' : ''}`}
                  onPointerEnter={() => setActive(i)}
                  onClick={() => openRow(allRows[i])}
                >
                  <Icon name={iconForNode(f.node)} size={26} />
                  <span className="sr-name">{f.node.name}</span>
                  <span className="sr-kind">{kindOf(f.node)}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
