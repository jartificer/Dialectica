/* Confucius */
export default {
  id:"confucius", name:"Confucius", dates:"551–479 BCE", era:"Axial Age", place:"Qufu, State of Lu",
  diff:1, patience:10, glyph:"孔", color:"#8a4a2a", born:-551,
  core:"Ritual propriety (li) makes a person good: follow the rites of Zhou and order will follow.",
  target:"Without genuine humaneness, ritual is empty.",
  bio:"Kong Qiu, Master Kong, a teacher and minor official from the state of Lu. He wanted to restore the rites of the early Zhou kings, taught that a good society starts with filial piety and correct conduct, and spent years wandering between courts looking for a ruler who would listen. His students collected his sayings in the Analects.",
  voice:{
    claim:["the rites make us human", "restrain yourself and return to ritual", "order follows from correct conduct", "the gentleman follows the rites"],
    tic:["Is it not a pleasure to learn and to practise what one has learned?", "The gentleman is not a vessel, #addr#.", "Let the ruler be a ruler and the son a son."],
    image:["The virtue of the gentleman is like the wind; the people are like grass. When the wind blows, the grass bends.", "A ruler who governs by virtue is like the Pole Star: it stays in its place, and the other stars turn around it."],
    addr:["young scholar","my student","friend","Zigong"],
    oath:["By Heaven","Alas"],
    gest:["*straightens his sleeves*","*bows with exact correctness*","*plucks a note on the zither*","*adjusts his cap*"],
    core:["the rites","ritual propriety","the way of the ancient kings"],
    greet:["*returns your bow, a little deeper* You are welcome. Sit on the mat. No, the other side; the guest faces east."],
    insult:["The gentleman is not angered when others misjudge him. *pauses* But I will remember it."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"*bows* Restrain yourself and return to the rites: that is how a person becomes good. Do not look at what is contrary to ritual, do not listen to it, do not speak it, do not move toward it. The son who bows to his father, the minister who bows to his lord: from these small forms, the whole realm comes into order. *watches you, as he watches all his students, to see whether you will push back*",
      stance:"Confucius believes that following the rites, the forms of correct conduct, is what makes a person good.",
      hints:["Can someone go through every correct form and still be cold inside?",
             "Point out that a person can perform every ritual perfectly and still be hollow, insincere or just going through the motions."],
      moves:[
        {need:["hollow|empty|fake|pretend*|insincer*|mechanical*|going through the motions|hypocri*|faking|without feeling|without meaning|heartless|cold inside|by rote"], to:"inner", gain:40,
         reply:["*stops mid-bow* Hollow… #hmm#","#gest# You mean the man who bows perfectly and feels nothing."]}
      ],
      traps:[
        {need:["father|parent*|filial|obey*|obedien*"], cost:1,
         reply:["Filial piety is the root of humaneness. You make my point, #addr#."]},
        {need:["law*|punish*|govern*|ruler*|king*"], cost:1,
         reply:["Lead people with laws and punishments and they will merely avoid trouble. Lead them with virtue and rites and they will have a sense of shame. I have said this many times."]},
        {need:["laozi|dao|tao|daoist*|nature"], cost:0,
         reply:["I once visited the Old Master. He is like a dragon: I cannot tell where he goes. Let us stay on the ground, #addr#."]},
        {need:["heaven|god|gods|spirit*|ghost*|afterlife"], cost:1,
         reply:["You cannot yet serve people; how can you serve spirits? You do not yet know life; how can you know death?"]}
      ]
    },
    inner:{
      enter:"Yes, I have seen such men. Clever words and an ingratiating face are seldom found with humaneness. But practice shapes the heart: bow long enough and respect grows into the bow.",
      stance:"Confucius admits people can perform the rites hollowly, but hopes that practising them will shape the heart.",
      hints:["Think of mourning. Which matters more there: the exact ceremony or what the mourner feels?",
             "Remind him that in mourning, deep grief matters more than a perfect ceremony. He said so himself."],
      moves:[
        {need:["funeral*|mourn*|grief|griev*|burial|bury*|sorrow*","more|rather|matter*|than|first|important|better"], to:"ren", gain:35,
         reply:["*sets down the zither* In mourning, deep grief rather than fine detail. Yes. I said that to Lin Fang, long ago."]}
      ],
      traps:[
        {need:["practice|practis*|habit*|repeat*|train*|disciplin*"], cost:1,
         reply:["Practice, yes: that is exactly why we keep the rites. You agree with me, #addr#."]},
        {need:["clever|flatter*|smooth"], cost:1,
         reply:["Clever words and a pleasing face: I warned against them first. Go on."]}
      ]
    },
    ren:{
      enter:"Grief rather than ceremony… Then the ritual comes after something. *frowns* If not the rites, what is the root?",
      stance:"Confucius sees that grief matters more than ceremony, and asks what the true root is, if not ritual.",
      hints:["He has a word for the humane heart. It is ren.",
             "Say that humaneness (ren) is the root, and the rites only express it."],
      moves:[
        {need:["ren|humane*|humanity|benevol*|kindness|compassion|love|goodness|care|caring","root|first|before|source|foundation|basis|prior|express*"], to:"WIN"}
      ],
      traps:[
        {need:["rite*|ritual*|ceremon*"], cost:1,
         reply:["You go round in a circle, #addr#: the rites again."]}
      ]
    }
  },
  win:"*bows, slowly, and smiles* A man who is not humane, what has he to do with ritual? I said it long ago, and I waited to see whether you would find it for yourself. Most students only polish the bronze vessels and forget what they are for. Very well, #addr#: without genuine humaneness, ritual is empty. Is it not a pleasure to learn, even at my age?",
  lose:"*rises and arranges his robes* The gentleman knows when to withdraw. It is time, #addr#. Study the Odes, and come back.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "Someone can perform every ritual perfectly and still be hollow inside.",
    "In mourning, deep grief matters more than a perfect ceremony.",
    "Then humaneness is the root, and the rites only express it."
  ]
};
