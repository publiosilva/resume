import type { DesktopIconKind } from '../data/desktopFiles'
import {
  IconDll,
  IconFolder,
  IconPdf,
  IconTrash,
  IconUrl,
  IconWord,
} from './icons'

export function FileIcon({
  kind,
  className,
}: {
  kind: DesktopIconKind
  className?: string
}) {
  switch (kind) {
    case 'word':
      return <IconWord className={className} />
    case 'dll':
      return <IconDll className={className} />
    case 'folder':
      return <IconFolder className={className} />
    case 'pdf':
      return <IconPdf className={className} />
    case 'url':
      return <IconUrl className={className} />
    case 'trash':
      return <IconTrash className={className} />
  }
}
