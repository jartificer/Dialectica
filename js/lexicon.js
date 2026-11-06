/* =====================================================================
   LEXICON
   Shared knowledge about English words, so a player does not have to hit
   the exact word a philosopher file happens to list.

     lemmas(word)   the forms a word could be an inflection of
                    ("quenched" → quench, "dying" → die, "ideas" → idea)
     SYNONYMS       sets of words that mean the same thing in an argument.
                    A plain word in a `need` pattern also matches every
                    other member of its set (see compileAlt in parser.js).
     NAMES          famous people who are not on the timeline, with a birth
                    year, so a thinker can know them or never have heard
                    of them.
     MODERN         things a thinker from long ago cannot know about.
   ===================================================================== */

/* Candidate base forms of a token, most likely first (the token itself
   is always included). Deliberately conservative: it only undoes regular
   English inflection, so "being" never becomes "be" and "news" never "new". */
export function lemmas(t) {
  const out = [t];
  const add = w => { if (w.length >= 3 && !out.includes(w)) out.push(w); };
  const n = t.length;
  if (n > 4 && t.endsWith("ies")) add(t.slice(0, -3) + "y");
  if (n > 4 && t.endsWith("ied")) add(t.slice(0, -3) + "y");
  if (n > 3 && t.endsWith("es")) { add(t.slice(0, -2)); add(t.slice(0, -1)); }
  if (n > 3 && t.endsWith("s") && !/(ss|us|is)$/.test(t)) add(t.slice(0, -1));
  if (n >= 4 && t.endsWith("ed")) {
    const b = t.slice(0, -2);
    add(b); add(t.slice(0, -1));
    if (/([bdgklmnprt])\1$/.test(b)) add(b.slice(0, -1)); // stopped → stop
  }
  if (n >= 5 && t.endsWith("ing")) {
    const b = t.slice(0, -3);
    add(b); add(b + "e");
    if (/([bdgklmnprt])\1$/.test(b)) add(b.slice(0, -1)); // putting → put
    if (b.endsWith("y")) add(b.slice(0, -1) + "ie");      // dying → die
  }
  if (n > 5 && t.endsWith("ly")) add(t.slice(0, -2));
  return out;
}

/* Each line is one set. Phrases are allowed. Keep sets tight: every
   member must be usable in place of every other in an argument, because
   a match on one counts as a match on all. */
const SETS = `
extinguish, quench, douse, snuff, put out, puts out, putting out, snuff out, smother
destroy, annihilate, obliterate, wipe out, ruin, wreck
kill, murder, slay, slaughter
opposite, contrary, antithesis, polar opposite, inverse
boundless, limitless, unlimited, infinite, endless, unbounded
produce, generate, give rise to, give birth to, bring forth, bring about
change, alter, transform, vary, mutate
illusion, delusion, mirage, hallucination
false, untrue, incorrect, mistaken, erroneous
prove, demonstrate, establish
proof, evidence, demonstration
pleasure, enjoyment, delight, gratification
pain, suffering, agony, anguish, torment
fear, dread, terror, fright
afraid, scared, frightened, terrified
die, perish, pass away
death, demise, dying
lie, falsehood, untruth, fib
deceive, mislead, trick, dupe
freedom, liberty
choose, decide, pick, opt
choice, decision
inevitable, unavoidable, inescapable
random, haphazard, arbitrary
chance, luck, accident
god, deity, the almighty
soul, psyche
world, universe, cosmos
people, humans, persons, human beings, folk
woman, female, lady
women, females, ladies
child, kid
rich, wealthy, affluent
poor, impoverished, destitute, needy
work, labour, labor, toil
money, cash, currency
king, monarch, sovereign, ruler
war, warfare
rebel, revolt, rise up, mutiny
rebellion, revolt, uprising, insurrection, mutiny, revolution
dream, reverie
asleep, sleeping
silent, silence, wordless, mute
emotion, feeling, passion, sentiment
grief, mourning, sorrow, bereavement
sad, unhappy, sorrowful, miserable
happy, glad, joyful, cheerful
meaningless, pointless, futile, senseless, purposeless
purpose, goal, aim
empty, void, hollow
immortal, undying, deathless, eternal life, live forever, living forever
eternal, everlasting, timeless, perpetual
perceive, observe, notice, discern
idea, notion, concept
mistake, error, blunder
duty, obligation
consequence, outcome, result
harm, hurt, injure, damage
weak, feeble, frail
strong, powerful, mighty
pity, compassion, sympathy
society, community
habit, custom
contradiction, inconsistency, paradox
example, instance
everyone, everybody, all people
selfish, egoistic, self-interested
cruel, brutal, ruthless
student, pupil, disciple
`;

