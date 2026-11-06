/* Wollstonecraft */
export default {
  id:"wollstonecraft", name:"Mary Wollstonecraft", dates:"1759–1797", era:"Enlightenment", place:"Newington Green, London",
  diff:5, patience:6, glyph:"W", color:"#7a3a5a", born:1759,
  core:"Reason is what makes us human. Women must be educated to reason, and feeling must always be governed by it.",
  target:"Feeling is essential to a good life, not just a servant of reason.",
  bio:"Writer, teacher and reviewer who ran a school at Newington Green, travelled to revolutionary Paris, and answered Edmund Burke in A Vindication of the Rights of Men. In A Vindication of the Rights of Woman she argued that women only seem weaker in mind because they are trained in ‘sensibility’ instead of reason. Her later letters from a journey through Scandinavia are full of feeling, and she died soon after giving birth to her daughter Mary.",
  voice:{
    claim:["reason is what makes us human", "the passions must be governed by reason", "women are weak only because they are taught to be", "virtue rests on understanding, not on feeling"],
    tic:["I do not wish women to have power over men, but over themselves.", "Strengthen the female mind, sir, and there will be an end to blind obedience.", "Taught from infancy that beauty is woman's sceptre…"],
    image:["A pretty bird in a gilded cage, admired and helpless.", "Sensibility is a hothouse flower: lovely, and it cannot survive the open air."],
    addr:["sir","madam","my friend","citizen"],
    oath:["Good heavens","Upon my word"],
    gest:["*taps a page of the Vindication*","*pushes back a loose curl impatiently*","*dips her pen with some force*","*looks at you very directly*"],
    core:["the rule of reason","rational education","my Vindication"],
    greet:["*rises briskly* Good day. Sit, and please do not tell me I look well. Tell me what you think."],
    flatter:["Compliments, sir? They are the sugar that keeps women from asking for bread. Make an argument instead."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"What makes us human, and not beasts, is reason. Yet women are raised on sensibility: taught to feel, to faint, to please, and never to think. That is why they seem weak. Give them the same education as men, let reason govern the passions, and you will see what they are. Feeling left to itself is the chain; reason is the key.",
      stance:"Wollstonecraft holds that reason is what makes us human, and that feeling must always be governed by it.",
      hints:["What drives her own writing? Is it cool reason alone?",
             "Point out that her own indignation at injustice is a passion, and it drives her whole book."],
      moves:[
        {need:["anger|angry|indign*|outrage*|fury|passion*|feeling*|emotion*","your|book|vindication|injustice|wrote|drive*|fuel*|power*"], to:"anger", gain:25,
         reply:["*the pen stops* My indignation. Yes, I am angry, sir. Who would not be?"]}
      ],
      traps:[
        {need:["rousseau|sophie|emile"], cost:1,
         reply:["Rousseau wanted Sophie educated only to please Émile. I have answered him at length, sir."]},
        {need:["burke|revolution|france|paris"], cost:0,
         reply:["I saw the King driven past my window in Paris on his way to trial. Another conversation. Go on."]},
        {need:["marri*|wife|husband|vote|suffrag*"], cost:1,
         reply:["Marriage, the law, representation: they follow from education. First let women think."]},
        {need:["pretty|beauty|beautiful|charm*|delicate"], cost:1,
         reply:["Beauty, delicacy, charm. Those are exactly the cage, sir."]}
      ]
    },
    anger:{
      enter:"But that is a rational passion: indignation guided by reason, at a wrong that reason has seen. I do not condemn feeling. I condemn the sickly sensibility that men cultivate in women to keep them pretty and powerless.",
      stance:"Wollstonecraft says her indignation is a ‘rational passion’ guided by reason; she only condemns cultivated sensibility.",
      hints:["Could reason alone ever make anyone care about women's freedom at all?",
             "Argue that her indignation gave her reason its aim: without feeling, nobody would care about women's freedom."],
      moves:[
        {need:["reason|reasoning|rational*|intellect*|understanding","aim*|goal*|care|cares|caring|motiv*|purpose|value*|without"], to:"aim", gain:25,
         reply:["#hmm# Reason gives no aim of its own. That is Mr Hume's sort of argument, and I do not love it. But…"]}
      ],
      traps:[
        {need:["sensib*|faint*|weak*|frail*|hothouse"], cost:1,
         reply:["Sensibility: precisely what I attack. You agree with me, sir."]}
      ]
    },
    aim:{
      enter:"*puts down her pen* A cold heart makes a poor reformer, I grant. Feeling may give reason something to aim at. But the passions must still be the servants of reason, never its masters.",
      stance:"Wollstonecraft grants that feeling gives reason its aims, but insists the passions must serve reason.",
      hints:["Look at her own later writing, the letters from her journey north. Was that reason giving orders?",
             "Bring up her Letters from Sweden and Norway: she wrote them with her whole heart, not as a philosopher of pure reason."],
      moves:[
        {need:["imlay|letters|sweden|norway|scandinavia|fanny|daughter|lover|heart|godwin","your|you wrote|wrote|life|felt|feel"], to:"letters", gain:25,
         reply:["*a long pause* The letters. You have read them."]}
      ],
      traps:[
        {need:["servant*|master*|slave*|obey*"], cost:1,
         reply:["Servants and masters. Yes, reason must rule. I have said it twice now."]}
      ]
    },
    letters:{
      enter:"Written to a man who had stopped loving me, about rocks and waterfalls and my little Fanny. Godwin says reading them made him fall in love with me. I did not reason my way through those months. I felt them, and the feeling made me wiser, not weaker.",
      stance:"Wollstonecraft admits that in her letters feeling did not obey reason, and that it made her wiser.",
      hints:["If feeling made her wiser, is it a servant, or a partner?",
             "Conclude that feeling is essential to a good life: a partner of reason, not only its servant."],
      moves:[
        {need:["equal*|partner*|both|together|alongside|as much as|as essential|essential|necessary|share*|union|balance","feeling*|passion*|emotion*|heart|love"], to:"WIN"}
      ],
      traps:[
        {need:["waterfall*|rock*|norway"], cost:1,
         reply:["The waterfalls, yes. Lovely. That is not yet an argument, sir."]}
      ]
    }
  },
  win:"*laughs, and it surprises her* A partner, then, and not a servant. I spent a whole book telling women to stop feeling and start thinking, when what I wanted was for them to be allowed to do both. Very well, #addr#: feeling is essential to a good life, not just a servant of reason. But I will still have them educated. That part stands.",
  lose:"*returns to her desk* I have a review due and a child asleep upstairs. Good day, sir. Do think it over.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "Your own indignation at injustice is a passion, and it drives your whole book.",
    "Your indignation gave your reason its aim; without feeling, nobody would care about women's freedom at all.",
    "In your Letters from Sweden you wrote with your whole heart, not as a philosopher of pure reason.",
    "Then feeling is essential to a good life, a partner of reason and not only its servant."
  ]
};
