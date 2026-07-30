# Color Tokens

All colors extracted from canonical seed images (factory exterior, gnome character, gnome at workstation). Hex values are reference approximations — match visually against canonical assets, not just numerically.

## Primary Palette

### Teal Family (dominant brand color)
| Token | Hex | Usage | Notes |
|---|---|---|---|
| `teal-900` | `#063E3E` | Deepest shadow on teal surfaces | Rarely used alone |
| `teal-700` | `#0A5858` | Primary surface color | Gnome hats, overalls, machine housings |
| `teal-500` | `#1A8888` | Secondary/lighter panels | Machine accent panels, lighter details |
| `teal-300` | `#70B0B0` | Light teal | Glass reflections, UI hover states |
| `teal-100` | `#B0D0D0` | Lightest teal | UI backgrounds, subtle tints |

### Bronze Family (hardware and warmth)
| Token | Hex | Usage | Notes |
|---|---|---|---|
| `bronze-700` | `#503818` | Dark bronze | Deep shadow on metallic hardware |
| `bronze-600` | `#705030` | Standard bronze | Rivets, buckles, structural frames |
| `bronze-400` | `#907050` | Light bronze | Leather, lighter hardware, belt straps |
| `bronze-200` | `#B09070` | Warm highlight | Metallic catch light, light leather |

### Background
| Token | Hex | Usage | Notes |
|---|---|---|---|
| `cream-bg` | `#FAF5EF` | Mandatory illustration background | NEVER substitute white or gray |

## Feature Accent Palette

Each accent color is owned by exactly one RIGGG product feature. Accents appear ONLY as inner glow inside translucent glass elements — never as surface paint on machines or architecture.

| Token | Hex | Feature | Status |
|---|---|---|---|
| `accent-green` | `#4CAF50` | TBD | ⬜ Needs feature mapping |
| `accent-blue` | `#2196F3` | TBD | ⬜ Needs feature mapping |
| `accent-purple` | `#9C27B0` | TBD | ⬜ Needs feature mapping |
| `accent-red` | `#E91E63` | TBD | ⬜ Needs feature mapping |
| `accent-amber` | `#FF9800` | TBD | ⬜ Needs feature mapping |

### Accent glow rendering
When an accent color appears in glass, it should:
- Emit volumetric light that tints nearby surfaces
- Transition from full saturation at center to soft falloff at glass edges
- Have a subtle "pulse" quality — luminous, not flat
- Never bleed beyond the glass container boundaries in a way that overwhelms the teal/bronze palette

## Neutrals

| Token | Hex | Usage |
|---|---|---|
| `neutral-900` | `#1A1A14` | Deepest shadow, near-black |
| `neutral-700` | `#383828` | Dark recesses |
| `neutral-500` | `#707060` | Mid-tone mechanical detail |
| `neutral-300` | `#B0A898` | Light surfaces, aged metal |
| `neutral-100` | `#E8DCC8` | Parchment, paper elements, warm white |

## Skin Tones

| Token | Hex | Usage |
|---|---|---|
| `skin-base` | `#F0C8A8` | Gnome face, nose, ears |
| `skin-highlight` | `#F8D8C0` | Forehead, cheek highlight |
| `skin-shadow` | `#D0A080` | Under-beard, ear shadow |
| `skin-blush` | `#E8A090` | Nose tip, cheek warmth |

## Color Rules

1. **Teal dominance:** In any composition, teal surfaces should occupy more visual area than any other color family.
2. **Bronze as accent structure:** Bronze never dominates — it provides warm contrast to cool teal.
3. **One accent per scene:** A machine scene uses only its assigned accent color. Never mix feature accent colors in a single machine illustration.
4. **Background is non-negotiable:** #FAF5EF cream, always. Not white (#FFFFFF), not warm gray, not transparent.
5. **No ungrounded color:** Every color in the image should trace to one of these token families. If a new color appears, it's either a rendering artifact or a brand violation.

## CSS Custom Properties (for web implementation)

```css
:root {
  --color-teal-900: #063E3E;
  --color-teal-700: #0A5858;
  --color-teal-500: #1A8888;
  --color-teal-300: #70B0B0;
  --color-teal-100: #B0D0D0;

  --color-bronze-700: #503818;
  --color-bronze-600: #705030;
  --color-bronze-400: #907050;
  --color-bronze-200: #B09070;

  --color-bg-cream: #FAF5EF;
  --color-bg-white: #FAFAFA;

  --color-neutral-900: #1A1A14;
  --color-neutral-700: #383828;
  --color-neutral-500: #707060;
  --color-neutral-300: #B0A898;
  --color-neutral-100: #E8DCC8;

  /* Rename these once features are mapped */
  --color-feature-green: #4CAF50;
  --color-feature-blue: #2196F3;
  --color-feature-purple: #9C27B0;
  --color-feature-red: #E91E63;
  --color-feature-amber: #FF9800;
}
```
