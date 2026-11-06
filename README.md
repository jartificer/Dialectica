# Dialectica

Argue your way through 2,500 years of philosophy. Every great thinker has a conviction they would die for; your job is to talk each of them out of it, in plain English.

Thirty-three thinkers from Greece, China, India, Persia, Europe and beyond, in chronological order, get harder as you go: Thales, Laozi, Confucius, Heraclitus, Parmenides, Protagoras, Socrates, Plato, Aristotle, Zhuangzi, Epicurus, Marcus Aurelius, Nāgārjuna, Augustine, Śaṅkara, Ibn Sīnā, Anselm, al-Ghazālī, Aquinas, Wang Yangming, Hobbes, Descartes, Spinoza, Berkeley, Hume, Kant, Wollstonecraft, Kierkegaard, Marx, Nietzsche, Wittgenstein, Sartre and Beauvoir.

## Running it

The game is plain HTML, CSS and ES modules. It has no build step and no dependencies.

Browsers only load ES modules over http(s), so serve the folder instead of opening `index.html` directly:

```sh
python3 -m http.server 8000      # or: npm start
# then open http://localhost:8000
```

GitHub Pages also works: enable it for the repository root.

Add `?fast` to the URL to skip the "thinking…" delays (handy for testing).

### Admin mode

Click **Admin mode** at the bottom of the timeline, or add `?admin` to the URL. Admin mode:

- opens every thinker, so you can talk to anyone without beating the earlier ones first;
- adds an Admin box to each conversation, where you can jump to any node of the argument tree, refill patience, fill in the next line of the walkthrough, and see how your last message was parsed (which move or trap matched, the stuffing check, and what was quoted back to you);
- never saves wins, so your real progress stays exactly as it was.

It stays on until you click it off again.

## Layout

```
index.html              page shell
css/style.css           all styles (light and dark)
js/main.js              entry point: loads data, starts the UI
js/registry.js          loads philosophers/index.js, validates, sorts by `born`
js/validate.js          checks a philosopher file for dead ends and typos
js/engine.js            Conversation: meters, argument tree, speech acts (no DOM)
js/parser.js            understands the player's text (see "Parser")
js/lexicon.js           word forms, synonyms, famous names, inventions with their dates
js/intents.js           everyday remarks: greetings, "prove it", questions about their life…
js/semantic.js          optional small model that recognises arguments in other words
js/grammar.js           generates replies in each thinker's voice (see "Grammar")
js/concepts.js          shared word lists, used as @concept in patterns
js/storage.js           progress (with save migration) and theme in localStorage
js/ui.js                timeline, dialogue view, end panels
js/portraits.js         loads portraits/<id>.svg and paints them (glyph fallback)
philosophers/index.js   the list of philosopher files
philosophers/<id>.js    one file per thinker: bio, voice and argument tree
portraits/<id>.svg      one line-art portrait per thinker
tests/                  node:test suites (npm test)
```

## Adding a philosopher

1. Copy an existing file in `philosophers/` (for example `parmenides.js`) to `philosophers/<id>.js`.
2. Add `"<id>"` to `philosophers/index.js`. The order there does not matter: the timeline is sorted by `born`.
3. Draw `portraits/<id>.svg` (see "Portraits" below).
4. Run `npm test`. The tests validate the file, play its `walkthrough`, and throw keyword dumps at every node.

Never rename or remove an existing id: saved wins are keyed by it. You can insert a thinker anywhere on the timeline; see "Saved progress" below for why that never locks anyone out.

A philosopher file exports one object:

| field | meaning |
|---|---|
| `id`, `name`, `dates`, `born` | `born` is a year, negative for BCE; it orders the timeline |
| `era`, `place`, `glyph`, `color` | timeline grouping; `color` tints the portrait, `glyph` stands in if the SVG is missing |
| `diff` (1–5), `patience` | difficulty never drops along the timeline (a test checks it) |
| `core`, `target` | what they believe, and what you must convince them of |
| `bio` | shown in the sidebar, and when you ask "who are you?" |
| `voice` | grammar rules for this thinker (see below) |
| `start`, `nodes` | the argument tree |
| `win`, `lose` | final lines (templates) |
| `walkthrough` | lines that win, one step per line; the tests use them |
| `concepts` | optional extra `@concept` word lists for this thinker only |

Each node has:

