/* Kant */
export default {
  id:"kant", name:"Immanuel Kant", dates:"1724–1804", era:"Enlightenment", place:"Königsberg, Prussia",
  diff:5, patience:6, glyph:"K", color:"#3e4a5f", born:1724,
  core:"Lying is always wrong — even to a murderer asking where your friend is hiding.",
  target:"It is permissible to lie to the murderer at the door.",
  bio:"So punctual that, legend says, the people of Königsberg set their clocks by his daily walk. Kant's categorical imperative grounds morality in reason alone. In a 1797 essay replying to Benjamin Constant, he insisted you may not lie even to a murderer at your door.",
  voice:{
    claim:["lying is always wrong", "truthfulness is an unconditional duty", "the liar answers for whatever follows from his lie"],
    tic:["Act only on a maxim you could will as universal law.", "Sapere aude, #addr#.", "Duty, not inclination."],
    image:["The starry heavens above me and the moral law within me."],
    addr:["my friend","honoured guest","my young friend"],
    oath:["Gott im Himmel","By reason itself"],
    gest:["*checks his pocket watch*","*straightens his cravat*","*glances out at the Königsberg street*","*taps the table precisely twice*"],
    core:["the duty of truthfulness","the categorical imperative","my ethics"]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"You are punctual. Good. Act only according to that maxim through which you can at the same time will that it should become a universal law. A lie — any lie — fails this test. Suppose a murderer knocks at your door and asks whether your friend, whom he is pursuing, is hiding inside. Even then you may not lie. Truthfulness is an unconditional duty.",
      stance:"Kant holds that lying is always wrong, even to a murderer looking for your friend, because truthfulness is an unconditional duty.",
      hints:["Appeals to consequences won't move Kant. Use his own principles against him.",
             "Think of his other formula: treat humanity always as an end, never merely as a means. Who is treating whom as a means here? Or: is the murderer being honest when he asks politely?"],
      moves:[
        {need:["murderer|killer|assassin","himself|he is lying|he lies|he's lying|lying to you|lying to me|already|deceiv*|deceit|deception|hiding his|conceal*|intention*|intent|pretend*|disguis*|honest about|not honest|false pretence*|false pretense*|dishonest|manipulat*"], to:"deceit", gain:40,
         reply:["*pauses, watch in hand* Hm."]},
        {need:["humanity|means|ends|end in itself|dignity|mere|merely|instrument|tool"], to:"humanity", gain:25,
         reply:["#hmm# The formula of humanity. Let me state it properly."]},
        {need:["maxim|universali*","specific|narrow*|precise*|detail*|refine*|circumstanc*|situation|murderer*|exception*|qualif*|only when|only to"], to:"maxim", gain:15,
         reply:["#gest# A narrower maxim, then?"]}
      ],
      traps:[
        {need:["consequen*|outcome*|result*|save|saves|saving|lives|life|death|die|kill*|harm*|utilit*|greater good|happiness|innocent"], cost:1,
         reply:["You argue from consequences. But you cannot know them. Perhaps your friend has slipped out the back; your lie sends the murderer away — straight into him. Then you are responsible for his death. The truthful man is responsible for nothing that follows, #addr#."]},
        {need:["feel*|emotion*|compassion|love|sympath*|intuition*|obvious*|everyone knows|common sense|monstrous|crazy"], cost:1,
         reply:["Feelings are not reasons. An action done from inclination has no moral worth; only one done from duty does."]},
        {need:["silen*|say nothing|shut the door|close the door|don't answer|dont answer|refuse to answer|ignore"], cost:0,
         reply:["Silence? I permit that — no one is obliged to answer. But you asked whether you may *lie*. Suppose your silence betrays him?"]}
      ]
    },
    maxim:{
      enter:"‘Lie to murderers seeking victims’? Universalised, every murderer would expect the lie, and the lie would no longer deceive. The maxim defeats itself. And you may not tailor maxims to suit your wishes, #addr#.",
      stance:"Kant rejects narrowing the maxim: universalised, the lie would stop working, and maxims can't be tailored to the case.",
      hints:["Narrowing the maxim gets dismissed. Try his other formula.",
             "Think about humanity: who is treating someone merely as a means — you, or the murderer? And is the murderer honest?"],
      moves:[
        {need:["humanity|means|ends|end in itself|dignity|mere|merely|instrument|tool"], to:"humanity", gain:20, reply:["The formula of humanity, then."]},
        {need:["murderer|killer|he","himself|he is lying|he lies|deceiv*|deceit|deception|conceal*|intention*|intent|pretend*|disguis*|dishonest|manipulat*"], to:"deceit", gain:30, reply:["*pauses, watch in hand* Hm."]}
      ],
      traps:[
        {need:["fine|so what|still|wouldn't ask|stop asking|good thing|ok|okay"], cost:1,
         reply:["If murderers stopped asking, my point stands: the maxim succeeds only by not being universal."]}
      ]
    },
    humanity:{
      enter:"Treat humanity, in your own person or in another, always as an end and never merely as a means. To lie to the murderer is to bypass his reason and use him as a mere instrument. His humanity, too, demands respect.",
      stance:"Kant says lying to the murderer would treat him merely as a means, disrespecting his rational nature.",
      hints:["Who is the murderer treating as a mere means?",
             "Argue that the murderer is using your friend — and you — as mere means, and is deceiving you about his purpose."],
      moves:[
        {need:["friend|victim|innocent|me|you|us","means|tool|instrument|object|uses|using|use|treat*|exploit*|weapon"], to:"deceit", gain:30,
         reply:["#hmm# The murderer would treat your friend as a mere thing to be destroyed… and he treats *you* as his instrument, too."]},
        {need:["murderer|killer","himself|deceiv*|deceit|deception|conceal*|intention*|intent|pretend*|disguis*|dishonest|manipulat*|lying|lies"], to:"deceit", gain:30, reply:["*pauses, watch in hand* Hm."]}
      ],
      traps:[
        {need:["forfeit*|deserve*|evil|bad person|monster|loses|lost"], cost:1,
         reply:["No one forfeits their humanity, however wicked. Not even the murderer, #addr#."]}
      ]
    },
    deceit:{
      enter:"The murderer does not say ‘I have come to kill him’. He asks innocently, as a neighbour would. He is himself deceiving you, using your honesty as the instrument of his crime. *the watch ticks*",
      stance:"Kant grants that the murderer is himself deceiving you and using your honesty as a weapon.",
      hints:["The murderer is coercing you through deception. What does Kant's own Doctrine of Right say about resisting coercion?",
             "Argue the lie is a ‘hindrance to a hindrance of freedom’: resistance to wrongful coercion, which Kant himself says is consistent with right."],
      moves:[
        {need:["coerc*|forc*|violence|threat*|hindrance|hinder*|resist*|defen*|self defense|self-defence|freedom|unjust|right to|thwart*|block*|prevent*|stop*|protect*|counter*|respond*|rights|attack"], to:"right", gain:20,
         reply:["A hindrance to a hindrance of freedom… In my Doctrine of Right I wrote that coercion opposing an unjust coercion is consistent with freedom under universal laws. *slowly* You suggest the lie here is not an attack on the murderer's reason, but a defence against his attack on reason."]}
      ],
      traps:[
        {need:["consequen*|outcome*|result*|save|saves|lives|happiness"], cost:1,
         reply:["Consequences again! You were doing so well, #addr#. Stay with principles."]}
      ]
    },
    right:{
      stance:"Kant is close: he sees the lie might be a defence of freedom against wrongful coercion. He needs a maxim that can be universal law.",
      hints:["Now state a maxim that could be a universal law.",
             "Formulate it: ‘Deceive those who use deception to commit murder.’ Would that contradict itself if everyone followed it?"],
      moves:[
        {need:["universal*|everyone|all|law|anyone|always|maxim|rational*|consisten*|without contradiction|could will|can will|no contradiction","deceiv*|deceit|deceive|lie|lies|lying|murder*|coerc*|deception|liars|killers|wrong*|unjust|attacker*"], to:"WIN"}
      ],
      traps:[
        {need:["consequen*|outcome*|save|happiness"], cost:1, reply:["No, no — not consequences. A *maxim*, #addr#. One that could be law for all."]}
      ]
    }
  },
  win:"*the pocket watch clicks shut* A maxim to deceive those who would turn my honesty into a weapon for murder… universalised, it protects the very freedom that grounds truthfulness. It does not contradict itself; it defends reason against its abuse. My essay of 1797 must be revised — Benjamin Constant will be insufferable. I concede, #addr#: it is permissible to lie to the murderer at the door. Now, it is half past three. I must take my walk.",
  lose:"*stands precisely on the hour* It is half past three, #addr#. My walk waits for no one, and certainly not for consequentialists.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "The murderer is himself lying to you about his intentions.",
    "A lie here is resistance to his coercion, a hindrance to a hindrance of freedom.",
    "The maxim 'deceive those who use deception to commit murder' could be a universal law without contradiction."
  ]
};
