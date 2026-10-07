import { useMemo, useState } from 'react'
import type { SkillItem } from '../data/resume'
import { useI18n } from '../i18n/I18nContext'
import { useSound } from '../sound/SoundContext'
import { IconDll } from '../components/icons'

const LEVEL_LABELS = {
  en: ['Novice', 'Familiar', 'Working', 'Advanced', 'Expert'] as const,
  pt: ['Iniciante', 'Familiar', 'Operacional', 'Avançado', 'Especialista'] as const,
}

function SkillMeter({ level }: { level: number }) {
  const pct = Math.max(0, Math.min(100, (level / 5) * 100))
  return (
    <div
      className="win-sunken h-3 w-full max-w-[140px] bg-white relative overflow-hidden"
      aria-valuenow={level}
      aria-valuemin={1}
      aria-valuemax={5}
      role="progressbar"
    >
      <div
        className="h-full"
        style={{
          width: `${pct}%`,
          background:
            'repeating-linear-gradient(90deg, #000080 0 8px, #000060 8px 10px)',
        }}
      />
    </div>
  )
}

export function Skills() {
  const { t, lang, resume } = useI18n()
  const { playClick } = useSound()
  const categories = resume.skills.categories

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(categories.map((c) => [c.id, true])),
  )
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0]?.id ?? '')
  const [selectedKey, setSelectedKey] = useState<string | null>(
    categories[0]?.items[0] ? `${categories[0].id}:${categories[0].items[0].name}` : null,
  )

  const activeCategory =
    categories.find((c) => c.id === activeCategoryId) ?? categories[0]

  const selected = useMemo(() => {
    if (!selectedKey) return null
    const [catId, ...rest] = selectedKey.split(':')
    const name = rest.join(':')
    const cat = categories.find((c) => c.id === catId)
    const item = cat?.items.find((i) => i.name === name)
    if (!cat || !item) return null
    return { cat, item }
  }, [selectedKey, categories])

  const selectSkill = (catId: string, item: SkillItem) => {
    playClick()
    setActiveCategoryId(catId)
    setSelectedKey(`${catId}:${item.name}`)
  }

  const allExpanded = categories.every((c) => expanded[c.id])
  const levelWord = (level: number) =>
    LEVEL_LABELS[lang][Math.max(0, Math.min(4, level - 1))]

  return (
    <div className="flex flex-col h-full min-h-0 max-w-full overflow-hidden bg-[var(--win-face)]">
      {/* Menu */}
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 px-2 py-0.5 text-[12px] border-b border-[var(--win-face-dark)] shrink-0">
        {[t.wordFile, t.wordView, t.wordHelp].map((item) => (
          <span key={item} className="cursor-default whitespace-nowrap">
            <span className="underline">{item.charAt(0)}</span>
            {item.slice(1)}
          </span>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-1 py-1 border-b border-[var(--win-face-dark)] shrink-0">
        <button
          type="button"
          className="win-btn"
          onClick={() => {
            playClick()
            const next = !allExpanded
            setExpanded(Object.fromEntries(categories.map((c) => [c.id, next])))
          }}
        >
          {allExpanded ? t.skillsCollapse : t.skillsExpand}
        </button>
        <span className="ml-2 text-[11px] opacity-70 truncate">
          {t.icons.skills}
        </span>
      </div>

      {/* Main split */}
      <div className="flex flex-1 min-h-0 min-w-0">
        {/* Tree */}
        <aside className="w-[150px] shrink-0 border-r border-[var(--win-face-dark)] bg-white text-black overflow-y-auto win-scrollbar">
          <div className="px-1 py-1 text-[11px] font-bold flex items-center gap-1">
            <IconDll className="w-4 h-4" />
            {t.skillsTreeRoot}
          </div>
          {categories.map((cat) => {
            const open = expanded[cat.id] !== false
            const active = cat.id === activeCategoryId
            return (
              <div key={cat.id}>
                <button
                  type="button"
                  className={`w-full flex items-center gap-1 px-1 py-0.5 text-left text-[11px] ${
                    active && !selectedKey?.startsWith(`${cat.id}:`)
                      ? 'bg-[var(--win-highlight)] text-[var(--win-highlight-text)]'
                      : 'hover:bg-[#e8e8e8]'
                  }`}
                  onClick={() => {
                    playClick()
                    setExpanded((prev) => ({ ...prev, [cat.id]: !open }))
                    setActiveCategoryId(cat.id)
                  }}
                >
                  <span className="w-3 inline-block">{open ? '−' : '+'}</span>
                  <span className="truncate">{cat.label[lang]}</span>
                </button>
                {open
                  ? cat.items.map((item) => {
                      const key = `${cat.id}:${item.name}`
                      const isSel = selectedKey === key
                      return (
                        <button
                          key={key}
                          type="button"
                          className={`w-full pl-6 pr-1 py-0.5 text-left text-[11px] truncate ${
                            isSel
                              ? 'bg-[var(--win-highlight)] text-[var(--win-highlight-text)]'
                              : 'hover:bg-[#e8e8e8]'
                          }`}
                          onClick={() => selectSkill(cat.id, item)}
                        >
                          {item.name}
                        </button>
                      )
                    })
                  : null}
              </div>
            )
          })}
        </aside>

        {/* List + details */}
        <div className="flex-1 min-w-0 min-h-0 flex flex-col">
          <div className="flex-1 min-h-0 overflow-y-auto win-scrollbar bg-white text-black p-2">
            <div className="font-bold text-[12px] mb-2 border-b border-[#808080] pb-1">
              {activeCategory?.label[lang]}
            </div>
            <div className="space-y-2">
              {activeCategory?.items.map((item) => {
                const key = `${activeCategory.id}:${item.name}`
                const isSel = selectedKey === key
                return (
                  <button
                    key={key}
                    type="button"
                    className={`w-full flex items-center gap-3 px-2 py-1.5 text-left border ${
                      isSel
                        ? 'bg-[#000080] text-white border-dotted border-white'
                        : 'border-transparent hover:bg-[#e8e8e8]'
                    }`}
                    onClick={() => selectSkill(activeCategory.id, item)}
                  >
                    <IconDll className="w-5 h-5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[12px] font-bold truncate">{item.name}</div>
                      <div
                        className={`text-[10px] ${isSel ? 'text-white/80' : 'opacity-70'}`}
                      >
                        {t.skillsLevel}: {levelWord(item.level)} ({item.level}/5)
                      </div>
                    </div>
                    <SkillMeter level={item.level} />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Properties pane */}
          <div className="h-[110px] shrink-0 border-t border-[var(--win-face-dark)] bg-[var(--win-face)] p-2 overflow-hidden">
            <div className="font-bold text-[11px] mb-1">{t.skillsProperties}</div>
            {selected ? (
              <div className="win-sunken bg-white text-black p-2 h-[calc(100%-18px)] overflow-y-auto win-scrollbar text-[11px]">
                <div>
                  <strong>{t.skillsName}:</strong> {selected.item.name}
                </div>
                <div>
                  <strong>{t.skillsCategory}:</strong> {selected.cat.label[lang]}
                </div>
                <div>
                  <strong>{t.skillsLevel}:</strong>{' '}
                  {levelWord(selected.item.level)} ({selected.item.level}/5)
                </div>
                <p className="m-0 mt-1">{selected.item.note[lang]}</p>
              </div>
            ) : (
              <div className="win-sunken bg-white text-black p-2 text-[11px] opacity-70">
                {t.skillsSelectHint}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex text-[11px] border-t border-[var(--win-face-dark)] shrink-0">
        <div className="win-sunken flex-1 px-2 py-0.5 truncate">
          {selected
            ? selected.item.name
            : `${categories.reduce((n, c) => n + c.items.length, 0)} ${t.skillsDevices}`}
        </div>
        <div className="win-sunken w-28 shrink-0 px-2 py-0.5 truncate">
          {activeCategory?.label[lang]}
        </div>
      </div>
    </div>
  )
}
