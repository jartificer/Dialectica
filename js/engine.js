/* =====================================================================
   ENGINE
   One Conversation per attempt at a philosopher. It owns the meters and
   the position in the argument tree, asks the parser what the player
   said, and asks the grammar how the philosopher answers.
   No DOM and no storage here, so it runs the same in Node tests.

   A reply is a list of lines:
     {who:"them", text}             the philosopher speaks
     {who:"sys",  text, cls}        narration ("good" / "bad")
     {who:"hint", label, text, cost}
   After each call, `result` is "win", "lose" or null.
   ===================================================================== */
import { analyse, matchNeed, detectStuffing, conceptsFor, FUNCTION_WORDS, ECHO_STOP } from "./parser.js";
import { detectAct, isSmalltalk, isFeeling, peopleIndex, incivility, distress } from "./intents.js";

/* Shown out of character when a player writes about wanting to die or to hurt themselves. */
export const CARE_NOTE = "Stepping out of the game for a moment: it sounds like you might be going through something really hard, and you don't have to face it alone. " +
  "If you are thinking about hurting yourself, please talk to someone you trust, or to a free, confidential helpline: " +
  "in the US call or text 988, in the UK and Ireland call Samaritans on 116 123, and findahelpline.com lists lines in other countries. " +
  "If you are in danger right now, call your local emergency number. The conversation will wait for you.";
import { lemmas } from "./lexicon.js";
import { THRESHOLDS } from "./semantic.js";
import { createVoice } from "./grammar.js";

export const DIFFICULTY = ["", "Novice", "Apprentice", "Adept", "Expert", "Master"];
export const hintCost = ph => (ph.diff >= 3 ? 1 : 0);

const RX = {
  hint: /^\s*(hint|help|clue|give me a (hint|clue)|i need a hint)\s*[?.!]*\s*$/i,
  ask: /\b(what|why|how|explain|mean|clarify|define|tell me|do you|is it|are you|can you|what is your|would you|could you|does|did|is|are)\b/
};

/* Patience a remark costs. Arguments that miss cost 1; remarks that are
   about the argument, or are ordinary conversation, are free. */
const FREE_ON_TOPIC = 2;
/* incivility: patience it costs, and how many offences before they walk out */
const RUDE_COST = { threat: 3, abuse: 2, swear: 1, scorn: 1, shout: 0 };
const WALKOUT = 3;
/* everyday words that say nothing about what an argument is about */
const COMMON = new Set(("like make made makes take know good well much many look come give gives does done keep kind sort " +
  "thing things time times part also first last long great little same other another every each ever even never always " +
  "seem seems seen tell told said says want wants need needs think thought true right wrong yours mine their there where " +
  "here then than these those very more most less such only just would could should might shall upon into onto from").split(" ")); // misses per node that touch the subject before they cost patience

/* The best semantic candidate among the node's moves and traps, and how far ahead of the runner-up it is. */
export function semPick(sem) {
  const items = [...(sem.moves || []).map((score, i) => ({ kind: "move", i, score })), ...(sem.traps || []).map((score, i) => ({ kind: "trap", i, score }))]
    .sort((a, b) => b.score - a.score);
  if (!items.length) return null;
  return { ...items[0], margin: items[0].score - (items[1]?.score ?? 0) };
}
function semSummary(sem, node) {
  const p = semPick(sem);
  const parts = [];
  if (p) parts.push("closest: " + p.kind + " " + (p.i + 1) + (p.kind === "move" ? " → " + node.moves[p.i].to : "") + " at " + p.score.toFixed(2) + " (margin " + p.margin.toFixed(2) + ")");
  if (sem.act) parts.push("remark: " + sem.act.name + " at " + sem.act.score.toFixed(2));
  return parts.length ? "semantic " + parts.join(", ") : "";
}

export class Conversation {
  constructor(ph, { rng = Math.random, roster = [] } = {}) {
    this.ph = ph;
    this.voice = createVoice(ph, { rng });
    this.concepts = conceptsFor(ph);
    this.node = ph.start;
    this.conv = 0;
    this.pat = ph.patience;
    this.turns = 0;
    this.hints = {};
    this.last = "";
    this.partials = 0;
    this.stuffs = 0;
    this.result = null;
    this.stanceText = "";
    this.debug = null; // what the last reply was based on, for admin mode
    this.people = peopleIndex(roster);
    this.asked = false;  // did their last line end with a question?
    this.onTopic = {};   // free on-topic misses used, per node
    this.vocab = new Map();
    this.rudeness = 0;   // offences so far; at WALKOUT they leave
  }

