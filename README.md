# macOS Portfolio

A portfolio website disguised as the **macOS Tahoe 26** desktop — Liquid Glass
Dock, draggable windows, Finder, Safari, Mail, Photos, Terminal, Spotlight,
Launchpad, Control Center and Notification Center. Built with **React + Vite**,
zero UI libraries, and hand-tuned CSS throughout.

Content: **João de Almeida — Senior Brand & Visual Designer**, imported from
[xiskg/personal-website](https://github.com/xiskg/personal-website). Case-study
imagery is served from the original portfolio's CDN.

## Run it

The product-design portfolio lives at [`/product-design/`](https://dealmeida.me/product-design/), with its case at `/product-design/work/fastgovbid/`. Its self-contained source is in [`product-design/`](product-design/README.md). Builds require Node.js and Python 3 (standard library only); both are available in Cloudflare Workers Builds. `npm run build` builds both portfolios for the same deployment.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the production build
```

Deploy: it's a static SPA — drop `dist/` on GitHub Pages, Netlify, Vercel,
Cloudflare Pages, anywhere. `base: './'` is already set in `vite.config.js`.

## What's inside

| Area | Details |
| --- | --- |
| **Desktop** | Draggable icons (positions persisted), double-click to open, right-click context menu (Change Wallpaper ×4, Dark Mode, Open Terminal) |
| **Menu bar** | Live clock, real battery level (when the browser allows), Wi-Fi toggle, Apple/File/Edit/View/Window/Help menus, Restart & Shut Down (with boot screen) |
| **Dock** | Cursor-proximity magnification, bounce on launch, running indicators, Trash |
| **Windows** | Drag, 8-direction resize, minimize-to-Dock animation, zoom (double-click title bar or green light), focus/inactive styling |
| **Finder** | Sidebar (Recents/Desktop/Portfolio/Work Experience), icon & list views, back/forward history, search, status bar |
| **Terminal** | A real little shell over the virtual FS: `help`, `neofetch`, `ls`, `cd`, `cat`, `open`, `projects`, `skills`, `contact`, Tab-completion, history (↑/↓), `sudo` (try it) |
| **Safari** | Start page (Case Studies, Tech Projects, Around the Web), case-study pages with real imagery + testimonials, favorites bar |
| **Mail** | Inbox + Compose → opens a real `mailto:` |
| **Photos** | All 25 case images from the 4 galleries + full-screen viewer |
| **Spotlight** | `⌘Space` — searches apps, files and file *contents*, keyboard navigation |
| **Extras** | Launchpad, Control Center (working Dark Mode + brightness dimmer), Notification Center, About This Mac, mobile notice |

Deep links for demos: `?open=finder,terminal`, `&overlay=cc`, `&dark=1`,
`&wallpaper=2`, `&case=nutripharme` (opens the case in Safari),
`&project=checksy` (opens Photos at that album).

## ✏️ Editing the content

Everything the site shows comes from **one file**:

```
src/content/portfolio.js
```

Edit it and you're done — Finder folders, Safari pages, Photos gallery,
Terminal output, Spotlight index, Mail inbox and the resume document all
regenerate automatically. Nothing else needs to change.

| Export | Feeds |
| --- | --- |
| `profile` | Name, role, contact links, bio — used everywhere |
| `aboutParagraphs` | `About Me.txt` on the Desktop |
| `skills` + `metrics` | `About Me.txt`, `skills` command, resume |
| `projects` | Portfolio folder, Safari case pages, Photos, `projects` command |
| `experience` | Work Experience folder, resume |
| `education` | `About Me.txt`, resume |
| `resumeText` | `Resume.txt` (generated from the exports above) |
| `devProjects` + `devSkills` | Safari's Tech Projects section, `Dev Resume.txt` |
| `creditsText` | `Credits.txt` |
| `mailInbox` | Mail app threads |
| `notificationsSeed` | Notification Center |

Each project carries `hero`/`thumb`/`gallery` image URLs (currently the
framerusercontent CDN from the original site) plus an `image: { from, to }`
gradient used as a loading fallback. To self-host, drop files in `public/`
and swap the URLs.

## Structure

```
src/
├── content/        portfolio.js (YOUR DATA) + fileSystem.js (virtual FS)
├── system/         WindowManager, DesktopContext, useClock
├── components/     MenuBar, Dock, Desktop, Window, Icon, Spotlight,
│                   Launchpad, ControlCenter, NotificationCenter, …
├── apps/           Finder, TextEdit, Safari, Mail, Photos, Terminal, AboutMac
└── styles/         global (tokens/wallpapers), system, windows, panels
```

## Notes

- The Finder, Safari, Mail, Photos, Terminal, TextEdit and Trash icons
  (`src/assets/icons/`) are Apple Inc.'s own icon artwork, extracted from
  macOS for this simulation — they are **not** covered by this repo's MIT
  license (see below) and aren't affiliated with or endorsed by Apple. Swap
  them out if you fork this for your own use. Everything else — wallpapers,
  Launchpad/file-type icons, window chrome, glyphs — is drawn from scratch.
- Fonts come from the visitor's system (`-apple-system`).
- Not affiliated with Apple Inc. macOS is a trademark of Apple Inc.

## License & credits

MIT-licensed — see [`LICENSE`](LICENSE). Fork it, learn from it, ship your
own version; just keep the credit intact. The in-app `Credits.txt` (Desktop /
Finder / `cat "Credits.txt"` in Terminal) carries the same notice plus a full
breakdown of what's original vs. third-party.

Built by **João de Almeida** — [github.com/xiskg](https://github.com/xiskg).
