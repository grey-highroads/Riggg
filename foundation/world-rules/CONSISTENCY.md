# Asset Consistency Checklist

Run every new illustration asset through this checklist before approval. Every item must pass. Failures are not style preferences — they are brand defects.

## Non-Negotiable (hard fail)

- [ ] **Background handling:** Canonical character and machine assets use **transparent backgrounds** (PNG with alpha) for compositing flexibility. When generating new assets via the prompt builder, use **opaque cream (#FAF5EF)** as gpt-image-2 does not support transparency. For web use, place transparent cutouts on cream (#FAF5EF) backgrounds.
- [ ] **Camera angle matches** — elevated 3/4 isometric, ~30° above horizontal. No flat front views. No top-down. No dramatic low angles.
- [ ] **Teal is the dominant hard-surface color** — not blue, not green, not cyan. Compare against teal-700 (#0A5858) in canonical character image.
- [ ] **Bronze/brass hardware present** — not silver, not chrome, not gunmetal. Warm metallic tones on rivets, buckles, structural elements.
- [ ] **RIGGG hexagon logo appears** — on gnome hat and/or on machine surface. Correct orientation and proportions.
- [ ] **No environmental background** — no sky, walls, floor extending beyond object base. Diorama-on-stage framing.

## Character Consistency (when gnomes are present)

- [ ] **Proportions match** — ~3.5 heads tall, stocky build, oversized hands
- [ ] **Uniform elements present** — pointed hat, work overalls, gloves, boots, belt
- [ ] **Face matches model** — large round eyes, round nose with blush, white beard, pointed ears
- [ ] **Hat color is correct for role** — cross-reference character's CONTEXT.md
- [ ] **Expression is appropriate** — warm competence, not comedy or distress
- [ ] **Props match role** — cross-reference character's USAGE.md prop inventory

## Machine Consistency (when machines are present)

- [ ] **Three material families present** — teal powder-coat, bronze hardware, glass/translucent elements
- [ ] **Accent glow color matches feature** — cross-reference machine's USAGE.md
- [ ] **Glow is contained in glass** — accent color does not appear as flat surface paint
- [ ] **Conveyor/belt base present** — machines sit on or connect to a track/conveyor system
- [ ] **Output elements visible** — paper, cards, cubes, or other "published media" artifacts
- [ ] **At least one organic detail** — small plant, paper stack, wooden element

## Rendering Quality

- [ ] **Subsurface scattering on skin** — gnome skin has translucency, not flat matte paint
- [ ] **Volumetric glow from glass elements** — colored light spills onto adjacent surfaces
- [ ] **Shadow direction consistent** — key light from upper-left
- [ ] **Detail density matches** — rivets, gauges, pipe fittings at canonical level
- [ ] **Edge treatment is rounded** — no sharp edges on any surface
- [ ] **No visual artifacts** — no text rendering errors, no floating geometry, no texture seams

## Composition

- [ ] **Generous negative space** — subject doesn't crowd the frame edges
- [ ] **Single focal point** — clear hierarchy of what the eye should see first
- [ ] **Scale is consistent** — gnome-to-machine ratio matches canonical workstation image
