# Engineering portfolio integration

Designer remains at `/`; `/branding` and `/branding/` resolve to the same Designer app, preserving query strings. Software Engineering links to `/dev/`. The retired developer persona and its old data are disabled. Product Design at `/product-design/` and its FastGovBid case remain unchanged.

Build with the existing `npm ci && npm run build` workflow (Node.js + Python 3). Output: `dist`. No extra build step for engineering: Vite copies `public/dev` unchanged. Existing Cloudflare worker name, assets binding, media handling and compatibility settings are retained. `base: '/'` ensures Vite bundles resolve from the Designer alias.

Engineering entry points: `/dev/`, `/dev/cloud-optimizer.html`, `/dev/casaos-mcp.html`, `/dev/bunker-outreach.html`, `/dev/resume/`, `/dev/resume/joao-software-developer-hydra.pdf`. Resume Markdown is available beside the PDF. Bunker is the featured project, with five short authorized source excerpts pinned to a reviewed snapshot, architecture and reliability decisions, and a clearly labeled fictional queue reconstruction. No private source link, operational data or sole-authorship claim. Resume dates and education are omitted pending verification.

Publication requires workspace approval. Before any push, verify Cloudflare Workers Builds production/preview branch triggers in the connected project; those settings are not in this repository. No GitHub Actions workflows were returned. Do not assume a draft PR prevents automatic deployment. After approval, use the official GitHub flow to push the prepared branch and open a draft PR, review its checks and preview, then separately obtain approval for merge/deploy.

Rollback after an authorized deployment: restore the previous Cloudflare deployment or revert this integration commit through a reviewed PR and authorized deploy. Baseline commit: 564e0e103ac37a50a1a5be13f2753c6f260c361e. No destructive reset or service restart is required. Smoke-test all URLs plus the existing Product Design video after either operation.

Public Bunker source: https://github.com/xiskg/bunker-outreach-public at bb97b213a5b9444ab6e8e4f1d661afc3cf5a5c92. Case excerpts link to that reviewed public snapshot. Original private source remains unchanged. Source repository creation is complete; site deployment still requires separate approval.
