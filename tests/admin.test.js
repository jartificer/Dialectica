import { test } from "node:test";
import assert from "node:assert/strict";
import { Conversation } from "../js/engine.js";
import { loadAll, seeded } from "./helpers.js";

const all = await loadAll();
const kant = all.find(p => p.id === "kant");

test("admin can jump to any node and refill patience", () => {
  const c = new Conversation(kant, { rng: seeded(2) });
  c.opening();
  c.jumpTo("right");
  assert.equal(c.node, "right");
  c.pat = 1;
  c.refill();
  assert.equal(c.pat, kant.patience);
  c.respond(kant.walkthrough.at(-1));
  assert.equal(c.result, "win");
});

test("jumping to an unknown node does nothing", () => {
  const c = new Conversation(kant, { rng: seeded(2) });
  c.opening();
  assert.deepEqual(c.jumpTo("nope"), []);
  assert.equal(c.node, kant.start);
});

test("every reply records what it was based on", () => {
  const c = new Conversation(kant, { rng: seeded(2) });
  c.opening();
  c.respond("consequences save lives murderer killer means humanity maxim");
  assert.equal(c.debug.kind, "stuffing");
  c.respond(kant.walkthrough[0]);
  assert.equal(c.debug.kind, "move");
  assert.match(c.debug.detail, /→ deceit/);
  c.respond("hello");
  assert.equal(c.debug.kind, "greet");
});
