# Asset Manifest

Complete inventory of canonical images in the RIGGG brand system.

## Naming Convention

```
Characters:    {name}_{feature}-{color}.png     → spark_produce-green.png
Machines:      {machine}_{feature}-{color}.png   → capture-rig_produce-green.png
Environments:  {type}-{number}.png               → factory-exterior-1.png
```

Variants when needed: append `-{variant}` before `.png` (e.g., `spark_produce-green-portrait.png`)

---

## Characters (5/5 complete)

| Gnome | Feature | File | Path |
|---|---|---|---|
| Spark | Produce | `spark_produce-green.png` | `characters/produce-gnome/canonical/` |
| Crafter | Package | `crafter_package-purple.png` | `characters/package-gnome/canonical/` |
| Router | Publish | `router_publish-blue.png` | `characters/publish-gnome/canonical/` |
| Lens | Prove | `lens_prove-red.png` | `characters/prove-gnome/canonical/` |
| Keeper | Preserve | `keeper_preserve-amber.png` | `characters/preserve-gnome/canonical/` |

## Machines (5/5 complete)

| Machine | Feature | File | Path |
|---|---|---|---|
| The Capture Rig | Produce | `capture-rig_produce-green.png` | `machines/produce/canonical/` |
| The Assembly Press | Package | `assembly-press_package-purple.png` | `machines/package/canonical/` |
| The Distribution Engine | Publish | `distribution-engine_publish-blue.png` | `machines/publish/canonical/` |
| The Insight Scope | Prove | `insight-scope_prove-red.png` | `machines/prove/canonical/` |
| The Memory Vault | Preserve | `memory-vault_preserve-amber.png` | `machines/preserve/canonical/` |

## Environments (2/2 complete)

| Scene | File | Path |
|---|---|---|
| Factory Exterior | `factory-exterior-1.png` | `environments/factory-exterior/canonical/` |
| Factory Interior | `factory-interior-1.png` | `environments/factory-interior/canonical/` |

---

## Style Reference Sets

When generating new assets, attach these canonical images as style references:

**For any machine scene:**
- `environments/factory-exterior/canonical/factory-exterior-1.png` (architecture, materials, lighting)
- The specific machine's canonical image (composition, glow color)
- The assigned gnome's canonical image (character proportions, uniform)

**For any character pose:**
- `characters/produce-gnome/canonical/spark_produce-green.png` (base proportions reference)
- The specific character's canonical image (distinguishing features)

**For environment scenes:**
- `environments/factory-exterior/canonical/factory-exterior-1.png`
- `environments/factory-interior/canonical/factory-interior-1.png`

---

## Future Asset Needs

| Type | Description | Priority |
|---|---|---|
| Character portraits | Head/shoulders crops for avatars and small UI | Medium |
| Machine details | Tight crops of glass chambers for icons | Medium |
| Props isolated | Individual tools/props on cream bg for spot illustrations | Low |
| Group scenes | Multiple gnomes working together | Low |
| Seasonal variants | Holiday or campaign-specific gnome outfits | Low |
