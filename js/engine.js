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
import { analyse, matchNeed, detectStuffing, conceptsFor } from "./parser.js";
import { createVoice } from "./grammar.js";

export const DIFFICULTY = ["", "Novice", "Apprentice", "Adept", "Expert", "Master"];
export const hintCost = ph => (ph.diff >= 3 ? 1 : 0);

const RX = {
  hint: /^\s*(hint|help|clue|give me a (hint|clue)|i need a hint)\s*[?.!]*\s*$/i,
  insult: /\b(stupid|idiot|fool|dumb|moron|shut up|loser|imbecile|cretin|pathetic|hate you|screw you|bullshit|nonsense old man)\b/,
  flatter: /\b(genius|brilliant|so wise|very wise|great philosopher|admire|love your|amazing|you are wise|so smart|so clever)\b/,
  greet: /^ (hi|hello|hey|greetings|good (morning|day|evening|afternoon)|salve|chaire|howdy|yo|bonjour|guten tag)\b/,
  who: /\bwho are you\b|\bwhat is your name\b|\btell me about yourself\b/,
  agree: /^ (i agree|you are right|true|yes|indeed|exactly|ok|okay|fair enough|fair point|right|sure|agreed|of course) /,
  giveup: /\b(i give up|no idea|i do not know what to say|what should i say|i am stuck|i have no clue|what do you want me to say)\b/,
  ask: /\b(what|why|how|explain|mean|clarify|define|tell me|do you|is it|are you|can you|what is your)\b/
};

export class Conversation {
  constructor(ph, { rng = Math.random } = {}) {
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
    return [
      { who: "sys", text: "You approach " + ph.name + ". " + ph.place + ", " + ph.dates + "." },
      { who: "them", text }
    ];
  }

  respond(raw) {
    if (this.over) return [];
    if (RX.hint.test(raw)) return this.hint();

    const ph = this.ph, node = this.current;
    const U = analyse(raw);
    const vars = { frag: U.frag, echo: U.echo };
    const out = [];
    const speak = (t, extra) => out.push({ who: "them", text: this.say(t, Object.assign({}, vars, extra || {})) });
    const sys = (text, cls) => out.push({ who: "sys", text, cls });
    const P = U.text;
    const note = (kind, detail) => { this.debug = { kind, detail: detail || "", node: this.node, frag: U.frag, echo: U.echo }; };
    note("deflect");

    if (!U.words) { speak("@short"); return out; }

    // repeated input
    if (P === this.last) { note("repeat"); this.pat -= 1; speak("@repeat"); return this.finish(out); }
    this.last = P;
    this.turns++;

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
      return this.finish(out);
    }

    // argument moves: the decision tree
    for (const [i, mv] of node.moves.entries()) {
      const m = matchNeed(mv.need, U, this.concepts);
      if (m.full) {
        note("move", "move " + (i + 1) + " → " + mv.to + " (matched: " + m.words.join(", ") + "; " + stuffInfo + ")");
        this.advance(mv, out, vars); return this.finish(out);
      }
    }
    // traps: objections they have already answered
    for (const tr of node.traps || []) {
      if (matchNeed(tr.need, U, this.concepts).full) {
        this.pat -= tr.cost || 0;
        note("trap", "matched: " + matchNeed(tr.need, U, this.concepts).words.join(", ") + ", cost " + (tr.cost || 0));
        speak(tr.reply);
        if (tr.cost) sys("They have heard that objection before. (−" + tr.cost + " patience)");
        return this.finish(out);
      }
    }
    // speech acts
    if (RX.insult.test(P)) { this.pat -= 2; note("insult"); speak("@insult"); sys("That cost you 2 patience.", "bad"); return this.finish(out); }
    if (RX.flatter.test(P) && U.words < 14) { note("flatter"); speak("@flatter"); return this.finish(out); }
    if (RX.greet.test(P) && U.words < 7) { note("greet"); speak("@greet"); return this.finish(out); }
    if (RX.who.test(P)) {
      note("who are you"); speak("@whoami");
      out.push({ who: "them", text: this.say(ph.bio.split(". ").slice(0, 2).join(". ").replace(/\.?$/, "."), vars) });
      return this.finish(out);
    }
    if (RX.giveup.test(P)) { note("giveup"); speak("@giveup"); sys("Stuck? The Hint button nudges you toward the next step."); return this.finish(out); }
    if (RX.agree.test(P) && U.words < 6) { note("agree"); speak("@agree"); return this.finish(out); }

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
      return this.finish(out);
    }

    // questions: restate where things stand
    if (U.isQuestion && RX.ask.test(P)) {
      note("question");
      speak("@restate");
      out.push({ who: "them", text: this.say(this.stanceText || node.enter || ph.nodes[ph.start].enter, vars) });
      return this.finish(out);
    }

    if (U.words < 3) { note("too short"); speak("@short"); return this.finish(out); }

    // deflection, built from the player's own words
    this.pat -= 1;
    speak("@deflect");
    if (this.pat > 0 && this.pat <= 2 && this.gMood !== "irritated") speak("@annoyed");
    return this.finish(out);
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
    if (this.result !== "win" && this.pat <= 0) {
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
