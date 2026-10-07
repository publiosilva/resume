import { useEffect, useMemo, useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
import { useSound } from '../sound/SoundContext'

function buildMailto(to: string, subject: string, body: string) {
  // Do not encode the address itself — only query params.
  const params = new URLSearchParams()
  params.set('subject', subject)
  params.set('body', body)
  // URLSearchParams uses + for spaces; mailto clients expect %20
  return `mailto:${to}?${params.toString().replace(/\+/g, '%20')}`
}

export function Contact() {
  const { t, resume, lang } = useI18n()
  const { playClick } = useSound()
  const to = resume.contact.email

  const defaultSubject = useMemo(
    () =>
      t.mailDefaultSubject.replace('{name}', resume.name.split(' ')[0] ?? 'Publio'),
    [t.mailDefaultSubject, resume.name],
  )
  const defaultBody = useMemo(() => t.mailDefaultBody, [t.mailDefaultBody])

  const [subject, setSubject] = useState(defaultSubject)
  const [body, setBody] = useState(defaultBody)

  useEffect(() => {
    setSubject(defaultSubject)
    setBody(defaultBody)
  }, [lang, defaultSubject, defaultBody])

  const mailtoHref = useMemo(
    () => buildMailto(to, subject, body),
    [to, subject, body],
  )

  return (
    <div className="flex flex-col h-full min-h-[300px] bg-[var(--win-face)]">
      <div className="flex items-center gap-1 px-1 py-1 border-b border-[var(--win-face-dark)]">
        <a
          className="win-btn inline-flex items-center justify-center no-underline text-[var(--win-text)]"
          href={mailtoHref}
          onClick={() => playClick()}
        >
          {t.mailSend}
        </a>
        <button
          type="button"
          className="win-btn"
          onClick={() => {
            playClick()
            setSubject(defaultSubject)
            setBody(defaultBody)
          }}
        >
          {t.mailNew}
        </button>
        <span className="ml-2 text-[11px] opacity-70">{t.mailInbox}</span>
      </div>

      <div className="flex flex-1 min-h-0">
        <aside className="w-[120px] border-r border-[var(--win-face-dark)] p-2 text-[11px] bg-[var(--win-face)] shrink-0">
          <div className="font-bold mb-1">{t.mailFolders}</div>
          <div className="pl-2 py-0.5 bg-[var(--win-highlight)] text-[var(--win-highlight-text)]">
            {t.mailInbox}
          </div>
          <div className="pl-2 py-0.5">{t.mailSent}</div>
          <div className="pl-2 py-0.5">{t.mailDrafts}</div>
        </aside>

        <div className="flex-1 flex flex-col min-w-0 bg-white text-black">
          <div className="border-b border-[#808080] px-2 py-1 text-[12px] space-y-1">
            <div className="flex gap-2 items-center">
              <span className="w-14 font-bold shrink-0">{t.mailTo}</span>
              <input
                className="flex-1 border border-[#808080] px-1 py-0.5 outline-none"
                value={to}
                readOnly
              />
            </div>
            <div className="flex gap-2 items-center">
              <span className="w-14 font-bold shrink-0">{t.mailSubject}</span>
              <input
                className="flex-1 border border-[#808080] px-1 py-0.5 outline-none"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>
          <textarea
            className="flex-1 w-full resize-none border-0 p-3 outline-none text-[12px] font-[Tahoma,sans-serif]"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <div className="border-t border-[#808080] px-2 py-1 text-[11px] bg-[var(--win-face)] text-[var(--win-text)] flex justify-between items-center">
            <span>
              {t.phone}: {resume.contact.phone}
            </span>
            <div className="flex gap-2">
              <a href={resume.contact.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={resume.contact.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
