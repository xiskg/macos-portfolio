import { useEffect, useRef, useState } from 'react'
import { useApps } from '../../system/ios/AppSwitcher.jsx'
import { ROOT, getNode, getChildren, resolvePath, displayPath } from '../../content/fileSystem.js'
import { profile, projects, skills } from '../../content/portfolio.js'

// ============================================================================
//  Terminal for iOS — same command engine as the desktop app (src/apps/
//  Terminal.jsx), adapted to the App Switcher instead of the WindowManager:
//  `exit` goes Home instead of closing a window, `open` launches the matching
//  iOS app instead of a Finder/TextEdit/Photos window.
// ============================================================================

let lineId = 0
const L = (node) => ({ id: ++lineId, node })

const HELP = [
  ['help', 'show this list'],
  ['neofetch', 'system & owner summary'],
  ['whoami', 'print current user'],
  ['pwd', 'print working directory'],
  ['ls [path]', 'list directory contents'],
  ['cd <dir>', 'change directory (supports .. and names with spaces)'],
  ['cat <file>', 'print file contents'],
  ['open <file|dir>', 'open with the default app'],
  ['projects', 'list featured projects'],
  ['skills', 'list skills'],
  ['contact', 'print contact info'],
  ['date', 'print current date'],
  ['echo <text>', 'print text'],
  ['clear', 'clear the terminal'],
  ['exit', 'go Home'],
]

const NEOFETCH_ASCII = [
  "                    '.",
  "                 .-'",
  "     _.-._    .-'",
  "   .'     '.-'",
  "  ;          :",
  "  |          |",
  "  :          ;",
  "   \\        /",
  "    '.__..__'",
]

