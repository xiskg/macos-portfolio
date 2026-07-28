// ============================================================================
//  ICON LIBRARY — app icons (finder/safari/mail/photos/terminal/textedit/
//  trash) are real macOS icon assets extracted from the owner's own Mac.
//  Everything else (glyphs, file-type icons, Launchpad) is hand-drawn.
//
//  Usage: <Icon name="finder" size={52} />
//  Glyph icons (menubar etc.) use currentColor — style them with CSS `color`.
// ============================================================================

import finderPng from '../assets/icons/finder.png'
import safariPng from '../assets/icons/safari.png'
import mailPng from '../assets/icons/mail.png'
import photosPng from '../assets/icons/photos.png'
import terminalPng from '../assets/icons/terminal.png'
import texteditPng from '../assets/icons/textedit.png'
import trashPng from '../assets/icons/trash.png'

const REAL_ICONS = {
  finder: finderPng,
  safari: safariPng,
  mail: mailPng,
  photos: photosPng,
  terminal: terminalPng,
  textedit: texteditPng,
  trash: trashPng,
}

const S = { stroke: 'currentColor', fill: 'none', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }

// App icons (100x100) -------------------------------------------------------

const launchpad = (<>
  <defs>
    <linearGradient id="ic-lp-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#8b98ab" /><stop offset="1" stopColor="#4b5566" />
    </linearGradient>
  </defs>
  <rect x="7" y="7" width="86" height="86" rx="21" fill="url(#ic-lp-bg)" />
  {[0, 1, 2].map((r) =>
    [0, 1, 2].map((c) => (
      <rect key={`${r}${c}`} x={26 + c * 18} y={26 + r * 18} width="12" height="12" rx="3.5"
        fill="#ffffff" opacity={0.95 - (r + c) * 0.08} />
    ))
  )}
</>)

const folder = (<>
  <defs>
    <linearGradient id="ic-fold-a" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#59a5f5" /><stop offset="1" stopColor="#2f7fe0" />
    </linearGradient>
    <linearGradient id="ic-fold-b" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#7fbaf8" /><stop offset="1" stopColor="#4a90ec" />
    </linearGradient>
  </defs>
  <path d="M12 36 V27 q0-6 6-6 h19 q2 0 3.4 1.2 l4.6 4.3 q1.4 1.5 3.4 1.5 H82 q6 0 6 6 V36 Z" fill="url(#ic-fold-a)" />
  <path d="M12 42 q0-6 6-6 h64 q6 0 6 6 v30 q0 8-8 8 H20 q-8 0-8-8 Z" fill="url(#ic-fold-b)" />
  <path d="M18 43.5 h64" stroke="rgba(255,255,255,.4)" strokeWidth="1.5" />
</>)

const txt = (<>
  <rect x="26" y="12" width="48" height="76" rx="7" fill="#ffffff" stroke="#d6dbe3" strokeWidth="1.5" />
  <path d="M62 12 L74 24 H62 Z" fill="#eef2f7" stroke="#d6dbe3" strokeWidth="1.5" />
  {[36, 47, 58, 69].map((y, i) => (
    <rect key={y} x="34" y={y} width={[30, 32, 26, 20][i]} height="4" rx="2" fill="#c2cad6" />
  ))}
</>)

const imgIcon = (<>
  <rect x="26" y="12" width="48" height="76" rx="7" fill="#ffffff" stroke="#d6dbe3" strokeWidth="1.5" />
  <path d="M62 12 L74 24 H62 Z" fill="#eef2f7" stroke="#d6dbe3" strokeWidth="1.5" />
  <rect x="32" y="34" width="36" height="30" rx="3" fill="#bfe3ff" />
  <circle cx="41" cy="42" r="4" fill="#fbbf24" />
  <path d="M32 64 L44 48 L52 58 L58 50 L68 64 Z" fill="#34d399" />
</>)

const webloc = (<>
  <rect x="26" y="12" width="48" height="76" rx="7" fill="#ffffff" stroke="#d6dbe3" strokeWidth="1.5" />
  <path d="M62 12 L74 24 H62 Z" fill="#eef2f7" stroke="#d6dbe3" strokeWidth="1.5" />
  <circle cx="50" cy="54" r="16" fill="#3b82f6" />
  <ellipse cx="50" cy="54" rx="7" ry="16" fill="none" stroke="#dbeafe" strokeWidth="2" />
  <path d="M34 54 H66 M36.5 46 H63.5 M36.5 62 H63.5" stroke="#dbeafe" strokeWidth="2" fill="none" />
</>)

const github = (<>
  <rect x="7" y="7" width="86" height="86" rx="21" fill="#1b1f24" />
  <g transform="translate(21.5 24) scale(0.115)">
    <path fill="#ffffff" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.6 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
  </g>
</>)

