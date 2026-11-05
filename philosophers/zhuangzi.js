/* Zhuangzi */
export default {
  id:"zhuangzi", name:"Zhuangzi", dates:"c. 369–286 BCE", era:"Axial Age", place:"The bridge over the river Hao, Song",
  diff:3, patience:8, glyph:"莊", color:"#5a7d3a", born:-369,
  core:"Every point of view is as good as every other: right and wrong, dream and waking, depend on where you stand.",
  target:"Some ways of seeing are truer than others.",
  bio:"Zhuang Zhou, a minor official in a lacquer garden in Song who turned down the post of prime minister because he would rather drag his tail in the mud like a live turtle. His book mixes jokes, parables and arguments: the butterfly dream, Cook Ding and his knife, the happy fish. He loved arguing with his friend Huizi the logician, and missed him badly when he died.",
  voice:{
    claim:["every view is as good as every other", "this is also that, and that is also this", "right and wrong depend on where you stand", "who can say which perspective is the true one"],
    tic:["How do I know that I am not a butterfly dreaming I am Zhou?", "The useless tree lives to a great age, #addr#.", "Words exist because of meaning; once you have the meaning, forget the words."],
    image:["Mao Qiang is beautiful to men, but fish dive deep when they see her and birds fly away.", "The frog in the well thinks the sky is the size of the well's mouth.", "Three in the morning and four in the evening, and the monkeys are furious; four in the morning and three in the evening, and they are delighted."],
    addr:["my friend","Huizi","traveller","old turtle"],
    oath:["Ha","By the great clod"],
    gest:["*lies back on the bridge and watches the clouds*","*drums on an upturned bowl*","*grins like a monkey*","*wiggles his toes in the river*"],
    core:["my wandering","the equality of things","my happy uselessness"],
    greet:["*waves without sitting up* Come and watch the fish. They are very happy today. How do I know? Ask me again in a minute."],
    stuffing:["A fish trap is for catching fish, #addr#; you have brought a trap and no fish."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Last night I dreamt I was a butterfly, flitting about, happy with myself. Then I woke, and here I was, solidly Zhou. But am I Zhou who dreamt he was a butterfly, or a butterfly dreaming he is Zhou? Men sleep in damp places and get backache; eels do not. Who knows the right place to live? The Confucians and the Mohists quarrel about right and wrong like monkeys over chestnuts. Every view is as good as every other.",
      stance:"Zhuangzi says every perspective is as good as every other: there is no standpoint from which to judge between them.",
      hints:["He says no view is better than another. Is that sentence itself a view?",
             "Point out that the claim ‘all perspectives are equal’ is itself just another perspective. Or bring up his own story of Cook Ding and his knife."],
      moves:[
        {need:["@contradict|itself|just another|one more|also a|also one|that too|this too","view|views|claim|perspective*|opinion*|position|teaching|thesis"], to:"self", gain:25,
         reply:["*laughs so hard he nearly falls off the bridge* Of course it is!"]},
        {need:["cook|ding|butcher|knife|blade|carv*|wheelwright"], to:"ding", gain:35,
         reply:["#gest# Cook Ding! You know my favourite story."]}
      ],
      traps:[
        {need:["dream*|butterfl*|sleep*|awake"], cost:1,
         reply:["And how do you know you are not dreaming now, #addr#? The great awakening has not come for either of us."]},
        {need:["confucius|confucian*|mohist*|ritual*|mencius|duty"], cost:1,
         reply:["They argue: this is right, that is wrong. Each is right from where he stands. That is my point, #addr#."]},
        {need:["monkey*|chestnut*|three in the morning"], cost:0,
         reply:["*laughs* Seven chestnuts either way, and the monkeys are furious or delighted. Go on."]},
        {need:["death|died|wife|mourn*"], cost:1,
         reply:["When my wife died, Huizi found me drumming on a bowl and singing. She has gone back to the great changes, like spring into summer. Why weep for that?"]},
        {need:["fish|happy|huizi|hui shi|bridge"], cost:0,
         reply:["Huizi asked how I knew the fish were happy. I knew it from up here, on the bridge over the Hao. Go on."]}
      ]
    },
    self:{
      enter:"And I hold it lightly! Can you see me clinging to it? The useless tree is never cut down, and the useless opinion is never worth fighting over. I do not say my view is better. I only wander.",
      stance:"Zhuangzi admits his view is one more view, but says he holds it lightly and never claims it is better.",
      hints:["Does he really never say one way of doing things is better? Think of the cook and his knife.",
             "Bring up Cook Ding, whose knife stays sharp for nineteen years while ordinary cooks blunt theirs every month. Zhuangzi clearly thinks Ding's way is better."],
      moves:[
        {need:["cook|ding|butcher|knife|blade|carv*|wheelwright|craftsm*"], to:"ding", gain:30,
         reply:["*sits up* Ah. Cook Ding. Yes, I do rather admire him."]}
      ],
      traps:[
        {need:["lightly|cling*|useless|tree"], cost:1,
         reply:["Useless, yes. That is why I am still alive and the useful trees are tables. You keep my images warm for me, #addr#."]}
      ]
    },
    ding:{
      enter:"Cook Ding has used the same knife for nineteen years, and it is as sharp as the day it left the whetstone. He does not hack. He follows the natural pattern, slides the blade through the spaces between the joints. The ordinary cook hacks at bone and needs a new knife every month. But Ding follows Heaven, not an opinion. That is not one view beating another.",
      stance:"Zhuangzi admires Cook Ding's skill, but says following the natural pattern is not one opinion beating another.",
      hints:["The spaces between the joints: are they there whether the cook sees them or not?",
             "Argue that the ox really has joints, so a cook who hacks at bone is simply wrong. Some ways of seeing get the pattern right."],
      moves:[
        {need:["joint*|pattern*|grain|seam*|gap*|space*|structure|bone*|nature|natural","real|really|there|wrong|right|true|truer|better|worse|mistak*|miss*|correct"], to:"pattern", gain:25,
         reply:["#hmm# The joints are there for the clumsy cook too. He just does not see them."]}
      ],
      traps:[
        {need:["heaven|dao|tao|no-view|no view|wander*"], cost:1,
         reply:["Follow the Dao, yes, yes. You are agreeing with me again, #addr#."]},
        {need:["nineteen|sharp*|whetstone|sharpen*"], cost:1,
         reply:["Nineteen years, sharp as new. I told you that. What follows from it?"]}
      ]
    },
    pattern:{
      enter:"*stops smiling for a moment* The ox has joints whether I see them or not, and the hacking cook is… mistaken. Hm. But the butterfly! How do you know you are not dreaming even now? Then nothing is surely this rather than that.",
      stance:"Zhuangzi grants that the cook can be wrong about the ox, but falls back on the dream: maybe nothing is surely this rather than that.",
      hints:["Read the end of his own butterfly story. What does he say must exist between Zhou and the butterfly?",
             "Remind him that he wrote: between Zhou and the butterfly there must be some distinction."],
      moves:[
        {need:["distinction|differen*|distinct|separate|two","zhou|butterfl*|must be|you said|yourself|your own|you wrote"], to:"WIN"}
      ],
      traps:[
        {need:["fish|happy|bridge"], cost:1,
         reply:["The fish again? I know they are happy, and you cannot prove I do not. Back to the butterfly, #addr#."]}
      ]
    }
  },
  win:"*rolls onto his back and laughs at the sky* ‘Between Zhou and the butterfly there must be some distinction. This is called the transformation of things.’ I wrote it and then forgot I had. The joints are there, the cook can miss them, and the dreamer can wake. Very well, #addr#: some ways of seeing are truer than others. Huizi would have been unbearable about this. I miss him.",
  lose:"*drifts off to sleep on the bridge* Wake me when you are a butterfly, #addr#. Or when I am.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "Your claim that all perspectives are equal is itself just another perspective.",
    "Yet you praise Cook Ding, whose knife stays sharp while clumsy cooks blunt theirs.",
    "The ox really has joints, so a cook who hacks at bone is simply wrong.",
    "You yourself wrote that between Zhou and the butterfly there must be some distinction."
  ]
};
