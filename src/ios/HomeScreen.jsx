import { useApps } from '../system/ios/AppSwitcher.jsx'
import { mailInbox, profile } from '../content/portfolio.js'
import IOSIcon from './IOSIcon.jsx'

// ============================================================================
//  HomeScreen — app grid + Dock. Web clips (GitHub/LinkedIn/Email) are the
//  iOS counterparts of the .webloc files on the macOS desktop.
// ============================================================================

const GRID_APPS = [
  { id: 'files', name: 'Files' },
  { id: 'terminal', name: 'Terminal' },
  { id: 'settings', name: 'Settings' },
  { id: 'github', name: 'GitHub', url: profile.github },
  { id: 'linkedin', name: 'LinkedIn', url: profile.linkedin },
  { id: 'webmail', name: 'Email Me', url: `mailto:${profile.email}` },
]

const DOCK_APPS = [
  { id: 'safari', name: 'Safari' },
  { id: 'mail', name: 'Mail' },
  { id: 'photos', name: 'Photos' },
  { id: 'notes', name: 'Notes' },
]

export default function HomeScreen() {
  const { openApp, openApps } = useApps()

  // Opening Mail marks it as "seen" — the badge goes away, iOS-style.
  const mailBadge = openApps.some((a) => a.id === 'mail')
    ? 0
    : mailInbox.filter((m) => m.unread).length

  const launch = (item) => (e) => {
    if (item.url) {
      if (item.url.startsWith('mailto:')) window.location.href = item.url
      else window.open(item.url, '_blank', 'noopener')
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    openApp(item.id, {}, rect)
  }

  const AppButton = ({ item }) => (
    <button className="ios-app" onClick={launch(item)} aria-label={item.name}>
      <span className="ios-icon">
        <IOSIcon id={item.id} size={60} />
        {item.id === 'mail' && mailBadge > 0 && <span className="ios-badge">{mailBadge}</span>}
      </span>
      <span className="ios-app-name">{item.name}</span>
    </button>
  )

  return (
    <div className="ios-home">
      <div className="ios-grid">
        {GRID_APPS.map((a) => (
          <AppButton key={a.id} item={a} />
        ))}
      </div>
      <div className="ios-dock">
        {DOCK_APPS.map((a) => (
          <AppButton key={a.id} item={a} />
        ))}
      </div>
    </div>
  )
}
