/* Cioran */
export default {
  id:"cioran", name:"Emil Cioran", dates:"1911–1995", era:"20th century", place:"A garret on the rue de l'Odéon, Paris",
  diff:5, patience:5, glyph:"EC", color:"#3a3a3a", born:1911,
  core:"Lucidity shows that nothing is worth affirming: every hope is an illusion.",
  target:"Some things in life are worth affirming.",
  bio:"Romanian-born essayist who wrote his first book, On the Heights of Despair, at twenty-two during years of insomnia in Sibiu, then moved to Paris in 1937 and stayed for the rest of his life, writing in French from 1949. In books of aphorisms such as A Short History of Decay and The Trouble with Being Born he turned pessimism into a polished art. He refused almost every literary prize, lived for decades in a small attic flat, and was known among his friends, Beckett and Ionesco among them, as a wonderful, very funny talker.",
  voice:{
    claim:["nothing is worth affirming", "every hope is an illusion", "lucidity sees through everything", "every system is a cage"],
    tic:["I am a disciple of insomnia, #addr#.", "An aphorism is a thought with the fat cut off.", "Every system is a cage someone mistook for a home."],
    image:["Paris at four in the morning, and only the insomniac awake to see through it.", "A café at closing time, the chairs stacked, and every grand idea swept out with the crumbs."],
    addr:["my friend","cher ami","chère amie","my dear"],
    oath:["Ah, Dieu","Bah"],
    gest:["*shrugs with his whole body*","*smiles a thin, delighted smile*","*rubs his tired eyes*","*waves a hand at the whole universe*"],
    core:["my lucidity","the vanity of all systems","the vanity of everything"],
    greet:["*opens the door of his attic* Come in. I have not slept, of course. That makes me excellent company."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Lucidity is a curse, #addr#. Once you see clearly, everything falls apart: progress, history, every great cause. People hope because they have not looked. I have looked, every night since I was twenty, unable to sleep. Nothing holds. Nothing is worth affirming. Every hope is a mistake that has not yet been found out.",
      stance:"Cioran holds that lucidity shows nothing is worth affirming, and every hope is an illusion.",
      hints:["If nothing is worth affirming, why does he keep doing a certain thing, book after book?",
             "Point out that he has kept writing for sixty years, polishing every sentence: someone who affirms nothing would not bother."],
      moves:[
        {need:["write|writes|writing|wrote|book*|sentence*|aphorism*|polish*","keep|kept|still|years|every day|bother*|care*|work*"], to:"writing", gain:25,
         reply:["*a thin smile* My books. You have caught me with ink on my hands."]}
      ],
      traps:[
        {need:["progress|history|utopia*|revolution"], cost:1,
         reply:["Progress! History is a procession of fake absolutes. Tell me something I have not mocked already."]},
        {need:["romania*|sibiu|guard|iron guard|young"], cost:0,
         reply:["My Romanian youth. I wrote things then that I have spent fifty years regretting. Another time."]},
        {need:["god|faith|religion|mystic*"], cost:0,
         reply:["I envy the mystics and cannot join them. That is another sorrow, #addr#."]}
      ]
    },
    writing:{
      enter:"Writing is not affirmation, my friend, it is relief. A book is a postponed collapse. I write so as not to scream, and I cut and cut until the sentence is as dry as I am. That is hygiene, not faith.",
      stance:"Cioran says writing is only relief, a postponed collapse, not an affirmation of anything.",
      hints:["Is there anything he cannot speak of without enthusiasm? Think of what he listens to.",
             "Bring up Bach: he says that without Bach, even God would be second-rate. That is affirmation."],
      moves:[
        {need:["bach|music|organ|cantata*|fugue*|brahms|schubert","love*|adore*|moved|weep*|tears|enthusias*|praise*|second rate|without"], to:"bach", gain:25,
         reply:["*his face changes completely* Bach."]}
      ],
      traps:[
        {need:["scream*|hygiene|relief"], cost:1,
         reply:["Relief, yes. I said so. Do not repeat my words to me, #addr#."]},
        {need:["prize*|fame|success|famous"], cost:0,
         reply:["I refuse prizes. It is the only vanity I can afford."]}
      ]
    },
    bach:{
      enter:"Bach is the one argument against my whole philosophy. When I hear him I believe in everything, for a quarter of an hour. Then the music stops, and lucidity comes back. One exception does not make a world.",
      stance:"Cioran admits Bach defeats his pessimism, but calls it one exception that lasts a quarter of an hour.",
      hints:["Is Bach the only exception? Think of how he spends his evenings, and with whom.",
             "Point out that he is famous among his friends, Beckett and Ionesco, for long, joyful, very funny conversations: that is a second exception, and he returns to it every week."],
      moves:[
        {need:["friend*|beckett|ionesco|conversation*|company|talk*","laugh*|funny|joy*|wit|witty|delight*|enjoy*|gaiety|cheer*"], to:"friends", gain:25,
         reply:["*laughs before he can stop himself* There, you see."]}
      ],
      traps:[
        {need:["quarter of an hour|minutes|stops"], cost:1,
         reply:["A quarter of an hour, then silence. That is my point, #addr#."]}
      ]
    },
    friends:{
      enter:"Beckett and I can walk for hours and say almost nothing, and it is the best thing in the week. And with the others I talk until two in the morning and laugh like a madman. My friends say I am the gayest pessimist in Paris. And here is the scandal: I have looked at these things with all my lucidity, at four in the morning, and found nothing to unmask.",
      stance:"Cioran admits that friendship, talk and laughter, like Bach, survive his lucidity, and he keeps returning to them.",
      hints:["His lucidity sees through everything else. What does it find in these?",
             "Conclude that his own lucidity has examined them and found nothing false, so some things in life are worth affirming: music, friendship, laughter."],
      moves:[
        {need:["some|something|things|music|friendship|laughter|bach|life","worth|affirm*|value*|matter*|good"], to:"WIN"}
      ],
      traps:[
        {need:["contradict*|hypocri*|inconsisten*"], cost:1,
         reply:["Of course I contradict myself. Only the dead are consistent, #addr#."]}
      ]
    }
  },
  win:"*throws up his hands, laughing* Very well, #addr#, you have caught me. Some things in life are worth affirming: a cantata, a walk with Beckett, a good laugh at three in the morning. I will deny it in my next book, naturally. But I will write the book, and you will know why.",
  lose:"*shrugs* You see? Even this conversation was a mistake, #addr#. A delightful one. Goodnight; I will not sleep.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "You have kept writing for sixty years, polishing every sentence; someone who affirms nothing would not bother.",
    "You say that without Bach even God would be second rate, and his music moves you to tears.",
    "Your friends, Beckett and Ionesco, know you for long, joyful, very funny conversations.",
    "Your lucidity has examined them and found nothing false, so some things in life are worth affirming: music, friendship and laughter."
  ]
};
