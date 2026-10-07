import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type WindowId =
  | 'about'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'contact'
  | 'control'
  | 'mines'
  | 'explorer'
  | 'trash'

export type WindowState = {
  id: WindowId
  x: number
  y: number
  width: number
  height: number
  zIndex: number
  minimized: boolean
  maximized: boolean
  prev?: { x: number; y: number; width: number; height: number }
}

type WindowContextValue = {
  windows: WindowState[]
  activeId: WindowId | null
  openWindow: (id: WindowId) => void
  closeWindow: (id: WindowId) => void
  focusWindow: (id: WindowId) => void
  minimizeWindow: (id: WindowId) => void
  toggleMaximize: (id: WindowId) => void
  moveWindow: (id: WindowId, x: number, y: number) => void
  isMobile: boolean
}

const DEFAULTS: Record<
  WindowId,
  { width: number; height: number; x: number; y: number }
> = {
  about: { width: 520, height: 420, x: 80, y: 40 },
  experience: { width: 580, height: 480, x: 120, y: 50 },
  skills: { width: 560, height: 420, x: 160, y: 70 },
  projects: { width: 500, height: 380, x: 200, y: 60 },
  contact: { width: 420, height: 320, x: 240, y: 90 },
  control: { width: 400, height: 360, x: 260, y: 80 },
  mines: { width: 300, height: 400, x: 300, y: 60 },
  explorer: { width: 520, height: 380, x: 100, y: 70 },
  trash: { width: 420, height: 320, x: 180, y: 100 },
}

const WindowContext = createContext<WindowContextValue | null>(null)

export function WindowProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [activeId, setActiveId] = useState<WindowId | null>(null)
  const [zCounter, setZCounter] = useState(10)
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= 768,
  )

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const openWindow = useCallback(
    (id: WindowId) => {
      setWindows((prev) => {
        const existing = prev.find((w) => w.id === id)
        const nextZ = zCounter + 1
        setZCounter(nextZ)
        setActiveId(id)

        if (existing) {
          return prev.map((w) =>
            w.id === id ? { ...w, minimized: false, zIndex: nextZ } : w,
          )
        }

        const def = DEFAULTS[id]
        const offset = (prev.length % 6) * 24
        return [
          ...prev,
          {
            id,
            x: def.x + offset,
            y: def.y + offset,
            width: def.width,
            height: def.height,
            zIndex: nextZ,
            minimized: false,
            maximized: isMobile,
          },
        ]
      })
    },
    [zCounter, isMobile],
  )

  const closeWindow = useCallback((id: WindowId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
    setActiveId((cur) => (cur === id ? null : cur))
  }, [])

  const focusWindow = useCallback(
    (id: WindowId) => {
      setActiveId(id)
      const nextZ = zCounter + 1
      setZCounter(nextZ)
      setWindows((prev) =>
        prev.map((w) =>
          w.id === id ? { ...w, minimized: false, zIndex: nextZ } : w,
        ),
      )
    },
    [zCounter],
  )

  const minimizeWindow = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    )
    setActiveId((cur) => (cur === id ? null : cur))
  }, [])

  const toggleMaximize = useCallback((id: WindowId) => {
    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w
        if (w.maximized) {
          return {
            ...w,
            maximized: false,
            x: w.prev?.x ?? w.x,
            y: w.prev?.y ?? w.y,
            width: w.prev?.width ?? w.width,
            height: w.prev?.height ?? w.height,
            prev: undefined,
          }
        }
        return {
          ...w,
          maximized: true,
          prev: { x: w.x, y: w.y, width: w.width, height: w.height },
        }
      }),
    )
  }, [])

  const moveWindow = useCallback((id: WindowId, x: number, y: number) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id && !w.maximized ? { ...w, x, y } : w)),
    )
  }, [])

  const value = useMemo(
    () => ({
      windows,
      activeId,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      toggleMaximize,
      moveWindow,
      isMobile,
    }),
    [
      windows,
      activeId,
      openWindow,
      closeWindow,
      focusWindow,
      minimizeWindow,
      toggleMaximize,
      moveWindow,
      isMobile,
    ],
  )

  return (
    <WindowContext.Provider value={value}>{children}</WindowContext.Provider>
  )
}

export function useWindows() {
  const ctx = useContext(WindowContext)
  if (!ctx) throw new Error('useWindows must be used within WindowProvider')
  return ctx
}
