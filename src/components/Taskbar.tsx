import { useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
import { useSound } from '../sound/SoundContext'
import { useWindows, type WindowId } from '../windows/windowStore'
import { Clock } from './Clock'
import { IconStart } from './icons'
import { StartMenu } from './StartMenu'

function useWindowTitle(id: WindowId): string {
  const { t } = useI18n()
  switch (id) {
    case 'about':
      return t.about
    case 'experience':
      return t.experience
    case 'skills':
      return t.skills
    case 'projects':
      return t.projects
    case 'contact':
      return t.contact
    case 'control':
      return t.controlPanel
    case 'mines':
      return t.icons.mines
    case 'explorer':
      return t.windowsExplorer
    case 'trash':
      return t.icons.trash
  }
}

function TaskButton({ id }: { id: WindowId }) {
  const title = useWindowTitle(id)
  const { playClick } = useSound()
  const { windows, activeId, focusWindow, minimizeWindow } = useWindows()
  const win = windows.find((w) => w.id === id)
  if (!win) return null

  const pressed = activeId === id && !win.minimized

  return (
    <button
      type="button"
      className={`win-btn truncate max-w-[160px] text-left ${
        pressed ? 'is-pressed' : ''
      }`}
      onClick={() => {
        playClick()
        if (win.minimized) {
          focusWindow(id)
        } else if (activeId === id) {
          minimizeWindow(id)
        } else {
          focusWindow(id)
        }
      }}
      title={title}
    >
      {title}
    </button>
  )
}

export function Taskbar() {
  const { t } = useI18n()
  const { playClick } = useSound()
  const { windows } = useWindows()
  const [startOpen, setStartOpen] = useState(false)

  return (
    <div
      className="absolute bottom-0 left-0 right-0 h-10 win-raised flex items-center gap-1 px-1 z-[200]"
      style={{ background: 'var(--win-taskbar)' }}
    >
      <div className="relative">
        <button
          type="button"
          className={`win-btn flex items-center gap-1 font-bold px-2 min-w-[70px] ${
            startOpen ? 'is-pressed' : ''
          }`}
          onClick={() => {
            playClick()
            setStartOpen((v) => !v)
          }}
        >
          <IconStart />
          {t.start}
        </button>
        <StartMenu open={startOpen} onClose={() => setStartOpen(false)} />
      </div>

      <div className="flex-1 flex items-center gap-1 overflow-x-auto min-w-0 px-1">
        {windows.map((w) => (
          <TaskButton key={w.id} id={w.id} />
        ))}
      </div>

      <Clock />
    </div>
  )
}
