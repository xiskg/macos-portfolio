
// Anthony Baratta: the content of the "Client presentation v2 — full journey" deck (28 slides),
// told as a case study. Figures are cut from the deck; each section carries one figure.
const FIG = (n) => `/cases/anthony/fig/${n}.png`
const FIG_CREDIT = 'Anthony Baratta / Jewel project presentation'
const REF_CREDIT = 'Anthony Baratta / Jewel project presentation; reference photography belongs to its owners'
const fig = (name, alt, caption, credit = FIG_CREDIT) => [FIG(name), { alt, caption, credit }]

const FIGS = [
  fig('cover', 'Nautical porch with a ship’s wheel, blue wicker seating and a patterned floor', 'The reference world the identity had to live with: classic form, saturated color, collected objects. Reference photography belongs to its owners.', REF_CREDIT),
  fig('interiors-start', 'Anthony Baratta interior with a flag wall, plaid chairs and a red ottoman', 'Layered color, scale shifts, collected objects and pattern working together. Reference photography belongs to its owners.', REF_CREDIT),
  fig('signature-current', 'The current AB-and-anchor Anthony Baratta signature', 'The supplied current signature, the starting point for every study that follows.'),
  fig('work', 'Three Anthony Baratta interiors: a blue bedroom, a red-and-black bath and a plaid sitting room', 'Proportion, unexpected combinations, and color rooted in classic pairings. Reference photography belongs to its owners.', REF_CREDIT),
  fig('pattern-steps', 'Four steps of pattern construction: observe, reduce, build, test', 'Every brand pattern starts from a standout project and ends as a vector unit that tiles cleanly.'),
  fig('wobble', 'Wobble Check: a blue-and-white bedroom beside the irregular check tile it inspired', 'An 88×88 vector unit that preserves the loose diagonal rhythm of the source and tiles cleanly on a card back or envelope lining.'),
  fig('sawtooth', 'Sawtooth Quarter-Square: a red-and-black quilted bath beside its repeat', 'A sharper quarter-square repeat for moments that need energy, drawn from the quilted surface in the room.'),
  fig('swatches', 'Signature color swatches supplied by the Anthony Baratta team', 'The supplied swatches are the starting palette for marks and patterns. Digital approximations; final ink selection follows physical proofs.'),
  fig('five-symbols', 'Five one-color symbol directions side by side', 'Signal Pennant, Shell Cartouche, Collected Stripes, Carved Movement and Lighthouse Volute at a shared display area.'),
  fig('pennant', 'Signal Pennant symbol with reduction and reverse studies', 'A folded pennant turns a familiar check into motion. Shown with a small-size reduction and a reverse.'),
  fig('shell', 'Shell Cartouche symbol with reduction and reverse studies', 'A shell-like form becomes a collected decorative crest. Shown with reduction and reverse.'),
  fig('stripes', 'Collected Stripes symbol with reduction and reverse studies', 'Layered stripes become a compact, energetic silhouette. Shown with reduction and reverse.'),
  fig('anchor', 'Carved Movement anchor symbol with reduction and reverse studies', 'An anchor keeps the heritage and changes the character. Shown with reduction and reverse.'),
  fig('lighthouse', 'Lighthouse Volute symbol with reduction and reverse studies', 'A lighthouse becomes a bold silhouette inside a shaped field. Shown with reduction and reverse.'),
  ['/cases/anthony/name.png', { alt: 'Current signature compared with Seatren and Sunny Side lettering', caption: 'The current signature against the more characterful Seatren and Sunny Side direction. Spacing work preserved from the supplied studies.', credit: 'Anthony Baratta / Jewel project study; supplied signature reference' }],
  ['/cases/anthony/797-0.png', { alt: 'Seatren original and contour-reduced lettering comparison', caption: 'Original outlines above, reduced stroke weight below. Adjusted lettering studies, not an official Light font or final lettering.', credit: 'Anthony Baratta / Jewel project study; supplied signature reference' }],
  fig('type-directions', 'Seatren and Sunny Side set at the same wordmark width', 'Two lettering voices compared at the same wordmark width, all caps, with the same arrangement.'),
  fig('pair-pennant', 'Signal Pennant with Seatren: centered one-line, centered two-line and symbol-beside-name lockups', 'Proposed pairing for review. Centered one-line, centered two-line and symbol-beside-name arrangements.'),
  fig('pair-shell', 'Shell Cartouche with Sunny Side: centered one-line, centered two-line and symbol-beside-name lockups', 'The decorative alternative: a shell silhouette with softer lettering. Proposed pairing for review.'),
  fig('pair-lighthouse', 'Lighthouse Volute with Seatren: centered one-line, centered two-line and symbol-beside-name lockups', 'An architectural emblem balanced by straightforward lettering. Proposed pairing for review.'),
  fig('symbols-color', 'Five symbols in signature colors, each with the Seatren name', 'Digital color approximations. Seatren stays constant so symbols and colors can be compared; pairings are examples, not fixed assignments.'),
  fig('color-roles', 'Color roles: blue check, green quilt and red check', 'Navy and Resolute Blue, deep green and eucalyptus, red and Bed of Roses pink, each with white. Digital approximations from the team’s swatches.'),
  fig('corr-blue', 'Blue check stationery: card front, card reverse, envelope lining and envelope front', 'Signal Pennant with Seatren; the check continues on the card reverse and envelope lining. Concept stationery, digital color approximations.'),
]

