type IconProps = { className?: string }

export function IconMyComputer({ className = 'pixel-icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <rect x="4" y="4" width="24" height="18" fill="#c0c0c0" stroke="#000" />
      <rect x="7" y="7" width="18" height="12" fill="#000080" />
      <rect x="10" y="22" width="12" height="3" fill="#c0c0c0" stroke="#000" />
      <rect x="6" y="25" width="20" height="3" fill="#808080" stroke="#000" />
    </svg>
  )
}

export function IconDocument({ className = 'pixel-icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <path d="M8 2h12l6 6v20H8z" fill="#fff" stroke="#000" />
      <path d="M20 2v6h6" fill="#c0c0c0" stroke="#000" />
      <line x1="11" y1="14" x2="21" y2="14" stroke="#000080" />
      <line x1="11" y1="18" x2="21" y2="18" stroke="#000080" />
      <line x1="11" y1="22" x2="18" y2="22" stroke="#000080" />
    </svg>
  )
}

/** Classic Win95 .dll — document with gear */
export function IconDll({ className = 'pixel-icon' }: IconProps) {
  const teeth = [0, 45, 90, 135, 180, 225, 270, 315]
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      {/* Document */}
      <path d="M8 2h12l6 6v20H8z" fill="#f0f0f0" stroke="#000" />
      <path d="M20 2v6h6" fill="#a8a8a8" stroke="#000" />
      {/* Gear */}
      <g transform="translate(16 18)">
        {teeth.map((a) => (
          <rect
            key={a}
            x={-1.6}
            y={-9.2}
            width="3.2"
            height="4.5"
            rx="0.4"
            fill="#808080"
            stroke="#000"
            strokeWidth="0.6"
            transform={`rotate(${a})`}
          />
        ))}
        <circle r="6" fill="#808080" stroke="#000" />
        <circle r="3.4" fill="#c0c0c0" stroke="#000" />
        <circle r="1.6" fill="#404040" stroke="#000" />
        <circle cx="-1.2" cy="-1.2" r="0.8" fill="#fff" opacity="0.65" />
      </g>
    </svg>
  )
}

export function IconFolder({ className = 'pixel-icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <path d="M4 10h8l2 3h14v14H4z" fill="#ffcc00" stroke="#000" />
      <path d="M4 13h24v14H4z" fill="#ffd94d" stroke="#000" />
    </svg>
  )
}

export function IconMail({ className = 'pixel-icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <rect x="3" y="8" width="26" height="18" fill="#fff" stroke="#000" />
      <path d="M3 8l13 10L29 8" fill="none" stroke="#000080" strokeWidth="2" />
    </svg>
  )
}

export function IconPdf({ className = 'pixel-icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <path d="M8 2h12l6 6v20H8z" fill="#fff" stroke="#000" />
      <path d="M20 2v6h6" fill="#ff8080" stroke="#000" />
      <rect x="10" y="14" width="12" height="10" fill="#c00000" />
      <rect x="12" y="17" width="2" height="5" fill="#fff" />
      <rect x="15" y="17" width="2" height="5" fill="#fff" />
      <rect x="18" y="17" width="2" height="5" fill="#fff" />
    </svg>
  )
}