- `enter`: what they say on arriving (optional for non-start nodes)
- `stance`: one sentence for the "Where the argument stands" box
- `hints`: one or more, from gentle to explicit
- `moves`: arguments that advance. `need` is a list of keyword groups, and every group must match. `to` is a node id or `"WIN"`. `gain` is how much conviction it adds. `reply` is one template or a list of alternatives.
- `traps`: objections they have already answered. They cost `cost` patience and answer with `reply`.
- `says` (optional, on a move or trap): a few example sentences in plain words. The smart understanding uses them to recognise the same argument phrased differently. Without them it uses the walkthrough line, the node's last hint and the keywords.

Pattern syntax in `need` groups: `a|b|c` gives alternatives, `word` matches a whole word (plurals too, and one typo in words of six or more letters), `pre*` matches a prefix, `two words` matches a phrase within one clause, and `@concept` matches a word list from `js/concepts.js`.

### Voice

`addr`, `oath`, `gest`, `core` and `claim` are required. `claim` lists short restatements of their thesis, which the grammar weaves into rebuttals. `tic` (catchphrases) and `image` (signature images) are optional but make deflections sound much more like the person. You can also override any speech act for one thinker, such as `greet`, `insult`, `flatter`, `agree`, `stuffing` or `giveup`. Their own lines are preferred, and the shared ones keep variety.

## Parser

The parser works on keywords, with several guards so that keyword stuffing no longer wins:

- **Normalisation:** contractions are expanded (`can't` → `can not`), accents are stripped, and patterns are normalised the same way.
- **Clauses:** phrases never straddle punctuation.
- **Negation scope:** in "the source is *not* boundless", *boundless* does not count. The scope ends at a conjunction or the end of the clause. Moves whose own patterns are about negation are exempt.
- **Proximity:** all groups of a move must match within 25 words of each other.
- **Word forms:** "quenched", "quenching" and "quenches" all match `quench`, and "dying" matches `die`.
- **Synonyms:** a plain word in a pattern also matches its synonyms from `js/lexicon.js` ("douse" and "put out" match `extinguish*`; "limitless" matches `boundless`). Keep the sets tight: a match on one member is a match on all.
- **Typos:** one edit is tolerated in long words.
- **Stuffing detection:** a message counts as stuffed if it is a bare list of keywords with no grammar, if it hits three separate arguments or objections of the current node at once, or if it hits six separate arguments anywhere in the tree. Stuffing costs patience and never advances the argument.
- **Near misses:** half an argument gets a nudge that quotes the part you got right.

## Understanding everyday remarks

Not every sentence is an argument, and none of them should feel like a wrong guess. When no move or objection matches, `js/intents.js` works out what kind of remark it was, and the thinker answers that, in their own voice:

- greetings, thanks, apologies, goodbyes, "how are you?", laughter, and gibberish;
- "who are you?", and questions about their life ("where are you from?", "when were you born?", "what did you write?"), answered from `place`, `dates` and the bio;
- "what is your position?", "why?", "prove it", "what do you mean?", and a bare "you're wrong" or "no";
- a person they knew of, or someone born after they died ("Nietzsche? I know no one of that name"), and inventions they could never have seen ("a smartphone? Is it something to eat?");
- small talk, and a player who says they are sad or grieving;
- an argument that belongs to a later step ("one step at a time"), or one already won.

