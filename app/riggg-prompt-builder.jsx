import { useState, useCallback, useMemo } from "react";

// ─── Config & Data ─────────────────────────────────────────────────
const STYLE = `Pixar-quality 3D illustration render at feature-film fidelity, not mobile game or clay-model quality. Slightly elevated isometric 3/4 perspective, camera approximately 30 degrees above horizontal. Clean warm cream background (#FAF5EF), no environment, no sky, no floor extending beyond the object's base — the subject sits on its own base like a diorama on a stage.

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
- Each gnome has their own energy: some are quick and kinetic, some are steady and deliberate. Their body language should reflect their personality, not a generic "standing gnome" template.`;

const NEG = `Do not include: chrome or silver metal, neon lights, digital screens, holographic displays, circuit board patterns, dark or moody lighting, sky or horizon, environmental backgrounds, floor tiles or wall textures, sharp edges, low-poly geometry, flat shading, cartoon outlines, text or words rendered in the image. Do not render in a clay, plasticine, or mobile-game style. Do not use uniform matte finish across all materials — each material must have distinct surface properties. Do not use decorative stamped shapes in place of functional mechanical detail.`;

const TYPES = [
  { id: "blog-hero", label: "Blog Post Hero", ratio: "16:9", size: "1536x864", desc: "Wide banner for article headers", comp: "Wide composition, subject centered 50-60% width, negative space for text zones." },
  { id: "feature-hero", label: "Feature Page Hero", ratio: "16:9", size: "1536x864", desc: "Primary 5P feature illustration", comp: "Machine + gnome as subjects. Machine 65-75% width, gnome at operating position." },
  { id: "social-sq", label: "Social Square", ratio: "1:1", size: "1024x1024", desc: "Instagram / social", comp: "Tight center crop. Glass chamber + gnome upper body, or single hero pose." },
  { id: "social-story", label: "Social Story", ratio: "9:16", size: "864x1536", desc: "Story / Reel", comp: "Vertical: machine upper, gnome lower. Or single gnome full-body centered." },
  { id: "card", label: "Card Thumbnail", ratio: "4:3", size: "1024x768", desc: "Link previews, embed cards", comp: "Single focal element. One machine detail, gnome portrait, or key prop. Legible at 300px." },
  { id: "slide", label: "Slide Illustration", ratio: "16:9", size: "1536x864", desc: "Deck art with text space", comp: "Subject right 40%, left 60% clean cream for text." },
  { id: "email", label: "Email Banner", ratio: "3:1", size: "1536x512", desc: "Newsletter header", comp: "Ultra-wide band. Conveyor detail, machine tops, or gnome upper bodies." },
];

const MACHINES = [
  { id: "produce", p: "Produce", name: "The Capture Rig", color: "#4CAF50", colorName: "Green", gnome: "produce-gnome", tagline: "Capture & create source media", quality: "Was the session captured to create clean, flexible source material?", emotion: "Alert and energetic but disciplined", prompt: "A precision capture workstation with teal powder-coated housing and aged bronze/brass fittings. Features a prominent studio microphone on an articulating brass arm extending from the top, a large central glass chamber filled with glowing green light showing visible waveform patterns being captured, a small mixing board surface with brass dials and faders, and cable connections running into the machine body. A small brass-housed indicator light glows green showing active recording. Output trays at the base hold neatly stacked source file cards. Conveyor belt base with bronze track and riveted details. Monitoring headphones hang from a brass hook. Small potted plant on the corner.", refs: ["factory-exterior-1.png", "capture-rig_produce-green.png", "spark_produce-green.png"] },
  { id: "package", p: "Package", name: "The Assembly Press", color: "#9C27B0", colorName: "Purple", gnome: "package-gnome", tagline: "Turn source into publishable assets", quality: "Can someone understand, click, share, or reuse this without extra explanation?", emotion: "Industrious and meticulous", prompt: "A wide, multi-stage assembly press with teal powder-coated housing and aged bronze/brass fittings. Distinct processing stations: a brass stamping press for titles, a precision cutting mechanism for clips, and a finishing station. A central glass processing chamber glows with purple light where raw source material transforms into finished assets. Multiple sorted output bins contain different asset types — small film reel spools, stacked title cards, framed thumbnail prints, and bundled guest-share kits wrapped with brass clasps. Conveyor belt base connects all stations. Brass label maker mechanism visible. Small potted plant between stations.", refs: ["factory-exterior-1.png", "assembly-press_package-purple.png", "crafter_package-purple.png"] },
  { id: "publish", p: "Publish", name: "The Distribution Engine", color: "#2196F3", colorName: "Blue", gnome: "publish-gnome", tagline: "Distribute across owned & shared channels", quality: "Did the media reach the channels and audiences it was created for?", emotion: "Efficient and systematic", prompt: "A wide mechanical sorting and routing station with teal powder-coated housing and aged bronze/brass fittings. Features a glass intake chamber on the left filled with glowing blue light, a central sorting mechanism with multiple brass arms that direct content cards into five to seven labeled output chutes, each with a small indicator light showing delivery status. Conveyor belt feeds from the left and splits into branching tracks on the right. A manifest clipboard hangs from a brass hook. Channel destination labels on small brass plates at each output slot. Small potted fern beside the station.", refs: ["factory-exterior-1.png", "distribution-engine_publish-blue.png", "router_publish-blue.png"] },
  { id: "prove", p: "Prove", name: "The Insight Scope", color: "#E91E63", colorName: "Pink", gnome: "prove-gnome", tagline: "Measure performance & business impact", quality: "Can the team see what shipped, what worked, and what should change?", emotion: "Observant and thoughtful", prompt: "A precision analytics workstation with teal powder-coated housing and aged bronze/brass fittings. Features a large magnifying glass apparatus with a glowing pink-red lens mounted on an adjustable brass arm, positioned over a conveyor belt carrying small content cards for analysis. Below the lens, cards are sorted into three brass trays with gauge indicators showing performance levels. Multiple small dial gauges across the machine body show various metrics. A brass telescope eyepiece extends from the side. Small printed scorecard reports emerge from a slot. Rolled paper charts in a wooden holder. Small potted succulent on the corner.", refs: ["factory-exterior-1.png", "insight-scope_prove-red.png", "lens_prove-red.png"] },
  { id: "preserve", p: "Preserve", name: "The Memory Vault", color: "#FF9800", colorName: "Amber", gnome: "preserve-gnome", tagline: "Make content compound over time", quality: "Can the organization find and reuse what it already knows?", emotion: "Protective and wise", prompt: "A sturdy archive vault workstation with teal powder-coated housing and aged bronze/brass fittings. Features a glass-fronted cabinet with glowing amber light illuminating organized rows of miniature content cards filed in brass drawer slots, a central retrieval mechanism with a brass crane arm that plucks cards from storage, and an output window where retrieved assets appear on a small brass display stand. Card catalog drawers with brass label holders line the lower section. A leather-bound ledger sits open on the work surface. Small brass key ring on a hook. Warm amber interior lighting. Small potted succulent on top.", refs: ["factory-exterior-1.png", "memory-vault_preserve-amber.png", "keeper_preserve-amber.png"] },
];

