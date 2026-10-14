/// <reference types="vite/client" />

type LanguageModelPromptMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

type LanguageModelExpectedModality = {
  type: 'text'
  languages?: string[]
}

type LanguageModelCreateOptions = {
  initialPrompts?: LanguageModelPromptMessage[]
  expectedInputs?: LanguageModelExpectedModality[]
  expectedOutputs?: LanguageModelExpectedModality[]
  signal?: AbortSignal
  monitor?: (m: EventTarget & {
    addEventListener(
      type: 'downloadprogress',
      listener: (e: Event & { loaded: number }) => void,
    ): void
  }) => void
}

type LanguageModelAvailabilityOptions = {
  expectedInputs?: LanguageModelExpectedModality[]
  expectedOutputs?: LanguageModelExpectedModality[]
}

type LanguageModelAvailability =
  | 'unavailable'
  | 'downloadable'
  | 'downloading'
  | 'available'

type LanguageModelPromptOptions = {
  signal?: AbortSignal
}

interface LanguageModelSession {
  prompt(
    input: string,
    options?: LanguageModelPromptOptions,
  ): Promise<string>
  promptStreaming(
    input: string,
    options?: LanguageModelPromptOptions,
  ): AsyncIterable<string> | ReadableStream<string>
  destroy?: () => void
}

interface LanguageModelStatic {
  availability?(
    options?: LanguageModelAvailabilityOptions,
  ): Promise<LanguageModelAvailability>
  create(options?: LanguageModelCreateOptions): Promise<LanguageModelSession>
}

interface Window {
  LanguageModel?: LanguageModelStatic
  chrome?: unknown
}
