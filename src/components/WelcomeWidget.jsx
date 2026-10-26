import { useRef, useState } from 'react'
import { isDev } from '../content/fileSystem.js'

function MagneticText({ text, isTitle }) {
  const chars = text.split("")
  const baseWeight = isTitle ? 200 : 400
  const maxWeight = isTitle ? 800 : 800
  const falloff = isTitle ? 220 : 120

  const [weights, setWeights] = useState(chars.map(() => baseWeight))
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const mouseX = e.clientX

    const charElements = containerRef.current.children
    const newWeights = Array.from(charElements).map((el) => {
      const elRect = el.getBoundingClientRect()
      const elCenter = elRect.left + elRect.width / 2
      const distance = Math.abs(mouseX - elCenter)
      
      let w = maxWeight - (distance / falloff) * (maxWeight - baseWeight)
      w = Math.max(baseWeight, Math.min(maxWeight, w))
      
      return Math.round(w / 100) * 100
    })
    setWeights(newWeights)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setWeights(chars.map(() => baseWeight))
  }

  return (
    <div 
      className={isTitle ? "ww-word" : "ww-top"} 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
    >
      {chars.map((c, i) => (
        <span 
          key={i} 
          className={isTitle ? "ww-char" : "ww-char-small"} 
          style={{ 
            fontWeight: weights[i],
            transition: isHovered ? 'none' : 'font-weight 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
            whiteSpace: c === ' ' ? 'pre' : 'normal'
          }}
        >
          {c}
        </span>
      ))}
    </div>
  )
}

export default function WelcomeWidget() {
  const dev = isDev()
  const word = dev ? "Workspace" : "Portfolio"

  return (
    <div className="welcome-widget">
      <MagneticText text="Hey, I'm João! Welcome to my" isTitle={false} />
      <MagneticText text={word} isTitle={true} />
      <div className="ww-bottom">Explore it like a Mac.</div>
      <a className="product-portfolio-link" href="/product-design/">Product design portfolio <span aria-hidden="true">→</span></a>
    </div>
  )
}
