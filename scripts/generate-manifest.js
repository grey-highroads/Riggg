#!/usr/bin/env node
/**
 * generate-manifest.js
 * 
 * Reads YAML front matter from CONTEXT.md files across the repo,
 * validates references, and produces brand-system.json.
 * 
 * This script is deliberately boring. It does not interpret creative prose.
 * It only collects structured identity/routing data and verifies it.
 * 
 * Usage: node generate-manifest.js
 * Output: brand-system.json in the repo root
 */

const fs = require('fs');
const path = require('path');

// ── Parse YAML front matter (minimal, no dependencies) ─────────
function parseFrontMatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  
  const yaml = match[1];
  const data = {};
  let currentKey = null;
  let currentList = null;
  let currentItem = null;
  
  for (const line of yaml.split('\n')) {
    // Top-level key: value
    const kvMatch = line.match(/^(\w[\w_]*)\s*:\s*(.+)?$/);
    if (kvMatch) {
      if (currentList && currentItem) {
        currentList.push(currentItem);
        currentItem = null;
      }
      currentKey = kvMatch[1];
      let val = (kvMatch[2] || '').trim();
      if (val === '') {
        // Could be a list or multi-line
        continue;
      }
      // Strip quotes
      val = val.replace(/^["']|["']$/g, '');
      data[currentKey] = val;
      currentList = null;
      continue;
    }
    
    // List start
    if (line.match(/^(\w[\w_]*):\s*$/)) {
      const key = line.match(/^(\w[\w_]*):/)[1];
      currentKey = key;
      data[key] = [];
      currentList = data[key];
      currentItem = null;
      continue;
    }
    
    // List item start
    const listItemMatch = line.match(/^\s+-\s+(\w+)\s*:\s*(.+)/);
    if (listItemMatch && currentList !== null) {
      if (currentItem) currentList.push(currentItem);
      currentItem = {};
      currentItem[listItemMatch[1]] = listItemMatch[2].replace(/^["']|["']$/g, '');
      continue;
    }
    
    // List item continuation
    const listContMatch = line.match(/^\s+(\w+)\s*:\s*(.+)/);
    if (listContMatch && currentItem !== null) {
      currentItem[listContMatch[1]] = listContMatch[2].replace(/^["']|["']$/g, '');
      continue;
    }
  }
  
  // Flush last item
  if (currentList && currentItem) {
    currentList.push(currentItem);
  }
  
  return data;
}

// ── Scan the repo ──────────────────────────────────────────────
const repoRoot = path.resolve(__dirname, '..');
const errors = [];
const manifest = {
  generated: new Date().toISOString(),
  machines: [],
  characters: [],
  environments: [],
  formats: [
    { id: "blog-hero", label: "Blog Post Hero", ratio: "16:9", size: "1536x864" },
    { id: "feature-hero", label: "Feature Page Hero", ratio: "16:9", size: "1536x864" },
    { id: "social-sq", label: "Social Square", ratio: "1:1", size: "1024x1024" },
    { id: "social-story", label: "Social Story", ratio: "9:16", size: "864x1536" },
    { id: "card", label: "Card Thumbnail", ratio: "4:3", size: "1024x768" },
    { id: "slide", label: "Slide Illustration", ratio: "16:9", size: "1536x864" },
    { id: "email", label: "Email Banner", ratio: "3:1", size: "1536x512" },
  ]
};

function scanDir(baseDir, type) {
  const entries = [];
  const dir = path.join(repoRoot, baseDir);
  
  if (!fs.existsSync(dir)) return entries;
  
  for (const name of fs.readdirSync(dir)) {
    if (name.startsWith('_')) continue; // skip templates
    const contextPath = path.join(dir, name, 'CONTEXT.md');
    if (!fs.existsSync(contextPath)) continue;
    
    const content = fs.readFileSync(contextPath, 'utf8');
    const fm = parseFrontMatter(content);
    
    if (!fm) {
      errors.push(`${baseDir}/${name}/CONTEXT.md: no front matter found`);
      continue;
    }
    
    if (fm.type !== type) {
      errors.push(`${baseDir}/${name}/CONTEXT.md: type is "${fm.type}", expected "${type}"`);
    }
    
    // Validate canonical assets exist
    if (fm.canonical_assets) {
      for (const asset of fm.canonical_assets) {
        const assetPath = path.join(dir, name, asset.path || ('canonical/' + asset.file));
        if (!fs.existsSync(assetPath)) {
          // Try relative to repo root
          const rootPath = path.join(repoRoot, asset.path || '');
          if (!fs.existsSync(rootPath)) {
            errors.push(`${baseDir}/${name}: canonical asset not found: ${asset.path || asset.file}`);
          }
        }
      }
    }
    
    // Build entry
    const entry = {
      id: fm.id || name,
      name: fm.name || name,
      type: type,
      guidance: {
        context: `${baseDir}/${name}/CONTEXT.md`,
        usage: `${baseDir}/${name}/USAGE.md`,
      },
      canonicalAssets: (fm.canonical_assets || []).map(function(a) {
        return { role: a.role, file: a.file, path: a.path };
      }),
    };
    
    // Type-specific fields
    if (type === 'machine') {
      entry.feature = fm.feature;
      entry.operator = fm.operator;
      entry.accent = fm.accent;
    } else if (type === 'character') {
      entry.title = fm.title;
      entry.feature = fm.feature;
      entry.machine = fm.machine;
      entry.accent = fm.accent;
    }
    
    entries.push(entry);
  }
  
  return entries;
}

// Pipeline order for machines
const MACHINE_ORDER = ['produce', 'package', 'publish', 'prove', 'preserve'];

manifest.machines = scanDir('machines', 'machine')
  .sort((a, b) => MACHINE_ORDER.indexOf(a.id) - MACHINE_ORDER.indexOf(b.id));

manifest.characters = scanDir('characters', 'character');
manifest.environments = scanDir('environments', 'environment');

// ── Validate cross-references ──────────────────────────────────
const machineIds = new Set(manifest.machines.map(m => m.id));
const charIds = new Set(manifest.characters.map(c => c.id));

for (const m of manifest.machines) {
  if (m.operator && !charIds.has(m.operator)) {
    errors.push(`Machine "${m.id}" references operator "${m.operator}" which does not exist`);
  }
}

for (const c of manifest.characters) {
  if (c.machine && !machineIds.has(c.machine)) {
    errors.push(`Character "${c.id}" references machine "${c.machine}" which does not exist`);
  }
}

// ── Output ─────────────────────────────────────────────────────
if (errors.length > 0) {
  console.error('\n⚠️  Validation warnings:');
  errors.forEach(e => console.error('  ' + e));
  console.error('');
}

const outPath = path.join(repoRoot, 'brand-system.json');
fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2));

console.log(`✅ brand-system.json generated`);
console.log(`   ${manifest.machines.length} machines`);
console.log(`   ${manifest.characters.length} characters`);
console.log(`   ${manifest.environments.length} environments`);
console.log(`   ${manifest.formats.length} formats`);
if (errors.length) console.log(`   ${errors.length} warnings`);
