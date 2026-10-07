import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type WallpaperId = 'teal' | 'navy' | 'matrix' | 'purple'

export const WALLPAPERS: Record<WallpaperId, string> = {
  teal: '#008080',
  navy: '#000080',
  matrix: '#0a0f0a',
  purple: '#1a1033',
}

type ThemeContextValue = {
  wallpaper: WallpaperId
  setWallpaper: (id: WallpaperId) => void
  wallpaperColor: string
}

const WALL_KEY = 'resume-os-wallpaper'

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readWallpaper(): WallpaperId {
  try {
    const stored = localStorage.getItem(WALL_KEY)
    if (stored && stored in WALLPAPERS) return stored as WallpaperId
  } catch {
    /* ignore */
  }
  return 'teal'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [wallpaper, setWallpaperState] = useState<WallpaperId>(readWallpaper)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'classic')
    try {
      localStorage.removeItem('resume-os-theme')
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--win-desktop',
      WALLPAPERS[wallpaper],
    )
  }, [wallpaper])

  const setWallpaper = useCallback((id: WallpaperId) => {
    setWallpaperState(id)
    try {
      localStorage.setItem(WALL_KEY, id)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(
    () => ({
      wallpaper,
      setWallpaper,
      wallpaperColor: WALLPAPERS[wallpaper],
    }),
    [wallpaper, setWallpaper],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
