import Icon from '../components/Icon.jsx'

// ============================================================================
//  IOSIcon — app icons for the iOS Home Screen.
//  Safari/Mail/Photos/Terminal reuse the real Apple assets (same artwork as
//  the desktop Dock, clipped to the iOS squircle). Everything else is
//  hand-drawn in the iOS style: Notes, Files, Settings, and web clips.
// ============================================================================

const REAL = new Set(['safari', 'mail', 'photos', 'terminal'])

function NotesArt() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <rect width="100" height="100" fill="#ffffff" />
      <rect width="100" height="26" fill="#f9d54a" />
      <rect x="16" y="42" width="68" height="5" rx="2.5" fill="#d6d6da" />
      <rect x="16" y="58" width="68" height="5" rx="2.5" fill="#d6d6da" />
      <rect x="16" y="74" width="44" height="5" rx="2.5" fill="#d6d6da" />
    </svg>
  )
}

function FilesArt() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id="iosf-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#55b6f8" />
          <stop offset="1" stopColor="#2a8bf2" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#iosf-bg)" />
      <path
        d="M20 38 q0-6 6-6 h14 l5 6 h29 q6 0 6 6 v26 q0 6-6 6 H26 q-6 0-6-6 Z"
        fill="#ffffff"
      />
    </svg>
  )
}

function SettingsArt() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id="ioss-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d7d7dc" />
          <stop offset="1" stopColor="#8e8e93" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#ioss-bg)" />
      <g transform="translate(50 50)" fill="#f2f2f7">
        {Array.from({ length: 12 }, (_, i) => (
          <rect
            key={i}
            x="-4.5"
            y="-46"
            width="9"
            height="16"
            rx="3"
            transform={`rotate(${i * 30})`}
          />
        ))}
        <circle r="31" />
        <circle r="13" fill="#9a9aa0" />
      </g>
    </svg>
  )
}

function WebclipMailArt() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <linearGradient id="iosw-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4bd663" />
          <stop offset="1" stopColor="#1fab3a" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#iosw-bg)" />
      <rect x="20" y="30" width="60" height="42" rx="6" fill="#ffffff" />
      <path d="M22 34 L50 56 L78 34" fill="none" stroke="#1fab3a" strokeWidth="4" />
    </svg>
  )
}

const ART = {
  notes: NotesArt,
  files: FilesArt,
  settings: SettingsArt,
  webmail: WebclipMailArt,
}

const REAL_BGS = {
  safari: '#ffffff',
  mail: '#2a8bf2',
  photos: '#ffffff',
  terminal: '#1e1e1e'
}

export default function IOSIcon({ id, size = 60 }) {
  if (REAL.has(id)) {
    return (
      <span className="ios-icon-img" style={{ width: size, height: size, background: REAL_BGS[id] || 'transparent' }}>
        <Icon name={id} size={size} />
      </span>
    )
  }
  if (id === 'github' || id === 'linkedin') {
    return (
      <span className="ios-icon-img" style={{ width: size, height: size }}>
        <Icon name={id} size={size} />
      </span>
    )
  }
  const Art = ART[id]
  return (
    <span className="ios-icon-img" style={{ width: size, height: size }}>
      {Art ? <Art /> : null}
    </span>
  )
}