const CHARS = [
  { id: "produce-gnome", name: "Spark", title: "Master Producer", machine: "produce", signature: "Headphones, audio meter, cable tester", prompt: "A stocky gnome character, 3.5 heads tall, wearing a teal pointed hat with green accent stitching and RIGGG hexagonal logo, blue work shirt, teal overalls with monitoring headphones around neck and audio level meter clipped to belt, brown leather belt with brass buckle and cable tester holster, teal work gloves, heavy teal-brown boots with brass hardware. White beard, large round teal-blue eyes with alert expression, round pink-blushed nose, pointed ears. Expression: alert precision, focused readiness.", refs: ["spark_produce-green.png"] },
  { id: "package-gnome", name: "Crafter", title: "Master Packager", machine: "package", signature: "Ink roller, cutting shears, ink-stained tips", prompt: "A stocky gnome character, 3.5 heads tall, wearing a teal pointed hat with purple accent band and RIGGG hexagonal logo, blue work shirt, teal overalls with chest pocket containing a small ink roller, brown leather belt with brass buckle and precision cutting shears in holster, teal work gloves with ink-stained fingertips, heavy teal-brown boots with brass hardware. White beard with slight curl, large round teal-blue eyes with industrious expression, round pink-blushed nose, pointed ears. Expression: craftsmanlike pride, productive focus.", refs: ["crafter_package-purple.png"] },
  { id: "publish-gnome", name: "Router", title: "Distribution Chief", machine: "publish", signature: "Manifest clipboard, routing stamps, windswept beard", prompt: "A stocky gnome character, 3.5 heads tall, wearing a blue pointed hat with RIGGG hexagonal logo, blue work shirt, teal overalls with multiple belt pockets containing routing stamps and channel labels, brown leather belt with brass buckle and manifest clipboard holster, teal work gloves, heavy teal-brown boots with brass hardware. White beard slightly windswept, large round teal-blue eyes with alert efficient expression, round pink-blushed nose, pointed ears. Expression: energetic competence, mid-action.", refs: ["router_publish-blue.png", "distribution-engine_publish-blue.png"] },
  { id: "prove-gnome", name: "Lens", title: "Chief Analyst", machine: "prove", signature: "Brass spectacles, magnifying glass, calipers", prompt: "A stocky gnome character, 3.5 heads tall, wearing a teal pointed hat with pink accent band and RIGGG hexagonal logo, blue work shirt, teal overalls with brass calipers in chest pocket, brown leather belt with brass buckle and magnifying glass in leather holster, teal work gloves, heavy teal-brown boots with brass hardware. White beard neatly combed, large round teal-blue eyes with observant squint, round pink-blushed nose, small brass spectacles on nose, pointed ears. Expression: thoughtful concentration, knowing curiosity.", refs: ["lens_prove-red.png"] },
  { id: "preserve-gnome", name: "Keeper", title: "Chief Archivist", machine: "preserve", signature: "Leather ledger, brass key ring, reading spectacles", prompt: "A stocky gnome character, 3.5 heads tall, wearing a teal pointed hat with amber accent band and RIGGG hexagonal logo, blue work shirt, teal overalls with catalog cards in pockets, brown leather belt with brass buckle and leather ledger holster, brass key ring on belt, teal work gloves worn soft, heavy teal-brown boots with brass hardware. White beard with distinguished length, large round teal-blue eyes with warm protective expression, round pink-blushed nose, reading spectacles pushed up on forehead, pointed ears. Expression: gentle stewardship, warm organizational pride.", refs: ["keeper_preserve-amber.png"] },
];

const ENVS = [
  { id: "factory-exterior", name: "Factory Exterior", desc: "The full RIGGG factory — the platform as a place", prompt: "The RIGGG factory — a whimsical multi-story industrial complex. Rounded cylindrical towers, teal powder-coated surfaces with cream panel sections, exposed teal and orange pipe network, an orange spiral slide connecting levels, glass curtain wall showing warm-lit interior activity. RIGGG wordmark and hexagonal logo on main facade. In the foreground, a brass conveyor belt carries five translucent glass jars glowing green, purple, blue, pink, and amber. Small trees and potted plants around the base.", refs: ["factory-exterior-1.png"] },
  { id: "factory-interior", name: "Factory Interior", desc: "Interior workshop — the system working together", prompt: "Interior of the RIGGG factory — a warm, well-lit workshop space with high ceilings and exposed teal pipe networks overhead. Multiple workstations visible along a central conveyor belt system. Warm amber lighting from overhead industrial pendant lamps. Brass and teal machinery lining both sides. Wooden floor with worn patina. Tool boards on walls, potted plants on shelves, stacked output trays between stations.", refs: ["factory-exterior-1.png", "factory-interior-1.png"] },
];