const linkedin = (<>
  <rect x="7" y="7" width="86" height="86" rx="21" fill="#0a66c2" />
  <text x="50" y="67" fontFamily="Helvetica, Arial, sans-serif" fontWeight="bold" fontSize="44" fill="#ffffff" textAnchor="middle">in</text>
</>)

const spotlightApp = (<>
  <defs>
    <linearGradient id="ic-sp-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#64748b" /><stop offset="1" stopColor="#1e293b" />
    </linearGradient>
  </defs>
  <rect x="7" y="7" width="86" height="86" rx="21" fill="url(#ic-sp-bg)" />
  <circle cx="45" cy="45" r="18" fill="none" stroke="#ffffff" strokeWidth="7" />
  <path d="M59 59 L76 76" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
</>)

// Project glyphs (48x48, drawn on gradient placeholders) ---------------------

const pg = { stroke: 'currentColor', fill: 'none', strokeWidth: 3.5, strokeLinecap: 'round', strokeLinejoin: 'round' }

const projectGlyphs = {
  chart: <path {...pg} d="M10 40 V26 M20 40 V16 M30 40 V30 M40 40 V12" />,
  note: (<>
    <rect {...pg} x="11" y="7" width="26" height="34" rx="4" />
    <path {...pg} d="M17 16 H31 M17 23 H31 M17 30 H26" />
  </>),
  pulse: <path {...pg} d="M5 26 H14 L19 14 L25 36 L30 22 H43" />,
  shapes: (<>
    <circle {...pg} cx="16" cy="16" r="7" />
    <rect {...pg} x="27" y="9" width="14" height="14" rx="3" />
    <path {...pg} d="M16 30 L24 42 H8 Z" />
  </>),
  code: (<>
    <path {...pg} d="M9 12 L20 21 L9 30" />
    <path {...pg} d="M23 33 H39" />
  </>),
}

// Menu-bar / UI glyphs (24x24, currentColor) --------------------------------

