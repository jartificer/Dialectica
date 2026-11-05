import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import manifest from "../philosophers/index.js";
import { isSafePortrait } from "../js/portraits.js";

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