// ─── Compiler ──────────────────────────────────────────────────────
function compile(assetType, machs, chars, envs, topic, notes) {
  const parts = [STYLE];
  const t = TYPES.find(x => x.id === assetType);
  if (t) parts.push("\nFORMAT: " + t.label + " (" + t.ratio + ")\nCOMPOSITION: " + t.comp);
  const eList = ENVS.filter(x => envs.includes(x.id));
  if (eList.length) parts.push("\nSETTING:\n" + eList.map(x => x.prompt).join("\n\n"));
  const mList = MACHINES.filter(x => machs.includes(x.id));
  if (mList.length) parts.push("\n" + (mList.length > 1 ? "MACHINES" : "MACHINE") + ":\n" + mList.map(x => x.prompt).join("\n\n"));
  const cList = CHARS.filter(x => chars.includes(x.id));
  if (cList.length) parts.push("\n" + (cList.length > 1 ? "CHARACTERS" : "CHARACTER") + ":\n" + cList.map(x => x.prompt).join("\n\n"));
  if (topic.trim()) parts.push('\nTOPIC CONTEXT: The scene should subtly suggest "' + topic.trim() + '". Use relevant props, output artifacts, or visual details — do NOT render readable text.');
  if (notes.trim()) parts.push("\nDIRECTION: " + notes.trim());
  parts.push("\nNEGATIVE: " + NEG);
  return parts.join("\n");
}

function getRefs(machs, chars, envs) {
  const r = new Set();
  machs.forEach(function(id) { var m = MACHINES.find(function(x) { return x.id === id; }); if (m) m.refs.forEach(function(x) { r.add(x); }); });
  chars.forEach(function(id) { var c = CHARS.find(function(x) { return x.id === id; }); if (c) c.refs.forEach(function(x) { r.add(x); }); });
  envs.forEach(function(id) { var e = ENVS.find(function(x) { return x.id === id; }); if (e) e.refs.forEach(function(x) { r.add(x); }); });
  return Array.from(r);
}

// ─── GitHub Fetch ──────────────────────────────────────────────────
var REPO = "grey-highroads/Riggg";
var RAW = function(path) { return "https://raw.githubusercontent.com/" + REPO + "/main/" + path; };

