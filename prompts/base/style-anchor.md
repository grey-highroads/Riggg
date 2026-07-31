# Style Anchor — Mandatory Base Prompt

Include this in EVERY image generation prompt for RIGGG assets. It is the non-negotiable foundation that keeps the visual world consistent.

## Core Style Fragment

```
Pixar-quality 3D illustration render at feature-film fidelity, not mobile game or clay-model quality. Slightly elevated isometric 3/4 perspective, camera approximately 30 degrees above horizontal. Clean warm cream background (#FAF5EF), no environment, no sky, no floor extending beyond the object's base — the subject sits on its own base like a diorama on a stage.

MATERIAL DIFFERENTIATION IS CRITICAL — each material must look and behave distinctly from the others:
- Teal powder-coated metal (#0A5858): matte finish with very fine grain texture, subtle wear at edges revealing darker underlayer, visible rivets with slight shadow relief. Not smooth plastic.
- Aged bronze/brass: warm reflective metallic with micro-patina variations, catches key light as bright specular highlights. Must read as metal, not painted wood. Rivets, buckles, and fittings should gleam.
- Translucent glass: clear with visible refraction, internal volumetric glow that spills colored light onto adjacent surfaces. Not frosted or opaque.
- Leather/fabric: visible weave or grain texture, slight wear at stress points, distinct from metal surfaces. Belt leather shows tooling marks.
- Skin: subsurface scattering showing translucency at ear edges and nose, warm blush at cheeks and nose tip, pore-level detail. Not flat matte paint on the face.

Warm key light from upper-left creating defined shadows with soft edges, cool fill from opposite side, subtle rim light on top edges separating subjects from background. Light interacts differently with each material — specular on brass, diffuse on teal metal, scattered through skin, refracted through glass.

High surface detail density: functional mechanical details (pressure gauges with readable dials, pipe fittings with threaded connections, riveted joins with shadow relief, valve handles, small bolts). These should look like they serve a purpose, not decorative rectangles stamped on surfaces. Small organic details for warmth: potted succulents with individual leaf geometry, stacked papers with visible edges, wooden elements with grain.

Rounded edges on all surfaces — nothing sharp. Clean overall composition with generous negative space despite dense object detail.

CHARACTER LIFE — gnomes must feel like they were caught mid-moment, not posed for a photo:
- Asymmetric posture: weight shifted to one foot, one shoulder slightly higher, head tilted toward their work. No stiff T-poses or symmetrical standing.
- Eyes tell a story: looking at what they're doing, or glancing at their work with pride, curiosity, or focus. Eye direction implies thought. A slight squint, a raised eyebrow, a knowing look — the eyes should make you wonder what they're thinking.
- Hands doing something specific: gripping a tool mid-use, steadying a piece on the conveyor, adjusting a dial, inspecting output. Hands reveal character.
- Micro-expressions: a slight smirk of satisfaction, the focused purse of lips mid-task, the soft smile of someone who loves their craft. Not a neutral default face.
- Clothing responds to the body: belt pulled slightly by the weight of tools, fabric bunching at the elbows, hat sitting at a natural angle rather than perfectly centered.
- Each gnome has their own energy: some are quick and kinetic, some are steady and deliberate. Their body language should reflect their personality, not a generic "standing gnome" template.
```

## Negative Prompt Fragment

```
Do not include: chrome or silver metal, neon lights, digital screens, holographic displays, circuit board patterns, dark or moody lighting, sky or horizon, environmental backgrounds, floor tiles or wall textures, sharp edges, low-poly geometry, flat shading, cartoon outlines. Do not render in a clay, plasticine, or mobile-game style. Do not use uniform matte finish across all materials — each material must have distinct surface properties. Do not use decorative stamped shapes in place of functional mechanical detail.
```

## Usage

1. Start every generation prompt with the core style fragment
2. Append the character and/or machine prompt fragments from their USAGE.md files
3. Add scene-specific details
4. Include the negative prompt fragment
5. Reference 1-2 canonical images as style references if the generation tool supports it

## Model & Settings Notes

**Canonical assets (v1):** Generated via ChatGPT (GPT-4o) with conversational context and iterative refinement. Transparent PNG cutouts.

**Prompt builder output (v2+):** Generated via OpenAI Images API.
- **Model:** `gpt-image-2`
- **Endpoint:** `/v1/images/edits` (with reference images) or `/v1/images/generations` (text-only fallback)
- **Quality:** `high`
- **Dimensions:** Format-dependent (1536x864 for 16:9, 1024x1024 for 1:1, 864x1536 for 9:16, 1024x768 for 4:3, 1536x512 for 3:1)
- **Background:** Opaque cream (#FAF5EF) — gpt-image-2 does not support transparent output
- **Reference images:** Up to 3 canonical assets attached via edits endpoint for style anchoring
- **Prompt refinement history:** Three rounds of A/B testing. Material differentiation and character life sections each provably improved output quality. Model swap from gpt-image-1 to gpt-image-2 was the largest single quality jump.
