import type { UiStrings } from '../i18n/translations'

export function checkRequirements(t: UiStrings): string[] {
  const errors: string[] = []
  const iChrome = window.chrome
  if (!iChrome) {
    errors.push(t.cmdReqChrome)
  }
  if (!('LanguageModel' in window)) {
    errors.push(t.cmdReqApiOff)
    errors.push(t.cmdReqFlagTitle)
    errors.push(t.cmdReqFlagItem)
    errors.push(t.cmdReqRestart)
  }

  return errors
}

export function hardwareHints(t: UiStrings): string[] {
  return [t.cmdHwInternals, t.cmdHwHardware, t.cmdHwOs, t.cmdHwDownload]
}
