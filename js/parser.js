/* =====================================================================
   PARSER
   Turns the player's free text into an "utterance" the engine can test
   against a philosopher's argument tree.

   Pattern language (used in `need` groups of moves and traps):
     "a|b|c"      any alternative may match
     "word"       whole word (plural -s / -ies also accepted, one typo tolerated
                  for words of 6+ letters)
     "pre*"       any word starting with "pre"
     "two words"  consecutive words inside one clause ("two word*" also works)
     "@concept"   every entry of a concept list (see concepts.js)

   What it does beyond plain keyword spotting:
     • contractions are expanded (can't → can not), accents stripped
     • words carry their clause, so phrases don't straddle punctuation
     • negation scope: "it is not boundless" does not count as "boundless",
       unless the move itself is about negation
     • proximity: all groups of a move must hit within one stretch of text
     • keyword-stuffing detection (see detectStuffing)
   ===================================================================== */
import { CONCEPTS } from "./concepts.js";

export const NEGATORS = new Set(["not", "no", "never", "neither", "nor", "without", "nothing", "none", "hardly", "barely", "impossible"]);

/* Structural words: a real sentence is held together by these. */
export const GLUE_WORDS = new Set((
  "a an the of to in on at by for with from into onto as is are was were be been being am it its this that " +
  "and or but if then so because since while though do does did can could will would should must have has had " +
  "i you he she we they me him her us them my your his our their what which who how why when where"
).split(/\s+/));

const STRONG_NEG = new Set(["not", "no", "never", "neither", "nor"]);
const SCOPE_BREAK = new Set(["but", "when", "because", "which", "if", "although", "though", "while", "since", "whereas", "yet", "so", "than", "rather", "instead", "and", "or"]);

export const FUNCTION_WORDS = new Set((
  "a an the of to in on at by for with from into onto upon as is are was were be been being am " +
  "it its this that these those there here and or but nor so if then than because since while though although " +
  "not no never do does did done can could will would shall should may might must have has had having " +
  "i you he she we they me him her us them my your his our their mine yours its " +
  "what which who whom whose when where why how all any some each every very just only also too " +
  "more most less such own one ones about up out over under again once even still yet both either neither " +
  "let lets whether really quite rather"
).split(/\s+/));

/* Words that never make a good echo of the player's argument. */
const ECHO_STOP = new Set((
  "about above after again against because been before being below between both could does doing down during " +
  "each from further have having here hers herself himself into itself just more most myself once only other " +
  "ought ours ourselves over same should some such than that their theirs them themselves then there these they " +
  "this those through under until very what when where which while whom with would your yours yourself yourselves " +
  "think believe really maybe perhaps actually surely things thing something anything everything nothing someone " +
  "people world claim argue right wrong agree still might must also even though whether point mean means saying " +
  "would could should because since basically literally simply clearly obviously exactly certainly definitely " +
  "therefore however anyway"
).split(/\s+/));

const NOSPACE_CONTRACTIONS = {
  dont: "do not", doesnt: "does not", didnt: "did not", isnt: "is not", arent: "are not", wasnt: "was not",
  werent: "were not", cant: "can not", wouldnt: "would not", couldnt: "could not", shouldnt: "should not",
  havent: "have not", hasnt: "has not", hadnt: "had not", wont: "will not", aint: "is not", cannot: "can not",
  thats: "that is", whats: "what is", youre: "you are", theyre: "they are"
};

/* Lower-case, strip accents, unify quotes, expand contractions.
   Keeps clause punctuation so we can split on it afterwards. */
