# [Character Name] — Usage Rules

## Visual Identity

**Hat color:** [Specific hex — e.g., `teal-700` (#0A5858)]
**Hat logo:** RIGGG hexagon, [color on hat — e.g., "white embroidered"]
**Distinguishing features:** [What makes this gnome visually distinct from others — e.g., specific tool, accessory, facial hair variation, glasses]

## Canonical Assets

| Asset | Filename | Use For |
|---|---|---|
| Hero pose (full body) | `canonical/[name]-hero.png` | Feature pages, standalone character appearances |
| At workstation | `canonical/[name]-at-work.png` | Machine/feature context, process illustrations |
| Portrait (head/shoulders) | `canonical/[name]-portrait.png` | Avatars, team grids, small UI placements |

## Pose Library

**Default standing pose:** [Describe — e.g., "Slight 3/4 turn to left, wrench in right hand, notebook in left, weight on back foot"]
**Working pose:** [Describe — e.g., "Leaning slightly forward at workstation, right hand operating lever, left hand steadying output"]
**Approved expressions:** [e.g., "Warm focus, slight smile, raised eyebrows showing engagement"]

## Props Inventory

| Prop | When to Include | Meaning |
|---|---|---|
| [e.g., Wrench] | [e.g., "Hero poses, general appearances"] | [e.g., "Builder / maker identity"] |
| [e.g., Notebook] | [e.g., "Planning or documentation contexts"] | [e.g., "Thoughtfulness, documentation"] |
| [e.g., Magnifying glass] | [e.g., "QA or review contexts"] | [e.g., "Attention to detail"] |

## Prompt Fragments

Use these fragments when composing generation prompts involving this character. Concatenate with the base style anchor from `prompts/base/style-anchor.md`.

**Character description fragment:**
```
[e.g., "A stocky gnome character, 3.5 heads tall, wearing a teal pointed hat with the RIGGG hexagonal logo embroidered on front, blue long-sleeve work shirt, teal work overalls with chest pocket containing small tools, brown leather belt with brass buckle, teal work gloves, heavy teal and brown boots with brass hardware. White beard, large round teal-blue eyes, round pink-blushed nose, pointed ears. Expression: focused and warmly competent."]
```

**Pose fragment (standing):**
```
[e.g., "Standing in slight 3/4 turn, wrench held in right hand at waist height, spiral notebook with RIGGG logo tucked under left arm, weight settled on back foot, confident and ready posture."]
```

**Pose fragment (working):**
```
[e.g., "Seated or standing at [machine name], right hand operating a brass lever, left hand steadying a glowing [accent-color] cube on the conveyor belt, eyes focused on the work with a slight smile of concentration."]
```

## Do / Don't

### Do
- Keep proportions consistent with canonical reference
- Include the hat logo in every appearance
- Match the emotional register from CONTEXT.md
- Use props that map to this character's business function

### Don't
- Show this gnome operating another character's machine (unless in a team scene explicitly approved)
- Change hat color — it's role-locked
- Use comedy expressions or slapstick poses
- Add props not in the approved inventory without updating this file
- Remove the beard or change its style
