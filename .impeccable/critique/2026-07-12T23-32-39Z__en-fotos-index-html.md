---
target: en-fotos/index.html
total_score: 27
p0_count: 1
p1_count: 1
timestamp: 2026-07-12T23-32-39Z
slug: en-fotos-index-html
---
Method: dual-agent (A: general-purpose critique-A-en-fotos · B: general-purpose critique-B-en-fotos)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No "photo X of Y" indicator anywhere; `data-photo-count` exists but is never rendered |
| 2 | Match System / Real World | 4 | Real barrio names/descriptions; photo counts verified to match actual asset folders (19/10/20) |
| 3 | User Control and Freedom | 4 | Escape/click-outside close lightbox; explicit back link |
| 4 | Consistency and Standards | 2 | Two hardcoded one-off colors (`#009fd1`, `#14bce5`) instead of the documented `--brand-cyan` token |
| 5 | Error Prevention | 3 | No broken-image fallback, but low actual risk |
| 6 | Recognition Rather Than Recall | 2 | Every photo button in a gallery shares one identical `aria-label` |
| 7 | Flexibility and Efficiency | 3 | Real `<button>` elements, arrow-key nav, touch-swipe via scroll-snap |
| 8 | Aesthetic and Minimalist Design | 2 | Three reel sections visually identical chrome-for-chrome |
| 9 | Error Recovery | 2 | No visible failure state for broken image load |
| 10 | Help and Documentation | 3 | N/A-heavy |
| **Total** | | **27/40** | **Acceptable — solid mechanics, flat identity, one business-critical omission** |

## Anti-Patterns Verdict

Detector (CLI, exit 2): overused-font/single-font (Inter — confirmed intentional brand rule, false positive), broken-image at line 173 (confirmed false positive — lightbox template `<img>`, populated by script.js at runtime), numbered-section-markers advisory (01-03 labeling three real reel sections — legitimate, not scaffolding).

LLM assessment: **fails the slop test in one specific, avoidable spot** — the three gallery sections stack a fresh, page-local **side-stripe border** (`.photos-reel-section::before`, styles.css:5612-5618, an 8px left-edge gradient bar) on top of the numbered-badge + eyebrow pattern, identically, three times, for very different emotional registers (community/faith vs. beach leisure). The side-stripe pattern exists nowhere else on the site — it's new, not inherited debt. No browser automation was available in this session; findings are from static source read.

## Overall Impression

Photo/data integrity and keyboard handling are genuinely stronger than expected — but the page is missing its own site's primary conversion mechanism entirely, and its "Fotos" line-color identity never actually appears on the page meant to carry it.

## What's Working

1. Photo/data integrity: all three galleries' `data-photo-count` match actual asset folder counts (19/10/20); real per-photo alt text generated from filename/index, not placeholders.
2. Keyboard/focus handling exceeds expectations: real `<button>` cards, ArrowLeft/ArrowRight + Escape in the lightbox, visible focus rings — resolves the historically-pending "keyboard nav in carousel/lightbox" concern (though see P1 below on focus containment).
3. Hero composition uses a real directional overlay gradient, not a flat scrim, keeping the photo legible while guaranteeing text contrast.

## Priority Issues

- **[P0] The page's own footer/social CTA is completely missing.** No `<footer>` element at all (unlike index.html's `#contacto` footer with Instagram/Facebook/TikTok). PRODUCT.md names En Fotos as exactly the fallback page for visitors "todavía no están listos para seguir en redes" — this is precisely the page where that CTA matters most, and it's absent (reachable only via 2 clicks through header nav → Contacto, unlabeled as a follow prompt). → `/impeccable clarify` or `/impeccable polish`
- **[P1] Identical `aria-label` collapses accessible names across every photo in a gallery.** `script.js:208` sets a constant-per-section label ("Ampliar Parroquia del Dique"); the genuinely descriptive per-photo alt text is masked because the button's aria-label wins accessible-name computation. A screen-reader user hears the same name 19 times with no way to distinguish photos before opening them. → `/impeccable harden`
- **[P2] Fresh side-stripe pattern + off-token colors; the "Fotos" line color never appears on the Fotos page.** `.photos-reel-section::before` and `.photos-reel-eyebrow` use one-off hex colors (`#14bce5`, `#009fd1`) instead of the documented `--brand-cyan`/`--brand-lime` tokens — the celeste/lima identity DESIGN.md assigns to this content line is completely absent from its own dedicated page. → `/impeccable colorize`
- **[P2] No visibility of position/count anywhere.** Neither lightbox nor reel shows "3 of 19"; boundary prev/next arrows give no feedback. → `/impeccable clarify`
- **[P3] Three galleries are template-identical with zero visual differentiation** despite very different moods (faith/community vs. beach leisure). → `/impeccable delight`

## Persona Red Flags

**Sam (accessibility-dependent):** Cannot distinguish photo 3 from photo 17 before activating one (identical aria-label); no "photo X of Y" announcement inside the lightbox.

**Casey (mobile):** Mechanically well-served (78vw peeking cards, 48px+ touch targets, native scroll-snap) — one friction point: mobile hero is `min-height: 78svh`, a long thumb-commitment before any actual photo appears on a page whose whole purpose is photos.

**Local resident (project-specific):** Two of three galleries are Punta Lara-adjacent; a resident from elsewhere in Ensenada may not yet see their own barrio represented. And if she is represented and feels proud, she hits the same P0 dead end as everyone else — no way to convert that feeling into following Turismo Ensenada.

## Minor Observations

- `image.sizes = "260px"` hardcoded in script.js:214, but the mobile card is `minmax(230px, 78vw)` — on a 400px phone the card renders ~310px while told to fetch for 260px, likely under-serving resolution.
- `data-photo-count` is read only to generate DOM nodes, never surfaced to the user as a visible "19 fotos" label.
- Header nav's "Contacto" link does resolve to the homepage footer's social links — just two clicks removed and never labeled as a follow prompt.

## Questions to Consider

- If this page exists specifically for people not ready to follow yet, why does it end in silence instead of the one prompt most likely to land at that moment of goodwill?
- The homepage teaser card for this page carries celeste + lima. What is the "Fotos" line color for, if it never appears on the Fotos page itself?
- Would a visitor scrolling past three visually identical gold-badge-and-eyebrow blocks feel three different neighborhoods, or one repeating component?
