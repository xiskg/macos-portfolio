---
name: João de Almeida Portfolio
description: A project-review portfolio for product and interface design work.
colors:
  paper: "#ffffff"
  ink: "#17201f"
  secondary: "#545d5b"
  rule: "#d9dfdc"
  mat: "#edf1f5"
  cobalt: "#1949e8"
  pale-blue: "#eef2ff"
  selection-wash: "#d9e1ff"
typography:
  display:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(44px, 6.5vw, 90px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "clamp(32px, 3.4vw, 48px)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Archivo, Arial, sans-serif"
    fontSize: "25px"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "3px"
  md: "4px"
  lg: "8px"
  circle: "50%"
spacing:
  sm: "12px"
  md: "24px"
  lg: "32px"
  xl: "48px"
  section: "72px"
components:
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    height: "44px"
  comparison-tab:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.secondary}"
    typography: "{typography.label}"
    padding: "14px 22px 12px"
    height: "48px"
  zoom-control:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    padding: "8px"
    height: "44px"
  film-start:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 20px"
    height: "48px"
  interface-plate:
    backgroundColor: "{colors.mat}"
    rounded: "{rounded.md}"
    padding: "24px"
  contact-field:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.paper}"
    typography: "{typography.headline}"
    padding: "72px 5.2vw 22px"
---

# Design System: João de Almeida Portfolio

## Overview

**Creative North Star: “The Project Review”**

The portfolio is an open drawing surface for reviewing one substantial product. It leads from the whole interface to close inspection of three design decisions, using generous white space, near-black type, thin rules and a decisive cobalt contact field. The portfolio's own frame stays quiet so the FastGovBid work can carry the detail.

Archivo headlines and Inter body copy create a clear editorial hierarchy. Interface images remain untinted; pale neutral mats and restrained borders hold them on the page. Local HTML, CSS and JavaScript provide the navigation, comparisons and image viewer without an external runtime.

**Key Characteristics:**
- White pages with near-black type and cobalt for links, active states and contact.
- Large interface plates, precise captions and open layouts instead of repeated feature tiles.
- Archivo display type paired with Inter body text.
- Responsive navigation and chapter index, with keyboard-operable comparisons and image zoom.

## Colors

The palette keeps the portfolio neutral and reserves saturated cobalt for wayfinding, active states and the final contact field.

### Primary
- **Committed Cobalt**: The main accent for links, active tabs, the home headline accent and contact surface.

### Neutral
- **White Paper**: The page and dialog surface.
- **Near-Black Ink**: Main text, headings and the wordmark.
- **Quiet Gray**: Secondary copy and captions.
- **Fine Rule**: Dividers and light component borders.
- **Cool Mat**: The backing surface around screenshots and video.
- **Pale Blue Wash**: A small explanatory callout surface.
- **Selection Wash**: The background for selected text.

**The Cobalt Wayfinding Rule.** Keep cobalt tied to navigation, interaction and the contact destination; let the interface plates retain their source colors.

## Typography

**Display Font:** Archivo (with Arial, sans-serif fallback)  
**Body Font:** Inter (with Arial, sans-serif fallback)  
**Label/Mono Font:** Inter (no separate mono face)

**Character:** Archivo gives large headings a compact, confident voice. Inter keeps supporting explanation and labels readable beside detailed product images. Both WOFF2 families are self-hosted; the page does not fetch fonts from an external runtime.

### Hierarchy
- **Display** (500, 44–90px responsive; 96px on wide screens, 1.04 line-height): Home headline; the wide-screen cap reaches 96px.
- **Headline** (500, 32–48px, 1.08 line-height): Case chapters and prominent contact copy.
- **Title** (500, 23–34px depending on component, about 1.2 line-height): Project and subsection headings.
- **Body** (400, 16px, 1.65 line-height; long case copy uses 1.85 and a 68ch measure): Main explanations and supporting context.
- **Label** (400, 11–14px, 1.5 line-height): Navigation, metadata, captions and controls.

**The 96px Ceiling Rule.** Display type tops out at 96px on wide screens; preserve the responsive reductions at tablet and phone sizes.

## Layout

Content sits in a centered frame capped at 1440px. Horizontal gutters use `clamp(22px, 5.2vw, 88px)`, changing to 28px at widths up to 800px and 22px up to 560px. The home page opens with direct navigation, a left-aligned headline and introduction, then a wide project plate. The case page begins with the project identity and a 16:9 film, followed by a desktop chapter index and a single reading column.

At 1100px the case index and content column tighten. At 800px the case index becomes a sticky horizontal rail; at 560px the About navigation link is removed and the page stacks into one column. The search and partner comparisons keep their tab controls horizontally readable. Body text commonly uses a 68–70ch measure, while image plates expand to the content width.

