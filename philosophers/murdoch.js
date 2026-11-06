/* Iris Murdoch */
export default {
  id:"murdoch", name:"Iris Murdoch", dates:"1919–1999", era:"20th century", place:"A college garden in Oxford",
  diff:5, patience:5, glyph:"IM", color:"#3a6a5a", born:1919,
  core:"Moral life is a matter of how we see; by the moment of choice, the choosing is mostly done.",
  target:"The moment of choice really matters in moral life, not only how we see.",
  bio:"Irish-born philosopher and novelist who taught philosophy at Oxford and wrote twenty-six novels, among them Under the Net, The Bell and The Sea, the Sea. In The Sovereignty of Good she argued, against the existentialists and the Oxford moral philosophers of her day, that the moral life is not a series of dramatic choices but continuous, patient attention to other people, and that the main enemy is the self. Her example of a mother-in-law learning to see her son's wife justly is one of the best known in modern ethics.",
  voice:{
    claim:["moral life is a matter of seeing", "the moment of choice is mostly settled already", "attention, not will, is the heart of morality", "the Good is a sun we can barely look at"],
    tic:["Love is the very hard discovery that someone else is real.", "Unselfing, #addr#. That is the task.", "Look again."],
    image:["A kestrel hovering, and suddenly the brooding self is gone.", "A mother-in-law learning to see her son's wife again."],
    addr:["my dear","dear","my friend","darling"],
    oath:["Good heavens","Oh lord"],
    gest:["*pushes back her short fringe*","*tucks her feet under her on the bench*","*watches a bird for a moment before answering*","*smiles vaguely and very kindly*"],
    core:["the sovereignty of good","moral vision","attention"],
    greet:["*makes room on the bench* Oh, hello. Sit down. I was watching that blackbird, but you are probably more interesting."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Think of M, a mother-in-law who finds her son's wife, D, vulgar and tiresome. She behaves perfectly; nothing changes on the outside. But she makes herself look again, justly and lovingly, until D seems not vulgar but refreshingly simple. That inner change is moral progress, and no one saw a choice being made. By the time we 'choose', #addr#, the choosing is mostly done.",
      stance:"Murdoch holds that moral life is a matter of how we see, and the moment of choice is mostly already settled.",
      hints:["How did M begin to look again? Did it simply happen to her?",
             "Point out that M decided to look again: deciding to attend differently is itself a choice."],
      moves:[
        {need:["decid*|chose|choos*|choice|deliberat*|effort|tried","look again|attend*|attention|look*|see again|view"], to:"decide", gain:25,
         reply:["*pushes back her fringe* She made an effort. I grant it."]}
      ],
      traps:[
        {need:["sartre|existential*|leap"], cost:1,
         reply:["The lonely will leaping in an empty world. I wrote a book on Sartre, #addr#. I do not believe in his man."]},
        {need:["novel*|bell|under the net|sea the sea"], cost:0,
         reply:["My novels say the same things, with more people falling into rivers. Go on."]},
        {need:["plato|sun|cave"], cost:1,
         reply:["The Good as the sun: yes, my Plato. You are making my case for me."]}
      ]
    },
    decide:{
      enter:"But it was not the bare will of the existentialists, leaping out of nowhere. It was patient attention, and attention is closer to looking than to choosing. Little by little, the ego loosens its grip.",
      stance:"Murdoch grants that M made an effort, but calls it patient attention rather than choice.",
      hints:["Seeing D justly is all very well. What does D actually need from M?",
             "Argue that a loving vision that never turns into action does nothing for D; at some point she must choose to act."],
      moves:[
        {need:["act|acts|action*|do something|deed*|behav*|help*","choose|choice|decid*|must|have to"], to:"act", gain:25,
         reply:["*plucks a leaf* True. #hmm#"]}
      ],
      traps:[
        {need:["ego|selfish*|unself*"], cost:1,
         reply:["The fat relentless ego. Yes, it is the enemy. We agree, #addr#."]}
      ]
    },
    act:{
      enter:"Love that never acts is only a sort of private picture-making, and I am suspicious of private pictures. Still, if the vision is clear, the right act follows almost by itself. The real work was the seeing.",
      stance:"Murdoch admits loving vision must issue in action, but thinks clear vision makes the act follow by itself.",
      hints:["Does the right act always follow when one sees clearly? Think of knowing the good and failing to do it.",
             "Point out that people often see clearly what is right and still fail to do it."],
      moves:[
        {need:["fail*|weak*|akrasia|temptat*","see*|know*|clear*|clearly|right|good"], to:"fail", gain:25,
         reply:["*a long pause* Yes."]}
      ],
      traps:[
        {need:["kestrel|hawk"], cost:1,
         reply:["The kestrel outside my window: the brooding self vanishes and there is only the bird. I know, I know."]}
      ]
    },
    fail:{
      enter:"I see the good and I do not do it. I have watched it in myself and written it into a dozen novels. The vision is there, and the will turns away. In that moment, something does hang on a choice.",
      stance:"Murdoch admits that when people see the good and fail to do it, something hangs on a choice.",
      hints:["Then what place does choice have in moral life?",
             "Conclude that the moment of choice really matters in moral life."],
      moves:[
        {need:["choice*|choos*|decision*|decid*|will","matter*|important|counts|real|central|essential|also|alongside"], to:"WIN"}
      ],
      traps:[
        {need:["sovereign*"], cost:1,
         reply:["The sovereignty of good. My title, #addr#, not an argument."]}
      ]
    }
  },
  win:"*laughs and drops the leaf* So vision and choice are partners, and I have been rather rude to the will. Very well, #addr#: the moment of choice really matters in moral life, as well as the long work of seeing. I shall have to put that in a novel, where somebody will make a dreadful choice and then fall into a pond.",
  lose:"*rises and brushes off her skirt* John is waiting and the light is going, #addr#. Come back when you have looked more carefully.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "M decided to look again at D: deciding to attend differently is itself a choice.",
    "A loving vision that never turns into action does nothing for D; at some point she must choose to act.",
    "People often see clearly what is right and still fail to do it.",
    "So the moment of choice really matters in moral life."
  ]
};
