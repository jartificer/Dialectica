/* Epicurus */
export default {
  id:"epicurus", name:"Epicurus", dates:"341–270 BCE", era:"Hellenistic", place:"The Garden, Athens",
  diff:3, patience:8, glyph:"Ε", color:"#4f8a6e", born:-341,
  core:"Pleasure — freedom from pain and anxiety — is the only thing good in itself.",
  target:"Something matters more than pleasure.",
  bio:"Founder of the Garden, a community that admitted women and slaves. Epicurus taught that pleasure, understood as calm freedom from pain (ataraxia), is the goal of life. He lived on bread and water and prized friendship above everything — which may be his weak point.",
  voice:{
    claim:["pleasure is the only good", "a calm and painless life is all we need", "we value everything for the pleasure it brings"],
    tic:["Live unnoticed, #addr#.", "Bread and water, and a friend.", "Do not spoil what you have by desiring what you have not."],
    image:["A little cheese, and I feast like Zeus."],
    addr:["friend","my friend","dear friend"],
    oath:["By the gods (who do not care)","By the atoms"],
    gest:["*breaks a piece of bread*","*sips water*","*smiles serenely*","*waves at a passing bee*"],
    core:["the pleasant life","my hedonism","ataraxia"]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Welcome to the Garden, #addr#. Here we live simply: bread, water, a little cheese on feast days. Pleasure is the beginning and end of the blessed life — not the pleasures of the glutton, but freedom from pain in the body and trouble in the soul. Everything else we value, we value only for the pleasure it brings.",
      stance:"Epicurus holds that pleasure, meaning freedom from pain and mental disturbance, is the only thing good in itself.",
      hints:["Imagine a situation where you could have perfect pleasure, but something important would be missing.",
             "Propose a machine (or drug, or endless dream) that gives perfect, calm pleasure. Would anyone choose to live in it forever? Or ask about friendship."],
      moves:[
        {need:["machine|simulat*|dream*|illusion*|drug*|potion|matrix|fake|virtual|plug*|hallucinat*|device|pill|lotus"], to:"machine", gain:30,
         reply:["#hmm# A device that gives perfect, untroubled pleasure for the rest of one's life…"]},
        {need:["friend*"], to:"friend", gain:25,
         reply:["#gest# Of all the things wisdom provides for a happy life, the greatest by far is friendship."]},
        {need:["truth|true|know*|knowledge|real|reality|science"], to:"truth", gain:15,
         reply:["#hmm# Knowledge? Let me tell you what knowledge is for."]}
      ],
      traps:[
        {need:["sex|wine|feast*|luxur*|glutton*|drunk*|party|parties|orgy|indulg*|excess*|food"], cost:1,
         reply:["You mistake me for a glutton — the slander my enemies spread. A man who has bread and water rivals Zeus in happiness, #addr#."]},
        {need:["death|die|afraid|fear"], cost:1,
         reply:["Death is nothing to us. Where death is, I am not; where I am, death is not. Next question, #addr#."]},
        {need:["god|gods"], cost:1, reply:["The gods are blessed and untroubled; they do not concern themselves with us, so we need not concern ourselves with them."]},
        {need:["virtue|justice|honour|honor|duty"], cost:1, reply:["Virtue is the inseparable companion of the pleasant life — but only its servant. We choose virtue for the sake of pleasure, as we choose medicine for health."]}
      ]
    },
    truth:{
      enter:"We study nature only to banish fear — fear of the gods, fear of death. If knowledge did not free us from fear, we would have no need of it.",
      stance:"Epicurus says knowledge is only valuable because it frees us from fear.",
      hints:["Would you rather know a painful truth or believe a comforting lie?",
             "Offer him a perfect illusion — a machine that gives tranquil pleasure — and ask if he would enter it."],
      moves:[
        {need:["machine|simulat*|dream*|illusion*|drug*|potion|matrix|fake|virtual|plug*|hallucinat*|device|pill|lotus|comfort*|lie|lies|ignoran*|deceiv*"], to:"machine", gain:25,
         reply:["A comforting illusion that brought perfect calm…"]}
      ],
      traps:[]
    },
    friend:{
      enter:"But we cherish friends for the security and joy they bring. Friendship begins in need and ripens into pleasure.",
      stance:"Epicurus values friendship above all — but only for the security and pleasure it brings.",
      hints:["Would a real friend value you only for the pleasure you give?",
             "Remind him that, by his own teaching, the wise man will sometimes die for a friend — and the dead feel no pleasure. Or ask whether a fake friend giving the same pleasure would do as well."],
      moves:[
        {need:["die|death|dies|sacrific*|give up|life for|risk*|even if|own sake|for its own|for their sake|for them|suffer for|pain for"], to:"real", gain:35,
         reply:["Die for a friend… yes, I did say the wise man will on occasion die for a friend. And the dead feel nothing. #hmm# So the friend is valued beyond what he gives me. That is… uncomfortable."]},
        {need:["fake|pretend*|illusion|machine|robot|imitat*|actor|genuine|true friend|real friend|actual*|counterfeit"], to:"machine", gain:25,
         reply:["A friend who only seems a friend, but gives exactly the same pleasure? Like a device that made one feel befriended…"]}
      ],
      traps:[
        {need:["use|using|selfish|exploit*"], cost:1, reply:["Selfish? Not at all. The pleasure of friendship is mutual. Both gain; neither is used."]}
      ]
    },
    machine:{
      enter:"If it truly gave ataraxia, without pain or fear, I would have no reason to refuse it.",
      stance:"Epicurus says that if a machine gave perfect tranquil pleasure, there would be no reason to refuse it.",
      hints:["Would people actually choose this? Would you?",
             "Say that most people would refuse to plug in — and then explain why."],
      moves:[
        {need:["@neg|refuse|reject*|decline*|nobody|no one|few|most people|never|horrif*|horrible|terrible|sad|empty|hollow","enter|plug*|choose|chose|want|accept|go in|use|it|that|live|choose it|step in"], to:"refuse", gain:25,
         reply:["#hmm# You would refuse? Then perhaps it is fear of the unknown — an empty fear, and those I teach people to dispel."]}
      ],
      traps:[]
    },
    refuse:{
      stance:"Epicurus thinks people refuse the machine out of irrational fear.",
      hints:["The refusal isn't fear. What would be missing inside the machine?",
             "Argue we want our lives to be real — to really do things, really be loved — not just to feel as if we were."],
      moves:[
        {need:["real*|actual*|truth|true|genuine*|authentic*|really|do things|doing|achiev*|accomplish*|be someone|deeds|in fact|exist|fake|illusion|not real|lie"], to:"real", gain:25,
         reply:["Real… *the bread stops halfway to his mouth* You mean we want the friend to *be* there, not merely the feeling of the friend."]}
      ],
      traps:[
        {need:["fear|afraid|scared|anxi*"], cost:1, reply:["Fear, then — exactly as I said. An empty fear. Reason dissolves it, #addr#."]}
      ]
    },
    real:{
      stance:"Epicurus is wavering: it seems we care whether our friends and deeds are real, not only about how they feel.",
      hints:["Name what we value for its own sake, beyond the pleasure it brings.",
             "Say that friendship (or love, or truth) matters for its own sake — more than pleasure."],
      moves:[
        {need:["friend*|love*|truth|people|others|achiev*|knowledge|virtue|reality|connection*|relationship*|loved ones|family|real life","matter*|value*|worth|care*|own sake|itself|more than|important|good|for them|meaning*|count*"], to:"WIN"}
      ],
      traps:[
        {need:["pleasure|pleasant|happy|happiness|feel good"], cost:1, reply:["Pleasure again? Then you have argued for my side, #addr#."]}
      ]
    }
  },
  win:"*sets down the bread* Then even in my Garden the friend counts for more than the pleasure of the friend. I said it myself without hearing it: the wise man will die for his friend, and a dead man has no pleasure. So something matters more than pleasure. Stay for supper, #addr# — the cheese is on the house.",
  lose:"*smiles serenely* This conversation is beginning to disturb my ataraxia, #addr#. Let us part as friends.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "Imagine a machine that gave you perfect calm pleasure for the rest of your life.",
    "Most people would refuse to plug into it.",
    "Because we want our lives to be real, not just to feel real.",
    "Friendship matters for its own sake, more than the pleasure it brings."
  ]
};
