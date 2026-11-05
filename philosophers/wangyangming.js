/* Wang Yangming */
export default {
  id:"wangyangming", name:"Wang Yangming", dates:"1472–1529", era:"Early modern", place:"Longchang post station, Guizhou",
  diff:4, patience:7, glyph:"王", color:"#7a3a3a", born:1472,
  core:"Knowledge and action are one: to truly know the good is already to do it. Whoever knows but does not act does not yet know.",
  target:"One can truly know what is right and still fail to do it.",
  bio:"Ming dynasty official, general and philosopher. As a young man he sat for seven days ‘investigating’ the bamboo in his courtyard, as Zhu Xi advised, and fell ill having learned nothing. Exiled to a remote post station in Guizhou, he had a sudden enlightenment: the principles of things are not outside the mind. He taught liangzhi, innate knowledge of the good, and the unity of knowledge and action.",
  voice:{
    claim:["knowledge and action are one", "to know and not to act is not yet to know", "the mind is principle", "innate knowing already knows the good"],
    tic:["Knowing is the beginning of acting, and acting is the completion of knowing.", "There is no principle outside the mind, #addr#.", "Polish the mirror and it shines by itself."],
    image:["Seeing a lovely colour is knowing; liking it is acting. You do not see it first and then decide to like it.", "Smelling a foul odour and hating it happen together."],
    addr:["my friend","student","traveller","young official"],
    oath:["Heaven above","Ai-ya"],
    gest:["*warms his hands at a small fire*","*sets down his writing brush*","*looks out at the mountains of Guizhou*","*nods slowly*"],
    core:["the unity of knowing and acting","innate knowing","the learning of the mind"],
    greet:["*bows* Few visitors find this post station. Sit by the fire; there are no others."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Seeing a lovely colour is knowing; liking it is acting. Do you see it first and then decide to like it? No: they are one. Smelling a foul odour and hating it happen together. So too with the good. Knowledge and action are one thing. If someone says they know filial piety but do not practise it, they do not yet know it.",
      stance:"Wang Yangming says knowledge and action are one: anyone who truly knows the good already does it.",
      hints:["Think of the everyday cases where people know perfectly well what they should do, and do the opposite.",
             "Point out that plenty of people know smoking or drinking will harm them, and do it anyway."],
      moves:[
        {need:["know*|knew|aware*|realis*|realiz*|understand*","smok*|drink*|lie|lies|lying|procrastinat*|cheat*|overeat*|cake|weak*|temptation|tempt*|lazy|anyway"], to:"akr", gain:25,
         reply:["#hmm# Ah. The man who knows wine harms him and drinks anyway. I hear this objection often."]}
      ],
      traps:[
        {need:["bamboo|zhu xi|investigat*|things"], cost:1,
         reply:["*laughs* Seven days staring at bamboo, and all I got was a fever. Principle is not in the bamboo, #addr#. That is exactly why I say it is in the mind."]},
        {need:["colour|color|beautiful|lovely|smell|odour|odor|foul|stench"], cost:1,
         reply:["Yes, the colour and the smell: my examples. Use your own."]},
        {need:["buddh*|chan|zen|meditat*|monk*"], cost:1,
         reply:["The Buddhists flee from their fathers and their rulers. I teach acting in the world. Do not confuse us."]},
        {need:["war|rebel*|general|exile*|emperor|eunuch*"], cost:0,
         reply:["I was flogged at court and exiled here, and later I put down a rebellion in thirty-five days. Knowledge in action, you see. Go on."]}
      ]
    },
    akr:{
      enter:"Then they do not truly know. Knowing that wine harms is like knowing pain: one who truly knows pain has already felt it. Their knowing is blocked by selfish desire, like a mirror covered in dust. What they have is only words.",
      stance:"Wang Yangming says such people do not truly know: selfish desire has blocked their knowing, leaving only words.",
      hints:["Can his view ever be wrong? Whatever happens, he just says they did not ‘truly’ know.",
             "Say that he simply redefines true knowledge so that anyone who fails must not truly know. That is circular."],
      moves:[
        {need:["circular|unfalsif*|by definition|definition|define*|redefin*|tautolog*|no true|can never be wrong|whatever happens|convenient","true|truly|real|really|know*|knowledge"], to:"circ", gain:25,
         reply:["*sets down the brush* Circular, you say. Hm. Then let me not argue from words."]}
      ],
      traps:[
        {need:["desire*|selfish*|blocked|obstruct*|mirror|dust"], cost:1,
         reply:["Yes, selfish desire blocks the mirror. That is my answer, not your objection."]}
      ]
    },
    circ:{
      enter:"Look into your own mind instead. When you did something you knew was wrong, was there nothing in you at that moment? I say the true knowing was absent. Show me otherwise from experience, not definitions.",
      stance:"Wang Yangming challenges you to show from experience, not definitions, that real knowing can be present while we act badly.",
      hints:["What do people feel at the very moment they give in to something they know is wrong?",
             "Point out that the guilt or shame people feel at the very moment they give in shows they knew it was wrong."],
      moves:[
        {need:["regret*|shame*|ashamed|guilt*|guilty|conscience|remorse|pang*|wince|uneasy","while|during|at the time|same time|moment|knew|know*|aware"], to:"regret", gain:25,
         reply:["*very quietly* The pang at the moment of giving in. Yes. I know that pang."]}
      ],
      traps:[
        {need:["definition*|words"], cost:1,
         reply:["I asked for experience, not more talk of definitions."]}
      ]
    },
    regret:{
      enter:"That pang is liangzhi itself: the innate knowing of good and evil, still awake under the dust. It is there even in the thief. *frowns* It is there… while the hand still reaches for the purse.",
      stance:"Wang Yangming admits the pang of conscience is innate knowing itself, present even while the wrong is done.",
      hints:["If the knowing is fully present, and the hand still acts wrongly, what follows for his unity of knowing and acting?",
             "Conclude: innate knowing was present, yet the action still failed. Knowledge and action came apart."],
      moves:[
        {need:["liangzhi|innate|conscience|knowing|knowledge|knew|know*","fail*|yet|still|apart|separate|without|did not|does not|wrong|anyway","act*|action|deed|do|did|hand|done"], to:"WIN"}
      ],
      traps:[
        {need:["thief|thieves|purse|dust"], cost:1,
         reply:["The thief, the dust: my words, #addr#. Finish the thought."]}
      ]
    }
  },
  win:"*the fire crackles; he watches it a long time* The pang was there, so the knowing was there, and still the hand reached. Then knowing and acting can come apart, and the polishing of the mirror is not the end of the work. Very well, #addr#: one can truly know what is right and still fail to do it. Then the real teaching is how to make them one, not to pretend they already are.",
  lose:"*turns back to the fire* Knowledge that does not act is not yet knowledge, and talk that goes nowhere is not yet talk. Good night.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "Plenty of people know that smoking will kill them and smoke anyway.",
    "You simply redefine true knowledge so that anyone who fails must not truly know.",
    "But the guilt people feel at the very moment they give in shows that they knew it was wrong.",
    "So innate knowing was present, yet the action still failed: knowledge and action came apart."
  ]
};
