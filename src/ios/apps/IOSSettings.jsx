import { useState } from 'react'
import { useDesktop, WALLPAPERS } from '../../system/DesktopContext.jsx'
import { profile } from '../../content/portfolio.js'
import Icon from '../../components/Icon.jsx'

// ============================================================================
//  Settings for iOS — the counterpart of the desktop Control Center + About
//  This Mac. Same shared DesktopContext state, so a toggle here is reflected
//  immediately in the status bar (e.g. Wi-Fi icon) and vice-versa.
// ============================================================================

function Switch({ on, onChange, label }) {
  return (
    <button
      className={`ios-switch${on ? ' on' : ''}`}
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
    >
      <span className="ios-switch-knob" />
    </button>
  )
}

function SwitchRow({ label, sub, on, onChange }) {
  return (
    <div className="ios-setting-row">
      <span className="ios-cell-name">
        {label}
        {sub && <span className="sub">{sub}</span>}
      </span>
      <Switch on={on} onChange={onChange} label={label} />
    </div>
  )
}

export default function IOSSettings() {
  const {
    toggles, toggle, dark, toggleDark,
    brightness, setBrightness, volume, setVolume,
    wallpaper, cycleWallpaper,
  } = useDesktop()
  const [screen, setScreen] = useState('root') // 'root' | 'about'

  if (screen === 'about') return <AboutScreen back={() => setScreen('root')} />

  return (
    <div className="ios-settings">
      <div className="ios-navbar">
        <div className="ios-navbar-title">Settings</div>
      </div>
      <div className="ios-scroll">
        <div className="ios-list">
          <button className="ios-cell" onClick={() => setScreen('about')}>
            <span className="ios-cell-name">About This iPhone</span>
            <span className="chev"><Icon name="chevR" size={15} /></span>
          </button>
        </div>

        <div className="ios-section-title">Connectivity</div>
        <div className="ios-list">
          <SwitchRow
            label="Wi-Fi"
            sub={toggles.wifi ? 'HomeNet 5G' : 'Off'}
            on={toggles.wifi}
            onChange={() => toggle('wifi')}
          />
          <SwitchRow label="Bluetooth" on={toggles.bluetooth} onChange={() => toggle('bluetooth')} />
          <SwitchRow
            label="AirDrop"
            sub={toggles.airdrop ? 'Contacts Only' : 'Off'}
            on={toggles.airdrop}
            onChange={() => toggle('airdrop')}
          />
        </div>

        <div className="ios-section-title">Focus</div>
        <div className="ios-list">
          <SwitchRow label="Do Not Disturb" on={toggles.dnd} onChange={() => toggle('dnd')} />
        </div>

        <div className="ios-section-title">Display &amp; Brightness</div>
        <div className="ios-list">
          <div className="ios-cell ios-cell-slider">
            <div className="cc-slider">
              <Icon name="sun" size={14} />
              <input
                type="range"
                min="35"
                max="100"
                value={Math.round(brightness * 100)}
                style={{ '--val': Math.round(brightness * 100) }}
                onChange={(e) => setBrightness(e.target.value / 100)}
                aria-label="Brightness"
              />
            </div>
          </div>
          <SwitchRow label="Dark Mode" on={dark} onChange={toggleDark} />
          <button className="ios-cell" onClick={cycleWallpaper}>
            <span className="ios-cell-name">Wallpaper</span>
            <span className="ios-cell-value">{WALLPAPERS[wallpaper]}</span>
            <span className="chev"><Icon name="chevR" size={15} /></span>
          </button>
        </div>

        <div className="ios-section-title">Sound</div>
        <div className="ios-list">
          <div className="ios-cell ios-cell-slider">
            <div className="cc-slider">
              <Icon name="speaker" size={14} />
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(volume * 100)}
                style={{ '--val': Math.round(volume * 100) }}
                onChange={(e) => setVolume(e.target.value / 100)}
                aria-label="Volume"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AboutScreen({ back }) {
  const { wallpaper } = useDesktop()

  return (
    <div className="ios-settings">
      <div className="ios-navbar">
        <div className="ios-navbar-side">
          <button className="ios-back" onClick={back}>
            <Icon name="chevL" size={18} /> Settings
          </button>
        </div>
        <div className="ios-navbar-title">About</div>
      </div>
      <div className="ios-scroll">
        <div className="ios-about">
          <div className="ios-about-phone">
            <div className={`wallpaper wp-${wallpaper}`} />
          </div>
          <h1>{profile.machineName}</h1>
          <div className="ios-about-rows">
            <div className="ios-about-row"><span>Software</span><b>iOS Portfolio 26.5</b></div>
            <div className="ios-about-row"><span>Model</span><b>iPhone (Simulated)</b></div>
            <div className="ios-about-row"><span>Chip</span><b>JavaScript V8</b></div>
            <div className="ios-about-row"><span>Storage</span><b>as many tabs as you dare</b></div>
            <div className="ios-about-row"><span>Owner</span><b>{profile.name}</b></div>
          </div>
          <div className="ios-about-credit">
            Portfolio of {profile.name} — built with React + Vite, open source (MIT).
            <br />
            ™ &amp; © {new Date().getFullYear()} — not affiliated with Apple Inc.
          </div>
        </div>
      </div>
    </div>
  )
}