export const SYNONYMS = new Map(); // word or phrase → list of sets it belongs to
for (const line of SETS.trim().split("\n")) {
  const set = line.split(",").map(s => s.trim()).filter(Boolean);
  for (const w of set) {
    if (!SYNONYMS.has(w)) SYNONYMS.set(w, []);
    SYNONYMS.get(w).push(set);
  }
}

/* Every other member of every set this word (or a lemma of it) belongs to. */
export function synonymsOf(word) {
  const out = new Set();
  for (const l of word.includes(" ") ? [word] : lemmas(word)) {
    for (const set of SYNONYMS.get(l) || []) set.forEach(w => { if (w !== word && w !== l) out.add(w); });
  }
  return [...out];
}

/* People a thinker might be asked about who are not on the timeline.
   key: a lower-case word that names them; born: year (negative = BCE). */
export const NAMES = {
  homer: { name: "Homer", born: -750 }, hesiod: { name: "Hesiod", born: -700 },
  moses: { name: "Moses", born: -1300 }, pythagoras: { name: "Pythagoras", born: -570 },
  buddha: { name: "the Buddha", born: -563 }, anaximander: { name: "Anaximander", born: -610 },
  democritus: { name: "Democritus", born: -460 }, diogenes: { name: "Diogenes", born: -412 },
  euclid: { name: "Euclid", born: -325 }, archimedes: { name: "Archimedes", born: -287 },
  cicero: { name: "Cicero", born: -106 }, seneca: { name: "Seneca", born: -4 },
  jesus: { name: "Jesus", born: -4 }, christ: { name: "Christ", born: -4 },
  muhammad: { name: "Muhammad", born: 570 }, mohammed: { name: "Muhammad", born: 570 },
  averroes: { name: "Averroes", born: 1126 }, maimonides: { name: "Maimonides", born: 1138 },
  dante: { name: "Dante", born: 1265 }, machiavelli: { name: "Machiavelli", born: 1469 },
  copernicus: { name: "Copernicus", born: 1473 }, luther: { name: "Luther", born: 1483 },
  shakespeare: { name: "Shakespeare", born: 1564 }, galileo: { name: "Galileo", born: 1564 },
  pascal: { name: "Pascal", born: 1623 },
  locke: { name: "Locke", born: 1632 }, newton: { name: "Newton", born: 1643 },
  leibniz: { name: "Leibniz", born: 1646 }, voltaire: { name: "Voltaire", born: 1694 },
  rousseau: { name: "Rousseau", born: 1712 },
  bentham: { name: "Bentham", born: 1748 }, hegel: { name: "Hegel", born: 1770 },
  schopenhauer: { name: "Schopenhauer", born: 1788 },
  darwin: { name: "Darwin", born: 1809 }, dostoevsky: { name: "Dostoevsky", born: 1821 },
  freud: { name: "Freud", born: 1856 }, russell: { name: "Russell", born: 1872 },
  einstein: { name: "Einstein", born: 1879 }, heidegger: { name: "Heidegger", born: 1889 },
  camus: { name: "Camus", born: 1913 }, arendt: { name: "Arendt", born: 1906 },
  rawls: { name: "Rawls", born: 1921 }, foucault: { name: "Foucault", born: 1926 },
  chomsky: { name: "Chomsky", born: 1928 }
};

/* Things that did not exist until a certain year. key: word or phrase. */
export const MODERN = {
  internet: 1983, "the web": 1991, website: 1991, email: 1971, "e-mail": 1971, google: 1998, wikipedia: 2001,
  computer: 1940, computers: 1940, laptop: 1980, smartphone: 2007, iphone: 2007, phone: 1876, telephone: 1876,
  television: 1927, tv: 1927, radio: 1895, cinema: 1895, movie: 1895, movies: 1895, film: 1895,
  car: 1886, cars: 1886, automobile: 1886, train: 1825, trains: 1825, railway: 1825, airplane: 1903, aeroplane: 1903,
  rocket: 1926, "space travel": 1957, astronaut: 1961, "moon landing": 1969,
  robot: 1920, robots: 1920, ai: 1956, "artificial intelligence": 1956, chatgpt: 2022, chatbot: 1966,
  "video game": 1972, "video games": 1972, "social media": 2004, facebook: 2004, instagram: 2010, tiktok: 2016, twitter: 2006,
  bitcoin: 2009, crypto: 2009, "nuclear bomb": 1945, "atomic bomb": 1945, "atom bomb": 1945, nuclear: 1938,
  vaccine: 1796, vaccines: 1796, antibiotics: 1928, electricity: 1800, "light bulb": 1879, photograph: 1826, camera: 1826,
  pizza: 1700, coffee: 900, chocolate: 1550, potato: 1550, tomato: 1550
};
