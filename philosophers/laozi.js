/* Laozi */
export default {
  id:"laozi", name:"Laozi", dates:"6th century BCE (traditional)", era:"Axial Age", place:"The western pass, Zhou China",
  diff:1, patience:10, glyph:"老", color:"#4f7a5a", born:-571,
  core:"The Dao that can be spoken is not the eternal Dao: the Way cannot be put into words.",
  target:"Words can teach the Way, even if they cannot hold it.",
  bio:"The legendary Old Master of China, keeper of the Zhou archives. Tradition says that, leaving the world on an ox, he was stopped at the western pass by the gatekeeper Yinxi, who begged him to write down his teaching. The result was the Daodejing, about five thousand characters on the nameless Way, softness, and acting without forcing (wu wei).",
  voice:{
    claim:["the Dao that can be named is not the constant Dao", "those who know do not speak, and those who speak do not know", "the Way is nameless", "words are not the Way"],
    tic:["Those who know do not speak.", "The soft overcomes the hard, #addr#.", "Do nothing, and nothing is left undone."],
    image:["Water is the softest thing, yet it wears away the stone.", "Thirty spokes share one hub; it is the empty space that makes the wheel useful.", "The uncarved block has no name."],
    addr:["young one","traveller","friend","little sister","little brother"],
    oath:["By Heaven and Earth","Ai"],
    gest:["*strokes his long white beard*","*pats the ox beside him*","*watches the river slide past the stones*","*smiles and says nothing for a while*"],
    core:["the nameless Way","the silence of the Dao","my teaching without words"],
    greet:["*bows slightly* You have come a long way to talk to someone who says words are useless. Sit."],
    stuffing:["So many words, #addr#, and so little said. The more you heap up, the less you hold."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"*the ox chews quietly* The Dao that can be spoken is not the eternal Dao. The name that can be named is not the eternal name. The Way is like water: it takes the shape of every bowl and keeps none of them. So do not ask me to tell it to you. Those who know do not speak, and those who speak do not know.",
      stance:"Laozi says the Way cannot be put into words: whoever speaks about it does not know it.",
      hints:["He says words cannot carry the Way. What did he leave behind at the western pass?",
             "Point out that he wrote a whole book, the Daodejing, about five thousand characters on the Way."],
      moves:[
        {need:["book|wrote|written|write|writing|daodejing|dao de jing|tao te ching|five thousand|characters|chapter*|verse*|poem*|scroll*"], to:"book", gain:40,
         reply:["*laughs softly* Ah, you have read my little book.","#gest# Yes, yes. The book. Everyone mentions the book."]}
      ],
      traps:[
        {need:["water|river|soft*|stone*"], cost:1,
         reply:["Water, yes: the softest thing wears away the hardest. But that is my image, #addr#, not an argument against me."]},
        {need:["confucius|ritual*|rites|duty|virtue*"], cost:1,
         reply:["When the great Way is lost, then come benevolence and duty, rites and rules. Do not bring me Kong Qiu's bundles of ceremony."]},
        {need:["ox|buffalo|gatekeeper|yinxi|west"], cost:0,
         reply:["*pats the ox* He is a good ox. He does not argue. Go on."]},
        {need:["wu wei|do nothing|doing nothing|effortless|lazy|inaction"], cost:1,
         reply:["Not doing is not idleness, #addr#. The river does not try, and still it reaches the sea. But you have wandered from the question."]}
      ]
    },
    book:{
      enter:"The keeper of the western pass would not let me leave until I wrote something down, so I wrote. But the words are only a gate. You pass through a gate; you do not live in it.",
      stance:"Laozi admits he wrote the Daodejing, but says the words are only a gate you pass through, not the Way itself.",
      hints:["A gate is not the road, but what does a gate, or a signpost, do for a traveller?",
             "Say that his words are a signpost or a pointing finger: they do not contain the Way, but they point the reader toward it."],
      moves:[
        {need:["gate|signpost*|sign|point*|finger|map|direct*|lead*|show*|door|raft|ladder|guide*","way|dao|tao|reader*|someone|people|student*|other*|seeker*|traveller*|toward*|there"], to:"guide", gain:35,
         reply:["#hmm# A signpost. *looks at the road west* It does not walk for you, but it does point."]}
      ],
      traps:[
        {need:["empty|emptiness|hub|wheel|spoke*|bowl"], cost:1,
         reply:["The empty hub makes the wheel useful, yes. You are quoting me to me, #addr#."]},
        {need:["name|named|nameless|naming"], cost:1,
         reply:["Naming is how we cut up the uncarved block. That is why I warn against names."]}
      ]
    },
    guide:{
      enter:"But a map is not the mountain, and a pointing finger does not grasp the moon. If the words cannot hold the Way, how can they teach it?",
      stance:"Laozi grants that his words point toward the Way, but asks how words that cannot hold it could ever teach it.",
      hints:["Does a guide need to carry the mountain to lead you up it?",
             "Argue that to teach the Way, words only need to lead someone there, not hold it. A guide can still lead without carrying the mountain."],
      moves:[
        {need:["teach*|taught|learn*|help*|guide*|lead*|led|find*|reach*|bring*","without|enough|need not|does not have to|do not have to|anyway|still|even so|nonetheless|only need*"], to:"WIN"}
      ],
      traps:[
        {need:["moon|mountain|map"], cost:1,
         reply:["Yes, the moon and the finger. I said it myself a moment ago. Say something new, #addr#."]}
      ]
    }
  },
  win:"*is silent for a long time, then laughs until the ox looks round* Five thousand characters, and I told the gatekeeper they were useless. A signpost cannot walk the road, but it can still send a traveller the right way. Very well, #addr#: words can teach the Way, even if they cannot hold it. Now I will stop talking, which is what I should have done in the first place.",
  lose:"*climbs back on the ox* The more we talk, the less we understand. Go well, #addr#. I am going west.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "But you wrote a whole book of five thousand characters about it.",
    "Then your words are a signpost that points the reader toward the Way.",
    "A guide can still lead someone to the Way without holding it, so your words can teach."
  ]
};
