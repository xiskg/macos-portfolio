// ============================================================================
//  VIRTUAL FILE SYSTEM
//  Builds a macOS-like folder tree from portfolio.js. Consumed by Finder,
//  Terminal, Spotlight, Desktop and the Dock.
//
//  Node shape:
//    { name, type, children?, content?, url?, external?, projectId?, expId? }
//  type: 'folder' | 'txt' | 'img' | 'webloc'
// ============================================================================

import {
  profile,
  projects,
  devProjects,
  experience,
  education,
  skills,
  metrics,
  resumeText,
  devResumeText,
  creditsText,
} from './portfolio.js'

export const ROOT = 'Macintosh HD'

let currentPersona = 'designer'
export const setFSPersona = (p) => { currentPersona = p }
export const isDev = () => currentPersona === 'dev'

const txt = (name, content) => ({ name, type: 'txt', content })
const img = (name, projectId) => ({ name, type: 'img', projectId })
const webloc = (name, url, external = true) => ({ name, type: 'webloc', url, external })
const folder = (name, children) => ({ name, type: 'folder', children })



const projectReadme = (p) => {
  if (p.stack) {
    return `${p.name.toUpperCase()}
${'='.repeat(p.name.length)}
Stack: ${p.stack.join(', ')}

${p.tagline}

${p.sections ? p.sections.map((s) => `${s.title.toUpperCase()}
${'-'.repeat(s.title.length)}
${s.text}`).join('\n\n') + '\n\n' : ''}${p.private ? 'Note: Repository is strictly private.' : `Source code: ${p.url}`}
${p.stars ? `Stars: ${p.stars} ★\n` : ''}`
  }
  return `${p.name.toUpperCase()}
${'='.repeat(p.name.length)}
${p.client} · ${p.year} · ${p.kind}

${p.tagline}

${p.sections
  .map((s) => `${s.title.toUpperCase()}
${'-'.repeat(s.title.length + 4)}
${s.text}`)
  .join('\n\n')}

DELIVERABLES
------------
${p.deliverables.map((t) => `  • ${t}`).join('\n')}

CLIENT FEEDBACK
---------------
${p.testimonial}
— ${p.testimonialAuthor}

Want the full case study walkthrough? Just ask: ${profile.email}
`
}

const jobText = (j) => `${j.role.toUpperCase()}
${j.company} · ${j.period} · ${j.location}
${'='.repeat(40)}

${j.bullets.map((b) => `  • ${b}`).join('\n\n')}
`

// ---------------------------------------------------------------------------
//  The tree
// ---------------------------------------------------------------------------

export function getTree() {
  const d = isDev()
  const activeProjects = d ? devProjects : projects
  const activeExp = d ? [] : experience // Dev has no experience array yet
  const resumeName = 'Resume.txt'
  const resumeTxt = d ? devResumeText : resumeText

  return folder(ROOT, [
    folder('Portfolio', activeProjects.flatMap((p) => [
      folder(p.name, [
        txt(d ? 'README.txt' : 'Case Study.txt', projectReadme(p)),
        ...(p.hero ? [img('Hero Image.png', p.id)] : []),
        ...(d && p.private ? [] : [webloc(d ? 'View Source.webloc' : 'Open in Safari.webloc', d ? p.url : `case:${p.id}`, !!d)]),
      ]),
    ])),
    ...(activeExp.length > 0 ? [
      folder('Work Experience', [
        ...activeExp.map((j) => txt(`${j.company} — ${j.role}.txt`, jobText(j))),
        webloc('LinkedIn Profile.webloc', profile.linkedin, true),
      ])
    ] : []),

    txt(resumeName, resumeTxt),
    txt('Credits.txt', creditsText),
    ...(d ? [webloc('GitHub.webloc', profile.github, true)] : []),
    webloc('LinkedIn.webloc', profile.linkedin, true),
    webloc('Contact.webloc', `mailto:${profile.email}`, true),
  ])
}

export function getDesktopItemNames() {
  const d = isDev()
  return [
    'Portfolio',
    ...(d ? [] : ['Work Experience']),

    'Resume.txt',
    'Credits.txt',
    ...(d ? ['GitHub.webloc'] : []),
    'LinkedIn.webloc',
    'Contact.webloc',
  ]
}

// ---------------------------------------------------------------------------
//  Helpers
// ---------------------------------------------------------------------------

export function getNode(pathArr) {
  if (!pathArr || pathArr.length === 0) return null
  if (pathArr[0] !== ROOT) return null
  let node = getTree()
  for (let i = 1; i < pathArr.length; i++) {
    if (node.type !== 'folder') return null
    node = node.children.find((c) => c.name === pathArr[i])
    if (!node) return null
  }
  return node
}

export function getChildren(pathArr) {
  const node = getNode(pathArr)
  return node && node.type === 'folder' ? node.children : []
}

export function flattenTree() {
  const out = []
  const walk = (node, pathArr) => {
    out.push({ node, pathArr })
    if (node.type === 'folder') {
      node.children.forEach((c) => walk(c, [...pathArr, c.name]))
    }
  }
  getTree().children.forEach((c) => walk(c, [ROOT, c.name]))
  return out
}

export function kindOf(node) {
  switch (node.type) {
    case 'folder':
      return 'Folder'
    case 'txt':
      return 'Plain Text'
    case 'img':
      return 'PNG Image'
    case 'webloc':
      return 'Web Link'
    default:
      return 'Document'
  }
}

export function sizeOf(node) {
  if (node.type === 'folder') return '—'
  if (node.type === 'txt') return `${(node.content?.length ?? 0) + 512} B`
  if (node.type === 'img') return '2.4 MB'
  return '1 KB'
}

export function iconForNode(node) {
  if (node.type === 'folder') return 'folder'
  if (node.type === 'img') return 'img'
  if (node.type === 'webloc') {
    const name = node.name.toLowerCase()
    if (name.includes('github')) return 'github'
    if (name.includes('linkedin')) return 'linkedin'
    if (name.includes('contact') || name.includes('mail')) return 'mail'
    if (name.includes('safari')) return 'safari'
    return 'webloc'
  }
  return 'txt'
}

// Resolve a terminal-style path against a cwd (array of names).
// Supports: ".", "..", "/", "~", absolute and relative paths, quoted names.
export function resolvePath(cwd, input) {
  if (!input || input === '.' || input === '~') return [...cwd]
  if (input === '/' || input === '~') return [ROOT]
  let parts = input.startsWith('/') || input.startsWith('~')
    ? [ROOT]
    : [...cwd]
  const segs = input.replace(/^~/, '').split('/').filter(Boolean)
  for (const seg of segs) {
    if (seg === '.') continue
    if (seg === '..') {
      if (parts.length > 1) parts.pop()
      continue
    }
    const node = getNode(parts)
    if (!node || node.type !== 'folder') return null
    if (!node.children.some((c) => c.name === seg)) return null
    parts.push(seg)
  }
  return parts
}

export function displayPath(pathArr) {
  if (pathArr.length <= 1) return '/'
  return '/' + pathArr.slice(1).join('/')
}
