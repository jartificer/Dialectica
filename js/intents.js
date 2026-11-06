/* =====================================================================
   DIALOGUE ACTS
   What kind of remark the player made, when it is not an argument the
   philosopher's tree knows: a greeting, a question about their life, a
   challenge ("prove it"), a bare "you're wrong", small talk, a mention of
   someone they could never have met, and so on. Each act has its own
   replies in grammar.js, so the thinker answers the remark that was
   actually made instead of brushing every sentence off the same way.

   detectAct(U, ctx) works on the parser's utterance and needs no model.
   EXAMPLES gives a few sample sentences per act; the optional semantic
   layer (semantic.js) compares the player's sentence with these when the
   rules below find nothing.
   ===================================================================== */
import { NAMES, MODERN, lemmas } from "./lexicon.js";

const R = (s, f = "") => new RegExp(s, f);
/* All patterns run on U.text: normalised, lower-case, single-spaced, padded
   with a space at both ends, contractions expanded ("do not", "can not"). */
const RX = {
  insult: R(" (stupid|idiot|idiotic|fool|foolish|dumb|moron|shut up|loser|imbecile|cretin|pathetic|hate you|screw you|bullshit|nonsense old man|old fool|you suck|dumbass|ridiculous old) "),
  flatter: R(" (genius|brilliant|so wise|very wise|great philosopher|admire you|love your|amazing|you are wise|so smart|so clever|i love you|you are great|you are the best|my hero|big fan) "),
  greet: R("^ (hi|hello|hey|greetings|good (morning|day|evening|afternoon)|salve|chaire|howdy|yo|bonjour|guten tag|hail|well met|ni hao|namaste|salaam|shalom)( |$)"),
  farewell: R(" (bye|goodbye|good bye|farewell|see you|see ya|i have to go|i must go|i am leaving|i will leave|good night|later then|catch you later) "),
  thanks: R("^ (thanks|thank you|thank|cheers|much obliged|i appreciate (it|that))( |$)"),
  apology: R("^ (sorry|i am sorry|my apologies|apologies|forgive me|pardon me|my bad)( |$)"),
  howareyou: R(" (how are you|how do you do|how is it going|how are things|are you (well|ok|okay|alright|happy|sad|tired)|how do you feel|what is up|whats up|wassup) "),
  who: R(" (who are you|what is your name|tell me about yourself|introduce yourself|who am i talking to|who am i speaking (to|with)) "),
  bio: R(" (where (are|were) you (from|born)|where do you (live|come from)|when (were|was) you born|when did you (live|die)|how old are you|what (is|was) your (life|job|work|family|childhood|youth|book|books)|what did you (write|do)|did you (write|have|marry|teach|travel|die)|do you have (a |any )?(wife|husband|children|kids|family|students|friends)|are you married|tell me about your (life|work|books|family|past|youth|death)|what are you (known|famous) for|how did you die|who (taught|was your teacher)|what do you do for a living) "),
  view: R(" (what do you (believe|think|claim|hold|mean by|say)|what is your (view|position|claim|argument|point|thesis|belief|opinion|stance|idea)|what are you (claiming|saying|arguing)|explain your (view|position|claim|argument|idea|belief)|state your (view|position|claim|case)|remind me what you (think|believe|said)|what was your (point|claim|argument)) "),
  why: R("^ (why|but why|why so|why is that|why do you (think|believe|say|hold) (that|so|this)|how so|on what grounds|why would (that|it) be|what makes you (think|say|believe) (that|so)) $"),
  challenge: R(" (prove it|prove that|prove this|how do you know|how can you (know|be sure)|what is your (evidence|proof)|where is (the|your) (evidence|proof)|says who|who says|why should i believe|give me (evidence|proof|a reason)|show me (the|your) (evidence|proof)|what makes you so sure|can you prove|you can not prove) "),
  clarify: R("^ (what|huh|eh|pardon|come again|sorry what|what do you mean|i do not (understand|follow|get it|get you)|i am (confused|lost)|explain|explain that|explain please|say that again|say it again|repeat that|could you repeat|please repeat|what does that mean|i do not see what you mean|meaning what|in plain (words|english)|simpler please)( please)? $| (explain|say|put) (it|that|this)( to me)? (simply|more simply|plainly|more plainly|in simple|in plain|like i am|again)| like i am (five|5|a child)| eli5 |^ (simpler|plainer|more simply)( please)? $"),
  disagree: R("^ ((that|this|it) (makes|made) no sense|(that|this) is (ridiculous|stupid nonsense|crazy|madness)|no|nope|nah|wrong|false|not true|that is (wrong|false|not true|nonsense|rubbish|absurd|silly)|you are (wrong|mistaken|incorrect)|i disagree|i do not agree|i do not think so|nonsense|rubbish|absurd|i do not buy it|i do not believe (it|that|you)|that is not right|not at all|of course not)( [a-z]+)? $"),
  agree: R("^ (i agree|you are right|true|yes|yeah|yep|indeed|exactly|ok|okay|fair enough|fair point|right|sure|agreed|of course|correct|that is true|good point|makes sense|i see)( (i (guess|suppose)|then|whatever|fine|indeed|maybe|so|sir|friend|master))? $"),
  feeling: R(" i (am|feel|felt|was|have been|got) (so |very |really |a bit |quite )?(sad|lonely|upset|depressed|anxious|scared|afraid|worried|unhappy|miserable|heartbroken|angry|hurt|lost) | i miss | i lost my | my [a-z]+ (died|passed away) | i am grieving "),
  laugh: R("^ (lol|lmao|rofl|haha+|hahaha+|hehe+|ha|ha ha|ha ha ha|xd|funny|that is funny|very funny) "),
  giveup: R(" (i give up|no idea|i do not know what to say|what should i say|i am stuck|i have no clue|what do you want me to say|how do i (win|beat you|convince you)|what am i supposed to (say|do)|how does this (game )?work|i can not think of anything|help me|what do i do now|any tips) "),
  smalltalk: R(" (weather|rain|raining|sunny|hungry|food|eat|eating|dinner|lunch|breakfast|drink|wine|beer|pizza|cake|tea|chocolate|tired|sleepy|music|song|sing|dance|sport|sports|football|game|games|joke|jokes|favourite|favorite|hobby|hobbies|holiday|vacation|pet|dog|cat|cats|dogs|birthday|party|fun|bored|boring|bad day|good day|long day|upset|stressed|exhausted|tell me a story|tell me something) ")
};

