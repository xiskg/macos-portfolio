import { useEffect, useMemo, useState } from 'react'
import { flattenTree } from '../../content/fileSystem.js'
import Icon from '../../components/Icon.jsx'

// ============================================================================
//  Notes for iOS — the TextEdit counterpart. Every .txt in the virtual file
//  system becomes a note; opening one shows it in an editable editor.
// ============================================================================

const PREVIEW_LEN = 80

export default function IOSNotes({ noteKey }) {
  const notes = useMemo(
    () =>
      flattenTree()
        .filter((e) => e.node.type === 'txt')
        .map((e) => {
          const firstLine = e.node.content.split('\n').find((l) => l.trim()) ?? e.node.name
          return {
            key: e.pathArr.join('/'),
            name: e.node.name,
            title: firstLine.replace(/=+/g, '').trim(),
            preview: e.node.content.replace(/\s+/g, ' ').slice(0, PREVIEW_LEN),
            content: e.node.content,
          }
        }),
    []
  )
  const [openKey, setOpenKey] = useState(noteKey ?? null)
  const current = notes.find((n) => n.key === openKey)

  // Files opens a specific note while Notes is already alive in the background
  useEffect(() => {
    if (noteKey) setOpenKey(noteKey)
  }, [noteKey])

  if (current) {
    return (
      <div className="ios-notes">
        <div className="ios-navbar">
          <div className="ios-navbar-side">
            <button className="ios-back" onClick={() => setOpenKey(null)}>
              <Icon name="chevL" size={18} /> Notes
            </button>
          </div>
          <div className="ios-navbar-title">{current.name}</div>
        </div>
        <div
          className="ios-note-body"
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
        >
          {current.content}
        </div>
      </div>
    )
  }

  return (
    <div className="ios-notes">
      <div className="ios-navbar">
        <div className="ios-navbar-title">Notes</div>
      </div>
      <div className="ios-scroll">
        {notes.map((n) => (
          <button key={n.key} className="ios-nrow" onClick={() => setOpenKey(n.key)}>
            <span className="ios-ntitle">{n.title}</span>
            <span className="ios-nprev">{n.preview}…</span>
          </button>
        ))}
      </div>
    </div>
  )
}
