/** Desktop / Explorer file ids (not Start Menu apps). */
export type DesktopFileId =
  | 'about'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'download'
  | 'github'
  | 'linkedin'
  | 'trash'

export type DesktopIconKind =
  | 'word'
  | 'dll'
  | 'folder'
  | 'pdf'
  | 'url'
  | 'trash'

export type DesktopFileDef = {
  id: DesktopFileId
  iconKey: DesktopIconKind
  /** i18n key under t.icons */
  labelKey: DesktopFileId
}

/** Files shown on the desktop and inside Windows Explorer. */
export const DESKTOP_FILES: DesktopFileDef[] = [
  { id: 'about', iconKey: 'word', labelKey: 'about' },
  { id: 'experience', iconKey: 'word', labelKey: 'experience' },
  { id: 'skills', iconKey: 'dll', labelKey: 'skills' },
  { id: 'projects', iconKey: 'folder', labelKey: 'projects' },
  { id: 'download', iconKey: 'pdf', labelKey: 'download' },
  { id: 'github', iconKey: 'url', labelKey: 'github' },
  { id: 'linkedin', iconKey: 'url', labelKey: 'linkedin' },
  { id: 'trash', iconKey: 'trash', labelKey: 'trash' },
]

/** Files listed in Explorer (same set as desktop). */
export const EXPLORER_FILES = DESKTOP_FILES

/** Main column on desktop (trash sits separately bottom-right). */
export const DESKTOP_COLUMN_FILES = DESKTOP_FILES.filter((f) => f.id !== 'trash')
