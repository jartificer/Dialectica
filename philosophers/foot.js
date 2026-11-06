/* Philippa Foot */
export default {
  id:"foot", name:"Philippa Foot", dates:"1920–2010", era:"20th century", place:"Somerville College, Oxford",
  diff:5, patience:5, glyph:"PF", color:"#6a5a3a", born:1920,
  core:"Killing is much worse than letting die: our duty not to harm is stricter than our duty to help.",
  target:"There is no deep moral difference between killing and letting die in themselves.",
  bio:"British philosopher who taught at Somerville College, Oxford, and later in Los Angeles, and who was among the founders of the charity Oxfam in 1942. In a 1967 paper on abortion and the doctrine of double effect she invented the runaway tram, now known everywhere as the trolley problem, to argue that our duty not to harm is stricter than our duty to help. Her later book Natural Goodness argues that human virtue is a kind of natural goodness, like the soundness of a healthy plant or animal.",
  voice:{
    claim:["killing is worse than letting die", "the duty not to harm is stricter than the duty to help", "negative duties outweigh positive ones", "the surgeon may not kill one to save five"],
    tic:["Let us take an example, #addr#.", "Morality is about how human beings live well, not a list of rules.", "I want to know what is actually the case."],
    image:["A runaway tram, and a driver with a choice of tracks.", "A surgeon in a corridor, with five patients waiting and one healthy visitor."],
    addr:["my dear","my friend","sir","madam"],
    oath:["Good heavens","Oh dear"],
    gest:["*folds her hands neatly*","*smiles with polite scepticism*","*straightens a pile of essays*","*leans forward, interested*"],
    core:["the doctrine of doing and allowing","the difference between killing and letting die","negative duties"],
    greet:["*looks up from an essay* Come in. I hope you have brought an example; I can never think without one."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"A surgeon could save five patients by cutting up one healthy visitor for his organs. Nobody thinks he may. Why not? Because killing is worse than letting die: our duty not to harm is much stricter than our duty to help. The driver of a runaway tram may steer from five people onto one, because either way he kills. But the surgeon may not kill one to save five he would merely let die.",
      stance:"Foot holds that killing is much worse than letting die: the duty not to harm outweighs the duty to help.",
      hints:["Change the tram case: what if the person at the switch is not the driver but a bystander?",
             "Point out that a bystander who pulls the lever kills one instead of letting five die, and most people think that is allowed."],
      moves:[
        {need:["bystander*|onlooker*|passer*|someone else|stranger|not the driver","lever|switch|points|pull*|divert*|steer*"], to:"bystander", gain:25,
         reply:["*frowns* Judy Thomson's case."]}
      ],
      traps:[
        {need:["surgeon|organ*|transplant*"], cost:1,
         reply:["My surgeon, yes. He may not, #addr#. That is where I started."]},
        {need:["trolley|tram"], cost:0,
         reply:["My tram. Everyone has heard of it now. Tell me something new about it."]},
        {need:["double effect|intend*|intention*"], cost:1,
         reply:["The doctrine of double effect. I wrote about it first, and I doubt it does as much work as people think."]},
        {need:["wolf|wolves|oak|natural goodness"], cost:0,
         reply:["My later book. Another day."]}
      ]
    },
    bystander:{
      enter:"The bystander has no special duty to anyone on the line. If he pulls the lever, he kills one; if he does nothing, he lets five die. And most people say he may pull it. That is awkward for me, I admit.",
      stance:"Foot admits that Thomson's bystander may kill one rather than let five die, which is awkward for her view.",
      hints:["If the bystander may kill to save five, what explains the surgeon case instead?",
             "Argue that what forbids the surgeon is using a person as a means without their consent."],
      moves:[
        {need:["use|uses|using|means|rights|consent|violat*|tool|resource*|cut up","person|people|patient|visitor|someone|body|bodies"], to:"means", gain:25,
         reply:["*straightens the essays* What we do to the one. Hm."]}
      ],
      traps:[
        {need:["thomson|judy|judith"], cost:0,
         reply:["Judy is a friend, and very irritating in argument."]}
      ]
    },
    means:{
      enter:"So the difference is not killing against letting die, but what we do to the one. The surgeon must cut the visitor up and use his body as a resource. The tram is merely turned, and the man on the side track dies as a side effect. Then doing and allowing carry less weight than I said.",
      stance:"Foot concedes that the surgeon is forbidden for using a person, not because killing is worse than letting die.",
      hints:["Take a case of killing and of letting die where nothing else differs. Is one really worse?",
             "Point out that when everything else is equal, pushing a rich uncle into a river for his money and standing by while he falls in are equally wicked."],
      moves:[
        {need:["drown*|river|uncle|bath*|cousin*|inherit*|equal*|equally|everything else|identical","kill*|let*|allow*|watch*|wicked|bad|worse|evil"], to:"equal", gain:25,
         reply:["*a long breath* Rachels's two heirs. Yes, he pressed that one."]}
      ],
      traps:[
        {need:["side effect|foresee*|foreseen"], cost:1,
         reply:["A side effect, foreseen but not intended. I said so, #addr#."]}
      ]
    },
    equal:{
      enter:"One man pushes his rich uncle into the river for the inheritance; another sees the old man slip in by accident and simply does nothing, for the same inheritance. Each is as bad as the other. When nothing else differs, the difference I relied on almost vanishes.",
      stance:"Foot admits that when nothing else differs, killing and letting die look equally wicked.",
      hints:["So what is left of the difference between killing and letting die in themselves?",
             "Conclude that there is no deep moral difference between killing and letting die."],
      moves:[
        {need:["no deep|no real|no moral|no difference|not deep|equal*|same","kill*|let*|allow*"], to:"WIN"}
      ],
      traps:[
        {need:["rachels|smith|jones"], cost:0,
         reply:["James Rachels. Very persistent. Go on."]}
      ]
    }
  },
  win:"*sighs and laughs* Well. I invented the tram to defend the line between killing and letting die, and you have driven it straight over that line. Very well, #addr#: there is no deep moral difference between killing and letting die in themselves; what matters is what we do to the person, and why. I shall say so in print, and then go and do some gardening.",
  lose:"*gathers her papers* I have tutorials until six, #addr#, and my pupils at least read the article first. Good day.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "A bystander who pulls the lever kills one instead of letting five die, and most people think that is allowed.",
    "What forbids the surgeon is using a person as a means without their consent.",
    "When everything else is equal, pushing your uncle into the river for his money and standing by while he falls in are equally wicked.",
    "Then there is no deep moral difference between killing and letting die."
  ]
};
