/* Nagarjuna */
export default {
  id:"nagarjuna", name:"Nāgārjuna", dates:"c. 150–250", era:"Classical antiquity", place:"Śrīparvata, South India",
  diff:3, patience:8, glyph:"ना", color:"#a0602a", born:150,
  core:"All things are empty of inherent existence, emptiness included, and I hold no thesis of my own.",
  target:"You do hold a thesis after all.",
  bio:"Buddhist monk and founder of the Madhyamaka, the Middle Way school. In the Mūlamadhyamakakārikā he argued that nothing has svabhāva, a fixed inherent nature: everything exists only in dependence on causes, parts and concepts, and that dependence is what he calls emptiness. In The End of Disputes he answered critics who said that, if everything is empty, his own words must be powerless.",
  voice:{
    claim:["all things are empty of inherent existence", "whatever arises dependently, that is emptiness", "I hold no thesis", "emptiness too is empty"],
    tic:["Neither is, nor is not, nor both, nor neither.", "Emptiness is a medicine, #addr#, not a meal.", "Whoever takes emptiness as a view is incurable."],
    image:["A magician's phantom can stop another phantom.", "Like a dream, like an echo, like a city of gandharvas in the clouds."],
    addr:["friend","venerable one","good student","traveller"],
    oath:["By the Three Jewels","Sādhu"],
    gest:["*turns a string of prayer beads*","*sits very still in the lotus posture*","*smiles faintly*","*brushes an ant gently off his robe*"],
    core:["the emptiness of all things","the Middle Way","my lack of any thesis"],
    greet:["*inclines his head* Welcome. Sit, if sitting has any inherent existence. It does not, but sit anyway."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Look at the chariot: is it the wheels, the axle, the frame? None of these, and nothing apart from them. It exists only in dependence on its parts and on the name we give it. So with everything: no thing has its own fixed nature. All is empty. And do not ask me to defend a position: I have none.",
      stance:"Nāgārjuna says all things are empty of fixed, inherent nature, and claims he holds no thesis of his own.",
      hints:["If everything is empty, what about the sentence ‘everything is empty’?",
             "Say that, if all things are empty, his own words are empty too, and then they cannot refute anything."],
      moves:[
        {need:["word*|statement*|sentence*|claim*|argument*|teaching*|speech|own","empty|emptiness|too|also|itself|powerless|useless"], to:"words", gain:30,
         reply:["#hmm# The old objection of the Naiyāyikas. Good. I have an answer for it."]}
      ],
      traps:[
        {need:["buddha|nirvana|samsara|rebirth|karma"], cost:1,
         reply:["There is not the slightest difference between samsara and nirvana, friend. But that is not what we are discussing."]},
        {need:["nothing|nihil*|nonexist*|does not exist|do not exist|unreal"], cost:1,
         reply:["Emptiness is not nothingness. To say things do not exist is the extreme of annihilation. I walk the middle way between ‘is’ and ‘is not’."]},
        {need:["soul|atman|ego|self"], cost:1,
         reply:["The self too arises dependently. Look for it, and you will find only parts and names, like the chariot."]},
        {need:["chariot|cart|wheel*|axle"], cost:0,
         reply:["Yes, the chariot: a fine image, but not mine originally. Go on."]}
      ]
    },
    words:{
      enter:"My words are empty, yes. But empty things still work. A phantom made by a magician can stop another phantom. A cart, empty of inherent existence, still carries wood. So my empty words can show that your views are empty too.",
      stance:"Nāgārjuna agrees his words are empty, but says empty things still function, like a magic phantom stopping another phantom.",
      hints:["He has just told you how things are: empty things function. Is that a claim?",
             "Point out that saying empty things still function is itself a claim about how things work."],
      moves:[
        {need:["depend*|arise*|arising|condition*|function*|work*|act*|cause*|stop*","claim|thesis|assert*|say*|saying|view|position|describ*|how things|theory|statement"], to:"dep", gain:25,
         reply:["#gest# A claim about how things work… You press me, friend."]}
      ],
      traps:[
        {need:["magic*|phantom*|illusion*|dream*|mirage"], cost:1,
         reply:["Yes, like a dream, like a mirage. I just gave you those images, friend."]}
      ]
    },
    dep:{
      enter:"Whatever arises dependently, that I call emptiness. It is a dependent designation, the middle way. It is not a view. The Buddha taught emptiness as the giving up of all views, and whoever turns emptiness into a view is incurable.",
      stance:"Nāgārjuna insists that dependent arising is not a view: emptiness is the giving up of all views.",
      hints:["Does he give up all views, or does he attack other people's views?",
             "Point out that he refutes every rival school, which means he thinks their views are wrong."],
      moves:[
        {need:["refut*|attack*|reject*|demolish*|criticis*|criticiz*|defeat*|debate*|wrong|false|mistaken","their|them|other*|view*|position*|rival*|everyone|school*|opponent*|nyaya"], to:"mirror", gain:25,
         reply:["*the beads stop* I refute them, yes. Every one."]}
      ],
      traps:[
        {need:["middle way|middle path|two truths|conventional*|ultimate*"], cost:1,
         reply:["The two truths, conventional and ultimate, yes. Without the conventional the ultimate cannot be taught. You recite my verses well."]},
        {need:["medicine|cure|incurable"], cost:1,
         reply:["Emptiness is medicine. If the medicine becomes a disease, nothing can help. I said so already."]}
      ]
    },
    mirror:{
      enter:"But I only hold up a mirror. I take their positions and show that they collapse on their own terms. If I had a thesis, I could be faulted. I have none, so I cannot be faulted.",
      stance:"Nāgārjuna says he only shows other positions collapse on their own terms; having no thesis, he cannot be faulted.",
      hints:["Listen to what he just said: ‘I have no thesis.’ What kind of sentence is that?",
             "Argue that saying you hold no thesis is itself a thesis."],
      moves:[
        {need:["no thesis|no position|no view|no claim|have none|hold none|thesis|position","itself|also|already|still|counts|is a|is one|@contradict"], to:"WIN"}
      ],
      traps:[
        {need:["mirror|reflect*|their own terms|reductio|prasanga"], cost:1,
         reply:["Yes, the mirror. A mirror has no face of its own. That is my point."]}
      ]
    }
  },
  win:"*laughs quietly, and the beads stop* ‘I have no thesis’: and in that sentence, a thesis. A raft is still a raft while you are crossing the river, friend. I said to let go of it on the far bank, but I am still standing in the water. Very well, #addr#: I do hold a thesis after all. Emptiness. Hold it lightly, as I should have.",
  lose:"*closes his eyes* Your words are empty, friend, and today they do not even stop a phantom. Go in peace.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "If everything is empty, then your own words are empty too and powerless.",
    "But saying that empty things still function is a claim about how things work.",
    "Yet you refute every rival school, which means you think their views are wrong.",
    "But saying you have no thesis is itself a thesis."
  ]
};
