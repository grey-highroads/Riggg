# Style Anchor — Mandatory Base Prompt

Include this in EVERY image generation prompt for RIGGG assets. It is the non-negotiable foundation that keeps the visual world consistent.

## Core Style Fragment

```
Pixar-quality 3D illustration render, high detail, warm and inviting. Slightly elevated isometric 3/4 perspective, camera approximately 30 degrees above horizontal. Clean warm cream background (#FAF5EF), no environment, no sky, no floor extending beyond the object's base — the subject sits on its own base like a diorama on a stage.

Dominant color palette: teal powder-coated metal (#0A5858) and aged bronze/brass hardware with warm patina. Materials include matte teal metal with visible rivets, aged brass with subtle patina, translucent glass with inner volumetric glow, and leather/fabric with visible texture.

Warm key light from upper-left, soft fill from opposite side, subtle rim light on top edges. Rounded edges on all surfaces — nothing sharp. High surface detail density (gauges, dials, rivets, pipe fittings) but clean overall composition with generous negative space.

Small organic details for warmth: potted succulents, stacked papers, wooden elements. NOT photorealistic. NOT flat illustration. NOT low-poly. NOT sci-fi or digital aesthetic — mechanical and analog.
```

## Negative Prompt Fragment

```
Do not include: chrome or silver metal, neon lights, digital screens, holographic displays, circuit board patterns, dark or moody lighting, sky or horizon, environmental backgrounds, floor tiles or wall textures, sharp edges, low-poly geometry, flat shading, cartoon outlines.
```

## Usage

1. Start every generation prompt with the core style fragment
2. Append the character and/or machine prompt fragments from their USAGE.md files
3. Add scene-specific details
4. Include the negative prompt fragment
5. Reference 1-2 canonical images as style references if the generation tool supports it

## Model & Settings Notes

> **FILL IN:** Document the specific AI model, version, and settings used for canonical images here. This is the most important piece of reproducibility documentation in the system.

**Model:** [e.g., ChatGPT / GPT-4o image generation]
**Style reference images used:** [List which canonical images were used as references]
**Any specific settings:** [Resolution, aspect ratio, style strength, etc.]
**Prompt evolution notes:** [How prompts were refined across the 8 canonical images]
