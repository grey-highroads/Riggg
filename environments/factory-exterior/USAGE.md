# Factory Exterior — Usage Rules

## Canonical Asset

| Asset | Filename | Dimensions | Use For |
|---|---|---|---|
| Full factory hero | `canonical/factory-exterior-1.png` | [TBD] | Homepage hero, about page, social banners |

## Composition Rules

- **Full building visible** — do not crop the factory mid-structure. The diorama-on-stage framing requires the complete base to be visible.
- **Conveyor belt prominent** — the five-jar conveyor in the foreground is the narrative anchor. It should be clearly visible and legible.
- **Neutral cream background** — standard #FAF5EF, no sky, no ground extending beyond the building's base platform.
- **Aspect ratio:** The canonical image is roughly 16:9. When cropping for different placements, protect the conveyor belt and RIGGG signage.

## Crop Zones

```
┌─────────────────────────────────┐
│  Upper factory (towers, pipes)  │  ← Can crop here for tighter compositions
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
│  Main facade (signage, windows) │  ← PROTECT — RIGGG branding lives here
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
│  Conveyor belt (5 jars)         │  ← PROTECT — product narrative lives here
└─────────────────────────────────┘
```

- **Safe to crop:** Upper towers and pipe network (loses some whimsy but retains narrative)
- **Never crop:** Conveyor belt, RIGGG signage, glass curtain wall
- **For square formats (1:1):** Center on facade + conveyor, let towers extend beyond frame top

## Web Implementation Notes

- On homepage: place on cream-bg section with no container border. The image background should merge seamlessly with the page background.
- For hero layouts: allow the image to extend to ~80% of viewport width on desktop, full-width on mobile.
- Do NOT overlay dense text on the factory image. A single headline + CTA below or beside the image, not over it. The illustration is detailed enough that overlaid text becomes unreadable.

## Prompt Fragment (for generating variants or alternate angles)

```
The RIGGG factory — a whimsical multi-story industrial complex rendered in Pixar-quality 3D illustration style. Rounded cylindrical towers, teal powder-coated surfaces (#0A5858) with cream panel sections, exposed teal and orange pipe network, an orange spiral slide connecting upper and lower levels, glass curtain wall showing warm-lit interior activity. RIGGG wordmark and hexagonal logo on main facade. In the foreground, a brass conveyor belt carries five translucent glass jars, each containing a glowing icon in a different color (green, blue, purple, pink, amber). Small trees and potted plants around the base. Clean cream background (#FAF5EF), no sky, isometric elevated perspective.
```

## Do / Don't

### Do
- Use as the primary "this is RIGGG" image
- Maintain the seamless cream background merge with the page
- Keep the conveyor belt and jars visible and legible
- Use for wide-format placements where detail can be appreciated

### Don't
- Use at sizes where the jar icons become unreadable (< 400px wide)
- Overlay text directly on the building
- Modify the jar colors independently from the feature accent mapping
- Generate alternate factory angles that contradict the canonical architecture
- Add gnome characters to the exterior scene (they belong inside, at machines)
