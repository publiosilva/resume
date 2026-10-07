import { useEffect, useState } from 'react'

const EVENTS = [
  'mousemove',
  'mousedown',
  'keydown',
  'touchstart',
  'wheel',
  'pointerdown',
] as const

/** Becomes true after `ms` without user input; resets on activity. */
export function useIdle(ms: number, enabled = true) {
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setIdle(false)
      return
    }

    let timer = window.setTimeout(() => setIdle(true), ms)

    const bump = () => {
      setIdle(false)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setIdle(true), ms)
    }

    for (const ev of EVENTS) {
      window.addEventListener(ev, bump, { passive: true })
    }

    return () => {
      window.clearTimeout(timer)
      for (const ev of EVENTS) {
        window.removeEventListener(ev, bump)
      }
    }
  }, [ms, enabled])

  return idle
}
