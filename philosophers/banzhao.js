/* Ban Zhao */
export default {
  id:"banzhao", name:"Ban Zhao", dates:"c. 45–117 CE", era:"Classical antiquity", place:"The imperial library, Luoyang",
  diff:3, patience:8, glyph:"班", color:"#7a4a2a", born:45,
  core:"A woman's virtue is humility and yielding; distinction in the outer world is not hers to seek.",
  target:"A woman's learning should be valued as highly as a man's.",
  bio:"Historian, poet and teacher at the Han court, the first woman historian known in China. When her brother Ban Gu died with the Book of Han unfinished, the emperor asked her to complete it, and she taught the empress and the palace ladies astronomy, mathematics and the classics. Her Lessons for Women tells girls to be humble and yielding, yet also argues that they should be taught to read just as boys are. Empress Deng, ruling as regent, sought her advice on affairs of state.",
  voice:{
    claim:["a woman's first virtue is humility", "a wife yields and does not boast", "distinction belongs to the outer world, virtue to the inner", "quiet diligence is a woman's honour"],
    tic:["Let a woman put others first and herself last, #addr#.", "Humility is the root of every virtue.", "I am only a foolish old woman, of course."],
    image:["A tile laid under the bed, so that a baby girl learns humility from her first day.", "The willow bends in the wind, and is never broken."],
    addr:["honoured guest","young scholar","my child","friend"],
    oath:["Heaven forbid","By my ancestors"],
    gest:["*folds her hands inside her sleeves*","*lays down her brush*","*bows her head slightly*","*straightens a bamboo scroll*"],
    core:["the way of humility","my Lessons for Women","the virtue of yielding"],
    greet:["*bows* You honour this old woman with a visit. Sit. The tea is poor, but the books are good."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"A woman's first virtue is humility. She yields, she puts others first, she works hard and quietly and does not boast of it. I wrote my Lessons for Women so that the girls of my family would not disgrace it when they married. Distinction belongs to the outer world; a woman's virtue belongs to the inner.",
      stance:"Ban Zhao holds that a woman's virtue is humility and yielding, not distinction in the outer world.",
      hints:["What does she herself do at the imperial court?",
             "Point out that she is a famous historian who finished the Book of Han herself."],
      moves:[
        {need:["histor*|book of han|han shu|hanshu|annals|chronicle*","finish*|complet*|wrote|write*|you|your"], to:"court", gain:25,
         reply:["*folds her hands* My brother's history. I only finished what he began."]},
        {need:["empress|palace|court|emperor","tutor*|teach*|instruct*|lectur*|taught"], to:"court", gain:25,
         reply:["*a small bow* I teach the empress, yes. At her command."]}
      ],
      traps:[
        {need:["confucius|analects|master kong"], cost:0,
         reply:["Master Kong's teaching is the ground I stand on. You will not shake me with it."]},
        {need:["husband|marri*|wife"], cost:1,
         reply:["A wife serves her husband's family with respect. I said so plainly, #addr#."]},
        {need:["proud|pride|boast*|ambiti*"], cost:1,
         reply:["Pride is exactly what I warn girls against. You agree with me."]}
      ]
    },
    court:{
      enter:"The emperor commanded me to finish my brother Ban Gu's history, and the empress asked me to teach her ladies. I obeyed. That is not ambition, it is duty: the same humility I teach, only in a different room.",
      stance:"Ban Zhao says her scholarship at court is duty and obedience, not ambition.",
      hints:["What does her own book say about how girls should be taught?",
             "Remind her that in Lessons for Women she says girls should be taught to read just as boys are."],
      moves:[
        {need:["girl*|daughter*|women|woman|female*","read*|educat*|taught|teach*|school*|learn*|study|studies"], to:"reading", gain:25,
         reply:["*a small smile* You have read it closely."]}
      ],
      traps:[
        {need:["brother|ban gu|ban chao|father"], cost:0,
         reply:["My brother Ban Gu died in prison, and the work remained. Someone had to finish it. Go on."]},
        {need:["power|powerful|fame|famous"], cost:1,
         reply:["Fame is not something I sought. It came with the work, like dust on a scroll."]}
      ]
    },
    reading:{
      enter:"Boys are given their books at eight, and girls are not, and I said that is wrong. But girls should read so that they understand the rites and serve their husbands' families well. Learning is the servant of virtue.",
      stance:"Ban Zhao grants girls should be taught to read, but only so they can serve their families better.",
      hints:["Did her own learning only make her a better servant? Who did the empress turn to when she ruled?",
             "Point out that when Empress Deng ruled as regent she asked Ban Zhao for advice on affairs of state."],
      moves:[
        {need:["deng|regent|state|government|govern*|affairs|politic*","advice|advis*|counsel*|consult*|judg*|wisdom|wise"], to:"counsel", gain:25,
         reply:["*sets down her brush* The empress Deng. #hmm#"]}
      ],
      traps:[
        {need:["rite*|ritual*|propriety"], cost:1,
         reply:["The rites, yes. A girl who cannot read them cannot keep them."]},
        {need:["servant*|serve|obey*|obedien*"], cost:1,
         reply:["Serving well is no small thing, #addr#. You have not shaken me yet."]}
      ]
    },
    counsel:{
      enter:"When the empress Deng governed for the young emperor she asked my opinion on matters of state, and when her brother wished to resign his post she followed my advice. I did not think of it as learning raised above duty… but it was not a wife's obedience she wanted from me. It was judgement.",
      stance:"Ban Zhao admits her learning gave the empress judgement on matters of state, not mere obedience.",
      hints:["If learning gives a woman judgement, what follows about how it should be valued?",
             "Conclude that a woman's learning should be valued just as highly as a man's."],
      moves:[
        {need:["equal*|as highly|as much|same|as well as|just as|alike|no less","learn*|educat*|scholar*|study|studies|knowledge|book*|mind*"], to:"WIN"}
      ],
      traps:[
        {need:["humble|humility|modest*"], cost:1,
         reply:["Humility I keep, #addr#, whatever you prove."]}
      ]
    }
  },
  win:"*laughs softly behind her sleeve* My brother's history, the empress's counsel, and my own book saying girls must read. I have been arguing your side for forty years and calling it humility. Very well, #addr#: a woman's learning is worth as much as a man's. I will still teach my daughters good manners.",
  lose:"*bows, exactly as deeply as courtesy requires* The library closes at dusk, #addr#, and I have annals to finish.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "You are a great historian; you finished the Book of Han yourself.",
    "In your Lessons for Women you say girls should be taught to read just as boys are.",
    "When Empress Deng was regent she asked for your advice on affairs of state.",
    "Then a woman's learning should be valued just as highly as a man's."
  ]
};
