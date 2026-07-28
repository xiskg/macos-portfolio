import { useEffect, useState } from 'react'
import { useWindows } from '../system/WindowManager.jsx'
import { getNode, ROOT } from '../content/fileSystem.js'

/** TextEdit — opens .txt files from the virtual FS. Editable, just like the real one. */
export default function TextEdit({ win, fileName, content }) {
  const { updateTitle } = useWindows()
  const fallback = getNode([ROOT, 'Resume.txt'])
  const text = content ?? fallback?.content ?? ''
  const name = fileName ?? fallback?.name ?? 'Untitled.txt'
  const [active, setActive] = useState({ bold: false, italic: false, underline: false })

  // Real TextEdit titles the window after the open document
  useEffect(() => {
    updateTitle(win.id, name)
  }, [win.id, name, updateTitle])

  const refreshActive = () => {
    setActive({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    })
  }

  const format = (command) => (e) => {
    e.preventDefault() // keep focus/selection in the body instead of the toolbar button
    document.execCommand(command)
    refreshActive()
  }

  return (
    <>
      <div className="textedit-format">
        <button
          className={`fb${active.bold ? ' active' : ''}`}
          style={{ fontWeight: 800 }}
          title="Bold"
          onMouseDown={format('bold')}
        >
          B
        </button>
        <button
          className={`fb${active.italic ? ' active' : ''}`}
          style={{ fontStyle: 'italic' }}
          title="Italic"
          onMouseDown={format('italic')}
        >
          I
        </button>
        <button
          className={`fb${active.underline ? ' active' : ''}`}
          style={{ textDecoration: 'underline' }}
          title="Underline"
          onMouseDown={format('underline')}
        >
          U
        </button>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 11 }}>{name} — Editable</span>
      </div>
      <div
        className="textedit-body"
        contentEditable
        suppressContentEditableWarning
        spellCheck={false}
        onKeyUp={refreshActive}
        onMouseUp={refreshActive}
      >
        {text}
      </div>
    </>
  )
}
