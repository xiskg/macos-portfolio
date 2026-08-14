import Icon from './Icon.jsx'

export default function MobileNotice() {
  return (
    <div className="mobile-notice">
      {/* Background wallpaper compatível com o macOS desktop */}
      <div className="wallpaper wp-0" />
      
      <div className="mobile-card">
        <Icon name="monitor" size={64} />
        <h2>Better on Desktop</h2>
        <p>This macOS simulation portfolio is designed for larger screens and a mouse.</p>
        <div className="mobile-note">
          Please visit on your computer for the full experience.
        </div>
      </div>
    </div>
  )
}
