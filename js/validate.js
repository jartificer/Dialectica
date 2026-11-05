/* =====================================================================
   DATA VALIDATION
   Catches the usual mistakes in a philosopher file before they turn into
   a dead end in the game: missing fields, moves that point nowhere,
   nodes you can never reach, or nodes from which there is no way to win.
   ===================================================================== */
const REQUIRED = ["id", "name", "dates", "born", "era", "place", "diff", "patience", "glyph", "color", "core", "target", "bio", "voice", "start", "nodes", "win", "lose"];
const VOICE_REQUIRED = ["addr", "oath", "gest", "core", "claim"];

export function validatePhilosopher(ph, fileId) {
  const e = [];
  if (!ph || typeof ph !== "object") return ["file has no default export"];
  for (const k of REQUIRED) if (ph[k] === undefined) e.push("missing field `" + k + "`");
  if (e.length) return e;
  if (fileId && ph.id !== fileId) e.push("id `" + ph.id + "` does not match file name `" + fileId + ".js`");
  if (typeof ph.born !== "number") e.push("`born` must be a number (negative for BCE)");
  if (!(ph.diff >= 1 && ph.diff <= 5)) e.push("`diff` must be 1–5");
  for (const k of VOICE_REQUIRED) if (!Array.isArray(ph.voice[k]) || !ph.voice[k].length) e.push("voice." + k + " must be a non-empty list");
  if (!ph.nodes[ph.start]) e.push("start node `" + ph.start + "` does not exist");
  if (!ph.nodes[ph.start]?.enter) e.push("start node needs an `enter` line");

  const ids = Object.keys(ph.nodes);
  for (const id of ids) {
    const n = ph.nodes[id];
    if (!n.stance) e.push("node " + id + ": missing `stance`");
    if (!Array.isArray(n.hints) || !n.hints.length) e.push("node " + id + ": needs at least one hint");
    if (!Array.isArray(n.moves) || !n.moves.length) e.push("node " + id + ": needs at least one move");
    (n.moves || []).forEach((m, i) => {
      if (!Array.isArray(m.need) || !m.need.length) e.push("node " + id + " move " + i + ": `need` must be a non-empty list");
      if (m.to !== "WIN" && !ph.nodes[m.to]) e.push("node " + id + " move " + i + ": target `" + m.to + "` does not exist");
    });
    (n.traps || []).forEach((t, i) => {
      if (!Array.isArray(t.need) || !t.need.length) e.push("node " + id + " trap " + i + ": `need` must be a non-empty list");
      if (!t.reply) e.push("node " + id + " trap " + i + ": missing `reply`");
    });
  }
  if (e.length) return e;

  // reachability from start, and a path to WIN from every reachable node
  const seen = new Set([ph.start]), queue = [ph.start];
  while (queue.length) {
    const id = queue.shift();
    for (const m of ph.nodes[id].moves) if (m.to !== "WIN" && !seen.has(m.to)) { seen.add(m.to); queue.push(m.to); }
  }
  for (const id of ids) if (!seen.has(id)) e.push("node " + id + " can never be reached");
  const wins = new Set();
  let changed = true;
  while (changed) {
    changed = false;
    for (const id of ids) {
      if (wins.has(id)) continue;
      if (ph.nodes[id].moves.some(m => m.to === "WIN" || wins.has(m.to))) { wins.add(id); changed = true; }
    }
  }
  for (const id of seen) if (!wins.has(id)) e.push("node " + id + " has no route to WIN");
  return e;
}
