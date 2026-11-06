/* Aquinas */
export default {
  id:"aquinas", name:"Thomas Aquinas", dates:"1225–1274", era:"Middle Ages", place:"The University of Paris",
  diff:4, patience:7, glyph:"T", color:"#5a4a7a", born:1225,
  core:"Reason alone can prove that God exists: the Five Ways lead to a first mover, a first cause, and this all call God.",
  target:"The Five Ways cannot prove the God of faith: that God is three persons and became man comes only from revelation.",
  bio:"Dominican friar, nicknamed ‘the dumb ox’ by classmates for his size and silence. His teacher Albert the Great said the ox's bellowing would be heard throughout the world. In the Summa Theologiae he joined Aristotle to Christian theology and gave the Five Ways, arguments from motion, causation, contingency, degrees of perfection and design. Near the end of his life he had an experience during Mass and stopped writing, saying that all he had written seemed like straw.",
  voice:{
    claim:["reason can prove that God exists", "there must be a first mover, and this everyone understands to be God", "an essentially ordered series must have a first member", "faith and reason cannot contradict each other"],
    tic:["I answer that…", "Objection noted. On the contrary…", "Grace does not destroy nature but perfects it, #addr#."],
    image:["The hand moves the stick, the stick moves the stone; take away the hand and nothing moves.", "An arrow does not find the target by itself; the archer aims it."],
    addr:["brother","master","my student","friend"],
    oath:["By the saints","Deo gratias"],
    gest:["*folds his large hands over the Summa*","*dictates something to an invisible secretary*","*shifts his considerable weight on the bench*","*raises one finger: ‘Objection’*"],
    core:["the Five Ways","natural theology","the harmony of faith and reason"],
    greet:["Pax. Sit, brother. State your objection, and I will answer it in order."],
    stuffing:["You have listed seven objections and answered none. One at a time, brother: objection, contrary, response."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"The first and plainest way is from motion. Whatever is moved is moved by another. That other, if it moves, is moved by another again. But this cannot go on to infinity, for then there would be no first mover, and so no other movers either. Therefore there must be a first mover, moved by nothing. And this everyone understands to be God.",
      stance:"Aquinas argues that a chain of movers cannot go on forever, so there must be an unmoved first mover, which is God.",
      hints:["Why can the chain not go back forever?",
             "Ask why the chain of movers could not go on forever, in an infinite regress."],
      moves:[
        {need:["infinite*|infinity|regress*|forever|endless*|no first|never end*|go on|goes on|back and back|for ever"], to:"regress", gain:25,
         reply:["#gest# The infinite regress. The obvious objection, and I have an answer."]}
      ],
      traps:[
        {need:["evil|suffer*"], cost:1,
         reply:["I answer that God allows evil in order to bring good out of it. The objection from evil I have already met in the same article."]},
        {need:["design|purpose|arrow*|archer|order"], cost:1,
         reply:["That is my Fifth Way, brother. We are on the First."]},
        {need:["straw|dumb ox|ox|albert"], cost:0,
         reply:["*laughs, shaking the bench* The dumb ox, yes. Go on."]},
        {need:["bible|scripture|church|pope"], cost:1,
         reply:["I do not ask you to believe here. I argue from what the senses show: things move."]}
      ]
    },
    regress:{
      enter:"I grant more than you expect. A series like father begetting son could, for all reason shows, go back forever; I cannot prove the world had a beginning. But a series ordered here and now, the hand moving the stick moving the stone, needs a first mover, or nothing moves at all.",
      stance:"Aquinas distinguishes series in time (which might be infinite) from series ordered here and now, which need a first mover.",
      hints:["Grant him a first mover. Does that get him all the way to the God he prays to?",
             "Say: even if I grant a first mover, why is it the God you pray to?"],
      moves:[
        {need:["grant*|suppos*|accept*|fine|even if|allow*|okay|admit*|concede*","first mover|first cause|unmoved|mover|cause|first","god|why|how|personal|same|christian*|pray*|trinity|good|love*"], to:"first", gain:25,
         reply:["You grant the first mover and then ask what it is. That is the right question. I answer in the next articles."]}
      ],
      traps:[
        {need:["hand|stick|stone"], cost:1,
         reply:["The hand, the stick, the stone. My example, brother; what about it?"]},
        {need:["eternal|beginning|creation|big bang"], cost:1,
         reply:["Whether the world began, reason cannot settle; I hold it by faith. It does not touch the First Way."]}
      ]
    },
    first:{
      enter:"Because the first mover has no potential at all: it is pure act. What is pure act is unchanging, simple, one, perfect, and therefore good. And this all call God.",
      stance:"Aquinas argues the first mover must be pure act, and therefore simple, one, perfect and good: God.",
      hints:["Who else proved a first mover, without ever thinking it was the Christian God?",
             "Bring up Aristotle: he proved an unmoved mover too, and never knew of the Trinity or the Incarnation."],
      moves:[
        {need:["aristotle|philosopher|pagan*|unmoved mover|greek*","not|never|nothing|no|without|unaware|ignor*|indifferent|care*|love*|pray*|know*"], to:"arist", gain:25,
         reply:["*the finger comes down slowly* The Philosopher. Yes. His mover thinks only of thinking."]}
      ],
      traps:[
        {need:["pure act|simple|simplicity|potential*|potency"], cost:1,
         reply:["Pure act, simplicity: I have just said so. Bring me something new."]}
      ]
    },
    arist:{
      enter:"True. Reason can show that the first cause knows and wills; I argue it at length. But Aristotle never dreamed that God is three persons, that the Word became flesh and died for us: reason cannot reach these. They are known by revelation and received by faith. Reason only shows the preambles.",
      stance:"Aquinas admits the Trinity and Incarnation are beyond reason; the Five Ways only reach the ‘preambles’ of faith.",
      hints:["So what exactly do the Five Ways reach, and what comes from elsewhere?",
             "Argue that the Five Ways reach only a first cause; that it is the God of faith comes from revelation, not proof."],
      moves:[
        {need:["faith|revelation|reveal*|scripture|believ*|grace","not|beyond|only|cannot|can not|more than|outside|alone|proof|prove*|reason"], to:"WIN"}
      ],
      traps:[
        {need:["trinity|incarnation|three persons"], cost:1,
         reply:["The Trinity is above reason, not against it. I have said this."]}
      ]
    }
  },
  win:"*closes the Summa and sits very still* The Ways climb to a first cause, and there the ladder ends. That this cause is three persons, and became flesh, no syllogism shows. I knew it; I wrote it; I did not let it humble the Ways as it should. Very well, #addr#: the Five Ways cannot prove the God of faith; that comes from revelation. Faith must carry what reason cannot. *quietly* It all seems a little like straw.",
  lose:"*rises, with some effort* Objection noted, and dismissed. I have a disputation at the hour of terce. Pax tecum.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "Why could the chain of movers not go on forever, in an infinite regress?",
    "Even if I grant a first mover, why is it the God you pray to?",
    "Aristotle proved an unmoved mover too, and never knew of the Trinity or the Incarnation.",
    "So the Five Ways reach a first cause, but the God of faith, three persons and made man, comes from revelation, not proof."
  ]
};
