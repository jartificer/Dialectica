import manifest from "../philosophers/index.js";
import { Conversation } from "../js/engine.js";

export async function loadAll() {
  return Promise.all(manifest.map(async id => (await import("../philosophers/" + id + ".js")).default));
}

/* Seeded RNG so grammar choices are reproducible. */
export function seeded(seed = 1) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 2 ** 32; };
}

export function play(ph, lines, seed = 1) {
  const c = new Conversation(ph, { rng: seeded(seed) });
  c.opening();
  const log = [];
  for (const l of lines) {
    const before = c.node;
    const out = c.respond(l);
    log.push({ said: l, node: before, to: c.node, result: c.result, out });
    if (c.over) break;
  }
  return { c, log };
}
