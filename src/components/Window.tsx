import { useRef, type ReactNode, type PointerEvent as ReactPointerEvent } from 'react'
import { useI18n } from '../i18n/I18nContext'
import { useSound } from '../sound/SoundContext'
import { useWindows, type WindowState } from '../windows/windowStore'

type Props = {
  win: WindowState
  title: string
  icon?: ReactNode
  children: ReactNode
  /** Skip default content padding (for Word / Explorer / Outlook chrome) */
  bare?: boolean
}

export function Window({ win, title, icon, children, bare = false }: Props) {
  const { t } = useI18n()
  const { playClick } = useSound()
  const {
    activeId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximize,
    moveWindow,
    isMobile,
  } = useWindows()

  const dragRef = useRef<{
    ox: number
    oy: number
    sx: number
    sy: number
  } | null>(null)

  if (win.minimized) return null

  const active = activeId === win.id
  const fullscreen = win.maximized || isMobile

  const onPointerDownTitle = (e: ReactPointerEvent) => {
    // Don't start drag from control buttons
    if ((e.target as HTMLElement).closest('.win-titlebar__controls')) return
    if (fullscreen) return
    focusWindow(win.id)
    const el = e.currentTarget as HTMLElement
    el.setPointerCapture(e.pointerId)
    dragRef.current = {
      ox: e.clientX,
      oy: e.clientY,
      sx: win.x,
      sy: win.y,
    }
  }

  const onPointerMove = (e: ReactPointerEvent) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragRef.current.ox
    const dy = e.clientY - dragRef.current.oy
    moveWindow(
      win.id,
      Math.max(0, dragRef.current.sx + dx),
      Math.max(0, dragRef.current.sy + dy),
    )
  }

  const onPointerUp = (e: ReactPointerEvent) => {
    if (dragRef.current) {
      try {
        ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
      dragRef.current = null
    }
  }

  const style = fullscreen
    ? {
        left: 0,
        top: 0,
        width: '100%',
        height: 'calc(100% - 40px)',
        zIndex: win.zIndex,
      }
    : {
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      }

  return (
    <div
      className={`window absolute flex flex-col win-raised p-[2px] ${
        fullscreen ? 'is-mobile-fullscreen' : ''
      }`}
      style={style}
      onMouseDown={() => focusWindow(win.id)}
      role="dialog"
      aria-label={title}
    >
      <div
        className={`win-titlebar ${active ? '' : 'is-inactive'}`}
        onPointerDown={onPointerDownTitle}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onDoubleClick={(e) => {
          if ((e.target as HTMLElement).closest('.win-titlebar__controls')) return
          playClick()
          toggleMaximize(win.id)
        }}
      >
        <div className="flex items-center gap-1 min-w-0">
          {icon}
          <span className="win-titlebar__text">{title}</span>
        </div>
        <div
          className="win-titlebar__controls"
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="win-btn win-titlebar__btn"
            title={t.minimize}
            aria-label={t.minimize}
            onClick={(e) => {
              e.stopPropagation()
              playClick()
              minimizeWindow(win.id)
            }}
          >
            _
          </button>
          <button
            type="button"
            className="win-btn win-titlebar__btn"
            title={win.maximized ? t.restore : t.maximize}
            aria-label={win.maximized ? t.restore : t.maximize}
            onClick={(e) => {
              e.stopPropagation()
              playClick()
              toggleMaximize(win.id)
            }}
          >
            {win.maximized ? '❐' : '□'}
          </button>
          <button
            type="button"
            className="win-btn win-titlebar__btn"
            title={t.close}
            aria-label={t.close}
            onClick={(e) => {
              e.stopPropagation()
              playClick()
              closeWindow(win.id)
            }}
          >
            ✕
          </button>
        </div>
      </div>
      <div
        className={`flex-1 min-h-0 win-sunken m-[2px] text-[12px] leading-relaxed ${
          bare
            ? 'p-0 overflow-hidden'
            : 'p-3 overflow-auto win-scrollbar'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
