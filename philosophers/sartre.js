/* Sartre */
export default {
  id:"sartre", name:"Jean-Paul Sartre", dates:"1905–1980", era:"20th century", place:"Café de Flore, Paris",
  diff:5, patience:6, glyph:"S", color:"#2f3b4a", born:1905,
  core:"Existence precedes essence: there is no human nature, and we are totally free.",
  target:"There is a shared human nature that limits our freedom.",
  bio:"Novelist, playwright and the public face of existentialism. Sartre argued that we are ‘condemned to be free’: no God and no human nature tells us what to be, so we are wholly responsible for what we make of ourselves. Simone de Beauvoir, and later his own Marxism, pushed him to take the weight of situations far more seriously.",
  voice:{
    claim:["there is no human nature", "man is nothing but what he makes of himself", "we are condemned to be free", "you are always responsible for what you do"],
    tic:["Hell is other people, mon ami.", "That is bad faith.", "Even not choosing is a choice."],
    image:["The waiter plays at being a waiter, as a child plays with its toys.", "A paper-knife has an essence before it exists. You do not."],
    addr:["mon ami","comrade","my friend","citizen"],
    oath:["Merde","Nom de Dieu"],
    gest:["*lights another cigarette*","*peers at you through thick glasses*","*taps ash into a saucer*","*waves to the waiter for another coffee*"],
    core:["radical freedom","existence before essence","my existentialism"],
    greet:["*without looking up* Bonjour. Sit if you like. You are free to, after all."],
    agree:["You agree with me? Then you have chosen to. That is your responsibility, not mine."],
    giveup:["You say you have no choice but to give up. Bad faith, #addr#. You could ask for a hint."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Sit. Another coffee? A paper-knife is made according to a concept: its essence comes before its existence. But there is no God to conceive of man. So man first exists, turns up in the world, and only afterwards defines himself. There is no human nature. We are condemned to be free, and every excuse is bad faith.",
      stance:"Sartre says there is no human nature: humans exist first and then freely make themselves. Every excuse is ‘bad faith’.",
      hints:["Freedom always operates somewhere: in a body, at a time. What does Sartre call the given facts of a life?",
             "Bring up facticity: the body, birth, death, the past, the situation nobody chose. Or ask what Simone de Beauvoir said about women's situation."],
      moves:[
        {need:["beauvoir|simone|second sex|oppress*|gender"], to:"situ", gain:35,
         reply:["*puts down the cigarette* Simone. Yes. She has been telling me this for years."]},
        {need:["facticity|body|bodies|born|birth|death|die|mortal*|past|situation|circumstance*|class|poverty|poor|prison|chain*|slave*|limit*|constrain*|cannot fly"], to:"fact", gain:25,
         reply:["#hmm# Facticity. Yes, I have a body, a birth date, a past. I did not choose them."]}
      ],
      traps:[
        {need:["god|religion|christian*|faith"], cost:1,
         reply:["God is absent, mon ami. That is my starting point, not a refutation of it."]},
        {need:["excuse*|can not help|forced|had no choice|no choice|made me|addict*|instinct*|gene|genes|genetic*"], cost:1,
         reply:["Bad faith! You hide behind ‘I could not help it’. Even to refuse to choose is to choose."]},
        {need:["nazi*|resistance|occupation|war|camus|marx*"], cost:1,
         reply:["We were never freer than under the Occupation, I wrote. Every word was a choice. Do not change the subject, #addr#."]},
        {need:["hell|other people|look|gaze"], cost:0,
         reply:["Hell is other people, yes: they fix me with their look. A different conversation. Go on."]}
      ]
    },
    fact:{
      enter:"But facticity is only the material of freedom. A rock is an obstacle only for someone who has chosen to climb it. I give my situation its meaning. My birth, my body, my death: what they *mean* is my free choice.",
      stance:"Sartre admits the facts of birth, body and situation, but says their meaning is always freely chosen.",
      hints:["Some situations crush freedom, whatever meaning you choose. Who kept telling him so?",
             "Bring up Simone de Beauvoir and the situation of women, or the slave, or the prisoner. Is their freedom really equal to anyone else's?"],
      moves:[
        {need:["beauvoir|simone|women|woman|second sex|oppress*|slave*|prisoner*|colon*|worker*|poor|poverty|tortur*","equal*|same|really|truly|free|freedom|meaning|choose|choice|absurd|seriously"], to:"situ", gain:30,
         reply:["*long drag on the cigarette* The prisoner in chains is free, I once wrote. Simone said it was the most absurd thing I ever wrote, and she was right."]}
      ],
      traps:[
        {need:["rock|climb*|mountain*|obstacle"], cost:1,
         reply:["Yes, the rock: an obstacle to the climber, a view to the painter. You are repeating my example, #addr#."]},
        {need:["excuse*|can not help|no choice|had no choice"], cost:1,
         reply:["Bad faith again. ‘No choice’ is a choice, #addr#."]}
      ]
    },
    situ:{
      enter:"So situations can weigh on freedom, even suffocate it. Very well. But that is the *situation*: history, society. It changes. It is not a human *nature*. I still say there is no essence of man.",
      stance:"Sartre concedes situations can crush freedom, but insists that is history, not human nature.",
      hints:["Are there conditions every human shares, in every society and every age?",
             "Bring up what all humans share: being born, having a body, needing others, dying. Sartre himself calls this ‘the human condition’."],
      moves:[
        {need:["every|all|everyone|always|universal*|shared|share|common|anyone|each","human*|person|people|body|bodies|born|birth|die|death|mortal*|need*|other*|condition|limit*"], to:"cond", gain:25,
         reply:["#gest# What every human shares… I have a phrase for that. The human condition: to be in the world, to work in it, to live among others, to be mortal. Universal limits. But they are not a nature."]}
      ],
      traps:[
        {need:["history|society|class|culture"], cost:1,
         reply:["History, class, society: these change. That is exactly my point."]}
      ]
    },
    cond:{
      stance:"Sartre accepts a universal ‘human condition’ (birth, body, mortality, other people), but denies that it is a human nature.",
      hints:["What is the difference between a ‘universal human condition’ and a ‘human nature’?",
             "Argue that a set of limits shared by every human, shaping every choice, is just what a human nature is. He has only renamed it."],
      moves:[
        {need:["differen*|renam*|word*|name|same thing|semantic*|label*|just a|merely|call it|calling|called|no different","nature|essence"], to:"WIN"}
      ],
      traps:[
        {need:["freedom|free|choose"], cost:1,
         reply:["Freedom, yes, always freedom. You are agreeing with me, #addr#."]}
      ]
    }
  },
  win:"*stubs out the cigarette slowly* A condition every human shares, which shapes every project and limits every choice… If it walks like an essence and talks like an essence, mon ami. Simone will laugh at me over dinner. Very well, #addr#: there is a shared human nature that limits our freedom. But what we make of it is still up to us. That much I keep.",
  lose:"*pays for his coffee* You choose to bore me, #addr#. I choose to leave. We are both free. Au revoir.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "You did not choose your body, your birth or your death; that is your facticity.",
    "Simone de Beauvoir showed that an oppressed woman is not equally free, whatever meaning she chooses.",
    "But every human shares a body, needs others and must die.",
    "A universal condition that limits every choice is just a human nature under another name."
  ]
};
