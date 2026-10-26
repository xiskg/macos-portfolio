# Product design portfolio

Published at **https://dealmeida.me/product-design/**, alongside the existing macOS portfolio at `/`.

## Edit and build

- `content/HOME-PORTFOLIO-EN.md` and `content/CASE-FASTGOVBID-EN.md`: approved English copy.
- `build.py`: page composition and local navigation. Uses Python 3 standard library only.
- `styles.css`, `app.js`: isolated styles and interactions, loaded only on these pages.
- `assets/`: screenshots, walkthrough, fonts and resume. Preserve font licenses and image provenance.
- `content/RESUME-EN.md`: source copy for the published PDF.

From the repository root, `npm run build` generates `public/product-design/` and runs Vite. The generated directory is ignored by Git; the source and assets here are committed. Cloudflare Workers Builds supports Python 3 as well as Node.

The route prefix and public origin are set once at the top of `build.py`. Local links, media, canonical and social metadata use the same prefix. The CSS uses relative font paths so it also works on the deployment preview.

Cloudflare serves directory indexes and redirects `/product-design` to `/product-design/`. Missing pages under this path use its own `404.html` with status 404. The macOS app uses query parameters at `/`, so it does not need a catch-all route.

The walkthrough depicts intended interactions with demonstration data. The interactive search study is a reconstruction for this case. Neither represents evidence of a historical production release or measured user outcomes.

No private research records, service credentials or previous hosting identities belong in this directory.

`worker/media.js` handles byte-range requests for the walkthrough so mobile browsers can request and seek video segments. It is invoked for this exact video path only. Normal responses stream through; partial requests read the known video asset with an 8 MiB guard. If replacing the film, keep it under that bound or move video serving to an object-storage binding. `npm run test:media` covers byte ranges and validators.
