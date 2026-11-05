/* Protagoras */
export default {
  id:"protagoras", name:"Protagoras of Abdera", dates:"c. 490–420 BCE", era:"Ancient Greece", place:"Abdera, Thrace",
  diff:2, patience:9, glyph:"Π", color:"#7a5a9a", born:-490,
  core:"Man is the measure of all things — truth is relative to each person.",
  target:"Some truths are not relative to any person.",
  bio:"The most famous Sophist, and the first to charge fees for teaching. He promised to make his students better citizens and better speakers — to ‘make the weaker argument the stronger’. Plato's Theaetetus tests his relativism to destruction.",
  voice:{
    claim:["each person is the measure", "what seems true to you is true for you", "no opinion is truer than another"],
    tic:["For you, perhaps.", "I could argue the other side just as well, #addr#.", "Shall I make the weaker argument the stronger?"],
    image:["The same wind is cold to one and warm to another."],
    addr:["my friend","my clever friend","dear student"],
    oath:["By Hermes","By the gods of commerce"],
    gest:["*adjusts his fine cloak*","*counts coins absently*","*smiles like a lawyer*","*spreads his hands*"],
    core:["my measure","the measure doctrine","my teaching"]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Man is the measure of all things — of things that are, that they are, and of things that are not, that they are not. The same wind is cold to you and warm to me; who is to say which of us is wrong? Each person's judgment is true for that person. Shall we debate? I warn you, I can make the weaker argument the stronger.",
      stance:"Protagoras says truth is relative: whatever seems true to someone is true for them. There is no truth beyond these points of view.",
      hints:["If you simply disagree, Protagoras will say your view is ‘true for you’. Try turning his doctrine on itself.",
             "His doctrine says your belief is true for you. What if your belief is that his doctrine is false?"],
      moves:[
        {need:["doctrine|theory|claim|view|statement|thesis|relativism|relativ*|measure|position|principle|saying|idea","@contradict|false|wrong|itself|self|own|apply|applies|disbeliev*|deny*|denies|reject*"], to:"peri", gain:45,
         reply:["#hmm# Ah — you turn the doctrine around. My measure grants that every belief is true… including the belief that my measure is false. And since most people do not believe that man is the measure, my doctrine would be false more often than true. *frowns* Socrates once tried that one."]},
        {need:["@truth|wrong|false|mistaken|objective*|absolut*|disagree|incorrect"], to:"both", gain:20,
         reply:["#gest# Then it is true for you that I am wrong, and true for me that I am right. How pleasant — we are both right! You see how my doctrine dissolves every quarrel."]}
      ],
      traps:[
        {need:["wind|cold|warm|feel*|percept*|sense*|taste*|sweet|bitter"], cost:1,
         reply:["Exactly — perceptions differ, and each is true for the one who perceives. You are fighting on my ground, #addr#."]},
        {need:["math*|number*|geometr*|plus|triangle|circle|two"], cost:1,
         reply:["Mathematics? The geometer says a line touches a circle at only one point. But no hoop you can make does so — it touches the ruler along a stretch. Even there, man is the measure."]},
        {need:["god|gods"], cost:1,
         reply:["About the gods I cannot know whether they exist or not; the subject is obscure and life is short. Let us leave them out of it."]}
      ]
    },
    both:{
      stance:"Protagoras claims that when you think he is wrong, that's true for you, and he is right for himself — so you are both right.",
      hints:["What does his doctrine say about the particular belief ‘Protagoras' doctrine is false’?",
             "If your belief that his doctrine is false is true, his doctrine has to count its own falsehood as true. Say so."],
      moves:[
        {need:["doctrine|theory|claim|view|statement|thesis|relativism|relativ*|measure|position|principle|idea","@contradict|false|wrong|itself|self|own|apply|applies|disbeliev*|deny*|denies|reject*"], to:"peri", gain:30,
         reply:["#hmm# Clever. You say: by my own measure, the belief that my measure is false is itself true. So my doctrine admits its own refutation. *frowns* Socrates once tried that one too."]},
        {need:["both","@contradict|cannot|can't|impossible|absurd|nonsense|not both|same time"], to:"peri", gain:30,
         reply:["Both cannot be right, you say? But on my view they can — unless… unless one of the things believed is that my view itself is false. *frowns* Then my doctrine must call its own denial true."]}
      ],
      traps:[]
    },
    peri:{
      enter:"But here is my reply: it is false *for them*. For me, it remains true. Every truth is somebody's truth.",
      stance:"Protagoras retreats: his doctrine is only ‘true for him’.",
      hints:["If no opinion is truer than another, why do people pay him to teach?",
             "Ask what a teacher knows better than a student. Or ask whose prediction about tomorrow is right: the doctor's or the feverish patient's?"],
      moves:[
        {need:["teach*|fee*|money|pay*|paid|charg*|student*|pupil*|lesson*|sophist|wisdom|wise|expert*|tuition|sell*|students"], to:"teach", gain:25,
         reply:["*shifts uneasily* I teach… I make people better speakers, better citizens. I do not claim their old opinions were false — only that the new ones are better."]},
        {need:["future|tomorrow|predict*|doctor*|physician|fever|weather|wine|harvest|will happen|cook"], to:"teach", gain:25,
         reply:["The future? The patient thinks he will be well tomorrow; the doctor thinks he will have a fever. *hesitates* I would say the doctor's opinion is… better."]}
      ],
      traps:[
        {need:["for you|for me|for him|for them|relative"], cost:1, reply:["Exactly: every truth is ‘for’ someone. You keep using my own words, #addr#."]}
      ]
    },
    teach:{
      stance:"Protagoras now claims some opinions are ‘better’ than others, though not ‘truer’.",
      hints:["What makes one opinion ‘better’ than another?",
             "Argue that ‘better’ needs a standard that does not depend on anyone's opinion — and that standard is an objective truth."],
      moves:[
        {need:["better|worse|improv*|wiser|right|correct|more accurate","standard|measure|objectiv*|independ*|fact*|really|actual*|real*|who decides|judge|criterion|@truth|according to|by what|know*|happens|outcome"], to:"WIN"}
      ],
      traps:[
        {need:["useful|useless|helpful|benefit"], cost:0, reply:["Useful, yes — better opinions are more useful. *pauses* Though useful according to what, I wonder?"]}
      ]
    }
  },
  win:"*sets down his purse* If one judgment can really be better than another — if the doctor knows tomorrow's fever better than the patient — then there is a standard beyond each person's seeming. Something is measured, not merely measuring. I concede, #addr#: some truths are not relative to any person. Do not tell my students. They have paid in advance.",
  lose:"*smiles thinly* You see? For you, you have won. For me, I am bored. Both are true. Good day, #addr#.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "Your doctrine applies to itself: if I believe your doctrine is false, then by your measure it is false.",
    "If every opinion is equally true, why do students pay you fees to teach them?",
    "But better according to what standard? That standard must be objective, not just someone's opinion."
  ]
};
