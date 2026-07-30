# Prompt Template — Machine Scene

Use this template when generating a new illustration of a RIGGG machine with its gnome operator.

## Before You Compose

1. Read `prompts/base/style-anchor.md` — load the core style fragment
2. Read `machines/[feature-name]/CONTEXT.md` — understand the business meaning
3. Read `machines/[feature-name]/USAGE.md` — load machine-specific prompt fragments and rules
4. Read `characters/[gnome-name]/USAGE.md` — load character prompt fragments
5. Confirm the accent color from the machine's USAGE.md

## Prompt Assembly Order

```
[1. STYLE ANCHOR — from prompts/base/style-anchor.md]

[2. MACHINE DESCRIPTION — from machines/[name]/USAGE.md prompt fragment]

[3. GNOME OPERATOR — from characters/[name]/USAGE.md prompt fragment]
   - Ensure hat color matches character's documented role color
   - Ensure expression matches the emotional register in machine's CONTEXT.md
   - Ensure props are from the approved inventory

[4. SCENE-SPECIFIC DETAILS]
   - What specific action is the gnome performing?
   - What stage of the process is shown? (input arriving, processing active, output ready)
   - Any specific output artifacts visible?

[5. COMPOSITION NOTES]
   - Standard layout: glass chamber — processing mechanism — output tray
   - Machine at 65-75% frame width
   - Gnome at operating position
   - Generous negative space

[6. NEGATIVE PROMPT — from prompts/base/style-anchor.md]
```

## Example Composed Prompt

```
Pixar-quality 3D illustration render, high detail, warm and inviting. Slightly elevated isometric 3/4 perspective, camera approximately 30 degrees above horizontal. Clean warm cream background (#FAF5EF), no environment — the subject sits on its own base like a diorama on a stage.

[... full style anchor ...]

A detailed mechanical workstation with teal powder-coated housing and aged bronze/brass fittings. Features a glass dome on the left filled with glowing [ACCENT COLOR] light, a central [MACHINE-SPECIFIC MECHANISM], and [OUTPUT ELEMENTS] on the right. Conveyor belt base with bronze track and riveted details. Small potted succulent on the corner.

A stocky gnome character, 3.5 heads tall, wearing a [HAT COLOR] pointed hat with RIGGG hexagonal logo, teal work overalls, blue work shirt, brown leather belt with brass buckle. [SPECIFIC POSE AND ACTION]. Expression: [EMOTIONAL REGISTER FROM CONTEXT.MD].

[... negative prompt ...]
```

## Post-Generation Validation

After generating, run through `foundation/world-rules/CONSISTENCY.md` checklist. Common failure points for machine scenes:

- Accent color bleeding onto machine surfaces (should only glow inside glass)
- Gnome proportions drifting from 3.5 heads tall
- Background shifting from cream to white or gray
- Bronze hardware rendering as silver/chrome
- Missing RIGGG logo on hat
- Machine too large or too small relative to gnome
