/* Margaret Cavendish */
export default {
  id:"cavendish", name:"Margaret Cavendish", dates:"1623–1673", era:"Early modern", place:"Welbeck Abbey, Nottinghamshire",
  diff:4, patience:7, glyph:"MC", color:"#8a3a4a", born:1623,
  core:"Microscopes and experiments deceive; only reason can know the inward motions of nature.",
  target:"Experiments and instruments can teach us truths that reason alone cannot.",
  bio:"Duchess of Newcastle, poet, playwright, novelist and natural philosopher, who published under her own name at a time when that was close to scandal. She held that all of nature is matter, and that all matter moves itself and perceives. Her Observations upon Experimental Philosophy attacked Robert Hooke's microscope and the new experimental science, and she printed alongside it The Blazing World, the story of a woman who becomes empress of another world. In 1667 she became the first woman to attend a meeting of the Royal Society.",
  voice:{
    claim:["glass deceives, reason sees", "nature's motions are inward, and only reason follows them", "experiments are mere boyish play", "the senses must answer to reason"],
    tic:["I confess I am ambitious, #addr#: I mean to be Margaret the First.", "Singularity is my fashion.", "I write as I please, and I please to write."],
    image:["A flea under glass, magnified into a monster the size of a dog.", "Nature is a great wise lady, and her motions are her own."],
    addr:["sir","madam","my dear","good friend"],
    oath:["Lord bless me","Upon my honour"],
    gest:["*flicks open an enormous fan*","*adjusts a hat of her own design*","*taps the spine of one of her many books*","*sweeps a satin train behind her*"],
    core:["the rule of reason over glass","my natural philosophy","the inward motions of nature"],
    greet:["*sweeps in* Ah, a visitor! Do sit. You will have heard that I am mad. I am merely original."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Microscopes! Your Royal Society spends its days looking at fleas through glass and calling it philosophy. The glass bends, magnifies, distorts. It shows only the outside of things, and a false outside at that. Nature's real work is in her inward motions, which only reason can follow. Experiments are boys blowing bubbles.",
      stance:"Cavendish holds that microscopes and experiments deceive, and only reason can know nature.",
      hints:["Does she trust her own naked eyes, or does reason have to check them too?",
             "Point out that the naked eye deceives too, and she relies on reason to correct it."],
      moves:[
        {need:["eye*|sight|senses|naked eye|vision","deceiv*|mistak*|err*|wrong|fool*|correct*|check*|judge*"], to:"eyes", gain:25,
         reply:["*lowers her fan* The naked eye. Of course it deceives."]}
      ],
      traps:[
        {need:["royal society|boyle|hooke|society"], cost:0,
         reply:["I visited them in sixteen sixty-seven, the first woman they let in, and they talked of nothing else for weeks. Go on."]},
        {need:["flea*|louse|lice"], cost:1,
         reply:["Mr Hooke's great flea, as big as a dog. Exactly my point: a monster made by glass."]},
        {need:["blazing world|empress|romance|fancy"], cost:0,
         reply:["My Blazing World is a fancy, a romance. This is philosophy, #addr#."]}
      ]
    },
    eyes:{
      enter:"A stick bends in water, a tower looks round from far off. Reason must judge what the senses report; that is why I trust reason above all. But you would give the eye a glass and make the deception larger.",
      stance:"Cavendish grants that reason must correct the senses, but thinks lenses only enlarge the deception.",
      hints:["If reason corrects the eye, why could it not correct the glass in the same way?",
             "Argue that reason can judge what the microscope shows, just as it judges the eye."],
      moves:[
        {need:["reason*|judg*|rational*","lens*|glass*|microscop*|instrument*|telescop*"], to:"lens", gain:25,
         reply:["*taps her fan against her chin* Let reason judge the glass. Hm."]}
      ],
      traps:[
        {need:["stick|water|bend*|tower"], cost:1,
         reply:["The bent stick: my own example, #addr#."]}
      ]
    },
    lens:{
      enter:"But how would reason know which picture to trust, when the glass shows a flea as a monster one day and a blur the next, depending on the light and the grinding?",
      stance:"Cavendish asks how reason could know which picture to trust when every glass shows something different.",
      hints:["What happens when many lenses and many observers show the same thing?",
             "Point out that when different lenses and many observers agree, the agreement corrects the error."],
      moves:[
        {need:["agree*|same thing|consisten*|repeat*|confirm*|compar*","observer*|lenses|glasses|others|everyone|many|different"], to:"agree", gain:25,
         reply:["*a reluctant smile* Many glasses, many eyes."]}
      ],
      traps:[
        {need:["light|grind*|blur*"], cost:1,
         reply:["Light and grinding, yes. Every glass is different. That is the problem, #addr#."]},
        {need:["self moving|thinking matter|perceiv*|inward"], cost:1,
         reply:["All matter moves itself and perceives. My doctrine; you need not recite it to me."]}
      ]
    },
    agree:{
      enter:"Many glasses and many eyes, compared and checked, so that reason has more to work with and not less. That is not so different from what I do when I compare the reports of all my senses. I have called them boys blowing bubbles… perhaps some of the bubbles catch the light.",
      stance:"Cavendish admits that compared observations give reason more to work with.",
      hints:["Then what can instruments do that reason sitting alone cannot?",
             "Name a discovery a lens made that no reasoning could have foretold, like Hooke's cells in cork, and conclude that instruments can teach truths reason alone cannot."],
      moves:[
        {need:["experiment*|instrument*|microscop*|lens*|glass*|observ*","teach|learn*|discover*|show*|reveal*|truth*|knowledge"], to:"WIN"}
      ],
      traps:[
        {need:["bubble*|boys|boyish"], cost:1,
         reply:["The bubbles. I said that. I am now quite sorry I said it."]}
      ]
    }
  },
  win:"*snaps her fan shut* Well. I shall have to write another book to take back part of the last one, and I have written a great many books. Very well, #addr#: experiments and instruments can teach us truths that reason alone would never find. But reason sits at the head of the table. And I shall still say the flea was exaggerated.",
  lose:"*rises in a rustle of a gown of her own design* I have a play to finish and the Duke is waiting for his dinner, #addr#. Write to me.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "Your naked eye deceives you too, and you rely on reason to correct it.",
    "Then reason can judge what the microscope shows, just as it judges the eye.",
    "When different lenses and many observers agree, the agreement corrects the error.",
    "Hooke's microscope found cells in cork that no reasoning could have foretold, so experiments and instruments can teach us truths that reason alone cannot."
  ]
};