/** Exclusive icon for Internet Shortcut (.url) files */
export function IconUrl({ className = 'pixel-icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <path d="M7 3h12l6 6v20H7z" fill="#e8f4ff" stroke="#000" />
      <path d="M19 3v6h6" fill="#7ec8ff" stroke="#000" />
      <circle cx="16" cy="18" r="7" fill="#1084d0" stroke="#000" />
      <ellipse cx="16" cy="18" rx="3" ry="7" fill="none" stroke="#fff" />
      <line x1="9" y1="18" x2="23" y2="18" stroke="#fff" />
      <line x1="10" y1="14" x2="22" y2="14" stroke="#cfe9ff" />
      <line x1="10" y1="22" x2="22" y2="22" stroke="#cfe9ff" />
      <path
        d="M8 26h6l2 3 2-3h6"
        fill="#ffff00"
        stroke="#000"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** @deprecated alias — use IconUrl */
export const IconShortcut = IconUrl

export function IconWord({ className = 'pixel-icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <path d="M8 2h12l6 6v20H8z" fill="#fff" stroke="#000" />
      <path d="M20 2v6h6" fill="#a0c4ff" stroke="#000" />
      <rect x="10" y="13" width="12" height="12" fill="#000080" />
      <path d="M12 22 V15 h2 l1.5 5 1.5-5 h2 v7 h-1.5 v-5 l-1.5 5 h-1 L13.5 17 v5z" fill="#fff" />
    </svg>
  )
}

/** Classic Win95 Control Panel — CRT, mouse, color chips */
export function IconControl({ className = 'pixel-icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      {/* Monitor body */}
      <rect x="3" y="3" width="20" height="17" fill="#c0c0c0" stroke="#000" />
      <rect x="5" y="5" width="16" height="11" fill="#000080" />
      {/* Desktop wallpaper hint */}
      <rect x="6" y="6" width="14" height="9" fill="#008080" />
      <rect x="8" y="8" width="4" height="3" fill="#ffff00" stroke="#000" strokeWidth="0.5" />
      <rect x="13" y="10" width="5" height="3" fill="#fff" stroke="#000" strokeWidth="0.5" />
      {/* Bezel / stand */}
      <rect x="10" y="20" width="6" height="2" fill="#a0a0a0" stroke="#000" />
      <rect x="7" y="22" width="12" height="3" fill="#c0c0c0" stroke="#000" />
      {/* Mouse */}
      <ellipse cx="26" cy="22" rx="4" ry="5" fill="#dfdfdf" stroke="#000" />
      <line x1="26" y1="17" x2="26" y2="22" stroke="#808080" />
      <path d="M26 12 v5" stroke="#404040" strokeWidth="1" fill="none" />
      {/* Color chips (palette) */}
      <rect x="22" y="4" width="5" height="5" fill="#ff0000" stroke="#000" />
      <rect x="25" y="7" width="5" height="5" fill="#00a000" stroke="#000" />
      <rect x="22" y="10" width="5" height="5" fill="#0000ff" stroke="#000" />
    </svg>
  )
}

export function IconTrash({ className = 'pixel-icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <rect x="8" y="10" width="16" height="18" fill="#c0c0c0" stroke="#000" />
      <rect x="10" y="12" width="3" height="13" fill="#808080" />
      <rect x="14.5" y="12" width="3" height="13" fill="#808080" />
      <rect x="19" y="12" width="3" height="13" fill="#808080" />
      <rect x="7" y="8" width="18" height="3" fill="#dfdfdf" stroke="#000" />
      <rect x="12" y="5" width="8" height="4" fill="#a0a0a0" stroke="#000" />
    </svg>
  )
}

export function IconExplorer({ className = 'pixel-icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <rect x="3" y="6" width="26" height="20" fill="#c0c0c0" stroke="#000" />
      <rect x="5" y="8" width="10" height="16" fill="#fff" stroke="#000" />
      <path d="M6 10h6M6 13h5M6 16h6M6 19h4" stroke="#000080" strokeWidth="1" />
      <rect x="16" y="8" width="11" height="16" fill="#008080" stroke="#000" />
      <rect x="18" y="11" width="4" height="3" fill="#ffff00" stroke="#000" />
      <rect x="23" y="15" width="3" height="2" fill="#fff" />
    </svg>
  )
}

export function IconMines({ className = 'pixel-icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <rect x="4" y="4" width="24" height="24" fill="#c0c0c0" stroke="#000" />
      <rect x="6" y="6" width="20" height="20" fill="#808080" />
      {[0, 1, 2, 3].flatMap((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={7 + c * 5}
            y={7 + r * 5}
            width="4"
            height="4"
            fill="#bdbdbd"
            stroke="#404040"
            strokeWidth="0.5"
          />
        )),
      )}
      <circle cx="16" cy="16" r="5" fill="#202020" stroke="#000" />
      <circle cx="14.5" cy="14.5" r="1.2" fill="#fff" />
      <line x1="16" y1="9" x2="16" y2="7" stroke="#202020" strokeWidth="2" />
      <line x1="16" y1="7" x2="19" y2="5" stroke="#ff0000" strokeWidth="1.5" />
    </svg>
  )
}

/** Start / OS mark — classic 2×2 color tiles */
export function IconStart({ className = 'pixel-icon' }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      width="16"
      height="16"
      aria-hidden
    >
      <rect width="16" height="16" fill="#008080" />
      <rect x="1" y="1" width="6" height="6" fill="#ff0000" />
      <rect x="9" y="1" width="6" height="6" fill="#00ff00" />
      <rect x="1" y="9" width="6" height="6" fill="#0000ff" />
      <rect x="9" y="9" width="6" height="6" fill="#ffff00" />
    </svg>
  )
}

/** Larger OS brand mark (boot screen) */
export function IconOs({ className = 'pixel-icon' }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" fill="#008080" />
      <rect x="1" y="1" width="14" height="14" fill="#ff0000" />
      <rect x="17" y="1" width="14" height="14" fill="#00ff00" />
      <rect x="1" y="17" width="14" height="14" fill="#0000ff" />
      <rect x="17" y="17" width="14" height="14" fill="#ffff00" />
    </svg>
  )
}
