/* Kierkegaard */
export default {
  id:"kierkegaard", name:"Søren Kierkegaard", dates:"1813–1855", era:"Late modern", place:"The streets of Copenhagen",
  diff:5, patience:6, glyph:"SK", color:"#3a4a6a", born:1813,
  core:"Truth is subjectivity: faith is a leap no reason can justify, made by the single individual, alone before God.",
  target:"Faith cannot be lived alone: it needs other people.",
  bio:"Danish writer who broke off his engagement to Regine Olsen, then spent his life writing books under a crowd of pseudonyms: Johannes de Silentio, Johannes Climacus, Victor Eremita and others. He attacked Hegel's System and the comfortable state church, insisted that faith is a passionate leap by the single individual, and walked the streets of Copenhagen every day talking to anyone he met.",
  voice:{
    claim:["truth is subjectivity", "faith is a leap that reason cannot make for you", "the crowd is untruth", "each must stand alone before God"],
    tic:["Life can only be understood backwards, but it must be lived forwards.", "Anxiety is the dizziness of freedom, #addr#.", "The System! A palace, and its builder lives in the shed next door."],
    image:["Abraham walks three days to Mount Moriah with the knife, and says nothing.", "A knight of faith looks exactly like a tax collector."],
    addr:["my reader","dear reader","my friend","sir"],
    oath:["Good Lord","Heaven help us"],
    gest:["*twirls his walking stick*","*stops in the middle of the street*","*peers at you sideways*","*smiles with one corner of his mouth*"],
    core:["the leap of faith","the single individual","subjective truth"],
    greet:["*lifts his hat* Ah, a reader. Or a passer-by? Walk with me; I think better on my feet."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"No proof will carry you to God. Hegel built a System that explains everything except the person who must live in it. Faith is a leap, made in fear and trembling, by the single individual, alone. The crowd is untruth. Christendom, with its comfortable pastors, is a crowd.",
      stance:"Kierkegaard says faith is a leap made by the single individual alone; the crowd is untruth.",
      hints:["If faith is so solitary, why did he spend his life writing book after book for readers?",
             "Ask why he wrote so many books under pseudonyms for readers."],
      moves:[
        {need:["book*|wrote|write|writing|pseudonym*|reader*|publish*|author*","why|reach|others|someone|people|communicat*|audience|readers"], to:"books", gain:25,
         reply:["*stops walking* My books. A fair question, my reader."]}
      ],
      traps:[
        {need:["proof|evidence|logic*|hegel*|system"], cost:1,
         reply:["Proofs! The System! Hegel explains everything and forgets to exist. Do not bring me proofs."]},
        {need:["abraham|isaac|sacrifice|knife|moriah"], cost:1,
         reply:["Abraham, yes. I cannot understand him; I can only admire him. That is my point."]},
        {need:["church|christendom|clergy|bishop*|pastor*|mynster"], cost:1,
         reply:["Christendom has made Christianity comfortable, which is to say it has abolished it. I agree with you already."]},
        {need:["regine|engaged|engagement|fiancee"], cost:0,
         reply:["*looks away* We do not speak of that on the street. Go on."]},
        {need:["despair|anxiety|dread|angst"], cost:1,
         reply:["Anxiety is the dizziness of freedom. You quote me, reader."]}
      ]
    },
    books:{
      enter:"Indirect communication. I hide behind my pseudonyms so that you cannot lean on me as an authority. I write for ‘that single individual’, my reader, so that you will stand alone before God, not with me.",
      stance:"Kierkegaard says he writes indirectly, through pseudonyms, so that each reader stands alone before God.",
      hints:["Alone before God: is that really alone?",
             "Point out that to stand before God is already to stand in a relation to another."],
      moves:[
        {need:["relation*|relationship|before god|with god|related|bond|stand before","another|other|someone|god|second|two"], to:"rel", gain:25,
         reply:["#hmm# Before God is not alone. *taps the stick* No. It is a relation."]}
      ],
      traps:[
        {need:["silentio|climacus|eremita|irony|socrat*|indirect*"], cost:1,
         reply:["Yes, my pseudonyms, my irony, my Socrates. I just said so, reader."]}
      ]
    },
    rel:{
      enter:"A relation to God, the absolutely Other, yes. But not to the crowd. Not to the public, the newspaper, the congregation that sings together and thinks nothing.",
      stance:"Kierkegaard grants that faith is a relation to God, but denies it involves other people: the crowd is untruth.",
      hints:["He wrote a whole book about love. Whom did it say faith must love?",
             "Remind him that in Works of Love he says faith must show itself in love of the neighbour."],
      moves:[
        {need:["neighbour|neighbor|works of love|love|loving|command*","faith|god|christian*|duty|must|shall"], to:"love", gain:25,
         reply:["*very quietly* Works of Love. Yes."]}
      ],
      traps:[
        {need:["crowd|public|mass|newspaper*|corsair"], cost:1,
         reply:["The crowd, the press, the Corsair that drew cartoons of my trousers. I have said what they are."]}
      ]
    },
    love:{
      enter:"You shall love. The command makes love a duty, and the duty is toward the neighbour: not the one you choose, but whoever is in front of you. Every human being. *looks down the street* Even the one you left.",
      stance:"Kierkegaard admits faith is commanded to love the neighbour, whoever stands in front of you.",
      hints:["If faith must love the neighbour, can it be lived entirely alone?",
             "Conclude: faith cannot be lived entirely alone; it needs the neighbour."],
      moves:[
        {need:["need*|requir*|depend*|cannot|can not|impossible|never|without","other*|people|neighbou*|neighbo*|someone|anyone|community|alone"], to:"WIN"}
      ],
      traps:[
        {need:["regine|engage*|left"], cost:1,
         reply:["Leave her out of it, reader. Please."]}
      ]
    }
  },
  win:"*leans on his stick in the middle of the street* A faith that only stands before God and never turns to the neighbour is not the faith I wrote about in my best book. The leap is mine; the love is for others. Very well, #addr#: faith cannot be lived alone; it needs other people. Do not tell my pseudonyms. They will want to argue.",
  lose:"*tips his hat and walks off* Life must be lived forwards, my reader, and I am going forwards, away from you.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "Then why did you write so many books under pseudonyms for readers?",
    "But to stand before God is already to stand in a relation to another.",
    "Yet in Works of Love you say faith must show itself in love of the neighbour.",
    "Then faith cannot be lived entirely alone: it needs the neighbour."
  ]
};
