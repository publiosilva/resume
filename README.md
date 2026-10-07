# Resume OS 95

Interactive personal resume as a **Windows 95–style desktop SPA** (Vite + React + Tailwind). Bilingual **EN / PT-BR**, classic & dark themes, draggable windows, and GitHub Pages deploy.

Live (after Pages is enabled): https://publiosilva.github.io/resume/

The printable ATS resume remains under [`old/`](old/).

## Stack

- Vite + React 19 + TypeScript
- Tailwind CSS + custom Win95 tokens
- GitHub Actions → GitHub Pages (`base: '/resume/'`)

## Local development

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually `http://localhost:5173/resume/`).

```bash
npm run build    # output in dist/
npm run preview  # preview production build
```

## GitHub Pages

1. Push to `main` (workflow: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)).
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. After the workflow succeeds, open `https://publiosilva.github.io/resume/`.

`public/404.html` + a small redirect in `src/main.tsx` keep client-side routes working on Pages.

## Features

| Feature | Where |
|--------|--------|
| Desktop icons / windows | Double-click (tap on mobile) |
| Start menu | Language, theme, sound, GitHub, shortcuts |
| Control Panel | Wallpaper, theme, language, sound |
| Download CV | `Baixar_CV.pdf` / `Download_CV.pdf` → [`public/cv.pdf`](public/cv.pdf) |
| Shortcuts | `GitHub.url` and `LinkedIn.url` on the desktop |
| About Me | Microsoft Word–style document window |
| Contact | Outlook Express compose → `mailto:` |
| Projects | Windows Explorer folder of `.url` files |
| i18n | Default English; toggle to PT-BR |
| Sound | Muted by default (Web Audio beeps) |

## Replace the CV PDF

Overwrite [`public/cv.pdf`](public/cv.pdf) with your preferred export (e.g. from the ATS resume in `old/`).

## Project layout

```
src/
  apps/           # Window contents (About, Experience, …)
  components/     # Desktop, Taskbar, Window, StartMenu, …
  data/resume.ts  # EN + PT-BR resume content
  i18n/           # UI strings + provider
  theme/          # Classic / dark + wallpaper
  sound/          # Optional click / startup tones
  windows/        # Open / focus / drag / min / max
old/              # Legacy static ATS resume (untouched)
```
