/* Rawls */
export default {
  id:"rawls", name:"John Rawls", dates:"1921–2002", era:"20th century", place:"Emerson Hall, Harvard",
  diff:5, patience:5, glyph:"JR", color:"#2f4a6a", born:1921,
  core:"Inequalities are just only if they work to the benefit of the least advantaged.",
  target:"Inequalities that arise from free exchanges can be just, even if they do not help the worst off.",
  bio:"American philosopher who taught at Harvard for nearly forty years. A Theory of Justice, published in 1971, revived political philosophy in the English-speaking world. It asks what principles people would choose behind a 'veil of ignorance', not knowing whether they would be rich or poor, talented or not, and answers: equal basic liberties for all, and inequalities only when they benefit the least advantaged. He served as an infantryman in the Pacific during the Second World War, and seeing the ruins of Hiroshima shaped his later thinking on just war.",
  voice:{
    claim:["inequalities must benefit the least advantaged", "no one deserves their place in the natural lottery", "justice is the first virtue of social institutions", "behind the veil of ignorance, no one would gamble on being the worst off"],
    tic:["Let us reason from the original position, #addr#.", "Justice is fairness.", "We seek a reflective equilibrium."],
    image:["A table of strangers deciding the rules before anyone knows which seat is theirs.", "The natural lottery: talents handed out like cards, and no one earned their hand."],
    addr:["my friend","colleague","friend","my student"],
    oath:["Well, now","Goodness"],
    gest:["*adjusts his tie*","*writes a principle on the blackboard*","*pauses, stammering a little, and starts again*","*steeples his fingers*"],
    core:["justice as fairness","the difference principle","the original position"],
    greet:["*looks up from a stack of drafts* Hello. Do sit down. I am revising a chapter, as usual."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Imagine choosing the rules of your society behind a veil of ignorance, #addr#: you do not know whether you will be born rich or poor, gifted or not. You would secure equal basic liberties, and you would allow inequalities only where they make the worst off better off than they would otherwise be. Anything else is a gamble no reasonable person would take with their whole life.",
      stance:"Rawls holds that inequalities are just only if they benefit the least advantaged.",
      hints:["Start from a society that matches his principles exactly. Now let one famous athlete charge fans a little extra to watch him play. What happens?",
             "Point out that if a million fans freely pay a basketball star to watch him, he grows rich and the inequality comes from free choices alone."],
      moves:[
        {need:["chamberlain|basketball|fans|athlete|star|ticket*|player","freely|free|chose|choose|voluntar*|pay|pays|paid|exchange*"], to:"wilt", gain:25,
         reply:["*steeples his fingers* The basketball player. Bob Nozick's example, down the corridor."]}
      ],
      traps:[
        {need:["utilitar*|average|greatest happiness|sum of"], cost:1,
         reply:["Utilitarianism adds up happiness and forgets who has it. I spent the whole book answering it, #addr#."]},
        {need:["original position|veil"], cost:1,
         reply:["My own device. You are describing it back to me."]},
        {need:["vietnam|draft|army|war|pacific|hiroshima"], cost:0,
         reply:["I served in the Pacific, and I saw Hiroshima afterwards. That is not our subject today."]}
      ]
    },
    wilt:{
      enter:"Yes, and he ends up far richer than anyone else. But justice applies first to the basic structure of society, not to each transaction. Background institutions, taxes and transfers, keep the overall distribution fair while people trade as they like.",
      stance:"Rawls says justice concerns the basic structure, which taxes and transfers keep fair while people trade freely.",
      hints:["How often would those institutions have to step in, and against what?",
             "Argue that keeping the pattern means constantly taxing or forbidding free choices: liberty upsets patterns."],
      moves:[
        {need:["interfer*|forbid*|stop*|tax|taxes|taxing|taxation|redistribut*|taking|constant*","liberty|freedom|choice|choices|free"], to:"liberty", gain:25,
         reply:["*adjusts his tie* Liberty upsets patterns. #hmm#"]}
      ],
      traps:[
        {need:["basic structure|institution*"], cost:1,
         reply:["The basic structure. Yes, my point, #addr#."]},
        {need:["nozick|bob|libertarian*"], cost:0,
         reply:["Bob and I get along very well. We simply disagree about almost everything."]}
      ]
    },
    liberty:{
      enter:"But the liberties I protect are the basic ones: conscience, speech, the person, political participation. Owning productive property without limit is not among them. And no one deserves their talents: they come from a natural lottery. So taxing what those talents earn is not theft. We treat the distribution of talents as a common asset.",
      stance:"Rawls says unlimited property is not a basic liberty, and that talents are a common asset from a natural lottery.",
      hints:["He criticised utilitarianism for ignoring that persons are distinct. Does treating talents as a common asset respect that?",
             "Point out that treating people's talents as a common asset ignores the separateness of persons, the very thing he accused utilitarianism of ignoring."],
      moves:[
        {need:["separate*|separateness|distinct*|individual*|own|owns|self ownership","person*|people|kant*|utilitar*|talent*|means"], to:"separate", gain:25,
         reply:["*a long pause, and a small stammer* The separateness of persons."]}
      ],
      traps:[
        {need:["lottery|luck|deserv*|arbitrar*"], cost:1,
         reply:["Talents are arbitrary from a moral point of view. Yes. I wrote that, #addr#."]}
      ]
    },
    separate:{
      enter:"I used that charge against the utilitarians, who would sacrifice one person for a larger sum. And you turn it back on me: if my talents are a common asset, am I quite my own? I still think the worst off have a claim on us. But perhaps not a claim on every fruit of every free exchange.",
      stance:"Rawls admits that treating talents as a common asset sits uneasily with the separateness of persons.",
      hints:["So can an inequality be just even when it does not help the worst off?",
             "Conclude that inequalities arising from free exchanges can be just, even if they do not help the worst off."],
      moves:[
        {need:["inequalit*|unequal|rich*|wealth|holdings","just|fair|legitimate|permissible|allowed"], to:"WIN"}
      ],
      traps:[
        {need:["equilibrium|intuition*"], cost:1,
         reply:["Reflective equilibrium: we adjust principles and judgements until they fit. I am doing it right now, #addr#."]}
      ]
    }
  },
  win:"*puts down his chalk and smiles* Very well, #addr#. Inequalities that arise from free exchanges can be just, even when they do not help the worst off, at least once a fair background is in place. I shall have to revise a chapter. I am always revising a chapter. Don't tell Bob too quickly.",
  lose:"*gathers his drafts* I have a seminar, #addr#, and a chapter that needs its fourth revision. Another time.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "If a million fans freely pay a basketball star to watch him play, he grows rich from free choices alone.",
    "Keeping your pattern means constantly taxing or forbidding people's free choices: liberty upsets patterns.",
    "Treating talents as a common asset ignores the separateness of persons, which you accused utilitarianism of ignoring.",
    "Then inequalities that arise from free exchanges can be just, even if they do not help the worst off."
  ]
};