export function normalise(s) {
  return String(s)
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[‘’`´]/g, "'").replace(/[“”]/g, '"')
    .replace(/\bcan't\b/g, "can not").replace(/\bwon't\b/g, "will not").replace(/\bshan't\b/g, "shall not")
    .replace(/\b([a-z]+)n't\b/g, "$1 not")
    .replace(/\b(it|that|what|he|she|there|here|who|where|how)'s\b/g, "$1 is")
    .replace(/\blet's\b/g, "let us")
    .replace(/\b([a-z]+)'re\b/g, "$1 are").replace(/\b([a-z]+)'m\b/g, "$1 am")
    .replace(/\b([a-z]+)'ve\b/g, "$1 have").replace(/\b([a-z]+)'ll\b/g, "$1 will")
    .replace(/\b([a-z]+)'d\b/g, "$1 would").replace(/\b([a-z]+)'s\b/g, "$1")
    .replace(/\b[a-z]+\b/g, w => NOSPACE_CONTRACTIONS[w] || w);
}

/* Split normalised text into clauses, then into word tokens. */
function tokenise(raw) {
  const clauses = normalise(raw).split(/[.,;:!?…()\[\]{}"«»—–]+|\s-\s|\s--\s/);
  const toks = [];
  clauses.forEach((cl, c) => {
    cl.replace(/-/g, " ").replace(/[^a-z0-9' ]/g, " ").split(/\s+/).forEach(w => {
      w = w.replace(/^'+|'+$/g, "");
      if (w) toks.push({ w, c, i: toks.length, neg: false });
    });
  });
  // negation scope: "not/no/never" reach up to three words ahead, "without/nothing…" only the next,
  // and a conjunction ("but", "when", "because"…) or the end of the clause closes the scope
  toks.forEach((t, i) => {
    for (let j = i - 1; j >= 0 && j >= i - 3; j--) {
      const w = toks[j].w;
      if (toks[j].c !== t.c || SCOPE_BREAK.has(w)) break;
      if (NEGATORS.has(w) && (STRONG_NEG.has(w) || j === i - 1)) { t.neg = true; break; }
    }
  });
  return toks;
}

export function singular(t) {
  if (t.length > 4 && t.endsWith("ies")) return t.slice(0, -3) + "y";
  if (t.length > 3 && t.endsWith("s") && !t.endsWith("ss") && !t.endsWith("us") && !t.endsWith("is")) return t.slice(0, -1);
  return t;
}

/* Optimal-string-alignment distance, bounded: returns early once > max. */
export function editDistance(a, b, max = 1) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const d = [];
  for (let i = 0; i <= a.length; i++) { d[i] = [i]; }
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, d[i - 2][j - 2] + 1);
      d[i][j] = v; if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
  }
  return d[a.length][b.length];
}

/* ---------- compiled patterns ---------- */
const compiled = new Map();

function compileAlt(p, concepts, seen) {
  p = p.trim();
  if (!p) return [];
  if (p[0] === "@") {
    const name = p.slice(1);
    if (seen.has(name)) return [];
    const list = concepts[name];
    if (!list) { console.warn("[dialectica] unknown concept @" + name); return []; }
    const next = new Set(seen); next.add(name);
    return list.flatMap(q => compileAlt(q, concepts, next));
  }
  const star = p.endsWith("*");
  const words = normalise(star ? p.slice(0, -1) : p).replace(/-/g, " ").replace(/[^a-z0-9' ]/g, " ").split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return [{ words, star, src: p }];
}

/* A group "a|b|@c" compiles to a list of alternatives plus a flag telling
   whether the group itself is about negation (then negation scope is ignored). */
export function compileGroup(group, concepts = CONCEPTS) {
  const key = group + "\u0000" + (concepts === CONCEPTS ? "" : Object.keys(concepts).join(","));
  let g = compiled.get(key);
  if (g) return g;
  const alts = group.split("|").flatMap(p => compileAlt(p, concepts, new Set()));
  g = { alts, hasNeg: alts.some(a => a.words.some(w => NEGATORS.has(w))) };
  compiled.set(key, g);
  return g;
}

function wordMatches(tok, w, star, fuzzy) {
  if (star) {
    if (tok.startsWith(w)) return true;
    return fuzzy && w.length >= 7 && tok.length >= w.length && tok[0] === w[0] && editDistance(tok.slice(0, w.length), w) <= 1;
  }
  if (tok === w || singular(tok) === w) return true;
  return fuzzy && w.length >= 6 && tok.length >= 6 && tok[0] === w[0] && editDistance(tok, w) <= 1;
}

/* Every place in the utterance where the group matches:
   [{start, len, words, neg}] */
export function findGroup(group, U, concepts) {
  const g = typeof group === "string" ? compileGroup(group, concepts) : group;
  const T = U.toks, hits = [];
  for (const alt of g.alts) {
    const n = alt.words.length;
    for (let i = 0; i + n <= T.length; i++) {
      let ok = true;
      for (let k = 0; k < n && ok; k++) {
        const tok = T[i + k];
        if (k > 0 && tok.c !== T[i].c) { ok = false; break; }
        const last = k === n - 1;
        ok = wordMatches(tok.w, alt.words[k], last && alt.star, n === 1);
      }
      if (ok) hits.push({ start: i, len: n, words: T.slice(i, i + n).map(t => t.w).join(" "), neg: T[i].neg });
    }
  }
  return { hits, hasNeg: g.hasNeg };
}

export const PROXIMITY = 25; // tokens: all groups of a move must fall within this window

/* Test a whole `need` list. Returns
   { full, score, frac, contentFrac, words:[matched content words], hits } */
export function matchNeed(need, U, concepts) {
  const groups = need.map(g => findGroup(g, U, concepts));
  const negAware = !groups.some(g => g.hasNeg);
  const usable = groups.map(g => negAware ? g.hits.filter(h => !h.neg) : g.hits);
  const score = usable.filter(h => h.length).length;
  const isContent = h => h.words.split(" ").some(w => !FUNCTION_WORDS.has(w));
  // groups hit by a real content word, not just "it" or "not"
  const contentScore = usable.filter(h => h.some(isContent)).length;
  const words = usable.flatMap(h => { const c = h.find(isContent); return c ? [c.words] : []; });
  let full = score === need.length;
  if (full && need.length > 1) full = withinWindow(usable, PROXIMITY);
  return { full, score, frac: need.length ? score / need.length : 0, contentFrac: need.length ? contentScore / need.length : 0, words, hits: usable };
}

function withinWindow(lists, W) {
  // classic smallest-range over k sorted lists
  const pts = [];
  lists.forEach((l, gi) => l.forEach(h => pts.push({ p: h.start, gi })));
  pts.sort((a, b) => a.p - b.p);
  const k = lists.length, count = new Array(k).fill(0);
  let have = 0, lo = 0;
  for (let hi = 0; hi < pts.length; hi++) {
    if (count[pts[hi].gi]++ === 0) have++;
    while (have === k) {
      if (pts[hi].p - pts[lo].p <= W) return true;
      if (--count[pts[lo].gi] === 0) have--;
      lo++;
    }
  }
  return false;
}

/* ---------- the utterance ---------- */
export function analyse(raw) {
  const toks = tokenise(raw);
  const fn = toks.filter(t => FUNCTION_WORDS.has(t.w)).length;
  const glue = toks.filter(t => GLUE_WORDS.has(t.w)).length;
  const trimmed = String(raw).trim();
  return {
    raw: trimmed,
    toks,
    words: toks.length,
    text: " " + toks.map(t => t.w).join(" ") + " ",
    fnRatio: toks.length ? fn / toks.length : 0,
    glueRatio: toks.length ? glue / toks.length : 0,
    content: toks.length - fn,
    isQuestion: /\?\s*$/.test(trimmed) || /\?/.test(trimmed) && /^\s*(what|why|how|who|is|are|do|does|can|could|would|will|should|did|isn|aren|tell)\b/i.test(trimmed),
    frag: extractFrag(trimmed),
    echo: extractEcho(trimmed)
  };
}

/* ---------- keyword stuffing ----------
   A real argument uses a handful of the philosopher's key ideas, joined
   by ordinary connecting words. A stuffed message is a list of loaded
   words, or hits many of the current node's moves and traps at once. */
export function conceptsFor(ph) {
  if (!ph.concepts) return CONCEPTS;
  if (!ph.__concepts) Object.defineProperty(ph, "__concepts", { value: { ...CONCEPTS, ...ph.concepts }, enumerable: false });
  return ph.__concepts;
}

export function detectStuffing(U, ph, node) {
  const concepts = conceptsFor(ph);
  // the content words an item matched (function words like "it" or "not" don't count)
  const covered = new Set(); // tokens inside multi-word keyword phrases ("what is not"), glue included
  const footprint = it => {
    const m = matchNeed(it.need, U, concepts);
    m.hits.forEach(hs => hs.forEach(h => { if (h.len > 1) for (let k = h.start; k < h.start + h.len; k++) covered.add(k); }));
    if (!m.full) return null;
    const f = new Set();
    m.hits.forEach(hs => hs.forEach(h => { for (let k = h.start; k < h.start + h.len; k++) if (!FUNCTION_WORDS.has(U.toks[k].w)) f.add(k); }));
    if (!f.size) m.hits.forEach(hs => hs.forEach(h => { for (let k = h.start; k < h.start + h.len; k++) f.add(k); }));
    return f;
  };
  // how many matched items use separate words: overlapping vocabulary counts once
  const distinct = prints => {
    const used = new Set(); let n = 0;
    prints.sort((a, b) => a.size - b.size).forEach(f => {
      if ([...f].some(k => used.has(k))) return;
      f.forEach(k => used.add(k)); n++;
    });
    return n;
  };
  const here = [...(node.moves || []), ...(node.traps || [])].map(footprint).filter(f => f && f.size);
  const nodeHits = distinct(here);
  const seen = new Map();
  for (const [id, n] of Object.entries(ph.nodes)) {
    for (const it of [...(n.moves || []), ...(n.traps || [])]) {
      const key = it.need.join("&");
      if (seen.has(key)) continue;
      const f = footprint(it);
      if (f && f.size) seen.set(key, f);
    }
  }
  const treeHits = distinct([...seen.values()]);
  // a list of keywords has no grammar of its own: glue words only inside quoted phrases
  const freeGlue = U.toks.filter((t, k) => GLUE_WORDS.has(t.w) && !covered.has(k)).length;
  const listy = U.words >= 6 && freeGlue / U.words < 0.12;
  const stuffed = (listy && treeHits >= 2) || nodeHits >= 3 || treeHits >= 6;
  return { stuffed, nodeHits, treeHits, listy };
}

/* ---------- echoing the player back ---------- */
const NOUNISH = /(tion|sion|ness|ity|ism|ment|ence|ance|ship|hood|dom|ure|ology)$/;
export function extractEcho(raw) {
  const words = String(raw).replace(/[^A-Za-zÀ-ÿ'\- ]/g, " ").split(/\s+/)
    .map(w => w.replace(/^['-]+|['-]+$/g, ""))
    .filter(w => w.length >= 5 && !ECHO_STOP.has(w.toLowerCase()) && !FUNCTION_WORDS.has(w.toLowerCase()) && !/'/.test(w));
  if (!words.length) return null;
  let best = null, bestScore = -Infinity;
  words.forEach((w, i) => {
    const lw = w.toLowerCase();
    let s = Math.min(lw.length, 10);
    if (NOUNISH.test(lw)) s += 3;
    if (/ly$/.test(lw)) s -= 4;
    if (/(ing|ed)$/.test(lw)) s -= 2;
    s -= i * 0.05; // earlier words win ties
    if (s > bestScore) { best = lw; bestScore = s; }
  });
  return best;
}

const PROPER = new Set("god zeus apollo poseidon hera plato socrates aristotle thales heraclitus parmenides protagoras epicurus descartes hume kant nietzsche darwin christ jesus berkeley locke anselm augustine marcus sartre beauvoir athens rome delphi logos".split(" "));
const VERBISH = new Set("are were have had can could will would should must might may do did does think say said claim claimed believe believed know knew mean meant hold held admit admitted want wanted see saw just also never always really still yourself said".split(" "));
const AFTER_YOU_SUBJECT = new Set(["", "that", "and", "but", "because", "if", "when", "so", "as", "since", "unless", "though", "although", "then", "or"]);

/* Turn "I think you are wrong about water" into "I am wrong about water"
   so it can be read back in the philosopher's mouth. */
export function swapPerson(text) {
  const ws = text.split(/\s+/);
  const out = ws.map((w, i) => {
    const m = w.match(/^([^A-Za-z']*)([A-Za-z']+)([^A-Za-z']*)$/);
    if (!m) return w;
    const [, pre, word, post] = m, lw = word.toLowerCase().replace(/’/g, "'");
    const prev = i > 0 ? ws[i - 1].toLowerCase().replace(/[^a-z']/g, "") : "";
    const next = i + 1 < ws.length ? ws[i + 1].toLowerCase().replace(/[^a-z']/g, "") : "";
    let r;
    switch (lw) {
      case "i": r = "you"; break;
      case "me": r = "you"; break;
      case "my": r = "your"; break;
      case "mine": r = "yours"; break;
      case "myself": r = "yourself"; break;
      case "i'm": r = "you're"; break;
      case "i've": r = "you've"; break;
      case "i'd": r = "you'd"; break;
      case "i'll": r = "you'll"; break;
      case "am": r = prev === "i" ? "are" : word; break;
      case "was": r = prev === "i" ? "were" : prev === "you" ? "was" : word; break;
      case "you": r = (VERBISH.has(next) || AFTER_YOU_SUBJECT.has(prev) || i === 0) ? "I" : "me"; break;
      case "your": r = "my"; break;
      case "yours": r = "mine"; break;
      case "yourself": r = "myself"; break;
      case "you're": r = "I'm"; break;
      case "you've": r = "I've"; break;
      case "you'd": r = "I'd"; break;
      case "you'll": r = "I'll"; break;
      default: r = word;
    }
    return pre + r + post;
  });
  return out.join(" ")
    .replace(/\bI are\b/g, "I am").replace(/\bI were\b/g, "I was")
    .replace(/\byou am\b/g, "you are").replace(/\byou was\b/g, "you were")
    .replace(/\bare I\b/g, "am I").replace(/\bwere I\b/g, "was I")
    .replace(/\bI is\b/g, "I am");
}

const IMPERATIVE = /^(?:consider|imagine|suppose|think about|look at|take|remember|tell|ask|answer|explain|picture|what|why|how)\b/i;
const LEAD_IN = /^(?:(?:well|but|so|no|yes|look|listen|okay|ok|now|and|then|still|honestly|frankly|really|actually|come on)[,!]?\s+)*(?:i (?:think|believe|say|claim|would say|suggest|argue|feel|reckon|mean|guess|suspect|maintain|contend)|i'd say|it seems(?: to me)?|surely|perhaps|maybe|clearly|obviously|of course|the point is|my point is)\s*,?\s*(?:that\s+)?/i;

export function extractFrag(raw) {
  const sentences = String(raw).replace(/[*]/g, "").replace(/[‘’]/g, "'").split(/(?<=[.!?])\s+/);
  for (let s of sentences) {
    s = s.trim();
    if (!s || /\?$/.test(s)) continue;
    s = s.replace(/[.!;:]+$/, "");
    const led = LEAD_IN.test(s);
    let f = s.replace(LEAD_IN, "");
    if (IMPERATIVE.test(f)) continue;
    const n = f.split(/\s+/).length;
    if (!led && n > 12) continue;
    if (n < 3 || f.length > 90) continue;
    f = swapPerson(f);
    const first = f.split(/\s+/)[0];
    if (!/^I\b/.test(f) && !PROPER.has(first.toLowerCase().replace(/[^a-z]/g, ""))) f = f.charAt(0).toLowerCase() + f.slice(1);
    return f;
  }
  return null;
}
