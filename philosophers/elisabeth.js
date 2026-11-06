/* Elisabeth of Bohemia */
export default {
  id:"elisabeth", name:"Elisabeth of Bohemia", dates:"1618–1680", era:"Early modern", place:"The court in exile at The Hague",
  diff:4, patience:7, glyph:"E", color:"#4a3a6a", born:1618,
  core:"Whatever moves a body must touch it, so a mind that moves the body must be material.",
  target:"The mind may be immaterial and still move the body.",
  bio:"Princess of the Palatinate, eldest daughter of the 'Winter King' of Bohemia, who lost his throne after a single winter and raised his family in exile in The Hague. In 1643 she began a correspondence with René Descartes and asked the question his philosophy has never stopped facing: how can a thinking thing with no extension move a body? Descartes dedicated his Principles of Philosophy to her and wrote The Passions of the Soul in reply to her letters. She later became abbess of the Lutheran convent at Herford.",
  voice:{
    claim:["whatever moves a body must touch it", "an unextended soul could move nothing", "the soul must have some matter if it acts", "Monsieur Descartes has not answered me"],
    tic:["Forgive the slowness of a mere woman, #addr#, and then answer the question.", "I would like it explained, not admired.", "Let us be precise."],
    image:["Two billiard balls meet, and one sends the other rolling: that I can picture.", "A ghost trying to push open a door."],
    addr:["monsieur","madame","my friend","sir"],
    oath:["Heavens","Mon Dieu"],
    gest:["*taps a letter from Descartes*","*draws a quick geometric figure*","*raises an eyebrow, very royally*","*folds her hands on the table*"],
    core:["my objection to Monsieur Descartes","the problem of the pushing soul","the need for contact"],
    greet:["*sets aside a letter* You are not Monsieur Descartes, but you will do. Sit. I have a question nobody answers."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Monsieur Descartes says the mind is a thinking thing with no extension at all. Very well. Then tell me how it moves my hand. Every motion I know of comes from a push, one body touching another. Touch needs a surface, and a surface needs extension. So either the soul is extended, which is to say material, or it can move nothing.",
      stance:"Elisabeth argues that whatever moves a body must touch it, so a mind that moves the body must be material.",
      hints:["Is a push itself so well understood? Can anyone say how one body moves another?",
             "Argue that even a push between two bodies is a mystery: we only see that it happens."],
      moves:[
        {need:["push*|contact|touch*|collision*|collid*|impact|impuls*","mystery|myster*|obscure|unclear|only see|see that|explain*|understand*"], to:"contact", gain:25,
         reply:["*sets down Descartes' letter* You say I do not understand pushing either. #hmm#"]}
      ],
      traps:[
        {need:["gravity|heav*|weight|fall*"], cost:1,
         reply:["Monsieur Descartes tried that: the soul moves the body as heaviness moves a stone. But he had already thrown heaviness out of his physics. He only borrowed back an idea he had refuted."]},
        {need:["princess|bohemia|winter king|palatinate|exile"], cost:0,
         reply:["My family lost a crown in one winter. It is not the topic."]},
        {need:["pineal|gland"], cost:1,
         reply:["The little gland in the middle of the head. A hiding place for the problem, not an answer to it."]}
      ]
    },
    contact:{
      enter:"That is clever. No one has ever told me what passes from one billiard ball to the other, it is true. But at least they are things of the same kind, both extended. The soul and the body have nothing in common. How can there be any meeting at all?",
      stance:"Elisabeth grants that a push is not understood either, but says at least bodies are of the same kind.",
      hints:["What does she experience every time she decides to lift her hand?",
             "Point out that she knows from her own experience, every moment, that her will moves her hand."],
      moves:[
        {need:["experienc*|every day|every moment|feel*|felt|sense*|certain*|obvious|fact","will|decid*|choose|choice|hand|arm|wish*"], to:"fact", gain:25,
         reply:["*lifts her hand and looks at it* #hmm#"]}
      ],
      traps:[
        {need:["nothing in common|different|differ*|distinct*|two substances|kind"], cost:1,
         reply:["Different in kind, yes. That is the whole difficulty, #addr#, not its solution."]}
      ]
    },
    fact:{
      enter:"I will it, and it rises. Yes. Monsieur Descartes himself says this is known through the senses, and that philosophers only confuse themselves about it. I admit the fact. But a fact we cannot explain is a scandal to reason. I would sooner grant the soul some matter than grant it a power I cannot conceive.",
      stance:"Elisabeth admits her will moves her body, but would sooner make the soul material than accept a power she cannot conceive.",
      hints:["Is being unable to conceive how something works a proof that it cannot happen?",
             "Argue that not knowing how a thing happens is no proof that it is impossible."],
      moves:[
        {need:["ignoran*|not knowing|do not know|can not conceive|unexplain*|mechanism|how","no proof|not a proof|proves nothing|prove*|impossib*|refut*|deny"], to:"ignorance", gain:25,
         reply:["*slowly* Not knowing how is not knowing that it cannot."]}
      ],
      traps:[
        {need:["material*|extend*|extension|matter"], cost:1,
         reply:["I said I would sooner grant it matter. You have not talked me out of that yet."]}
      ]
    },
    ignorance:{
      enter:"I demanded an explanation and, when none came, I took the lack of one for a refutation. That is not rigorous, is it? Monsieur Descartes would be pleased. I am not sure I am.",
      stance:"Elisabeth concedes that her failure to see how the soul moves the body does not prove it cannot.",
      hints:["Then what may she grant about an immaterial mind?",
             "Conclude that the mind may be immaterial and still move the body."],
      moves:[
        {need:["immaterial|unextended|without extension|not material|non material|spirit*|thinking thing","move*|moving|act on|acts on|cause*|affect*|interact*|influenc*"], to:"WIN"}
      ],
      traps:[
        {need:["descartes|monsieur"], cost:0,
         reply:["Leave him out of it. He will only gloat, by letter."]}
      ]
    }
  },
  win:"*folds the letter carefully* Very well, #addr#. A mind may be immaterial and still move the body, and my not seeing how is no proof that it cannot. I will write to Monsieur Descartes and tell him so. I will also tell him that he still has not explained it, so that he does not grow vain.",
  lose:"*picks up her mathematics* My brother wants a letter about the war, #addr#, and I have one of Monsieur Descartes's geometry problems half solved. Good day.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "Even a push between two bodies is a mystery; we only see that it happens.",
    "You know from your own experience every moment that your will moves your hand.",
    "Not knowing how a thing happens is no proof that it is impossible.",
    "Then the mind may be immaterial and still move the body."
  ]
};
