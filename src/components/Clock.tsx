import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/I18nContext'

export function Clock() {
  const { lang } = useI18n()
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const locale = lang === 'pt' ? 'pt-BR' : 'en-US'
  const time = now.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  })
  const date = now.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div
      className="win-sunken px-2 py-[2px] min-w-[64px] text-center tabular-nums"
      title={date}
      aria-label={date}
    >
      {time}
    </div>
  )
}
