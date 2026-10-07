import { useState } from 'react'
import { EXPLORER_FILES, type DesktopFileId } from '../data/desktopFiles'
import { FileIcon } from '../components/FileIcon'
import { useOpenDesktopItem } from '../hooks/useOpenDesktopItem'
import { useI18n } from '../i18n/I18nContext'
import { useSound } from '../sound/SoundContext'

export function Explorer() {
  const { t } = useI18n()
  const { playClick } = useSound()
  const openItem = useOpenDesktopItem()
  const [selected, setSelected] = useState<DesktopFileId | null>(null)
  const path = 'C:\\Desktop'

  return (
    <div className="flex flex-col h-full min-h-0 bg-[var(--win-face)]">
      <div className="flex gap-3 px-2 py-0.5 text-[12px] border-b border-[var(--win-face-dark)] shrink-0">
        {[t.wordFile, t.wordEdit, t.wordView, t.wordHelp].map((item) => (
          <span key={item}>
            <span className="underline">{item.charAt(0)}</span>
            {item.slice(1)}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-1 px-1 py-1 border-b border-[var(--win-face-dark)] shrink-0">
        <button type="button" className="win-btn min-w-[28px]" tabIndex={-1}>
          ←
        </button>
        <button type="button" className="win-btn min-w-[28px]" tabIndex={-1}>
          →
        </button>
        <button type="button" className="win-btn min-w-[28px]" tabIndex={-1}>
          ↑
        </button>
      </div>

      <div className="flex items-center gap-2 px-2 py-1 border-b border-[var(--win-face-dark)] shrink-0">
        <span className="text-[11px] shrink-0">{t.explorerAddress}</span>
        <div className="win-sunken flex-1 px-2 py-0.5 bg-white text-black text-[11px] font-mono">
          {path}
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white text-black p-3 win-scrollbar">
        <div className="flex flex-wrap gap-3 content-start">
          {EXPLORER_FILES.map((file) => {
            const isSelected = selected === file.id
            return (
              <button
                key={file.id}
                type="button"
                className={`w-[88px] flex flex-col items-center gap-1 p-1 border border-transparent ${
                  isSelected
                    ? 'bg-[#000080] text-white border-dotted border-white'
                    : 'hover:bg-[#e8e8e8]'
                }`}
                onClick={() => setSelected(file.id)}
                onDoubleClick={() => {
                  playClick()
                  openItem(file.id)
                }}
              >
                <FileIcon kind={file.iconKey} className="pixel-icon" />
                <span className="text-[11px] text-center leading-tight break-words w-full">
                  {t.icons[file.labelKey]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="border-t border-[var(--win-face-dark)] px-2 py-1 text-[11px] flex justify-between gap-2 shrink-0">
        <span>
          {EXPLORER_FILES.length} {t.explorerObjects}
        </span>
        <span className="truncate min-w-0">
          {selected ? t.icons[selected] : t.explorerDesktopHint}
        </span>
      </div>
    </div>
  )
}
