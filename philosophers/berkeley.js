/* Berkeley */
export default {
  id:"berkeley", name:"George Berkeley", dates:"1685–1753", era:"Early modern", place:"Trinity College, Dublin",
  diff:4, patience:7, glyph:"B", color:"#3f6f6a", born:1685,
  core:"To be is to be perceived. There is no matter, only minds and their ideas.",
  target:"Material things exist independently of being perceived.",
  bio:"Irish philosopher and later Bishop of Cloyne. Berkeley argued that the things we perceive are nothing but ideas, and ideas exist only in minds: esse est percipi. Things go on existing unobserved because God always perceives them. He also championed tar-water as a cure for nearly everything. Dr Johnson famously kicked a stone to refute him.",
  voice:{
    claim:["to be is to be perceived", "there is no matter, only minds and their ideas", "every quality you name is an idea in a mind", "'matter' is a word for you know not what"],
    tic:["We have first raised a dust and then complain we cannot see.", "Think with the learned, but speak with the vulgar, #addr#.", "Name me one quality that is not an idea."],
    image:["The tree in the quad is never alone: God is always looking.", "Take away the perceiving, and what is left of the cherry? Nothing."],
    addr:["my dear sir","my friend","Hylas","good sir"],
    oath:["Upon my soul","Heavens"],
    gest:["*taps the desk thoughtfully*","*pours a cup of tar-water*","*adjusts his clerical bands*","*looks out at the quad*"],
    core:["immaterialism","my principle","esse est percipi"],
    greet:["Good day, #addr#! Do sit. Will you take some tar-water? No? Your loss."],
    flatter:["You are too kind, #addr#. Kindness, too, is an idea. Now, to work."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Sit, sit. Tell me what you see: this desk, its colour, its hardness, its shape. Every one of these is an idea, and an idea can exist only in a mind. Take away all perceiving and what remains? Nothing. Esse est percipi: to be is to be perceived. ‘Matter’ is a word philosophers use for they know not what.",
      stance:"Berkeley says physical things are just collections of ideas, and ideas exist only while perceived. There is no matter.",
      hints:["Ask what happens to things when nobody is looking.",
             "Ask about the tree in the empty quad, or the fire that keeps burning while you're out of the room. Then question the step from ‘perceiving’ to ‘what is perceived’."],
      moves:[
        {need:["no one|nobody|empty|unperceived|not looking|not perceived|leave the room|out of the room|close my eyes|eyes closed|quad|tree|forest|asleep|unobserved|not watching"], to:"god", gain:25,
         reply:["#hmm# The tree in the empty quad? It is never truly unperceived."]},
        {need:["act of|perceiving|awareness|experience of|sensation of|perception of","object|what is perceived|what we perceive|content|blue|colour|color|distinct|different|confus*"], to:"act", gain:35,
         reply:["*leans forward* You distinguish the perceiving from what is perceived…"]}
      ],
      traps:[
        {need:["kick*|stone|johnson|hard|solid|touch*"], cost:1,
         reply:["Dr Johnson kicked a stone and said ‘I refute it thus.’ He refuted nothing. The hardness he felt was one more idea, #addr#."]},
        {need:["science|newton|atom*|physics|particle*"], cost:1,
         reply:["Newton's laws describe the order of our ideas perfectly well. They need no unthinking matter behind them."]},
        {need:["dream*|hallucinat*|illusion*"], cost:1,
         reply:["Real things differ from dreams by being livelier, more orderly, and not of our making. Still ideas, #addr#."]},
        {need:["tar water|bermuda|bishop|cloyne"], cost:0,
         reply:["Ah, you have heard of my tar-water! Excellent for nearly everything. But we were discussing being."]}
      ]
    },
    god:{
      enter:"When I leave the quad, the tree is perceived by God, the infinite mind in whom all things exist. So it goes on, and you need no matter to explain it. And try this: conceive of a tree existing unperceived. You cannot! In conceiving it, you are conceiving it.",
      stance:"Berkeley says God perceives everything continuously, and challenges you to even conceive of an unconceived tree.",
      hints:["His challenge mixes up two things: the act of conceiving, and what is conceived.",
             "Argue that you can conceive *that* a tree is unperceived. Your thought is in your mind, but the tree is what the thought is about; it is not the thought."],
      moves:[
        {need:["about|content|the tree itself|object|thing itself|distinct|different|confus*|mix*|conflat*|not the same|separate","conceiv*|thinking|thought|imagin*|act|perceiv*|perception|idea"], to:"act", gain:30,
         reply:["*taps the desk* You say the conceiving is mine, but what I conceive need not be. My thought of the tree is in my mind; the tree it is about is not my thought…"]}
      ],
      traps:[
        {need:["god|faith|atheis*|religion"], cost:1,
         reply:["God perceives all things; on that I stake my mitre. Argue with the philosophy, #addr#, not the theology."]},
        {need:["can conceive|can imagine|easily|of course i can"], cost:1,
         reply:["Can you? Then tell me: in conceiving it, who is doing the conceiving? You are. So it was not unconceived."]}
      ]
    },
    act:{
      enter:"But mark this: what is perceived, the blue, the hard, the sweet, is an idea. And an idea cannot exist outside a mind. The blue you see is not out there in some lump of matter.",
      stance:"Berkeley grants there is a perceiving and a thing perceived, but says the thing perceived, the colour, is itself an idea in the mind.",
      hints:["Is ‘blue’ the same as ‘seeing blue’?",
             "Argue that the sensation of blue is in the mind, but blue itself, the object of that sensation, is not a sensation. Nothing about blueness needs to be seen."],
      moves:[
        {need:["blue|colour|color|object|thing|what is seen|it|hardness|shape","not|need not|without|independ*|apart|separate|distinct|other than|beyond","sensation|seeing|seen|perceiv*|percept*|idea|mind|aware*|experienc*"], to:"inference", gain:25,
         reply:["#hmm# Blue is what the seeing is *of*, and need not be the seeing itself. *frowns* Then the object might, in principle, outlast the act. But what reason have you to think it does? You never meet it unperceived."]}
      ],
      traps:[
        {need:["primary|secondary|locke|extension"], cost:1,
         reply:["Locke's primary qualities? Shape and size vary with the perceiver just as colour does. They are ideas too."]},
        {need:["god"], cost:1,
         reply:["God, yes. But we were speaking of blue."]}
      ]
    },
    inference:{
      stance:"Berkeley admits objects might outlast perception, but asks what evidence could show they do, since you never meet one unperceived.",
      hints:["You can't perceive the unperceived. But what explains the order of what you do perceive?",
             "Argue from what he just granted: if the colour is not an idea, nothing needs to perceive the fire for it to exist, so it simply goes on burning to ash while you are out of the room."],
      moves:[
        {need:["explain*|explanation|best|account for|reason to|evidence|infer*|simplest|simpler|nothing needs|need not|needs no|no need|simply|not an idea","fire|ash|ashes|logs|clock*|candle|burn*|order|regular*|continu*|unseen|meanwhile|absent|while i was|while we"], to:"WIN"}
      ],
      traps:[
        {need:["god"], cost:1,
         reply:["God explains the order of my ideas perfectly well. You need not add matter as well, #addr#."]},
        {need:["see|seen|look*|watch*"], cost:1,
         reply:["Whatever you see is seen, my dear sir. That proves nothing about the unseen."]}
      ]
    }
  },
  win:"*looks at the fire, which has burned low while we talked* I did not watch those logs turn to ash, and yet they did, at just the rate logs do. If the blue is not the seeing, then nothing needs to see the fire for it to be, and it keeps its own time when no one attends to it, minding its own business. Very well, #addr#: material things exist independently of being perceived. I shall go and take some tar-water. It is good for shock.",
  lose:"*smiles kindly* I perceive that you are tired, #addr#, and so, by my principles, you are. Good night.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "What happens to the tree in the quad when nobody is looking?",
    "You confuse the act of conceiving with what is conceived: my thought is about the tree, but the tree itself is not my thought.",
    "Blue is not the same as the sensation of seeing blue; the colour itself is not an idea in the mind.",
    "If the colour itself is not an idea, nothing needs to perceive the fire for it to exist; it simply went on burning to ash while I was out of the room."
  ]
};