  get over() { return this.result !== null; }
  get current() { return this.ph.nodes[this.node]; }

  get mood() {
    if (this.result === "win") return "persuaded";
    if (this.result === "lose") return "dismissive";
    const r = this.pat / this.ph.patience;
    if (r <= 0.34) return "irritated";
    if (this.conv >= 60) return "wavering";
    if (this.conv >= 30) return "intrigued";
    if (r <= 0.6) return "impatient";
    return "composed";
  }
  /* grammar moods exclude the end states */
  get gMood() { const m = this.mood; return m === "persuaded" || m === "dismissive" ? "composed" : m; }

  get stance() { return this.result === "win" ? "Convinced." : this.current.stance; }

  say(t, vars) { return this.voice.say(t, vars, this.gMood); }

  opening() {
    const ph = this.ph;
    const text = this.say(ph.nodes[ph.start].enter, {});
    this.stanceText = text;
    this.asked = /\?\s*$/.test(text);
    return [
      { who: "sys", text: "You approach " + ph.name + ". " + ph.place + ", " + ph.dates + "." },
      { who: "them", text }
    ];
  }

  /* `sem` (optional) is what the semantic layer made of the same text, for
     the node the conversation is at: see semantic.js. Without it the game
     runs on the keyword parser and the dialogue-act rules alone. */
  respond(raw, { sem = null } = {}) {
    if (this.over) return [];
    if (RX.hint.test(raw)) return this.hint();

    const ph = this.ph, node = this.current;
    const U = analyse(raw);
    const vars = { frag: U.frag, echo: U.echo };
    const out = [];
    const speak = (t, extra) => out.push({ who: "them", text: this.say(t, Object.assign({}, vars, extra || {})) });
    const sys = (text, cls) => out.push({ who: "sys", text, cls });
    const P = U.text;
    const semInfo = sem && sem.node === this.node ? semSummary(sem, node) : "";
    const note = (kind, detail) => { this.debug = { kind, detail: [detail, semInfo].filter(Boolean).join("; "), node: this.node, frag: U.frag, echo: U.echo }; };
    const done = () => { const last = out.filter(o => o.who === "them").at(-1); if (last) this.asked = /\?\s*$/.test(last.text); return this.finish(out); };
    note("deflect");

    if (!U.words) { speak("@short"); return out; }

    // a player who sounds as if they might hurt themselves: step out of the game, kindly, at no cost
    if (distress(raw)) {
      note("distress");
      sys(CARE_NOTE, "care");
      return out;
    }

    // repeated input
    if (P === this.last) { note("repeat"); this.pat -= 1; speak("@repeat"); return done(); }
    this.last = P;
    this.turns++;

    // rudeness first: an argument wrapped in abuse still gets an offended thinker
    const rude = incivility(raw);
    if (rude) return this.offended(rude, out, speak, sys, note, done);

    // keyword stuffing beats everything else
    const st = detectStuffing(U, ph, node);
    const stuffInfo = "stuffing check: separate hits " + st.nodeHits + " here, " + st.treeHits + " in the whole tree" + (st.listy ? ", reads as a bare list" : "");
    if (st.stuffed) {
      note("stuffing", stuffInfo);
      this.stuffs++;
      this.pat -= 1;
      speak("@stuffing");
      sys(this.stuffs === 1
        ? "A string of keywords is not an argument. Join your ideas with reasons. (−1 patience)"
        : "Keyword stuffing again. (−1 patience)", "bad");
      return done();
    }

    // argument moves: the decision tree
    for (const [i, mv] of node.moves.entries()) {
      const m = matchNeed(mv.need, U, this.concepts);
      if (m.full) {
        note("move", "move " + (i + 1) + " → " + mv.to + " (matched: " + m.words.join(", ") + "; " + stuffInfo + ")");
        this.advance(mv, out, vars); return done();
      }
    }
    // traps: objections they have already answered
    for (const tr of node.traps || []) {
      const m = matchNeed(tr.need, U, this.concepts);
      if (m.full) {
        this.pat -= tr.cost || 0;
        note("trap", "matched: " + m.words.join(", ") + ", cost " + (tr.cost || 0));
        speak(tr.reply);
        if (tr.cost) sys("They have heard that objection before. (−" + tr.cost + " patience)");
        return done();
      }
    }

    const act = detectAct(U, ph, { asked: this.asked, people: this.people });
    if (act?.act === "insult") return this.offended({ kind: "abuse", word: "" }, out, speak, sys, note, done);

    // the semantic layer: the same argument in other words
    const pick = sem && sem.node === this.node ? semPick(sem) : null;
    if (pick && !act && pick.kind === "move" && pick.score >= THRESHOLDS.move && pick.margin >= THRESHOLDS.margin && U.words >= 4) {
      const mv = node.moves[pick.i];
      if (!matchNeed(mv.need, U, this.concepts).negated) {
        note("move", "move " + (pick.i + 1) + " → " + mv.to + " (understood: similarity " + pick.score.toFixed(2) + ")");
        this.advance(mv, out, vars); return done();
      }
    }

    if (act) {
      const handled = this.reply(act, U, vars, speak, sys, note);
      if (handled) return done();
    }

    // an objection they have answered, said in other words: their answer, but free
    if (pick && pick.kind === "trap" && pick.score >= THRESHOLDS.trap && pick.margin >= THRESHOLDS.margin) {
      note("trap", "understood as objection " + (pick.i + 1) + " (similarity " + pick.score.toFixed(2) + "), no cost");
      speak(node.traps[pick.i].reply);
      return done();
    }

    // a good argument, but for another stage of the conversation
    const elsewhere = this.otherNodeMove(U);
    if (elsewhere) {
      note(elsewhere, "matches a move at another node");
      speak("@" + elsewhere);
      return done();
    }

    // near-miss: part of a multi-part argument
    let best = null, bestFrac = 0;
    for (const mv of node.moves) {
      if (mv.need.length < 2) continue;
      const m = matchNeed(mv.need, U, this.concepts);
      if (m.contentFrac > bestFrac) { best = m; bestFrac = m.contentFrac; }
    }
    if (best && bestFrac >= 0.5 && this.partials < 3) {
      this.partials++;
      note("near miss", "half of a move matched: " + best.words.join(", "));
      speak("@near", { half: best.words[0] || null });
      return done();
    }
    if (pick && pick.kind === "move" && pick.score >= THRESHOLDS.near && this.partials < 3) {
      this.partials++;
      note("near miss", "close to move " + (pick.i + 1) + " (similarity " + pick.score.toFixed(2) + ")");
      speak("@near");
      return done();
    }

    // the semantic layer's guess at the kind of remark
    if (sem?.act && sem.act.score >= THRESHOLDS.act) {
      const guess = { act: sem.act.name };
      if (guess.act === "insult") return this.offended({ kind: "scorn", word: "understood, similarity " + sem.act.score.toFixed(2) }, out, speak, sys, note, done);
      if (this.reply(guess, U, vars, speak, sys, note)) return done();
    }

    const topical = this.isOnTopic(U);
    if (!topical && isFeeling(U)) { note("feeling"); speak("@feeling"); return done(); }
    if (!topical && isSmalltalk(U)) { note("small talk"); speak("@smalltalk"); return done(); }

    // questions: answer about the matter, or turn the question back
    if (U.isQuestion && RX.ask.test(P)) {
      if (topical) {
        note("question", topical ? "on the subject" : "");
        speak("@restate");
        out.push({ who: "them", text: this.say(this.stanceText || node.enter || ph.nodes[ph.start].enter, vars) });
      } else { note("question", "off the subject"); speak("@askback"); }
      return done();
    }

    if (U.words < 3) { note("too short"); speak("@short"); return done(); }

    // on the subject but not an argument they know: engage, and only charge after a couple
    if (topical) {
      const used = this.onTopic[this.node] || 0;
      this.onTopic[this.node] = used + 1;
      if (used >= FREE_ON_TOPIC) this.pat -= 1;
      note("on topic", "about the subject, no move matched" + (used >= FREE_ON_TOPIC ? ", cost 1" : ", free"));
      speak("@engage");
      if (this.pat > 0 && this.pat <= 2 && this.gMood !== "irritated") speak("@annoyed");
      return done();
    }

    // deflection, built from the player's own words
    this.pat -= 1;
    speak("@deflect");
    if (this.pat > 0 && this.pat <= 2 && this.gMood !== "irritated") speak("@annoyed");
    return done();
  }

