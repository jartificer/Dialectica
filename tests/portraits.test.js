import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import manifest from "../philosophers/index.js";
import { isSafePortrait, reactionFor, faceFor, MOOD_FACE } from "../js/portraits.js";

const read = id => readFile(new URL("../portraits/" + id + ".svg", import.meta.url), "utf8");

test("every philosopher has a portrait", async () => {
  for (const id of manifest) await assert.doesNotReject(read(id), "missing portraits/" + id + ".svg");
});

test("portraits are small, plain SVG shapes", async () => {
  for (const id of manifest) {
    const svg = await read(id);
    assert.ok(isSafePortrait(svg), id + ": only svg/path/circle/… elements, no scripts or links");
    assert.match(svg, /<svg[^>]*viewBox="[\d.\s-]+"/, id + ": needs a viewBox");
    assert.ok(svg.length < 4096, id + ": " + svg.length + " bytes, keep it under 4 KB");
  }
});

test("portraits only draw in currentColor, so they follow the theme", async () => {
  for (const id of manifest) {
    const svg = await read(id);
    for (const m of svg.matchAll(/\b(?:stroke|fill)="([^"]+)"/g)) {
      assert.ok(["currentColor", "none"].includes(m[1]), id + ": hard-coded colour " + m[1]);
    }
    assert.doesNotMatch(svg, /#[0-9a-f]{3,6}\b|rgb\(|style=/i, id + ": no hard-coded colours or inline styles");
  }
});

test("the safety check rejects scripts and links", () => {
  assert.equal(isSafePortrait('<svg viewBox="0 0 1 1"><script>alert(1)</script></svg>'), false);
  assert.equal(isSafePortrait('<svg viewBox="0 0 1 1" onload="x()"><path d="M0 0"/></svg>'), false);
  assert.equal(isSafePortrait('<svg viewBox="0 0 1 1"><a href="x"><path d="M0 0"/></a></svg>'), false);
  assert.equal(isSafePortrait('<svg viewBox="0 0 1 1"><foreignObject/></svg>'), false);
  assert.equal(isSafePortrait('<!-- note --><svg viewBox="0 0 1 1"><path d="M0 0"/></svg>'), true);
});

test("portraits have the face parts the animations move", async () => {
  for (const id of manifest) {
    const svg = await read(id);
    for (const part of ['class="fig"', 'class="brow l"', 'class="eyes"', 'class="look"', 'class="mouth"'])
      assert.ok(svg.includes(part), id + ": missing " + part);
    for (const m of ["m-rest", "m-smile", "m-frown", "m-flat", "m-open"])
      assert.ok(svg.includes('class="' + m + '"'), id + ": missing mouth shape " + m);
  }
});

test("every mood has a face, and replies get the right reaction", () => {
  for (const mood of ["composed", "impatient", "intrigued", "wavering", "irritated", "persuaded", "dismissive"])
    assert.ok(MOOD_FACE[mood], mood);
  assert.equal(faceFor("nonsense"), "neutral");
  const before = { conv: 30, pat: 5 };
  const r = (c, kind) => reactionFor(before, Object.assign({ result: null, conv: 30, pat: 5 }, c), kind);
  assert.deepEqual(r({ result: "win", conv: 100 }, "move"), { face: "glad", anim: "bounce" });
  assert.deepEqual(r({ result: "lose", pat: 0 }, "deflect"), { face: "scorn", anim: "turn" });
  assert.equal(r({ conv: 55 }, "move").face, "astonished");
  assert.equal(r({ pat: 3 }, "insult").face, "furious");
  assert.equal(r({ pat: 4 }, "stuffing").face, "cross");
  assert.equal(r({ pat: 4 }, "deflect").face, "puzzled");
  assert.equal(r({}, "greet").face, "amused");
  assert.equal(r({}, null).face, "thinking");
});
