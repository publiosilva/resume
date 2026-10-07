import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
import { useSound } from '../sound/SoundContext'

const ROWS = 9
const COLS = 9
const MINES = 10
const CELL = 24

type Cell = {
  mine: boolean
  open: boolean
  flag: boolean
  adj: number
}

type GameStatus = 'ready' | 'playing' | 'won' | 'lost'

function idx(r: number, c: number) {
  return r * COLS + c
}

function inBounds(r: number, c: number) {
  return r >= 0 && r < ROWS && c >= 0 && c < COLS
}

function neighbors(r: number, c: number) {
  const out: [number, number][] = []
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue
      const nr = r + dr
      const nc = c + dc
      if (inBounds(nr, nc)) out.push([nr, nc])
    }
  }
  return out
}

function makeEmpty(): Cell[] {
  return Array.from({ length: ROWS * COLS }, () => ({
    mine: false,
    open: false,
    flag: false,
    adj: 0,
  }))
}

function placeMines(startR: number, startC: number): Cell[] {
  const cells = makeEmpty()
  const forbidden = new Set<number>()
  for (const [nr, nc] of [[startR, startC], ...neighbors(startR, startC)]) {
    forbidden.add(idx(nr, nc))
  }

  let placed = 0
  let guard = 0
  while (placed < MINES && guard < 5000) {
    guard++
    const i = Math.floor(Math.random() * ROWS * COLS)
    if (forbidden.has(i) || cells[i].mine) continue
    cells[i].mine = true
    placed++
  }

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const i = idx(r, c)
      if (cells[i].mine) continue
      cells[i].adj = neighbors(r, c).filter(
        ([nr, nc]) => cells[idx(nr, nc)].mine,
      ).length
    }
  }
  return cells
}

function floodOpen(cells: Cell[], r: number, c: number): Cell[] {
  const next = cells.map((cell) => ({ ...cell }))
  const stack: [number, number][] = [[r, c]]
  while (stack.length) {
    const [cr, cc] = stack.pop()!
    const i = idx(cr, cc)
    const cell = next[i]
    if (cell.open || cell.flag || cell.mine) continue
    cell.open = true
    if (cell.adj === 0) {
      for (const [nr, nc] of neighbors(cr, cc)) {
        const ni = idx(nr, nc)
        if (!next[ni].open && !next[ni].flag) stack.push([nr, nc])
      }
    }
  }
  return next
}

const NUM_COLORS = [
  '',
  '#0000ff',
  '#008000',
  '#ff0000',
  '#000080',
  '#800000',
  '#008080',
  '#000000',
  '#808080',
]

