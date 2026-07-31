# Asset Manifest

Complete inventory of canonical images in the brand system. Every image referenced in a USAGE.md or the prompt builder must exist at the path listed here.

## Status Key
- ✅ In repo
- 📎 Available (not yet in repo)
- ⬜ Needs generation

---

## Environments

| Asset | Path | Status | Notes |
|---|---|---|---|
| Factory exterior hero | `environments/factory-exterior/canonical/factory-exterior-hero.png` | ✅ | Primary establishing shot. 5 jars on conveyor. |
| Factory interior hero | `environments/factory-interior/canonical/factory-interior-hero.png` | 📎 | Client has this. Needs to be added. |

## Machines (1 per feature — gnome at workstation)

| Asset | Path | Status | Notes |
|---|---|---|---|
| Produce: Capture Rig | `machines/produce/canonical/capture-rig-hero.png` | ⬜ | Needs generation. Microphone, green glow, waveform. |
| Package: Assembly Press | `machines/package/canonical/assembly-press-hero.png` | ⬜ | Needs generation. Multi-stage, purple glow, varied outputs. |
| Publish: Distribution Engine | `machines/publish/canonical/distribution-engine-hero.png` | ✅ | Gnome at sorting workstation with blue glow. |
| Prove: Insight Scope | `machines/prove/canonical/insight-scope-hero.png` | ⬜ | Needs generation. Magnifying lens, pink glow, gauges. |
| Preserve: Memory Vault | `machines/preserve/canonical/memory-vault-hero.png` | ⬜ | Needs generation. Filing cabinet, amber glow, ledger. |

## Characters (standalone hero poses)

| Asset | Path | Status | Notes |
|---|---|---|---|
| Spark (Produce) | `characters/produce-gnome/canonical/spark-hero.png` | ✅ | Teal hat, wrench, notebook. General mechanic pose. |
| Crafter (Package) | `characters/package-gnome/canonical/crafter-hero.png` | ⬜ | Purple band hat, ink roller, shears. |
| Router (Publish) | `characters/publish-gnome/canonical/router-hero.png` | ⬜ | Blue hat, clipboard, routing stamps. |
| Lens (Prove) | `characters/prove-gnome/canonical/lens-hero.png` | ⬜ | Pink band hat, spectacles, magnifying glass. |
| Keeper (Preserve) | `characters/preserve-gnome/canonical/keeper-hero.png` | ⬜ | Amber band hat, ledger, key ring. |

## Shared Reference Images

These are used as style references when generating new assets. They establish the visual language.

| Asset | Path | Role |
|---|---|---|
| Factory exterior | `environments/factory-exterior/canonical/factory-exterior-hero.png` | Architecture, color, lighting, material reference |
| Gnome character | `characters/produce-gnome/canonical/spark-hero.png` | Character proportions, uniform, expression reference |
| Gnome at workstation | `machines/publish/canonical/distribution-engine-hero.png` | Machine scale, composition, gnome-machine interaction reference |
| Factory interior | `environments/factory-interior/canonical/factory-interior-hero.png` | Interior lighting, environment details reference |

---

## Generation Priority

For prompt builder to be fully functional, generate in this order:

1. **Remaining 4 machine scenes** (Produce, Package, Prove, Preserve) — these are the core feature illustrations
2. **Remaining 4 character hero poses** (Crafter, Router, Lens, Keeper) — standalone characters for avatars and cards
3. **Machine detail crops** (optional) — tight crops of glass chambers for icon derivation

Each generation should:
- Attach the 3 existing canonical images as style references
- Use the prompt fragments from the machine/character USAGE.md files
- Validate against `foundation/world-rules/CONSISTENCY.md`

---

## File Naming Convention

```
[entity-type]/[entity-name]/canonical/[descriptive-name]-[variant].png
```

Examples:
- `machines/produce/canonical/capture-rig-hero.png`
- `characters/produce-gnome/canonical/spark-hero.png`
- `characters/produce-gnome/canonical/spark-at-work.png`
- `environments/factory-exterior/canonical/factory-exterior-hero.png`

Variants: `hero` (primary), `at-work` (at machine), `portrait` (head/shoulders), `detail` (close-up)