const EXTRAS = [
  fig('corr-green', 'Green quilt stationery: card front, reverse, envelope lining and envelope front', 'Shell Cartouche with Sunny Side; the geometric repeat brings another rhythm. Concept stationery, digital color approximations.'),
  fig('corr-red', 'Red check stationery: card front, reverse, envelope lining and envelope front', 'Collected Stripes shows how the same stationery format can support another symbol. Concept stationery, digital color approximations.'),
  ['/cases/anthony/79A-0.png', { alt: 'Sunny Side paired with five existing Anthony Baratta symbols', caption: 'Existing comparison study. None of these symbols is presented as the final selection.', credit: 'Anthony Baratta / Jewel project study' }],
]

const ALL = [...FIGS, ...EXTRAS]

export const brandingCases29 = [
  {
    "id": "anthony-baratta",
    "name": "Anthony Baratta",
    "client": "Anthony Baratta · Jewel Branding & Licensing",
    "year": "2026",
    "kind": "Brand Strategy & Identity",
    "tagline": "Forty-five years of American design, in one mark.",
    "contribution": "Brand-development exploration in the Jewel project context. João’s documented contribution includes vector drawing, spacing and directed refinement. The studies combine supplied references with assisted development; they are not presented as exclusively hand-drawn work.",
    "status": "Identity exploration and refinement studies. Signal Pennant with Seatren is the proposed pairing for review; final name, symbol, lettering, production and launch are not established.",
    "sections": [
      {
        "title": "The Challenge",
        "text": "Anthony Baratta’s interiors bring together classic forms, confident color and a layered mix of patterns. The brief was to translate that recognizable point of view into a brand language that could extend beyond interiors into licensing: a logo and identity exploration that carries forty-five years of American design in a single mark, and then keeps working on a card, a tag, a bag or a swatch book."
      },
      {
        "title": "What We Heard",
        "text": "The client’s own phrases set the tone: “East Coast Nautical Chic,” and “Decorate Happy.” Preppy, polished and unmistakably joyful. These phrases guide mood and form; they do not require every mark to depict a boat, an anchor or the sea. From them the brief became five words, each a design test: classic (structure that outlasts a trend), colorful (a system built to hold strong color, not a multicolor icon), joyful (unexpected rhythm and a genuine sense of play), preppy (checks, stripes and tailored order, without stiffness) and smart (a mark that reveals intention and survives reduction)."
      },
      {
        "title": "The Starting Point",
        "text": "The AB-and-anchor signature has served the studio since 2012. It is compact, legible and well known, with a wink in the anchor tucked into the monogram. It has earned its place, so the studies build on that recognition instead of discarding it, and ask how it can stretch to work on a product, in a showroom and on a label. What to keep: presence, clarity and personality."
      },
      {
        "title": "The Work Itself",
        "text": "Forty-five years of design give the identity its vocabulary. Three rooms were read as evidence: proportion, with big gestures carefully balanced; unexpected combinations, layered with confidence so they never compete; and color that is clean, saturated and rooted in classic pairings. Rather than inventing a style, the system borrows the logic that already runs through the work."
      },
      {
        "title": "Pattern Construction",
        "text": "Every brand pattern originates in a standout project, and is built in four steps. Observe: find one repeatable rule in a photographed work. Reduce: separate that rule from the room, its furniture and its lighting. Build: draw a vector unit whose edges connect cleanly. Test: tile, recolor, crop and inspect the seams at real scale. The digital unit carries that structure into stationery and the other brand applications."
      },
      {
        "title": "Pattern Study: Wobble Check",
        "text": "An irregular, one-color check with personality, taken from the loose blue-and-white check across the bedding and furniture of a bedroom. It was redrawn as an 88×88 vector unit that preserves the loose diagonal rhythm, and its edges join cleanly, so the check can cover a card back or an envelope lining without a visible seam."
      },
      {
        "title": "Pattern Study: Sawtooth Quarter-Square",
        "text": "A sharper pattern for moments that need energy. Red, black and white quarter-square geometry from the quilted surface in a bathroom repeats into a crisp, directional rhythm that sits alongside the irregular check. Wobble Check and Sawtooth Quarter-Square moved forward as studies, while Quilt Star was set aside."
      },
      {
        "title": "Color Starts Here",
        "text": "Clean color, pitch perfect. The signature swatches supplied by the Anthony Baratta team are the starting range for testing hierarchy and pairing across marks and patterns, and for checking that a structural color can hold the composition while smaller accents bring energy. The applications use digital approximations of these swatches; final color selection and PMS matching follow approval and print testing."
      },
      {
        "title": "What a Symbol Must Do",
        "text": "The icon has to carry the brand, not just one collection. Four tests apply to every direction: grounded (rooted in the work, the archive or the existing brand DNA), ownable (a distinct silhouette, not a stock nautical pictogram), durable (clear in one color, reversed, on a business card, a hangtag or a woven rug label) and broad (as at home on a plaid throw or a Windsor chair as on a silk scarf). Familiar nautical cues were explored alongside abstract forms from textile rhythm and decorative objects, and each direction had to hold its own in a single color. Five were compared at a shared display area: Signal Pennant, Shell Cartouche, Collected Stripes, Carved Movement and Lighthouse Volute."
      },
      {
        "title": "Symbol: Signal Pennant",
        "text": "A folded pennant turns a familiar check into motion. The square gives the mark a tailored boundary, the central fold makes the flag feel like fabric rather than an arrow, and the single-color check fields keep the gesture legible. The check belongs to the textile language, so the pennant answers the team’s nautical direction without drawing a boat."
      },
      {
        "title": "Symbol: Shell Cartouche",
        "text": "A shell-like form becomes a collected decorative crest. Three generous lobes sit within a softened frame; the outer contour is contained while the internal curves carry richness without tiny ornament. The direction draws on the rooms’ love of distinctive objects and decorative forms, and the interior shown is visual context, not a literal shell source."
      },
      {
        "title": "Symbol: Collected Stripes",
        "text": "Layered stripes become a compact, energetic silhouette. The curves rise together while preserving clear intervals, with the engineered pacing of designed bands of color, rather than copying one pattern. It suggests one stripe pattern, and tests whether pattern alone can be the signature."
      },
      {
        "title": "Symbol: Carved Movement",
        "text": "An anchor keeps the heritage and changes the character. The eye and the upper bar are balanced, while the two lower ends are deliberately different, creating a carved, lively movement rather than a mechanically symmetrical symbol. The anchor is part of the existing identity and appears in the archive, so this route preserves recognition without rebuilding the AB-plus-anchor lockup."
      },
      {
        "title": "Symbol: Lighthouse Volute",
        "text": "A lighthouse becomes a bold silhouette inside a shaped field. A clear lantern and tower sit above a sweeping lower curve. The dark enclosure gives the white form strong contrast, while the curve adds sculptural energy and brings an architectural form into the nautical vocabulary."
      },
      {
        "title": "The Name Carries the Identity",
        "text": "The current signature is clean and geometric, and that familiar foundation is a useful starting point. Seatren and Sunny Side add fuller curves and a stronger silhouette while keeping a sans-serif construction, giving the name more character. All caps give the name a consistent height whether it sits on one line or two. The comparisons preserve João’s spacing work and expose the trade-off: reducing density also makes joins, diagonals and optical balance more demanding."
      },
      {
        "title": "A Lighter Balance",
        "text": "Refining the stroke weight helps the name and symbol work together. Both available fonts were Regular, so a lighter appearance required controlled adjustments to outlined letters rather than a simulated Light weight: original outlines above, reduced stroke weight below. Reducing the weight opens the lettering and gives the symbol more room, and the lighter result moves closer to the weight of the current signature. These are adjusted lettering studies, not an official Light font cut; final spacing and contours follow the direction choice."
      },
      {
        "title": "Two Type Directions",
        "text": "Seatren and Sunny Side, compared at the same wordmark width. Seatren’s crisp geometry gives the name a firm, tailored presence, and its sharp edges sit beside the folded pennant and an architectural lighthouse. Sunny Side’s rounder contours add warmth to the name; its softer silhouette relates to the shell without adding another layer of ornament. Typography narrowed to these two following the October review."
      },
      {
        "title": "The Pairing: Signal Pennant with Seatren",
        "text": "The proposed pairing. A familiar nautical cue, with more movement: the central fold makes the pennant feel like fabric, and its check connects the symbol to the pattern language already present in the work. Seatren gives that movement a steady counterpart, a clear geometric name that does not overpower the symbol. Centered one-line, centered two-line and symbol-beside-name arrangements were drawn so the system works in different formats."
      },
      {
        "title": "The Alternative: Shell Cartouche with Sunny Side",
        "text": "A broader decorative direction. The shell and its enclosing contour recall decorative objects and framed details in the rooms, offering a decorative alternative to the more explicitly nautical symbols. Sunny Side’s lighter lettering echoes the shell’s softer curves, giving the emblem room without adding more ornament. The symbol and type direction can also be discussed separately."
      },
      {
        "title": "The Alternative: Lighthouse Volute with Seatren",
        "text": "Architecture within a compact emblem. This version combines the full tower with a wave inside an arched field, giving the motif a clear silhouette. Seatren provides a simple geometric contrast to the curved base: the name stays familiar while the emblem carries the decorative detail. Pairing for review; the symbol and type direction can also be discussed separately."
      },
      {
        "title": "Five Symbols in Signature Colors",
        "text": "Color studies keep the forms intact and give the wider identity a shared palette: Signal Pennant in Blue Tang, Shell Cartouche in Chrome Green, Collected Stripes in Carnival Red, Carved Movement in Appalachian Brown and Lighthouse Volute in Blue Tang. Seatren stays constant here so symbols and colors can be compared; the pairings are examples, not fixed assignments."
      },
      {
        "title": "Color Roles in the System",
        "text": "A dark signature, white paper and a pattern with a defined place. Three families give the system its range: a blue check, anchored by navy, with Resolute Blue as a lighter accent; a green quilt, with a deep green that gives the shell its definition and eucalyptus that adds variation within the repeat; and a red check, where Bed of Roses is a gentler companion to the stationery red, which brings the energy. White keeps the writing surface clear, and pattern belongs on the reverse, the lining or the edge. These combinations use the team’s swatches as a starting range, and the paper studies that follow test color placement and pattern scale. Final ink specifications require physical proofs."
      },
      {
        "title": "The Application: Correspondence",
        "text": "Applications test how the language behaves. The blue check suite pairs Signal Pennant with Seatren: the check continues on the card reverse and the envelope lining, while the writing surface and envelope front stay white and quiet. The green quilt suite (Shell Cartouche with Sunny Side) shows how a geometric repeat brings another rhythm, and the red check suite (Collected Stripes) shows how the same stationery format can support another symbol. These are concept stationery in digital color approximations."
      }
    ],
    "deliverables": [
      "Visual Research",
      "Pattern Studies",
      "Symbol Exploration",
      "Typography Refinement",
      "Color Roles",
      "Conceptual Applications"
    ],
    "image": {
      "to": "#dcd5c2",
      "glyph": "shapes",
      "from": "#163b68"
    },
    "gallery": ALL.map(([u]) => u),
    "hero": "/cases/anthony/cover.png",
    "thumb": "/cases/anthony/cover.png",
    "artworks": Object.fromEntries(ALL)
  }
]
