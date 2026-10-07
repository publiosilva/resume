import { useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
import { useSound } from '../sound/SoundContext'
import { IconDocument } from '../components/icons'

type TrashItem = {
  id: string
  nameKey: 'trashItem1' | 'trashItem2' | 'trashItem3' | 'trashItem4'
}

const INITIAL: TrashItem[] = [
  { id: '1', nameKey: 'trashItem1' },
  { id: '2', nameKey: 'trashItem2' },
  { id: '3', nameKey: 'trashItem3' },
  { id: '4', nameKey: 'trashItem4' },
]

export function Trash() {
  const { t } = useI18n()
  const { playClick } = useSound()
  const [items, setItems] = useState(INITIAL)
  const [selected, setSelected] = useState<string | null>(null)

  const empty = () => {
    playClick()
    if (items.length === 0) {
      window.alert(t.trashAlreadyEmpty)
      return
    }
    if (window.confirm(t.trashEmptyConfirm)) {
      setItems([])
      setSelected(null)
    }
  }

  const openItem = (id: string) => {
    playClick()
    const item = items.find((i) => i.id === id)
    if (!item) return
    window.alert(`${t[item.nameKey]}\n\n${t.trashRestoreJoke}`)
  }

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
        <button type="button" className="win-btn" onClick={empty}>
          {t.trashEmpty}
        </button>
      </div>

      <div className="flex items-center gap-2 px-2 py-1 border-b border-[var(--win-face-dark)] shrink-0">
        <span className="text-[11px] shrink-0">{t.explorerAddress}</span>
        <div className="win-sunken flex-1 px-2 py-0.5 bg-white text-black text-[11px] font-mono">
          C:\\Recycle Bin
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white text-black p-3 win-scrollbar">
        {items.length === 0 ? (
          <p className="m-0 text-[12px] opacity-70">{t.trashEmptyStatus}</p>
        ) : (
          <div className="flex flex-wrap gap-3 content-start">
            {items.map((item) => {
              const isSelected = selected === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`w-[100px] flex flex-col items-center gap-1 p-1 border border-transparent ${
                    isSelected
                      ? 'bg-[#000080] text-white border-dotted border-white'
                      : 'hover:bg-[#e8e8e8]'
                  }`}
                  onClick={() => setSelected(item.id)}
                  onDoubleClick={() => openItem(item.id)}
                >
                  <IconDocument className="pixel-icon" />
                  <span className="text-[11px] text-center leading-tight break-words w-full">
                    {t[item.nameKey]}
                  </span>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="border-t border-[var(--win-face-dark)] px-2 py-1 text-[11px] shrink-0">
        {items.length === 0
          ? t.trashEmptyStatus
          : `${items.length} ${t.explorerObjects}`}
      </div>
    </div>
  )
}
