# RIGGG Brand System

A brand-as-code repository for the RIGGG Factory visual world. This repo serves three purposes:

1. **Human reference** — canonical assets, usage rules, and business context for producing RIGGG brand materials.
2. **AI context library** — structured so an AI session can parse relevant folders and generate on-brand prompts without drift.
3. **Prompt builder source** — the `app/` directory contains a React-based prompt compiler that reads this repo's data.

## Quick Start

**For designers:** Browse `machines/`, `characters/`, and `environments/` folders. Each has a `CONTEXT.md` (business meaning), `USAGE.md` (visual rules), and `canonical/` folder with approved reference images.

**For AI sessions:** Mount this repo in Claude Code. The `.claude/instructions.md` file configures the session to read brand context before generating.

**For the prompt builder app:** See `app/riggg-prompt-builder.jsx`. Deployable to Vercel/Netlify with live sync to this repo via GitHub API.

## The 5Ps — Feature Map

| P | Machine | Gnome | Color | Accent |
|---|---|---|---|---|
| Produce | The Capture Rig | Spark | Green | `#4CAF50` |
| Package | The Assembly Press | Crafter | Purple | `#9C27B0` |
| Publish | The Distribution Engine | Router | Blue | `#2196F3` |
| Prove | The Insight Scope | Lens | Pink | `#E91E63` |
| Preserve | The Memory Vault | Keeper | Amber | `#FF9800` |

## Repo Structure

```
riggg-brand-system/
├── .claude/instructions.md          # AI session config
├── ASSET-MANIFEST.md                # Complete image inventory
├── README.md                        # This file
│
├── app/                             # Prompt builder application
│   └── riggg-prompt-builder.jsx     # React prompt compiler
│
├── foundation/                      # Brand primitives
│   ├── color/TOKENS.md              # Color system
│   ├── typography/                  # Planned — font choices not yet selected
│   └── world-rules/
│       ├── RENDERING.md             # 3D style rules
│       ├── CONSISTENCY.md           # Validation checklist
│       └── ANTI-PATTERNS.md         # What NOT to do
│
├── characters/                      # One folder per gnome
│   ├── _template/                   # Template for new characters
│   ├── produce-gnome/               # Spark
│   ├── package-gnome/               # Crafter
│   ├── publish-gnome/               # Router
│   ├── prove-gnome/                 # Lens
│   └── preserve-gnome/              # Keeper
│
├── machines/                        # One folder per 5P feature
│   ├── _template/                   # Template for new machines
│   ├── produce/                     # The Capture Rig
│   ├── package/                     # The Assembly Press
│   ├── publish/                     # The Distribution Engine
│   ├── prove/                       # The Insight Scope
│   └── preserve/                    # The Memory Vault
│
├── environments/                    # Factory locations
│   ├── factory-exterior/            # Hero establishing shot
│   └── factory-interior/            # Working floor shot
│
├── prompts/                         # Prompt engineering
│   ├── base/style-anchor.md         # Mandatory style fragments
│   └── per-asset/machine-scene.md   # Generation templates
│
├── components/                      # Web UI patterns
│   └── COMPONENT-MAP.md
│
└── assets/                          # Planned — derived assets
    ├── icons/                       # Planned — icon set from machine details
    └── patterns/                    # Planned — repeatable pattern elements
```

## Asset Naming Convention

```
Characters:    {name}_{feature}-{color}.png
Machines:      {machine}_{feature}-{color}.png
Environments:  {type}-{number}.png
```

## Key Principles

**The repo is the brand book.** No separate PDF. If a rule isn't here, it isn't a rule.

**Context before rendering.** Every visual decision traces to a business decision in a CONTEXT.md file.

**Canonical assets are law.** Images in `canonical/` folders are approved references. New assets are evaluated against them.

**Prompt fragments are composable.** USAGE.md files contain fragments that combine with the style anchor to produce generation prompts.
