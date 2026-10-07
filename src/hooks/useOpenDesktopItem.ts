import { useCallback } from 'react'
import type { DesktopFileId } from '../data/desktopFiles'
import { useI18n } from '../i18n/I18nContext'
import { useSound } from '../sound/SoundContext'
import { useWindows, type WindowId } from '../windows/windowStore'

const WINDOW_FILES: DesktopFileId[] = [
  'about',
  'experience',
  'skills',
  'projects',
  'trash',
]

export function useOpenDesktopItem() {
  const { resume } = useI18n()
  const { playClick } = useSound()
  const { openWindow } = useWindows()

  return useCallback(
    (id: DesktopFileId) => {
      if (id === 'download') {
        playClick()
        const a = document.createElement('a')
        a.href = `${import.meta.env.BASE_URL}cv.pdf`
        a.download = 'Publio_Blenilio_CV.pdf'
        a.click()
        return
      }
      if (id === 'github') {
        playClick()
        window.open(resume.contact.github, '_blank', 'noreferrer')
        return
      }
      if (id === 'linkedin') {
        playClick()
        window.open(resume.contact.linkedin, '_blank', 'noreferrer')
        return
      }
      if (WINDOW_FILES.includes(id)) {
        openWindow(id as WindowId)
      }
    },
    [openWindow, playClick, resume.contact.github, resume.contact.linkedin],
  )
}
