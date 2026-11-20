# Product Design desktop shortcut — verification

Date: 2026-11-20. Follow-up to merged PR #1 (merged by xiskg at 19:38:27 UTC). Based on origin/main including the Resume removal; the merged PR cannot accept another change set.

## Scope and changes

- Active desktop personas: Brand Designer (`designer`) and Creative Developer (`dev`), selected through the normal power-on → boot → login flow.
- Removed prompts from PowerOffScreen (`src/App.jsx`), LoginScreen, WelcomeWidget, and MobileNotice, plus unused `.product-portfolio-link` CSS.
- Added Product Design.webloc to both persona trees and desktop lists in `src/content/fileSystem.js`.
- `Desktop.jsx` renders that shortcut as an accessible native link, labelled Product Design (opens in a new tab), with href=/product-design/, target=_blank and rel=noopener. Existing web-file icon, selection, dragging and positioning conventions are reused. Pointer drag suppresses navigation; keyboard activation remains native. Existing other desktop files retain their behavior.
- Default icon placement continues in a new column before the Dock, keeping the additional shortcut visible on shorter desktops. Saved user positions remain in effect.
- Existing Safari favorite remains unchanged. `src/ios/HomeScreen.jsx` and IOSShell are inactive: App currently routes widths below 760 directly to MobileNotice. No mobile desktop was invented or activated.

## Verification

- `npm run build`: passed (build.log).
- `npm run test:media`: all 14 passed.
- `git diff --check`: passed.
- Real Chrome headless with CDP, built dist served on loopback. `check.mjs` and `browser-results.json` record the procedure and results. Run from the agent workspace with local Node 22, HTTP port 8796 and CDP port 9296.
- Both personas at 1440×900 and 800×600: normal power-on/boot/login entry, no prompts on poweroff/login/welcome, shortcut visible above Dock, correct accessible label and link attributes, no horizontal overflow.
- Actual mouse activation for designer and Enter activation for developer each create a separate target at /product-design/; source desktop stays in place; new page window.opener is null. Actual pointer drags do not create tabs.
- 390×844 normal mobile entry: MobileNotice shown, no Product Designer prompt/link. Desktop does not mount at this width.
- Product Designer home and FastGovBid case: zero Resume/PDF controls, preserving PR #1.
- Inspected screenshots of the large designer desktop, compact developer desktop and mobile notice. Screenshots for both desktop personas/sizes plus compact poweroff/login are included.

## Limits and execution notes

The first browser run exceeded its 60-second command limit; the complete rerun passed with a 180-second limit (91 seconds including build). Initial npm invocation used the wrong HOME-relative runtime location; the successful build used the workspace-local out/tooling/node-v22.16.0-linux-x64/bin. A broad initial CSS replacement was corrected before the final build and screenshots.

At 800px the pre-existing oversized welcome text overlaps some existing secondary desktop icons; the new shortcut is visible and clickable. This change does not redesign that typography. Existing stored icon positions are not reset. No merge or deploy was performed; deployed behavior was not tested.
