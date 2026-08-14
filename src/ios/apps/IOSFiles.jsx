import { useState } from 'react'
import { useApps } from '../../system/ios/AppSwitcher.jsx'
import { ROOT, getChildren, iconForNode } from '../../content/fileSystem.js'
import Icon from '../../components/Icon.jsx'

// ============================================================================
//  Files for iOS — the Finder counterpart. Stack navigation through the same
//  virtual file system; tapping a file opens it in its owning app.
// ============================================================================

export default function IOSFiles({ path: propPath }) {
  const { openApp } = useApps()
  const [stack, setStack] = useState(() => [propPath ?? [ROOT]])
  const path = stack[stack.length - 1]
  const items = getChildren(path)

  const title = path.length <= 1 ? 'Browse' : path[path.length - 1]

  const openItem = (node, pathArr) => {
    switch (node.type) {
      case 'folder':
        setStack((s) => [...s, pathArr])
        break
      case 'txt':
        openApp('notes', { noteKey: pathArr.join('/') })
        break
      case 'img':
        openApp('photos', { projectId: node.projectId })
        break
      case 'webloc':
        if (node.url.startsWith('mailto:')) window.location.href = node.url
        else if (node.external) window.open(node.url, '_blank', 'noopener')
        else openApp('safari', { url: node.url })
        break
      default:
        break
    }
  }

  return (
    <div className="ios-files">
      <div className="ios-navbar">
        <div className="ios-navbar-side">
          {stack.length > 1 && (
            <button className="ios-back" onClick={() => setStack((s) => s.slice(0, -1))}>
              <Icon name="chevL" size={18} /> {stack.length > 2 ? path[path.length - 2] ?? 'Back' : 'Browse'}
            </button>
          )}
        </div>
        <div className="ios-navbar-title">{title}</div>
      </div>
      <div className="ios-scroll">
        <div className="ios-list">
          {items.map((node) => (
            <button
              key={node.name}
              className="ios-cell"
              onClick={() => openItem(node, [...path, node.name])}
            >
              <span className="ios-cell-icon">
                <Icon name={iconForNode(node)} size={30} />
              </span>
              <span className="ios-cell-name">{node.name}</span>
              {node.type === 'folder' && (
                <>
                  <span className="ios-cell-count">{node.children.length}</span>
                  <span className="chev"><Icon name="chevR" size={15} /></span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
