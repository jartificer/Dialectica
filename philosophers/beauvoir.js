/* Beauvoir */
export default {
  id:"beauvoir", name:"Simone de Beauvoir", dates:"1908–1986", era:"20th century", place:"Les Deux Magots, Paris",
  diff:5, patience:5, glyph:"SB", color:"#5a3a4a", born:1908,
  core:"Mortality is what gives our projects meaning: an endless life would make every choice weightless.",
  target:"Death is a violence done to us, not what gives life its meaning.",
  bio:"French philosopher and novelist, author of The Second Sex and The Ethics of Ambiguity, and Sartre's lifelong partner in an open, argumentative alliance. Her novel All Men Are Mortal follows Fosca, a man who cannot die and finds that, over the centuries, nothing he does can matter. Years later she sat by her mother's hospital bed and wrote A Very Easy Death, a book that sees dying very differently.",
  voice:{
    claim:["mortality gives our projects their weight", "an immortal life would be empty", "we make meaning because our time is finite", "nothing matters to the man who cannot die"],
    tic:["We must assume our freedom, #addr#.", "One is not born, but becomes: everything is a becoming.", "Ambiguity is not absurdity."],
    image:["Fosca outlives every love, and every cause turns to dust in his hands.", "A project is a bridge thrown over the gap of time; with endless time, why build bridges?"],
    addr:["my friend","chère amie","cher ami","comrade"],
    oath:["Mon Dieu","Zut"],
    gest:["*writes a line in her notebook without looking down*","*adjusts her turban*","*sips her coffee*","*raises one eyebrow*"],
    core:["the meaning of mortality","my ethics of ambiguity","the weight of finitude"],
    greet:["*closes her notebook halfway* Bonjour. Sit, but I warn you: I write while I listen."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Think of Fosca, my immortal. He has every century to work in, and nothing he does matters. Why hurry, why choose, why love, when you can always start again? Our projects have weight because our time runs out. Death is what makes a life a life.",
      stance:"Beauvoir says mortality gives our projects weight: an immortal life, like Fosca's, would be empty.",
      hints:["Is Fosca's life empty because he lives forever, or because of something else in his situation?",
             "Point out that Fosca's emptiness comes from being immortal alone, outliving everyone he loves."],
      moves:[
        {need:["fosca|immortal*|forever|endless*|live forever","alone|lonely|loneliness|outliv*|everyone else|others|friends|loves|loved"], to:"fosca", gain:25,
         reply:["*the pen stops* Immortal alone… #hmm#"]}
      ],
      traps:[
        {need:["sartre|jean-paul|jean paul|contingent|pact"], cost:0,
         reply:["Sartre? He is at another table, writing about himself. Go on."]},
        {need:["second sex|woman|women|gender"], cost:1,
         reply:["That is another book, my friend, and a longer conversation."]},
        {need:["god|heaven|afterlife|soul"], cost:1,
         reply:["There is no heaven waiting, cher ami. That is exactly why this life must carry its own meaning."]},
        {need:["absurd|meaningless|pointless"], cost:1,
         reply:["Not absurd: ambiguous. Meaning is not given, it is made. You confuse me with Camus."]}
      ]
    },
    fosca:{
      enter:"Perhaps the loneliness is half of it. But even among immortals, nothing would be urgent. Every project could wait another century. Without a deadline, nothing is ever chosen.",
      stance:"Beauvoir grants Fosca's loneliness matters, but holds that without death nothing would be urgent, so nothing would be chosen.",
      hints:["Does a friendship or a piece of music matter only because it will end?",
             "Argue that a friendship matters for what it is now, not because it will end."],
      moves:[
        {need:["love*|friend*|child*|music|art|joy|care|caring|work|conversation*","matter*|meaning*|value*|count*|worth|now|present|itself"], to:"now", gain:25,
         reply:["*looks across the café at nobody in particular* For what it is now."]}
      ],
      traps:[
        {need:["urgent|urgency|wait*|deadline|hurry"], cost:1,
         reply:["Urgency, yes. That is my claim. You must answer it, not repeat it."]}
      ]
    },
    now:{
      enter:"Yes, joy is joy now. But I am older than I was, and I think of death every day. It frames everything I do.",
      stance:"Beauvoir admits things can matter in the present, but says the thought of death frames everything she does.",
      hints:["She once sat by her mother's deathbed. What did she write about dying then?",
             "Remind her that when her mother died she wrote that there is no such thing as a natural death."],
      moves:[
        {need:["mother|maman|very easy death|hospital|cancer|natural death|deathbed","death|die|died|dying|violen*|wrote|said|accident*|natural"], to:"mother", gain:25,
         reply:["*very still* My mother. Yes."]}
      ],
      traps:[
        {need:["old age|aging|ageing|older|old"], cost:1,
         reply:["Old age, yes, I am writing a book on it. It does not change my thesis."]}
      ]
    },
    mother:{
      enter:"I sat by her bed for weeks. Her death was not a meaning. It was something done to her, an outrage, an accident that happens to everyone and is still an accident. I wrote that every death is a kind of violation.",
      stance:"Beauvoir admits that at her mother's bedside death felt like an outrage and a violation, not a meaning.",
      hints:["If death is a violation, can it also be the gift that gives life its meaning?",
             "Conclude that death is a violence that takes meaning away, not a gift that gives it."],
      moves:[
        {need:["violen*|violation|outrage*|accident*|unjustifi*|robbery|theft|steal*|enemy|scandal","not|never|rather|instead|than|meaning|gift|gives|away"], to:"WIN"}
      ],
      traps:[
        {need:["bed|hospital|nurse*|doctor*"], cost:1,
         reply:["Please. I was there. Say what follows from it."]}
      ]
    }
  },
  win:"*closes the notebook* Fosca was lonely, not cursed by time. And my mother was not given a meaning when she died; she was robbed. What gives life its weight is what we do and whom we love, while we can. Very well, #addr#: death is a violence done to us, not what gives life its meaning. I shall have to tell Sartre. He will say he agrees, and then write three hundred pages disagreeing.",
  lose:"*opens the notebook again* I have a chapter to finish, and you are not in it. Au revoir.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "Fosca's life is empty because he is immortal alone, outliving everyone he loves.",
    "A friendship matters for what it is now, not because it will end.",
    "When your mother died you wrote that there is no such thing as a natural death.",
    "Then death is a violence that takes meaning away, not a gift that gives it."
  ]
};
