import { test } from "node:test";
import assert from "node:assert/strict";
import { recordVisit, HIT_URL } from "../js/visits.js";

test("a visit downloads the release file once, without cookies", async () => {
  const calls = [];
  assert.equal(await recordVisit(async (u, o) => { calls.push([u, o]); return {}; }), true);
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], "https://github.com/jartificer/Dialectica/releases/download/counter/visits.txt");
  assert.equal(calls[0][0], HIT_URL);
  assert.equal(calls[0][1].mode, "no-cors");
  assert.equal(calls[0][1].credentials, "omit", "no cookies go to GitHub");
});

test("a failed download is swallowed", async () => {
  assert.equal(await recordVisit(async () => { throw new Error("offline"); }), false);
  assert.equal(await recordVisit(() => { throw new Error("sync"); }), false);
  assert.equal(await recordVisit(null), false);
});
