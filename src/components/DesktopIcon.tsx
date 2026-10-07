import { useRef, type ReactNode } from 'react'
import { useSound } from '../sound/SoundContext'
import { useWindows } from '../windows/windowStore'

type Props = {
  label: string
  icon: ReactNode
  selected: boolean
  onSelect: () => void
  onOpen: () => void
}

export function DesktopIcon({ label, icon, selected, onSelect, onOpen }: Props) {
  const { playClick } = useSound()
  const { isMobile } = useWindows()
  const lastTap = useRef(0)

  const handleActivate = () => {
    playClick()
    onOpen()
  }

  return (
    <button
      type="button"
      className={`desktop-icon ${selected ? 'is-selected' : ''}`}
      onClick={() => {
        if (isMobile) {
          const now = Date.now()
          if (now - lastTap.current < 350) {
            handleActivate()
          } else {
            onSelect()
            // single tap opens on mobile for better UX per plan
            handleActivate()
          }
          lastTap.current = now
          return
        }
        onSelect()
      }}
      onDoubleClick={() => {
        if (!isMobile) handleActivate()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') handleActivate()
      }}
    >
      {icon}
      <span className="desktop-icon__label">{label}</span>
    </button>
  )
}
