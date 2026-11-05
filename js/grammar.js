/* =====================================================================
   GENERATIVE GRAMMAR
   A Tracery-style rule grammar with a few extensions.

   Template syntax
     #rule#        expand a random alternative of `rule`
     #Rule#        …and capitalise the result
     #rule.q#      modifiers: .q (wrap in ‘quotes’), .a (prefix a/an),
                   .cap, .lower — chainable: #echo.q.cap#
     #?rule#       optional: expanded half the time, otherwise dropped
   Variables (frag, echo, half, name …) take precedence over rules.

   Rule lookup, most specific first
     voice["rule@mood"] → global["rule@mood"] → voice["rule"] → global["rule"]
   Moods: composed, intrigued, wavering, impatient, irritated.

   Identity rules (addr, oath, gest, core, claim, tic, image …) in a
   philosopher's voice replace the global ones. Speech-act rules (deflect,
   greet, insult, …) are blended: the voice's own lines are preferred,
   the shared ones keep variety.

   An alternative is skipped when it needs a variable the player did not
   supply (e.g. #frag# when we could not extract a clause) or a rule the
   voice does not define (e.g. #tic#). Recently used alternatives are
   avoided, and an identical sentence is never produced twice in a row.
   ===================================================================== */

export const MOODS = ["composed", "intrigued", "wavering", "impatient", "irritated"];
export const VARS = ["frag", "echo", "half", "name"];

/* Speech-act rules whose voice lines blend with the shared ones. */
const BLEND = new Set(["deflect", "greet", "insult", "flatter", "agree", "near", "nudge", "repeat", "short",
  "annoyed", "restate", "whoami", "stuffing", "giveup", "counter", "prod", "reflect", "echoq", "open", "dismiss", "lands"]);
const VOICE_SHARE = 0.6;

