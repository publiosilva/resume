import { useCallback, useState, type ReactNode } from 'react'
import { useI18n } from '../i18n/I18nContext'
import { useSound } from '../sound/SoundContext'

type Props = {
  children: ReactNode
}

const ZOOM_MIN = 50
const ZOOM_MAX = 200
const ZOOM_STEP = 10
const BASE_FONT = 13
const BASE_MAX_WIDTH = 480
const BASE_PAD_Y = 28
const BASE_PAD_X = 24

export function WordFrame({ children }: Props) {
  const { t } = useI18n()
  const { playClick } = useSound()
  const [zoom, setZoom] = useState(100)

  const menu = [
    t.wordFile,
    t.wordEdit,
    t.wordView,
    t.wordInsert,
    t.wordFormat,
    t.wordHelp,
  ]

  const zoomIn = useCallback(() => {
    playClick()
    setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP))
  }, [playClick])

  const zoomOut = useCallback(() => {
    playClick()
    setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP))
  }, [playClick])

  const resetZoom = useCallback(() => {
    playClick()
    setZoom(100)
  }, [playClick])

  const scale = zoom / 100

  return (
    <div className="flex flex-col h-full min-h-0 max-w-full overflow-hidden bg-[var(--win-face)]">
      <div className="flex flex-wrap gap-x-3 gap-y-0.5 px-2 py-0.5 text-[12px] border-b border-[var(--win-face-dark)] bg-[var(--win-face)] shrink-0">
        {menu.map((item) => (
          <span key={item} className="cursor-default whitespace-nowrap">
            <span className="underline">{item.charAt(0)}</span>
            {item.slice(1)}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-1 px-1 py-1 border-b border-[var(--win-face-dark)] shrink-0 overflow-x-auto">
        {['N', 'O', 'S', '|', 'B', 'I', 'U', '|'].map((btn, i) =>
          btn === '|' ? (
            <span key={i} className="w-px h-5 bg-[var(--win-face-dark)] mx-0.5 shrink-0" />
          ) : (
            <button
              key={i}
              type="button"
              className="win-btn min-w-[22px] min-h-[22px] px-1 font-bold shrink-0"
              tabIndex={-1}
            >
              {btn}
            </button>
          ),
        )}
        <button
          type="button"
          className="win-btn min-w-[22px] min-h-[22px] px-1 font-bold shrink-0"
          title={t.wordZoomOut}
          aria-label={t.wordZoomOut}
          disabled={zoom <= ZOOM_MIN}
          onClick={zoomOut}
        >
          −
        </button>
        <button
          type="button"
          className="win-btn min-w-[36px] min-h-[22px] px-1 shrink-0 tabular-nums"
          title={t.wordZoomReset}
          aria-label={t.wordZoomReset}
          onClick={resetZoom}
        >
          {zoom}%
        </button>
        <button
          type="button"
          className="win-btn min-w-[22px] min-h-[22px] px-1 font-bold shrink-0"
          title={t.wordZoomIn}
          aria-label={t.wordZoomIn}
          disabled={zoom >= ZOOM_MAX}
          onClick={zoomIn}
        >
          +
        </button>
      </div>

      <div
        className="h-5 border-b border-[var(--win-face-dark)] text-[9px] text-[var(--win-face-dark)] px-4 overflow-hidden shrink-0 select-none"
        style={{
          background:
            'repeating-linear-gradient(90deg, transparent 0 19px, #808080 19px 20px)',
        }}
      />

      <div className="flex-1 min-h-0 min-w-0 overflow-x-hidden overflow-y-auto bg-[#808080] p-3 win-scrollbar">
        <article
          className="mx-auto bg-white text-black shadow-md select-text box-border break-words"
          style={{
            width: '100%',
            maxWidth: `${BASE_MAX_WIDTH * scale}px`,
            minHeight: `${360 * scale}px`,
            padding: `${BASE_PAD_Y * scale}px ${BASE_PAD_X * scale}px`,
            fontFamily: '"Times New Roman", Times, serif',
            fontSize: `${BASE_FONT * scale}px`,
            lineHeight: 1.45,
            overflowWrap: 'anywhere',
          }}
        >
          {children}
        </article>
      </div>

      <div className="flex text-[11px] border-t border-[var(--win-face-dark)] shrink-0 min-w-0">
        <div className="win-sunken flex-1 min-w-0 px-2 py-0.5 truncate">
          {t.wordPage} 1
        </div>
        <div className="win-sunken w-20 shrink-0 px-2 py-0.5">{t.wordCol} 1</div>
        <div className="win-sunken shrink-0 flex items-stretch">
          <button
            type="button"
            className="win-btn min-w-[18px] min-h-0 px-1 border-0 rounded-none"
            title={t.wordZoomOut}
            aria-label={t.wordZoomOut}
            disabled={zoom <= ZOOM_MIN}
            onClick={zoomOut}
          >
            −
          </button>
          <button
            type="button"
            className="px-2 min-w-[44px] tabular-nums bg-transparent border-0 cursor-pointer"
            title={t.wordZoomReset}
            aria-label={`${zoom}% — ${t.wordZoomReset}`}
            onClick={resetZoom}
          >
            {zoom}%
          </button>
          <button
            type="button"
            className="win-btn min-w-[18px] min-h-0 px-1 border-0 rounded-none"
            title={t.wordZoomIn}
            aria-label={t.wordZoomIn}
            disabled={zoom >= ZOOM_MAX}
            onClick={zoomIn}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
