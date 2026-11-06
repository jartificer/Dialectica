/* Marx */
export default {
  id:"marx", name:"Karl Marx", dates:"1818–1883", era:"Late modern", place:"The British Museum Reading Room, London",
  diff:5, patience:6, glyph:"Mx", color:"#8a2a2a", born:1818,
  core:"History is driven by material conditions and class struggle. Ideas are only the superstructure: they follow the economy, never lead it.",
  target:"Ideas can change history, not only material conditions.",
  bio:"German philosopher, economist and journalist, exiled from Germany, France and Belgium, who settled in London and spent years in the British Museum writing Capital. With Friedrich Engels he wrote The Communist Manifesto. He held that the way a society produces its means of life shapes its laws, politics and ideas, and that history moves through the struggle between classes.",
  voice:{
    claim:["social being determines consciousness, not the other way round", "ideas are the superstructure", "history is the history of class struggles", "the ruling ideas are the ideas of the ruling class"],
    tic:["The philosophers have only interpreted the world; the point is to change it.", "Workers of the world, unite!", "All that is solid melts into air, #addr#."],
    image:["The hand-mill gives you society with the feudal lord; the steam-mill, society with the industrial capitalist.", "Hegel stood the world on its head; I have put it back on its feet."],
    addr:["comrade","my friend","citizen","young Hegelian"],
    oath:["Donnerwetter","Damn it"],
    gest:["*thumps the table*","*runs a hand through his great beard*","*lights a cheap cigar*","*pushes a stack of factory reports toward you*"],
    core:["historical materialism","the materialist conception of history","my analysis"],
    greet:["*without looking up from the reports* Sit. Quietly. This is a library."],
    insult:["I have been insulted by better men, in better newspapers. Get on with it."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"*thumps the table* It is not men's consciousness that determines their being, but their social being that determines their consciousness. Change the way people produce their bread, and their laws, their religion, their philosophy all change after it. Ideas are smoke from the chimney. The fire is the economy.",
      stance:"Marx says material conditions drive history; ideas only follow them, like smoke from a chimney.",
      hints:["If ideas are only smoke, why did he write a manifesto calling on people to act?",
             "Ask why he wrote the Manifesto at all, if ideas cannot change the world."],
      moves:[
        {need:["manifesto|capital|kapital|book*|write|wrote|writing|thesis|theses|feuerbach|pamphlet*","change*|world|revolution*|history|persuad*|convince*|why|workers"], to:"manifesto", gain:25,
         reply:["#gest# Why write the Manifesto. Engels asks me that when he is drunk."]}
      ],
      traps:[
        {need:["stalin|soviet|ussr|lenin|mao|gulag"], cost:1,
         reply:["I do not know these names, comrade. If they call themselves Marxists, then I am not a Marxist."]},
        {need:["opium|religion|god"], cost:1,
         reply:["Religion is the sigh of the oppressed creature. I have said it; it supports my point."]},
        {need:["hegel*|dialectic*|spirit"], cost:1,
         reply:["Hegel had the dialectic upside down. I set it on its feet. Do not bring me Hegel."]},
        {need:["beard|london|museum|poverty|pawn*|debt*"], cost:0,
         reply:["Yes, my coat is at the pawnbroker's again. Go on."]}
      ]
    },
    manifesto:{
      enter:"Because the Manifesto only says out loud what the proletariat is already doing. Philosophers have only interpreted the world; the point is to change it. And it is the workers who change it, not books.",
      stance:"Marx says the Manifesto only voices what the workers are already doing; workers change history, not books.",
      hints:["He also wrote that theory becomes a force under a certain condition. What was it?",
             "Remind him he wrote that theory becomes a material force once it grips the masses."],
      moves:[
        {need:["grip*|seize*|grab*|take hold|spread*|catch*|masses|material force|force","theory|theories|idea*|book*|word*|manifesto|thought*"], to:"force", gain:25,
         reply:["*the cigar stops halfway* A material force. I did write that."]}
      ],
      traps:[
        {need:["proletar*|worker*|bourgeoisie|class struggle"], cost:1,
         reply:["The proletariat, the bourgeoisie, the class struggle. Yes. That is my position, not your objection."]}
      ]
    },
    force:{
      enter:"When it grips the masses, yes. But only because the conditions are ripe for it. Ideas are the midwife of history, never its mother.",
      stance:"Marx grants that theory can become a force, but only when material conditions are ripe.",
      hints:["Did material conditions decide the politics of his own closest friend?",
             "Point out that Engels is a partner in his family's cotton firm in Manchester, yet he became a communist."],
      moves:[
        {need:["engels|yourself|your own|bourgeois*|factory|mill owner|manchester|middle class|lawyer","communist*|socialist*|revolution*|class|proletar*|worker*|side"], to:"engels", gain:25,
         reply:["*laughs into his beard* Engels. A cotton manufacturer who pays my rent and wants to abolish himself."]}
      ],
      traps:[
        {need:["midwife|ripe|conditions"], cost:1,
         reply:["The midwife, the ripe conditions. You repeat me, comrade."]}
      ]
    },
    engels:{
      enter:"In the Manifesto I wrote of bourgeois thinkers who have raised themselves to understanding history as a whole, and so go over to the workers. A small part of the ruling class. An exception, comrade.",
      stance:"Marx says Engels is an exception: a bourgeois who rose to understand history and went over to the workers.",
      hints:["What raised Engels above his class position? Was it his factory, or his understanding?",
             "Conclude: understanding can raise people out of their class and change history, so ideas are more than a reflection."],
      moves:[
        {need:["understand*|comprehen*|idea*|theory|theories|thought*|consciousness|insight","change*|shape*|cause*|drive*|move*|raise*|lift*|history|more than"], to:"WIN"}
      ],
      traps:[
        {need:["traitor|exception|rare|few"], cost:1,
         reply:["An exception, yes. I said so. Exceptions prove nothing."]}
      ]
    }
  },
  win:"*puts the cigar down and stares at it* Engels was not pushed into communism by his cotton mills. He read, and he saw, and he chose. And I have spent thirty years in this room writing a book because I believe it will help. Very well, #addr#: ideas can change history, not only material conditions. But do not tell anyone I said so before Capital is finished.",
  lose:"*turns back to the factory reports* You interpret, comrade. I have work to do.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "Then why write the Manifesto at all, if ideas cannot change the world?",
    "You wrote that theory becomes a material force once it grips the masses.",
    "Engels is a partner in his family's cotton firm in Manchester, yet he became a communist.",
    "So understanding can raise people out of their class and change history; ideas are more than a reflection."
  ]
};
