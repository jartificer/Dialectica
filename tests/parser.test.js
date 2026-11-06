import { test } from "node:test";
import assert from "node:assert/strict";
import { analyse, matchNeed, normalise, swapPerson, extractFrag, extractEcho, editDistance } from "../js/parser.js";

const m = (need, s) => matchNeed(need, analyse(s)).full;

test("contractions and accents are normalised", () => {
  assert.equal(normalise("You can't, it's Übermensch's"), "you can not, it is ubermensch");
  assert.ok(m(["cannot"], "you cant do that"));
  assert.ok(m(["don't know"], "I do not know"));
});

test("negation scope blocks a keyword the player denies", () => {
  assert.ok(m(["boundless"], "The source is boundless"));
  assert.ok(!m(["boundless"], "The source is not boundless"));
  assert.ok(m(["boundless"], "It is not water. The source is boundless"), "negation stops at the clause");
  assert.ok(m(["fire"], "not water but fire"), "negation stops at a conjunction");
  assert.ok(m(["son*"], "did you feel nothing when your sons died"));
  assert.ok(m(["@neg|destroy*", "fire"], "water does not make fire"), "moves about negation ignore the scope");
  assert.ok(!m(["boundless|neither|none of them"], "the source is not boundless"), "a denied keyword stays denied even if the group could match a negation");
  assert.ok(m(["boundless|neither|none of them"], "neither water nor fire"));
});

test("phrases do not straddle punctuation", () => {
  assert.ok(m(["put out"], "water can put out fire"));
  assert.ok(!m(["put out"], "I put, out of spite, the cat"));
});

test("all groups must fall close together", () => {
  const far = "fire " + "and so on ".repeat(12) + "opposite";
  assert.ok(m(["fire", "opposite*"], "fire is the opposite of water"));
  assert.ok(!m(["fire", "opposite*"], far));
});

test("small typos in long words are forgiven, short words are exact", () => {
  assert.ok(m(["boundless"], "it is boundles"));
  assert.ok(m(["ressentiment"], "full of ressentment"));
  assert.ok(!m(["fire"], "a fir tree"));
  assert.equal(editDistance("contradcit", "contradict"), 1);
});

test("plural and prefix matching", () => {
  assert.ok(m(["opposite"], "they are opposites"));
  assert.ok(m(["surviv*"], "only the survivors"));
});

test("pronouns are swapped so the philosopher can quote you", () => {
  assert.equal(swapPerson("you are wrong about my water"), "I am wrong about your water");
  assert.equal(swapPerson("I think you know something"), "you think I know something");
  assert.equal(swapPerson("the oracle praised you"), "the oracle praised me");
});

test("fragments are pulled from the first usable sentence", () => {
  assert.equal(extractFrag("I think that fire is not made of water."), "fire is not made of water");
  assert.equal(extractFrag("Well, surely you are mistaken about the sea."), "I am mistaken about the sea");
  assert.equal(extractFrag("Why?"), null);
});

test("echo prefers a salient noun", () => {
  assert.equal(extractEcho("Consider the institution of slavery, obviously"), "institution");
});
