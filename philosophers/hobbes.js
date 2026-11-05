/* Hobbes */
export default {
  id:"hobbes", name:"Thomas Hobbes", dates:"1588–1679", era:"Early modern", place:"Exile in Paris",
  diff:4, patience:7, glyph:"Hb", color:"#4a4a3a", born:1588,
  core:"Without an absolute sovereign, life is solitary, poor, nasty, brutish and short; subjects may never rightfully resist the sovereign.",
  target:"Subjects may rightfully resist a sovereign who threatens them.",
  bio:"English philosopher who said that his mother, frightened by the Spanish Armada, gave birth to twins: himself and fear. Watching England slide into civil war, he wrote Leviathan, arguing that without a common power to keep them in awe people live in a war of every one against every one, and that reason tells them to give up their rights to an absolute sovereign.",
  voice:{
    claim:["the sovereign's power must be absolute", "subjects may not resist the sovereign", "covenants without the sword are but words", "without a common power there is war of every man against every man"],
    tic:["Fear and I were born twins.", "The life of man, #addr#: solitary, poor, nasty, brutish, and short.", "Words are wise men's counters; they are the money of fools."],
    image:["The commonwealth is a great Leviathan, an artificial man, made of all the men in it.", "When going to sleep, men lock their chests, even in their own house."],
    addr:["sir","my friend","good sir","young man"],
    oath:["By God's wounds","Fie"],
    gest:["*taps the frontispiece of Leviathan*","*plays a few notes on his bass viol*","*glances at the door, as if for assassins*","*adjusts his hat against the draught*"],
    core:["the absolute sovereign","the Leviathan","my civil science"],
    greet:["*eyes you warily* You are not from Parliament? Good. Sit."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Take away the common power, and what are men? Each fears the other, each strikes first. No industry, no arts, no letters, no society; and the life of man solitary, poor, nasty, brutish, and short. Therefore men covenant to give all their rights to one sovereign, and once that is done, the subject may never resist him. Rebellion only brings back the war.",
      stance:"Hobbes argues that only an absolute sovereign saves us from the war of all against all, so subjects may never resist.",
      hints:["Why, on his own story, did anyone set up a sovereign in the first place?",
             "Say that people only set up a sovereign in the first place to keep themselves safe."],
      moves:[
        {need:["set up|created|create*|establish*|chose|choose|agree*|contract|covenant|consent*|why|reason|purpose|made","safe*|security|protect*|peace|preserv*|life|lives|surviv*"], to:"contract", gain:25,
         reply:["#gest# To be safe. Precisely so."]}
      ],
      traps:[
        {need:["nasty|brutish|solitary|state of nature|wolf|wolves"], cost:1,
         reply:["Solitary, poor, nasty, brutish and short. You quote me to me, sir."]},
        {need:["god|bible|scripture|divine right"], cost:1,
         reply:["I ground the sovereign in covenant, not in Scripture. Leave the clergy out of it."]},
        {need:["civil war|cromwell|charles|parliament|king*|exile*"], cost:0,
         reply:["I was the first of all that fled. *coughs* A wise man leaves before the shooting. Go on."]},
        {need:["fear|twin*|armada"], cost:0,
         reply:["Fear and I were born twins. That is a fact, not an argument. Go on."]}
      ]
    },
    contract:{
      enter:"Exactly. And to be safe, men laid down their right to all things and gave it to one man or one assembly. A covenant without the sword is but words. Once made, you cannot take back what you gave.",
      stance:"Hobbes says people gave up all their rights to the sovereign for safety, and cannot take them back.",
      hints:["Could anyone give away everything, even the right to protect their own life?",
             "Ask whether anyone could give up the right to defend their own life."],
      moves:[
        {need:["give up|give away|gave up|gave away|transfer*|surrender*|hand over|sign away|lay down|lays down","own life|their life|their lives|right to life|self defen*|defend*|resist death|kill*|death|lives|life"], to:"life", gain:25,
         reply:["*grudgingly* No. No one can."]}
      ],
      traps:[
        {need:["sword|absolute|leviathan"], cost:1,
         reply:["The sword, the Leviathan. Yes. That is my point, sir."]}
      ]
    },
    life:{
      enter:"A covenant not to defend myself from force is always void. If the sovereign commands a man to kill himself, he may disobey. The condemned man may resist the guards who lead him to the scaffold. But that is one man's private liberty, not a right of subjects against the state.",
      stance:"Hobbes admits no one can give up the right to defend their own life, but calls it one person's private liberty, not a right of subjects.",
      hints:["What if it is not one man the sovereign threatens, but many?",
             "Say that if the sovereign threatens many subjects at once, they may defend themselves together."],
      moves:[
        {need:["many|several|group|together|all|whole|everyone|crowd|band|town|thousands","threat*|attack*|kill*|persecut*|massacre*|danger|endanger*|defend*|resist*"], to:"band", gain:25,
         reply:["#hmm# Many at once… I wrote about that too, I am afraid."]}
      ],
      traps:[
        {need:["condemned|guard*|scaffold|prison*|criminal*"], cost:1,
         reply:["Yes, the condemned man. I already granted it. What of it?"]}
      ]
    },
    band:{
      enter:"Those who have already resisted, and expect death for it, may join together and defend one another. I wrote that in chapter twenty-one. *grimly* But then we are back in the war of every man against every man.",
      stance:"Hobbes grants that threatened subjects may band together in self-defence, but fears this means a return to war.",
      hints:["What did he say is the whole point, the ‘end’, of obedience?",
             "Remind him he said the end of obedience is protection: a sovereign who threatens his subjects has broken the bargain."],
      moves:[
        {need:["protect*|protection|safety|security|peace|preserv*","end*|ceas*|stop*|fail*|lose|lost|threat*|purpose|reason|point|as long as|exchange|bargain|deal|broken|break*"], to:"WIN"}
      ],
      traps:[
        {need:["anarchy|chaos|war"], cost:1,
         reply:["Yes, war. I fear it more than anything. That does not answer me."]}
      ]
    }
  },
  win:"*long silence; he sets down the viol* I wrote it myself, in chapter twenty-one: subjects owe obedience only for as long as the sovereign can protect them. The end of obedience is protection. A sovereign who turns his sword on his own people has stopped being their protector. Very well, #addr#: subjects may rightfully resist a sovereign who threatens them. Do not tell the King I said so.",
  lose:"*stands, looking at the door* I think I hear someone on the stair. You had best go, sir. So had I.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "People only set up a sovereign in the first place to keep themselves safe.",
    "But could anyone give up the right to defend their own life?",
    "And if the sovereign threatens many subjects at once, they may defend themselves together.",
    "You said yourself the end of obedience is protection; a sovereign who threatens his subjects has broken the bargain."
  ]
};
