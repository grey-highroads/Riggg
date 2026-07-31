import { useState, useCallback, useMemo } from "react";

// ─── Config & Data ─────────────────────────────────────────────────
const STYLE = `Pixar-quality 3D illustration render, high detail, warm and inviting. Slightly elevated isometric 3/4 perspective, camera approximately 30 degrees above horizontal. Clean warm cream background (#FAF5EF), no environment, no sky, no floor extending beyond the object's base — the subject sits on its own base like a diorama on a stage.

Dominant color palette: teal powder-coated metal (#0A5858) and aged bronze/brass hardware with warm patina. Materials include matte teal metal with visible rivets, aged brass with subtle patina, translucent glass with inner volumetric glow, and leather/fabric with visible texture.

Warm key light from upper-left, soft fill from opposite side, subtle rim light on top edges. Rounded edges on all surfaces — nothing sharp. High surface detail density (gauges, dials, rivets, pipe fittings) but clean overall composition with generous negative space.

Small organic details for warmth: potted succulents, stacked papers, wooden elements.`;

const NEG = `Do not include: chrome or silver metal, neon lights, digital screens, holographic displays, circuit board patterns, dark or moody lighting, sky or horizon, environmental backgrounds, floor tiles or wall textures, sharp edges, low-poly geometry, flat shading, cartoon outlines, text or words rendered in the image.`;

const TYPES = [
  { id: "blog-hero", label: "Blog Post Hero", ratio: "16:9", desc: "Wide banner for article headers", comp: "Wide composition, subject centered 50-60% width, negative space for text zones." },
  { id: "feature-hero", label: "Feature Page Hero", ratio: "16:9", desc: "Primary 5P feature illustration", comp: "Machine + gnome as subjects. Machine 65-75% width, gnome at operating position." },
  { id: "social-sq", label: "Social Square", ratio: "1:1", desc: "Instagram / social", comp: "Tight center crop. Glass chamber + gnome upper body, or single hero pose." },
  { id: "social-story", label: "Social Story", ratio: "9:16", desc: "Story / Reel", comp: "Vertical: machine upper, gnome lower. Or single gnome full-body centered." },
  { id: "card", label: "Card Thumbnail", ratio: "4:3", desc: "Link previews, embed cards", comp: "Single focal element. One machine detail, gnome portrait, or key prop. Legible at 300px." },
  { id: "slide", label: "Slide Illustration", ratio: "16:9", desc: "Deck art with text space", comp: "Subject right 40%, left 60% clean cream for text." },
  { id: "email", label: "Email Banner", ratio: "3:1", desc: "Newsletter header", comp: "Ultra-wide band. Conveyor detail, machine tops, or gnome upper bodies." },
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

// ─── App ───────────────────────────────────────────────────────────
export default function RigggPromptBuilder() {
  const [assetType, setAssetType] = useState("");
  const [machs, setMachs] = useState([]);
  const [chars, setChars] = useState([]);
  const [envs, setEnvs] = useState([]);
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [built, setBuilt] = useState(false);
  const [copied, setCopied] = useState(false);

  function toggleList(list, setList, id) {
    if (list.includes(id)) {
      setList(list.filter(function(x) { return x !== id; }));
    } else {
      setList(list.concat([id]));
    }
  }

  var suggested = [];
  machs.forEach(function(id) {
    var m = MACHINES.find(function(x) { return x.id === id; });
    if (m && m.gnome) suggested.push(m.gnome);
  });

  var ready = assetType && (machs.length > 0 || chars.length > 0 || envs.length > 0);
  var prompt = ready ? compile(assetType, machs, chars, envs, topic, notes) : "";
  var refs = getRefs(machs, chars, envs);
  var wordCount = prompt ? prompt.split(/\s+/).filter(Boolean).length : 0;

  function doCopy() {
    navigator.clipboard.writeText(prompt).then(function() {
      setCopied(true);
      setTimeout(function() { setCopied(false); }, 2000);
    });
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

        {/* Sync status */}
        <div style={{ padding: "16px 0 0" }}>
          <div style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid #E8DCC8", background: "#FAFAFA" }}>
            <div style={{ fontSize: 12.5, color: "#707060" }}>
              <span style={{ fontWeight: 600, color: "#0A5858" }}>Brand system loaded</span> — 5 machines · 5 characters · 2 environments.
              <span style={{ color: "#B0A898" }}> Source: <code style={{ fontSize: 11 }}>grey-highroads/Riggg</code></span>
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
            {MACHINES.map(function(m) {
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
            {CHARS.map(function(c) {
              var sel = chars.includes(c.id);
              var m = MACHINES.find(function(x) { return x.id === c.machine; });
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
            {ENVS.map(function(e) {
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

        {/* Compile */}
        <div style={{ display: "flex", gap: 10, padding: "24px 0 16px" }}>
          <button onClick={function() { setBuilt(true); }} disabled={!ready} style={{ padding: "12px 24px", fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", background: ready ? "#0A5858" : "#B0A898", color: "#FAF5EF", border: "none", borderRadius: 8, cursor: ready ? "pointer" : "not-allowed" }}>Compile Prompt</button>
          {(assetType || machs.length > 0) && <button onClick={reset} style={{ padding: "12px 18px", fontSize: 13, fontFamily: "'DM Sans', sans-serif", background: "transparent", color: "#707060", border: "1px solid #E8DCC8", borderRadius: 8, cursor: "pointer" }}>Reset</button>}
        </div>

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
                <span style={{ fontSize: 11, color: "#707060", marginLeft: 10 }}>{wordCount} words</span>
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
                  var m = MACHINES.find(function(x) { return x.id === id; });
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
                Cream bg · teal dominant · bronze hardware · RIGGG logo · glow in glass only · accent: {machs.map(function(id) { var m = MACHINES.find(function(x) { return x.id === id; }); return m ? m.p + ": " + m.colorName : ""; }).join(", ")}
              </div>
            </div>
          </div>
        )}

        <div style={{ height: 60 }} />
      </div>
    </div>
  );
}
