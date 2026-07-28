import { useDesktop } from '../system/DesktopContext.jsx'
import { profile } from '../content/portfolio.js'

export default function AboutMac() {
  const { wallpaper, pushNotification } = useDesktop()

  const moreInfo = () =>
    pushNotification({
      app: 'Finder',
      icon: 'finder',
      title: 'About this Mac',
      body: 'This “Mac” is a React app. Chip: JavaScript V8. Memory: as many tabs as you dare.',
    })

  const softwareUpdate = () =>
    pushNotification({
      app: 'Finder',
      icon: 'finder',
      title: 'Software Update',
      body: 'macOS Portfolio 26.5 is up to date. ✓',
    })

  return (
    <div className="about">
      <div className="about-mac">
        <div className="screen">
          <div className={`wallpaper wp-${wallpaper}`} />
        </div>
        <div className="base" />
      </div>
      <div className="about-info">
        <h2>macOS Tahoe</h2>
        <div className="arow"><b>Version</b> 26.5 (Build 25F84)</div>
        <div className="arow"><b>MacBook Pro</b> 14-inch, Nov 2024</div>
        <div className="arow"><b>Chip</b> Apple M4 Pro</div>
        <div className="arow"><b>Memory</b> 24 GB</div>
        <div className="arow"><b>Startup disk</b> Macintosh HD</div>
        <div className="about-btns">
          <button onClick={moreInfo}>More Info…</button>
          <button onClick={softwareUpdate}>Software Update…</button>
        </div>
        <div className="about-credit">
          Portfolio of {profile.name} — built with React + Vite, open source (MIT). See Credits.txt on the Desktop.
          <br />
          ™ & © {new Date().getFullYear()} — not affiliated with Apple Inc.
        </div>
      </div>
    </div>
  )
}