/* sample sentences for each act, for the semantic layer */
export const EXAMPLES = {
  greet: ["Hello there!", "Good morning, philosopher.", "Hi, nice to meet you."],
  farewell: ["I have to go now, goodbye.", "See you another time.", "Farewell, old man."],
  thanks: ["Thank you for explaining.", "Thanks, that helps.", "I appreciate your patience."],
  apology: ["Sorry, I did not mean that.", "I apologise for being rude.", "Forgive me."],
  howareyou: ["How are you today?", "Are you feeling well?", "How have you been?"],
  who: ["Who are you?", "What is your name?", "Tell me about yourself."],
  bio: ["Where were you born?", "What did you write?", "Did you have a family?", "How did you die?", "What was your life like?"],
  view: ["What exactly do you believe?", "What is your position?", "Remind me what you are claiming.", "What is your main idea?"],
  why: ["Why do you think so?", "Why is that true?", "What is your reason for that?"],
  challenge: ["Prove it.", "How can you possibly know that?", "What evidence do you have?", "Why should I believe you?"],
  clarify: ["I don't understand what you mean.", "Can you say that more simply?", "What does that mean?", "I am confused."],
  disagree: ["You are wrong.", "I don't agree with that at all.", "That is simply false."],
  agree: ["Yes, I agree with you.", "You are right about that.", "That makes sense."],
  insult: ["You are a stupid old man.", "Your ideas are idiotic.", "Shut up."],
  flatter: ["You are a genius.", "I admire your wisdom so much.", "You are the greatest philosopher."],
  laugh: ["Haha, that's funny.", "lol", "You made me laugh."],
  giveup: ["I don't know what to say.", "I give up.", "How am I supposed to convince you?", "I am stuck."],
  feeling: ["I feel so sad today.", "I miss my mother.", "I am lonely and worried."],
  smalltalk: ["What's the weather like today?", "Do you like music?", "Are you hungry?", "What is your favourite food?"]
};
export const ACTS = Object.keys(EXAMPLES);

