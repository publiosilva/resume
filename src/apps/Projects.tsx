import { useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
import { useSound } from '../sound/SoundContext'
import { IconUrl } from '../components/icons'

export function Projects() {
  const { t, resume } = useI18n()
  const { playClick } = useSound()
  const [selected, setSelected] = useState<string | null>(null)
  const path = 'C:\\Resume\\Projects'

  const openProject = (url: string) => {
    playClick()
    window.open(url, '_blank', 'noreferrer')
  }

  return (
    <div className="flex flex-col h-full min-h-[280px] bg-[var(--win-face)]">
      {/* Menu */}
      <div className="flex gap-3 px-2 py-0.5 text-[12px] border-b border-[var(--win-face-dark)]">
        {[t.wordFile, t.wordEdit, t.wordView, t.wordHelp].map((item) => (
          <span key={item}>
            <span className="underline">{item.charAt(0)}</span>
            {item.slice(1)}
          </span>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-1 py-1 border-b border-[var(--win-face-dark)]">
        <button type="button" className="win-btn min-w-[28px]" tabIndex={-1}>
          ←
        </button>
        <button type="button" className="win-btn min-w-[28px]" tabIndex={-1}>
          →
        </button>
        <button type="button" className="win-btn min-w-[28px]" tabIndex={-1}>
          ↑
        </button>
        <span className="w-px h-5 bg-[var(--win-face-dark)] mx-1" />
        <button type="button" className="win-btn" tabIndex={-1}>
          {t.explorerCut}
        </button>
        <button type="button" className="win-btn" tabIndex={-1}>
          {t.explorerCopy}
        </button>
      </div>

      {/* Address bar */}
      <div className="flex items-center gap-2 px-2 py-1 border-b border-[var(--win-face-dark)]">
        <span className="text-[11px] shrink-0">{t.explorerAddress}</span>
        <div className="win-sunken flex-1 px-2 py-0.5 bg-white text-black text-[11px] font-mono">
          {path}
        </div>
      </div>

      {/* File area */}
      <div className="flex-1 overflow-auto bg-white text-black p-3 win-scrollbar">
        <div className="flex flex-wrap gap-3 content-start">
          {resume.projects.map((p) => {
            const fileName = `${p.name.replace(/\s+/g, '_')}.url`
            const isSelected = selected === p.url
            return (
              <button
                key={p.url}
                type="button"
                className={`w-[88px] flex flex-col items-center gap-1 p-1 border border-transparent ${
                  isSelected
                    ? 'bg-[#000080] text-white border-dotted border-white'
                    : 'hover:bg-[#e8e8e8]'
                }`}
                onClick={() => setSelected(p.url)}
                onDoubleClick={() => openProject(p.url)}
                title={p.description}
              >
                <IconUrl className="pixel-icon" />
                <span className="text-[11px] text-center leading-tight break-words w-full">
                  {fileName}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Status / details */}
      <div className="border-t border-[var(--win-face-dark)] px-2 py-1 text-[11px] flex justify-between gap-2">
        <span>
          {resume.projects.length} {t.explorerObjects}
        </span>
        <span className="truncate min-w-0">
          {selected
            ? resume.projects.find((p) => p.url === selected)?.description
            : t.explorerHint}
        </span>
      </div>
    </div>
  )
}