function parseSections(md) {
  var s = {};
  var key = null;
  md.split("\n").forEach(function(line) {
    var h = line.match(/^#{2,3}\s+(.+)/);
    if (h) { key = h[1].trim(); s[key] = ""; }
    else if (key != null) { s[key] += line + "\n"; }
  });
  for (var k in s) { s[k] = s[k].trim(); }
  return s;
}

function getField(sections, section, label) {
  var block = sections[section] || "";
  var re = new RegExp("\\*\\*" + label + ":\\*\\*\\s*(.+)", "i");
  var m = block.match(re);
  return m ? m[1].replace(/`/g, "").trim() : "";
}

function getCodeBlock(text) {
  var m = text.match(/```[\w]*\n([\s\S]*?)```/);
  return m ? m[1].trim() : "";
}

function getTitle(md) {
  var m = md.match(/^#\s+(.+?)(?:\s*—.*)?$/m);
  return m ? m[1].trim() : "";
}

function getImageRefs(text) {
  var refs = [];
  var matches = text.match(/`([^`]*\.png)`/g);
  if (matches) { matches.forEach(function(m) { refs.push(m.replace(/`/g, "")); }); }
  return refs;
}

var PCOLORS = { produce: ["#4CAF50", "Green"], package: ["#9C27B0", "Purple"], publish: ["#2196F3", "Blue"], prove: ["#E91E63", "Pink"], preserve: ["#FF9800", "Amber"] };

async function syncFromRepo() {
  var treeResp = await fetch("https://api.github.com/repos/" + REPO + "/git/trees/main?recursive=1");
  if (!treeResp.ok) throw new Error("GitHub API: " + treeResp.status);
  var treeData = await treeResp.json();
  var allPaths = treeData.tree.filter(function(t) { return t.type === "blob"; }).map(function(t) { return t.path; });

  var machDirs = [];
  var charDirs = [];
  var envDirs = [];
  allPaths.forEach(function(p) {
    var machMatch = p.match(/^machines\/([^_][^/]+)\/CONTEXT\.md$/);
    if (machMatch && machDirs.indexOf(machMatch[1]) === -1) machDirs.push(machMatch[1]);
    var charMatch = p.match(/^characters\/([^_][^/]+)\/CONTEXT\.md$/);
    if (charMatch && charDirs.indexOf(charMatch[1]) === -1) charDirs.push(charMatch[1]);
    var envMatch = p.match(/^environments\/([^/]+)\/CONTEXT\.md$/);
    if (envMatch && envDirs.indexOf(envMatch[1]) === -1) envDirs.push(envMatch[1]);
  });

  // Fetch style anchor
  var styleAnchor = "";
  var negPrompt = "";
  try {
    var saResp = await fetch(RAW("prompts/base/style-anchor.md"));
    var saText = await saResp.text();
    var saSec = parseSections(saText);
    styleAnchor = getCodeBlock(saSec["Core Style Fragment"] || "") || getCodeBlock(saText);
    negPrompt = getCodeBlock(saSec["Negative Prompt Fragment"] || "");
  } catch(e) { /* use fallback */ }

  // Fetch machines
  var machines = [];
  for (var i = 0; i < machDirs.length; i++) {
    var dir = machDirs[i];
    try {
      var ctxResp = await fetch(RAW("machines/" + dir + "/CONTEXT.md"));
      var useResp = await fetch(RAW("machines/" + dir + "/USAGE.md"));
      var ctxText = await ctxResp.text();
      var useText = await useResp.text();
      var ctx = parseSections(ctxText);
      var use = parseSections(useText);

      var pName = getField(ctx, "Feature Identity", "RIGGG feature") || dir;
      var gnomeId = getField(ctx, "Feature Identity", "Assigned gnome").toLowerCase();
      var emotion = (ctx["Emotional Register"] || "").split("\n").filter(function(l) { return l.trim() && l.indexOf("**") === 0; })[0] || "";
      emotion = emotion.replace(/^\*\*[^*]+\*\*\s*/, "").trim();
      var tagline = getField(ctx, "Business Context", "What this feature does \\(plain language\\)");
      var quality = getField(ctx, "Business Context", "Quality question");
      // Get prompt from Prompt Fragments section code block, or first code block in USAGE
      var promptText = getCodeBlock(use["Prompt Fragments"] || "") || getCodeBlock(useText);
      var refs = getImageRefs(use["Canonical Assets"] || useText);
      if (refs.length === 0) refs.push("factory-exterior-1.png");

      machines.push({
        id: dir, p: pName, name: getTitle(ctxText),
        color: PCOLORS[dir] ? PCOLORS[dir][0] : "#0A5858",
        colorName: PCOLORS[dir] ? PCOLORS[dir][1] : "Teal",
        gnome: gnomeId ? charDirs.find(function(d) { return d.indexOf(gnomeId) !== -1; }) || dir + "-gnome" : dir + "-gnome",
        tagline: tagline, quality: quality, emotion: emotion,
        prompt: promptText, refs: refs
      });
    } catch(e) { console.warn("Machine " + dir + ":", e); }
  }

  // Fetch characters
  var characters = [];
  for (var j = 0; j < charDirs.length; j++) {
    var cdir = charDirs[j];
    try {
      var cCtxResp = await fetch(RAW("characters/" + cdir + "/CONTEXT.md"));
      var cUseResp = await fetch(RAW("characters/" + cdir + "/USAGE.md"));
      var cCtxText = await cCtxResp.text();
      var cUseText = await cUseResp.text();
      var cCtx = parseSections(cCtxText);
      var cUse = parseSections(cUseText);

      var cName = getTitle(cCtxText);
      var cRole = getField(cCtx, "Identity", "Role in the Factory");
      var cFeature = getField(cCtx, "Identity", "Feature Mapped To").toLowerCase();
      var cMachineId = machDirs.find(function(d) { return d === cFeature; }) || cdir.replace("-gnome", "");
      var cSig = getField(cUse, "Visual Identity", "Distinguishing features") || getField(cUse, "Visual Identity", "Signature props") || "";
      var cPrompt = getCodeBlock(cUse["Prompt Fragments"] || "") || getCodeBlock(cUseText);
      var cRefs = getImageRefs(cUse["Canonical Assets"] || cUseText);
      if (cRefs.length === 0) cRefs.push("spark_produce-green.png");

      characters.push({
        id: cdir, name: cName, title: cRole, machine: cMachineId,
        signature: cSig, prompt: cPrompt, refs: cRefs
      });
    } catch(e) { console.warn("Character " + cdir + ":", e); }
  }

  // Fetch environments
  var environments = [];
  for (var k = 0; k < envDirs.length; k++) {
    var edir = envDirs[k];
    try {
      var eCtxResp = await fetch(RAW("environments/" + edir + "/CONTEXT.md"));
      var eUseResp = await fetch(RAW("environments/" + edir + "/USAGE.md"));
      var eCtxText = await eCtxResp.text();
      var eUseText = await eUseResp.text();
      var eCtx = parseSections(eCtxText);

      var eName = getTitle(eCtxText);
      var eDesc = getField(eCtx, "Business Context", "What it represents") || getField(eCtx, "Identity", "Role");
      var ePrompt = getCodeBlock(eUseText);
      var eRefs = getImageRefs(eUseText);
      if (eRefs.length === 0) eRefs.push("factory-exterior-1.png");

      environments.push({ id: edir, name: eName, desc: eDesc, prompt: ePrompt, refs: eRefs });
    } catch(e) { console.warn("Env " + edir + ":", e); }
  }

  // Sort machines in pipeline order
  var order = ["produce", "package", "publish", "prove", "preserve"];
  machines.sort(function(a, b) { return order.indexOf(a.id) - order.indexOf(b.id); });

  return {
    machines: machines, characters: characters, environments: environments,
    styleAnchor: styleAnchor, negPrompt: negPrompt,
    syncedAt: new Date().toISOString()
  };
}

// ─── App ───────────────────────────────────────────────────────────
export default function RigggPromptBuilder() {
  const [syncState, setSyncState] = useState("idle");
  const [syncError, setSyncError] = useState("");
  const [liveMachines, setLiveMachines] = useState(null);
  const [liveChars, setLiveChars] = useState(null);
  const [liveEnvs, setLiveEnvs] = useState(null);
  const [liveStyle, setLiveStyle] = useState(null);
  const [liveNeg, setLiveNeg] = useState(null);
  const [syncTime, setSyncTime] = useState(null);
  const [assetType, setAssetType] = useState("");
  const [machs, setMachs] = useState([]);
  const [chars, setChars] = useState([]);
  const [envs, setEnvs] = useState([]);
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [built, setBuilt] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [genState, setGenState] = useState("idle"); // idle | fetching-refs | generating | done | error
  const [genMessage, setGenMessage] = useState("");
  const [genImage, setGenImage] = useState(null); // base64 data URL
  const [genError, setGenError] = useState("");

  // Use live data if synced, otherwise fallback
  var activeMachines = liveMachines || MACHINES;
  var activeChars = liveChars || CHARS;
  var activeEnvs = liveEnvs || ENVS;
  var activeStyle = liveStyle || STYLE;
  var activeNeg = liveNeg || NEG;
  var isLive = liveMachines !== null;

  function doSync() {
    setSyncState("syncing");
    setSyncError("");
    syncFromRepo().then(function(result) {
      if (result.machines.length === 0) throw new Error("No machines found in repo");
      setLiveMachines(result.machines);
      setLiveChars(result.characters);
      setLiveEnvs(result.environments);
      if (result.styleAnchor) setLiveStyle(result.styleAnchor);
      if (result.negPrompt) setLiveNeg(result.negPrompt);
      setSyncTime(result.syncedAt);
      setSyncState("synced");
    }).catch(function(e) {
      console.error("Sync failed:", e);
      setSyncError(e.message || "Could not reach repo");
      setSyncState("error");
    });
  }

  function toggleList(list, setList, id) {
    if (list.includes(id)) {
      setList(list.filter(function(x) { return x !== id; }));
    } else {
      setList(list.concat([id]));
    }
  }

  var suggested = [];
  machs.forEach(function(id) {
    var m = activeMachines.find(function(x) { return x.id === id; });
    if (m && m.gnome) suggested.push(m.gnome);
  });

  var ready = assetType && (machs.length > 0 || chars.length > 0 || envs.length > 0);
  var prompt = ready ? compileActive(assetType, machs, chars, envs, topic, notes) : "";
  var refs = getRefsActive(machs, chars, envs);
  var wordCount = prompt ? prompt.split(/\s+/).filter(Boolean).length : 0;

  function compileActive(assetType, machs, chars, envs, topic, notes) {
    var parts = [activeStyle];
    var t = TYPES.find(function(x) { return x.id === assetType; });
    if (t) parts.push("\nFORMAT: " + t.label + " (" + t.ratio + ")\nCOMPOSITION: " + t.comp);
    var eList = activeEnvs.filter(function(x) { return envs.indexOf(x.id) !== -1; });
    if (eList.length) parts.push("\nSETTING:\n" + eList.map(function(x) { return x.prompt; }).join("\n\n"));
    var mList = activeMachines.filter(function(x) { return machs.indexOf(x.id) !== -1; });
    if (mList.length) parts.push("\n" + (mList.length > 1 ? "MACHINES" : "MACHINE") + ":\n" + mList.map(function(x) { return x.prompt; }).join("\n\n"));
    var cList = activeChars.filter(function(x) { return chars.indexOf(x.id) !== -1; });
    if (cList.length) parts.push("\n" + (cList.length > 1 ? "CHARACTERS" : "CHARACTER") + ":\n" + cList.map(function(x) { return x.prompt; }).join("\n\n"));
    if (topic.trim()) parts.push('\nTOPIC CONTEXT: The scene should subtly suggest "' + topic.trim() + '". Use relevant props, output artifacts, or visual details — do NOT render readable text.');
    if (notes.trim()) parts.push("\nDIRECTION: " + notes.trim());
    parts.push("\nNEGATIVE: " + activeNeg);
    return parts.join("\n");
  }

  function getRefsActive(machs, chars, envs) {
    var r = new Set();
    machs.forEach(function(id) { var m = activeMachines.find(function(x) { return x.id === id; }); if (m) m.refs.forEach(function(x) { r.add(x); }); });
    chars.forEach(function(id) { var c = activeChars.find(function(x) { return x.id === id; }); if (c) c.refs.forEach(function(x) { r.add(x); }); });
    envs.forEach(function(id) { var e = activeEnvs.find(function(x) { return x.id === id; }); if (e) e.refs.forEach(function(x) { r.add(x); }); });
    return Array.from(r);
  }

  function doCopy() {
    navigator.clipboard.writeText(prompt).then(function() {
      setCopied(true);
      setTimeout(function() { setCopied(false); }, 2000);
    });
  }

  function doGenerate() {
    if (!apiKey.trim()) {
      setShowKeyInput(true);
      return;
    }

    // Get the correct output size for this format
    var selectedType = TYPES.find(function(t) { return t.id === assetType; });
    var outputSize = selectedType ? selectedType.size : "1536x864";

    // Build GitHub raw URLs for reference images
    var refPaths = [];
    activeMachines.forEach(function(m) {
      if (machs.indexOf(m.id) !== -1) {
        m.refs.forEach(function(filename) {
          // Determine the path based on filename pattern
          if (filename.indexOf("factory-") === 0) refPaths.push("environments/" + filename.replace(/-\d+\.png/, "") + "/canonical/" + filename);
          else {
            // Check machines and characters
            activeMachines.forEach(function(mm) { if (mm.refs.indexOf(filename) !== -1) refPaths.push("machines/" + mm.id + "/canonical/" + filename); });
            activeChars.forEach(function(cc) { if (cc.refs.indexOf(filename) !== -1) refPaths.push("characters/" + cc.id + "/canonical/" + filename); });
          }
        });
      }
    });
    activeChars.forEach(function(c) {
      if (chars.indexOf(c.id) !== -1) {
        c.refs.forEach(function(filename) {
          refPaths.push("characters/" + c.id + "/canonical/" + filename);
        });
      }
    });
    // Deduplicate
    refPaths = refPaths.filter(function(v, i, a) { return a.indexOf(v) === i; });
    // Limit to 3 most relevant references
    refPaths = refPaths.slice(0, 3);

    var refUrls = refPaths.map(function(p) {
      return "https://raw.githubusercontent.com/" + REPO + "/main/" + p;
    });

    if (refUrls.length === 0) {
      // No references — fall back to text-only generation
      setGenState("generating");
      setGenMessage("Generating (text-only, no references) — 30-60 seconds...");
      setGenImage(null);
      setGenError("");

      fetch("https://api.openai.com/v1/images/generations", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + apiKey.trim() },
        body: JSON.stringify({ model: "gpt-image-2", prompt: prompt, n: 1, size: outputSize, quality: "high" })
      }).then(function(r) {
        if (!r.ok) return r.json().then(function(e) { throw new Error(e.error ? e.error.message : "API error " + r.status); });
        return r.json();
      }).then(function(data) {
        if (data.data && data.data[0]) {
          var img = data.data[0];
          setGenImage(img.b64_json ? "data:image/png;base64," + img.b64_json : img.url);
          setGenState("done");
        } else { setGenState("error"); setGenError("No image returned."); }
      }).catch(function(err) { setGenState("error"); setGenError(err.message); });
      return;
    }

    // Fetch reference images, then use edits endpoint
    setGenState("fetching-refs");
    setGenMessage("Fetching " + refUrls.length + " reference images from repo...");
    setGenImage(null);
    setGenError("");

    Promise.all(refUrls.map(function(url) {
      return fetch(url).then(function(r) {
        if (!r.ok) throw new Error("Failed to fetch reference: " + url);
        return r.blob();
      });
    })).then(function(blobs) {
      setGenState("generating");
      setGenMessage("Sending prompt + " + blobs.length + " reference images to renderer — 30-90 seconds...");

      // Build multipart form data for the edits endpoint
      var formData = new FormData();
      formData.append("model", "gpt-image-2");
      formData.append("prompt", prompt);
      formData.append("n", "1");
      formData.append("size", outputSize);
      formData.append("quality", "high");

      // Append reference images
      blobs.forEach(function(blob, i) {
        var filename = refPaths[i].split("/").pop();
        formData.append("image[]", blob, filename);
      });

      return fetch("https://api.openai.com/v1/images/edits", {
        method: "POST",
        headers: { "Authorization": "Bearer " + apiKey.trim() },
        body: formData
      });
    }).then(function(response) {
      if (!response.ok) {
        return response.json().then(function(err) {
          throw new Error(err.error ? err.error.message : "API error " + response.status);
        });
      }
      return response.json();
    }).then(function(data) {
      if (data.data && data.data[0]) {
        var img = data.data[0];
        setGenImage(img.b64_json ? "data:image/png;base64," + img.b64_json : img.url);
        setGenState("done");
      } else {
        setGenState("error");
        setGenError("No image returned from API.");
      }
    }).catch(function(err) {
      console.error("Generation failed:", err);
      setGenState("error");
      setGenError(err.message || "Generation failed");
    });
  }

  function doDownload() {
    if (!genImage) return;
    var link = document.createElement("a");
    link.href = genImage;
    var assetName = machs[0] || chars[0] || "riggg-asset";
    link.download = assetName + "_" + (topic.trim().replace(/\s+/g, "-").substring(0, 30) || "generated") + ".png";
    link.click();
  }

  function reset() {
    setAssetType(""); setMachs([]); setChars([]); setEnvs([]); setTopic(""); setNotes(""); setBuilt(false); setCopied(false);
  }

  var sourceFiles = ["prompts/base/style-anchor.md"];
  machs.forEach(function(id) { sourceFiles.push("machines/" + id + "/CONTEXT.md"); sourceFiles.push("machines/" + id + "/USAGE.md"); });
  chars.forEach(function(id) { sourceFiles.push("characters/" + id + "/USAGE.md"); });
  envs.forEach(function(id) { sourceFiles.push("environments/" + id + "/USAGE.md"); });
  sourceFiles.push("foundation/world-rules/CONSISTENCY.md");

  var cardBase = { padding: "12px 14px", borderRadius: 10, cursor: "pointer", transition: "all 0.15s ease", position: "relative" };
  var checkmark = { position: "absolute", top: 6, right: 6, width: 18, height: 18, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 700 };
  var inputBase = { width: "100%", padding: "10px 14px", fontSize: 13.5, fontFamily: "'DM Sans', sans-serif", border: "1px solid #E8DCC8", borderRadius: 8, background: "#FAFAFA", color: "#1A1A14", outline: "none", boxSizing: "border-box" };
  var tagStyle = { fontSize: 10, fontFamily: "'JetBrains Mono', monospace", background: "#0A585810", color: "#0A5858", padding: "2px 5px", borderRadius: 3, border: "1px solid #0A585812", display: "inline-block" };

  return (
    <div style={{ minHeight: "100vh", background: "#FAF5EF", fontFamily: "'DM Sans', system-ui, sans-serif", color: "#1A1A14" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,700&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 20px" }}>

        {/* Header */}
        <div style={{ padding: "28px 0 20px", borderBottom: "1px solid #E8DCC8" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, background: "#0A5858", display: "flex", alignItems: "center", justifyContent: "center", color: "#FAF5EF", fontSize: 13, fontWeight: 700 }}>R</div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0A5858", letterSpacing: "-0.02em" }}>RIGGG Prompt Builder</h1>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: "#707060", lineHeight: 1.5 }}>Select brand objects, add context, compile a prompt, attach reference images, render.</p>
        </div>

        {/* Sync */}
        <div style={{ padding: "16px 0 0" }}>
          <div style={{ display: "flex", alignItems: "stretch", gap: 10 }}>
            <button onClick={doSync} disabled={syncState === "syncing"} style={{ padding: "14px 22px", fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", background: syncState === "syncing" ? "#707060" : "#0A5858", color: "#FAF5EF", border: "none", borderRadius: 10, cursor: syncState === "syncing" ? "wait" : "pointer", display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
              {syncState === "syncing" ? "Syncing..." : "Sync Brand System"}
            </button>
            <div style={{ flex: 1, padding: "10px 16px", borderRadius: 10, border: "1px solid #E8DCC8", background: syncState === "synced" ? "#4CAF5008" : syncState === "error" ? "#E91E6308" : "#FAFAFA", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              {syncState === "idle" && (
                <div style={{ fontSize: 12.5, color: "#707060" }}>
                  <span style={{ fontWeight: 600, color: "#0A5858" }}>Built-in data loaded</span> — {activeMachines.length} machines · {activeChars.length} characters · {activeEnvs.length} environments.
                  <span style={{ color: "#B0A898" }}> Hit sync to pull live from <code style={{ fontSize: 11 }}>grey-highroads/Riggg</code></span>
                </div>
              )}
              {syncState === "syncing" && (
                <div style={{ fontSize: 12.5, color: "#707060" }}>Reading brand system from GitHub...</div>
              )}
              {syncState === "synced" && (
                <div>
                  <div style={{ fontSize: 12.5, color: "#4CAF50", fontWeight: 600, marginBottom: 2 }}>✓ Synced from repo</div>
                  <div style={{ fontSize: 11, color: "#707060" }}>{activeMachines.length} machines · {activeChars.length} characters · {activeEnvs.length} environments · {new Date(syncTime).toLocaleTimeString()}</div>
                </div>
              )}
              {syncState === "error" && (
                <div>
                  <div style={{ fontSize: 12.5, color: "#E91E63", fontWeight: 600, marginBottom: 2 }}>Sync failed — using built-in data</div>
                  <div style={{ fontSize: 11, color: "#707060" }}>{syncError}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Step 1: Format */}
        <div style={{ paddingTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#0A5858", color: "#FAF5EF", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>1</span>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Format</h2>
          </div>
          <p style={{ margin: "0 0 14px 32px", fontSize: 12.5, color: "#707060" }}>What are you making? Sets aspect ratio and composition.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 8 }}>
            {TYPES.map(function(t) {
              var sel = assetType === t.id;
              return (
                <div key={t.id} onClick={function() { setAssetType(t.id); }} style={Object.assign({}, cardBase, { border: sel ? "2px solid #0A5858" : "2px solid transparent", background: sel ? "#0A58580D" : "#FAFAFA" })}>
                  {sel && <div style={Object.assign({}, checkmark, { background: "#0A5858" })}>✓</div>}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{t.label}</span>
                    <span style={{ fontSize: 11, color: "#B0A898", fontFamily: "monospace" }}>{t.ratio}</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: "#707060", lineHeight: 1.3, marginTop: 2 }}>{t.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Machine */}
        <div style={{ paddingTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#0A5858", color: "#FAF5EF", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>2</span>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Machine</h2>
          </div>
          <p style={{ margin: "0 0 14px 32px", fontSize: 12.5, color: "#707060" }}>Which stage of the pipeline?</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 8 }}>
            {activeMachines.map(function(m) {
              var sel = machs.includes(m.id);
              return (
                <div key={m.id} onClick={function() { toggleList(machs, setMachs, m.id); }} style={Object.assign({}, cardBase, { border: sel ? "2px solid " + m.color : "2px solid transparent", background: sel ? m.color + "0D" : "#FAFAFA" })}>
                  {sel && <div style={Object.assign({}, checkmark, { background: m.color })}>✓</div>}
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 3 }}>
                    <span style={{ display: "inline-block", width: 9, height: 9, borderRadius: "50%", background: m.color, boxShadow: "0 0 5px " + m.color + "55" }} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{m.name}</span>
                  </div>
                  <div style={{ fontSize: 10.5, fontWeight: 600, color: m.color, marginBottom: 3, letterSpacing: "0.03em" }}>{m.p.toUpperCase()}</div>
                  <div style={{ fontSize: 11.5, color: "#707060", lineHeight: 1.35, marginBottom: 4 }}>{m.tagline}</div>
                  <div style={{ fontSize: 10.5, color: "#B0A898", fontStyle: "italic" }}>{m.emotion}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Gnome */}
        <div style={{ paddingTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#0A5858", color: "#FAF5EF", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>3</span>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Gnome</h2>
          </div>
          <p style={{ margin: "0 0 14px 32px", fontSize: 12.5, color: "#707060" }}>
            {suggested.length > 0 ? "Suggested: " + suggested.map(function(id) { var c = CHARS.find(function(x) { return x.id === id; }); return c ? c.name : id; }).join(", ") : "Which operator? Usually paired with their machine."}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 8 }}>
            {activeChars.map(function(c) {
              var sel = chars.includes(c.id);
              var m = activeMachines.find(function(x) { return x.id === c.machine; });
              var isSugg = suggested.includes(c.id);
              var color = m ? m.color : "#0A5858";
              return (
                <div key={c.id} onClick={function() { toggleList(chars, setChars, c.id); }} style={Object.assign({}, cardBase, { border: sel ? "2px solid " + color : "2px solid transparent", background: sel ? color + "0D" : "#FAFAFA" })}>
                  {sel && <div style={Object.assign({}, checkmark, { background: color })}>✓</div>}
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 2 }}>
                    <span style={{ display: "inline-block", width: 9, height: 9, borderRadius: "50%", background: color, boxShadow: "0 0 5px " + color + "55" }} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</span>
                    {isSugg && <span style={{ fontSize: 9.5, background: "#0A585812", color: "#0A5858", padding: "1px 5px", borderRadius: 3, fontWeight: 500 }}>suggested</span>}
                  </div>
                  <div style={{ fontSize: 11.5, color: "#707060", marginBottom: 2 }}>{c.title}</div>
                  <div style={{ fontSize: 10.5, color: "#B0A898", lineHeight: 1.35 }}>{c.signature}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 4: Setting */}
        <div style={{ paddingTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#0A5858", color: "#FAF5EF", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>4</span>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Setting</h2>
          </div>
          <p style={{ margin: "0 0 14px 32px", fontSize: 12.5, color: "#707060" }}>Optional. Most scenes use the default cream background.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {activeEnvs.map(function(e) {
              var sel = envs.includes(e.id);
              return (
                <div key={e.id} onClick={function() { toggleList(envs, setEnvs, e.id); }} style={Object.assign({}, cardBase, { border: sel ? "2px solid #0A5858" : "2px solid transparent", background: sel ? "#0A58580D" : "#FAFAFA" })}>
                  {sel && <div style={Object.assign({}, checkmark, { background: "#0A5858" })}>✓</div>}
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{e.name}</div>
                  <div style={{ fontSize: 11.5, color: "#707060", lineHeight: 1.3 }}>{e.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 5: Topic */}
        <div style={{ paddingTop: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ width: 24, height: 24, borderRadius: "50%", background: "#0A5858", color: "#FAF5EF", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>5</span>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Topic</h2>
          </div>
          <p style={{ margin: "0 0 14px 32px", fontSize: 12.5, color: "#707060" }}>Shapes props and visual details. No text rendered in the image.</p>
          <input style={inputBase} value={topic} onChange={function(e) { setTopic(e.target.value); }} placeholder='e.g. "podcast distribution cadence best practices"' />
          <textarea style={Object.assign({}, inputBase, { marginTop: 8, resize: "vertical" })} rows={2} value={notes} onChange={function(e) { setNotes(e.target.value); }} placeholder="Additional direction — mood, specific props, composition..." />
        </div>

        {/* API Key (collapsible) */}
        <div style={{ paddingTop: 20 }}>
          <div onClick={function() { setShowKeyInput(!showKeyInput); }} style={{ display: "inline-flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 12.5, color: "#707060" }}>
            <span style={{ transform: showKeyInput ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.15s", display: "inline-block" }}>▶</span>
            <span>{apiKey ? "✓ OpenAI API key set" : "Set OpenAI API key for image generation"}</span>
          </div>
          {showKeyInput && (
            <div style={{ marginTop: 8 }}>
              <input
                type="password"
                style={Object.assign({}, inputBase, { maxWidth: 400 })}
                value={apiKey}
                onChange={function(e) { setApiKey(e.target.value); }}
                placeholder="sk-..."
              />
              <div style={{ fontSize: 11, color: "#B0A898", marginTop: 4 }}>Stored in memory only — never saved or transmitted except to OpenAI's API.</div>
            </div>
          )}
        </div>

        {/* Compile */}
        <div style={{ display: "flex", gap: 10, padding: "16px 0 16px" }}>
          <button onClick={function() { setBuilt(true); }} disabled={!ready} style={{ padding: "12px 24px", fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", background: ready ? "#0A5858" : "#B0A898", color: "#FAF5EF", border: "none", borderRadius: 8, cursor: ready ? "pointer" : "not-allowed" }}>Compile Prompt</button>
          {built && prompt && apiKey && (
            <button onClick={doGenerate} disabled={genState === "fetching-refs" || genState === "generating"} style={{ padding: "12px 24px", fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", background: genState === "generating" || genState === "fetching-refs" ? "#707060" : "#4CAF50", color: "#FAF5EF", border: "none", borderRadius: 8, cursor: genState === "generating" ? "wait" : "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              {genState === "fetching-refs" || genState === "generating" ? "Generating..." : "Generate Image"}
            </button>
          )}
          {(assetType || machs.length > 0) && <button onClick={reset} style={{ padding: "12px 18px", fontSize: 13, fontFamily: "'DM Sans', sans-serif", background: "transparent", color: "#707060", border: "1px solid #E8DCC8", borderRadius: 8, cursor: "pointer" }}>Reset</button>}
        </div>

        {/* Generation Status */}
        {genState !== "idle" && genState !== "done" && (
          <div style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid #E8DCC8", background: genState === "error" ? "#E91E6308" : "#4CAF5008", marginBottom: 16 }}>
            {genState === "error" ? (
              <div>
                <div style={{ fontSize: 12.5, color: "#E91E63", fontWeight: 600, marginBottom: 4 }}>Generation failed</div>
                <div style={{ fontSize: 11, color: "#707060" }}>{genError}</div>
              </div>
            ) : (
              <div style={{ fontSize: 12.5, color: "#707060" }}>{genMessage}</div>
            )}
          </div>
        )}

        {/* Generated Image */}
        {genImage && (
          <div style={{ border: "1px solid #4CAF5030", borderRadius: 12, overflow: "hidden", background: "#FAFAFA", marginBottom: 16 }}>
            <div style={{ padding: "12px 18px", background: "#4CAF5010", borderBottom: "1px solid #4CAF5020", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#4CAF50" }}>Generated Image</span>
                <span style={{ fontSize: 11, color: "#707060", marginLeft: 10 }}>Review against consistency checklist before use</span>
              </div>
              <button onClick={doDownload} style={{ padding: "5px 14px", fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", background: "#0A5858", color: "#FAF5EF", border: "none", borderRadius: 5, cursor: "pointer" }}>Download</button>
            </div>
            <div style={{ padding: 18, display: "flex", justifyContent: "center", background: "#FAF5EF" }}>
              <img src={genImage} alt="Generated RIGGG asset" style={{ maxWidth: "100%", maxHeight: 600, borderRadius: 8, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }} />
            </div>
          </div>
        )}

        {/* Output */}
        {built && prompt && (
          <div style={{ border: "1px solid #0A585825", borderRadius: 12, overflow: "hidden", background: "#FAFAFA", marginBottom: 16 }}>

            {/* Reference images */}
            <div style={{ padding: "14px 18px", background: "#FF98000C", borderBottom: "1px solid #FF980020" }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#996000", marginBottom: 6, letterSpacing: "0.02em" }}>ATTACH THESE REFERENCE IMAGES</div>
              <div style={{ fontSize: 12, color: "#705030", lineHeight: 1.5, marginBottom: 8 }}>Upload as style references alongside the prompt. The reference does the visual consistency work — the prompt handles subject and composition.</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {refs.map(function(r) {
                  return <span key={r} style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", background: "#FF980012", color: "#705030", padding: "3px 8px", borderRadius: 4, border: "1px solid #FF980018" }}>📎 {r}</span>;
                })}
              </div>
            </div>

            {/* Prompt header */}
            <div style={{ padding: "12px 18px", background: "#0A58580A", borderBottom: "1px solid #0A585815", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0A5858" }}>Compiled Prompt</span>
                <span style={{ fontSize: 11, color: "#707060", marginLeft: 10 }}>{wordCount} words</span>{isLive ? <span style={{ fontSize: 10, color: "#4CAF50", marginLeft: 8, fontWeight: 500 }}>live repo</span> : <span style={{ fontSize: 10, color: "#FF9800", marginLeft: 8 }}>built-in</span>}
              </div>
              <button onClick={doCopy} style={{ padding: "5px 12px", fontSize: 12, fontWeight: 500, fontFamily: "'DM Sans', sans-serif", background: copied ? "#4CAF50" : "#0A5858", color: "#FAF5EF", border: "none", borderRadius: 5, cursor: "pointer", minWidth: 70 }}>{copied ? "Copied ✓" : "Copy"}</button>
            </div>

            {/* Source files */}
            <div style={{ padding: "10px 18px", borderBottom: "1px solid #E8DCC8" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#B0A898", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 5 }}>Source files</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {sourceFiles.map(function(f) { return <code key={f} style={tagStyle}>{f}</code>; })}
              </div>
            </div>

            {/* Prompt text */}
            <pre style={{ padding: 18, margin: 0, fontSize: 11.5, lineHeight: 1.55, fontFamily: "'JetBrains Mono', 'SF Mono', monospace", color: "#383828", whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: 420, overflow: "auto" }}>{prompt}</pre>
          </div>
        )}

        {/* Post-compile cards */}
        {built && prompt && machs.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            <div style={{ padding: "14px 16px", background: "#0A585808", borderRadius: 10, border: "1px solid #E8DCC8" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#0A5858", marginBottom: 6 }}>Quality check</div>
              <div style={{ fontSize: 11.5, color: "#707060", lineHeight: 1.6 }}>
                {machs.map(function(id) {
                  var m = activeMachines.find(function(x) { return x.id === id; });
                  if (!m) return null;
                  return (
                    <div key={id} style={{ marginBottom: 4 }}>
                      <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: m.color, marginRight: 4 }} />
                      <span style={{ fontWeight: 500 }}>{m.p}:</span> {m.quality}
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ padding: "14px 16px", background: "#E91E6306", borderRadius: 10, border: "1px solid #E8DCC8" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#E91E63", marginBottom: 6 }}>Post-render validation</div>
              <div style={{ fontSize: 11.5, color: "#707060", lineHeight: 1.6 }}>
                Cream bg · teal dominant · bronze hardware · RIGGG logo · glow in glass only · accent: {machs.map(function(id) { var m = activeMachines.find(function(x) { return x.id === id; }); return m ? m.p + ": " + m.colorName : ""; }).join(", ")}
              </div>
            </div>
          </div>
        )}

        <div style={{ height: 60 }} />
      </div>
    </div>
  );
}
