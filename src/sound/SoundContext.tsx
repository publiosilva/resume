import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type SoundContextValue = {
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  playClick: () => void
  playStartup: () => void
}

const STORAGE_KEY = 'resume-os-sound'

const SoundContext = createContext<SoundContextValue | null>(null)

function readEnabled(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(readEnabled)
  const ctxRef = useRef<AudioContext | null>(null)

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext()
    }
    return ctxRef.current
  }, [])

  const setEnabled = useCallback((next: boolean) => {
    setEnabledState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
    } catch {
      /* ignore */
    }
  }, [])

  const tone = useCallback(
    (freq: number, duration: number, type: OscillatorType = 'square', gain = 0.04) => {
      if (!enabled) return
      try {
        const ctx = getCtx()
        void ctx.resume()
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = type
        osc.frequency.value = freq
        g.gain.value = gain
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)
        osc.connect(g)
        g.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + duration)
      } catch {
        /* ignore audio errors */
      }
    },
    [enabled, getCtx],
  )

  const playClick = useCallback(() => {
    tone(800, 0.04, 'square', 0.03)
  }, [tone])

  const playStartup = useCallback(() => {
    if (!enabled) return
    tone(523.25, 0.12, 'square', 0.05)
    setTimeout(() => tone(659.25, 0.12, 'square', 0.05), 100)
    setTimeout(() => tone(783.99, 0.18, 'square', 0.05), 200)
  }, [enabled, tone])

  const value = useMemo(
    () => ({ enabled, setEnabled, playClick, playStartup }),
    [enabled, setEnabled, playClick, playStartup],
  )

  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  )
}

export function useSound() {
  const ctx = useContext(SoundContext)
  if (!ctx) throw new Error('useSound must be used within SoundProvider')
  return ctx
}
