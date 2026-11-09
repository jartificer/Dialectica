import { test } from "node:test";
import assert from "node:assert/strict";
import { showVisits, HIT_URL, COUNT_URL } from "../js/visits.js";

function fakeEl() {
  const classes = new Set(["hidden"]);
  return { textContent: "", classList: { remove: c => classes.delete(c), contains: c => classes.has(c) } };
}
const release = (assets) => async () => ({ ok: true, json: async () => ({ assets }) });

test("visit counter downloads the release file, then shows its download count", async () => {
  const el = fakeEl();
  const calls = [];
  const read = release([{ name: "other.zip", download_count: 9 }, { name: "visits.txt", download_count: 1234 }]);
  const value = await showVisits(el, async (u, o) => { calls.push([u, o]); return u === COUNT_URL ? read() : {}; });
  assert.equal(value, 1234);
  assert.deepEqual(calls.map(c => c[0]), [HIT_URL, COUNT_URL]);
  assert.match(HIT_URL, /^https:\/\/github\.com\/jartificer\/Dialectica\/releases\/download\/counter\/visits\.txt$/);
  assert.equal(calls[0][1].mode, "no-cors");
  for (const [, o] of calls) assert.equal(o.credentials, "omit", "no cookies go to GitHub");
  assert.match(el.textContent, /^1.?234 visits$/);
  assert.equal(el.classList.contains("hidden"), false);
});

test("visit counter stays hidden when GitHub fails or the release is missing", async () => {
  for (const read of [
    async () => { throw new Error("offline"); },
    async () => ({ ok: false, json: async () => ({ message: "Not Found" }) }),
    release([]),
    release([{ name: "visits.txt" }]),
  ]) {
    const el = fakeEl();
    assert.equal(await showVisits(el, async u => u === COUNT_URL ? read() : Promise.reject(new Error("blocked"))), null);
    assert.equal(el.textContent, "");
    assert.equal(el.classList.contains("hidden"), true);
  }
});
