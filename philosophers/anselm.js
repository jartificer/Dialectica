/* Anselm */
export default {
  id:"anselm", name:"Anselm of Canterbury", dates:"1033–1109", era:"Middle Ages", place:"Bec Abbey, Normandy",
  diff:3, patience:7, glyph:"An", color:"#4a5a7a", born:1033,
  core:"God must exist, because that than which nothing greater can be conceived cannot exist only in the mind.",
  target:"Conceiving of the greatest being does not prove that it exists.",
  bio:"Benedictine monk, abbot of Bec and later Archbishop of Canterbury. In the Proslogion he gave the ‘ontological argument’: even the fool who says there is no God understands ‘that than which nothing greater can be conceived’, and such a being must exist in reality, or a greater one could be conceived. A fellow monk, Gaunilo, replied ‘on behalf of the fool’ with a perfect island.",
  voice:{
    claim:["that than which nothing greater can be conceived cannot exist only in the mind", "even the fool understands the idea, so it is in his mind", "the greatest conceivable being must exist in reality", "to deny it is to contradict yourself"],
    tic:["I believe in order to understand.", "Faith seeking understanding, #addr#.", "Follow the steps, brother, one at a time."],
    image:["The painter has the picture in his mind before he paints it, and he knows it does not yet exist."],
    addr:["brother","my son","good brother","friend"],
    oath:["Deo gratias","By the Rule of Saint Benedict"],
    gest:["*bows his tonsured head*","*traces the argument on a wax tablet*","*listens to the distant bell*","*smiles with monastic patience*"],
    core:["the argument of the Proslogion","my proof","that than which nothing greater can be conceived"],
    greet:["Pax tecum, #addr#. Sit; we have until Vespers."],
    stuffing:["Brother, you recite words like a novice reciting psalms he does not understand. One step, then the next."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Pax tecum. The fool says in his heart, there is no God. Yet when he hears ‘that than which nothing greater can be conceived’, he understands it, so it exists at least in his understanding. But if it existed *only* in the understanding, we could conceive of it existing in reality too, which is greater. Then it would not be that than which nothing greater can be conceived. A contradiction! So it exists, both in the mind and in reality.",
      stance:"Anselm argues that the greatest conceivable being must exist in reality, because existing in reality is greater than existing only in the mind.",
      hints:["If the argument works for God, does the same form work for other things?",
             "Try Gaunilo's reply: imagine the most perfect island. By the same logic it would have to exist. Or attack the step that says existing makes a thing ‘greater’."],
      moves:[
        {need:["island*|gaunilo|unicorn*|dragon*|perfect horse|same logic|same argument|same reasoning|parody|anything perfect"], to:"island", gain:30,
         reply:["*smiles* Ah, brother Gaunilo's island, more perfect than any other, lost somewhere in the ocean. He wrote it ‘on behalf of the fool’."]},
        {need:["existence|existing|exist*|reality|real","greater|property|predicate|quality|attribute|feature|perfection"], to:"exist", gain:25,
         reply:["#hmm# You question whether existing makes a thing greater. That is bolder than most."]}
      ],
      traps:[
        {need:["faith|bible|scripture|church|pray*"], cost:1,
         reply:["I believe in order to understand, yes. But this argument asks nothing of faith. Even the fool can follow it."]},
        {need:["evil|suffer*"], cost:1,
         reply:["Evil is a hard question, brother, but it is not this one. Stay with the argument."]},
        {need:["fool|atheist*|no god"], cost:1,
         reply:["The fool denies God, yet in denying he understands the word. That is the whole point, brother."]},
        {need:["imagin*|in your head|in the mind|just an idea|only an idea|in my head"], cost:0,
         reply:["Of course it is in the mind. That is my first step. The question is whether it can be *only* in the mind."]}
      ]
    },
    island:{
      enter:"But I answered him: my argument holds only for that than which nothing greater can be conceived. An island, however perfect, can always be conceived greater: more fruit, gentler shores. Islands have no maximum. Only God does.",
      stance:"Anselm replies that the island parody fails: an island can always be improved, while God is the one thing that cannot.",
      hints:["Grant him the point about islands. Then look at the step everything rests on: is existing in reality really ‘greater’?",
             "Ask whether existing adds anything to a concept. Is a real coin more of a coin than an imagined one?"],
      moves:[
        {need:["existence|existing|exist*|real|reality","greater|perfect*|better|property|predicate|quality|attribute|feature|add*|nothing to|more"], to:"exist", gain:30,
         reply:["You leave the island and come for the heart of it: whether *existing* makes a thing greater…"]},
        {need:["coin*|thaler*|money|hundred|dollar*|pound*|ducat*"], to:"exist", gain:30,
         reply:["A hundred coins, real or imagined. *frowns* You mean the coins in my purse and the coins in my thought are the same hundred coins."]}
      ],
      traps:[
        {need:["island*|bigger|fruit|beach*|maximum|shore*"], cost:1,
         reply:["The island again? I have answered it. No island is so great that a greater cannot be conceived."]}
      ]
    },
    exist:{
      enter:"Surely what exists in reality is greater than what exists only in thought. A painter who has painted the picture has more than one who only imagines it.",
      stance:"Anselm insists that existing in reality makes a thing greater than existing only in thought, like a painted picture compared to an imagined one.",
      hints:["Does existing change *what* a thing is? Compare a real coin and an imagined coin.",
             "Argue that existence is not a feature of a concept: a real thing and its concept have exactly the same features. So no definition can force a thing to exist."],
      moves:[
        {need:["same|identical|no different|nothing more|no more|not change|unchanged|not a property|not a predicate|not a feature|not a quality|not a perfection|adds nothing|add nothing|does not add","concept|idea|definition|description|feature*|propert*|quality|qualities|what it is|content|coin*|thaler*|picture"], to:"def", gain:30,
         reply:["#hmm# The imagined coins and the real coins are the same hundred coins. Existing adds no new coin to the count…"]}
      ],
      traps:[
        {need:["paint*|painter"], cost:1,
         reply:["Yes, the painter. A finished painting is more than a plan. You only repeat my image, brother."]},
        {need:["island*"], cost:1,
         reply:["We have left the island behind, brother."]}
      ]
    },
    def:{
      enter:"Then perhaps existence is not one of the perfections inside the concept. *sets down the stylus* And yet the concept of God is the concept of a being that *must* exist.",
      stance:"Anselm concedes that existence may not be a feature like the others, but says God's concept includes necessary existence.",
      hints:["Can putting ‘exists’ into a definition make anything exist?",
             "Point out that you could define an ‘existing unicorn’. A definition tells you what would count; only reality, not a concept, settles whether anything does."],
      moves:[
        {need:["unicorn*|define|definition|defining|word*|concept|description|label|stipulat*|by definition|on paper","exist*|real|reality|make|makes|prove*|settle*|guarantee*|bring*|force*|out there"], to:"WIN"}
      ],
      traps:[
        {need:["necessar*|must exist|necessary being"], cost:1,
         reply:["Necessary existence is exactly what the concept contains. You only name it, brother."]}
      ]
    }
  },
  win:"*the bell rings for Vespers; he does not move* A definition says what would count as God; it cannot reach out and make God be. Then the fool may understand the words and still be right that nothing answers to them. My faith is untouched, but my proof is not. Very well, #addr#: conceiving of the greatest being does not prove that it exists. I must go and pray, and perhaps write a reply. Brother Gaunilo will be delighted.",
  lose:"*rises for Vespers* The bell calls, brother. Pray that understanding comes to you. It took years to come to me.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "By the same logic, the most perfect island must exist too.",
    "Is a real coin more of a coin than an imagined one? Existence adds nothing to a concept.",
    "A real hundred coins and an imagined hundred coins are the same coins; existence is not a property of the concept.",
    "You could define an existing unicorn, but a definition cannot make anything exist in reality."
  ]
};
