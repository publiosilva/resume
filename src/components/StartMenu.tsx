import { useEaster } from '../easter/EasterContext'
import { useI18n } from '../i18n/I18nContext'
import { useSound } from '../sound/SoundContext'
import { useWindows, type WindowId } from '../windows/windowStore'
import {
  IconControl,
  IconExplorer,
  IconMail,
  IconMines,
} from './icons'

type Props = {
  open: boolean
  onClose: () => void
}

export function StartMenu({ open, onClose }: Props) {
  const { t, lang, setLang } = useI18n()
  const { enabled, setEnabled, playClick } = useSound()
  const { openWindow } = useWindows()
  const { showBsod } = useEaster()

  if (!open) return null

  const go = (id: WindowId) => {
    playClick()
    openWindow(id)
    onClose()
  }

  const item =
    'w-full flex items-center gap-2 px-2 py-1 text-left hover:bg-[var(--win-highlight)] hover:text-[var(--win-highlight-text)]'

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[90] cursor-default bg-transparent border-0"
        aria-label="Close start menu"
        onClick={onClose}
      />
      <div className="absolute bottom-10 left-0 z-[100] w-[260px] win-raised flex">
        <div
          className="w-7 flex items-end justify-center pb-2"
          style={{
            background: 'linear-gradient(180deg, #000080, #1084d0)',
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: 2,
          }}
        >
          Resume OS 95
        </div>
        <div className="flex-1 bg-[var(--win-face)] py-1">
          <button type="button" className={item} onClick={() => go('explorer')}>
            <IconExplorer className="w-5 h-5" /> {t.windowsExplorer}
          </button>
          <button type="button" className={item} onClick={() => go('contact')}>
            <IconMail className="w-5 h-5" /> {t.icons.contact}
          </button>
          <button type="button" className={item} onClick={() => go('mines')}>
            <IconMines className="w-5 h-5" /> {t.icons.mines}
          </button>
          <button type="button" className={item} onClick={() => go('control')}>
            <IconControl className="w-5 h-5" /> {t.controlPanel}
          </button>
          <div className="h-px bg-[var(--win-face-dark)] my-1 mx-1" />
          <button
            type="button"
            className={item}
            onClick={() => {
              playClick()
              setLang(lang === 'en' ? 'pt' : 'en')
            }}
          >
            {t.language}: {lang === 'en' ? 'EN → PT-BR' : 'PT-BR → EN'}
          </button>
          <button
            type="button"
            className={item}
            onClick={() => {
              const next = !enabled
              setEnabled(next)
              if (next) playClick()
            }}
          >
            {enabled ? t.soundOn : t.soundOff}
          </button>
          <div className="h-px bg-[var(--win-face-dark)] my-1 mx-1" />
          <button
            type="button"
            className={item}
            onClick={() => {
              playClick()
              onClose()
              showBsod()
            }}
          >
            {t.shutDown}
          </button>
        </div>
      </div>
    </>
  )
}
