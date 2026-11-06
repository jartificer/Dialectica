/* =====================================================================
   SEMANTIC UNDERSTANDING (optional)
   A small sentence-embedding model (all-MiniLM-L6-v2, about 23 MB,
   run in the browser by transformers.js) turns the player's sentence
   into a vector and compares it with example sentences for each move
   and objection at the current node, and for each kind of remark
   (intents.js). That lets "doesn't water drown flames?" count as the
   same argument as "water puts out fire", with no keyword in common.

   The model only *understands*. It never writes anything: every reply
   still comes from the thinker's own lines and the grammar, so nothing
   it does can put words in a philosopher's mouth. The engine also keeps
   the last word: keyword stuffing is still caught first, a negated
   argument ("the source is NOT boundless") is never accepted, and an
   objection recognised this way costs no patience.

   If the model cannot load (offline, old browser, switched off), the
   game runs on the keyword parser alone, exactly as before.

   Example sentences for a move, best first:
     1. its own `says` list, if the data file has one
     2. the walkthrough line that makes this move
     3. the last hint of the node, for the walkthrough's move
     4. the move's keywords, as a short phrase
   ===================================================================== */
import { matchNeed, analyse, conceptsFor } from "./parser.js";
import { EXAMPLES } from "./intents.js";

/* Cosine similarity needed (the vectors are normalised). These are
   deliberately strict: a sentence the model is unsure about falls
   through to the keyword parser and the dialogue acts. Admin mode
   shows the scores, which is the place to tune them. */
export const THRESHOLDS = {
  move: 0.72,   // accept a move
  margin: 0.05, // …only if it beats every other move and objection here by this much
  trap: 0.70,   // answer an objection said in other words (free)
  near: 0.58,   // "you are circling something"
  act: 0.66     // recognise a kind of remark the rules missed
};

export const MODEL = {
  lib: "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.6",
  id: "Xenova/all-MiniLM-L6-v2",
  dtype: "q8",
  timeout: 4000 // ms to wait for one sentence before falling back to keywords
};

const LEAD = /^(?:point out|bring up|propose|suggest|ask(?: (?:him|her|them))?|say|argue|tell (?:him|her|them)|show(?: (?:him|her|them))?|note|remind (?:him|her|them)|mention|explain|insist|claim|admit|grant|offer|try|name|use|press|turn)\s+(?:that\s+)?/i;

function keywordPhrase(need, concepts) {
  return need.map(g => g.split("|").slice(0, 4).flatMap(a => {
    a = a.trim();
    if (a[0] === "@") return (concepts[a.slice(1)] || []).slice(0, 2);
    return [a];
  }).map(a => a.replace(/\*$/, "")).join(" or ")).join(", ");
}

/* Which move each walkthrough line makes: [{node, i, line}] */
export function walkthroughMoves(ph) {
  const concepts = conceptsFor(ph);
  const out = [];
  let node = ph.start;
  for (const line of ph.walkthrough || []) {
    const n = ph.nodes[node];
    if (!n) break;
    const U = analyse(line);
    const i = n.moves.findIndex(mv => matchNeed(mv.need, U, concepts).full);
    if (i < 0) break;
    out.push({ node, i, line });
    if (n.moves[i].to === "WIN") break;
    node = n.moves[i].to;
  }
  return out;
}

/* Example sentences for every move and objection: {nodeId: {moves:[[…]], traps:[[…]]}} */
export function anchorsFor(ph) {
  const concepts = conceptsFor(ph);
  const walk = walkthroughMoves(ph);
  const res = {};
  for (const [id, n] of Object.entries(ph.nodes)) {
    const lastHint = (n.hints || []).at(-1);
    res[id] = {
      moves: n.moves.map((mv, i) => {
        const texts = [...(mv.says || [])];
        for (const w of walk) if (w.node === id && w.i === i) {
          texts.push(w.line);
          if (lastHint) {
            const h = lastHint.split(/(?<=[.!?])\s+/).map(s => s.replace(LEAD, "")).filter(s => s.length > 12).join(" ");
            if (h) texts.push(h.charAt(0).toUpperCase() + h.slice(1));
          }
        }
        texts.push(keywordPhrase(mv.need, concepts));
        return texts;
      }),
      traps: (n.traps || []).map(tr => [...(tr.says || []), keywordPhrase(tr.need, concepts)])
    };
  }
  return res;
}

const dot = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; };
const best = (v, vecs) => vecs.reduce((m, w) => Math.max(m, dot(v, w)), -1);

/* `embed(texts)` → Promise of normalised vectors (arrays of numbers). */
export function createUnderstanding(embed) {
  const prepared = new Map(); // ph.id → Promise<{nodeId: {moves:[[vec]], traps:[[vec]]}}>
  let acts = null;

  async function embedGroups(groups) {
    const flat = groups.flat();
    const vecs = flat.length ? await embed(flat) : [];
    let k = 0;
    return groups.map(g => g.map(() => vecs[k++]));
  }

  function prepare(ph) {
    if (!prepared.has(ph.id)) {
      prepared.set(ph.id, (async () => {
        const anchors = anchorsFor(ph);
        const out = {};
        for (const [id, a] of Object.entries(anchors)) {
          out[id] = { moves: await embedGroups(a.moves), traps: await embedGroups(a.traps) };
        }
        return out;
      })());
      prepared.get(ph.id).catch(() => prepared.delete(ph.id));
    }
    if (!acts) {
      acts = (async () => {
        const names = Object.keys(EXAMPLES);
        const vecs = await embedGroups(names.map(n => EXAMPLES[n]));
        return names.map((name, i) => ({ name, vecs: vecs[i] }));
      })();
      acts.catch(() => { acts = null; });
    }
    return Promise.all([prepared.get(ph.id), acts]);
  }

  /* Scores for the current node. */
  async function understand(raw, ph, nodeId) {
    const [index, actList] = await prepare(ph);
    const [v] = await embed([String(raw).slice(0, 400)]);
    const n = index[nodeId];
    if (!n || !v) return null;
    let act = null;
    for (const a of actList) {
      const score = best(v, a.vecs);
      if (!act || score > act.score) act = { name: a.name, score };
    }
    return {
      node: nodeId,
      moves: n.moves.map(vecs => best(v, vecs)),
      traps: n.traps.map(vecs => best(v, vecs)),
      act
    };
  }

  return { prepare, understand };
}

/* ---------- the browser model ---------- */
let loading = null;
export function loadBrowserEmbedder({ onProgress = () => {} } = {}) {
  if (loading) return loading;
  loading = (async () => {
    const lib = await import(/* webpackIgnore: true */ MODEL.lib + "/dist/transformers.min.js");
    lib.env.allowLocalModels = false;
    const files = new Map();
    const extractor = await lib.pipeline("feature-extraction", MODEL.id, {
      dtype: MODEL.dtype,
      progress_callback: p => {
        if (p.status === "progress" && p.total) {
          files.set(p.file, [p.loaded, p.total]);
          let a = 0, b = 0; files.forEach(([l, t]) => { a += l; b += t; });
          onProgress(b ? a / b : 0);
        }
      }
    });
    return async texts => {
      const t = await extractor(texts, { pooling: "mean", normalize: true });
      return t.tolist();
    };
  })();
  loading.catch(() => { loading = null; });
  return loading;
}

/* resolve to null instead of waiting forever */
export function withTimeout(promise, ms) {
  return Promise.race([promise, new Promise(r => setTimeout(() => r(null), ms))]).catch(() => null);
}
