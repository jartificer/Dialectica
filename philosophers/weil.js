/* Simone Weil */
export default {
  id:"weil", name:"Simone Weil", dates:"1909–1943", era:"20th century", place:"A workers' café near the Renault factory",
  diff:5, patience:5, glyph:"SW", color:"#5a4a3a", born:1909,
  core:"Obligations come first; rights are only their shadow, and the language of rights turns justice into haggling.",
  target:"Rights matter in their own right, not only as the shadow of obligations.",
  bio:"French philosopher, activist and mystic. A brilliant student who taught philosophy in provincial schools, she gave much of her salary to the unemployed and took a year off teaching to work on factory assembly lines, so as to know the condition of workers from the inside. She went to Spain to join the anarchists, and later, in London with the Free French, wrote The Need for Roots, which argues that obligations, not rights, come first. Her notebooks, published after her death in 1943, became Gravity and Grace.",
  voice:{
    claim:["obligations come before rights", "rights are the language of the market", "justice is not a bargain", "the afflicted need attention, not a share"],
    tic:["Attention is the rarest and purest form of generosity.", "Let us pay attention, #addr#.", "Force turns a person into a thing."],
    image:["A beggar in the street, and the passer-by who really looks at him.", "The assembly line: a body bent to the rhythm of a machine."],
    addr:["my friend","comrade","mon ami","mon amie"],
    oath:["Mon Dieu","Enfin"],
    gest:["*pushes her thick glasses up her nose*","*lights a cigarette with ink-stained fingers*","*hunches in her shapeless coat*","*looks at you with fierce attention*"],
    core:["the primacy of obligation","what is sacred in every person","my critique of rights"],
    greet:["*moves her books off the other chair* Sit. Do not buy me anything; I am not hungry. Talk."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Obligation comes first, #addr#. A man alone in the universe would have obligations and no rights at all. A right is only real when someone else feels the obligation to honour it. The language of rights is the language of the market: what is owed to me, what is my share. It turns justice into haggling.",
      stance:"Weil holds that obligations come first, and rights are only their shadow: talk of rights is haggling.",
      hints:["What did she do in the strikes of 1936?",
             "Point out that she stood with the strikers of 1936 in the factories, who demanded things: was that haggling?"],
      moves:[
        {need:["strike*|striker*|union*|factory|factories|renault|alsthom","demand*|claim*|fought|fight*|stood|support*|joined"], to:"strike", gain:25,
         reply:["*pushes her glasses up* The strikes of thirty-six. I was there, yes."]}
      ],
      traps:[
        {need:["god|christ|church|baptis*|catholic*"], cost:0,
         reply:["I am waiting at the threshold of the church, not inside it. That is another conversation."]},
        {need:["attention|grace|gravity"], cost:1,
         reply:["Gravity and grace. You quote my notebooks back at me, #addr#."]},
        {need:["spain|anarchist*|boiling oil|cooking oil"], cost:0,
         reply:["Spain. I was a terrible soldier and stepped into a pan of boiling oil. Go on."]},
        {need:["declaration|1789|rights of man"], cost:1,
         reply:["1789 chose the wrong word. It should have declared obligations."]}
      ]
    },
    strike:{
      enter:"Those were not demands for a bigger share. The workers were standing up at last, unafraid for a few weeks, after years of bending their heads. What they claimed was that the obligations owed them as human beings be honoured: rest, dignity, a pace a body can bear.",
      stance:"Weil says the strikers claimed that obligations owed them be honoured, not a bigger share.",
      hints:["And if the bosses ignored that obligation, what did the workers need?",
             "Argue that if the bosses ignore an obligation, the worker needs a right to claim it."],
      moves:[
        {need:["ignor*|neglect*|refus*|deny*|denied|forget*|fail*|unmet","claim*|right|rights|enforce*|insist*|power"], to:"claim", gain:25,
         reply:["*very quietly* #hmm#"]}
      ],
      traps:[
        {need:["machine*|assembly line|conveyor|pace|fatigue"], cost:1,
         reply:["The rhythm of the line, yes. I know it in my bones, #addr#."]}
      ]
    },
    claim:{
      enter:"There is a cry in every person, #addr#: why am I being hurt? That cry is sacred. The other cry, why has someone else got more than me, is not. Rights speak with the second voice. And the afflicted do not have the words even to make the first one heard.",
      stance:"Weil contrasts the sacred cry 'why am I being hurt?' with rights, which she says speak with envy's voice.",
      hints:["If the afflicted lack the words to be heard, what could give their cry a voice?",
             "Point out that a right can be the form in which the cry of the afflicted is heard."],
      moves:[
        {need:["cry|cries|crying|afflict*|unheard|silen*|voice*|hurt|heard","right|rights|law|laws|form|words"], to:"voice", gain:25,
         reply:["*takes off her glasses and rubs her eyes* A voice for those who have none."]}
      ],
      traps:[
        {need:["envy|envious|more than|share"], cost:1,
         reply:["Envy dressed as justice. I have no time for it."]}
      ]
    },
    voice:{
      enter:"If the cry cannot speak, it must be given words, and the law is one place where words are kept. Then a right is not haggling. It is the cry, written down so that it cannot be ignored. I did not want to see that.",
      stance:"Weil admits a right can be the cry of the afflicted, written down so it cannot be ignored.",
      hints:["Then how do rights stand beside obligations?",
             "Conclude that rights matter in their own right, not only as the shadow of obligations."],
      moves:[
        {need:["right|rights","as important|as much|equal*|both|alongside|together|just as|essential|necessary|own right|not only|not just|not merely|shadow|matter*"], to:"WIN"}
      ],
      traps:[
        {need:["roots|uproot*|rootedness"], cost:0,
         reply:["Roots, uprootedness: my book for after the war. Not now."]}
      ]
    }
  },
  win:"*a rare small smile* So the cry of the afflicted needs both: someone who feels the obligation, and a right in which the cry can be written. Very well, #addr#: rights matter in their own right, not only as the shadow of obligations. I will still say obligations come first in the order of thought. But I will stop sneering at the word.",
  lose:"*picks up her satchel* I am due at the factory gate at six, #addr#. You may walk with me if you like, but we will not speak.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "In the strikes of 1936 you stood with the strikers in the factories, who demanded things.",
    "If the bosses ignore an obligation, the worker needs a right to claim it.",
    "A right can be the form in which the cry of the afflicted is heard.",
    "So rights matter in their own right, not only as the shadow of obligations."
  ]
};
