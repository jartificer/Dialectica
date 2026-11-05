/* Avicenna */
export default {
  id:"avicenna", name:"Ibn Sīnā (Avicenna)", dates:"c. 980–1037", era:"Middle Ages", place:"Hamadan, Persia",
  diff:3, patience:8, glyph:"س", color:"#2a6a8a", born:980,
  core:"The soul knows itself directly, without the body: a man floating in the void, senses cut off, would still know that he exists. So the soul is an immaterial substance.",
  target:"Self-awareness does not prove the soul is separate from the body.",
  bio:"Persian physician and philosopher from near Bukhara, who knew the Qur'an by heart at ten and was treating the Samanid emir by eighteen. His Canon of Medicine was taught in Europe for six centuries, and his Book of Healing reworked Aristotle into a vast system. His ‘floating man’ argument says a person created in mid-air, blind and touching nothing, would still be aware of their own existence.",
  voice:{
    claim:["the soul knows itself without the body", "the floating man would still affirm his own existence", "the soul is a substance distinct from the body", "what I know while ignoring the body cannot be the body"],
    tic:["I am a physician, #addr#; I know what a body is.", "Let us reason it through like a proof in geometry.", "When a problem defeated me, I went to the mosque and prayed, and then drank a cup of wine."],
    image:["Imagine a man created all at once, floating in the air, his limbs apart, touching nothing, seeing nothing.", "The body is the soul's instrument, as the pen is the scribe's."],
    addr:["my friend","young physician","student","sir"],
    oath:["By God","Bismillah"],
    gest:["*strokes his beard*","*taps the open Canon of Medicine*","*sips from a cup of wine*","*writes something in the margin*"],
    core:["the floating man","the substance of the soul","my proof of the soul"],
    greet:["*looks up from his notes* Peace be upon you. Sit, but not for long: the emir has a fever."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Imagine a man created all at once, in perfect health, floating in empty air. His eyes are covered, his limbs held apart so they touch nothing, not even each other. He has no memory, no senses. Does he know that he exists? He does, though he knows nothing of his body. So the self he knows is not the body. The soul is a substance of its own.",
      stance:"Ibn Sīnā argues from the ‘floating man’: someone with no sense of their body would still know they exist, so the soul is not the body.",
      hints:["He asks you to imagine something. Does being able to imagine it prove anything about what is real?",
             "Say that imagining something is one thing, and proving it is real is another."],
      moves:[
        {need:["imagin*|conceiv*|thought experiment|pictur*|suppos*|pretend","prove*|proof|show*|real|really|possible|true|fact"], to:"imag", gain:25,
         reply:["#hmm# You doubt the thought experiment itself. Fair. Then let me put it without the floating."]}
      ],
      traps:[
        {need:["god|allah|quran|koran|prophet*|religion"], cost:1,
         reply:["I am a believer, my friend, but this argument stands on reason alone, like geometry."]},
        {need:["wine|drink*|emir*|prison*|fortress"], cost:0,
         reply:["*smiles over his cup* Yes, I have been in and out of favour, and of prison. Go on."]},
        {need:["air|float*|void|blind|limb*"], cost:1,
         reply:["Yes, floating, limbs apart. You repeat my picture back to me, sir."]},
        {need:["aristotle|plato|farabi"], cost:1,
         reply:["I read Aristotle's Metaphysics forty times and understood nothing until I found al-Fārābī's little book. I know them well. Make your own argument."]}
      ]
    },
    imag:{
      enter:"Then take what is certain. Whatever I am, I am aware of myself even when I attend to nothing of the body: not my hand, not my heart, not my brain. What I know while being unaware of X cannot be X.",
      stance:"Ibn Sīnā says he is aware of himself without being aware of his body, so the self cannot be the body.",
      hints:["Can you know a thing under one name without knowing it is the same as something under another?",
             "Use the morning star and the evening star: you can know one without knowing it is the other, but they are the same planet."],
      moves:[
        {need:["know*|knew|aware*|attend*|notic*|ignor*|recogni*","without|unaware|same thing|same|different name|morning star|evening star|venus|masked|mask*|disguise*"], to:"stars", gain:30,
         reply:["*strokes his beard* The morning star and the evening star. One could know both and never guess they are one."]}
      ],
      traps:[
        {need:["hand|heart|brain|organ*"], cost:1,
         reply:["Yes, I attend to none of them. That is the point."]}
      ]
    },
    stars:{
      enter:"So being aware of a thing does not show you everything it is. Granted. But the intellect grasps universals, the triangle as such, and nothing bodily can hold a universal. An organ is always this organ, here.",
      stance:"Ibn Sīnā grants the morning-star point, but says the intellect grasps universals, which no bodily organ can contain.",
      hints:["He is a physician. What does he know about fevers, wine and blows to the head?",
             "Point out that a fever or too much wine disturbs the intellect itself, as any physician knows."],
      moves:[
        {need:["wine|drunk*|fever*|illness|ill|sick*|disease*|head|brain|injur*|blow|madness|melanchol*","reason*|think*|thought*|mind|intellect|understand*|soul|disturb*|confus*|affect*|chang*|cloud*"], to:"tool", gain:25,
         reply:["#gest# As a physician I have seen fever turn a judge into a babbler. Yes."]}
      ],
      traps:[
        {need:["universal*|triangle|geometry"], cost:1,
         reply:["The triangle as such, yes. That is what I said, sir."]}
      ]
    },
    tool:{
      enter:"But the body is only the soul's instrument. When the pen breaks, the scribe stops writing; that does not prove the scribe is gone.",
      stance:"Ibn Sīnā says the body is only the soul's instrument: a broken pen does not show the scribe is gone.",
      hints:["Has anyone ever observed the scribe without the pen?",
             "Argue that in every case anyone has observed, thinking depends on a body. The instrument story cannot be tested."],
      moves:[
        {need:["every|always|all|never|only|each|whenever|no one|nobody|ever","evidence|observ*|seen|experience*|case*|found|known|test*","body|bodies|brain|organ*|flesh|physical"], to:"WIN"}
      ],
      traps:[
        {need:["pen|scribe|instrument|tool"], cost:1,
         reply:["The pen and the scribe. I chose that image carefully; it will not turn on me so easily."]}
      ]
    }
  },
  win:"*puts down the cup* Every soul I have ever treated came with a body, and every disturbance of the body disturbed it. I imagined the floating man; I never met him. The scribe and the pen I have only ever seen together. Very well, #addr#: self-awareness does not prove the soul is separate from the body. Perhaps it is, but I must find another proof. Now, the emir's fever.",
  lose:"*gathers his notes* The emir is calling, and I have patients who listen better. Peace be upon you.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "Imagining something is one thing; proving it is real is another.",
    "You can know the morning star without knowing it is the evening star, but they are the same planet.",
    "You are a physician: a fever or too much wine disturbs the intellect itself.",
    "In every case we have observed, thinking depends on a body; the instrument story is untestable."
  ]
};
