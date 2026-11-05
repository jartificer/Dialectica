import { test } from "node:test";
import assert from "node:assert/strict";
import manifest from "../philosophers/index.js";
import { validatePhilosopher } from "../js/validate.js";
import { RULES, VARS } from "../js/grammar.js";
import { loadAll } from "./helpers.js";

const all = await loadAll();

test("every data file passes validation", () => {
  all.forEach((ph, i) => assert.deepEqual(validatePhilosopher(ph, manifest[i]), [], ph?.id));
});

test("ids are unique", () => {
  assert.equal(new Set(all.map(p => p.id)).size, all.length);
});

test("difficulty never drops as the timeline moves forward", () => {
  const sorted = [...all].sort((a, b) => a.born - b.born);
  for (let i = 1; i < sorted.length; i++) {
    assert.ok(sorted[i].diff >= sorted[i - 1].diff, sorted[i - 1].id + " (" + sorted[i - 1].diff + ") → " + sorted[i].id + " (" + sorted[i].diff + ")");
  }
});

test("templates only use rules and variables that exist", () => {
  for (const ph of all) {
    const known = new Set([...Object.keys(RULES), ...Object.keys(ph.voice), ...VARS].map(k => k.split("@")[0].toLowerCase()));
    const strings = [];
    const walk = v => { if (typeof v === "string") strings.push(v); else if (Array.isArray(v)) v.forEach(walk); else if (v && typeof v === "object") Object.values(v).forEach(walk); };
    walk({ nodes: ph.nodes, win: ph.win, lose: ph.lose, voice: ph.voice });
    for (const s of strings) {
      for (const m of s.matchAll(/#\??([A-Za-z_]+)(?:@[a-z]+)?(?:\.[a-z]+)*#/g)) {
        assert.ok(known.has(m[1].toLowerCase()), ph.id + ": unknown rule #" + m[1] + "# in “" + s.slice(0, 60) + "…”");
      }
    }
  }
});

test("every philosopher has a walkthrough", () => {
  for (const ph of all) assert.ok(Array.isArray(ph.walkthrough) && ph.walkthrough.length, ph.id);
});
