# [Machine Name] — Usage Rules

## Visual Identity

**Accent glow color:** [e.g., `accent-purple` (#9C27B0)]
**Machine silhouette:** [One sentence — e.g., "Wide horizontal press with glass dome on left, stamping mechanism in center, output sorting trays on right"]
**Signature detail:** [The one visual element unique to this machine — e.g., "A row of channel-labeled sorting slots with colored tabs"]

## Canonical Assets

| Asset | Filename | Use For |
|---|---|---|
| Machine + gnome (hero) | `canonical/[name]-hero.png` | Feature pages, primary representation |
| Machine detail (no gnome) | `canonical/[name]-detail.png` | Technical context, icon derivation |
| Machine in factory context | `canonical/[name]-in-situ.png` | Factory floor scenes, overview compositions |

## Composition Rules

**Standard layout:**
```
[Glass chamber / glow element] — [Processing mechanism] — [Output tray / stack]
                ↑                          ↑
         [Gnome operator]           [Conveyor belt base]
```

- Machine occupies ~65-75% of frame width
- Gnome positioned at operating side (typically right)
- Conveyor belt connects to frame edge, implying continuation
- At least one output artifact visible (card, cube, document)
- Glass processing chamber contains accent-colored glow

**Aspect ratios:**
| Use Case | Ratio | Notes |
|---|---|---|
| Feature page hero | 16:9 | Full machine + gnome + negative space |
| Card thumbnail | 4:3 | Machine centered, gnome optional |
| Icon derivation | 1:1 | Machine glass chamber only, tight crop |

## Machine Elements

### Required in every render
- Teal powder-coated housing (`teal-700`)
- Bronze/brass structural frame and hardware
- At least one glass chamber with accent glow
- Conveyor belt or track connection
- 2-3 gauges/dials on machine body
- One small organic detail (plant, paper, wooden element)

### Specific to this machine
- [e.g., "Stamping press arm with RIGGG logo die"]
- [e.g., "Five labeled sorting slots with colored tabs matching output channels"]
- [e.g., "Receipt printer outputting a small paper strip"]

## Prompt Fragments

**Machine description fragment:**
```
[e.g., "A detailed mechanical workstation with teal powder-coated housing and aged bronze/brass fittings. Features a glass dome on the left filled with glowing purple light, a central stamping press mechanism with a brass arm, and output sorting trays on the right with labeled channel slots. Conveyor belt base with bronze track and riveted details. Small potted succulent on the corner. Receipt printer outputting a paper strip with the RIGGG hexagonal logo."]
```

**With gnome operator fragment:**
```
[e.g., "A stocky gnome in teal overalls and [hat-color] pointed hat with RIGGG logo stands at the right side of the machine, right hand pulling the stamping press lever, left hand guiding a glowing purple content cube onto the conveyor belt. Expression: focused concentration with slight satisfaction."]
```

## Do / Don't

### Do
- Use only this machine's assigned accent color for the glow
- Show visible output artifacts (the "media" being produced)
- Include the conveyor connection to imply the larger factory system
- Match the emotional register from CONTEXT.md in the gnome's expression

### Don't
- Mix accent colors from other features
- Show the machine without any output (it should always be "producing")
- Remove the conveyor/track base — machines connect to the system
- Make the machine larger than workstation scale relative to the gnome
- Add screens or digital displays — machines are mechanical/analog
