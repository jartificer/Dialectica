import { test } from "node:test";
import assert from "node:assert/strict";
import { loadAll, seeded } from "./helpers.js";
import { Conversation } from "../js/engine.js";
import { createVoice, MOODS } from "../js/grammar.js";
import { analyse, matchNeed } from "../js/parser.js";
import { lemmas, synonymsOf } from "../js/lexicon.js";
import { createUnderstanding, anchorsFor, walkthroughMoves, THRESHOLDS } from "../js/semantic.js";

const all = await loadAll();
const byId = id => all.find(p => p.id === id);
const thales = byId("thales"), kant = byId("kant");

function talk(ph, node) {
  const c = new Conversation(ph, { rng: seeded(4), roster: all });
  c.opening();
  if (node) c.node = node;
  return c;
}

/* ---------- word forms and synonyms ---------- */

test("inflected forms match the plain word", () => {
  assert.deepEqual(lemmas("quenched").slice(0, 2), ["quenched", "quench"]);
  assert.ok(lemmas("dying").includes("die"));
  assert.ok(lemmas("putting").includes("put"));
  assert.ok(lemmas("lied").includes("lie"));
  assert.ok(matchNeed(["destroy"], analyse("water destroyed it")).full);
});

test("a synonym counts as the word the philosopher listed", () => {
  assert.ok(synonymsOf("extinguish").includes("douse"));
  assert.ok(matchNeed(["extinguish*"], analyse("water douses every flame")).full);
  assert.ok(matchNeed(["boundless"], analyse("the source must be limitless")).full);
  assert.ok(!matchNeed(["boundless"], analyse("the source is not limitless")).full, "negation still applies to synonyms");
});

/* ---------- everyday remarks get a fitting answer, and cost nothing ---------- */

const REMARKS = [
  ["Hello there", "greet"], ["Goodbye for now", "farewell"], ["Thanks!", "thanks"], ["Sorry, I was rude", "apology"],
  ["How are you today?", "howareyou"], ["Who are you?", "who are you"], ["Where are you from?", "about their life"],
  ["When were you born?", "about their life"], ["Tell me about your life", "about their life"],
  ["What is your position?", "their view"], ["Why?", "why"], ["Prove it.", "challenge"], ["How do you know?", "challenge"],
  ["What do you mean?", "clarify"], ["I don't understand", "clarify"], ["You're wrong.", "disagree"], ["lol", "laugh"],
  ["asdfgh jklqwe", "gibberish"], ["Have you heard of Nietzsche?", "person"], ["What would Kant say?", "person"],
  ["Do you have a smartphone?", "anachronism"], ["What's the weather like?", "small talk"], ["I give up", "giveup"], ["I miss my grandmother.", "feeling"], ["Can you explain it like I'm five?", "clarify"],
  ["Okay but what about the stars?", "trap"], ["That makes no sense.", "disagree"], ["Tell me a joke.", "small talk"],
  ["You are brilliant", "flatter"], ["Did you ever fall into a hole?", "question"]
];

