import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import {
  checkRequirements,
  hardwareHints,
} from '../cmd/checkRequirements'
import { PromptService } from '../cmd/PromptService'
import { useEaster } from '../easter/EasterContext'
import { useI18n } from '../i18n/I18nContext'
import { useWindows } from '../windows/windowStore'

type Line = {
  id: number
  text: string
  tone?: 'normal' | 'dim' | 'error' | 'matrix' | 'assistant'
}

let lineId = 0
const nextId = () => ++lineId

const PROMPT = 'C:\\Resume>'

export function Cmd() {
  const { t } = useI18n()
  const { closeWindow } = useWindows()
  const { showBsod } = useEaster()
  const [lines, setLines] = useState<Line[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const serviceRef = useRef(new PromptService())
  const streamingRef = useRef(false)
  const assistantLineRef = useRef<number | null>(null)
  const aiReadyRef = useRef(false)
  const aiLoadingRef = useRef(false)
  const aiFailedRef = useRef(false)
  const pendingQuestionRef = useRef<string | null>(null)
  const askAiRef = useRef<(question: string) => Promise<void>>(async () => {})

  const append = useCallback((text: string, tone?: Line['tone']) => {
    setLines((prev) => [...prev, { id: nextId(), text, tone }])
  }, [])

  const appendMany = useCallback((texts: string[], tone?: Line['tone']) => {
    setLines((prev) => [
      ...prev,
      ...texts.map((text) => ({ id: nextId(), text, tone })),
    ])
  }, [])

  const updateLine = useCallback((id: number, text: string) => {
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, text } : l)))
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, input, busy])

  const statusLineIdRef = useRef<number | null>(null)

  const setStatus = useCallback(
    (text: string, tone: Line['tone'] = 'dim') => {
      if (!text) return
      const id = statusLineIdRef.current
      if (id != null) {
        updateLine(id, text)
        setLines((prev) =>
          prev.map((l) => (l.id === id ? { ...l, tone } : l)),
        )
        return
      }
      const newId = nextId()
      statusLineIdRef.current = newId
      setLines((prev) => [...prev, { id: newId, text, tone }])
    },
    [updateLine],
  )

  const clearStatus = useCallback(() => {
    const id = statusLineIdRef.current
    if (id == null) return
    statusLineIdRef.current = null
    setLines((prev) => prev.filter((l) => l.id !== id))
  }, [])

  const printSetupGuide = useCallback(() => {
    const steps = [
      t.cmdSetupTitle,
      t.cmdSetup1,
      t.cmdSetup2,
      t.cmdSetup3,
      t.cmdSetup4,
      t.cmdSetup5,
      t.cmdSetup6,
      t.cmdSetupAfter,
    ].filter(Boolean)
    appendMany(steps, 'dim')
  }, [appendMany, t])

  const flushPendingQuestion = useCallback(() => {
    const pending = pendingQuestionRef.current
    if (!pending) return
    pendingQuestionRef.current = null
    void askAiRef.current(pending)
  }, [])

  const startSession = useCallback(
    async (cancelled?: () => boolean, opts?: { quiet?: boolean }) => {
      const quiet = opts?.quiet ?? false
      aiLoadingRef.current = true
      aiFailedRef.current = false
      aiReadyRef.current = false

      const res = await fetch(`${import.meta.env.BASE_URL}llms.txt`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const llms = await res.text()
      if (cancelled?.()) {
        aiLoadingRef.current = false
        return false
      }

      serviceRef.current.destroy()
      serviceRef.current = new PromptService()
      serviceRef.current.setProgressHandler((pct) => {
        if (cancelled?.()) return
        setStatus(`${t.cmdDownloading} ${pct}%`)
      })

      if (!quiet) setStatus(t.cmdLoadingAi)

      const result = await serviceRef.current.init(llms)
      if (cancelled?.()) {
        aiLoadingRef.current = false
        return false
      }

      aiLoadingRef.current = false

      if (result.ok) {
        aiReadyRef.current = true
        aiFailedRef.current = false
        setStatus(t.cmdAiReady)
        flushPendingQuestion()
        return true
      }

      aiReadyRef.current = false
      aiFailedRef.current = true
      pendingQuestionRef.current = null
      const detail = result.error ? ` (${result.error})` : ''
      setStatus(`${t.cmdAiUnavailable}${detail}`, 'error')
      return false
    },
    [flushPendingQuestion, setStatus, t],
  )

  useEffect(() => {
    let cancelled = false
    const isCancelled = () => cancelled

    async function boot() {
      aiLoadingRef.current = true
      statusLineIdRef.current = null
      setLines([
        { id: nextId(), text: t.cmdBanner },
        { id: nextId(), text: t.cmdHelpHint, tone: 'dim' },
      ])
      const errors = checkRequirements(t)
      if (errors.length) {
        aiFailedRef.current = true
        aiLoadingRef.current = false
        if (!cancelled) setStatus(t.cmdAiUnavailable, 'error')
        return
      }

      try {
        await startSession(isCancelled)
      } catch {
        if (!cancelled) {
          aiLoadingRef.current = false
          aiFailedRef.current = true
          aiReadyRef.current = false
          pendingQuestionRef.current = null
          setStatus(t.cmdAiLoadError, 'error')
        }
      }
    }

    void boot()
    inputRef.current?.focus()
    return () => {
      cancelled = true
      serviceRef.current.abort()
    }
  }, [])

  const printHelp = () => {
    appendMany(
      [
        t.cmdHelpBody1,
        '',
        `  help    ${t.cmdHelpCmdHelp}`,
        `  setup   ${t.cmdHelpCmdSetup}`,
        `  cls     ${t.cmdHelpCmdCls}`,
        `  exit    ${t.cmdHelpCmdExit}`,
        `  Ctrl+C  ${t.cmdHelpCmdCancel}`,
      ],
      'dim',
    )
  }

  const recheckAi = async () => {
    clearStatus()
    const errors = checkRequirements(t)
    if (errors.length) {
      aiFailedRef.current = true
      aiReadyRef.current = false
      aiLoadingRef.current = false
      appendMany(errors.filter(Boolean), 'error')
      printSetupGuide()
      appendMany(hardwareHints(t).slice(0, 2), 'dim')
      return
    }

    try {
      const ok = await startSession(undefined, { quiet: false })
      if (!ok) {
        printSetupGuide()
        appendMany(hardwareHints(t).slice(0, 2), 'dim')
      }
    } catch (err) {
      aiLoadingRef.current = false
      aiFailedRef.current = true
      aiReadyRef.current = false
      pendingQuestionRef.current = null
      setStatus(
        `${t.cmdAiLoadError}${err instanceof Error ? `: ${err.message}` : ''}`,
        'error',
      )
      printSetupGuide()
    }
  }

  const runLocal = (raw: string): boolean => {
    const cmd = raw.trim()
    const lower = cmd.toLowerCase()

    if (lower === 'help' || lower === '/?' || lower === 'ajuda') {
      printHelp()
      return true
    }
    if (
      lower === 'setup' ||
      lower === 'activate' ||
      lower === 'ativar' ||
      lower === 'ai'
    ) {
      void recheckAi()
      return true
    }
    if (lower === 'cls' || lower === 'clear') {
      setLines([])
      return true
    }
    if (lower === 'exit' || lower === 'quit') {
      closeWindow('cmd')
      return true
    }
    if (lower === 'dir' || lower === 'ls') {
      appendMany(
        [
          ' Volume in drive C is RESUME_OS',
          ' Directory of C:\\Resume',
          '',
          'ABOUT_ME.DOC',
          'EXPERIENCE.DOC',
          'SKILLS.DLL',
          'PROJECTS',
          'CV.PDF',
          'GITHUB.URL',
          'LINKEDIN.URL',
          'LLMS.TXT',
          '        8 file(s)',
        ],
        'dim',
      )
      return true
    }
    if (lower === 'ver') {
      append('Resume OS 95 [Version 4.00.950]')
      return true
    }
    if (lower === 'sudo' || lower.startsWith('sudo ')) {
      append(t.cmdEggSudo, 'dim')
      return true
    }
    if (lower === 'format c:' || lower === 'format c') {
      append(t.cmdEggFormat, 'error')
      return true
    }
    if (lower === 'matrix') {
      appendMany(
        [
          'Wake up, visitor...',
          'The resume has you.',
          'Follow the white rabbit — or open Projects from Explorer.',
        ],
        'matrix',
      )
      return true
    }
    if (lower === 'shutdown' || lower === 'win') {
      append(t.cmdEggShutdown, 'dim')
      showBsod()
      return true
    }

    return false
  }

  const askAi = async (question: string) => {
    if (aiLoadingRef.current || (!aiReadyRef.current && !aiFailedRef.current)) {
      pendingQuestionRef.current = question
      return
    }

    if (!aiReadyRef.current || !serviceRef.current.ready) {
      append(t.cmdAiUnavailable, 'error')
      return
    }

    clearStatus()
    setBusy(true)
    streamingRef.current = true
    const id = nextId()
    assistantLineRef.current = id
    setLines((prev) => [
      ...prev,
      { id, text: '', tone: 'assistant' },
    ])

    let full = ''
    try {
      const response = serviceRef.current.prompt(question)
      for await (const chunk of response) {
        if (!streamingRef.current) break
        if (!chunk) continue
        full += chunk
        updateLine(id, full)
      }
      if (streamingRef.current && full) {
        serviceRef.current.commitAssistant(full)
      } else if (!full) {
        updateLine(id, t.cmdAiEmpty)
      }
    } catch (err) {
      const aborted =
        (err instanceof DOMException && err.name === 'AbortError') ||
        (err instanceof Error && err.name === 'AbortError')
      if (!aborted) {
        const detail = err instanceof Error ? err.message : String(err)
        updateLine(id, full || `${t.cmdAiError}${detail ? `: ${detail}` : ''}`)
      }
    } finally {
      streamingRef.current = false
      assistantLineRef.current = null
      setBusy(false)
      queueMicrotask(() => inputRef.current?.focus())
    }
  }

  askAiRef.current = askAi

  const submit = async (raw: string) => {
    const trimmed = raw.trimEnd()
    append(`${PROMPT}${trimmed}`)
    setInput('')
    if (!trimmed.trim()) return
    if (runLocal(trimmed)) return
    await askAi(trimmed)
  }

  const hasTextSelection = () => {
    const sel = window.getSelection()
    return Boolean(sel && sel.toString().length > 0)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
      if (hasTextSelection()) return

      e.preventDefault()
      if (streamingRef.current) {
        streamingRef.current = false
        serviceRef.current.abort()
        append('^C', 'dim')
        setBusy(false)
      } else {
        append('^C', 'dim')
      }
      return
    }

    if (e.key === 'Enter') {
      e.preventDefault()
      if (busy) return
      void submit(input)
    }
  }

  const toneClass = (tone?: Line['tone']) => {
    switch (tone) {
      case 'dim':
        return 'text-[#808080]'
      case 'error':
        return 'text-[#ff8080]'
      case 'matrix':
        return 'text-[#00ff00]'
      case 'assistant':
        return 'text-[#c0c0c0]'
      default:
        return 'text-[#c0c0c0]'
    }
  }

  return (
    <div
      className="h-full min-h-[240px] bg-black text-[#c0c0c0] font-mono text-[12px] leading-snug flex flex-col select-text"
      onMouseUp={() => {
        if (!hasTextSelection()) inputRef.current?.focus()
      }}
    >
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto px-2 py-2 win-scrollbar whitespace-pre-wrap break-words select-text cursor-text"
      >
        {lines.map((line) => (
          <div key={line.id} className={`${toneClass(line.tone)} select-text`}>
            {line.text || '\u00a0'}
          </div>
        ))}
        <div className="flex items-start gap-0">
          <span className="shrink-0 text-[#c0c0c0] select-text">{PROMPT}</span>
          <input
            ref={inputRef}
            value={busy ? '' : input}
            onChange={(e) => {
              if (!busy) setInput(e.target.value)
            }}
            onKeyDown={onKeyDown}
            readOnly={busy}
            placeholder={busy ? t.cmdStreamingHint : undefined}
            className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[#c0c0c0] caret-[#c0c0c0] p-0 m-0 font-mono text-[12px] placeholder:text-[#808080] select-text"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            aria-label="Command prompt"
          />
        </div>
      </div>
    </div>
  )
}
