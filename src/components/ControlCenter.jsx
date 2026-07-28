import { useEffect } from 'react'
import { useDesktop } from '../system/DesktopContext.jsx'
import Icon from './Icon.jsx'

export default function ControlCenter() {
  const {
    overlays, setOverlay, toggles, toggle, dark, toggleDark,
    brightness, setBrightness, volume, setVolume,
  } = useDesktop()

  useEffect(() => {
    if (!overlays.cc) return
    const down = (e) => {
      if (!e.target.closest('.cc') && !e.target.closest('.mb-status')) setOverlay('cc', false)
    }
    const key = (e) => e.key === 'Escape' && setOverlay('cc', false)
    window.addEventListener('pointerdown', down)
    window.addEventListener('keydown', key)
    return () => {
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('keydown', key)
    }
  }, [overlays.cc, setOverlay])

  if (!overlays.cc) return null

  const Toggle = ({ name, icon, label, sub }) => (
    <div className="cc-row">
      <button
        className={`cc-toggle${toggles[name] ? ' on' : ''}`}
        onClick={() => toggle(name)}
        aria-label={label}
      >
        <Icon name={icon} size={16} />
      </button>
      <div className="cc-label">
        <div className="l1">{label}</div>
        <div className="l2">{sub ?? (toggles[name] ? 'On' : 'Off')}</div>
      </div>
    </div>
  )

  return (
    <div className="cc">
      <div className="cc-card">
        <Toggle name="wifi" icon="wifi" label="Wi-Fi" sub={toggles.wifi ? 'HomeNet 5G' : 'Off'} />
        <Toggle name="bluetooth" icon="bluetooth" label="Bluetooth" />
      </div>
      <div className="cc-card">
        <Toggle name="airdrop" icon="airdrop" label="AirDrop" sub={toggles.airdrop ? 'Contacts Only' : 'Off'} />
        <Toggle name="dnd" icon="moon" label="Focus" sub={toggles.dnd ? 'Do Not Disturb' : 'Off'} />
      </div>

      <div className="cc-card wide">
        <div className="cc-row">
          <button
            className={`cc-toggle${dark ? ' on' : ''}`}
            onClick={toggleDark}
            aria-label="Dark Mode"
          >
            <Icon name="moon" size={16} />
          </button>
          <div className="cc-label">
            <div className="l1">Dark Mode</div>
            <div className="l2">{dark ? 'On' : 'Off'}</div>
          </div>
        </div>
      </div>

      <div className="cc-card wide">
        <div className="cc-title"><Icon name="sun" size={16} /> Display</div>
        <div className="cc-slider">
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

      <div className="cc-card wide">
        <div className="cc-title"><Icon name="speaker" size={16} /> Sound</div>
        <div className="cc-slider">
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
  )
}