export const RULES = {
  /* --- small parts --- */
  hmm: ["Hmm.", "Ah.", "Well, well.", "Let me see.", "Mm.", "Now then.", "Consider.", "Let us see.", "So.", "Well."],
  open: ["#hmm#", "#gest#", "#oath#!", "#hmm# #gest#", "#gest# #hmm#", "Listen, #addr#.", "Now, #addr#."],

  /* reading the player's words back to them */
  reflect: [
    "So you hold that #frag#.", "You tell me #frag#.", "#Frag#, you say.", "Suppose #frag#.",
    "Grant, then, that #frag#.", "Let us say #frag#.", "If #frag#, what follows?", "#Frag#? Perhaps.",
    "You say #frag#, and you say it with confidence.", "Very well: #frag#. And then?"
  ],
  echoq: [
    "#Echo.q#? #hmm#", "You speak of #echo#.", "#Echo.q# is a word, #addr#, not yet an argument.", "#Echo#, you say.",
    "Why bring #echo# into it?", "I hear #echo.q#, but I do not hear a reason.", "And what has #echo# to do with it?"
  ],

  /* answering it */
  counter: [
    "That does not touch #core#.", "I don't see how that troubles #core#.", "#Core# stands where it stood.",
    "Even granting it, #claim#.", "And still #claim#.", "None of it reaches #core#.", "Whatever follows from that, #claim#.",
    "It leaves #core# untouched.", "You have not yet laid a finger on #core#.", "#Claim.cap#, all the same."
  ],
  "counter@wavering": [
    "That is weaker than what you said before.", "You were closer a moment ago, #addr#.", "Do not lose the thread now.",
    "That is a step backwards.", "You had me listening. Why change the subject?"
  ],
  "counter@intrigued": [
    "That does not touch #core#, though you were on a better road a moment ago.", "Interesting, but beside the point you were making.",
    "Even so, #claim#. Go back to what you were saying."
  ],
  dismiss: [
    "That does not touch #core#.", "That is beside the point, #addr#.", "You wander from the path.", "That leaves #core# standing.",
    "Interesting, but irrelevant.", "My position is unmoved."
  ],
  prod: [
    "Speak to the matter at hand.", "Give me an argument, not an ornament.", "Try again, and aim this time.", "What is your point?",
    "Where is your argument going?", "Show me the joint where it breaks.", "Find the weak place, if there is one.",
    "Give me a reason, #addr#.", "What would follow, if you were right?"
  ],
  "prod@impatient": ["Come to the point.", "Quickly, #addr#.", "I am waiting for an argument.", "Less wandering, more reasoning.", "Get on with it."],
  "prod@irritated": ["Enough.", "Make your point or let me be.", "One more like that and we are finished.", "I am losing interest, #addr#.", "Last chance, #addr#."],

  /* --- whole replies --- */
  deflect: [
    "#open# #reflect# #counter#", "#echoq# #counter#", "#gest# #counter# #prod#", "#hmm# #counter# #prod#",
    "#reflect# #prod#", "#gest# #echoq# #prod#", "#reflect# #counter# #?prod#", "#open# #echoq# #counter#",
    "#tic# #counter#", "#reflect# #tic#", "#?gest# #image# #counter#", "#counter# #tic#"
  ],
  "deflect@impatient": ["#annoyed# #reflect# #counter#", "#counter# #prod#", "#gest# #echoq# #prod#", "#reflect# #prod#"],
  "deflect@irritated": ["#annoyed# #counter#", "#counter# #prod#", "#annoyed# #prod#", "#gest# #prod#"],

  greet: [
    "#gest# Greetings, #addr#. We were speaking of #core#.", "Yes, yes, and good day to you. Now: #core#.",
    "Well met, #addr#. But we did not meet to exchange pleasantries.", "#oath#, how polite. Now, #core#.",
    "Greetings. You have not come all this way to say hello, #addr#."
  ],
  agree: [
    "Then we are agreed, which means you have convinced me of nothing.", "*smiles* If you agree with me, why did you come, #addr#?",
    "Agreement is pleasant, #addr#, but it is not why you are here.", "Good. Then #claim#, and we can both go home.",
    "You nod along. Nodding is not arguing."
  ],
  insult: [
    "*draws back* Insults are the arguments of those who have none.", "Abuse is not refutation, #addr#.",
    "I have been called worse by better.", "*coldly* If you cannot reason, at least be civil.",
    "Rudeness will not get you any further, #addr#."
  ],
  flatter: [
    "Flattery! Pleasant, but it moves nothing.", "Praise me less and argue more, #addr#.", "*waves a hand* Sweet words. Where is your argument?",
    "You will not soften me that way, #addr#."
  ],
  near: [
    "#hmm# You are circling something. #nudge#", "There may be something in that… #nudge#", "Closer, #addr#. #nudge#",
    "#gest# Half an argument. #nudge#", "#Half.q#. Yes, I hear that. #nudge#", "You mention #half#. Good. #nudge#",
    "#gest# #Half#… go on. #nudge#", "#Half.q#, you say, and then you stop. #nudge#"
  ],
  nudge: ["But finish the thought.", "Say the rest of it.", "Where does it lead?", "You have the beginning; give me the end.",
    "Join it to the rest.", "And so?", "What follows from it?"],
  repeat: ["You have said that already.", "Repetition is not proof, #addr#.", "Yes, yes, I heard you the first time.",
    "Saying it twice does not make it twice as true.", "An echo is not an answer, #addr#."],
  short: ["Speak more fully, #addr#.", "A word is not an argument.", "Go on…", "And?", "That is not yet a sentence, #addr#.", "More, please. Whole thoughts."],
  annoyed: ["*sighs*", "My patience is thinning, #addr#.", "I have other visitors, you know.", "*drums fingers*", "#oath#, this is tiring."],
  restate: ["#hmm# Let me put it plainly, #addr#.", "Very well, once more.", "#gest# I will say it again.", "Listen carefully, then."],
  whoami: ["#gest# You don't know me? I am #name#.", "I am #name#, #addr#.", "#name#, at your service. Mostly."],
  stuffing: [
    "You are throwing words at me like pebbles at a wall, #addr#. Build a sentence.",
    "A heap of words is not an argument.",
    "#gest# I hear a list of words. Where is the reasoning that joins them?",
    "Saying every word you can think of is not the same as thinking.",
    "You are fishing with a wide net, #addr#. Choose one thought and defend it.",
    "#oath#! One idea at a time, and joined by reasons."
  ],
  giveup: [
    "#gest# Giving up so soon, #addr#?", "Stuck? Then ask for a hint and stop wasting both our time.",
    "If you do not know what to say, ask. There is no shame in a question."
  ],
  lands: ["Your argument lands. Their position shifts."],

  /* identity defaults, normally supplied by the voice */
  addr: ["my friend"],
  oath: ["By the gods"],
  gest: ["*pauses*"],
  core: ["my position"],
  claim: ["my position stands"]
};

/* ---------- helpers ---------- */
function article(w) { return (/^[aeiou]/i.test(w) && !/^(uni|eu|one|use)/i.test(w) ? "an " : "a ") + w; }
function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }
const MODS = { q: s => "‘" + s + "’", a: article, cap, lower: s => s.toLowerCase() };

const TOKEN = /#(\??)([A-Za-z_]+(?:@[a-z]+)?)((?:\.[a-z]+)*)#/g;

