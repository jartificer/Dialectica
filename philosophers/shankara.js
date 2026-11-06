/* Shankara */
export default {
  id:"shankara", name:"Adi Shankara", dates:"c. 788–820", era:"Middle Ages", place:"Śṛṅgeri, on the Tungā river",
  diff:3, patience:8, glyph:"श", color:"#c0702a", born:788,
  core:"Brahman alone is real; the world of many things is an illusion (māyā), like a snake seen in a rope.",
  target:"The world of many things is real, not mere illusion.",
  bio:"Teacher of Advaita Vedānta, non-dualism. Tradition says he left home as a boy, walked the length of India, wrote commentaries on the Upaniṣads, the Bhagavad Gītā and the Brahma Sūtras, debated every school he met, and founded monasteries at the four corners of the land before dying at about thirty-two. He taught that the self (ātman) is identical with Brahman, and that the world of many things is māyā.",
  voice:{
    claim:["Brahman alone is real", "the world is appearance", "the self is Brahman", "the many is only name and form"],
    tic:["Tat tvam asi: that thou art.", "Neti, neti: not this, not this.", "Brahman is real, the world is appearance, the self is nothing but Brahman."],
    image:["In the dusk a rope looks like a snake, and the traveller trembles.", "The space in a pot is the same space as the sky; break the pot and nothing is lost.", "Mother-of-pearl glints, and the greedy man sees silver."],
    addr:["seeker","child","friend","learned one"],
    oath:["Om","Hari Om"],
    gest:["*adjusts his saffron cloth*","*leans on his staff*","*pours water from his kamandalu*","*smiles like a teacher who has heard it before*"],
    core:["non-duality","the teaching of the Upaniṣads","Brahman alone"],
    greet:["*raises his hand in blessing* Welcome, seeker. You are, as it happens, Brahman. But sit."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"At dusk a traveller sees a snake on the path and trembles. Bring a lamp: it was a rope all along. The snake was never there. So with the world of many things, of you and me and the river: it is superimposed on Brahman through ignorance. Brahman alone is real; the world is appearance.",
      stance:"Śaṅkara says only Brahman is real; the world of many things is an illusion produced by ignorance, like a snake seen in a rope.",
      hints:["An illusion needs someone who is fooled by it. If only Brahman exists, who is that?",
             "Ask who is mistaken. If only Brahman is real, whose ignorance creates the illusion?"],
      moves:[
        {need:["who|whom|whose|someone|somebody|perceiver|observer|subject|knower","mistak*|ignoran*|deceiv*|fooled|illusion*|confus*|wrong|maya|err*"], to:"avidya", gain:30,
         reply:["#hmm# The question of the locus of ignorance. My critics will be asking it for centuries."]}
      ],
      traps:[
        {need:["rope|snake|serpent|mirage|silver|shell"], cost:1,
         reply:["Yes, the rope and the snake. I gave you that image, #addr#; you cannot fight me with it."]},
        {need:["god|gods|shiva|vishnu|worship*|devotion|bhakti|temple*"], cost:1,
         reply:["Worship is good. The Lord with qualities is Brahman as seen from within māyā. That does not touch my point."]},
        {need:["buddh*|empty|emptiness|nagarjuna"], cost:0,
         reply:["They call me a Buddhist in disguise. *chuckles* The Buddhists say there is no self; I say there is only the Self. Go on."]},
        {need:["caste|brahmin*|outcaste*"], cost:1,
         reply:["I once told an outcaste to step out of my way, and he asked whether I wanted his body or his self to move. I bowed to him. The self has no caste."]}
      ]
    },
    avidya:{
      enter:"Ignorance, avidyā, is beginningless. It is neither real, since knowledge removes it, nor unreal, since we do experience it. It is indescribable: anirvacanīya.",
      stance:"Śaṅkara says ignorance is ‘indescribable’: neither real nor unreal.",
      hints:["Something that is neither real nor unreal: is that an explanation, or a name for the problem?",
             "Say that ‘neither real nor unreal’ is just a label for a mystery, or a contradiction."],
      moves:[
        {need:["neither|indescrib*|inexplicab*|anirvacaniya|real nor","@contradict|label|name|mystery|evasion|dodge|meaningless|nonsense|explain*|cop*"], to:"sleep", gain:25,
         reply:["*frowns* A label. Hmm. Then let me argue from experience instead."]}
      ],
      traps:[
        {need:["beginningless|always been|eternal"], cost:1,
         reply:["Beginningless, yes. Like the seed and the tree. You only repeat me."]}
      ]
    },
    sleep:{
      enter:"Consider deep, dreamless sleep. The many vanishes, the world vanishes, yet you wake and say ‘I slept well’: the witness remained. The world comes and goes; the self does not. What comes and goes is less real than what stays.",
      stance:"Śaṅkara argues from deep sleep: the world comes and goes but the witnessing self remains, so the world is less real.",
      hints:["When you wake, what is waiting for you? Is it the same for everyone, unlike a dream?",
             "Point out that when you wake, the same world is waiting for everyone, unlike a private dream."],
      moves:[
        {need:["wake|waking|awake|morning|same|shared|share|everyone|other people|public|common|together","world|thing*|room|tree*|river*|ganga|ganges|dream*"], to:"teach", gain:25,
         reply:["#gest# Dreams are private and cancelled on waking. The waking world is shared, and it is still there in the morning. Yes."]}
      ],
      traps:[
        {need:["witness|self|atman|brahman"], cost:1,
         reply:["The witness, the self, Brahman: these are my words, child. Give me yours."]}
      ]
    },
    teach:{
      enter:"I say the waking world is cancelled too, by the knowledge of Brahman, as waking cancels the dream. Until then it has practical reality, vyavahārika. But from the highest standpoint, it is appearance.",
      stance:"Śaṅkara says the waking world is ‘practically’ real until liberation cancels it, as waking cancels a dream.",
      hints:["Look at how he lives. What did he spend his short life doing, and for whom?",
             "Point out that dreams are cancelled every morning, but nothing has ever been seen to cancel the waking world: until something does, it stands as real."],
      moves:[
        {need:["cancel*|sublat*|overturn*|wake up from|woken from|dispel*|disappear*","never|nothing|no one|nobody|not once|no evidence|every morning|until"], to:"WIN"}
      ],
      traps:[
        {need:["practical*|convention*|vyavahar*|two levels|levels|standpoint*"], cost:1,
         reply:["Two levels of truth, yes. I already said it. That is the escape you must close, not the door you must open."]}
      ]
    }
  },
  win:"*sets down his staff* Every morning the dream is cancelled, and the waking world is still there. I have promised that it too will be cancelled, yet I walked from Kerala to the Himalaya and taught in it as if it stood. A man does not cross India to wake a dream-figure. Very well, #addr#: the world of many things is real, not mere illusion. Real enough to walk on and to teach in. I will need a new commentary.",
  lose:"*rises and takes up his staff* The road to the north is long and you are not on it, seeker. May you wake in time.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "If only Brahman is real, who is it that is mistaken and sees the illusion?",
    "Something that is neither real nor unreal is just a label for a mystery.",
    "When you wake, the same world is waiting for everyone, unlike a private dream.",
    "Nothing has ever been seen to cancel the waking world, while dreams are cancelled every morning; until something does, the world stands as real."
  ]
};
