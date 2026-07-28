import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'

/** Apple-style boot screen: logo + progress bar, then fades out. */
export default function BootScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    let p = 0
    const t = setInterval(() => {
      // ease-out with a couple of "stalls", like a real boot
      p += Math.max(0.6, (100 - p) * 0.045) * (Math.random() < 0.12 ? 0.15 : 1)
      if (p >= 100) {
        p = 100
        clearInterval(t)
        setFading(true)
        setTimeout(onDone, 750)
      }
      setProgress(p)
    }, 40)
    return () => clearInterval(t)
  }, [onDone])

  return (
    <div className={`boot${fading ? ' fading' : ''}`}>
      <div className="boot-apple">
        <Icon name="apple" size={78} />
      </div>
      <div className="boot-bar">
        <div className="boot-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}