const BIO_HINTS = {
  born: ["born", "birth", "old", "age", "young", "year", "when"],
  place: ["from", "where", "live", "home", "city", "country"],
  write: ["write", "wrote", "book", "books", "work", "works", "text"],
  die: ["die", "died", "death", "dead", "end"],
  family: ["family", "wife", "husband", "child", "children", "kids", "married", "son", "daughter", "father", "mother"],
  teach: ["teacher", "taught", "student", "students", "pupil", "school", "learn"]
};
const BIO_WORDS = {
  write: /\b(wr[io]te|book|work|treatise|poem|dialogue|letter|essay|text|meditations|critique|ethics|republic)/i,
  die: /\b(die|died|death|dead|executed|killed|hemlock|buried)/i,
  family: /\b(wife|husband|married|son|sons|daughter|children|family|father|mother|fiance|engagement|regine|engaged)/i,
  teach: /\b(student|pupil|taught|teacher|school|academy|lyceum|disciple|tutor)/i
};

/* the bio sentence that best answers a question about their life */
export function bioFact(ph, U) {
  const sentences = String(ph.bio).split(/(?<=[.!?])\s+/).filter(Boolean);
  if (!sentences.length) return null;
  const words = new Set(U.toks.flatMap(t => lemmas(t.w)));
  let topic = null;
  for (const [k, list] of Object.entries(BIO_HINTS)) if (list.some(w => words.has(w))) { topic = k; break; }
  if (topic === "born") return { kind: "dates" };
  if (topic === "place") return { kind: "place" };
  let best = null, bestScore = 0;
  sentences.forEach((s, i) => {
    let score = 0;
    if (topic && BIO_WORDS[topic]?.test(s)) score += 3;
    for (const w of s.toLowerCase().split(/[^a-z]+/)) if (w.length > 3 && words.has(w)) score += 1;
    score -= i * 0.01;
    if (score > bestScore) { best = s; bestScore = score; }
  });
  if (!best) return topic ? { kind: "unknown" } : { kind: "fact", fact: sentences.find(s => s.split(/\s+/).length >= 7) || sentences[0] };
  return { kind: "fact", fact: best };
}

/* ---------- people and things from another time ---------- */
const NAME_SKIP = new Set(["of", "the", "ibn", "al", "de", "von", "saint", "st", "mary", "karl", "simone", "jean", "paul", "george", "david", "immanuel", "friedrich", "ludwig", "thomas", "rene", "baruch", "soren", "marcus", "wang", "ghazali"]);

/* aliases → {name, born, id?} for everyone on the timeline plus NAMES */
export function peopleIndex(roster = []) {
  const idx = new Map(Object.entries(NAMES));
  for (const p of roster) {
    const entry = { name: p.name, born: p.born, id: p.id };
    idx.set(p.id, entry);
    for (const w of String(p.name).split(/ of /)[0].normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().split(/[^a-z]+/))
      if (w.length >= 4 && !NAME_SKIP.has(w)) idx.set(w, entry);
  }
  return idx;
}

function lifeEnd(ph) {
  const years = String(ph.dates).match(/\d{3,4}/g)?.map(Number) || [];
  const bce = /BCE/.test(ph.dates);
  if (years.length >= 2) return bce ? -years[1] : years[1];
  return ph.born + 70;
}

/* someone the player mentioned: the first name in the index that is not the thinker */
export function mentionedPerson(U, ph, people) {
  for (const t of U.toks) {
    const p = people.get(t.w);
    if (p && p.id !== ph.id && !(p.name && ph.name.toLowerCase().includes(t.w))) {
      const end = lifeEnd(ph);
      const when = p.born > end - 10 ? "later" : p.born < ph.born - 15 ? "earlier" : "contemporary";
      return { name: p.name, when };
    }
  }
  return null;
}