export default function IOSTerminal() {
  const { closeApp, openApp } = useApps()
  const [lines, setLines] = useState(() => [
    L(<span className="t-dim">Last login: {new Date().toDateString()} on ttys000</span>),
    L(<span className="t-dim">Welcome to {profile.machineName}! Type <span className="t-acc">help</span> to get started.</span>),
  ])
  const [cwd, setCwd] = useState([ROOT])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [hIdx, setHIdx] = useState(-1)
  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight })
  }, [lines])

  const print = (nodes) => setLines((ls) => [...ls, ...[].concat(nodes).map(L)])

  const dirName = cwd.length <= 1 ? '/' : cwd[cwd.length - 1]

  const promptNode = (
    <span className="prompt">
      {profile.username}@{profile.machineName} <span className="ppath">{dirName}</span> %
    </span>
  )

  const openItem = (node, pathArr) => {
    switch (node.type) {
      case 'folder':
        openApp('files', { path: pathArr })
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

  const run = (raw) => {
    const cmdline = raw.trim()
    print(
      <span className="t-in">
        {promptNode} <span>{cmdline}</span>
      </span>
    )
    if (!cmdline) return

    const [cmd, ...args] = cmdline.split(/\s+/)
    const argStr = args.join(' ').replace(/^["']|["']$/g, '')

    switch (cmd) {
      case 'help':
        print(HELP.map(([c, d], i) => (
          <span key={i}><span className="t-acc">{c.padEnd(18)}</span><span className="t-dim">{d}</span></span>
        )))
        break

      case 'whoami':
        print(`${profile.username} — ${profile.name}, ${profile.role}`)
        break

      case 'pwd':
        print(displayPath(cwd))
        break

      case 'ls': {
        const target = argStr ? resolvePath(cwd, argStr) : cwd
        if (!target) return print(<span className="t-err">ls: {argStr}: No such file or directory</span>)
        const node = getNode(target)
        if (node?.type !== 'folder') return print(<span className="t-err">ls: {argStr}: Not a directory</span>)
        if (target.length === 1) {
          print(getChildren(target).map((c, i) =>
            c.type === 'folder' ? <span key={i} className="t-dir">{c.name}/</span> : <span key={i}>{c.name}</span>
          ))
        } else {
          print(
            <span>
              {getChildren(target).map((c, i) => (
                <span key={i}>
                  {c.type === 'folder' ? <span className="t-dir">{c.name}/</span> : c.name}
                  {'\n'}
                </span>
              ))}
            </span>
          )
        }
        break
      }

      case 'cd': {
        if (!argStr) {
          setCwd([ROOT])
          return
        }
        const target = resolvePath(cwd, argStr)
        if (!target) return print(<span className="t-err">cd: no such file or directory: {argStr}</span>)
        setCwd(target)
        break
      }

      case 'cat': {
        if (!argStr) return print(<span className="t-err">cat: missing file operand</span>)
        const target = resolvePath(cwd, argStr)
        const node = target && getNode(target)
        if (!node) return print(<span className="t-err">cat: {argStr}: No such file or directory</span>)
        if (node.type === 'folder') return print(<span className="t-err">cat: {argStr}: Is a directory</span>)
        if (node.type === 'txt') return print(node.content)
        if (node.type === 'webloc') return print(node.url)
        return print(<span className="t-err">cat: {argStr}: binary file — try `open` instead</span>)
      }

      case 'open': {
        if (!argStr) return print(<span className="t-err">open: missing operand</span>)
        const target = resolvePath(cwd, argStr)
        const node = target && getNode(target)
        if (!node) return print(<span className="t-err">open: {argStr}: No such file or directory</span>)
        openItem(node, target)
        print(<span className="t-dim">Opening {node.name}…</span>)
        break
      }

      case 'echo':
        print(argStr)
        break

      case 'clear':
        setLines([])
        break

      case 'date':
        print(new Date().toString())
        break

      case 'uname':
        print(`Darwin ${profile.machineName}.local 25.5.0 Darwin Kernel Version 25.5.0 ARM64`)
        break

      case 'sudo':
        print(<span className="t-err">{profile.username} is not in the sudoers file. This incident will be reported. Nice try though.</span>)
        break

      case 'exit':
        closeApp()
        break

      case 'contact':
        print([
          <span key="e"><span className="t-acc">Email    </span>{profile.email}</span>,
          <span key="g"><span className="t-acc">GitHub   </span>{profile.github}</span>,
          <span key="l"><span className="t-acc">LinkedIn </span>{profile.linkedin}</span>,
          <span key="w"><span className="t-acc">Web      </span>{profile.website}</span>,
        ])
        break

      case 'projects':
        print(projects.map((p) => (
          <span key={p.id}>
            <span className="t-dir">{p.name}</span>
            <span className="t-dim"> — {p.tagline} ({p.year})</span>
          </span>
        )))
        break

      case 'skills':
        print(skills.map((s) => (
          <span key={s.group}>
            <span className="t-acc">{s.group}: </span>
            {s.items.join(', ')}
          </span>
        )))
        break

      case 'neofetch': {
        const info = [
          [`${profile.username}@${profile.machineName}`, 't-acc'],
          ['─'.repeat(24), 't-dim'],
          [`User:     ${profile.name}`, ''],
          [`Role:     ${profile.role}`, ''],
          [`OS:       macOS Portfolio 26.5`, ''],
          [`Uptime:   ${profile.yearsOfExperience}+ years of experience`, ''],
          [`Shell:    zsh (simulated)`, ''],
          [`Projects: ${projects.length} shipped & counting`, ''],
          [`Contact:  ${profile.email}`, ''],
          [`Status:   ${profile.availableForWork ? '● Available for work' : '● Busy'}`, 't-exe'],
        ]
        print(
          <span style={{ display: 'flex', gap: 18 }}>
            <span className="t-exe" style={{ whiteSpace: 'pre' }}>{NEOFETCH_ASCII.join('\n')}</span>
            <span>
              {info.map(([txt, cls], i) => (
                <span key={i} className={cls}>{txt}{'\n'}</span>
              ))}
            </span>
          </span>
        )
        break
      }

      default:
        print(<span className="t-err">zsh: command not found: {cmd} — try `help`</span>)
    }
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      run(input)
      if (input.trim()) setHistory((h) => [input, ...h])
      setHIdx(-1)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length) {
        const idx = Math.min(hIdx + 1, history.length - 1)
        setHIdx(idx)
        setInput(history[idx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const idx = hIdx - 1
      setHIdx(idx)
      setInput(idx >= 0 ? history[idx] : '')
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const parts = input.split(/\s+/)
      const last = parts[parts.length - 1]
      if (!last) return
      const match = getChildren(cwd).find((c) => c.name.toLowerCase().startsWith(last.toLowerCase()))
      if (match) {
        parts[parts.length - 1] = match.name
        setInput(parts.join(' '))
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <div className="ios-terminal">
      <div className="ios-navbar">
        <div className="ios-navbar-title">Terminal</div>
        <div className="ios-navbar-side right">
          <button className="ios-navbtn ios-navbtn-text" onClick={() => setLines([])}>Clear</button>
        </div>
      </div>
      <div className="terminal" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
        {lines.map((l) => (
          <div key={l.id} className="tline">{l.node}</div>
        ))}
        <div className="tline t-in">
          {promptNode}
          <input
            ref={inputRef}
            type="search"
            name="terminal-command"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            data-lpignore="true"
            data-1p-ignore="true"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  )
}
