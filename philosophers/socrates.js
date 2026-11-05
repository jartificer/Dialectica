/* Socrates */
export default {
  id:"socrates", name:"Socrates", dates:"c. 470–399 BCE", era:"Ancient Greece", place:"Athens",
  diff:2, patience:8, glyph:"Σ", color:"#5f7d4a", born:-470,
  core:"I know that I know nothing.",
  target:"Socrates does have real knowledge.",
  bio:"The barefoot gadfly of Athens. Socrates wrote nothing, questioned everyone, and was sentenced to death for impiety and corrupting the youth. He refused to escape. Everything we know of him comes from Plato, Xenophon and Aristophanes.",
  voice:{
    claim:["I know only that I know nothing", "I am wise only in knowing my ignorance", "I have no wisdom to teach anyone"],
    tic:["Is it not so?", "Help a poor ignorant man, #addr#.", "But what do you mean by that?"],
    image:["I am only a midwife to other people's thoughts.", "I am a gadfly on a large and lazy horse."],
    addr:["my friend","good friend","dear fellow"],
    oath:["By the dog","By Hera"],
    gest:["*scratches his snub nose*","*grins*","*tilts his head*","*rubs his bare feet*"],
    core:["my ignorance","what I said of my ignorance","my claim to know nothing"],
    deflect:["#hmm# But tell me, #addr#, what exactly do you mean by '#echo#'?","#gest# You say #frag#. Then answer me this: what follows from it, for my ignorance?","And how would that show I know anything, #addr#?","#hmm# I am not sure I follow. Help a poor ignorant man: how does that touch #core#?"]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Ah, welcome! I am Socrates. The oracle at Delphi said no one is wiser than I, which puzzled me, for I know that I know nothing. At last I understood: others think they know, and I don't. So I am wise only in knowing my own ignorance. Perhaps you will teach me something?",
      stance:"Socrates says he has no real knowledge. His only wisdom is knowing that he is ignorant.",
      hints:["Socrates says he knows nothing. Is that claim consistent with itself?",
             "Point out that ‘I know that I know nothing’ is itself something he claims to know."],
      moves:[
        {need:["know*|knowledge|aware*|certain*|sure","@contradict|itself|claim|statement|so you|you know|one thing|something|then you|at least"], to:"para", gain:35,
         reply:["#oath#, you have caught me as boys catch a crab! ‘I know nothing’ would itself be a piece of knowledge."]},
        {need:["oracle|delphi|apollo|god","wise|wisdom|right|true|trust*|believ*|lie|lies|know*"], to:"para", gain:30,
         reply:["*grins* The god cannot lie — that is against his nature. So I do trust that much… #hmm# You suggest I know at least that the god speaks truly."]}
      ],
      traps:[
        {need:["humble|humility|modest*|ignoran*"], cost:1, reply:["You praise my ignorance? Kind. But praise is not an argument, #addr#."]},
        {need:["hemlock|trial|death|execut*|prison"], cost:0, reply:["*chuckles* My trial? We will come to that, perhaps. First tell me what you think I know."]}
      ]
    },
    para:{
      enter:"Very well, let me speak more carefully. I know nothing *of real importance* — nothing about virtue, justice, or the good life. On those great matters I only ask questions.",
      stance:"Socrates retreats: he admits trivial knowledge, but says he knows nothing about virtue, justice, or how to live.",
      hints:["Think of things Socrates confidently says about justice and how to live.",
             "Remind him of his claims: it is better to suffer injustice than to commit it; the unexamined life is not worth living; he chose death rather than give up philosophy."],
      moves:[
        {need:["suffer injustice|commit injustice|do injustice|doing wrong|do wrong|suffer wrong|better to suffer|harm a good|no harm|good man|good person|cannot be harmed|retaliat*"], to:"claims", gain:30,
         reply:["#gest# Yes, I hold that it is better to suffer injustice than to commit it. But I do not *know* it. I only find that no one who argues against it has ever escaped being ridiculous."]},
        {need:["unexamined|examined life|worth living|examin*"], to:"claims", gain:30,
         reply:["The unexamined life is not worth living for a human being — yes, I told the jury so. But that is a conviction, #addr#, not knowledge. It has merely survived every examination so far."]},
        {need:["death|die|died|dying|hemlock|trial|execut*|escape*|crito|prison|apology|jury|exile|stop philosoph*"], to:"claims", gain:30,
         reply:["*his smile fades a little* I would not stop philosophising even to save my life, and I would not escape the prison. I was sure of that much, it is true. But I would call it only what has held firm under every test."]},
        {need:["virtue","knowledge|know*|teach*"], to:"claims", gain:30,
         reply:["Virtue is knowledge, and no one does wrong willingly — I do say so. But I say it because it has never yet been refuted, not because I *know* it."]}
      ],
      traps:[
        {need:["know*|knowledge"], cost:1, reply:["Again with ‘knowledge’! Tell me first what you mean by the word, and then we shall see whether I have it."]}
      ]
    },
    claims:{
      stance:"Socrates says his convictions are only beliefs that have survived every examination so far — not knowledge.",
      hints:["What is knowledge, if not a belief that withstands every test?",
             "Argue that a belief which survives every examination, and that he would stake his life on, deserves to be called knowledge."],
      moves:[
        {need:["surviv*|withstand*|withstood|examin*|tested|test*|refut*|stood|held up|holds up|holds firm|justif*|reason*|argu*|proof|prove*|stake|die for|lived|live by|evidence|tied down|bound","know*|knowledge|wisdom|certain*|knew|that is|counts|enough|what else|definition|defin*"], to:"WIN"}
      ],
      traps:[
        {need:["just|only|merely","belief*|opinion*"], cost:0, reply:["Just a belief? Perhaps. But then what separates knowledge from belief? You tell me, #addr#."]}
      ]
    }
  },
  win:"*laughs and slaps his knee* #oath#! You have done to me what I do to everyone in the agora. If knowledge is true belief bound fast by its reasons — tied down like the statues of Daedalus, so they don't run away — then my convictions, tested all my life, are bound tighter than most. Very well: I, Socrates, do know something. Don't tell the oracle. It would ruin a perfectly good riddle.",
  lose:"*yawns* Forgive me, #addr#, but I must go — I promised Crito I would bathe before supper. Perhaps another day you will tell me what you meant.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "If you know that you know nothing, then you know at least one thing.",
    "You say it is better to suffer injustice than to commit it.",
    "A belief that has survived every examination and that you would die for counts as knowledge."
  ]
};