  /* Swearing, abuse, threats, scorn, shouting: they take offence, and after
     WALKOUT offences they leave (the conversation is lost). */
  offended(rude, out, speak, sys, note, done) {
    const cost = RUDE_COST[rude.kind] ?? 1;
    if (cost) this.rudeness++;
    this.pat -= cost;
    this.partials = 0;
    const kind = rude.kind === "abuse" ? "insult" : rude.kind;
    note(kind, (rude.word ? "“" + rude.word + "”, " : "") + "cost " + cost + ", offence " + this.rudeness + " of " + WALKOUT);
    if (this.rudeness >= WALKOUT || (this.pat <= 0 && cost)) {
      speak("@walkout");
      this.pat = 0;
      this.result = "lose";
      sys(this.ph.name + " has walked away. Civility is part of the argument.", "bad");
      return done();
    }
    speak("@" + (rude.kind === "abuse" ? "insult" : rude.kind));
    if (this.rudeness === WALKOUT - 1 && cost) speak("@lastwarning");
    if (cost) sys((rude.kind === "threat" ? "Threats" : rude.kind === "swear" ? "Foul language" : rude.kind === "scorn" ? "Scorn" : "Insults") + " cost you " + cost + " patience.", "bad");
    return done();
  }

  /* Answer a dialogue act. Returns false if this act has nothing to say here. */
  reply(act, U, vars, speak, sys, note) {
    const ph = this.ph, node = this.current;
    const restate = () => this.say(this.stanceText || node.enter || ph.nodes[ph.start].enter, vars);
    const them = text => speak(text);
    switch (act.act) {
      case "gibberish": note("gibberish"); speak("@gibberish"); return true;
      case "giveup": note("giveup"); speak("@giveup"); sys("Stuck? The Hint button nudges you toward the next step."); return true;
      case "who":
        note("who are you"); speak("@whoami");
        them(ph.bio.split(". ").slice(0, 2).join(". ").replace(/\.?$/, "."));
        return true;
      case "bio": {
        const f = act.fact || { kind: "unknown" };
        note("about their life", f.kind);
        if (f.kind === "place") speak("@bioplace", { place: ph.place });
        else if (f.kind === "dates") speak("@biodates", { dates: ph.dates });
        else if (f.kind === "fact") speak("@biofact", { fact: f.fact });
        else speak("@biounknown");
        return true;
      }
      case "view": note("their view"); speak("@view", { thesis: ph.core }); return true;
      case "why": case "challenge": case "clarify":
        note(act.act); speak("@" + act.act);
        out(restate());
        return true;
      case "howareyou": case "farewell": case "thanks": case "apology": case "laugh":
      case "disagree": case "answerno": case "answeryes":
        note(act.act); speak("@" + act.act); return true;
      case "flatter": note("flatter"); speak("@flatter"); return true;
      case "greet": note("greet"); speak("@greet"); return true;
      case "agree": note("agree"); speak("@agree"); return true;
      case "anachronism": note("anachronism", act.thing); speak("@anachronism", { thing: act.thing }); return true;
      case "person": {
        const p = act.person;
        note("person", p.name + " (" + p.when + ")");
        speak(p.when === "later" ? "@future" : p.when === "earlier" ? "@past" : "@peer", { other: p.name });
        return true;
      }
      case "smalltalk": note("small talk"); speak("@smalltalk"); return true;
      case "feeling": note("feeling"); speak("@feeling"); return true;
      default: return false;
    }
    function out(text) { them(text); }
  }

