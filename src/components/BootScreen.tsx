import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
import { useSound } from '../sound/SoundContext'
import { IconOs } from './icons'

type Props = {
  onDone: () => void
}

export function BootScreen({ onDone }: Props) {
  const { t } = useI18n()
  const { playStartup } = useSound()
  const [progress, setProgress] = useState(0)
  const finished = useRef(false)

  useEffect(() => {
    finished.current = false
    const start = Date.now()
    const duration = 2200
    const id = window.setInterval(() => {
      const p = Math.min(100, Math.floor(((Date.now() - start) / duration) * 100))
      setProgress(p)
      if (p >= 100 && !finished.current) {
        finished.current = true
        window.clearInterval(id)
        playStartup()
        window.setTimeout(() => onDone(), 350)
      }
    }, 40)
    return () => window.clearInterval(id)
  }, [onDone, playStartup])

  return (
    <div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center p-6"
      style={{
        background: 'linear-gradient(180deg, #000080 0%, #1084d0 45%, #008080 100%)',
        color: '#ffffff',
        fontFamily: 'Tahoma, "MS Sans Serif", sans-serif',
      }}
    >
      <div
        className="win-raised p-6 max-w-md w-full text-center"
        style={{ background: '#c0c0c0', color: '#000' }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <IconOs className="w-12 h-12 pixel-icon" />
          <div className="text-left">
            <div className="text-lg font-bold leading-tight">Resume OS 95</div>
            <div className="text-[11px]">Publio Blenilio</div>
          </div>
        </div>

        <p className="m-0 mb-3 text-[13px] font-bold">{t.bootText}</p>

        <div
          className="w-full h-6 relative overflow-hidden"
          style={{
            background: '#fff',
            borderTop: '2px solid #808080',
            borderLeft: '2px solid #808080',
            borderRight: '2px solid #fff',
            borderBottom: '2px solid #fff',
          }}
        >
          <div
            className="h-full transition-[width] duration-75"
            style={{
              width: `${progress}%`,
              background:
                'repeating-linear-gradient(90deg, #000080 0 10px, #1084d0 10px 12px)',
            }}
          />
        </div>
        <p className="m-0 mt-2 text-[12px]">{progress}%</p>
      </div>
    </div>
  )
}