/* something invented after the thinker died */
export function anachronism(U, ph) {
  const end = lifeEnd(ph);
  const text = U.text;
  for (const [thing, year] of Object.entries(MODERN)) {
    if (year > end && text.includes(" " + thing + " ")) return thing;
  }
  return null;
}

/* ---------- incivility ----------
   Swearing, abuse, threats, scorn and shouting. Checked on the raw text
   before anything else, so a good argument wrapped in abuse still gets an
   offended thinker. Masked spellings ("f*ck", "sh1t", "fuuuck") count.
   Words that are ordinary in philosophy stay out of the lists: hell,
   damnation, ass (the donkey), cock (the one Socrates owed Asclepius). */
const SWEAR = /\b(fuck\w*|fck\w*|fuk\w*|motherfuck\w*|shit\w*|bullshit|horseshit|crap|crappy|bitch\w*|bastard\w*|asshole\w*|arsehole\w*|dickhead\w*|wanker\w*|twat\w*|cunt\w*|prick|piss off|pissed|bollocks|bloody hell|goddamn\w*|god damn|damn it|dammit|wtf|stfu|omfg|ffs|jesus christ)\b/;
const MASKED = /(?<![a-z])(f[*#@!%]{2,}k?|f[*#@!%]ck\w*|s[*#!%]{2,}t|sh[*#!%]t|b[*#!%]{2,}ch|a[*#!%]{2,}hole)(?![a-z])/;
const ABUSE = /\b(stupid|idiot\w*|fool|dumb|dumbass|moron\w*|imbecile|cretin|loser|pathetic|retard\w*|clown|liar|fraud|charlatan|senile|braindead|brain dead|halfwit|nitwit|dimwit|numbskull|buffoon|jerk|creep|scum)\b/;
const AT_THEM = /\b(you|your|yours|you're|youre|u|ur|old man|old fool|grandpa)\b/;
const ALWAYS_ABUSE = /\b(shut up|shut it|screw you|hate you|you suck|go to hell|eat shit|up yours|f off|get lost|go away|nobody asked you|no one asked you|piss off)\b/;
const THREAT = /\b((i will|i'll|i am going to|i'm going to|gonna|i want to|i could) (kill|hurt|punch|hit|beat|stab|strangle|slap|murder) you|hope you die|go die|drop dead|kill yourself|kys)\b/;
const SCORN = /\b(who cares|nobody cares|no one cares|whatever,? old man|blah blah|boring old|so boring|you are boring|you're boring|this is (stupid|dumb|pointless|boring)|lame|cringe|ok boomer|okay boomer)\b/;

/* lower-case, de-accent, undo leetspeak and squash long letter runs. Masks
   between letters ("f*ck", "sh!t") become a placeholder, tried as each vowel. */
function unmask(raw) {
  const t = String(raw).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[’`]/g, "'")
    .replace(/(?<=[a-z])[013457](?=[a-z])/g, d => ({ 0: "o", 1: "i", 3: "e", 4: "a", 5: "s", 7: "t" }[d]))
    .replace(/(?<=[a-z])[@$](?=[a-z])/g, c => (c === "@" ? "a" : "s"))
    .replace(/(?<=[a-z])[*#!%_.-]+(?=[a-z])/g, "\u0001")
    .replace(/([a-z])\1{2,}/g, "$1$1"); // fuuuuck → fuuck
  const out = [];
  for (const v of ["u", "i", "a", "o", ""]) {
    const w = t.replace(/\u0001/g, v);
    out.push(w, w.replace(/([a-z])\1/g, "$1"));
  }
  return [...new Set(out)];
}

/* {kind, word} or null. kind: threat | abuse | swear | scorn | shout */
export function incivility(raw) {
  const variants = unmask(raw), t = variants[0].replace(/\u0001/g, "");
  const hit = rx => { for (const v of variants) { const m = v.match(rx); if (m) return m[0]; } return null; };
  let w;
  if ((w = hit(THREAT))) return { kind: "threat", word: w };
  if ((w = hit(ALWAYS_ABUSE))) return { kind: "abuse", word: w };
  const swear = hit(SWEAR) || String(raw).toLowerCase().match(MASKED)?.[0], abuse = hit(ABUSE);
  const atThem = AT_THEM.test(t);
  if (abuse && atThem) return { kind: "abuse", word: abuse };
  if (swear && atThem) return { kind: "abuse", word: swear };
  if (swear) return { kind: "swear", word: swear };
  if ((w = t.match(SCORN)?.[0])) return { kind: "scorn", word: w };
  const letters = String(raw).replace(/[^A-Za-z]/g, "");
  if (letters.length >= 10 && letters.replace(/[^A-Z]/g, "").length / letters.length > 0.8 && /\b[A-Z]{3,}\b.*\b[A-Z]{3,}\b/.test(raw)) return { kind: "shout", word: "" };
  return null;
}

/* ---------- gibberish ---------- */
const KEYBOARD = /(qwer|wert|erty|asdf|sdfg|dfgh|fghj|ghjk|hjkl|zxcv|xcvb|cvbn|vbnm|uiop|jkl)/;
export function isGibberish(U) {
  if (!U.toks.length) return false;
  const bad = U.toks.filter(t => t.w.length >= 4 && (KEYBOARD.test(t.w) || /[^aeiouy0-9]{5,}/.test(t.w) || !/[aeiouy]/.test(t.w))).length;
  const real = U.toks.filter(t => t.w.length <= 3 || /[aeiouy]/.test(t.w)).length - bad;
  return bad >= 1 && bad >= real;
}

/* ---------- the classifier ----------
   Returns {act, ...} or null. The order matters: an insult that starts
   with "hello" is still an insult. `ctx.asked` tells whether the thinker's
   last line ended with a question, so a bare "no" can answer it. */
export function detectAct(U, ph, ctx = {}) {
  const P = U.text, n = U.words;
  if (isGibberish(U)) return { act: "gibberish" };
  if (RX.insult.test(P)) return { act: "insult" };
  const thing = anachronism(U, ph);
  if (thing && n <= 16) return { act: "anachronism", thing };
  const person = ctx.people && n <= 16 && mentionedPerson(U, ph, ctx.people);
  if (person) return { act: "person", person };
  if (RX.giveup.test(P)) return { act: "giveup" };
  if (RX.who.test(P)) return { act: "who" };
  if (RX.bio.test(P)) return { act: "bio", fact: bioFact(ph, U) };
  if (RX.challenge.test(P) && n <= 12) return { act: "challenge" };
  if (RX.view.test(P) && n <= 14) return { act: "view" };
  if (RX.why.test(P)) return { act: "why" };
  if (RX.clarify.test(P)) return { act: "clarify" };
  if (RX.howareyou.test(P) && n <= 9) return { act: "howareyou" };
  if (RX.farewell.test(P) && n <= 9) return { act: "farewell" };
  if (RX.thanks.test(P) && n <= 8) return { act: "thanks" };
  if (RX.apology.test(P) && n <= 8) return { act: "apology" };
  if (RX.flatter.test(P) && n < 14) return { act: "flatter" };
  if (RX.greet.test(P) && n < 7) return { act: "greet" };
  if (RX.laugh.test(P) && n <= 5) return { act: "laugh" };
  if (ctx.asked && /^ (no|nope|nah|not really|no it does not|no it can not|no nothing|nothing|none) $/.test(P)) return { act: "answerno" };
  if (ctx.asked && /^ (yes|yeah|yep|maybe|perhaps|i suppose|i guess so|sure|probably) $/.test(P)) return { act: "answeryes" };
  if (RX.disagree.test(P) && n <= 8) return { act: "disagree" };
  if (RX.agree.test(P) && n < 6) return { act: "agree" };
  return null;
}

/* feelings and small talk are only asides when the sentence is not about the argument
   (Epicurus has a lot to say about dinner), so the engine asks separately */
export const isSmalltalk = U => RX.smalltalk.test(U.text) && U.words <= 14;
export const isFeeling = U => RX.feeling.test(U.text) && U.words <= 20;
