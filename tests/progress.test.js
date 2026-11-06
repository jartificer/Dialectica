import { test } from "node:test";
import assert from "node:assert/strict";
import manifest from "../philosophers/index.js";
import { loadAll } from "./helpers.js";

/* a fake localStorage, so the real load/save code runs */
const disk = new Map();
globalThis.localStorage = {
  getItem: k => (disk.has(k) ? disk.get(k) : null),
  setItem: (k, v) => disk.set(k, String(v)),
  removeItem: k => disk.delete(k)
};
const store = await import("../js/storage.js");
const { LEGACY_ORDER, V2_ORDER, V3_ORDER, isUnlockedAt, migrate } = store;

const order = (await loadAll()).sort((a, b) => a.born - b.born).map(p => p.id);
const openIds = s => order.filter((id, i) => isUnlockedAt(order, i, s));
const legacyOpen = done => LEGACY_ORDER.filter((id, i) => isUnlockedAt(LEGACY_ORDER, i, { done, opened: {} }));
const v2Open = (done, opened = {}) => V2_ORDER.filter((id, i) => isUnlockedAt(V2_ORDER, i, { done, opened }));
const wins = ids => Object.fromEntries(ids.map((id, n) => [id, { turns: n + 3 }]));

test("no philosopher id from an older version has been renamed or removed", () => {
  for (const id of [...LEGACY_ORDER, ...V2_ORDER, ...V3_ORDER]) assert.ok(manifest.includes(id), id + " is missing: old saves would lose that win");
});

test("an old save keeps every win and best score", () => {
  const done = wins(LEGACY_ORDER.slice(0, 9));
  const s = migrate({ done, unlocked: false });
  assert.deepEqual(s.done, done);
});

test("anyone open on the old timeline is still open after new thinkers are inserted", () => {
  for (let k = 0; k <= LEGACY_ORDER.length; k++) {
    const done = wins(LEGACY_ORDER.slice(0, k));
    const before = legacyOpen(done);
    const after = openIds(migrate({ done, unlocked: false }));
    for (const id of before) assert.ok(after.includes(id), "after " + k + " wins, " + id + " was re-locked");
  }
});

test("a version 1 player who had beaten everyone can open every thinker up to the new frontier", () => {
  const s = migrate({ done: wins(LEGACY_ORDER), unlocked: false });
  const open = openIds(s);
  const frontier = order.indexOf("beauvoir");
  assert.deepEqual(open, order.slice(0, frontier + 1), "everyone up to Beauvoir, whom version 2 opened after Sartre");
});

test("anyone open on the version 2 timeline is still open after more thinkers are inserted", () => {
  for (let k = 0; k <= V2_ORDER.length; k++) {
    const done = wins(V2_ORDER.slice(0, k));
    const before = v2Open(done);
    // a version 2 save remembers what it showed; check both with and without that memory
    for (const opened of [Object.fromEntries(before.map(id => [id, true])), {}]) {
      const after = openIds(migrate({ version: 2, done, opened }));
      for (const id of before) assert.ok(after.includes(id), "after " + k + " wins, " + id + " was re-locked");
    }
  }
});

test("a version 2 player who had beaten everyone opens every inserted thinker, and the new ones after Beauvoir one at a time", () => {
  const s = migrate({ version: 2, done: wins(V2_ORDER), opened: Object.fromEntries(V2_ORDER.map(id => [id, true])) });
  const open = openIds(s);
  const tail = order.slice(order.indexOf("beauvoir") + 1);
  for (const id of order) if (!tail.includes(id)) assert.ok(open.includes(id), id);
  assert.ok(open.includes(tail[0]), tail[0] + " should open after Beauvoir");
  for (const id of tail.slice(1)) assert.ok(!open.includes(id), id + " should wait for the one before");
});

test("anyone open on the version 3 timeline is still open after Cioran is inserted", () => {
  for (let k = 0; k <= V3_ORDER.length; k++) {
    const done = wins(V3_ORDER.slice(0, k));
    const before = V3_ORDER.filter((id, i) => isUnlockedAt(V3_ORDER, i, { done, opened: {} }));
    for (const opened of [Object.fromEntries(before.map(id => [id, true])), {}]) {
      const after = openIds(migrate({ version: 3, done, opened }));
      for (const id of before) assert.ok(after.includes(id), "after " + k + " wins, " + id + " was re-locked");
    }
  }
});

test("a version 1 save also keeps open whatever version 2 would have opened", () => {
  const done = wins(["thales", "heraclitus"]);
  const open = openIds(migrate({ done, unlocked: false }));
  for (const id of v2Open(done, Object.fromEntries(legacyOpen(done).map(id => [id, true])))) assert.ok(open.includes(id), id);
});

test("thinkers inserted before a convinced one open; a new frontier unlocks one at a time", () => {
  const s = migrate({ done: wins(["thales", "heraclitus"]), unlocked: false });
  const open = openIds(s);
  for (const id of ["thales", "laozi", "confucius", "heraclitus", "parmenides"]) assert.ok(open.includes(id), id);
  assert.ok(!open.includes("protagoras"), "protagoras should still be locked");
});

test("a remembered frontier survives thinkers being added in a later version", () => {
  const s = migrate({ version: 2, done: wins(["thales"]), opened: { thales: true, laozi: true, heraclitus: true } });
  const later = ["thales", "someone-new", "laozi", "another-new", "confucius", "heraclitus"];
  const open = later.filter((id, i) => isUnlockedAt(later, i, s));
  assert.deepEqual(open, ["thales", "someone-new", "laozi", "heraclitus"]);
});

test("loading a version 1 save migrates it on disk, and wins and opened ids stay saved", () => {
  disk.set("dialectica.v1", JSON.stringify({ done: { thales: { turns: 4 }, heraclitus: { turns: 6 } }, unlocked: false }));
  store.loadProgress();
  assert.equal(store.bestTurns("thales"), 4);
  assert.equal(store.bestTurns("heraclitus"), 6);
  const saved = JSON.parse(disk.get("dialectica.v1"));
  assert.equal(saved.version, store.SAVE_VERSION);
  assert.deepEqual(Object.keys(saved.opened).sort(), ["confucius", "heraclitus", "laozi", "parmenides", "thales"]);
  store.markOpened(["laozi"]);
  store.recordWin("laozi", 3);
  const again = JSON.parse(disk.get("dialectica.v1"));
  assert.ok(again.opened.laozi);
  assert.equal(again.done.laozi.turns, 3);
  assert.equal(again.done.thales.turns, 4);
});

test("a corrupt or odd save starts fresh instead of crashing", () => {
  disk.set("dialectica.v1", "{not json");
  assert.deepEqual(store.loadProgress().done, {});
  assert.deepEqual(migrate([]).done, {});
  assert.deepEqual(migrate({ done: { thales: { turns: "x" } } }).done, { thales: { turns: 1 } });
});