Rudeness is checked before anything else, so a good argument wrapped in abuse still gets an offended thinker and never advances. Swearing and scorn ("who cares") cost 1 patience, insults aimed at them 2, threats 3; shouting in capitals gets a wince but costs nothing. Masked spellings ("f*ck", "sh1t") count, while words that are ordinary in philosophy (hell, damnation, Buridan's ass) do not. The second offence brings a last warning, and on the third the thinker walks away and the conversation is lost.

Apart from rudeness, none of these cost patience. A sentence that is about the subject but does not make a known argument gets a reply that engages with it, and only starts to cost patience after two such tries at the same step. Only remarks that are off the subject, insults, repeats and keyword stuffing cost patience.

## Smart understanding (optional)

`js/semantic.js` can load a small sentence-embedding model (all-MiniLM-L6-v2, about 23 MB, run in the browser by transformers.js from a CDN and cached after the first visit). It compares what you wrote with example sentences for each move and objection of the current step, and for each kind of remark, so an argument counts even when it shares no keyword with the data file.

The model only reads. It never writes a reply: every line still comes from the thinker's file and the grammar, so it cannot put words in anyone's mouth. The engine keeps the last word:

- keyword stuffing is caught before the model is asked;
- a move is accepted only when the model is confident (`THRESHOLDS` in `js/semantic.js`) and the move clearly beats every other move and objection at that step;
- an argument the player denies ("the source is *not* boundless") is never accepted;
- an objection recognised this way gets the thinker's answer but costs no patience.

The model loads in the background. Until it is ready, or if it cannot load (offline, blocked, old browser), the game runs on the keyword parser and the everyday-remark rules alone. Players can switch it off with **Smart understanding** at the bottom of the timeline; the setting is stored apart from progress. Admin mode shows the model's closest match and score for every message, which is the place to tune the thresholds.

## Grammar

`js/grammar.js` is a small Tracery-style generator, extended with:

- **Moods:** composed, intrigued, wavering, impatient and irritated. Rules can have mood variants (`prod@irritated`), so rebuttals get curter as patience runs out, and softer once the thinker starts to waver.
- **Voices:** a thinker's identity rules replace the shared ones. Speech-act rules are blended with the shared ones.
- **Echoing:** the player's own clause comes back with pronouns swapped ("you are wrong" → "I am wrong"), along with a salient noun from what they said.
- **Modifiers and options:** `#echo.q#` adds quotes, `#word.a#` adds a/an, `#Rule#` capitalises, and `#?gest#` appears half the time.
- **No repeats:** recently used alternatives are avoided, an identical line is never produced twice in a row, and alternatives that need a missing variable or rule are skipped.
- **Tidying:** spacing, punctuation and sentence capitals are fixed, never inside `*gestures*`.

## Tests

```sh
npm test
```

The tests need Node 18 or newer and nothing else. They validate every data file, check that every template refers to rules that exist, play every walkthrough with several random seeds, check that keyword dumps never advance, check that each voice produces varied, fully expanded deflections and everyday replies in every mood, and check the smart understanding's safeguards with a stand-in model (the real model is never downloaded by the tests).

## Portraits

Each thinker has a stylized line-art portrait in `portraits/<id>.svg`, based on a well-known bust, painting or engraving (each file's first line says which). They appear on the timeline, in the conversation header, and larger above the bio.

Rules for a portrait (the tests check them):

- `viewBox="4 5 56 56"` on a 64-unit drawing grid; the UI crops it to a circle, so keep the head near the centre.
- Draw with `stroke="currentColor"` and `fill="none"` (or `fill="currentColor"` for small dots). No hard-coded colours, so it follows light and dark mode.
- Only plain shapes: `path`, `circle`, `ellipse`, `line`, `polyline`, `polygon`, `rect`, `g`. No scripts, links, styles or embedded images.
- Under 4 KB.

### Animation

The portraits are rigged so that faces can move. Inside the `<svg>`, everything sits in `<g class="fig">`. Inside that, the eyebrows are in `<g class="brow l">` and `<g class="brow r">`, and the eyes are in `<g class="eyes"><g class="look">…</g></g>`. `<g class="mouth">` holds five mouth shapes, `m-rest`, `m-smile`, `m-frown`, `m-flat` and `m-open`; all but `m-rest` have `opacity="0"`. A moustache can go in an optional `<g class="stache">`.

At rest a portrait breathes and blinks. Its held face follows the thinker's mood: composed, impatient, intrigued, wavering, irritated, persuaded or dismissive. Each reply also triggers a bigger reaction for about two seconds. A good argument gets astonishment and a jolt. An insult gets fury and a recoil. Keyword stuffing or repeating yourself gets a scowl and a head shake. A deflection gets a raised eyebrow and a tilt. A win gets a beaming bounce, and a loss makes them turn away. `js/portraits.js` (`reactionFor`) chooses the face and `css/style.css` draws it. With reduced motion turned on, the faces still change but nothing moves.

## Saved progress

Progress lives in `localStorage` under `dialectica.v1`, and every new version must keep it valid:

- Wins are keyed by philosopher id, so adding or reordering thinkers never loses one. A test checks that every id from older versions still exists.
- A thinker is open if it is first, if the one before it is convinced, if it or anyone later is convinced, or if it has ever been open before. The save remembers every thinker that has been open (`opened`), so inserting new thinkers between old ones never re-locks someone you had already reached.
- Older saves without `opened` are migrated on load (`migrate` in `js/storage.js`): the old unlock rule is replayed against the old timeline (`LEGACY_ORDER`). `tests/progress.test.js` covers the migration.