const glyphs = {
  apple: {
    vb: '0 0 384 512',
    body: <path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />,
  },
  wifi: (<>
    <path {...S} d="M2.5 9.5 a15 15 0 0 1 19 0" />
    <path {...S} d="M5.8 13.2 a10 10 0 0 1 12.4 0" />
    <path {...S} d="M9 16.8 a5 5 0 0 1 6 0" />
    <circle cx="12" cy="19.6" r="1.7" fill="currentColor" />
  </>),
  battery: (<>
    <rect {...S} x="2" y="8" width="17" height="9" rx="2.5" />
    <rect x="3.8" y="9.8" width="11" height="5.4" rx="1.2" fill="currentColor" />
    <path d="M21 10.8 v3.4 a2.2 2.2 0 0 0 0-3.4 Z" fill="currentColor" />
  </>),
  search: (<>
    <circle {...S} cx="10.5" cy="10.5" r="6.5" />
    <path {...S} d="M15.5 15.5 L21 21" />
  </>),
  cc: (<>
    <rect {...S} x="3" y="4" width="18" height="7" rx="3.5" />
    <circle cx="8.2" cy="7.5" r="2.1" fill="currentColor" />
    <rect {...S} x="3" y="13" width="18" height="7" rx="3.5" />
    <circle cx="15.8" cy="16.5" r="2.1" fill="currentColor" />
  </>),
  chevL: <path {...S} d="M14.5 5.5 L8 12 L14.5 18.5" />,
  chevR: <path {...S} d="M9.5 5.5 L16 12 L9.5 18.5" />,
  x: <path {...S} d="M6 6 L18 18 M18 6 L6 18" />,
  minus: <path {...S} d="M5 12 H19" />,
  plus: <path {...S} d="M12 5 V19 M5 12 H19" />,
  external: <path {...S} d="M7 17 L17 7 M9.5 7 H17 V14.5" />,
  gridView: (<>
    <rect {...S} x="4" y="4" width="7" height="7" rx="1.6" />
    <rect {...S} x="13" y="4" width="7" height="7" rx="1.6" />
    <rect {...S} x="4" y="13" width="7" height="7" rx="1.6" />
    <rect {...S} x="13" y="13" width="7" height="7" rx="1.6" />
  </>),
  listView: (<>
    <path {...S} d="M8.5 6.5 H20 M8.5 12 H20 M8.5 17.5 H20" />
    <circle cx="4.8" cy="6.5" r="1.3" fill="currentColor" />
    <circle cx="4.8" cy="12" r="1.3" fill="currentColor" />
    <circle cx="4.8" cy="17.5" r="1.3" fill="currentColor" />
  </>),
  clock: (<>
    <circle {...S} cx="12" cy="12" r="8.5" />
    <path {...S} d="M12 7 V12 L15.5 14" />
  </>),
  monitor: (<>
    <rect {...S} x="3" y="5" width="18" height="12" rx="2" />
    <path {...S} d="M9 21 H15 M12 17 V21" />
  </>),
  airdrop: (<>
    <circle cx="12" cy="12" r="1.8" fill="currentColor" />
    <path {...S} d="M8.2 8.2 a5.5 5.5 0 0 0 0 7.6 M15.8 8.2 a5.5 5.5 0 0 1 0 7.6" />
    <path {...S} d="M5.5 5.5 a9.5 9.5 0 0 0 0 13 M18.5 5.5 a9.5 9.5 0 0 1 0 13" />
  </>),
  tag: (<>
    <path {...S} d="M4 4.5 h6.5 L20 14 l-6.5 6.5 L4 11 Z" />
    <circle cx="8" cy="8.5" r="1.3" fill="currentColor" />
  </>),
  compose: (<>
    <path {...S} d="M12.5 4.5 H6 a2 2 0 0 0 -2 2 v12 a2 2 0 0 0 2 2 h12 a2 2 0 0 0 2-2 v-6.5" />
    <path {...S} d="M17.6 3.4 a2.1 2.1 0 0 1 3 3 L11 16 l-4.2 1.2 L8 13 Z" />
  </>),
  sun: (<>
    <circle {...S} cx="12" cy="12" r="4.2" />
    <path {...S} d="M12 2.5 V5 M12 19 V21.5 M2.5 12 H5 M19 12 H21.5 M5.2 5.2 L6.9 6.9 M17.1 17.1 L18.8 18.8 M18.8 5.2 L17.1 6.9 M6.9 17.1 L5.2 18.8" />
  </>),
  moon: <path {...S} d="M20 14.5 A8.5 8.5 0 1 1 9.5 4 a7 7 0 0 0 10.5 10.5 Z" />,
  speaker: (<>
    <path d="M4 9.5 v5 h3.5 L13 19 V5 L7.5 9.5 Z" fill="currentColor" />
    <path {...S} d="M16 9.2 a4.5 4.5 0 0 1 0 5.6 M18.6 6.6 a8 8 0 0 1 0 10.8" />
  </>),
  bluetooth: <path {...S} d="M7 8 L17 16 L12.5 19 V5 L17 8 L7 16" />,
  trashGlyph: <path {...S} d="M4.5 7 H19.5 M9.5 7 V5.2 a1.2 1.2 0 0 1 1.2-1.2 h2.6 a1.2 1.2 0 0 1 1.2 1.2 V7 M7 7 l1 13 h8 l1-13" />,
  mailGlyph: (<>
    <rect {...S} x="3" y="5" width="18" height="14" rx="2" />
    <path {...S} d="M4 7.5 L12 13.5 L20 7.5" />
  </>),
  folderSm: <path {...S} d="M3 6.5 a2 2 0 0 1 2-2 h4 l2 2.5 h8 a2 2 0 0 1 2 2 v9 a2 2 0 0 1-2 2 H5 a2 2 0 0 1-2-2 Z" />,
  docSm: (<>
    <path {...S} d="M7 3.5 H13.5 L17 7 V20.5 H7 Z" />
    <path {...S} d="M13.5 3.5 V7 H17" />
  </>),
  linkSm: (<>
    <path {...S} d="M10 14 a4 4 0 0 0 6 .4 l2.5-2.5 a4 4 0 0 0-5.6-5.6 l-1.2 1.1" />
    <path {...S} d="M14 10 a4 4 0 0 0-6-.4 L5.5 12 a4 4 0 0 0 5.6 5.6 l1.2-1.1" />
  </>),
  globeSm: (<>
    <circle {...S} cx="12" cy="12" r="8.5" />
    <ellipse {...S} cx="12" cy="12" rx="4" ry="8.5" />
    <path {...S} d="M3.5 12 H20.5" />
  </>),
}

// ---------------------------------------------------------------------------

const APP_ICONS = { launchpad, folder, txt, img: imgIcon, webloc, github, linkedin, spotlightApp }

export default function Icon({ name, size = 48, className = '', style }) {
  if (REAL_ICONS[name]) {
    return (
      <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} aria-hidden="true">
        <image href={REAL_ICONS[name]} x="0" y="0" width="100" height="100" />
      </svg>
    )
  }
  if (projectGlyphs[name]) {
    return (
      <svg viewBox="0 0 48 48" width={size} height={size} className={className} style={style} aria-hidden="true">
        {projectGlyphs[name]}
      </svg>
    )
  }
  if (glyphs[name]) {
    return (
      <svg viewBox={glyphs[name].vb ?? '0 0 24 24'} width={size} height={size} className={className} style={style} aria-hidden="true">
        {glyphs[name].body ?? glyphs[name]}
      </svg>
    )
  }
  const body = APP_ICONS[name] ?? txt
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} aria-hidden="true">
      {body}
    </svg>
  )
}
