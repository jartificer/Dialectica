/* Plato */
export default {
  id:"plato", name:"Plato", dates:"c. 427–347 BCE", era:"Ancient Greece", place:"The Academy, Athens",
  diff:3, patience:8, glyph:"Π", color:"#3d5c9c", born:-427,
  core:"The Forms are eternal and exist apart from the things we see.",
  target:"The Forms do not exist apart from the things we see.",
  bio:"Socrates' greatest student and founder of the Academy. Plato taught that behind the shifting world of the senses lie eternal, perfect Forms. Remarkably, in his dialogue Parmenides he raised devastating objections against his own theory — including the famous ‘Third Man’.",
  voice:{
    claim:["the Forms are eternal", "Beauty itself never fades", "the things we see are only shadows of the Forms"],
    tic:["Look past the shadows, #addr#.", "Turn your soul around.", "Geometry first, then philosophy."],
    image:["We are prisoners who mistake shadows for things.", "The soul sees with the eye of reason."],
    addr:["my friend","student","friend"],
    oath:["By Zeus","By the gods"],
    gest:["*draws a circle in the sand*","*gestures towards the sky*","*smooths his robe*","*taps his stylus against a wax tablet*"],
    core:["the theory of Forms","the Forms","my Forms"]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Welcome to the Academy. Let none ignorant of geometry enter — but you look clever enough. Consider: beautiful things fade, yet Beauty itself never does. Every just act is imperfect, yet we know Justice. These Forms are eternal, and they exist apart from the shifting things of sense, which are mere shadows on the wall of the cave.",
      stance:"Plato holds that perfect, eternal Forms (Beauty, Justice, Largeness…) exist separately from the physical things that ‘participate’ in them.",
      hints:["How exactly do ordinary things relate to the Forms? Ask him.",
             "Ask how a thing ‘participates’ in a Form. Or ask what large things and Largeness itself have in common."],
      moves:[
        {need:["third man|regress*|infinit*|another form|further form|endless forms|new form"], to:"tma", gain:50,
         reply:["*sets down his stylus* The Third Man… You have read my Parmenides, then. Let me state it myself, since I wrote it."]},
        {need:["particip*|partak*|share*|sharing|relat*|connect*|link*|how do|how does|in common"], to:"part", gain:30,
         reply:["#hmm# The relation between things and Forms — the very question."]},
        {need:["see|seen|evidence|prove*|proof|sense*|observ*|show|where are|where is|exist*"], to:"evid", gain:20,
         reply:["#gest# You want to *see* the Forms? Then you are still looking at the shadows."]}
      ],
      traps:[
        {need:["cave|shadow*|prisoner*"], cost:1, reply:["The cave is my image, not your argument. Images persuade children. Bring me an argument, #addr#."]},
        {need:["republic|king*|poet*|politic*|city|state|democra*"], cost:1, reply:["We are not here to discuss politics, #addr#. The Forms."]},
        {need:["god|gods|demiurge|creat*"], cost:1, reply:["The craftsman of the Timaeus looked to the Forms as his model. The Forms come first, even for him."]}
      ]
    },
    evid:{
      enter:"The Forms are not seen with the eyes but grasped by the mind. No circle you draw is perfectly round, yet the geometer reasons about the perfect circle. Where does he find it, if not among the Forms?",
      stance:"Plato argues we must know the perfect Forms through reason, since no physical circle is perfect.",
      hints:["Where else could the idea of a perfect circle come from?",
             "Suggest the mind abstracts ‘circle’ from many round things — then ask how those things relate to the Form at all."],
      moves:[
        {need:["abstract*|mind|concept*|idea*|imagin*|generali*|idealiz*|from things|many|limit|approximat*|thought|invent*"], to:"part", gain:25,
         reply:["Abstraction, you say? But to abstract roundness, the mind must already recognise roundness… #hmm# Still, you press a deeper question: how do the things and the Forms relate?"]},
        {need:["particip*|partak*|share*|sharing|relat*|connect*|link*|how do|how does"], to:"part", gain:25,
         reply:["The relation — yes, that is the heart of it."]}
      ],
      traps:[
        {need:["cave|shadow*"], cost:1, reply:["The cave again. An image, #addr#, not a proof."]}
      ]
    },
    part:{
      enter:"A thing is beautiful because it participates in Beauty itself. The Form is wholly present in each, the way one and the same day is present in many places at once.",
      stance:"Plato says things ‘participate’ in Forms, and that the whole Form is present in each thing, like a single day present in many places.",
      hints:["The ‘day’ comparison is suspicious. Swap it for something physical, like a sail spread over many people.",
             "Is the whole Form in each thing, or only part of it? Or is participation just resemblance — and then what?"],
      moves:[
        {need:["sail|cloth|blanket|sheet|tent|cover*|piece*|part|parts|divid*|split|portion|whole"], to:"dil", gain:25,
         reply:["A sail spread over many people! Then each is covered by only a part of it… and the Form would be divided — Largeness cut into pieces smaller than Largeness. *rubs his brow* Absurd. Then let us say things participate by *resembling* the Forms, as copies resemble a model."]},
        {need:["resembl*|similar*|copy|copies|copied|imitat*|image*|likeness|model|alike|mirror*"], to:"dil", gain:25,
         reply:["Resemblance — yes. Things are copies; Forms are the models they imitate. That is what participation is."]}
      ],
      traps:[
        {need:["day|sun|light"], cost:1, reply:["The day is everywhere at once without being divided. Why not a Form likewise? You have not answered the comparison, #addr#."]}
      ]
    },
    dil:{
      stance:"Plato now says things relate to Forms by resembling them, as copies resemble an original.",
      hints:["If a large thing resembles Largeness, both are large. What makes them both large?",
             "Argue that if things resemble a Form, a further Form is needed to explain what they share — and so on forever (the Third Man)."],
      moves:[
        {need:["another|further|third|second|new|extra|higher|again|additional","form*|largeness|idea|model"], to:"tma", gain:30, reply:["#hmm#"]},
        {need:["regress*|infinit*|third man|endless|forever|on and on|never end*|ad infinitum"], to:"tma", gain:30, reply:["#hmm#"]}
      ],
      traps:[]
    },
    tma:{
      enter:"If the large things and Largeness itself are alike in being large, then another Largeness appears over them all, and another over those, and the Forms become unlimited in number… *long pause* Perhaps, then, the Forms are only thoughts, existing in souls?",
      stance:"Facing an infinite regress, Plato wonders whether the Forms are only thoughts in the mind.",
      hints:["If a Form were just a thought, it would be a thought *of* something. Of what?",
             "Suggest the Forms exist only in the things themselves, not apart — as their structure or nature. (This is what his student Aristotle argued.)"],
      moves:[
        {need:["in things|in the things|in objects|in each|within|inside|immanent|in matter|not separate|not apart|inseparabl*|in particulars|structure|nature of|aristotle|in the world|embodied|part of things|belong to things"], to:"WIN"}
      ],
      traps:[
        {need:["thought*|mind|idea*|concept*|soul|head|mental"], cost:1,
         reply:["Only thoughts? But every thought is a thought *of* something — of a single Form that it thinks. We are back where we began, #addr#. That will not do."]}
      ]
    }
  },
  win:"*stares at the circle in the sand, then slowly rubs it out* My pupil Aristotle has been saying this in the garden for years — that the Forms are in the things, not above them. I called it ingratitude. Perhaps it was gratitude. Very well, #addr#: the Forms do not exist apart from the things we see. Write it down before I think better of it.",
  lose:"*returns to his tablet* You are still chained in the cave, #addr#. When you have turned around, come back.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "How exactly do beautiful things participate in Beauty itself?",
    "Then is the Form like a sail spread over many people, each covered by only a part?",
    "If large things resemble Largeness, then we need another Form to explain what they share, and so on forever.",
    "The Forms exist only in the things themselves, as their structure."
  ]
};
