# Dialectica

Argue your way through 2,500 years of philosophy. Every great thinker has a conviction they would die for; your job is to talk each of them out of it, in plain English.

Seventeen thinkers, in chronological order, get harder as you go: Thales, Heraclitus, Parmenides, Protagoras, Socrates, Plato, Aristotle, Epicurus, Marcus Aurelius, Augustine, Anselm, Descartes, Berkeley, Hume, Kant, Nietzsche and Sartre.

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
js/grammar.js           generates replies in each thinker's voice (see "Grammar")
js/concepts.js          shared word lists, used as @concept in patterns
js/storage.js           progress and theme in localStorage
js/ui.js                timeline, dialogue view, end panels
philosophers/index.js   the list of philosopher files
philosophers/<id>.js    one file per thinker: bio, voice and argument tree
tests/                  node:test suites (npm test)
```

## Adding a philosopher

1. Copy an existing file in `philosophers/` (for example `parmenides.js`) to `philosophers/<id>.js`.
2. Add `"<id>"` to `philosophers/index.js`. The order there does not matter: the timeline is sorted by `born`.
3. Run `npm test`. The tests validate the file, play its `walkthrough`, and throw keyword dumps at every node.

A philosopher file exports one object:

| field | meaning |
|---|---|
| `id`, `name`, `dates`, `born` | `born` is a year, negative for BCE; it orders the timeline |
| `era`, `place`, `glyph`, `color` | timeline grouping and portrait |
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

Pattern syntax in `need` groups: `a|b|c` gives alternatives, `word` matches a whole word (plurals too, and one typo in words of six or more letters), `pre*` matches a prefix, `two words` matches a phrase within one clause, and `@concept` matches a word list from `js/concepts.js`.

### Voice

`addr`, `oath`, `gest`, `core` and `claim` are required. `claim` lists short restatements of their thesis, which the grammar weaves into rebuttals. `tic` (catchphrases) and `image` (signature images) are optional but make deflections sound much more like the person. You can also override any speech act for one thinker, such as `greet`, `insult`, `flatter`, `agree`, `stuffing` or `giveup`. Their own lines are preferred, and the shared ones keep variety.

## Parser

The parser works on keywords, with several guards so that keyword stuffing no longer wins:

- **Normalisation:** contractions are expanded (`can't` → `can not`), accents are stripped, and patterns are normalised the same way.
- **Clauses:** phrases never straddle punctuation.
- **Negation scope:** in "the source is *not* boundless", *boundless* does not count. The scope ends at a conjunction or the end of the clause. Moves whose own patterns are about negation are exempt.
- **Proximity:** all groups of a move must match within 25 words of each other.
- **Typos:** one edit is tolerated in long words.
- **Stuffing detection:** a message counts as stuffed if it is a bare list of keywords with no grammar, if it hits three separate arguments or objections of the current node at once, or if it hits six separate arguments anywhere in the tree. Stuffing costs patience and never advances the argument.
- **Near misses:** half an argument gets a nudge that quotes the part you got right.

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

The tests need Node 18 or newer and nothing else. They validate every data file, check that every template refers to rules that exist, play every walkthrough with several random seeds, check that keyword dumps never advance, and check that each voice produces varied, fully expanded deflections in every mood.
