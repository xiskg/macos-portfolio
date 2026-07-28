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
  experience,
  education,
  skills,
  metrics,
  resumeText,
  devResumeText,
  creditsText,
  aboutParagraphs,
} from './portfolio.js'

export const ROOT = 'Macintosh HD'

const txt = (name, content) => ({ name, type: 'txt', content })
const img = (name, projectId) => ({ name, type: 'img', projectId })
const webloc = (name, url, external = true) => ({ name, type: 'webloc', url, external })
const folder = (name, children) => ({ name, type: 'folder', children })

const aboutText = `ABOUT ME
========

${aboutParagraphs.join('\n\n')}

SKILLS
------
${skills.map((s) => `${s.group}:\n  ${s.items.join(' · ')}`).join('\n\n')}

KEY NUMBERS
-----------
${metrics.map((m) => `  ${m.value}  ${m.label}`).join('\n')}

EDUCATION
---------
${education.map((e) => `${e.degree}\n${e.school} · ${e.period}\n${e.detail}`).join('\n\n')}
`

const projectReadme = (p) => `${p.name.toUpperCase()}
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

const jobText = (j) => `${j.role.toUpperCase()}
${j.company} · ${j.period} · ${j.location}
${'='.repeat(40)}

${j.bullets.map((b) => `  • ${b}`).join('\n\n')}
`

// ---------------------------------------------------------------------------
//  The tree
// ---------------------------------------------------------------------------

export const tree = folder(ROOT, [
  folder('Portfolio', projects.flatMap((p) => [
    folder(p.name, [
      txt('Case Study.txt', projectReadme(p)),
      img('Hero Image.png', p.id),
      webloc('Open in Safari.webloc', `case:${p.id}`, false),
    ]),
  ])),
  folder('Work Experience', [
    ...experience.map((j) => txt(`${j.company} — ${j.role}.txt`, jobText(j))),
    webloc('LinkedIn Profile.webloc', profile.linkedin, true),
  ]),
  txt('About Me.txt', aboutText),
  txt('Resume.txt', resumeText),
  txt('Dev Resume.txt', devResumeText),
  txt('Credits.txt', creditsText),
  webloc('GitHub.webloc', profile.github, true),
  webloc('LinkedIn.webloc', profile.linkedin, true),
  webloc('Contact.webloc', `mailto:${profile.email}`, true),
])

// Items shown on the Desktop itself (names must exist at the root level).
export const desktopItemNames = [
  'Portfolio',
  'Work Experience',
  'About Me.txt',
  'Resume.txt',
  'Dev Resume.txt',
  'Credits.txt',
  'GitHub.webloc',
  'LinkedIn.webloc',
  'Contact.webloc',
]

// ---------------------------------------------------------------------------
//  Helpers
// ---------------------------------------------------------------------------

export function getNode(pathArr) {
  if (!pathArr || pathArr.length === 0) return null
  if (pathArr[0] !== ROOT) return null
  let node = tree
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
  tree.children.forEach((c) => walk(c, [ROOT, c.name]))
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
  if (node.type === 'webloc') return 'webloc'
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