## Elevation & Depth

Depth comes mainly from spacing, fine borders and the pale mat around large interface images. The home cover image has a very subtle resting shadow and lifts slightly on hover; the rest of the page stays visually flat. The image viewer uses a dark translucent backdrop to separate the inspected image from the page.

**The Quiet Surface Rule.** Use the mat and spacing to distinguish artifacts; reserve shadow and movement for the home cover response.

## Shapes

The presentation frame uses mostly square-ended controls and small corner radii: 3px on narrow cover mats and 4px on image plates, video and dialog. Source screenshots keep their original pixel colors and are not recolored or tinted. Thin neutral borders separate image edges from the mat; the portfolio does not add ornamental dashboard chrome. The small circular mark at the cover corner is a functional affordance, not a general shape vocabulary.

## Components

### Navigation
- **Style:** A 96px desktop header, with wordmark on the left and direct Work, About, Resume and contact links on the right. Links have at least 44px touch height and underline on hover.
- **Responsive behavior:** Header height becomes 80px below 800px and 74px below 560px. Contact leaves the header below 800px; About leaves it below 560px. The case chapter index becomes a sticky, horizontally scrollable rail below 800px.
- **Focus:** Links and controls use a 3px cobalt outline with a 5px offset; focus on contact links uses a white outline.

### Text Links
- **Character:** Plain text links with a small directional cue rather than filled button chrome.
- **States:** Hover changes the link to cobalt; directional arrows shift 4px. Controls have a 44px minimum height.

### Comparison Tabs
- **Shape:** Square-ended controls over a thin neutral baseline.
- **State:** The selected tab uses cobalt text and a 2px cobalt underline; unselected tabs remain transparent and neutral.
- **Keyboard:** Left/Right Arrow moves between tabs; Home and End select the first and last tab. Focus follows selection.

### Interface Plates
- **Shape:** Small 4px corners, with a thin neutral image border.
- **Surface:** Screenshots sit on the cool mat with responsive padding. Captions stay below the plate in quiet gray. The screenshot image itself is not recolored.
- **Use:** Place one substantial artifact in the reading flow, then use close-ups where the case explanation needs them.

### Image Zoom Dialog
- **Shape:** A bordered, 4px dialog with a toolbar and a scrollable image area. On phones it fills the viewport with square edges.
- **Behavior:** Opens from an interface plate, offers Actual size / Fit to screen, locks page scrolling, and restores focus to the opening link when closed. Native dialog keyboard behavior is retained; Escape closes it.
- **Surface:** A dark translucent backdrop separates the image while keeping the interface pixels intact.

### Film Player
- **Character:** A static 16:9 poster carries one clear Play walkthrough button; the film does not move until the visitor activates it.
- **Control:** The accessible button sits over a near-black control panel, changing to cobalt on hover. It is 48px high on desktop and 44px on phones, with 14px and 12px labels respectively.
- **Behavior:** Metadata preload supports the poster presentation. On activation the button gives way to native inline video controls and muted playback; no autoplay or scroll trigger is used. If playback fails, the play action returns with a retry label.

### Contact Field
- **Character:** A full-width cobalt destination with white heading and direct email, LinkedIn and resume links.
- **Layout:** Two columns on wider screens, stacked on narrow phones; a thin lighter-blue rule separates the compact footer line.

## Do's and Don'ts

### Interaction Study and Delivery Records

The case adds a neutral-mat interaction study using native select and checkbox controls, pressed-state mode buttons, a retained-condition row and a polite live status. It is identified as a new specification demonstration with sample criteria. Summary rows, a dated delivery list and expandable acceptance notes use the existing typography and rules. Summary rows stack on phones; condition removal restores keyboard focus to a visible mode button.

### Do:
- **Do** keep the portfolio frame white, with near-black copy, cobalt wayfinding and a cobalt contact field.
- **Do** let a large FastGovBid interface plate lead the home page and keep explanations beside the evidence they describe.
- **Do** use the local Archivo and Inter font files; preserve the available system fallbacks.
- **Do** keep screenshot pixels untinted and label artifacts with their provenance; origins are recorded in the asset manifest and image sidecars.
- **Do** preserve visible keyboard focus, tab arrow-key behavior, image zoom controls and reduced-motion behavior.

### Don't:
- **Don't** turn the portfolio into a grid of repeated feature tiles or add ornamental dashboard chrome.
- **Don't** treat interface details inside Paper exports as rules for the portfolio's own interface; those images document FastGovBid artifacts.
- **Don't** apply color filters to screenshots or use them as generic decorative backgrounds.
- **Don't** add external font or application runtime dependencies to this static presentation.
