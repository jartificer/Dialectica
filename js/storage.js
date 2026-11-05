/* =====================================================================
   STORAGE
   Progress and theme live in localStorage. Every access is guarded:
   private windows and blocked storage simply mean nothing is remembered.
   ===================================================================== */
const SAVE_KEY = "dialectica.v1";
const THEME_KEY = "dialectica.theme";
const ADMIN_KEY = "dialectica.admin";

function store() {
  try { return globalThis.localStorage || null; } catch (e) { return null; }
}
function read(key) {
  try { return store()?.getItem(key) ?? null; } catch (e) { return null; }
}
function write(key, value) {
  try { store()?.setItem(key, value); } catch (e) { /* storage unavailable */ }
}

let save = { done: {}, unlocked: false };

export function loadProgress() {
  try {
    const s = JSON.parse(read(SAVE_KEY) || "null");
    if (s && typeof s === "object") save = { done: {}, unlocked: false, ...s, done: { ...(s.done || {}) } };
  } catch (e) { /* corrupt save: start fresh */ }
  return save;
}

export const progress = () => save;
export const isDone = id => !!save.done[id];
export const bestTurns = id => save.done[id]?.turns ?? null;

export function recordWin(id, turns) {
  const prev = save.done[id];
  save.done[id] = { turns: prev ? Math.min(prev.turns, turns) : turns };
  write(SAVE_KEY, JSON.stringify(save));
}

export function unlockAll() { save.unlocked = true; write(SAVE_KEY, JSON.stringify(save)); }
export function resetProgress() { save = { done: {}, unlocked: false }; write(SAVE_KEY, JSON.stringify(save)); }

export const loadTheme = () => read(THEME_KEY);
export const saveTheme = t => write(THEME_KEY, t);

/* Admin mode: every thinker open, debug tools on, and wins are not recorded,
   so trying a later thinker never touches real progress. */
export const loadAdmin = () => read(ADMIN_KEY) === "1";
export const saveAdmin = on => write(ADMIN_KEY, on ? "1" : "0");
