import { useEffect } from 'react'
import { useI18n } from '../i18n/I18nContext'

type Props = {
  onDismiss: () => void
}

export function Bsod({ onDismiss }: Props) {
  const { t } = useI18n()

  useEffect(() => {
    const dismiss = () => onDismiss()
    window.addEventListener('keydown', dismiss)
    window.addEventListener('pointerdown', dismiss)
    return () => {
      window.removeEventListener('keydown', dismiss)
      window.removeEventListener('pointerdown', dismiss)
    }
  }, [onDismiss])

  return (
    <div
      className="fixed inset-0 z-[10000] cursor-pointer select-none p-6 md:p-12 overflow-auto"
      style={{
        background: '#0000aa',
        color: '#ffffff',
        fontFamily: 'Consolas, "Courier New", monospace',
        fontSize: '14px',
        lineHeight: 1.5,
      }}
      role="alertdialog"
      aria-label="Blue Screen of Death"
    >
      <p className="m-0 mb-4">
        <span
          className="px-1"
          style={{ background: '#a8a8a8', color: '#0000aa' }}
        >
          {t.bsodTitle}
        </span>
      </p>
      <p className="m-0 mb-4 whitespace-pre-wrap">{t.bsodBody}</p>
      <p className="m-0 mb-4 whitespace-pre-wrap">{t.bsodError}</p>
      <p className="m-0 mt-8">{t.bsodContinue}</p>
    </div>
  )
}
