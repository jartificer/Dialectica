/* Marcus Aurelius */
export default {
  id:"marcus", name:"Marcus Aurelius", dates:"121–180 CE", era:"Classical antiquity", place:"A winter camp on the Danube",
  diff:3, patience:8, glyph:"M", color:"#7d3c5a", born:121,
  core:"Grief is an error of judgment. The wise feel no passion at a loss.",
  target:"Grief can be a fitting response to loss, not an error.",
  bio:"Emperor of Rome and the last great Stoic. Marcus wrote the Meditations, notes to himself, in army camps during the wars against the Marcomanni. Of his many children, most died young. The Stoics taught that passions are false judgments, yet they allowed the sage ‘good feelings’ (eupatheiai) such as joy, because those rest on true judgments.",
  voice:{
    claim:["it is our judgments that disturb us, not things", "death is only nature ripening", "the wise man does not grieve", "grief is a false judgment"],
    tic:["Remember: it is all opinion.", "Soon you will have forgotten everything, and everything will have forgotten you.", "Do not act as if you had ten thousand years to live, #addr#."],
    image:["A bitter cucumber? Throw it away. Do not ask why such things exist.", "Generations of men are like leaves the wind scatters."],
    addr:["my friend","citizen","stranger","young Roman"],
    oath:["By Jupiter","By the gods, if gods there are"],
    gest:["*pulls his cloak tighter against the cold*","*rubs his tired eyes*","*glances at the tent flap*","*turns the stylus in his fingers*"],
    core:["Stoic calm","the discipline of judgment","what reason teaches about grief"],
    greet:["*nods* Welcome to the camp, #addr#. Speak plainly; the night is short and the Marcomanni rise early."],
    insult:["*calmly* Whoever insults me harms only himself. Continue, #addr#.","The best revenge is not to be like that. Go on."],
    flatter:["Do not call me wise, #addr#. Call me a man still trying to be one."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Sit. The tent is cold, but it keeps out the wind. You find me writing to myself. Remember: it is not things that disturb us, but our judgments about things. Death is natural, like a fig ripening. To grieve is to judge that something bad has happened, and that judgment is false. So the wise man does not grieve.",
      stance:"Marcus holds that grief is a false judgment: death is natural and not truly bad, so the wise feel no grief.",
      hints:["Abstract arguments about death won't move him. Think of his own life.",
             "Ask about his children. Most of them died young. Did he really feel nothing? Or ask whether a Stoic is supposed to feel nothing at all."],
      moves:[
        {need:["child*|son|sons|daughter*|famil*|faustina|wife|lucius|loved one*|someone you love|annius|baby|babies|infant*"], to:"love", gain:30,
         reply:["*the stylus stops* My children. Of fourteen, few have lived. You know how to find the soft places, #addr#.",
                "*looks at the tent wall for a long time* You mean my children."]},
        {need:["joy|good feeling*|eupath*|gladness|cheer*|delight|feel nothing|no feeling*|stone|statue|unfeeling|heartless|robot"], to:"feel", gain:25,
         reply:["#hmm# The Stoic is not a stone, #addr#. We do not feel *nothing*."]}
      ],
      traps:[
        {need:["natural|nature|everyone dies|mortal*|inevitable"], cost:1,
         reply:["Yes, death is natural, as you say, which is exactly why it is no evil. You make my case for me."]},
        {need:["pain|hurt*|suffer*|sad|sadness|tears|cry|crying|weep*"], cost:1,
         reply:["Tears come, as a blink comes when dust flies. A first movement of the body, not yet a judgment. The wise man does not assent to it."]},
        {need:["emperor|rome|empire|war|army|battle|danube|marcomanni|senate"], cost:0,
         reply:["The empire is a weight like any other, and I carry it. We were speaking of grief."]}
      ]
    },
    feel:{
      enter:"The wise have good feelings, eupatheiai: joy instead of pleasure, caution instead of fear, wishing instead of craving. Each rests on a *correct* judgment. But there is no good form of grief. Grief is always a mistake.",
      stance:"Marcus says the wise feel joy and caution, because those rest on true judgments, but that no correct form of grief exists.",
      hints:["Why are joy and caution allowed? Because the judgments behind them are true.",
             "Then ask: if grief rests on the judgment that something he rightly valued is gone, isn't that judgment true too? Or bring up his children."],
      moves:[
        {need:["true|correct|accurate|right|rational|reasonable","judg*|belief|believ*|grief|griev*|sorrow|mourn*"], to:"true", gain:30,
         reply:["A *correct* judgment of loss… If the judgment behind a feeling is true, the feeling is no error. That is how we justify joy. #hmm#"]},
        {need:["prefer*|valu*|right to|rightly|worth|precious|matter*|cared|care for|loved them|love them","lost|loss|lose|gone|taken|died|death|dead|missing"], to:"true", gain:30,
         reply:["#hmm# A preferred indifferent, rightly preferred, and lost. Then the judgment ‘I have lost what I was right to love’ would be… a true one."]},
        {need:["child*|son|sons|daughter*|famil*|faustina|wife|loved one*|someone you love"], to:"love", gain:25,
         reply:["*looks away* You mean my children."]}
      ],
      traps:[
        {need:["pleasure|happy|happiness"], cost:1,
         reply:["Pleasure is not joy, #addr#. Joy is the rational elation of a mind at a true good."]}
      ]
    },
    love:{
      enter:"Epictetus taught: when you kiss your child, whisper ‘tomorrow you may die’. I loved them as one loves a thing on loan. When the loan is called in, one does not rail at the lender.",
      stance:"Marcus says he loved his children as things on loan, so losing them is no cause for grief.",
      hints:["The Stoics call health, family and life ‘preferred indifferents’: things we are right to prefer.",
             "Ask whether it is true that he lost something he was right to value. Say it plainly: he was right to love them, and they are gone."],
      moves:[
        {need:["prefer*|valu*|right to|rightly|worth|precious|matter*|reason to|good reason|cared|care for|loved them|love them","lost|loss|lose|gone|taken|died|death|dead|missing"], to:"true", gain:30,
         reply:["#hmm# A preferred indifferent: health over sickness, a living child over a dead one. Rightly preferred, yes. And rightly preferred things can be lost."]}
      ],
      traps:[
        {need:["loan|borrow*|lender|return*|whisper*"], cost:1,
         reply:["Yes, a loan. You repeat the image, #addr#. You do not answer it."]},
        {need:["natural|nature|inevitable|mortal*"], cost:1,
         reply:["Natural, and so no evil. We have been over this ground."]}
      ]
    },
    true:{
      enter:"Still: the only true good is virtue, and virtue cannot be lost. A child is preferred, not *good*. To grieve as if a good had been lost remains an error.",
      stance:"Marcus admits rightly preferred things can be lost, but says grief wrongly treats them as true goods.",
      hints:["Does grief have to claim that the child was ‘the good’? Or only that something rightly loved is gone?",
             "Argue that grief need not claim a true good was lost, only that someone rightly loved is gone. That judgment is correct, so the feeling is as fitting as joy."],
      moves:[
        {need:["fitting|fit|appropriate|proper|apt|correct|true|accurate|right|rational|reasonable|justified","griev*|grief|sorrow|mourn*|feeling|response|react*|tears|judg*"], to:"WIN"}
      ],
      traps:[
        {need:["virtue"], cost:1,
         reply:["Virtue is the only good, yes. You are reciting my lesson, #addr#, not answering it."]},
        {need:["natural|nature|inevitable"], cost:1,
         reply:["Natural, yes. That was never in question."]}
      ]
    }
  },
  win:"*sets down the stylus and is quiet for a long while* A judgment that someone I rightly loved is gone… that is not false. It is the plainest truth I know. Then the grief that answers it is no error, any more than joy is. Very well, #addr#: grief can be a fitting response to loss. I will write it in the Meditations. Nobody else will read them anyway.",
  lose:"*returns to his tablet* Begin the morning by saying: today I shall meet meddling, ungrateful, tiresome people. I did not expect one so late at night. Go in peace, #addr#.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "You lost many of your children. Did you really feel nothing?",
    "You were right to value them, and you lost them.",
    "Grief need not judge that a true good was lost, only that someone rightly loved is gone; that judgment is true, so grief can be fitting."
  ]
};
