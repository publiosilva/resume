type PromptRole = 'system' | 'user' | 'assistant'

type PromptMessage = {
  role: PromptRole
  content: string
}

export type PromptInitResult =
  | { ok: true; availability: LanguageModelAvailability }
  | {
      ok: false
      availability?: LanguageModelAvailability
      error: string
    }

const SESSION_OPTIONS_WITH_LANG = {
  expectedInputs: [{ type: 'text' as const, languages: ['en', 'pt'] }],
  expectedOutputs: [{ type: 'text' as const, languages: ['en', 'pt'] }],
}

const SESSION_OPTIONS_TEXT_ONLY = {
  expectedInputs: [{ type: 'text' as const }],
  expectedOutputs: [{ type: 'text' as const }],
}

async function* iterateStream(
  stream: AsyncIterable<string> | ReadableStream<string>,
): AsyncGenerator<string> {
  if (Symbol.asyncIterator in Object(stream)) {
    for await (const chunk of stream as AsyncIterable<string>) {
      yield typeof chunk === 'string' ? chunk : String(chunk)
    }
    return
  }

  const reader = (stream as ReadableStream<string>).getReader()
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (value) yield typeof value === 'string' ? value : String(value)
    }
  } finally {
    reader.releaseLock()
  }
}

function errorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message || err.name
  }
  return String(err)
}

export class PromptService {
  #messages: PromptMessage[] = []
  #session: LanguageModelSession | null = null
  #abort: AbortController | null = null
  #onProgress?: (pct: number) => void

  setProgressHandler(handler?: (pct: number) => void) {
    this.#onProgress = handler
  }

  async init(initialPrompts: string): Promise<PromptInitResult> {
    if (!window.LanguageModel) {
      return { ok: false, error: 'LanguageModel is not available on window.' }
    }

    this.#messages = [
      {
        role: 'system',
        content: initialPrompts,
      },
    ]

    const optionSets = [SESSION_OPTIONS_WITH_LANG, SESSION_OPTIONS_TEXT_ONLY, {}]
    let lastAvailability: LanguageModelAvailability | undefined
    let lastError = 'Failed to create LanguageModel session.'

    for (const options of optionSets) {
      try {
        if (typeof window.LanguageModel.availability === 'function') {
          lastAvailability = await window.LanguageModel.availability(options)
          if (lastAvailability === 'unavailable') {
            lastError =
              'Model unavailable for this configuration (device/OS/language).'
            continue
          }
        }
      } catch {
        lastAvailability = 'downloadable'
      }

      try {
        this.#session = await window.LanguageModel.create({
          initialPrompts: this.#messages,
          ...options,
          monitor: (m) => {
            m.addEventListener('downloadprogress', (e) => {
              const loaded = typeof e.loaded === 'number' ? e.loaded : 0
              this.#onProgress?.(Math.round(loaded * 100))
            })
          },
        })
        return {
          ok: true,
          availability: lastAvailability ?? 'available',
        }
      } catch (err) {
        this.#session = null
        lastError = errorMessage(err)
      }
    }

    return {
      ok: false,
      availability: lastAvailability,
      error: lastError,
    }
  }

  get ready() {
    return this.#session != null
  }

  prompt(text: string): AsyncIterable<string> {
    this.#messages.push({
      role: 'user',
      content: text,
    })

    this.#abort = new AbortController()
    const signal = this.#abort.signal
    const session = this.#session

    if (!session) {
      return (async function* () {})()
    }

    const stream = session.promptStreaming(text, { signal })
    return iterateStream(stream)
  }

  commitAssistant(content: string) {
    if (!content) return
    this.#messages.push({
      role: 'assistant',
      content,
    })
  }

  abort() {
    this.#abort?.abort()
    this.#abort = null
  }

  destroy() {
    this.abort()
    try {
      this.#session?.destroy?.()
    } catch {}
    this.#session = null
    this.#messages = []
  }
}
