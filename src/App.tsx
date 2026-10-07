import { useCallback, useState } from 'react'
import { BootScreen } from './components/BootScreen'
import { Bsod } from './components/Bsod'
import { Clippy } from './components/Clippy'
import { Desktop } from './components/Desktop'
import { PipesScreensaver } from './components/PipesScreensaver'
import { Taskbar } from './components/Taskbar'
import { EasterProvider, useEaster } from './easter/EasterContext'
import { useIdle } from './hooks/useIdle'
import { I18nProvider } from './i18n/I18nContext'
import { SoundProvider } from './sound/SoundContext'
import { ThemeProvider } from './theme/ThemeContext'
import { WindowProvider } from './windows/windowStore'

function Shell() {
  const [booted, setBooted] = useState(false)
  const handleBootDone = useCallback(() => setBooted(true), [])
  const { bsod, dismissBsod } = useEaster()
  const idle = useIdle(45_000, booted && !bsod)

  return (
    <div className="relative w-full h-full overflow-hidden">
      {!booted ? (
        <BootScreen onDone={handleBootDone} />
      ) : (
        <>
          <Desktop />
          <Taskbar />
          <Clippy />
          {idle && !bsod ? (
            <PipesScreensaver onDismiss={() => undefined} />
          ) : null}
        </>
      )}
      {bsod ? <Bsod onDismiss={dismissBsod} /> : null}
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <SoundProvider>
          <WindowProvider>
            <EasterProvider>
              <Shell />
            </EasterProvider>
          </WindowProvider>
        </SoundProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}