  /* Does the sentence share a content word with what this part of the
     argument is about? */
  isOnTopic(U) {
    const words = this.vocabulary(this.node);
    return U.toks.some(t => t.w.length >= 4 && !t.neg && !FUNCTION_WORDS.has(t.w) && !ECHO_STOP.has(t.w) && !COMMON.has(t.w) && lemmas(t.w).some(l => !COMMON.has(l) && words.has(l)));
  }
  vocabulary(id) {
    if (this.vocab.has(id)) return this.vocab.get(id);
    const ph = this.ph, n = ph.nodes[id];
    const text = [ph.core, ph.target, n.enter || "", n.stance, ...(ph.voice.claim || []), ...(ph.voice.core || [])].join(" ");
    const words = new Set();
    const addWord = w => { if (w.length >= 4 && !FUNCTION_WORDS.has(w) && !ECHO_STOP.has(w) && !COMMON.has(w)) lemmas(w).forEach(l => words.add(l)); };
    text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/#[^#]*#/g, " ").split(/[^a-z]+/).forEach(addWord);
    for (const it of [...n.moves, ...(n.traps || [])]) for (const g of it.need) for (const alt of g.split("|"))
      if (alt[0] !== "@" && !alt.includes(" ")) addWord(alt.replace(/\*$/, "").toLowerCase());
    for (const nm of ph.name.toLowerCase().split(/[^a-z]+/)) words.delete(nm);
    this.vocab.set(id, words);
    return words;
  }

