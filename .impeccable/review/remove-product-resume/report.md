# Remove Resume from Product Designer

Request: remove the outdated CV controls from the Product Designer area of the macOS portfolio.

Changed `product-design/build.py` (shared header/footer and case sidebar), the home/case manuscript calls to action, and unused `.index-resume` CSS. Generated home, case and 404 inherit the change. Desktop persona virtual documents and the underlying PDF asset are outside this change; existing direct PDF URLs are not revoked.

Validation on 2026-11-20:
- `npm ci --no-audit --no-fund`: passed.
- `npm run build`: passed (Vite 6.4.3).
- `npm run test:media`: 14 passed, zero failed.
- `git diff --check`: passed.
- Local production build served on loopback; fresh headless Chrome session navigated `/`, clicked the normal “View product design work” link, then checked home and FastGovBid at 1440 and 390 px. No Resume/PDF controls, no horizontal overflow; work navigation, email and LinkedIn remain. Machine-readable results are alongside this report.
- Screenshots and the CDP verification script retained in the agent workspace at `out/remove-product-resume/`. This was a DOM/browser verification, not a human visual review.

No merge or deployment performed. Publication requires owner approval.
