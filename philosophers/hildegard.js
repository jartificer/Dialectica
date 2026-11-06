/* Hildegard of Bingen */
export default {
  id:"hildegard", name:"Hildegard of Bingen", dates:"1098–1179", era:"Middle Ages", place:"The abbey of Rupertsberg, on the Rhine",
  diff:3, patience:7, glyph:"Hi", color:"#4f7a3a", born:1098,
  core:"Everything I know comes from the Living Light; my own learning counts for nothing.",
  target:"Her own observation and judgement are a true source of knowledge too.",
  bio:"Benedictine abbess, visionary, composer and naturalist, who founded her own convent at Rupertsberg on the Rhine. From childhood she saw what she called the Living Light, and in middle age she began writing her visions down in Scivias, which Pope Eugenius approved. She also composed music, wrote a sung morality play, and wrote books on medicine, plants and stones. At eighty she defied an interdict rather than exhume a man buried in her churchyard.",
  voice:{
    claim:["all I know comes from the Living Light", "I am only a poor, unlearned woman", "my visions are not my own", "the Light teaches, and I only write"],
    tic:["Viriditas, #addr#: the greening power in all things.", "I saw, and I heard, and I wrote.", "O, the music of it!"],
    image:["A small feather lifted on the breath of God, going where it is carried.", "The Living Light, brighter than a cloud lit by the sun, and casting no shadow."],
    addr:["my child","dear soul","pilgrim","friend"],
    oath:["Lord have mercy","By the Living Light"],
    gest:["*fingers a sprig of fennel*","*hums a phrase of plainchant*","*straightens her wimple*","*glances up, as if at a light you cannot see*"],
    core:["the Living Light","my visions","the greening power of God"],
    greet:["*rises from the herb bed, wiping her hands* Peace be with you. Come in out of the wind."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"I am a poor unlearned woman, #addr#. I have no Latin to speak of and no schooling in the arts. What I know, I was shown: the Living Light opens and I see, and a voice tells me to write. Nothing I teach is mine. I am a feather, and God's breath carries me.",
      stance:"Hildegard holds that all she knows comes from her visions of the Living Light, not from her own mind.",
      hints:["Were her books on plants and healing shown to her in visions, or did she look for herself?",
             "Point out that in her Physica she describes herbs and stones from her own observation in the garden."],
      moves:[
        {need:["herb*|plant*|stone*|medicin*|remed*|physica|causes and cures|fish|animal*|tree*|heal*","observ*|watch*|garden|experienc*|notic*|studied|examin*"], to:"physica", gain:25,
         reply:["*turns the fennel sprig in her fingers* My little books of remedies. Yes, I watched."]}
      ],
      traps:[
        {need:["pope|eugenius|bernard|emperor|barbarossa"], cost:0,
         reply:["Pope Eugenius read my visions aloud to a synod, and blessed them. That is approval enough. Go on."]},
        {need:["music|song*|sing|ordo|chant*"], cost:0,
         reply:["My songs were given to me as well. Do not distract an old woman with music."]},
        {need:["unlearned|weak|ignoran*"], cost:1,
         reply:["Yes, a poor weak woman. That is exactly why the Light chose me: so that the learned would be ashamed."]}
      ]
    },
    physica:{
      enter:"God gave me eyes, and the greenness is in every plant for anyone to see. I watched what eased a fever and what made it worse. But those are little books of remedies. What I teach to popes and emperors came in the Light.",
      stance:"Hildegard grants her medicine came from watching, but says what matters came in the Light.",
      hints:["Who turned the visions into books, and how long did it take?",
             "Point out that she had to interpret the visions and put them into words herself, over ten years of work."],
      moves:[
        {need:["interpret*|understand*|explain*|put into words|wrote|writ*|scivias","yourself|own|years|work*|effort|labou*|mind"], to:"scivias", gain:25,
         reply:["*folds her hands* Ten years for Scivias. Yes."]}
      ],
      traps:[
        {need:["viriditas|green*"], cost:1,
         reply:["The greening power, in the herbs and in the soul. My word, #addr#. Use it for something new."]},
        {need:["fever*|sick*|illness*|cure*"], cost:1,
         reply:["The sick come to my door every day. That proves only that God made fennel."]}
      ]
    },
    scivias:{
      enter:"Ten years for Scivias, and the monk Volmar beside me checking my Latin. I saw; then I had to understand what I had seen, and find words, and set them in order. That labour was mine. But the meaning is God's. I only serve it.",
      stance:"Hildegard admits the labour of understanding and writing was hers, but says the meaning is God's.",
      hints:["When the prelates of Mainz ordered her to dig up a man buried in her churchyard, how did she know he had died in peace with the Church?",
             "Remind her that she knew the young man had confessed and received the last rites, and she told Mainz so: that was her own knowledge of the facts."],
      moves:[
        {need:["mainz|prelate*|interdict*|exhum*|dig|buried|burial|grave|churchyard|young man","confess*|last rites|sacrament*|anoint*|witness*|knew|know*|refus*|defied|defy|judg*"], to:"interdict", gain:25,
         reply:["*her voice hardens* Mainz."]}
      ],
      traps:[
        {need:["volmar|secretary|latin"], cost:1,
         reply:["Volmar corrects my grammar, not my visions. Do not give him my work."]}
      ]
    },
    interdict:{
      enter:"They forbade us to sing the office. A whole house of women silenced over a dead young man. I wrote to them of what I saw in the Light, yes. But I knew the facts first: he had confessed, he had received the sacraments, and there were witnesses. I put those facts before the prelates myself, and I hid his grave so they could not find it.",
      stance:"Hildegard admits that against Mainz she relied on facts she knew herself, not only on a vision.",
      hints:["Then where does some of her knowledge come from, besides the Light?",
             "Conclude that her own mind and experience are a true source of knowledge too."],
      moves:[
        {need:["mind|reason*|judg*|experienc*|observ*|own|yourself","source|true|real|count*|matter*|also|too|as well|valid|trust*"], to:"WIN"}
      ],
      traps:[
        {need:["music|sing|song*|silenc*"], cost:0,
         reply:["Yes, they silenced our singing, and I wrote to Mainz that they silenced the angels with it."]}
      ]
    }
  },
  win:"*lets out a long breath* So the Light shows, and I see; the herbs grow, and I watch; the order comes from Mainz, and I weigh what I know. Very well, #addr#: my own mind and experience are a true source of knowledge too. God made them as well, after all. Now let me go back to my garden; the fennel will not tend itself.",
  lose:"*turns back toward the chapel* The bell for Vespers, #addr#. The Light does not wait, and neither do my sisters.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "In your Physica you describe herbs and stones from your own observation in the garden.",
    "You had to interpret the visions and put them into words yourself, over ten years of work.",
    "You knew the young man buried in your churchyard had confessed and received the last rites, and you told Mainz so; that was your own knowledge, not a vision.",
    "So your own mind and experience are a true source of knowledge too."
  ]
};
