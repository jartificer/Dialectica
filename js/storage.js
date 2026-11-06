/* =====================================================================
   STORAGE
   Progress and theme live in localStorage. Every access is guarded:
   private windows and blocked storage simply mean nothing is remembered.
   ===================================================================== */
const SAVE_KEY = "dialectica.v1";
const THEME_KEY = "dialectica.theme";
const ADMIN_KEY = "dialectica.admin";
const SMART_KEY = "dialectica.smart";

function store() {
  try { return globalThis.localStorage || null; } catch (e) { return null; }
}
function read(key) {
  try { return store()?.getItem(key) ?? null; } catch (e) { return null; }
}
function write(key, value) {
  try { store()?.setItem(key, value); } catch (e) { /* storage unavailable */ }
}

/* ---------------------------------------------------------------------
   PROGRESS, AND KEEPING IT VALID ACROSS VERSIONS
   Wins are keyed by philosopher id, never by position, so adding thinkers
   never loses a win. Ids must never be renamed or removed.

   What is *open* depends on the order of the timeline, so inserting new
   thinkers could re-lock someone a player had already reached. To prevent
   that, the save remembers every thinker that has been open (`opened`),
   and anything ever opened stays open. Saves from before `opened` existed
   are migrated by replaying the old rule against the old timeline.
   --------------------------------------------------------------------- */

/* The timeline as it was before the save remembered `opened` (version 1). */
export const LEGACY_ORDER = [
  "thales", "heraclitus", "parmenides", "protagoras", "socrates", "plato", "aristotle", "epicurus",
  "marcus", "augustine", "anselm", "descartes", "berkeley", "hume", "kant", "nietzsche", "sartre"
];
export const SAVE_VERSION = 2;

const fresh = () => ({ version: SAVE_VERSION, done: {}, unlocked: false, opened: {} });
let save = fresh();

/* Is the i-th thinker of `order` open for this save? Pure, so tests can call it.
   Open if: first; already opened once; the previous one is convinced; or it,
   or anyone after it, is convinced (a returning player is never locked out). */
export function isUnlockedAt(order, i, s) {
  if (s.unlocked || i === 0) return true;
  if (s.opened?.[order[i]]) return true;
  if (s.done[order[i - 1]]) return true;
  return order.slice(i).some(id => s.done[id]);
}

/* Bring any stored save up to the current shape. Never drops a win. */
export function migrate(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return fresh();
  const done = {};
  for (const [id, v] of Object.entries(raw.done && typeof raw.done === "object" ? raw.done : {})) {
    const turns = Number(v?.turns);
    done[id] = { turns: Number.isFinite(turns) && turns > 0 ? turns : 1 };
  }
  const s = { ...raw, version: SAVE_VERSION, done, unlocked: !!raw.unlocked, opened: {} };
  if (raw.opened && typeof raw.opened === "object") {
    for (const id of Object.keys(raw.opened)) if (raw.opened[id]) s.opened[id] = true;
  } else {
    // version 1: rebuild what was open on the old timeline
    LEGACY_ORDER.forEach((id, i) => { if (isUnlockedAt(LEGACY_ORDER, i, { done, opened: {} })) s.opened[id] = true; });
  }
  return s;
}

export function loadProgress() {
  let raw = null;
  try { raw = JSON.parse(read(SAVE_KEY) || "null"); } catch (e) { /* corrupt save: start fresh */ }
  save = migrate(raw);
  if (raw && raw.version !== SAVE_VERSION) persist();
  return save;
}

function persist() { write(SAVE_KEY, JSON.stringify(save)); }

export const progress = () => save;
export const isDone = id => !!save.done[id];
export const bestTurns = id => save.done[id]?.turns ?? null;

export function recordWin(id, turns) {
  const prev = save.done[id];
  save.done[id] = { turns: prev ? Math.min(prev.turns, turns) : turns };
  persist();
}

/* Remember that these thinkers are open, so later versions keep them open. */
export function markOpened(ids) {
  const add = ids.filter(id => !save.opened[id]);
  if (!add.length) return;
  add.forEach(id => { save.opened[id] = true; });
  persist();
}

export function unlockAll() { save.unlocked = true; persist(); }
export function resetProgress() { save = fresh(); persist(); }

export const loadTheme = () => read(THEME_KEY);
export const saveTheme = t => write(THEME_KEY, t);

/* Admin mode: every thinker open, debug tools on, and wins are not recorded,
   so trying a later thinker never touches real progress. */
export const loadAdmin = () => read(ADMIN_KEY) === "1";
export const saveAdmin = on => write(ADMIN_KEY, on ? "1" : "0");

/* Smart understanding (semantic.js): on unless the player switched it off.
   A separate key, so it never touches saved progress. */
export const loadSmart = () => read(SMART_KEY) !== "0";
export const saveSmart = on => write(SMART_KEY, on ? "1" : "0");
