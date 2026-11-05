import { test } from "node:test";
import assert from "node:assert/strict";
import { loadAll, play, seeded } from "./helpers.js";
import { Conversation } from "../js/engine.js";
import { CONCEPTS } from "../js/concepts.js";
import { analyse, detectStuffing } from "../js/parser.js";

/* the first alternative of every group, i.e. what a player would paste from reading the source */
const first = g => {
  const p = g.split("|")[0];
  return p[0] === "@" ? CONCEPTS[p.slice(1)][0] : p;
};
const words = items => items.flatMap(it => it.need.map(first)).map(w => w.replace(/\*$/, ""));
const items = n => [...(n.moves || []), ...(n.traps || [])];

function at(ph, nodeId) {
  const c = new Conversation(ph, { rng: seeded(3) });
  c.opening();
  c.node = nodeId;
  return c;
}

for (const ph of await loadAll()) {
  test(ph.id + ": a bare list of keywords never advances", () => {
    for (const [id, node] of Object.entries(ph.nodes)) {
      const dump = [...new Set(words(items(node)))];
      if (dump.length < 6) dump.push(...words(Object.values(ph.nodes).flatMap(items)).slice(0, 8));
      const c = at(ph, id);
      c.respond([...new Set(dump)].join(" "));
      assert.equal(c.node, id, "advanced from " + id);
      assert.notEqual(c.result, "win");
    }
  });

  test(ph.id + ": the whole vocabulary dressed up as a sentence never advances", () => {
    const vocab = [...new Set(words(Object.values(ph.nodes).flatMap(items)))];
    const sentence = "I think that " + vocab.map(w => "the " + w).join(" and ") + " is the point.";
    for (const id of Object.keys(ph.nodes)) {
      const c = at(ph, id);
      c.respond(sentence);
      assert.equal(c.node, id, "advanced from " + id);
      assert.notEqual(c.result, "win");
    }
  });

  test(ph.id + ": three of a node's arguments and objections at once do not advance", () => {
    for (const [id, node] of Object.entries(ph.nodes)) {
      // pick items whose keywords don't overlap, so each one is a separate idea
      const picked = [], used = new Set();
      for (const it of items(node)) {
        const ws = words([it]);
        if (ws.some(w => used.has(w))) continue;
        ws.forEach(w => used.add(w)); picked.push(ws);
      }
      if (picked.length < 3) continue;
      const sentence = "Well, " + picked.map(ws => "the " + ws.join(" and the ")).join(", and also ") + ".";
      // keyword lists can still overlap through concepts (vapour is also @air); only judge real triples
      if (detectStuffing(analyse(sentence), ph, node).nodeHits < 3) continue;
      const c = at(ph, id);
      c.respond(sentence);
      assert.equal(c.node, id, "advanced from " + id + " with: " + sentence);
    }
  });
}
