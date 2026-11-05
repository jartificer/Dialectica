/* Thales */
export default {
  id:"thales", name:"Thales of Miletus", dates:"c. 624–546 BCE", era:"Ancient Greece", place:"Miletus, Ionia",
  diff:1, patience:10, glyph:"Θ", color:"#2f6f8f", born:-624,
  core:"All things are made of water.",
  target:"Water cannot be the first principle of all things.",
  bio:"Often called the first philosopher. Thales looked for a natural first principle (archê) behind everything instead of explaining the world through myths. He reportedly predicted a solar eclipse, cornered the market in olive presses, and fell into a well while watching the stars.",
  voice:{
    claim:["all things are still water", "water comes first", "the sea is the mother of everything", "water still lies beneath it all"],
    tic:["Look at the sea, #addr#.", "Everything returns to the sea in the end.", "What is wetter than the beginning of things?"],
    image:["The river does not stop for a pebble.", "Even the stars drink from the sea."],
    addr:["traveller","my friend","young sailor","friend"],
    oath:["By Poseidon","By all the gods"],
    gest:["*gazes out at the harbour*","*trails a hand in the water*","*squints at the sky*","*shakes the sea-spray from his cloak*"],
    core:["my water","the claim that all is water","the primacy of water"]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Welcome, #addr#! Sit here by the harbour. Look around you: the seed is moist, our food is moist, even warmth is born of moisture. The very earth floats upon water like a log on a pond. So I say it plainly: all things are water. Tell me — does anything you see escape it?",
      stance:"Thales believes everything is water in some form: thinned into mist, thickened into earth, warmed into living things.",
      hints:["Thales sees water everywhere. Think of something that seems to be its complete opposite.",
             "Bring up fire, heat or dryness — and later ask how water could ever produce the thing that destroys it."],
      moves:[
        {need:["@fire|dry|dryness|drought|desert|arid"], to:"fire", gain:30,
         reply:["#hmm# Fire! A bold example, #addr#. But consider: the sun and the stars feed upon the vapours that rise from the sea. Fire is water's child, nourished by its breath. Can you show me otherwise?",
                "#gest# Fire, you say? Yet what does fire eat? The vapour that rises from water. The sun drinks the sea every morning. Fire is water transformed. Unless you can show me otherwise…"]},
        {need:["opposite*|contrar*|contrad*|hot and cold|wet and dry|polar*"], to:"opp", gain:45,
         reply:["#hmm# Opposites… Yes, the world is full of them: hot and cold, wet and dry, forever trading places like summer and winter."]}
      ],
      traps:[
        {need:["well|stars|olive*|eclipse|astronom*|tripod"], cost:0,
         reply:["*laughs* So you've heard the story of me tumbling into a well while watching the stars? Or my olive presses? Gossip, #addr#. Speak to the matter at hand."]},
        {need:["@earth"], cost:1,
         reply:["Earth? Stone? These are only water thickened and settled. Have you not seen the silt at the mouth of the Nile become new land? Water made solid."]},
        {need:["@air|cloud*|steam"], cost:1,
         reply:["Air is water thinned — see the mist rising from the sea at dawn. You only prove my point, #addr#."]},
        {need:["god|gods|zeus|poseidon|soul|magnet*|lodestone|alive"], cost:1,
         reply:["All things are full of gods, #addr#. Even the lodestone has a soul, for it moves iron. But none of that troubles the claim that all is water."]}
      ]
    },
    fire:{
      stance:"Thales grants that fire is the hardest case, but claims fire is fed by vapour from water, so water still comes first.",
      hints:["Water and fire don't merely differ. What does water do to fire?",
             "Point out that water puts fire out. How could water be the source of the very thing it destroys?"],
      moves:[
        {need:["@neg|destroy*|extinguish*|quench*|put out|puts out|putting out|kill*|douse*|smother*|stop*|end*|opposite*|drown*","@fire|it|opposite*"], to:"opp", gain:35,
         reply:["#gest# Water quenches fire… and yet I claim water gives birth to fire. A mother who smothers every child she bears? #hmm# You are saying that wet cannot give rise to dry, nor cold to hot — that they are opposites, each the enemy of the other."]}
      ],
      traps:[
        {need:["vapour|vapor|steam|evapor*|mist|cloud*|boil*"], cost:1,
         reply:["Exactly — steam rises and the fiery heavens drink it. You are making my argument for me, #addr#!"]},
        {need:["@earth|@air"], cost:1,
         reply:["Let us stay with fire, #addr#. You were doing so well."]}
      ]
    },
    opp:{
      enter:"#hmm# Then here is a puzzle. If the source of all things were itself wet, the wet would have swallowed the dry long ago, and there would be no fire at all. So should I trade water for some other element — air, perhaps, or fire?",
      stance:"Thales now sees a problem: any source that is one of the opposites would have overwhelmed the other side. He is wondering what else the source could be.",
      hints:["Don't just swap water for another element. That element would have an opposite too.",
             "Propose a source that is none of the opposites: boundless, unlimited, indefinite. Thales' own student Anaximander called it the apeiron."],
      moves:[
        {need:["boundless|infinite|infinity|unlimited|limitless|indefinite|apeiron|neutral|neither|none of them|none of the|no element|not an element|something else|beyond|undefined|without limit|endless|formless|anaximander|underlying"], to:"WIN"}
      ],
      traps:[
        {need:["@air|@earth|@fire|water"], cost:1,
         reply:["Then the same blade cuts again. Air is cold, fire is hot, earth is dry. Whatever element I crown, its opposite will rise against it. Name me something else, #addr#."]}
      ]
    }
  },
  win:"*is quiet for a long while, watching the waves* My student Anaximander has said this to me for years — that the source is the apeiron, the boundless, from which hot and cold, wet and dry are separated out. I called him a dreamer. Very well, #addr#. Water cannot be the first principle of all things. Go now — and mind the wells.",
  lose:"*waves you off* The tide is turning, and so is my patience. Come back when you've thought it through, #addr#.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "What about fire? Fire is hot and dry.",
    "But water puts out fire, so how could water give birth to it?",
    "Then the source must be something boundless, which is none of the opposites."
  ]
};
