/* Hume */
export default {
  id:"hume", name:"David Hume", dates:"1711–1776", era:"Enlightenment", place:"Edinburgh",
  diff:4, patience:7, glyph:"H", color:"#7b4b5b", born:1711,
  core:"The self is nothing but a bundle of perceptions.",
  target:"There is a real self that unites the perceptions.",
  bio:"‘Le bon David’ — genial, sceptical and famously fond of a good dinner. Hume argued that causation is habit, induction cannot be justified, and the self is a mere bundle of perceptions. But in an appendix to his Treatise he confessed that his account of personal identity had failed.",
  voice:{
    claim:["the self is a bundle of perceptions", "there is no self beneath the perceptions", "I find only perceptions when I look inward"],
    tic:["Be a philosopher, but amidst all your philosophy be still a man.", "Custom is the great guide of human life.", "Pass the biscuits, would you?"],
    image:["Reason is the slave of the passions."],
    addr:["my friend","good friend","dear fellow"],
    oath:["Good heavens","Upon my word"],
    gest:["*sets down his glass of claret*","*chuckles amiably*","*leans back in his armchair*","*reaches for another biscuit*"],
    core:["the bundle theory","my bundle","the bundle of perceptions"]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Welcome, welcome — a glass of claret? When I enter most intimately into what I call *myself*, I always stumble on some particular perception or other: heat or cold, light or shade, love or hatred, pain or pleasure. I never catch myself without a perception. We are nothing but bundles of perceptions, following one another with inconceivable rapidity. There is no self underneath.",
      stance:"Hume says the self is nothing but a ‘bundle’ of perceptions. There is no enduring self that has them.",
      hints:["Read his sentence again. Who is doing the ‘entering’ and the ‘stumbling’?",
             "Ask what ties the bundle together — what makes these perceptions one person's, rather than scattered."],
      moves:[
        {need:["bundle|perception*","tie*|bind*|bound|string|unit*|together|hold*|connect*|what makes|belong*|glue|join*|unif*|collect*"], to:"bind", gain:40,
         reply:["#hmm# What ties the bundle together? *long sip of claret* You have found my sore place."]},
        {need:["who|whom|what","stumbl*|enter*|look*|catch*|search*|notic*|observ*|find*|perceiv*|doing|experienc*|introspect*|catches|finds"], to:"who", gain:25,
         reply:["*chuckles* Who stumbles? A habit of grammar."]},
        {need:["memor*|remember*|recall*|past"], to:"memory", gain:20,
         reply:["#hmm# Memory, yes."]}
      ],
      traps:[
        {need:["soul|substance|spirit|immortal*"], cost:1,
         reply:["Substance? Of that I have no impression, and so no idea. ‘Soul’ is a word that covers our ignorance. You'll have to do better than the schoolmen, #addr#."]},
        {need:["cause*|causation|induct*|billiard*|sunrise|sun rise|habit|custom"], cost:1,
         reply:["Causation is a matter of custom — constant conjunction, nothing more. A delightful topic, but for another evening. We were speaking of the self."]},
        {need:["descartes|cogito|i think"], cost:1, reply:["Descartes' ‘I think’ helps itself to the ‘I’. Look inward and you find only the thinking."]},
        {need:["god"], cost:1, reply:["*smiles* I'd rather not, if it's all the same. My publisher is nervous enough."]}
      ]
    },
    who:{
      enter:"‘I’ is a convenient word, like ‘the parliament’. There is no parliament over and above its members.",
      stance:"Hume says ‘I’ is just a word for the collection, like ‘parliament’ is a word for its members.",
      hints:["Members of a parliament are united by something. What unites perceptions?",
             "Ask what binds the perceptions into one bundle — and why they never get mixed up with someone else's."],
      moves:[
        {need:["unit*|together|tie*|bind*|bound|connect*|join*|belong*|membership|glue|hold*|organi*|whole|one bundle|same bundle|mixed|separate|whose"], to:"bind", gain:30,
         reply:["#hmm# What unites them? *long sip of claret* You have found my sore place."]}
      ],
      traps:[
        {need:["parliament|politic*|government"], cost:1, reply:["Let us not discuss the actual parliament, #addr#. I wish to keep my good humour."]}
      ]
    },
    memory:{
      enter:"But memory does not reveal a self. It discovers relations of resemblance and causation among perceptions, and the imagination runs smoothly along them, inventing an identity.",
      stance:"Hume says memory links perceptions by resemblance and causation, and imagination invents the ‘identity’.",
      hints:["Memory connects perceptions — but whose? Do your memories ever wander into another person's bundle?",
             "Ask why perceptions never get mixed up between people. What makes a perception *yours*?"],
      moves:[
        {need:["whose|own|belong*|mine|yours|other person|someone else|others|mixed|confus*|another person|other people"], to:"bind", gain:30,
         reply:["*long sip of claret* You have found my sore place."]}
      ],
      traps:[
        {need:["forget*|forgot|amnesia"], cost:1, reply:["Indeed — we forget most of our past, and still call ourselves the same. All the better for my theory: identity is a fiction stretched over the gaps."]}
      ]
    },
    bind:{
      enter:"In the Appendix to my Treatise I confessed it: when I come to explain the principles that unite our successive perceptions, all my hopes vanish. Perceptions are distinct existences, and the mind never perceives any real connection among distinct existences. I plead the privilege of a sceptic: it is too hard for my understanding.",
      stance:"Hume admits he cannot explain what unites the perceptions into one self, and retreats into scepticism.",
      hints:["Perceptions never wander between people. What does that show?",
             "Argue that a perception can't exist unowned: every pain is somebody's pain."],
      moves:[
        {need:["perceiv*|subject|someone|somebody|bearer|owner|experienc*|haver","requir*|presuppos*|need*|must|without|cannot|imply|implies|assum*"], to:"WIN", gain:100},
        {need:["own*|mine|belong*|whose|yours|someone*|somebody|another person|other person|other people|two people|share*|swap*|transfer*|mix*|wander*|separate","@neg|always|never|cannot|must|only"], to:"owner", gain:25,
         reply:["True — your toothache never strays into my bundle, though it resembles mine and has causes like mine. Something makes a perception *this* mind's and not another's."]}
      ],
      traps:[
        {need:["sceptic*|skeptic*|privilege"], cost:1, reply:["Yes, I take refuge there. Pull me out, if you can, #addr#."]},
        {need:["soul|substance"], cost:1, reply:["Substance again? I have no impression of it. Give me something I can find."]}
      ]
    },
    owner:{
      enter:"Yet I never perceive this something. Look as I may, I find only more perceptions.",
      stance:"Hume grants that perceptions always belong to one mind, but says he never perceives the owner.",
      hints:["Must you perceive the perceiver for it to be real? Think of the eye and seeing.",
             "Argue that a perception requires a subject who has it. The eye doesn't see itself, yet it sees: the self is the having, not one more item in the bundle."],
      moves:[
        {need:["subject|owner|self|perceiver|bearer|someone|somebody|haver|eye|having|viewpoint|point of view|i am|experiencer|observer","requir*|presuppos*|need*|must|without|cannot|imply|implies|assum*|itself|not one of|not another|condition|not a perception|isn't a perception|not itself"], to:"WIN"}
      ],
      traps:[
        {need:["soul|substance"], cost:1, reply:["Substance again? I have no impression of it, #addr#."]}
      ]
    }
  },
  win:"*sets down the claret* The eye does not see itself, and yet there is seeing. Every perception I stumbled upon was stumbled upon by… well, by *someone*. Very well, #addr# — there is a real self that unites the perceptions, though it is no perception itself. I shall add it to the Appendix, beside my other confessions. Now, backgammon? Philosophy goes better after a game.",
  lose:"*yawns good-naturedly* Reason is, and ought only to be, the slave of the passions — and my passion now is for dinner. Another time, #addr#.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "What ties the bundle of perceptions together?",
    "Every perception needs someone who has it; a pain cannot exist without a subject."
  ]
};
