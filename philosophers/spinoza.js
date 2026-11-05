/* Spinoza */
export default {
  id:"spinoza", name:"Baruch Spinoza", dates:"1632–1677", era:"Early modern", place:"A rented room in The Hague",
  diff:4, patience:7, glyph:"Sp", color:"#4a6a6a", born:1632,
  core:"There is one substance, God or Nature, and everything follows from it with necessity. Free will is an illusion.",
  target:"Human beings can be free.",
  bio:"Born into the Portuguese-Jewish community of Amsterdam and expelled from it at twenty-three with a curse of rare severity. He earned his living grinding lenses, turned down a professorship to keep his freedom to think, and wrote the Ethics in the style of geometry: one substance, ‘God or Nature’, everything determined, and a final part on how understanding frees us from bondage to the passions.",
  voice:{
    claim:["everything follows from God or Nature with necessity", "free will is an illusion", "men think themselves free because they are aware of their desires but ignorant of their causes", "there is nothing contingent in nature"],
    tic:["Not to laugh, not to lament, not to curse, but to understand.", "All things excellent are as difficult as they are rare, #addr#.", "Deus sive Natura."],
    image:["A stone set in motion, if it could think, would believe it moves by its own free will.", "The drunk thinks he speaks freely; when sober he wishes he had kept quiet."],
    addr:["friend","dear sir","my friend","Oldenburg"],
    oath:["Caute","Truly"],
    gest:["*polishes a lens on his sleeve*","*coughs into a handkerchief*","*draws a small geometric diagram*","*watches a spider in the corner of the room*"],
    core:["the one substance","the order of nature","my Ethics"],
    greet:["*sets down a lens* Welcome. Excuse the glass dust. Sit."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"There is only one substance, God or Nature, and everything follows from its nature as the properties of a triangle follow from the triangle. A stone, thrown, if it could think, would believe it flies by its own free will. So do we: aware of our desires, ignorant of their causes. Free will is that ignorance.",
      stance:"Spinoza says everything follows necessarily from God or Nature; free will is only ignorance of the causes of our desires.",
      hints:["If everything is fixed, why did he bother writing a book telling people how to live?",
             "Ask: if everything is fixed, why did he bother to write an Ethics full of advice?"],
      moves:[
        {need:["advice|advise*|recommend*|persuad*|teach*|write|wrote|book|ethics","if|why|then|change|choose|help|bother|point"], to:"advice", gain:25,
         reply:["*smiles and sets down the lens* Why write, if nothing can be otherwise. The question my friends ask most."]}
      ],
      traps:[
        {need:["stone|thrown|drunk|baby|infant"], cost:1,
         reply:["The stone and the drunk: my images, friend. You hand them back to me."]},
        {need:["god|substance|deus sive natura|pantheis*"], cost:1,
         reply:["God or Nature, yes. Call it what you like. That is my starting point, not your objection."]},
        {need:["jew*|excommunicat*|cherem|herem|synagogue|curse*|amsterdam"], cost:0,
         reply:["They cursed me lying down and rising up. It did not keep me from my lenses. Go on."]},
        {need:["miracle*|prayer|bible|scripture"], cost:1,
         reply:["A miracle would be a break in nature's laws, which are God's own nature. There are none. Another treatise, friend."]}
      ]
    },
    advice:{
      enter:"Because my book is itself a cause. Words enter the mind and determine it, as a blow moves a stone. Advice does not presuppose free will; it presupposes only that minds can be moved.",
      stance:"Spinoza says his book is just another cause: advice works on minds the way a blow works on a stone.",
      hints:["What does his own book promise its readers in its last parts?",
             "Point out that his book promises that reason can free us from bondage to the passions."],
      moves:[
        {need:["passion*|emotion*|affect*|bondage|slave*|fear|anger|hate|desire*","free*|liberat*|release*|escape|master*|overcome|reason|understand*"], to:"passions", gain:25,
         reply:["#gest# Of human bondage, and of human freedom. Yes, those are my titles."]}
      ],
      traps:[
        {need:["cause*|caus*|determin*|blow"], cost:1,
         reply:["Yes, causes. Everything is caused. Thank you for agreeing, friend."]}
      ]
    },
    passions:{
      enter:"An emotion which is a passion ceases to be a passion as soon as we form a clear and distinct idea of it. Understanding frees us from bondage. But do not call that free will. It is simply understanding necessity.",
      stance:"Spinoza grants that understanding frees us from bondage to the passions, but says this is not free will, only understanding necessity.",
      hints:["What does he call the last part of the Ethics, and whom does he describe there?",
             "Point out that he calls the last part of his book Of Human Freedom and describes ‘the free man’."],
      moves:[
        {need:["free man|free person|free people|freedom|free|human freedom|part five|part 5","exist*|real|possible|some|you call|you describe|describ*|you wrote|you said|title|called"], to:"freeman", gain:25,
         reply:["*coughs* ‘The free man thinks of nothing less than of death.’ Yes. I describe him."]}
      ],
      traps:[
        {need:["clear idea|clear and distinct|adequate"], cost:1,
         reply:["Clear and distinct ideas, adequate ideas: these are my terms, friend."]}
      ]
    },
    freeman:{
      enter:"That thing is free which exists from the necessity of its own nature alone and is determined to act by itself alone. Strictly, only God. But a person guided by reason acts more and more from their own nature, and less from outside causes…",
      stance:"Spinoza defines freedom as acting from your own nature; strictly only God has it, but a person guided by reason approaches it.",
      hints:["If acting from your own nature is freedom, and reason lets a person do that, is freedom an illusion?",
             "Conclude that freedom is real and compatible with necessity: a person guided by reason is truly free."],
      moves:[
        {need:["compatib*|both|alongside|within|own nature|real|genuine*|true|truly|really|actual*","free|freedom|liberty|freely"], to:"WIN"}
      ],
      traps:[
        {need:["god|only god"], cost:1,
         reply:["Strictly, only God. I said so. But I did not stop there, did I?"]}
      ]
    }
  },
  win:"*holds a finished lens up to the window* Free will is an illusion: that I keep. But freedom is not. To act from one's own nature, understanding the causes, is to be free, and a human being can do it, more or less, as all excellent things are done. Very well, #addr#: human beings can be free. Not free of necessity, but free within it. That was always the point of the book. I had only forgotten to say so plainly.",
  lose:"*returns to his lenses* Not to laugh, not to lament, but to understand. I understand that we are finished. Good day, friend.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "If everything is fixed, why did you bother to write an Ethics full of advice?",
    "But your book promises that reason can free us from bondage to the passions.",
    "You even call the last part of your book Of Human Freedom and describe the free man.",
    "Then freedom is real and compatible with necessity: a person guided by reason is truly free."
  ]
};
