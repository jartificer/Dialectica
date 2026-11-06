/* Hypatia */
export default {
  id:"hypatia", name:"Hypatia of Alexandria", dates:"c. 360–415 CE", era:"Late antiquity", place:"A lecture hall in Alexandria",
  diff:3, patience:8, glyph:"Υ", color:"#3a5a7a", born:360,
  core:"The philosopher's task is to rise above the quarrels of the city toward the One, through mathematics and contemplation.",
  target:"A philosopher must take part in the life of the city.",
  bio:"Mathematician, astronomer and Neoplatonist philosopher, daughter of the mathematician Theon of Alexandria. She edited and wrote commentaries on works of geometry and astronomy, and taught Plato and Aristotle to pagans and Christians alike, walking through the city in a philosopher's cloak and lecturing to anyone who would listen. The Roman prefect Orestes sought her counsel. In 415, caught in the feud between Orestes and the bishop Cyril, she was murdered by a mob.",
  voice:{
    claim:["the soul must rise above the noise of the city", "mathematics leads the mind toward the One", "the philosopher belongs to contemplation, not to faction", "the quarrels of the agora are beneath the wise"],
    tic:["Let us draw a figure and see.", "Geometry has no bishops and no prefects, #addr#.", "Let us look at it the way Euclid would."],
    image:["A circle drawn in the sand stays perfect while the crowd tramples the rest of the beach.", "The astrolabe turns, and the noise of the harbour falls away."],
    addr:["my friend","my student","friend","stranger"],
    oath:["By the Muses","By Athena"],
    gest:["*draws a circle in the air*","*adjusts the folds of her philosopher's cloak*","*sets down her astrolabe*","*taps a diagram in the sand tray*"],
    core:["the ascent to the One","the life of contemplation","my mathematics"],
    greet:["*looks up from a diagram* Welcome. Sit, and tell me what you want to learn. Or to teach; I accept both."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Look at the stars, my friend, not at the street. The city below is shouting about bishops and prefects and whose god is stronger. Mathematics lifts the soul above all that, toward the One, where nothing is ever in dispute. A philosopher who wants a clear mind must keep away from the quarrels of the agora.",
      stance:"Hypatia holds that the philosopher should rise above the city's quarrels toward the One.",
      hints:["Where does she actually teach? In a quiet garden, far from the crowd?",
             "Point out that she lectures in public, in the middle of the city, to anyone who comes."],
      moves:[
        {need:["public*|street*|agora|crowd*|anyone|everyone|middle of the city","teach*|lectur*|walk*|cloak|speak*|talk*"], to:"public", gain:25,
         reply:["*smooths her cloak* I lecture in public, yes. Knowledge should not be locked away."]}
      ],
      traps:[
        {need:["star*|astrolab*|hydromet*|planet*|astronom*"], cost:0,
         reply:["I built an astrolabe once, for my student Synesius. Another conversation. Go on."]},
        {need:["plotinus|contemplat*"], cost:1,
         reply:["Contemplation, the ascent of Plotinus. You are making my case for me, #addr#."]},
        {need:["theon|father|daughter"], cost:0,
         reply:["My father taught me geometry before I could spin wool. He would like you. Go on."]}
      ]
    },
    public:{
      enter:"But teaching is not quarrelling. I bring geometry into the street; I do not take sides in it. The philosopher may walk among the crowd while her mind stays among the stars.",
      stance:"Hypatia says she teaches in public but takes no part in the city's quarrels.",
      hints:["Who comes to her for advice, and about what?",
             "Remind her that the prefect Orestes and the city's magistrates come to her for counsel on how to govern."],
      moves:[
        {need:["orestes|prefect|magistrat*|governor*|official*|ruler*","advice|advis*|counsel*|consult*|govern*|ask*"], to:"counsel", gain:25,
         reply:["*a pause* Orestes. You have been listening to the gossip at the harbour."]}
      ],
      traps:[
        {need:["geometr*|conic*|diophantus|apollonius|euclid"], cost:1,
         reply:["Conic sections are beautiful, and I have written on them. But you are describing my own work to me."]},
        {need:["neutral|impartial*"], cost:1,
         reply:["Impartial, exactly. You agree with me, #addr#."]}
      ]
    },
    counsel:{
      enter:"Orestes asks me, yes. The magistrates too. I tell them to be just and moderate, which is advice, not politics. Still… it is a strange kind of withdrawal that keeps a chair ready for the prefect.",
      stance:"Hypatia admits the city's rulers seek her counsel, but calls it advice, not politics.",
      hints:["If the wise refuse to speak, who is left speaking to the crowd?",
             "Argue that if philosophers withdraw, the city is left to fanatics and the mob."],
      moves:[
        {need:["withdraw*|silent|silence|leave|left|abandon*|retreat*|refus*","fanatic*|mob|mobs|zealot*|violen*|hatred|rage|shout*|demagog*|worst"], to:"mob", gain:25,
         reply:["*she looks toward the window, where the noise is* #hmm#"]}
      ],
      traps:[
        {need:["cyril|bishop*|church|christian*|pagan*"], cost:1,
         reply:["I teach Christians as gladly as pagans. Synesius became a bishop and still writes to me as his teacher. I take no side."]},
        {need:["just|justice|moderat*"], cost:1,
         reply:["Justice and moderation: what I tell Orestes. Yes. That is advice, #addr#."]}
      ]
    },
    mob:{
      enter:"Then the street belongs to whoever shouts loudest. Yes. I have heard them outside the lecture hall. If reason will not go out into the city, unreason will come in.",
      stance:"Hypatia grants that if philosophers withdraw, the city is left to whoever shouts loudest.",
      hints:["So is the life of the city a distraction from philosophy, or part of its work?",
             "Conclude that a philosopher must take part in the life of the city: it is part of the work, not a distraction from it."],
      moves:[
        {need:["part|share|duty|belong*|engage*|involve*|participat*|serve|task|work","city|cities|civic|public|polis|alexandria|politic*|citizen*"], to:"WIN"}
      ],
      traps:[
        {need:["heaven*|sky|stars"], cost:1,
         reply:["The stars will keep, #addr#. They always do."]}
      ]
    }
  },
  win:"*draws her cloak around her and stands* Then I will not keep my mind in the heavens and leave my feet to others. Plotinus climbed toward the One, but he came down again to teach. Very well, #addr#: a philosopher must take part in the life of the city. Tomorrow I lecture in the agora, as always. Come and argue with me there.",
  lose:"*turns back to her astrolabe* The stars are patient, #addr#. I am somewhat less so. Another day.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "But you lecture in public, in the middle of the city, to anyone who comes.",
    "The prefect Orestes and the magistrates come to you for counsel on how to govern.",
    "If philosophers withdraw, the city is left to fanatics and the mob.",
    "Then a philosopher must take part in the life of the city; it is part of the work."
  ]
};
