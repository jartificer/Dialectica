/* Augustine */
export default {
  id:"augustine", name:"Augustine of Hippo", dates:"354–430 CE", era:"Late antiquity", place:"Hippo Regius, North Africa",
  diff:3, patience:8, glyph:"Au", color:"#6a4c2e", born:354,
  core:"Evil is nothing real, only the absence of good.",
  target:"Evil is something real, not a mere absence.",
  bio:"Bishop of Hippo, former Manichaean, and author of the Confessions, the first great autobiography. Against the Manichees, who said evil was a real substance, he argued that evil is only privation, a lack of good, as blindness is a lack of sight. Yet in the Confessions he could not explain why, as a boy of sixteen, he stole pears he did not even want.",
  voice:{
    claim:["everything that exists is good", "evil is only a lack, like a hole in a garment", "evil has no substance of its own", "whatever is, insofar as it is, is good"],
    tic:["Our heart is restless until it rests in Thee.", "Late have I loved Thee.", "Take up and read, #addr#."],
    image:["Evil is like darkness, which is only light gone missing.", "A wound is not a thing; it is health taken away."],
    addr:["my child","friend","my son","traveller"],
    oath:["God be my witness","Lord, have mercy"],
    gest:["*fingers a worn copy of Paul's letters*","*looks up as if listening*","*sighs from the depths*","*folds his hands*"],
    core:["the privation of good","what I learned against the Manichees","my account of evil"],
    greet:["Peace be with you, #addr#. Sit; the sermon can wait a little."],
    insult:["*gently* I was worse than you at your age, #addr#. Much worse. Go on."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Peace be with you. When I was young I followed the Manichees, who taught that evil is a substance, a dark kingdom at war with the light. I was wrong. God made all things, and all that God made is good. Evil is nothing but the privation of good, as blindness is the lack of sight and darkness the lack of light. It is not a thing at all.",
      stance:"Augustine holds that evil has no being of its own: it is only a lack of good, the way blindness is a lack of sight.",
      hints:["Analogies like darkness help him. Look for an evil that seems to be a presence, not an absence.",
             "Think of pain, or of evil someone *chooses*. Or remind him of the pears he stole as a boy, in the Confessions."],
      moves:[
        {need:["pear*|theft|stole|steal*|stealing|orchard|confession*"], to:"pears", gain:35,
         reply:["*his face clouds* The pears. You have read the Confessions, then. I was sixteen."]},
        {need:["pain|agony|tortur*|cruel*|suffer*|hurt*|sadis*|malice|hatred|spite"], to:"pain", gain:25,
         reply:["#hmm# Pain is felt. You say it seems to be something, not nothing."]}
      ],
      traps:[
        {need:["dark*|cold|shadow*|blind*|hole*|light"], cost:1,
         reply:["Yes: darkness, cold, blindness. Each is an absence. You give me my own examples, #addr#."]},
        {need:["god|allow*|permit*|omnipot*"], cost:1,
         reply:["God permits evil to bring good out of it. But that is another question. I am telling you what evil *is*."]},
        {need:["devil|satan|demon*|manich*|mani"], cost:1,
         reply:["Even the devil's nature is good, for God made it. It is his will that turned. The Manichees thought otherwise, and they were wrong."]}
      ]
    },
    pain:{
      enter:"But pain is the soul's resistance to the loss of some good. A wound hurts because health is taken away. Pain itself bears witness to the good that is missing.",
      stance:"Augustine says pain is only the sign of a lost good: it testifies to the health that is missing.",
      hints:["Pain can be explained away. What about an evil someone *wants*?",
             "Ask him about the pear theft in the Confessions: he says he loved the wrongdoing itself."],
      moves:[
        {need:["pear*|theft|stole|steal*|stealing|orchard|confession*"], to:"pears", gain:30,
         reply:["*his face clouds* The pears."]},
        {need:["want*|chose|choose*|choice|desire*|intend*|deliberate*|on purpose|wills|willed|evil will"], to:"will", gain:25,
         reply:["#hmm# A chosen evil? Then you mean the will. Very well, let us speak of the will."]}
      ],
      traps:[
        {need:["health|wound*|sick*|disease"], cost:1,
         reply:["Exactly: a wound is health taken away. You argue my side, #addr#."]}
      ]
    },
    pears:{
      enter:"There was a pear tree near our vineyard. We shook it at night and carried off huge loads, not to eat but to throw to the pigs. I had better pears at home. I loved nothing in it but the theft itself. *quietly* Yet even then I loved something: a shadowy imitation of freedom, of God's own power, to do what was forbidden and go unpunished.",
      stance:"Augustine admits he loved the theft itself, but says even then he was loving a twisted copy of something good: freedom.",
      hints:["He says he loved ‘the theft itself’. Is a love of wrongdoing an absence?",
             "Argue that the evil will was not missing: it was really there, and it did something."],
      moves:[
        {need:["will|wanting|wanted|want|choice|chose|act|deed|decision|love|loved|desire*|intention*","real|exist*|happen*|present|something|positive|actual*|did|done|occurred|not absent|not nothing|not a lack|not missing|caused|produce*"], to:"will", gain:30,
         reply:["*long pause* My wanting was there. It shook the tree. It was not missing."]}
      ],
      traps:[
        {need:["freedom|free|power|imitat*"], cost:1,
         reply:["Yes, I loved a false freedom, which is to say I still loved a good, wrongly. You prove my point, #addr#."]},
        {need:["pig*|hungry|hunger|food|eat*"], cost:0,
         reply:["We threw them to the pigs! I was not even hungry. That is what troubles me."]}
      ]
    },
    will:{
      enter:"In the City of God I wrote that the evil will has no efficient cause, only a deficient one. It is a turning away from God, a falling short. So it is still a lack.",
      stance:"Augustine says the evil will has only a ‘deficient cause’: it is a turning away, a falling short, and so still a kind of lack.",
      hints:["A turning away is still a turning. Is a turning nothing?",
             "Argue that turning away is an act. It happens, it has effects: the theft really happened. So it is something real."],
      moves:[
        {need:["turn*|act|action|event|deed|choice|chose|theft|will|wanting","real|really|exist*|something|actual*|positive|happen*|occur*|not nothing|not a lack|not an absence|produce*|caused|effect*"], to:"WIN"}
      ],
      traps:[
        {need:["deficien*|lack|absen*|privation|missing"], cost:1,
         reply:["A lack, yes, a deficiency. You are saying my words back to me, #addr#."]},
        {need:["god"], cost:1,
         reply:["Turning away from God, yes. That is what I said."]}
      ]
    }
  },
  win:"*closes the book of Paul* A turning is still a turning. The boy shook the tree, the pears fell, the pigs ate. Something was *done*, not merely left undone. Then the evil will is a real act, even if it is an act of falling away. Very well, #addr#: evil is something real, not a mere absence. I shall add it to my Retractions. That book is getting long.",
  lose:"*rises* I must go and preach; the people of Hippo are waiting. Take up and read, #addr#, and come back when you have.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "What about the pears you stole as a boy?",
    "Your wanting was real; the will to steal was something present, not a lack.",
    "Turning away is still an act; the theft really happened, so it is something real."
  ]
};
