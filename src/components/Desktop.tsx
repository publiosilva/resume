import { useState, type ReactNode } from 'react'
import { AboutMe } from '../apps/AboutMe'
import { Contact } from '../apps/Contact'
import { ControlPanel } from '../apps/ControlPanel'
import { Experience } from '../apps/Experience'
import { Explorer } from '../apps/Explorer'
import { Minesweeper } from '../apps/Minesweeper'
import { Projects } from '../apps/Projects'
import { Skills } from '../apps/Skills'
import { Trash } from '../apps/Trash'
import { DESKTOP_COLUMN_FILES } from '../data/desktopFiles'
import { useOpenDesktopItem } from '../hooks/useOpenDesktopItem'
import { useI18n } from '../i18n/I18nContext'
import { useWindows, type WindowId } from '../windows/windowStore'
import { DesktopIcon } from './DesktopIcon'
import { FileIcon } from './FileIcon'
import {
  IconControl,
  IconExplorer,
  IconMail,
  IconMines,
  IconTrash,
} from './icons'
import { Window } from './Window'

const BARE_WINDOWS: WindowId[] = [
  'about',
  'experience',
  'skills',
  'projects',
  'contact',
  'explorer',
  'trash',
]

function windowTitle(id: WindowId, t: ReturnType<typeof useI18n>['t']) {
  switch (id) {
    case 'about':
      return `${t.wordTitle} - ${t.icons.about}`
    case 'experience':
      return `${t.wordTitle} - ${t.icons.experience}`
    case 'skills':
      return `${t.skillsManagerTitle} - ${t.icons.skills}`
    case 'projects':
      return `${t.icons.projects} - ${t.explorerTitle}`
    case 'contact':
      return `${t.outlookTitle} - ${t.mailInbox}`
    case 'control':
      return t.icons.control
    case 'mines':
      return t.icons.mines
    case 'explorer':
      return t.windowsExplorer
    case 'trash':
      return t.icons.trash
  }
}

function windowBody(id: WindowId) {
  switch (id) {
    case 'about':
      return <AboutMe />
    case 'experience':
      return <Experience />
    case 'skills':
      return <Skills />
    case 'projects':
      return <Projects />
    case 'contact':
      return <Contact />
    case 'control':
      return <ControlPanel />
    case 'mines':
      return <Minesweeper />
    case 'explorer':
      return <Explorer />
    case 'trash':
      return <Trash />
  }
}

function windowIcon(id: WindowId): ReactNode {
  switch (id) {
    case 'about':
    case 'experience':
      return (
        <span className="w-4 h-4 inline-flex [&>svg]:w-4 [&>svg]:h-4">
          <FileIcon kind="word" />
        </span>
      )
    case 'skills':
      return (
        <span className="w-4 h-4 inline-flex [&>svg]:w-4 [&>svg]:h-4">
          <FileIcon kind="dll" />
        </span>
      )
    case 'projects':
      return (
        <span className="w-4 h-4 inline-flex [&>svg]:w-4 [&>svg]:h-4">
          <FileIcon kind="folder" />
        </span>
      )
    case 'contact':
      return (
        <span className="w-4 h-4 inline-flex [&>svg]:w-4 [&>svg]:h-4">
          <IconMail />
        </span>
      )
    case 'control':
      return (
        <span className="w-4 h-4 inline-flex [&>svg]:w-4 [&>svg]:h-4">
          <IconControl />
        </span>
      )
    case 'mines':
      return (
        <span className="w-4 h-4 inline-flex [&>svg]:w-4 [&>svg]:h-4">
          <IconMines />
        </span>
      )
    case 'explorer':
      return (
        <span className="w-4 h-4 inline-flex [&>svg]:w-4 [&>svg]:h-4">
          <IconExplorer />
        </span>
      )
    case 'trash':
      return (
        <span className="w-4 h-4 inline-flex [&>svg]:w-4 [&>svg]:h-4">
          <IconTrash />
        </span>
      )
  }
}

export function Desktop() {
  const { t } = useI18n()
  const { windows, isMobile } = useWindows()
  const openItem = useOpenDesktopItem()
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-10"
      style={{ background: 'var(--win-desktop)' }}
      onClick={() => setSelected(null)}
    >
      <div
        className="absolute top-3 left-3 flex flex-col flex-wrap gap-3 z-[1] max-h-[calc(100%-80px)] content-start"
        onClick={(e) => e.stopPropagation()}
      >
        {DESKTOP_COLUMN_FILES.map((item) => (
          <DesktopIcon
            key={item.id}
            label={t.icons[item.labelKey]}
            icon={<FileIcon kind={item.iconKey} />}
            selected={selected === item.id}
            onSelect={() => setSelected(item.id)}
            onOpen={() => openItem(item.id)}
          />
        ))}
      </div>

      <div
        className="absolute bottom-3 right-3 z-[1]"
        onClick={(e) => e.stopPropagation()}
      >
        <DesktopIcon
          label={t.icons.trash}
          icon={<IconTrash />}
          selected={selected === 'trash'}
          onSelect={() => setSelected('trash')}
          onOpen={() => openItem('trash')}
        />
      </div>

      <p className="absolute bottom-3 left-3 text-white/80 text-[11px] pointer-events-none z-[1] max-w-[50%]">
        {isMobile ? t.mobileHint : t.taskbarHint}
      </p>

      {windows.map((win) => (
        <Window
          key={win.id}
          win={win}
          title={windowTitle(win.id, t)}
          icon={windowIcon(win.id)}
          bare={BARE_WINDOWS.includes(win.id)}
        >
          {windowBody(win.id)}
        </Window>
      ))}
    </div>
  )
}
