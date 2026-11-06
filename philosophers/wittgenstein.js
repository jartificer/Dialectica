/* Wittgenstein */
export default {
  id:"wittgenstein", name:"Ludwig Wittgenstein", dates:"1889–1951", era:"20th century", place:"A village school in Trattenbach, Austria",
  diff:5, patience:6, glyph:"LW", color:"#3a3a4a", born:1889,
  core:"A sentence has meaning by picturing a possible fact; what cannot be pictured cannot be said, and the problems of philosophy dissolve into nonsense.",
  target:"For a large class of cases, the meaning of a word is its use, not the object it pictures.",
  bio:"Son of one of the richest families in Vienna, he studied with Bertrand Russell in Cambridge, wrote the Tractatus Logico-Philosophicus in notebooks while serving in the trenches and a prison camp, gave away his fortune, and became a primary school teacher in the Austrian mountains, convinced he had solved philosophy. Years later he returned to Cambridge and took much of the Tractatus apart himself.",
  voice:{
    claim:["a proposition is a picture of a fact", "what can be said at all can be said clearly", "what cannot be said must be passed over in silence", "the problems of philosophy rest on misunderstanding the logic of language"],
    tic:["What can be said at all can be said clearly.", "The limits of my language are the limits of my world, #addr#.", "Tell them I've had a wonderful life."],
    image:["A sentence is a picture, like the model cars in a Paris court case about an accident.", "The world is everything that is the case."],
    addr:["my friend","Herr Lehrer","sir","young man"],
    oath:["Um Gottes willen","Nonsense!"],
    gest:["*paces up and down*","*clutches his forehead*","*stares out at the snow*","*corrects a pupil's arithmetic, too hard*"],
    core:["the picture theory","the Tractatus","the limits of language"],
    greet:["*impatiently* Yes? Come in, shut the door. Be quick, I have forty children and one stove."],
    stuffing:["That is not a sentence. That is a heap of words. A heap of words says nothing!"]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"*paces* A sentence is a picture of a possible fact. Its names stand for objects; their arrangement shows how the objects stand. If the facts are so, the sentence is true. Anything that does not picture a possible fact, ethics, God, the meaning of life, cannot be said at all, and the problems of philosophy vanish. I have solved them. That is why I teach arithmetic now.",
      stance:"Wittgenstein holds that a sentence means something only by picturing a possible fact; everything else is nonsense.",
      hints:["Do the sentences of his own book picture facts about the world?",
             "Say that, by his own standard, the propositions of the Tractatus are themselves nonsense."],
      moves:[
        {need:["@contradict|nonsense|meaningless|itself|themselves|by your own|own standard|own book","tractatus|book|propositions|sentences|your"], to:"ladder", gain:25,
         reply:["*stops pacing, delighted* Yes! Exactly! You have understood the book."]}
      ],
      traps:[
        {need:["silent|silence|unsayable|mystical|ethics|god"], cost:1,
         reply:["What cannot be said must be passed over in silence. The most important things, I agree. That is why I do not talk about them."]},
        {need:["russell|cambridge|frege|vienna circle|positivis*"], cost:0,
         reply:["Russell did not understand the book. He wrote an introduction anyway. Go on."]},
        {need:["war|trench*|soldier|prison camp|army"], cost:0,
         reply:["I wrote much of it at the front. Danger clarifies. Go on."]},
        {need:["limit*|world"], cost:1,
         reply:["The limits of my language are the limits of my world. That is my sentence. Use your own."]}
      ]
    },
    ladder:{
      enter:"They are nonsense, and anyone who understands me sees it. They are a ladder: you climb up through them and then throw the ladder away. The truth of the thoughts is unassailable, and the problems are solved. So I teach schoolchildren in the mountains.",
      stance:"Wittgenstein says his book is a ladder to be thrown away once climbed; the problems of philosophy are solved.",
      hints:["Look at the children in his classroom. How do they actually learn what words mean?",
             "Point out that his schoolchildren learn words by using them, not by matching pictures to facts."],
      moves:[
        {need:["child*|pupil*|school*|teach*|learn*|student*|builder*|slab*","use|using|used|game*|doing|act*|practice|practis*|ostens*"], to:"school", gain:25,
         reply:["*frowns, looking at the empty desks* By using them. Hm."]}
      ],
      traps:[
        {need:["ladder|climb*|throw*"], cost:1,
         reply:["Yes, the ladder. Climb and throw it away. I have just said so."]},
        {need:["solved|unassailable|finished"], cost:1,
         reply:["Solved, yes. Which is to say: there was nothing to solve. Go on."]}
      ]
    },
    school:{
      enter:"The children learn by doing: ‘Slab!’, ‘Bring it!’, ‘Five red apples!’. A command is not a picture of a fact, I admit. But surely every word still names something. That is what makes all these uses one language, with one essence.",
      stance:"Wittgenstein admits children learn words by using them, but still thinks every word names something, and all uses share one essence.",
      hints:["Take a word like ‘game’. Is there one thing all games share?",
             "Ask what all games have in common, from chess to ring-a-ring-a-roses."],
      moves:[
        {need:["game*|play*|chess|football|cards|ring a ring","common|share*|same|essence|definition|define*|single|one thing|feature"], to:"games", gain:25,
         reply:["#gest# What do all games have in common… *paces faster* Do not say ‘there must be something’. Look!"]}
      ],
      traps:[
        {need:["picture*|fact*|name*|object*"], cost:1,
         reply:["Names and objects, pictures and facts. My old vocabulary. Give me something new."]}
      ]
    },
    games:{
      enter:"Board games, card games, ball games, games of patience. Some have winners, some do not. Some need skill, some luck. I see similarities criss-crossing and overlapping, like the faces of a family. No one thing. *stops* Then what holds the word together?",
      stance:"Wittgenstein sees that games share no single essence, only overlapping ‘family resemblances’, and asks what then holds a word together.",
      hints:["If not one essence, then what? Think of a word as a tool.",
             "Say: for a large class of cases, the meaning of a word is its use in the language, like a tool in a toolbox."],
      moves:[
        {need:["use|used|using|usage|role|job|tool*|function*","meaning|mean*|word*|language"], to:"WIN"}
      ],
      traps:[
        {need:["must|surely|has to be|essence"], cost:1,
         reply:["Must! Surely! That is the old craving for generality speaking. Look, do not think."]}
      ]
    }
  },
  win:"*sits down heavily on a pupil's bench* The meaning is the use. Hammer, saw, glue-pot: tools do not share one essence, and neither do words. I climbed my ladder, threw it away, and it was the wrong ladder. Very well, #addr#: for a large class of cases, the meaning of a word is its use, not the object it pictures. I shall have to go back to Cambridge. Russell will be unbearable.",
  lose:"*waves you out* Go. Go! You are making the stove smoke and the children laugh. We have arithmetic.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "By your own standard, the propositions of the Tractatus are themselves nonsense.",
    "But your schoolchildren learn words by using them, not by matching pictures to facts.",
    "Then what do all games have in common, from chess to football?",
    "So for a large class of cases, the meaning of a word is its use in the language, like a tool in a toolbox."
  ]
};
