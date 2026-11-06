/* Christine de Pizan */
export default {
  id:"pizan", name:"Christine de Pizan", dates:"1364–c. 1430", era:"Middle Ages", place:"Her writing room in Paris",
  diff:4, patience:7, glyph:"CP", color:"#6a3a6a", born:1364,
  core:"Subjects must never rise against their prince: rebellion only sickens the body politic.",
  target:"Subjects may rightly resist a ruler who betrays the common good.",
  bio:"Born in Venice and raised at the French court, where her father was astrologer to King Charles V. Widowed at twenty-five with children and a mother to support, she became perhaps the first woman in Europe to earn her living by writing. In The Book of the City of Ladies she builds an allegorical city of women to answer the men who slandered them, and in The Book of the Body Politic she tells princes, knights and common people how a realm keeps its order. Her last work, written in a convent in 1429, celebrates Joan of Arc.",
  voice:{
    claim:["the body politic must keep its order", "rebellion only sickens the realm", "subjects owe their prince obedience", "peace is the greatest good of a kingdom"],
    tic:["I write to earn my bread, #addr#, and I write well.", "A widow learns quickly what the law is worth.", "Let us not argue like schoolmen, but like sensible people."],
    image:["A body whose feet march off without the head.", "A shepherd and his flock: one keeps, the others follow."],
    addr:["dear friend","good friend","my lord","my lady"],
    oath:["Holy Virgin","By Saint Denis"],
    gest:["*smooths a page of vellum*","*sets down her quill*","*glances at the illuminated initial she is checking*","*folds her hands in her lap, very upright*"],
    core:["the good order of the realm","my Book of the Body Politic","obedience to the prince"],
    greet:["*looks up from her desk* Come in, and mind the ink. Dukes pay me to write; you may have my opinions for nothing."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"A realm is a body, #addr#. The prince is the head, the knights are the hands, the common people the legs and feet. If the feet rise against the head, the whole body falls in the mud. I have seen the Paris mobs, the butchers in the streets with their white hoods. Nothing good comes of rebellion. Subjects must obey, and pray for a better prince.",
      stance:"Christine holds that subjects must never rise against their prince: rebellion only sickens the body politic.",
      hints:["Whom did she celebrate in her very last poem?",
             "Bring up her poem in praise of Joan of Arc, who took up arms."],
      moves:[
        {need:["joan|jeanne|maid|pucelle|orleans","poem|ditie|prais*|celebrat*|wrote|song|arms|fought|fight*|sword"], to:"joan", gain:25,
         reply:["*her face lights up* Joan! The Maid. You have read my little poem."]}
      ],
      traps:[
        {need:["head|body|feet|limb*|member*"], cost:1,
         reply:["The body politic, yes. Every part in its place. You are repeating me, #addr#."]},
        {need:["cabochien*|butcher*|mob|riot*"], cost:1,
         reply:["I watched them from my window. Tell me they were wise."]},
        {need:["women|ladies|city of ladies|lady|slander*"], cost:0,
         reply:["My City of Ladies is another argument, and I won that one. Today we speak of princes."]}
      ]
    },
    joan:{
      enter:"But Joan did not rebel! She fought for the rightful king, Charles, against the English who would steal France. A shepherd girl of seventeen, leading him to his crowning at Reims. She obeyed God and her lawful lord.",
      stance:"Christine says Joan was no rebel: she fought for the rightful king against usurpers.",
      hints:["Who had disinherited Charles, and by what document?",
             "Remind her that the Treaty of Troyes, sealed by the old king of France himself, disinherited Charles; Joan defied it."],
      moves:[
        {need:["troyes|treaty|old king|his father|disinherit*|sealed|signed","defied|defy|against|broke|ignor*|resist*|overturn*|undid"], to:"troyes", gain:25,
         reply:["*a long silence* The treaty."]}
      ],
      traps:[
        {need:["english|henry|burgund*|usurp*"], cost:1,
         reply:["Usurpers. That is exactly my point, #addr#."]},
        {need:["voice*|saint*|michael|catherine|angel*"], cost:0,
         reply:["Her voices are a matter for the doctors of theology. I am a poet."]}
      ]
    },
    troyes:{
      enter:"King Charles the Sixth sealed it with his own hand, poor mad man, and gave France to the English and their heirs. So by the letter of obedience, Joan defied her sovereign's own word. I said it was holy work. I still say so. But then it was not obedience I was praising.",
      stance:"Christine admits Joan defied the crown's own treaty, and that it was not obedience she praised.",
      hints:["What did Joan serve, if not the command of the crown?",
             "Argue that even if the old king had been well, a treaty handing France to its enemies would not bind: what makes a command binding is the common good it serves."],
      moves:[
        {need:["common good|common profit|good of|welfare|justice|people|kingdom|realm|france|country","serv*|binding|bind*|legitim*|depend*|measur*"], to:"good", gain:25,
         reply:["*sets down her quill* The common profit. #hmm#"]}
      ],
      traps:[
        {need:["mad|madness|ill|illness|sick*"], cost:1,
         reply:["Mad, yes, God rest him. That is a pity, #addr#, not a principle."]}
      ]
    },
    good:{
      enter:"In my Body Politic I told princes that they rule for the good of their people, the common profit, as a shepherd keeps his sheep. And a shepherd who sells his flock to the wolves… is he still a shepherd?",
      stance:"Christine grants that a prince rules for the common good, and wonders whether one who betrays it still rules rightly.",
      hints:["What may the flock do, then?",
             "Conclude that subjects may rightly resist a ruler who betrays the common good."],
      moves:[
        {need:["resist*|rise|rising|disobey*|refus*|oppos*|defy|stand against|rebel*","rightly|right|just|justly|may|permit*|allowed|lawful*|legitim*"], to:"WIN"}
      ],
      traps:[
        {need:["wolf|wolves|sheep|shepherd*|flock"], cost:1,
         reply:["My own figure, #addr#. Use it, do not simply repeat it."]}
      ]
    }
  },
  win:"*puts down her pen and laughs, a little shakily* Thirty years telling the people of Paris to sit still, and my last poem is a hymn to a girl who would not. Very well, #addr#: subjects may rightly resist a ruler who betrays the common good. I will add, as a widow who has fought a great many lawsuits, that they had better be very sure.",
  lose:"*returns to her manuscript* The Duke expects his book by Michaelmas, #addr#, and the Duke pays. Good day.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "You wrote a poem in praise of Joan of Arc, who took up arms.",
    "The Treaty of Troyes, sealed by the old king himself, disinherited Charles, and Joan defied it.",
    "Even if the old king had been well, a treaty handing France to its enemies would not bind; what makes a command binding is the common good it serves.",
    "Then subjects may rightly resist a ruler who betrays the common good."
  ]
};