  /* A full move of another node: "ahead" if that node is still to come, "behind" if it is passed. */
  otherNodeMove(U) {
    const ph = this.ph, reach = from => {
      const seen = new Set([from]), q = [from];
      while (q.length) { const id = q.shift(); for (const m of ph.nodes[id].moves) if (m.to !== "WIN" && !seen.has(m.to)) { seen.add(m.to); q.push(m.to); } }
      return seen;
    };
    const ahead = reach(this.node);
    for (const [id, n] of Object.entries(ph.nodes)) {
      if (id === this.node) continue;
      if (!n.moves.some(mv => matchNeed(mv.need, U, this.concepts).full)) continue;
      if (ahead.has(id)) return "ahead";
      if (reach(id).has(this.node)) return "behind";
    }
    return null;
  }

  advance(mv, out, vars) {
    const ph = this.ph;
    this.partials = 0;
    if (mv.to === "WIN") {
      this.conv = 100;
      this.result = "win";
      out.push({ who: "them", text: this.say(ph.win, vars) });
      out.push({ who: "sys", text: "Convinced in " + this.turns + " exchange" + (this.turns === 1 ? "" : "s") + ".", cls: "good" });
      return;
    }
    const next = ph.nodes[mv.to];
    this.node = mv.to;
    this.conv = Math.min(92, this.conv + (mv.gain || 25));
    let text = mv.reply ? this.say(mv.reply, vars) : "";
    if (next.enter) text = (text ? text + " " : "") + this.say(next.enter, vars);
    this.stanceText = text;
    out.push({ who: "them", text });
    out.push({ who: "sys", text: this.say("@lands"), cls: "good" });
  }

  finish(out) {
    if (this.result === null && this.pat <= 0) {
      this.pat = 0;
      this.result = "lose";
      out.push({ who: "them", text: this.say(this.ph.lose, {}) });
      out.push({ who: "sys", text: this.ph.name + " has run out of patience.", cls: "bad" });
    }
    return out;
  }

  /* ---- admin mode ---- */
  jumpTo(id) {
    const n = this.ph.nodes[id];
    if (!n || this.over) return [];
    this.node = id;
    this.partials = 0;
    const text = n.enter ? this.say(n.enter, {}) : "";
    this.stanceText = text || n.stance;
    const out = [{ who: "sys", text: "Admin: jumped to node “" + id + "”." }];
    if (text) out.push({ who: "them", text });
    return out;
  }
  refill() { if (!this.over) this.pat = this.ph.patience; return [{ who: "sys", text: "Admin: patience refilled." }]; }

  hint() {
    if (this.over) return [];
    const node = this.current, hints = node.hints || [];
    if (!hints.length) return [{ who: "sys", text: "No hint here. Trust your reasoning." }];
    const i = this.hints[this.node] || 0;
    const shown = Math.min(i, hints.length - 1);
    const fresh = i < hints.length;
    const cost = fresh ? hintCost(this.ph) : 0;
    this.pat -= cost;
    this.hints[this.node] = i + 1;
    const label = "Hint" + (hints.length > 1 ? " " + (shown + 1) + "/" + hints.length : "");
    return this.finish([{ who: "hint", label, text: hints[shown], cost }]);
  }
}