for (const [line, kind] of REMARKS) {
  test("Thales answers “" + line + "” as " + kind + ", free of charge", () => {
    const c = talk(thales);
    const out = c.respond(line);
    assert.equal(c.debug.kind, kind);
    assert.equal(c.pat, thales.patience);
    assert.ok(out.length && out.every(o => !/#/.test(o.text)), JSON.stringify(out));
  });
}

test("a bare 'no' answers the question they just asked", () => {
  const c = talk(thales);
  c.respond("No.");
  assert.equal(c.debug.kind, "answerno");
});

test("thinkers know who came before them, and not who came after", () => {
  const c = talk(kant);
  c.respond("Have you read Hume?");
  assert.match(c.debug.detail, /Hume \((earlier|contemporary)\)/);
  c.respond("What would Nietzsche say?");
  assert.match(c.debug.detail, /Nietzsche \(later\)/);
});

test("a sentence about the subject is engaged with, and only charged after a couple of tries", () => {
  const c = talk(thales);
  const lines = ["Living things need more than water, they need warmth too.", "Moisture is not the same as life itself.", "Seeds need moisture, but they also need light from above."];
  lines.forEach(l => c.respond(l));
  assert.equal(c.debug.kind, "on topic");
  assert.equal(c.pat, thales.patience - 1);
});

test("an argument for a later stage is recognised instead of dismissed", () => {
  const c = talk(thales);
  c.respond("The source of everything must be boundless and unlimited.");
  assert.equal(c.debug.kind, "ahead");
  assert.equal(c.node, thales.start);
  assert.equal(c.pat, thales.patience);
});

for (const ph of all) {
  test(ph.id + ": every kind of remark has fully expanded replies in every mood", () => {
    const v = createVoice(ph, { rng: seeded(9) });
    const vars = { frag: "water is wet", echo: "weather", thesis: ph.core, place: ph.place, dates: ph.dates, fact: "A fact about them.", other: "Somebody", thing: "telephone", half: "fire" };
    const acts = ["farewell", "thanks", "apology", "howareyou", "view", "why", "challenge", "clarify", "disagree", "answerno", "answeryes",
      "laugh", "gibberish", "bioplace", "biodates", "biofact", "biounknown", "future", "past", "peer", "anachronism", "smalltalk", "feeling", "askback", "engage", "ahead", "behind"];
    for (const mood of MOODS) for (const a of acts) for (let i = 0; i < 4; i++) {
      const s = v.say("@" + a, i % 2 ? vars : { ...vars, echo: null, frag: null }, mood);
      assert.ok(s.length > 3 && !/#/.test(s) && !/\s[,.!?]/.test(s), a + "/" + mood + ": " + s);
    }
  });
}

/* ---------- the semantic layer, with a stand-in model ---------- */

const pickFor = (c, moveIdx, score = 0.86) => ({
  node: c.node,
  moves: c.current.moves.map((m, i) => (i === moveIdx ? score : 0.2)),
  traps: (c.current.traps || []).map(() => 0.1),
  act: null
});

test("an argument in other words advances when the model is sure", () => {
  const c = talk(thales, "fire");
  const line = "Surely the wet thing beats the warm thing, so one could never be mother to the other.";
  assert.ok(!c.current.moves.some(m => matchNeed(m.need, analyse(line), c.concepts).full), "keywords alone must miss this line");
  c.respond(line, { sem: pickFor(c, 0) });
  assert.equal(c.node, "opp");
  assert.match(c.debug.detail, /understood/);
});

test("the model is ignored when unsure, when stale, or when the argument is negated", () => {
  let c = talk(thales, "fire");
  c.respond("Surely the wet thing beats the warm thing.", { sem: pickFor(c, 0, THRESHOLDS.move - 0.05) });
  assert.equal(c.node, "fire");

  c = talk(thales, "fire");
  c.respond("Surely the wet thing beats the warm thing.", { sem: { ...pickFor(c, 0), node: "n0" } });
  assert.equal(c.node, "fire", "scores for another node are ignored");

  c = talk(thales, "opp");
  c.respond("The source is not boundless and not unlimited either.", { sem: pickFor(c, 0, 0.95) });
  assert.notEqual(c.result, "win", "a negated argument never wins");
});

test("keyword stuffing is still caught first, whatever the model says", () => {
  const c = talk(thales, "opp");
  c.respond("boundless infinite unlimited apeiron neutral water fire air earth", { sem: pickFor(c, 0, 0.99) });
  assert.equal(c.debug.kind, "stuffing");
  assert.notEqual(c.result, "win");
});

test("an objection in other words gets their answer, at no cost", () => {
  const c = talk(thales);
  const sem = { node: c.node, moves: c.current.moves.map(() => 0.2), traps: c.current.traps.map((t, i) => (i === 1 ? 0.83 : 0.1)), act: null };
  c.respond("What about the mountains and the cliffs by the shore?", { sem });
  assert.equal(c.debug.kind, "trap");
  assert.equal(c.pat, thales.patience);
});

test("every walkthrough line is found as the move it makes", () => {
  for (const ph of all) {
    const w = walkthroughMoves(ph);
    assert.equal(w.length, ph.walkthrough.length, ph.id);
    const anchors = anchorsFor(ph);
    for (const { node, i, line } of w) assert.ok(anchors[node].moves[i].includes(line), ph.id + "/" + node);
  }
});

/* a toy embedding: bag of lemmas, normalised. Enough to check the plumbing. */
async function toyEmbed(texts) {
  const dims = 512;
  return texts.map(t => {
    const v = new Array(dims).fill(0);
    for (const tok of analyse(t).toks) { const w = lemmas(tok.w).at(-1); let h = 0; for (const ch of w) h = (h * 31 + ch.charCodeAt(0)) >>> 0; v[h % dims] += 1; }
    const n = Math.hypot(...v) || 1;
    return v.map(x => x / n);
  });
}

test("understanding ranks a walkthrough line as its own move", async () => {
  const u = createUnderstanding(toyEmbed);
  for (const ph of [thales, kant]) {
    for (const { node, i, line } of walkthroughMoves(ph)) {
      const sem = await u.understand(line, ph, node);
      assert.equal(sem.node, node);
      const best = sem.moves.indexOf(Math.max(...sem.moves));
      assert.equal(best, i, ph.id + "/" + node);
      assert.ok(sem.moves[i] > 0.99);
      assert.ok(sem.act && typeof sem.act.score === "number");
    }
  }
});

test("with the model's scores, every walkthrough still wins", async () => {
  const u = createUnderstanding(toyEmbed);
  for (const ph of all) {
    const c = new Conversation(ph, { rng: seeded(5), roster: all });
    c.opening();
    for (const line of ph.walkthrough) c.respond(line, { sem: await u.understand(line, ph, c.node) });
    assert.equal(c.result, "win", ph.id);
  }
});

/* ---------- rudeness ---------- */
import { incivility } from "../js/intents.js";

test("swearing, abuse, threats, scorn and shouting are recognised, masked spellings too", () => {
  const kind = s => incivility(s)?.kind ?? null;
  assert.equal(kind("Oh fuck, this is hard"), "swear");
  assert.equal(kind("sh1t, I lost the thread"), "swear");
  assert.equal(kind("what the f*** is that"), "swear");
  assert.equal(kind("You are a f*cking idiot"), "abuse");
  assert.equal(kind("you m0ron"), "abuse");
  assert.equal(kind("Shut up, old man"), "abuse");
  assert.equal(kind("I will kill you"), "threat");
  assert.equal(kind("who cares"), "scorn");
  assert.equal(kind("WHY WONT YOU LISTEN TO ME"), "shout");
});

test("ordinary philosophical words are not mistaken for rudeness", () => {
  for (const s of ["Is hell real?", "Damnation awaits the wicked.", "Buridan's ass starves between two bales.",
    "Socrates owed a cock to Asclepius.", "Please shut the door.", "In the state of nature men kill each other.",
    "Is it stupid to believe the earth floats on water?", "I feel like a fool.", "The USA and NASA"])
    assert.equal(incivility(s), null, s);
});

test("a rude thinker takes offence, even at a good argument, and walks out on the third offence", () => {
  const c = talk(thales);
  c.respond("What about fire, you f*cking idiot?");
  assert.equal(c.debug.kind, "insult");
  assert.equal(c.node, thales.start, "abuse never advances the argument");
  assert.equal(c.pat, thales.patience - 2);
  const warn = c.respond("Damn it, this is hard.");
  assert.equal(c.debug.kind, "swear");
  assert.equal(warn.filter(o => o.who === "them").length, 2, "a last warning follows the second offence");
  c.respond("WHY WONT YOU LISTEN TO ME");
  assert.equal(c.debug.kind, "shout");
  assert.equal(c.result, null, "shouting alone is not an offence");
  const out = c.respond("who cares");
  assert.equal(c.result, "lose");
  assert.ok(out.some(o => /walked away/.test(o.text)));
});

for (const ph of all) {
  test(ph.id + ": every rude remark gets a fully expanded, offended reply in every mood", () => {
    const v = createVoice(ph, { rng: seeded(13) });
    for (const mood of MOODS) for (const a of ["insult", "swear", "threat", "scorn", "shout", "lastwarning", "walkout"]) for (let i = 0; i < 3; i++) {
      const s = v.say("@" + a, {}, mood);
      assert.ok(s.length > 3 && !/#/.test(s) && !/\s[,.!?]/.test(s), a + "/" + mood + ": " + s);
    }
  });
}

/* ---------- a player in distress ---------- */

import { distress } from "../js/intents.js";
import { CARE_NOTE } from "../js/engine.js";

const DISTRESSED = ["I want to kill myself.", "Sometimes I want to die.", "I think about ending my life", "I've been self-harming again",
  "I don't want to live anymore", "I feel suicidal", "everyone would be better off without me", "i want to hurt myself"];
const PHILOSOPHICAL = ["We are all going to die one day.", "Death is nothing to us.", "The sovereign may not command a man to harm himself.",
  "Mortality gives our projects their weight.", "Killing is worse than letting die.", "Pity multiplies suffering."];

test("a player who writes about hurting themselves gets a kind, out-of-character note from every thinker, at no cost", () => {
  for (const ph of all) for (const line of DISTRESSED) {
    const c = talk(ph);
    const out = c.respond(line);
    assert.equal(c.debug.kind, "distress", ph.id + ": " + line);
    assert.equal(c.pat, ph.patience, ph.id + ": no patience lost");
    assert.equal(c.rudeness, 0);
    assert.deepEqual(out.map(o => o.who), ["sys"], ph.id + ": the thinker does not answer in character");
    assert.equal(out[0].text, CARE_NOTE);
  }
});

test("talking about death as a philosophical subject is not mistaken for distress", () => {
  for (const line of PHILOSOPHICAL) assert.equal(distress(line), false, line);
});
