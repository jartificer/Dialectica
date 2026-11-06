/* Mary Astell */
export default {
  id:"astell", name:"Mary Astell", dates:"1666–1731", era:"Early modern", place:"Her house in Chelsea, London",
  diff:4, patience:7, glyph:"MA", color:"#3a5a5a", born:1666,
  core:"A wife must obey her husband, as a subject obeys the monarch: every society needs a head.",
  target:"Marriage should be a partnership of equals, not a monarchy.",
  bio:"English writer who lived independently in Chelsea and never married. In A Serious Proposal to the Ladies she argued that women's minds are as capable as men's and proposed a college where they could study, and in Some Reflections upon Marriage she warned women that a husband becomes a monarch for life. A staunch Tory and Anglican, she mocked the Whigs for praising liberty in the state while defending tyranny at home, yet she still told wives to obey. Later she helped found a charity school for girls in Chelsea.",
  voice:{
    claim:["every society needs a head", "a wife must obey once she has chosen", "marriage is a monarchy for life", "choose with care, or do not marry at all"],
    tic:["If all men are born free, #addr#, how is it that all women are born slaves?", "Souls have no sex.", "Let us reason, and leave the compliments to the coffee houses."],
    image:["A woman who marries elects a monarch for life, with no parliament to check him.", "A college in the country, where women could think without interruption."],
    addr:["madam","sir","my friend","dear reader"],
    oath:["Good Lord","Upon my word"],
    gest:["*tightens her shawl*","*lays a finger on the open prayer book*","*fixes you with a schoolmistress's look*","*pours tea with great precision*"],
    core:["order in the family","the duty of obedience","my Reflections upon Marriage"],
    greet:["*pours a second cup* Sit down. I do not receive many callers, and I prefer the ones who argue."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Every society needs a head, #addr#. A kingdom has its monarch and a family has its husband. A woman who marries gives herself a monarch for life, so she had better choose with her eyes open, or not marry at all. Once she has chosen, she must obey. I do not say it is pleasant. I say it is order.",
      stance:"Astell holds that a wife must obey her husband, as a subject obeys the monarch: order needs a head.",
      hints:["Does she think a husband's mind is better than his wife's?",
             "Point out that she herself argues that women's minds are equal to men's: souls have no sex."],
      moves:[
        {need:["mind*|soul*|reason*|intellect*|understanding","equal*|same|no sex|as good|as capable|alike"], to:"equal", gain:25,
         reply:["*sets down the teapot* Certainly they are equal."]}
      ],
      traps:[
        {need:["locke|whig*|revolution|born free"], cost:0,
         reply:["Mr Locke's friends say all men are born free. I have asked them how, then, all women are born slaves. They have not answered. Go on."]},
        {need:["college|retreat|serious proposal"], cost:0,
         reply:["My college for women: a retreat for study. That is another plan, and a good one."]},
        {need:["love|romance|passion*|courtship"], cost:1,
         reply:["Love! A man who courts with sonnets marries with orders. Do not tell me about love."]}
      ]
    },
    equal:{
      enter:"Souls have no sex. I wrote a whole book asking for a college where women could cultivate their reason. But the husband's authority does not rest on his having more reason. It is not merit. It is only convenience: someone must decide.",
      stance:"Astell agrees women's minds are equal, but says the husband's authority rests on convenience, not merit.",
      hints:["If authority is only a matter of convenience, could it be arranged differently?",
             "Argue that if authority is only a convenience, a couple could arrange it by agreement between them."],
      moves:[
        {need:["convenien*|arrang*|agree*|consent|settle*|contract","together|between|both|mutual*|couple|share*|differently|otherwise"], to:"agreement", gain:25,
         reply:["Arrange it by agreement? #hmm#"]}
      ],
      traps:[
        {need:["study|school|education|educat*"], cost:0,
         reply:["My college. Yes, I want it built. That is not marriage, #addr#."]},
        {need:["merit|deserv*|superior*"], cost:1,
         reply:["I said it is not merit. Men are not superior; they are merely in charge."]}
      ]
    },
    agreement:{
      enter:"Then there would be two heads, and a creature with two heads is a monster. Who settles it when they disagree?",
      stance:"Astell fears that shared authority means two heads and no way to settle disagreements.",
      hints:["How do two equal minds settle a disagreement elsewhere, among friends?",
             "Point out that friends with equal minds settle disagreements by reasoning together, and she calls marriage at its best a kind of friendship."],
      moves:[
        {need:["friend*|friendship|companion*","reason*|discuss*|argu*|persuad*|talk*|convinc*|settl*"], to:"friends", gain:25,
         reply:["*a pause* Friends do not obey each other."]}
      ],
      traps:[
        {need:["monster*|two heads"], cost:1,
         reply:["Two heads. A monster. As I said."]},
        {need:["king|monarch*|queen|crown"], cost:1,
         reply:["I am a Tory, #addr#. I will not hear the crown abused in this house."]}
      ]
    },
    friends:{
      enter:"They persuade. Lady Catherine and I disagree a great deal, and we settle it by argument, and neither of us is a monster. I did say that a husband ought to be a friend. I suppose I meant the friendship to stop at the church door.",
      stance:"Astell admits equal friends settle disagreements by persuasion, and that she wants husbands to be friends.",
      hints:["Why should the friendship stop at the church door?",
             "Conclude that marriage should be a partnership of equals, not a monarchy."],
      moves:[
        {need:["partner*|equals|equal*|friendship|companionship|mutual","marri*|husband|wife|wives|wedding|couple"], to:"WIN"}
      ],
      traps:[
        {need:["obey*|obedien*"], cost:1,
         reply:["Obedience is still the rule as the law stands, #addr#."]}
      ]
    }
  },
  win:"*laughs, rather to her own surprise* A Tory spinster who has spent her life telling women to beware of marriage, now persuaded that it ought to be a friendship of equals. Very well, #addr#: marriage should be a partnership of equals, not a monarchy. I shall still advise every woman I know not to try it.",
  lose:"*picks up her book* Lady Catherine is coming to tea, #addr#, and she argues much better than you. Good day.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "You argue that women's minds are equal to men's; souls have no sex.",
    "If authority is only a convenience, a couple could arrange it by agreement between them.",
    "Friends with equal minds settle disagreements by reasoning together, and you call marriage a kind of friendship.",
    "Then marriage should be a partnership of equals, not a monarchy."
  ]
};
