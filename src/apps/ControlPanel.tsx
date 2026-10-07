import { useI18n } from '../i18n/I18nContext'
import { useSound } from '../sound/SoundContext'
import { useTheme, WALLPAPERS, type WallpaperId } from '../theme/ThemeContext'

export function ControlPanel() {
  const { t, lang, setLang } = useI18n()
  const { wallpaper, setWallpaper } = useTheme()
  const { enabled, setEnabled, playClick } = useSound()

  const wallIds = Object.keys(WALLPAPERS) as WallpaperId[]

  return (
    <div className="space-y-4 p-3">
      <fieldset className="win-sunken p-3 m-0">
        <legend className="px-1 font-bold">{t.language}</legend>
        <div className="flex gap-2">
          {(['en', 'pt'] as const).map((code) => (
            <button
              key={code}
              type="button"
              className={`win-btn ${lang === code ? 'is-pressed' : ''}`}
              onClick={() => {
                playClick()
                setLang(code)
              }}
            >
              {code === 'en' ? 'English' : 'Português (BR)'}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="win-sunken p-3 m-0">
        <legend className="px-1 font-bold">{t.wallpaper}</legend>
        <div className="grid grid-cols-2 gap-2">
          {wallIds.map((id) => (
            <button
              key={id}
              type="button"
              className={`win-btn flex items-center gap-2 justify-start ${
                wallpaper === id ? 'is-pressed' : ''
              }`}
              onClick={() => {
                playClick()
                setWallpaper(id)
              }}
            >
              <span
                className="inline-block w-4 h-4 border border-black"
                style={{ background: WALLPAPERS[id] }}
              />
              {t.wallpapers[id]}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="win-sunken p-3 m-0">
        <legend className="px-1 font-bold">Audio</legend>
        <button
          type="button"
          className={`win-btn ${enabled ? 'is-pressed' : ''}`}
          onClick={() => {
            const next = !enabled
            setEnabled(next)
            if (next) playClick()
          }}
        >
          {enabled ? t.soundOn : t.soundOff}
        </button>
      </fieldset>
    </div>
  )
}
