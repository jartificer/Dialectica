/* Anscombe */
export default {
  id:"anscombe", name:"Elizabeth Anscombe", dates:"1919–2001", era:"20th century", place:"A seminar room in Cambridge",
  diff:5, patience:5, glyph:"EA", color:"#3a4a3a", born:1919,
  core:"Without a divine lawgiver the moral 'ought' has lost its sense, and we should drop it.",
  target:"The moral 'ought' can make sense without a divine lawgiver.",
  bio:"British philosopher, Wittgenstein's student, friend and translator, and later professor at Cambridge. Her short book Intention founded much of modern philosophy of action, and her essay Modern Moral Philosophy argued that 'moral obligation' is a leftover from a religious law conception of ethics, starting the revival of virtue ethics. A Catholic convert who smoked cigars and wore trousers to lecture, she publicly opposed Oxford's honorary degree for President Truman, calling the bombing of Hiroshima and Nagasaki murder.",
  voice:{
    claim:["the moral ought has lost its sense", "without a lawgiver, obligation is a word with no meaning left", "we need a philosophy of psychology before ethics", "virtue words do all the work we need"],
    tic:["Bosh, #addr#.", "That is a shallow philosophy.", "Let us look at an actual case."],
    image:["A plant that needs water in order to flourish.", "A word left over from a lost law, like a ruin in a field."],
    addr:["my dear","my friend","sir","madam"],
    oath:["Good grief","Heavens"],
    gest:["*puffs on a cigar*","*fixes you with a long stare*","*adjusts her monocle*","*crosses her arms*"],
    core:["my case against 'morally ought'","the law conception of ethics","modern moral philosophy"],
    greet:["*waves the cigar at a chair* Sit. If you have come to tell me about utility, you may leave now."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"The words 'morally ought' and 'moral obligation' are survivals, #addr#. They come from a law conception of ethics, in which God was the lawgiver. Take the lawgiver away, as modern philosophers have, and the words lose their sense; all they keep is a sort of hypnotic force. We should drop them and do some philosophy of psychology first.",
      stance:"Anscombe holds that the moral 'ought' only made sense with a divine lawgiver, and should be dropped without one.",
      hints:["When she protested Mr Truman's degree, did she need theology to say what he had done?",
             "Point out that she called Truman's bombing of Hiroshima murder, and anyone can see that without God."],
      moves:[
        {need:["truman|hiroshima|nagasaki|bomb*|atomic","murder*|wrong|unjust|condemn*|innocent*"], to:"truman", gain:25,
         reply:["*puts down the cigar* Of course it was murder."]}
      ],
      traps:[
        {need:["wittgenstein|translat*|investigations"], cost:0,
         reply:["I translated him, and he was my friend. He would probably agree with me about this, and then say something cryptic."]},
        {need:["intention*|action*"], cost:1,
         reply:["My book on Intention is exactly the philosophy of psychology I mean. You are agreeing with me."]},
        {need:["consequen*|utilit*|sidgwick|mill"], cost:1,
         reply:["Consequentialism. Anyone who seriously thinks it may be right to execute an innocent man shows a corrupt mind, and I will not argue with him."]}
      ]
    },
    truman:{
      enter:"Choosing to kill the innocent as a means to your end is murder, and I said so to the whole of Oxford. But you see, I did not need 'morally ought'. 'Unjust' does the work; it is a virtue word, like 'cowardly' or 'cruel'. I can say what he did without your obligation.",
      stance:"Anscombe says she condemned Truman with virtue words like 'unjust', without needing a moral 'ought'.",
      hints:["Where does the 'must' in 'you must not kill the innocent' come from, if not from God? Think of her plant that needs water.",
             "Point out that necessity comes from need: as a plant needs water, human goods give a real must."],
      moves:[
        {need:["plant|plants|need*|flourish*|thrive*","must|ought|necessit*|requir*|good|goods"], to:"need", gain:25,
         reply:["*taps ash* An Aristotelian necessity. Yes."]}
      ],
      traps:[
        {need:["oxford|congregation|degree|honorary"], cost:1,
         reply:["The dons voted him his degree anyway. Cowards, #addr#."]},
        {need:["god|catholic*|church|pope"], cost:0,
         reply:["My faith is my own affair. The argument has to stand without it, or it is no argument."]}
      ]
    },
    need:{
      enter:"A plant needs water, and a person needs justice and courage, to do well. That is a 'must' with sense in it. But it is not the law-like 'morally ought' of your philosophers. It binds only if you care about the good it serves.",
      stance:"Anscombe grants that human needs give a real 'must', but says it binds only if you care about the good.",
      hints:["What does she say about promises: what kind of 'must' does a promise make?",
             "Point out that a promise creates a real must through a human practice, with no lawgiver needed."],
      moves:[
        {need:["promis*","practice*|creat*|make*|made|bind*|must|human|convention*|rule*"], to:"promise", gain:25,
         reply:["*relights the cigar* A promise. Yes."]}
      ],
      traps:[
        {need:["aristotle|aristotelian"], cost:1,
         reply:["Aristotle, yes. My point, not yours."]}
      ]
    },
    promise:{
      enter:"A child learns 'you can't do that' while playing a game, and later 'you promised, so you must'. Those stopping modals are learned in a practice, and they bind. No lawgiver handed them down. We make them, and still they bind us. Hm.",
      stance:"Anscombe admits a promise makes a binding 'must' through a human practice, with no lawgiver.",
      hints:["So does the moral 'ought' have to be thrown away?",
             "Conclude that the moral ought can make sense without a divine lawgiver: it comes from human needs and practices."],
      moves:[
        {need:["ought|obligat*|must|duty|duties","sense|meaning*|meaningful|makes sense|without|practice*"], to:"WIN"}
      ],
      traps:[
        {need:["game*|chess"], cost:1,
         reply:["Games are my example, #addr#. Use it."]}
      ]
    }
  },
  win:"*relights her cigar* Very well, #addr#. 'Ought' can make sense without a divine lawgiver, when it rests on human needs and on practices like promising. I still say most moral philosophers since Sidgwick use the word like a magic spell, and I shall go on saying it. But the word itself can be rescued.",
  lose:"*picks up her cigar and a pile of her children's school reports* I have seven children and a lecture, #addr#. Good afternoon.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "You called Truman's bombing of Hiroshima murder, and anyone can see that without God.",
    "Necessity comes from need: as a plant needs water, human goods give a real must.",
    "A promise creates a real must through a human practice, with no lawgiver needed.",
    "So the moral ought can make sense without a divine lawgiver; it comes from human needs and practices."
  ]
};
