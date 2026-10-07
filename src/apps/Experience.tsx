import { WordFrame } from '../components/WordFrame'
import { useI18n } from '../i18n/I18nContext'

export function Experience() {
  const { t, resume } = useI18n()

  return (
    <WordFrame>
      <h1
        className="m-0 mb-1 text-center"
        style={{ fontSize: '20px', fontFamily: 'Arial, sans-serif' }}
      >
        {t.experience}
      </h1>
      <p
        className="m-0 mb-4 text-center text-[12px]"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        {resume.name} — {resume.title}
      </p>

      <hr className="border-0 border-t border-black my-3" />

      {resume.jobs.map((job) => (
        <section key={`${job.company}-${job.dates}`} className="mb-4">
          <h2
            className="m-0 mb-0.5"
            style={{ fontSize: '14px', fontFamily: 'Arial, sans-serif' }}
          >
            {job.title}
          </h2>
          <div className="font-bold">
            {job.company} · {job.location}
          </div>
          <div className="italic text-[12px] mb-1">{job.dates}</div>
          <ul className="m-0 pl-5 space-y-1">
            {job.bullets.map((b) => (
              <li key={b.slice(0, 40)} className="text-justify">
                {b}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </WordFrame>
  )
}
