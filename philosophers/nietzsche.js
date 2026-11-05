/* Nietzsche */
export default {
  id:"nietzsche", name:"Friedrich Nietzsche", dates:"1844–1900", era:"Late modern", place:"Sils Maria, Switzerland",
  diff:5, patience:6, glyph:"N", color:"#6b2f2f", born:1844,
  core:"Pity is a weakness — slave morality that multiplies suffering.",
  target:"Compassion can be an expression of strength.",
  bio:"Classical philologist turned philosophical dynamite. Nietzsche attacked Christian and ‘herd’ morality, praised the will to power and the Übermensch, and called pity the ‘practice of nihilism’. In Turin in 1889 he is said to have embraced a horse being whipped, then collapsed into madness.",
  voice:{
    claim:["pity is a weakness", "compassion is the virtue of slaves", "pity multiplies suffering"],
    tic:["Become who you are, #addr#.", "What does not kill me makes me stronger.", "One must philosophise with a hammer."],
    image:["The herd bleats; the eagle does not ask its permission.", "Dance, #addr#, dance on the edge of the abyss."],
    addr:["little moralist","my friend","wanderer"],
    oath:["By Dionysus","Thunder and lightning"],
    gest:["*twists his enormous moustache*","*stares at the Alps*","*presses a hand to his aching head*","*laughs too loudly*"],
    core:["my critique of pity","the case against pity","what I say of pity"]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Another soul with soft eyes. You come from the herd; I can smell it. Hear me: pity is the practice of nihilism. It preserves what is ripe for destruction; it multiplies suffering; it makes the strong ashamed of their strength. Compassion is the virtue of slaves, who turned their weakness into ‘goodness’ out of ressentiment.",
      stance:"Nietzsche holds that pity and compassion are symptoms of weakness: they multiply suffering and spring from slave morality.",
      hints:["Moral sermons will bore him. Speak his language: strength, abundance, life, overflowing.",
             "Argue that giving can come from an overflowing abundance of strength — like Zarathustra's ‘gift-giving virtue’. Or remind him of the horse in Turin."],
      moves:[
        {need:["@neg|free of|free from|lacks|lacking","ressentiment|resentment|revenge*|envy|bitter*|hatred|spite"], to:"gift", gain:30,
         reply:["Compassion without ressentiment? *narrows his eyes* The compassion of one who envies no one… Go on."]},
        {need:["strong|strength|power*|abundan*|overflow*|excess|surplus|rich*|gift*|generous|generosity|giving|bestow*|plenty|noble*|overfull|surplus"], to:"gift", gain:30,
         reply:["*narrows his eyes* Zarathustra speaks of the gift-giving virtue: a soul so overfull it must spend itself, like the sun that gives light and asks nothing in return."]},
        {need:["turin|horse|embrac*|wept|weep*|cried|crying|collapse*|1889|whip*|flog*|beaten|madness"], to:"turin", gain:25,
         reply:["*his face darkens* Turin. The cab horse, beaten in the Piazza Carlo Alberto. They say I threw my arms around its neck and wept."]}
      ],
      traps:[
        {need:["kind|kindness|nice|moral|morality|christian*|jesus|god|duty|ought|right thing|golden rule|neighbour|neighbor|sin"], cost:1,
         reply:["There it is — the language of the herd. ‘Good’, ‘duty’, ‘love thy neighbour’. You preach to me in the dialect of slaves. Do you know what ‘good’ meant before the priests got hold of it?"]},
        {need:["weak*|slave*|herd"], cost:1, reply:["The weak need pity — precisely my point, #addr#. You argue for me."]},
        {need:["sister|elisabeth|wagner|lou|salom*"], cost:1, reply:["Leave my sister and Wagner out of this. *presses his temple*"]},
        {need:["god is dead|dead"], cost:1, reply:["God is dead, and we have killed him. And yet his shadow, this pity, lingers on the cave wall for a thousand years."]}
      ]
    },
    turin:{
      enter:"*long silence* That was the beginning of my collapse. Sickness, not philosophy.",
      stance:"Nietzsche dismisses his embrace of the Turin horse as sickness, not insight.",
      hints:["He calls it sickness. Was it weakness, or something else?",
             "Argue that his embrace was his body's honest instinct — and that it took strength, not weakness, to feel it so fully."],
      moves:[
        {need:["instinct*|body|honest*|true|truth|real|authentic*|heart|yourself|your own|genuine|feel|felt|natural|strength|strong|courage|power*|overflow*"], to:"gift", gain:30,
         reply:["My body… *quietly* I have always said the body is a great reason. Perhaps it knew something. But if it was anything, it was no snivelling pity. It was… an overflowing. Zarathustra calls it the gift-giving virtue."]}
      ],
      traps:[
        {need:["weak*|ill|sick*|mad|crazy|insan*"], cost:1, reply:["Yes — weakness, illness. So you agree with me. *bitterly* Thank you."]}
      ]
    },
    gift:{
      enter:"But that is not pity! Pity is suffering-with, wallowing. It makes two sufferers where there was one.",
      stance:"Nietzsche admits the strong may give from overflowing abundance, but insists that this is not pity, which is ‘suffering-with’.",
      hints:["So he admits a strong kind of giving. Could there be a strong kind of compassion too?",
             "Distinguish two kinds of compassion: one that wallows in shared suffering, and one that comes from strength."],
      moves:[
        {need:["two kinds|kinds|kind of|different|differen*|distinguish*|distinct*|not all|not the same|another|other kind|type*|sort*|forms of|version*|varieties","compassion|pity|mitleid|kindness|care|caring|help*|sympath*|empath*"], to:"kinds", gain:25,
         reply:["#hmm# Two compassions…"]},
        {need:["hard bed|camp bed|field bed|friend*"], to:"kinds", gain:25,
         reply:["‘Be a hard bed for your friend, a field bed’ — yes, I wrote that. A compassion with hardness in it…"]}
      ],
      traps:[
        {need:["suffer*|pain"], cost:1, reply:["Suffering, suffering! You want to abolish it. I want it — it is the discipline that has created every elevation of humanity."]}
      ]
    },
    kinds:{
      enter:"One compassion drags down: it sinks into another's misery and calls its weakness love. And one that… *paces* …one that looks at suffering the way a sculptor looks at marble?",
      stance:"Nietzsche is exploring two kinds of compassion: one that drags down, and one that might shape and raise the sufferer.",
      hints:["What does the strong kind of compassion *do* for the sufferer?",
             "Say it helps the other grow, overcome and become stronger — it affirms life instead of preserving weakness."],
      moves:[
        {need:["affirm*|amor fati|overman|ubermensch|übermensch|uebermensch|creat*|rais*|lift*|grow*|stronger|strengthen*|elevat*|overcom*|life|empower*|become|flourish*|heal*|stand|sculpt*|shape|build*|rise"], to:"WIN"}
      ],
      traps:[
        {need:["comfort*|sooth*|consol*|share their pain|feel their pain|feel sorry"], cost:1,
         reply:["Comfort? Soothing? That is the first compassion — the one I spit on."]}
      ]
    }
  },
  win:"*is silent for a long time, then laughs — a loud, unhinged, joyful laugh* A compassion that does not wallow but *lifts*; that says to the sufferer: you will become more than this. A compassion that says yes to life, a gift from an overflowing cup! Then the strong may feel compassion, and the compassion may be their strength. Fine. FINE! I concede, #addr#: compassion can be an expression of strength. Write it down before I come to my senses — and do not let my sister edit it.",
  lose:"*turns toward the mountains* Go back to your herd, #addr#. I need altitude.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "Compassion can come from strength, an overflowing abundance that gives freely.",
    "There are two kinds of compassion: one that wallows and one that comes from strength.",
    "The strong kind helps the sufferer grow stronger and overcome their suffering."
  ]
};
