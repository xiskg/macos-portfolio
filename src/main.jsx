import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { bind as bindCuelume } from 'cuelume'
import App from './App.jsx'
import './styles/global.css'
import './styles/system.css'
import './styles/windows.css'
import './styles/panels.css'
import './styles/ios.css'
import './styles/loginscreen.css'
import './styles/welcomewidget.css'

bindCuelume()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
