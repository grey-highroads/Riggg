# Component Map — Brand Objects → UI

How the RIGGG visual world translates into web components. Each mapping defines which brand assets feed into which UI patterns, and the rules for composition.

## Page-Level Patterns

### Hero Section
- **Brand asset:** Factory exterior (full) OR single machine hero
- **Layout:** Full-width image with overlaid headline and CTA
- **Background:** `cream-bg` (#FAF5EF) — matches image background seamlessly
- **Rule:** The illustration should feel like it extends naturally into the page, not like a boxed image dropped on a white surface

### Feature Section
- **Brand asset:** Machine hero image + assigned gnome
- **Layout:** Split — illustration on one side, copy + feature details on the other
- **Accent:** Feature's accent color used for UI elements (buttons, highlights, badges) in this section
- **Rule:** Each feature section uses ONLY its own accent color. Scrolling through features should feel like moving through different "departments" of the factory

### Character Spotlight
- **Brand asset:** Gnome portrait or hero pose
- **Layout:** Circular or rounded-rect crop for avatars; full image for feature attribution
- **Usage:** "Meet the team" equivalent, testimonial attribution, feature ownership indicators
- **Rule:** Always include the gnome's name and role. The character system falls apart if gnomes appear as anonymous decoration

### Process / How-It-Works
- **Brand asset:** Factory exterior (showing the assembly line) OR sequence of machine thumbnails
- **Layout:** Horizontal scroll or stepped vertical layout showing the workflow
- **Rule:** Order matches the actual RIGGG product workflow. The conveyor belt metaphor should map to real process steps

## Component-Level Patterns

### Feature Card
```
┌─────────────────────────────┐
│  [Machine thumbnail]        │
│                             │
│  ● Feature Name             │  ← accent color dot
│  Brief description of       │
│  what this capability does  │
│                             │
│  Learn more →               │  ← accent color text
└─────────────────────────────┘
```
- **Background:** `white` (#FAFAFA) or `cream-bg`
- **Shadow:** `shadow-md` with teal tint
- **Border radius:** `radius-lg` (20px)
- **Accent indicator:** Small dot or left-border in feature's accent color

### Gnome Avatar
```
    ┌──────┐
    │ 🧙  │  ← circular crop, gnome portrait
    └──────┘
    Gnome Name
    Role Title
```
- **Size tiers:** 32px (inline), 48px (list), 80px (card), 120px (spotlight)
- **Border:** 2px solid `teal-300`
- **Always labeled** — no anonymous gnome appearances

### Accent Glow Badge
For feature status indicators, active states, notification badges:
- Small pill or dot using the feature's accent color
- Subtle glow effect (CSS `box-shadow` matching accent at 30% opacity)
- Echoes the glass-glow effect from the illustration system

### Section Divider
Instead of generic horizontal rules:
- Subtle conveyor belt pattern (thin bronze line with periodic rivet dots)
- OR a thin teal pipe illustration element
- These are lightweight — decorative but not attention-grabbing

## CMS-Driven Component Binding

### Feature Collection → Feature Section
| CMS Field | Type | Feeds Into |
|---|---|---|
| Feature name | Plain text | Section headline |
| Feature slug | Slug | URL path |
| Short description | Plain text | Card description, meta description |
| Long description | Rich text | Feature page body |
| Machine image (hero) | Image | Feature section illustration |
| Machine image (thumbnail) | Image | Feature card thumbnail |
| Gnome portrait | Image | Character attribution |
| Gnome name | Plain text | Character label |
| Accent color hex | Color | Section accent, button color, badge color |
| Accent color name | Plain text | CSS class name |
| Feature icon | SVG/Image | Navigation, compact UI |
| Sort order | Number | Feature display sequence |

### Character Collection → Character Appearances
| CMS Field | Type | Feeds Into |
|---|---|---|
| Character name | Plain text | Labels, alt text |
| Role title | Plain text | Subtitle, attribution |
| Feature mapped to | Reference → Features | Cross-linking |
| Portrait image | Image | Avatar component |
| Hero image | Image | Spotlight section |
| Bio / personality | Rich text | About page, tooltips |

## Responsive Behavior

- **Desktop (1200px+):** Full machine illustrations visible, side-by-side layouts
- **Tablet (768-1199px):** Machine illustrations scale down, stack to single column at lower end
- **Mobile (< 768px):** Machine images above copy (no side-by-side), gnome avatars at smallest tier, feature cards single column

## Animation Direction

Keep minimal. Where used:
- **Scroll reveal:** Machine illustrations fade-up + slight scale (1.0 from 0.95) as they enter viewport
- **Hover on feature cards:** Subtle shadow increase + accent glow intensifies
- **NO:** Parallax on illustrations, rotating elements, particle effects, continuous animation
- The illustrations are static renders. Don't try to animate what should be a still image. Let the craftsmanship of the render do the work.
