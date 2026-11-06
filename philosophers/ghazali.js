/* al-Ghazali */
export default {
  id:"ghazali", name:"Al-Ghazālī", dates:"1058–1111", era:"Middle Ages", place:"The Niẓāmiyya, Baghdad",
  diff:3, patience:7, glyph:"غ", color:"#3a6a4a", born:1058,
  core:"Fire does not cause cotton to burn: God creates the burning at the moment of contact. No cause necessitates its effect.",
  target:"Some causes really do necessitate their effects.",
  bio:"Abū Ḥāmid al-Ghazālī, the most famous professor in Baghdad, who in 1095 lost his voice in a crisis of doubt, gave up his chair and wandered for ten years as a Sufi. In The Incoherence of the Philosophers he attacked Avicenna and the Aristotelians, arguing among other things that the link between a cause and its effect is not necessary but only the habit God follows in creating things. Averroes replied with The Incoherence of the Incoherence.",
  voice:{
    claim:["there is no necessary connection between cause and effect", "God creates the burning, not the fire", "what we call causes are only God's habit", "the connection is not necessary"],
    tic:["Doubts are the vehicles that bring us to the truth.", "Whoever has not doubted has not looked, #addr#.", "The philosophers are incoherent."],
    image:["Cotton touches fire, and God creates the burning; He could just as well not.", "A blind man who never saw the sun would think light came from the window."],
    addr:["my brother","seeker","young scholar","friend"],
    oath:["God is greatest","God forbid"],
    gest:["*runs a hand over his prayer beads*","*sits on a simple Sufi mat*","*pauses, as if listening for something*","*smooths a page of the Incoherence*"],
    core:["occasionalism","the omnipotence of God","my refutation of the philosophers"],
    greet:["Peace be upon you, seeker. Sit. Doubt freely: it is the beginning of knowledge."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Put cotton to a flame and it burns. You say the fire burned it. But all you saw was the fire, then the burning: one after the other, never the necessity between them. The burning is created by God at the moment of contact. He could create the contact and not the burning. That is how the prophets' miracles happen.",
      stance:"Al-Ghazālī says causes do not necessitate effects: God creates each effect directly, and could leave it out.",
      hints:["If no cause necessitates anything, what could happen next?",
             "Say that then anything could happen: the book on the shelf could turn into a horse. Where is the order in the world?"],
      moves:[
        {need:["anything|chaos|random*|horse|boy|unpredictab*|could happen|whim*|no order|disorder|turn into|become"], to:"habit", gain:30,
         reply:["*smiles* The book turning into a horse. I raised that objection against myself."]}
      ],
      traps:[
        {need:["philosoph*|aristotle|avicenna|ibn sina|falasifa"], cost:1,
         reply:["The philosophers! I studied them for three years before refuting them. I know their arguments better than you do."]},
        {need:["doubt*|sceptic*|skeptic*|crisis|sufi*|mystic*"], cost:0,
         reply:["Yes, I doubted everything once, even my senses. God cast a light into my breast. But go on."]},
        {need:["eternal|creation|beginning"], cost:1,
         reply:["The world was created in time; the philosophers' eternal world is unbelief. A different chapter, brother."]},
        {need:["see|saw|observ*|watch*"], cost:1,
         reply:["Exactly: you see one thing after another. You never see the necessity. You prove my point."]}
      ]
    },
    habit:{
      enter:"God has created in us the knowledge that He will not do these possible things. He follows His custom, His habit (ʿāda), and does not break it except for a prophet. So the world is orderly, though nothing in it is necessary.",
      stance:"Al-Ghazālī says the world is orderly only because God reliably follows His habit, not because causes are necessary.",
      hints:["If God's habit is so reliable we can build medicine and science on it, how is it different from a nature?",
             "Argue that if God's habits are reliable enough to trust, they are just what we mean by the natures of things."],
      moves:[
        {need:["know*|knowledge|science|medicine|doctor*|physician*|predict*|rely|trust*|reliab*","nature*|regular*|habit*|custom*|always|natures"], to:"nature", gain:25,
         reply:["#hmm# A habit so reliable that the physician can count on it… You would call that a nature."]}
      ],
      traps:[
        {need:["miracle*|abraham|ibrahim|prophet*|moses|staff"], cost:1,
         reply:["Abraham was thrown into the fire and was not burned. That is the habit broken. You make my case for me."]}
      ]
    },
    nature:{
      enter:"Call it a nature if you like. God gives things their natures, and He can withhold them. He is not bound by anything, brother. To say He must let fire burn is to tie His hands.",
      stance:"Al-Ghazālī says God gives things their natures and can withhold them: nothing binds Him.",
      hints:["Is there anything even he thinks God cannot do?",
             "Remind him that he agrees even God cannot do the logically impossible, like making a thing be and not be at once."],
      moves:[
        {need:["logic*|contradict*|impossible|incoheren*|syllogism|necessar*","god|allah|even|cannot|can not|power*|omnipot*"], to:"logic", gain:25,
         reply:["#gest# Of course. God does not make a thing exist and not exist at the same time. That is not a limit on His power; it is not anything at all."]}
      ],
      traps:[
        {need:["withhold*|hands|bound|tie*|free*"], cost:1,
         reply:["God's hands are not tied, brother. That is my whole point."]}
      ]
    },
    logic:{
      enter:"But fire without burning is no contradiction. I can conceive of it: cotton touching flame, unburnt. So God can do it.",
      stance:"Al-Ghazālī says fire without burning is no contradiction, so God can separate them.",
      hints:["He granted that God gives things natures, and that we know them well enough for medicine. What would happen to that knowledge if fire had no nature of its own?",
             "Argue, as Ibn Rushd did, that if fire has no nature of its own, nothing can be defined or known; to know what fire is, is to know that it burns."],
      moves:[
        {need:["know*|knowledge|defin*|name*|nature*|essence|science|what fire is","burn*|cannot|nothing|impossible|no knowledge|what it is|what fire is"], to:"WIN"}
      ],
      traps:[
        {need:["conceiv*|imagin*|picture"], cost:1,
         reply:["I can imagine it, so it is possible. That is how possibility is tested, brother."]}
      ]
    }
  },
  win:"*is silent for a long time, beads still* If fire has no nature, I cannot even say what I am imagining when I picture it unburning. And my own physician's knowledge, which I trust, would be knowledge of nothing. Ibn Rushd will write a whole book saying this to me, and he will enjoy it. Very well, #addr#: some causes really do necessitate their effects, or the things would not be what they are. God created the natures; the natures bind the effects. I must pray on it.",
  lose:"*rises for prayer* The call is sounding, seeker. Doubt a little longer, and come back.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "Then anything could happen: the book on your shelf could turn into a horse.",
    "If God's habits are so reliable that we trust them in medicine, they are just the natures of things.",
    "You agree that even God cannot do the logically impossible.",
    "If fire has no nature of its own, nothing can be defined or known; to know what fire is, is to know that it burns."
  ]
};
