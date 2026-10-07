import { WordFrame } from '../components/WordFrame'
import { useI18n } from '../i18n/I18nContext'

export function AboutMe() {
  const { t, resume } = useI18n()

  return (
    <WordFrame>
      <h1
        className="m-0 mb-1 text-center"
        style={{ fontSize: '22px', fontFamily: 'Arial, sans-serif' }}
      >
        {resume.name}
      </h1>
      <p
        className="m-0 mb-1 text-center font-bold"
        style={{ fontFamily: 'Arial, sans-serif', color: '#000080' }}
      >
        {resume.title}
      </p>
      <p className="m-0 mb-4 text-center text-[12px]">{resume.location}</p>

      <hr className="border-0 border-t border-black my-3" />

      <h2
        className="m-0 mb-2 uppercase tracking-wide"
        style={{ fontSize: '13px', fontFamily: 'Arial, sans-serif' }}
      >
        {t.summary}
      </h2>
      {resume.summary.map((line) => (
        <p key={line.slice(0, 32)} className="m-0 mb-2 text-justify">
          {line}
        </p>
      ))}

      <h2
        className="m-0 mt-4 mb-2 uppercase tracking-wide"
        style={{ fontSize: '13px', fontFamily: 'Arial, sans-serif' }}
      >
        {t.education}
      </h2>
      {resume.education.map((ed) => (
        <div key={ed.degree} className="mb-2">
          <div className="font-bold">{ed.degree}</div>
          <div>
            {ed.school} — {ed.location}
          </div>
          <div className="italic text-[12px]">{ed.dates}</div>
          {ed.honor ? <div className="italic">{ed.honor}</div> : null}
        </div>
      ))}

      <h2
        className="m-0 mt-4 mb-2 uppercase tracking-wide"
        style={{ fontSize: '13px', fontFamily: 'Arial, sans-serif' }}
      >
        {t.languages}
      </h2>
      <p className="m-0">{resume.languages}</p>
    </WordFrame>
  )
}