/* Clean up spacing and punctuation, and capitalise sentence starts
   (but never inside *gestures*). */
export function tidy(s) {
  s = s.replace(/\s+/g, " ").trim()
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/([!?])\.(?!\.)/g, "$1")
    .replace(/(^|[^.])\.\.(?!\.)/g, "$1.")
    .replace(/,([.!?])/g, "$1")
    .replace(/^,\s*/, "")
    .replace(/:\s*$/, ".");
  let out = "", atStart = true, inG = false, startBeforeG = true;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === "*") {
      inG = !inG; out += ch;
      if (inG) startBeforeG = atStart; else atStart = startBeforeG; // a gesture does not end a sentence
      continue;
    }
    if (/[a-z]/.test(ch) && atStart) { out += inG ? ch : ch.toUpperCase(); atStart = false; continue; }
    if (/[A-Za-z0-9‘“"]/.test(ch) && ch !== "‘" && ch !== "“" && ch !== '"') atStart = false;
    if (!inG && /[.!?]/.test(ch) && s[i + 1] === " ") atStart = true;
    out += ch;
  }
  return out;
}

/* ---------- the voice ---------- */
export function createVoice(ph, { rng = Math.random } = {}) {
  const voice = ph.voice || {};
  const recent = new Map();      // list -> recently used indices
  const lastLines = [];          // last few full outputs

  function lookup(key, mood) {
    const lists = [];
    const k = key.toLowerCase();
    const moodKey = mood ? k + "@" + mood : null;
    const vm = moodKey && voice[moodKey], gm = moodKey && RULES[moodKey];
    if (vm || gm) { if (vm) lists.push(vm); if (gm) lists.push(gm); return lists; }
    if (voice[k]) lists.push(voice[k]);
    if (RULES[k] && (!voice[k] || BLEND.has(k))) lists.push(RULES[k]);
    return lists;
  }
  const has = (key, mood) => lookup(key, mood).length > 0;

  function usable(alt, vars, mood) {
    let ok = true;
    alt.replace(TOKEN, (m, opt, key) => {
      if (opt) return m;
      const k = key.toLowerCase();
      if (VARS.includes(k)) { if (vars[k] == null || vars[k] === "") ok = false; }
      else if (!(k in vars) && !has(k, mood)) ok = false;
      return m;
    });
    return ok;
  }

  function choose(list, vars, mood) {
    let idx = list.map((s, i) => i).filter(i => usable(list[i], vars, mood));
    if (!idx.length) return null;
    const avoid = recent.get(list) || [];
    const fresh = idx.filter(i => !avoid.includes(i));
    if (fresh.length) idx = fresh;
    const i = idx[Math.floor(rng() * idx.length)];
    const keep = Math.max(1, Math.floor(list.length / 2));
    recent.set(list, [...avoid, i].slice(-keep));
    return list[i];
  }

  function pickFrom(lists, vars, mood) {
    if (lists.length === 2) {
      const first = rng() < VOICE_SHARE ? 0 : 1;
      return choose(lists[first], vars, mood) ?? choose(lists[1 - first], vars, mood);
    }
    return lists.length ? choose(lists[0], vars, mood) : null;
  }

  function expand(str, vars, mood, depth = 0) {
    if (depth > 10) return str;
    return str.replace(TOKEN, (m, opt, key, mods) => {
      if (opt && rng() < 0.5) return "";
      const k = key.toLowerCase(), wantCap = key[0] !== key[0].toLowerCase();
      let val;
      if (vars[k] != null) val = String(vars[k]);
      else {
        const alt = pickFrom(lookup(k, mood), vars, mood);
        if (alt == null) return "";
        val = expand(alt, vars, mood, depth + 1);
      }
      for (const mod of mods.split(".").filter(Boolean)) if (MODS[mod]) val = MODS[mod](val);
      return wantCap ? cap(val) : val;
    });
  }

  /* template: a string, an array of alternative strings, or a rule name prefixed with "@" */
  function say(template, vars = {}, mood = "composed") {
    const v = Object.assign({ name: ph.name }, vars);
    let out = "";
    for (let attempt = 0; attempt < 5; attempt++) {
      let t = template;
      if (typeof t === "string" && t[0] === "@") t = "#" + t.slice(1) + "#";
      if (Array.isArray(t)) t = choose(t, v, mood) ?? t[0];
      out = tidy(expand(t, v, mood));
      if (!lastLines.includes(out)) break;
    }
    lastLines.push(out); if (lastLines.length > 8) lastLines.shift();
    return out;
  }

  return { say, has: k => has(k) };
}
