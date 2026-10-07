import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type EasterContextValue = {
  bsod: boolean
  showBsod: () => void
  dismissBsod: () => void
}

const EasterContext = createContext<EasterContextValue | null>(null)

export function EasterProvider({ children }: { children: ReactNode }) {
  const [bsod, setBsod] = useState(false)

  const showBsod = useCallback(() => setBsod(true), [])
  const dismissBsod = useCallback(() => setBsod(false), [])

  const value = useMemo(
    () => ({ bsod, showBsod, dismissBsod }),
    [bsod, showBsod, dismissBsod],
  )

  return (
    <EasterContext.Provider value={value}>{children}</EasterContext.Provider>
  )
}

export function useEaster() {
  const ctx = useContext(EasterContext)
  if (!ctx) throw new Error('useEaster must be used within EasterProvider')
  return ctx
}
