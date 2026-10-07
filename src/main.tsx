import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// GitHub Pages SPA redirect support (pairs with public/404.html)
;(function () {
  const l = window.location
  if (l.search[1] === '/') {
    const decoded =
      l.search
        .slice(1)
        .split('&')
        .map((s) => s.replace(/~and~/g, '&'))
        .join('?') + l.hash
    window.history.replaceState(null, '', l.pathname.slice(0, -1) + decoded)
  }
})()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
