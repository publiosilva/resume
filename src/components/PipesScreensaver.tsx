import { useEffect, useRef } from 'react'
import { useI18n } from '../i18n/I18nContext'

type Props = {
  onDismiss: () => void
}

type Pipe = {
  x: number
  y: number
  dir: number
  color: string
  life: number
}

const DIRS = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
]

const COLORS = [
  '#ff4040',
  '#40ff40',
  '#4040ff',
  '#ffff40',
  '#ff40ff',
  '#40ffff',
  '#ff8040',
  '#80ff40',
]

export function PipesScreensaver({ onDismiss }: Props) {
  const { t } = useI18n()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let pipes: Pipe[] = []
    const cell = 16

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      ctx.fillStyle = '#000000'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const spawn = () => {
      const cols = Math.floor(canvas.width / cell)
      const rows = Math.floor(canvas.height / cell)
      pipes.push({
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows),
        dir: Math.floor(Math.random() * 4),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        life: 80 + Math.floor(Math.random() * 120),
      })
      if (pipes.length > 12) pipes.shift()
    }

    for (let i = 0; i < 4; i++) spawn()

    let tick = 0
    const loop = () => {
      tick++
      if (tick % 3 === 0) {
        ctx.fillStyle = 'rgba(0,0,0,0.04)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        for (const p of pipes) {
          const px = p.x * cell
          const py = p.y * cell
          ctx.fillStyle = p.color
          ctx.fillRect(px + 2, py + 2, cell - 4, cell - 4)
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(px + 4, py + 4, 3, 3)

          if (Math.random() < 0.12) {
            p.dir = Math.floor(Math.random() * 4)
          }
          const [dx, dy] = DIRS[p.dir]
          p.x += dx
          p.y += dy
          const cols = Math.floor(canvas.width / cell)
          const rows = Math.floor(canvas.height / cell)
          if (p.x < 0 || p.y < 0 || p.x >= cols || p.y >= rows) {
            p.x = Math.floor(Math.random() * cols)
            p.y = Math.floor(Math.random() * rows)
            p.dir = Math.floor(Math.random() * 4)
          }
          p.life--
          if (p.life <= 0) {
            p.life = 80 + Math.floor(Math.random() * 120)
            p.color = COLORS[Math.floor(Math.random() * COLORS.length)]
          }
        }
        if (tick % 90 === 0) spawn()
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    // useIdle in App already ends the screensaver on any input;
    // keep a click/key handler for accessibility focus traps.
    const dismiss = () => onDismiss()
    window.addEventListener('keydown', dismiss)
    window.addEventListener('pointerdown', dismiss)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('keydown', dismiss)
      window.removeEventListener('pointerdown', dismiss)
    }
  }, [onDismiss])

  return (
    <div className="fixed inset-0 z-[9000]">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <p className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-[12px] pointer-events-none font-mono">
        {t.screensaverHint}
      </p>
    </div>
  )
}
