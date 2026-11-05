/* Descartes */
export default {
  id:"descartes", name:"René Descartes", dates:"1596–1650", era:"Early modern", place:"The Netherlands",
  diff:4, patience:7, glyph:"D", color:"#5a5f6e", born:1596,
  core:"The mind is a thinking substance, wholly distinct from the body.",
  target:"The mind is not a substance separate from the body.",
  bio:"Soldier, mathematician (the Cartesian plane is his) and father of modern philosophy. In the Meditations he doubts everything until he reaches ‘I think, therefore I am’, and concludes that mind and body are two different substances. Princess Elisabeth of Bohemia asked him the question he never answered.",
  voice:{
    claim:["the mind is a thinking thing, distinct from the body", "I am a thinking thing", "the body is a machine of extended matter"],
    tic:["Let us proceed in order, #addr#.", "Clearly and distinctly, now.", "Doubt it, if you can."],
    image:["Even a demon could not make me doubt that I doubt."],
    addr:["my friend","my good critic","my sceptical friend"],
    oath:["Mon Dieu","Par Dieu"],
    gest:["*warms his hands by the stove*","*adjusts his wig*","*taps a page of the Meditations*","*raises a sceptical eyebrow*"],
    core:["my dualism","the distinction of mind and body","the thinking substance"]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Come, sit by my stove. I resolved to doubt everything that can be doubted. I can doubt that I have a body — perhaps a demon deceives me. But I cannot doubt that I am thinking. Cogito, ergo sum. Therefore I am a thinking thing, wholly distinct from my body, which is a mere machine of extended matter.",
      stance:"Descartes argues mind and body are two different substances: an unextended thinking thing, and an extended, unthinking machine.",
      hints:["If mind and body are completely different kinds of thing, how do they affect each other?",
             "Ask how an immaterial mind moves a material arm. Or point out that being able to doubt your body doesn't prove you aren't your body. Or bring up what happens to minds when brains are injured."],
      moves:[
        {need:["brain|damage*|injur*|drunk*|wine|alcohol|drug*|sleep*|anaesthe*|anesthe*|lesion|concuss*|dementia|alzheimer*|fever|blow to the head|head injury|neuron*"], to:"brain", gain:30,
         reply:["#hmm# The brain and its afflictions."]},
        {need:["doubt*|imagin*|conceiv*","@neg|mean|follow*|prove*|imply|implies|show*|necessarily|just because|only shows|ignoran*|know|reveal*"], to:"conceive", gain:25,
         reply:["#hmm# You say: from my being able to doubt my body but not my mind, it does not follow that they are different things."]},
        {need:["interact*|move*|moving|cause*|affect*|influenc*|push*|touch*|control*|connect*|communicat*|how does|how do|how can|lift|arm|raise|act on|together"], to:"inter", gain:25,
         reply:["#gest# How do they act on each other? I have an answer for that."]}
      ],
      traps:[
        {need:["god|demon|evil genius|deceiv*|dream*"], cost:1,
         reply:["God is no deceiver — that is how I recover the world after my doubt. But it does not touch the distinction between mind and body, #addr#."]},
        {need:["animal*|dog*|automat*|clock*|robot*|computer*|machine*"], cost:1,
         reply:["Animals are automata — clocks of flesh. Only humans have a thinking soul, as language proves. That only strengthens my case."]},
        {need:["cogito|i think|therefore i am"], cost:1, reply:["The cogito stands, #addr#. Even a demon cannot make me doubt that I doubt. Attack the conclusion, not the foundation."]}
      ]
    },
    conceive:{
      enter:"But what I can clearly and distinctly conceive apart, God can create apart. So the mind can exist without the body, and they are distinct.",
      stance:"Descartes says that because he can clearly conceive the mind without the body, they really can exist apart.",
      hints:["Can you conceive of two things apart that are actually one and the same?",
             "Give an example: someone can believe Superman isn't Clark Kent, or that water isn't H2O, or that the morning star isn't the evening star — and be wrong. Conceiving may reflect ignorance."],
      moves:[
        {need:["superman|clark|kent|morning star|evening star|venus|hesperus|phosphorus|h2o|mask*|lois|identical|same thing|same person|same object|alias|ignoran*|don't know|dont know|incomplete|unaware|lack of knowledge|disguise*|pseudonym|identity"], to:"incomplete", gain:25,
         reply:["The masked man… A man may know his father yet not know the masked man, though the masked man *is* his father. *frowns* So my clear idea of the mind may be clear only because it is incomplete."]}
      ],
      traps:[
        {need:["god"], cost:1, reply:["God's power is not in question, #addr#. What is in question is whether my conception is adequate. Show me it is not."]}
      ]
    },
    incomplete:{
      enter:"Granted, perhaps. But you have not shown that the mind *depends* on the body — only that I might be ignorant of the link.",
      stance:"Descartes concedes his idea of the mind might be incomplete, but says you haven't shown that the mind depends on the body.",
      hints:["What evidence shows that thinking depends on the body?",
             "Bring up brain injuries, alcohol, drugs or sleep — things that change thinking by changing the brain. Or ask how mind and body could interact at all."],
      moves:[
        {need:["brain|damage*|injur*|drunk*|wine|alcohol|drug*|sleep*|anaesthe*|anesthe*|lesion|concuss*|dementia|alzheimer*|fever|blow|neuron*"], to:"brain", gain:30, reply:["#hmm# The brain and its afflictions."]},
        {need:["interact*|move*|cause*|affect*|influenc*|push*|touch*|control*|how does|how do|how can|act on"], to:"inter", gain:20, reply:["How they act on one another? I have an answer."]}
      ],
      traps:[]
    },
    inter:{
      enter:"The soul is joined to the body at the pineal gland, in the middle of the brain. The soul inclines the gland, the animal spirits flow through the nerves, and the arm moves.",
      stance:"Descartes claims the immaterial soul acts on the body through the pineal gland in the brain.",
      hints:["The pineal gland is a physical thing. How does something with no size or location push it?",
             "Press him: an unextended, immaterial mind cannot push anything. Princess Elisabeth of Bohemia asked exactly this."],
      moves:[
        {need:["unextended|no extension|not extended|immaterial|nonphysical|non physical|non-physical|no size|no mass|no body|not physical|no location|no shape|without body|contact|elisabeth|no force|no energy"], to:"elis", gain:30,
         reply:["#gest# Princess Elisabeth asked me the very same thing: how can the soul, being only a thinking substance, move the bodily spirits?"]},
        {need:["gland|pineal|it","physical|material|matter|extended|body|flesh|organ|tissue"], to:"elis", gain:30,
         reply:["The gland is matter, yes, and the soul is not… Princess Elisabeth pressed me on exactly that point."]}
      ],
      traps:[
        {need:["spirits|nerves|animal spirits"], cost:1, reply:["The animal spirits are only a very fine wind of blood. Perfectly mechanical. The question is not there, #addr#."]}
      ]
    },
    elis:{
      enter:"I told her the union of mind and body is a primitive notion, known through the senses rather than the intellect. One simply feels it. *shifts uncomfortably*",
      stance:"Descartes answers the interaction problem by calling the mind–body union a ‘primitive notion’ that we just feel.",
      hints:["That's not an explanation. Show instead that the mind depends on the brain.",
             "Point to evidence: brain injuries, drugs, alcohol or sleep change thinking itself."],
      moves:[
        {need:["brain|damage*|injur*|drunk*|wine|alcohol|drug*|sleep*|anaesthe*|anesthe*|lesion|concuss*|dementia|alzheimer*|fever|blow|neuron*"], to:"brain", gain:25, reply:["#hmm# The brain and its afflictions."]}
      ],
      traps:[
        {need:["explain*|explanation|nothing|evasion|evade|dodge*|no answer|mystery|magic|cop out|avoid*"], cost:0,
         reply:["You say that explains nothing. Perhaps. Then show me that the mind depends on the body, rather than merely that I describe their union poorly."]}
      ]
    },
    brain:{
      enter:"Wine clouds judgment, fever brings delirium, a blow to the head and a man forgets. I grant all this. But it shows only that the body can disturb the soul's instrument — as a broken lute spoils the music, not the musician. The pure intellect itself, reasoning and mathematics, needs no brain.",
      stance:"Descartes says brain damage only disturbs the soul's ‘instrument’, not the pure intellect itself — like a broken lute and its musician.",
      hints:["Is it only senses and passions that injuries affect — or reasoning too?",
             "Argue that brain damage changes reasoning, memory, personality and judgement themselves: the musician, not just the lute."],
      moves:[
        {need:["reason*|think*|thought*|memor*|personalit*|character|logic*|math*|calculat*|intellect|judgment|judgement|decision*|self|who you are|mind itself|conscious*|will|musician|values|beliefs","chang*|lose|lost|loses|destroy*|alter*|damag*|affect*|impair*|gone|disappear*|vanish*|stop*|break*|broken|depend*|different person|transform*|erase*|wipe*"], to:"final", gain:25,
         reply:["*stares into the stove* A man with an injured brain does not merely play badly — he becomes another musician. His reasoning itself, his very character, is altered. Then the ‘pure intellect’ I thought untouched…"]}
      ],
      traps:[
        {need:["lute|instrument|music*|music"], cost:1, reply:["Yes — the instrument. You repeat my image back to me, #addr#. Show me the musician is harmed."]}
      ]
    },
    final:{
      stance:"Descartes admits reasoning itself changes when the brain changes. He is wondering what work is left for a separate soul.",
      hints:["If everything the mind does depends on the brain, what is left for a separate soul to do?",
             "Appeal to simplicity: why posit two substances when one explains everything? (Ockham's razor.)"],
      moves:[
        {need:["simpl*|ockham|occam|parsimon*|unnecessar*|no need|needless|redundant|why two|one substance|single|same thing|identical|one thing|is the brain|just the brain|brain is|depends entirely|nothing left|no work|no role|extra|superfluous|no reason"], to:"WIN"}
      ],
      traps:[
        {need:["soul|immortal*|afterlife|heaven"], cost:1, reply:["If the soul is the brain, what becomes of immortality? That frightens me more than any demon. But fear is not an argument, #addr#. Give me one."]}
      ]
    }
  },
  win:"*closes the Meditations* If every operation of the mind can be broken by breaking the brain, then the second substance does no work, and a wise man does not multiply substances without need. Elisabeth, you were right. I concede, #addr#: the mind is not a substance separate from the body. Now let me sit by my stove and doubt that I ever said so.",
  lose:"*turns back to his stove* I have resolved to doubt everything — and I find I can easily doubt you, #addr#. Good day.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "How does an immaterial mind move a physical arm?",
    "But a mind with no extension could not push a gland.",
    "Brain damage changes how people think.",
    "A brain injury changes a person's reasoning and character, not just their senses.",
    "Then why posit two substances? One is simpler; the mind is just the brain."
  ]
};
