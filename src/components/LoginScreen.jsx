import { useState } from 'react'
import { useDesktop } from '../system/DesktopContext.jsx'
import { useClock } from '../system/useClock.js'
import Icon from './Icon.jsx'

export default function LoginScreen({ onLogin, onPersonaSelected, onSleep }) {
  const { wallpaper } = useDesktop()
  const now = useClock()
  const [loggingIn, setLoggingIn] = useState(false)

  const handleLogin = (persona) => {
    setLoggingIn(true)
    if (onPersonaSelected) onPersonaSelected(persona)
    setTimeout(() => onLogin(), 600)
  }

  const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false })
  const date = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className={`loginscreen-root ${loggingIn ? 'fading' : ''}`} style={{ backgroundImage: `url('/wallpapers/custom.jpg')` }}>
      <div className="loginscreen-bg-blur" />
      <div className="loginscreen-content">
        <div className="loginscreen-clock">{time}</div>
        <div className="loginscreen-date">{date}</div>
        
        <div className="loginscreen-users">
          <div className="loginscreen-user" onClick={() => handleLogin('designer')} data-cuelume-press="press">
            <div className="loginscreen-avatar">
              <Icon name="photos" size={50} />
            </div>
            <div className="loginscreen-name">João de Almeida</div>
            <div className="loginscreen-role">Brand Designer</div>
          </div>
          
          <div className="loginscreen-user" onClick={() => handleLogin('dev')} data-cuelume-press="press">
            <div className="loginscreen-avatar">
              <Icon name="terminal" size={50} />
            </div>
            <div className="loginscreen-name">João de Almeida</div>
            <div className="loginscreen-role">Creative Developer</div>
          </div>
        </div>
      </div>
      
      <div className="loginscreen-actions">
        <button className="loginscreen-action-btn" onClick={onSleep} data-cuelume-press="tick">
          <div className="loginscreen-action-icon"><Icon name="apple" size={16} /></div>
          <div className="loginscreen-action-label">Sleep</div>
        </button>
      </div>
    </div>
  )
}
