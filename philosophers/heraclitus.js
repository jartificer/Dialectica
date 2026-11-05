/* Heraclitus */
export default {
  id:"heraclitus", name:"Heraclitus of Ephesus", dates:"c. 535–475 BCE", era:"Axial Age", place:"Ephesus, Ionia",
  diff:1, patience:9, glyph:"Η", color:"#b4532a", born:-535,
  core:"Everything flows; nothing stays the same.",
  target:"Something in the world is permanent and unchanging.",
  bio:"‘The Obscure.’ Heraclitus wrote in riddling aphorisms and despised the opinions of ‘the many’. He taught that the world is an ever-living fire, that strife is the father of all things, and that you cannot step into the same river twice — yet all of it happens according to a hidden Logos.",
  voice:{
    claim:["all things flow", "nothing stays", "no one steps into the same river twice", "strife is the father of all"],
    tic:["Wake up, #addr#.", "The many sleep, even with their eyes open.", "Listen to the Logos, not to me."],
    image:["The road up and the road down are one and the same.", "The sun is new every day."],
    addr:["sleeper","stranger","you who listen","traveller"],
    oath:["By the dog","By the fire"],
    gest:["*stares into the fire*","*snorts*","*pokes the embers with a stick*","*smiles darkly*"],
    core:["the flux","the truth that all things flow","my river"]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"You come to me, and already you are not the one who set out. Upon those who step into the same rivers, other and yet other waters flow. All things pass; nothing stays. War is the father of all. What do you say to that, #addr#?",
      stance:"Heraclitus holds that everything is constantly changing. Nothing, not even you, stays the same from one moment to the next.",
      hints:["Look for something in Heraclitus' world that doesn't change. What about the change itself?",
             "Ask whether the pattern or law (the Logos) by which things change is itself changing."],
      moves:[
        {need:["chang*|flux|flow*|becom*|motion|movement|process","itself|always|constant*|permanent*|never stop*|forever|eternal|unchang*|same|stays|remain*|pattern*|law*|rule*|never end*|perpetual*"], to:"logos", gain:40,
         reply:["#hmm# You say the changing itself never changes… *pokes the fire* A sharper thought than I expect from the many. But be careful, #addr#: what exactly is it that stays?"]},
        {need:["river","same|name|still|identity|banks|bed|recogni*|call*|shape|course|one"], to:"river", gain:25,
         reply:["#gest# The same river? We give it one name, yet its waters are always other. It remains the river only because the flowing keeps its course."]},
        {need:["law|laws|rule*|logos|pattern*|order|measure*|principle|regular*|structure|reason|formula|cycle*|balance"], to:"logos", gain:35,
         reply:["#hmm# You are not entirely asleep, then."]}
      ],
      traps:[
        {need:["fire"], cost:0,
         reply:["Yes, fire! This world-order, the same for all, no god nor man made. It ever was, is, and will be: an ever-living fire, kindled in measures and quenched in measures. Fire is change made visible."]},
        {need:["@neg|wrong|false|disagree|nonsense","chang*|flow*|flux|everything|all"], cost:1,
         reply:["You deny that all flows? Then show me one thing that does not. Denials are cheap, #addr#."]},
        {need:["soul|self|identity|person"], cost:1,
         reply:["You would not find the limits of the soul though you travelled every road, so deep is its logos. Your soul too is a river, #addr#."]},
        {need:["stone|rock|mountain*|diamond|gold|sun"], cost:1,
         reply:["The mountain? It crumbles. The sun? It is new every day. You merely look too briefly, #addr#."]}
      ]
    },
    river:{
      stance:"Heraclitus admits the river keeps a recognisable course, but insists its waters are always new.",
      hints:["What keeps the river's course while the water changes?",
             "Name the measure, pattern or law — the Logos — that holds the river together."],
      moves:[
        {need:["measure*|pattern*|law*|order|logos|form|structure|course|bed|banks|rule*|shape|unity|balance|cycle*"], to:"logos", gain:30,
         reply:["So — not the waters, but the measure of their flowing. You are drawing near the Logos, #addr#, though you may not know its name."]}
      ],
      traps:[
        {need:["water"], cost:1, reply:["Water? It is never the same water. Look past the water."]}
      ]
    },
    logos:{
      enter:"There is a Logos — an account, a law — according to which all things come to pass. Fire is exchanged for all things and all things for fire, as goods for gold. Yet men are like sleepers; they do not see it.",
      stance:"Heraclitus says everything changes according to the Logos, the rational law of the cosmos.",
      hints:["Does the Logos itself change?",
             "Argue that the Logos is always the same — that the law of change does not itself change."],
      moves:[
        {need:["@same|@neg|unchang*","logos|law*|measure*|order|pattern*|rule*|account|it"], to:"last", gain:25,
         reply:["#gest# The Logos does not change? Hmm. Perhaps it is only how men speak about the flux — a word, and words change like everything else."]}
      ],
      traps:[
        {need:["god|gods|zeus"], cost:1, reply:["The one wise thing is unwilling and willing to be called by the name of Zeus. Do not hide behind names, #addr#."]}
      ]
    },
    last:{
      stance:"Heraclitus wavers: he suggests the Logos might just be a human way of talking about change, and words change too.",
      hints:["Is the Logos invented by people, or discovered?",
             "Remind him of his own words: the Logos holds always, whether or not men understand it — it is common to all."],
      moves:[
        {need:["@truth|before|even if|whether|regardless|independ*|common|everyone|all men|anyone|exist*|discover*|not invent*|found|holds|understand*|asleep|sleepers|awake"], to:"WIN"}
      ],
      traps:[
        {need:["word*|language|speech|name*|invent*"], cost:1, reply:["Exactly — words. Mortal words, shifting like water. You hand me my own victory, #addr#."]}
      ]
    }
  },
  win:"*laughs harshly* You quote me against myself! ‘Of this Logos, which holds always, men prove forever uncomprehending.’ Holds always… *the fire crackles* Then I concede, #addr#: in all this flowing, something abides. The measure of change is not changed. Now go before you become someone else.",
  lose:"*turns his back* You are like the many: you hear but do not understand. Go and sleep, #addr#.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "But the change itself never changes; it always follows the same pattern.",
    "The Logos itself does not change.",
    "The Logos holds whether or not anyone understands it; it was discovered, not invented."
  ]
};
