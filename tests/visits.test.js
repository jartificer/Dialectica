import { test } from "node:test";
import assert from "node:assert/strict";
import { showVisits } from "../js/visits.js";

function fakeEl() {
  const classes = new Set(["hidden"]);
  return { textContent: "", classList: { remove: c => classes.delete(c), contains: c => classes.has(c) } };
}

test("visit counter shows the total from Abacus", async () => {
  const el = fakeEl();
  let url = "";
  const value = await showVisits(el, async u => { url = u; return { ok: true, json: async () => ({ value: 1234 }) }; });
  assert.equal(value, 1234);
  assert.match(url, /^https:\/\/abacus\.jasoncameron\.dev\/hit\/dialectica\/visits$/);
  assert.match(el.textContent, /^1.?234 visits$/);
  assert.equal(el.classList.contains("hidden"), false);
});

test("visit counter stays hidden when the service fails", async () => {
  for (const fetchImpl of [
    async () => { throw new Error("offline"); },
    async () => ({ ok: false, json: async () => ({}) }),
    async () => ({ ok: true, json: async () => ({ error: "x" }) }),
  ]) {
    const el = fakeEl();
    assert.equal(await showVisits(el, fetchImpl), null);
    assert.equal(el.textContent, "");
    assert.equal(el.classList.contains("hidden"), true);
  }
});
