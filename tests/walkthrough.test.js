import { test } from "node:test";
import assert from "node:assert/strict";
import { loadAll, play } from "./helpers.js";

for (const ph of await loadAll()) {
  test(ph.id + ": the walkthrough wins, one step per line", () => {
    for (const seed of [1, 7, 42]) {
      const { c, log } = play(ph, ph.walkthrough, seed);
      const trace = log.map(l => l.node + " → " + l.to + (l.result ? " (" + l.result + ")" : "") + " : " + l.said).join("\n");
      assert.equal(c.result, "win", trace);
      assert.equal(c.turns, ph.walkthrough.length, trace);
      log.forEach(l => assert.ok(l.to !== l.node || l.result === "win", "stalled at " + l.node + ": " + l.said));
    }
  });
}
