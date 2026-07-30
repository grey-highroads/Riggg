# RIGGG Brand System

A brand-as-code repository for the RIGGG Factory visual world. This repo serves two purposes:

1. **Human reference** — canonical assets, usage rules, and business context for anyone producing RIGGG brand materials.
2. **AI context library** — structured so an AI session can parse relevant folders and generate on-brand prompts, copy, and assets without drift.

## How This Repo Works

Every brand object (character, machine, environment) lives in its own folder with:
- **Canonical images** — the approved reference assets
- **CONTEXT.md** — business meaning, personality, role in the RIGGG story
- **USAGE.md** — visual rules, do/don't, composition guidelines, prompt fragments

When generating a new asset, the workflow is:
1. Identify which brand objects are involved (which character? which machine? what scene?)
2. Load the relevant `CONTEXT.md` and `USAGE.md` files
3. Load `prompts/base/style-anchor.md` for world-level consistency
4. Compose a generation prompt using the loaded context
5. Validate output against the checklist in `foundation/world-rules/CONSISTENCY.md`

## Repo Structure

```
riggg-brand-system/
├── .claude/                    # AI session configuration
│   └── instructions.md         # System prompt for Claude sessions with this repo
│
├── foundation/                 # Brand-level primitives
│   ├── color/
│   │   └── TOKENS.md           # Color system with hex values, roles, and rules
│   ├── typography/
│   │   └── TYPE-SYSTEM.md      # Font choices, scale, and pairing logic
│   └── world-rules/
│       ├── RENDERING.md        # 3D style rules (lighting, perspective, materials)
│       ├── CONSISTENCY.md      # Validation checklist for every new asset
│       └── ANTI-PATTERNS.md    # What this world is NOT
│
├── characters/                 # One folder per named gnome role
│   ├── _template/              # Empty template for adding new characters
│   │   ├── CONTEXT.md
│   │   └── USAGE.md
│   ├── [gnome-name]/
│   │   ├── canonical/          # Approved reference images
│   │   ├── CONTEXT.md          # Who this gnome is, what they represent
│   │   └── USAGE.md            # Visual rules, pose library, prop inventory
│   └── ...
│
├── machines/                   # One folder per RIGGG product feature
│   ├── _template/
│   │   ├── CONTEXT.md
│   │   └── USAGE.md
│   ├── [feature-name]/
│   │   ├── canonical/          # Approved machine + gnome-at-work images
│   │   ├── CONTEXT.md          # What this feature does, who it serves, why it matters
│   │   └── USAGE.md            # Visual rules, accent color, machine details, prompt fragments
│   └── ...
│
├── environments/               # Factory locations and scenes
│   ├── factory-exterior/
│   │   ├── canonical/
│   │   ├── CONTEXT.md
│   │   └── USAGE.md
│   └── factory-interior/
│       ├── CONTEXT.md
│       └── USAGE.md
│
├── prompts/                    # Prompt engineering templates
│   ├── base/
│   │   ├── style-anchor.md     # Non-negotiable prompt fragments for every generation
│   │   └── negative-prompt.md  # What to explicitly exclude
│   └── per-asset/
│       ├── character-pose.md   # Template for generating new character poses
│       ├── machine-scene.md    # Template for generating machine + gnome compositions
│       └── marketing-asset.md  # Template for social, web hero, ad assets
│
├── components/                 # Web/UI patterns using brand assets
│   └── COMPONENT-MAP.md        # How brand objects map to UI components
│
└── assets/                     # Derived assets (icons, patterns, textures)
    ├── icons/
    └── patterns/
```

## Key Principles

**Context before rendering.** Every visual decision traces back to a business decision. The machine's accent color isn't arbitrary — it maps to a product feature. The gnome's expression isn't random — it reflects the emotional register of the capability they represent. The CONTEXT.md files carry this meaning so it doesn't get lost.

**Canonical assets are law.** Images in `canonical/` folders are the approved references. Every new asset is evaluated against them. They are never modified — only replaced through a deliberate versioning decision.

**Prompt fragments are composable.** The `USAGE.md` files contain prompt fragments that can be concatenated with the base style anchor to produce generation prompts. This makes the system modular — you load only the pieces relevant to what you're building.

**The repo is the brand book.** There is no separate brand guidelines PDF. This is it. If a rule isn't in the repo, it isn't a rule.
