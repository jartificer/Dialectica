import { test } from "node:test";
import assert from "node:assert/strict";
import { createVoice, tidy, MOODS } from "../js/grammar.js";
import { seeded, loadAll } from "./helpers.js";

const all = await loadAll();

test("tidy fixes spacing, punctuation and capitals, but not inside gestures", () => {
  assert.equal(tidy("*nods*  fire , you say?. yet it burns.."), "*nods* Fire, you say? Yet it burns.");
  assert.equal(tidy("so the *resembling* forms"), "So the *resembling* forms");
});

test("modifiers and optional rules", () => {
  const v = createVoice({ name: "X", voice: { addr: ["friend"], oath: ["Zeus"], gest: ["*g*"], core: ["c"], claim: ["k"] } }, { rng: seeded(5) });
  assert.equal(v.say("#echo.q.cap#", { echo: "water" }), "‘Water’");
  assert.equal(v.say("#word.a#", { word: "apple" }), "An apple");
});

for (const ph of all) {
  test(ph.id + ": deflections resolve fully and vary", () => {
    const v = createVoice(ph, { rng: seeded(11) });
    for (const mood of MOODS) {
      const outs = [];
      for (let i = 0; i < 30; i++) {
        const s = v.say("@deflect", { frag: i % 3 ? "water is not everything" : null, echo: i % 2 ? "eclipse" : null }, mood);
        assert.ok(!/#/.test(s), "unexpanded rule in: " + s);
        assert.ok(s.length > 3, "empty reply");
        assert.ok(!/\s[,.!?]/.test(s), "stray punctuation: " + s);
        outs.push(s);
      }
      for (let i = 1; i < outs.length; i++) assert.notEqual(outs[i], outs[i - 1], "repeated line back to back");
      assert.ok(new Set(outs).size >= 18, ph.id + "/" + mood + " only " + new Set(outs).size + " distinct of 30");
    }
  });
}
