/* Parmenides */
export default {
  id:"parmenides", name:"Parmenides of Elea", dates:"c. 515–450 BCE", era:"Axial Age", place:"Elea, Magna Graecia",
  diff:2, patience:9, glyph:"Π", color:"#8a7a3a", born:-515,
  core:"What is not cannot be — so change and motion are illusions.",
  target:"Change is real.",
  bio:"Parmenides wrote a poem in which a goddess shows him two roads: the Way of Truth and the Way of Opinion. From ‘what is not cannot be thought’ he concluded that being is one, eternal and unmoving. His pupil Zeno invented paradoxes to defend him. A century later Plato, in the Sophist, answered him: ‘is not’ can mean ‘is different from’.",
  voice:{
    claim:["what is, is, and cannot not be", "nothing comes from nothing", "being is one and unmoving", "change is only the opinion of mortals"],
    tic:["Judge by reason, not by the eye, #addr#.", "Two-headed mortals, wandering on the road of opinion.", "The goddess was quite clear on this."],
    image:["Being is like a well-rounded sphere, equal from the centre in every direction.", "Mortals drift along, deaf and blind, amazed."],
    addr:["youth","young one","mortal","stranger"],
    oath:["By the goddess","By Dike, who holds the keys"],
    gest:["*raises a hand like a priest*","*speaks in slow hexameter*","*closes his eyes*","*traces a perfect sphere in the air*"],
    core:["the Way of Truth","the One","what the goddess told me"],
    greet:["*inclines his head* Welcome, #addr#. You have come up the road of the daughters of the Sun. Now listen."],
    insult:["*does not open his eyes* Abuse belongs to the Way of Opinion, #addr#. It has no place on the Way of Truth."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Come, #addr#, the goddess has shown me the Way. Hear it: what is, is, and cannot not be. What is not cannot be thought or spoken. So nothing comes to be, for it would have to come from what is not. Nothing moves, for it would move into what is not. Change is a story mortals tell with their eyes. Will you trust your eyes, or reason?",
      stance:"Parmenides says only what is can be, and what is not cannot even be thought. So nothing comes into being, changes or moves.",
      hints:["Parmenides distrusts the senses, so pointing at things that move won't work. Look at his own words instead.",
             "He says ‘what is not’ cannot be thought or spoken. Yet he has just spoken of it. Point that out, or argue that ‘is not’ might only mean ‘is different’."],
      moves:[
        {need:["spoke|speak*|said|say*|saying|talk*|mention*|thought|thinking|name*|words|describ*","what is not|not being|non being|nonbeing|nothing|is not"], to:"speak", gain:35,
         reply:["*opens his eyes* You catch me speaking of what I said cannot be spoken. A fair blow, #addr#, but only to my words.",
                "#gest# I named what cannot be named. Yes. Mortal speech is clumsy, even mine."]},
        {need:["differ*|otherness|distinct*|not the same as|other than"], to:"diff", gain:45,
         reply:["#hmm# Difference? You mean that when I say ‘the cup is not the jug’, I say nothing about nothingness, only that the cup is *other* than the jug?"]}
      ],
      traps:[
        {need:["move*|moving|motion|walk*|see|seen|eyes|senses|watch*|look*|observ*|river|grow*"], cost:1,
         reply:["Do not let the eye that sees nothing, nor the echoing ear, be your guide, #addr#. Judge by reason the contested proof I have given.",
                "You point at things moving. The senses are the road of opinion. I asked you to reason."]},
        {need:["zeno|arrow|achilles|tortoise|stadium"], cost:0,
         reply:["*almost smiles* My pupil Zeno has shown that if motion were real, Achilles could never catch the tortoise. He is very proud of it. But I want *your* argument."]},
        {need:["heraclitus|flux|flow*"], cost:1,
         reply:["Heraclitus? A two-headed mortal for whom to be and not to be are the same and not the same. Do not bring his riddles here."]}
      ]
    },
    speak:{
      enter:"Words are loose, I grant you. I mean this: what is *not at all*, the sheer nothing, cannot be. And change needs that nothing. For the hot to arise, the not-hot must give way to it.",
      stance:"Parmenides says he meant ‘what is not at all’: sheer nothing. He thinks every change would need that kind of nothing.",
      hints:["Does ‘not’ always mean ‘nothing at all’? Think of the sentence ‘the cup is not the jug’.",
             "Argue that ‘is not’ can mean ‘is different from’, and that being different is not the same as being nothing."],
      moves:[
        {need:["differ*|otherness|distinct*|not the same|other than|another thing|something else"], to:"diff", gain:35,
         reply:["*is silent a long moment* ‘The cup is not the jug’ says nothing about nothing. It says the cup is *other* than the jug. So ‘not’ can name difference…"]}
      ],
      traps:[
        {need:["void|empty|emptiness|vacuum|nothingness"], cost:1,
         reply:["Nothing, the void, the empty: all names for what cannot be. You are walking the road of mortals, #addr#."]},
        {need:["move*|moving|motion|see|eyes|senses|look*"], cost:1,
         reply:["Your eyes again. I asked for reason."]}
      ]
    },
    diff:{
      enter:"Then ‘not hot’ means only ‘other than hot’. *frowns* But when water warms, the hot comes to be where it was not. Does it come from nothing, then?",
      stance:"Parmenides accepts that ‘not’ can mean ‘different’, but still worries that in change something would arise from nothing.",
      hints:["When water warms, does anything come from nothing?",
             "Argue that in change, something that already is (the water) stays, and only becomes different. Nothing is needed from nothing."],
      moves:[
        {need:["already|stays|stay|remain*|persist*|underlying|same thing|same water|continu*|still there|still exists|was there|endur*","becom*|differ*|chang*|alter*|warm*|turns|other|new"], to:"WIN"}
      ],
      traps:[
        {need:["from nothing|ex nihilo|creat*|appear*|vanish*|pop*"], cost:1,
         reply:["From nothing, nothing comes. If that is your answer, then I am right after all."]},
        {need:["move*|moving|motion|see|eyes|senses|look*"], cost:1,
         reply:["Reason, #addr#, not the eyes."]}
      ]
    }
  },
  win:"*lowers his hand* So what is stays, and only becomes other. No nothing is needed, only difference. The goddess spoke truly that nothing comes from nothing… but she never said that nothing changes. Perhaps I added that myself. Very well, #addr#: change is real. Do not tell Zeno. He has spent years proving that Achilles never catches the tortoise.",
  lose:"*closes his eyes* You keep to the road of opinion, #addr#. The goddess warned me about travellers like you.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "You just spoke about what is not, though you say it cannot be spoken.",
    "But 'is not' can mean 'is different from': the cup is not the jug.",
    "The water was already there; it stays the same water and only becomes different, from cold to hot."
  ]
};