export function Minesweeper() {
  const { t } = useI18n()
  const { playClick } = useSound()
  const [cells, setCells] = useState<Cell[]>(makeEmpty)
  const [status, setStatus] = useState<GameStatus>('ready')
  const [seconds, setSeconds] = useState(0)
  const suppressClick = useRef(false)
  const longPressTimer = useRef<number | null>(null)

  useEffect(() => {
    if (status !== 'playing') return
    const id = window.setInterval(
      () => setSeconds((s) => Math.min(999, s + 1)),
      1000,
    )
    return () => window.clearInterval(id)
  }, [status])

  const flags = useMemo(
    () => cells.reduce((n, c) => n + (c.flag ? 1 : 0), 0),
    [cells],
  )
  const minesLeft = MINES - flags

  const reset = useCallback(() => {
    playClick()
    setCells(makeEmpty())
    setStatus('ready')
    setSeconds(0)
  }, [playClick])

  const openCell = (r: number, c: number) => {
    if (suppressClick.current) {
      suppressClick.current = false
      return
    }
    if (status === 'won' || status === 'lost') return

    setCells((prev) => {
      const i = idx(r, c)
      if (prev[i].flag || prev[i].open) return prev

      playClick()
      let board = prev
      let nextStatus: GameStatus = status

      if (status === 'ready') {
        board = placeMines(r, c)
        nextStatus = 'playing'
      }

      if (board[i].mine) {
        setStatus('lost')
        return board.map((cell) =>
          cell.mine ? { ...cell, open: true, flag: false } : { ...cell },
        )
      }

      if (nextStatus === 'playing') setStatus('playing')
      const opened = floodOpen(board, r, c)
      if (opened.every((cell) => cell.mine || cell.open)) {
        setStatus('won')
      }
      return opened
    })
  }

  const toggleFlag = (r: number, c: number) => {
    if (status === 'won' || status === 'lost') return
    setCells((prev) => {
      const i = idx(r, c)
      if (prev[i].open) return prev
      playClick()
      return prev.map((cell, j) =>
        j === i ? { ...cell, flag: !cell.flag } : cell,
      )
    })
    if (status === 'ready') setStatus('playing')
  }

  const faceDisplay =
    status === 'won' ? '■' : status === 'lost' ? '×' : '☺'

  return (
    <div className="flex flex-col items-center gap-2 p-3 bg-[var(--win-face)] h-full min-h-0 overflow-auto select-none">
      <div
        className="flex items-center justify-between gap-2 px-2 py-1 w-full"
        style={{
          maxWidth: COLS * CELL + 8,
          background: 'var(--win-face)',
          borderTop: '2px solid var(--win-face-darker)',
          borderLeft: '2px solid var(--win-face-darker)',
          borderRight: '2px solid var(--win-face-light)',
          borderBottom: '2px solid var(--win-face-light)',
        }}
      >
        <div
          className="min-w-[42px] text-center font-mono font-bold text-[#ff2020] bg-black px-1 py-0.5 text-[14px] tracking-wider"
          title={t.minesRemaining}
        >
          {String(Math.max(-99, minesLeft)).padStart(3, '0')}
        </div>
        <button
          type="button"
          className="win-btn min-w-[32px] min-h-[28px] px-1 text-[16px] leading-none"
          onClick={reset}
          title={t.minesNew}
          aria-label={t.minesNew}
        >
          {faceDisplay}
        </button>
        <div
          className="min-w-[42px] text-center font-mono font-bold text-[#ff2020] bg-black px-1 py-0.5 text-[14px] tracking-wider"
          title={t.minesTime}
        >
          {String(seconds).padStart(3, '0')}
        </div>
      </div>

      <div
        className="inline-grid shrink-0"
        style={{
          gridTemplateColumns: `repeat(${COLS}, ${CELL}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${CELL}px)`,
          background: 'var(--win-face)',
          borderTop: '3px solid var(--win-face-darker)',
          borderLeft: '3px solid var(--win-face-darker)',
          borderRight: '3px solid var(--win-face-light)',
          borderBottom: '3px solid var(--win-face-light)',
          padding: 2,
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {cells.map((cell, i) => {
          const r = Math.floor(i / COLS)
          const c = i % COLS
          const showMine = cell.open && cell.mine
          const showNum = cell.open && !cell.mine && cell.adj > 0

          return (
            <button
              key={i}
              type="button"
              aria-label={`cell ${r},${c}`}
              className="mine-cell p-0 m-0 border-0 font-bold leading-none flex items-center justify-center"
              style={{
                width: CELL,
                height: CELL,
                minWidth: CELL,
                minHeight: CELL,
                maxWidth: CELL,
                maxHeight: CELL,
                fontSize: 12,
                fontFamily: 'Tahoma, sans-serif',
                cursor: 'default',
                ...(cell.open
                  ? {
                      background: '#bdbdbd',
                      borderTop: '1px solid #808080',
                      borderLeft: '1px solid #808080',
                      borderRight: '1px solid #bdbdbd',
                      borderBottom: '1px solid #bdbdbd',
                      boxShadow: 'none',
                    }
                  : {
                      background: 'var(--win-face)',
                      borderTop: '2px solid var(--win-face-light)',
                      borderLeft: '2px solid var(--win-face-light)',
                      borderRight: '2px solid var(--win-face-darker)',
                      borderBottom: '2px solid var(--win-face-darker)',
                      boxShadow:
                        'inset -1px -1px var(--win-face-dark), inset 1px 1px var(--win-face-light)',
                    }),
              }}
              onClick={() => openCell(r, c)}
              onContextMenu={(e) => {
                e.preventDefault()
                e.stopPropagation()
                toggleFlag(r, c)
              }}
              onPointerDown={(e) => {
                if (e.pointerType === 'touch' || e.pointerType === 'pen') {
                  longPressTimer.current = window.setTimeout(() => {
                    suppressClick.current = true
                    toggleFlag(r, c)
                    longPressTimer.current = null
                  }, 400)
                }
              }}
              onPointerUp={() => {
                if (longPressTimer.current) {
                  window.clearTimeout(longPressTimer.current)
                  longPressTimer.current = null
                }
              }}
              onPointerLeave={() => {
                if (longPressTimer.current) {
                  window.clearTimeout(longPressTimer.current)
                  longPressTimer.current = null
                }
              }}
              onPointerCancel={() => {
                if (longPressTimer.current) {
                  window.clearTimeout(longPressTimer.current)
                  longPressTimer.current = null
                }
              }}
            >
              {cell.flag && !cell.open ? (
                <span
                  aria-hidden
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: '5px solid #c00000',
                    borderTop: '4px solid transparent',
                    borderBottom: '4px solid transparent',
                    marginLeft: 2,
                  }}
                />
              ) : showMine ? (
                <span
                  aria-hidden
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#000',
                    display: 'inline-block',
                    boxShadow: '1px 1px 0 #fff inset',
                  }}
                />
              ) : showNum ? (
                <span style={{ color: NUM_COLORS[cell.adj] }}>{cell.adj}</span>
              ) : null}
            </button>
          )
        })}
      </div>

      <p className="m-0 text-[11px] opacity-80 text-center max-w-[240px]">
        {status === 'won'
          ? t.minesWin
          : status === 'lost'
            ? t.minesLose
            : t.minesHint}
      </p>
    </div>
  )
}
