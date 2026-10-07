import { useEffect, useMemo, useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
import { useSound } from '../sound/SoundContext'
import { useWindows } from '../windows/windowStore'

const STORAGE_KEY = 'resume-os-clippy-dismissed'

function readDismissed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function Clippy() {
  const { t } = useI18n()
  const { playClick } = useSound()
  const { windows } = useWindows()
  const [dismissed, setDismissed] = useState(readDismissed)
  const [visible, setVisible] = useState(false)
  const [sessionDone, setSessionDone] = useState(false)
  const [tipIndex, setTipIndex] = useState(0)
  const [maxOpened, setMaxOpened] = useState(0)

  const tips = useMemo(
    () => [t.clippyTip1, t.clippyTip2, t.clippyTip3, t.clippyTip4],
    [t.clippyTip1, t.clippyTip2, t.clippyTip3, t.clippyTip4],
  )

  useEffect(() => {
    setMaxOpened((m) => Math.max(m, windows.length))
  }, [windows.length])

  useEffect(() => {
    if (dismissed || sessionDone || visible) return

    const reveal = () => {
      setTipIndex(Math.floor(Math.random() * tips.length))
      setVisible(true)
      setSessionDone(true)
    }

    if (maxOpened >= 3) {
      reveal()
      return
    }
    const id = window.setTimeout(() => {
      if (!readDismissed()) reveal()
    }, 20000)
    return () => window.clearTimeout(id)
  }, [dismissed, sessionDone, visible, maxOpened, tips.length])

  if (dismissed || !visible) return null

  const hide = (forever: boolean) => {
    playClick()
    setVisible(false)
    setSessionDone(true)
    if (forever) {
      setDismissed(true)
      try {
        localStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* ignore */
      }
    }
  }

  return (
    <div className="fixed bottom-12 right-3 z-[500] flex items-end gap-2 max-w-[260px]">
      <div className="win-raised bg-[var(--win-face)] p-2 relative">
        <div
          className="absolute -bottom-1 right-8 w-3 h-3 bg-[var(--win-face)] rotate-45 border-r border-b border-[var(--win-face-darker)]"
          aria-hidden
        />
        <p className="m-0 mb-1 text-[11px] font-bold">{t.clippyName}</p>
        <p className="m-0 mb-2 text-[12px] leading-snug">{tips[tipIndex]}</p>
        <div className="flex gap-1 justify-end">
          <button type="button" className="win-btn" onClick={() => hide(false)}>
            {t.clippyOk}
          </button>
          <button type="button" className="win-btn" onClick={() => hide(true)}>
            {t.clippyDontShow}
          </button>
        </div>
      </div>
      <svg
        width="56"
        height="64"
        viewBox="0 0 56 64"
        className="shrink-0 drop-shadow"
        aria-hidden
      >
        <ellipse cx="28" cy="58" rx="14" ry="4" fill="#000" opacity="0.2" />
        <path
          d="M20 8 C12 8 10 18 14 28 L18 48 C19 52 24 54 28 54 C32 54 37 52 38 48 L42 28 C46 18 44 8 36 8 Z"
          fill="#c0c0c0"
          stroke="#404040"
        />
        <path
          d="M22 10 C16 10 15 18 18 26 L21 44 C22 47 25 48 28 48 C31 48 34 47 35 44 L38 26 C41 18 40 10 34 10 Z"
          fill="#e8e8e8"
          stroke="#808080"
        />
        <circle cx="22" cy="22" r="3" fill="#fff" stroke="#000" />
        <circle cx="34" cy="22" r="3" fill="#fff" stroke="#000" />
        <circle cx="22.5" cy="22.5" r="1.2" fill="#000" />
        <circle cx="34.5" cy="22.5" r="1.2" fill="#000" />
        <path d="M24 30 Q28 34 32 30" fill="none" stroke="#000" strokeWidth="1.2" />
        <rect x="24" y="4" width="8" height="8" rx="1" fill="#a0a0a0" stroke="#404040" />
      </svg>
    </div>
  )
}
