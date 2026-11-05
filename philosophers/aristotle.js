/* Aristotle */
export default {
  id:"aristotle", name:"Aristotle", dates:"384–322 BCE", era:"Ancient Greece", place:"The Lyceum, Athens",
  diff:3, patience:8, glyph:"Α", color:"#8a6d2b", born:-384,
  core:"Nature does nothing in vain — everything in nature exists for a purpose.",
  target:"Nature can produce the appearance of design without any purpose.",
  bio:"Plato's student, Alexander the Great's tutor, and the founder of biology as a science. Aristotle explained things by four causes, the most important being the final cause — what a thing is for. In Physics II he discusses, and rejects, Empedocles' idea that useful forms simply survived by chance.",
  voice:{
    claim:["nature does nothing in vain", "everything in nature is for the sake of something", "the teeth are for tearing and the roots for feeding"],
    tic:["Let us walk while we talk.", "Look at the thing itself, #addr#.", "What is it for? Always ask that."],
    image:["One swallow does not make a spring.", "The acorn is for the oak."],
    addr:["my friend","visitor","student"],
    oath:["By Zeus","By the gods"],
    gest:["*paces along the colonnade*","*makes a note on a wax tablet*","*turns a seashell over in his hand*","*stops walking*"],
    core:["final causes","the purpose in nature","my teleology"]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"Welcome to the Lyceum — walk with me; I think better in motion. Nature does nothing in vain. Look: sharp teeth in front for tearing, broad molars behind for grinding. Roots grow downward for nourishment; leaves grow to shelter the fruit. Everything in nature is *for the sake of* something — its telos, its end. Do you doubt it?",
      stance:"Aristotle holds that natural things have final causes: they exist and develop for the sake of ends, which is why nature looks designed.",
      hints:["Aristotle thinks the usefulness of body parts can't be an accident. Suggest that it could be.",
             "Propose chance — or that the forms that didn't work simply died out, leaving only what happens to work."],
      moves:[
        {need:["surviv*|selection|select*|evolution|evolv*|darwin|fittest|fitness|perish*|died out|die out|dies out|empedocles|weed* out|filter*|extinct*"], to:"surv", gain:40,
         reply:["Ah — Empedocles' old story. Ox-headed creatures with human faces, limbs wandering about unattached, and whatever happened to be fitly put together survived, while the rest perished."]},
        {need:["chance|accident*|random*|luck*|coincid*|blind|by itself|spontane*"], to:"chance", gain:20,
         reply:["#hmm# Chance? Let me tell you why chance cannot do it."]},
        {need:["rain*|weather|crop*|storm"], to:"chance", gain:25,
         reply:["*nods* The old objection: Zeus does not send rain to make the corn grow. It falls of necessity, because vapour cools. And if the crop rots on the threshing floor, the rain didn't fall in order to spoil it. I grant you the rain. But why not the teeth too, you will say?"]}
      ],
      traps:[
        {need:["god|gods|designer|creator|intelligen*|design*|craftsman"], cost:1,
         reply:["A designer? I said no such thing. Nature has ends without deliberating, like a doctor who heals himself. The purpose is in nature, not in some craftsman above it."]},
        {need:["fall*|weight|stone|heavy|motion|physics"], cost:1,
         reply:["A stone falls because its natural place is below — another final cause. You only add to my evidence, #addr#."]},
        {need:["plato|forms"], cost:1, reply:["Dear Plato. I love him, but I love the truth more. The ends are in the things themselves. Now, to nature."]}
      ]
    },
    chance:{
      enter:"What comes about by chance is rare and irregular. But teeth, eyes and roots arise always, or for the most part, in the same way. What is regular cannot be by chance. Therefore it is for an end.",
      stance:"Aristotle argues that chance is rare and irregular, while useful body parts appear regularly, so they must exist for a purpose.",
      hints:["Chance could produce many forms. What happens to the ones that don't work?",
             "Argue that many variations arise, the ones that fail die off, and so the survivors look designed."],
      moves:[
        {need:["many|variat*|varie*|vary|differen*|countless|numerous|all kinds|random*|lots|several|multiple|mutat*|attempt*|tries","surviv*|perish*|die|died|dies|death|live|lived|remain*|kept|fail*|disappear*|vanish*|extinct*|weed*|filter*|lost|eliminat*"], to:"surv", gain:30,
         reply:["You mean Empedocles' tale: creatures thrown together any which way, and only those that happened to be fitly made survived, while the rest perished."]},
        {need:["surviv*|selection|evolution|evolv*|darwin|fittest|perish*|died out|die out|empedocles|extinct*"], to:"surv", gain:30,
         reply:["Ah, Empedocles again — the ones that happened to be fit survived, the rest perished."]}
      ],
      traps:[
        {need:["monster*|deform*|defect*|mistake*|error*|exception*|birth defect|mutant*"], cost:1,
         reply:["Monsters and deformities? These show nature *aiming* and missing, as a grammarian sometimes misspells. A miss implies a target, #addr#."]}
      ]
    },
    surv:{
      enter:"*sighs* But this only explains a single lucky generation. Each new animal would have to be assembled by chance all over again — yet offspring always resemble their parents. Where is the chance in that?",
      stance:"Aristotle says survival of lucky forms could explain one generation at most; he thinks the regularity of reproduction shows purpose.",
      hints:["What links one generation to the next?",
             "Argue that traits are inherited: survivors pass their useful features to their offspring."],
      moves:[
        {need:["inherit*|heredit*|parent*|offspring|child*|pass*|seed*|reproduc*|breed*|descend*|gene*|ancest*|copied|copy|copies|resembl*|lineage|progeny"], to:"inh", gain:25,
         reply:["#gest# So the survivors pass their fitness to their offspring, and the unfit take their unfitness to the grave… *frowns* But the eye, #addr#! So intricate! Could such a thing arise in one stroke of fortune?"]}
      ],
      traps:[
        {need:["chance|luck|random*|accident*"], cost:1, reply:["Chance again, every generation anew? Then calves would come out as ox-headed men half the time. They do not."]}
      ]
    },
    inh:{
      stance:"Aristotle accepts inheritance plus survival, but doubts something as complex as an eye could arise by one stroke of luck.",
      hints:["Does the eye have to appear all at once?",
             "Argue it builds up gradually: tiny differences, each kept by survival and inheritance, piling up over many generations and long ages."],
      moves:[
        {need:["gradual*|slow*|small|tiny|little by little|step*|accumul*|generations|long time|ages|million*|thousand*|over time|bit by bit|incremental*|partial|half|add up|adds up|builds up|build up|cumulat*|piece by piece"], to:"WIN"}
      ],
      traps:[
        {need:["chance|luck|random*|accident*|at once|suddenly"], cost:1, reply:["One stroke of chance producing an eye? I will not believe that, and neither should you."]}
      ]
    }
  },
  win:"*sits down on the steps of the Lyceum* Small differences, kept by survival, passed on by inheritance, piled up over ages… Then the regularity I took for purpose could be the sediment of a blind sieve. The teeth would not be *for* tearing; they would simply be what tearing teeth leave behind. I concede, #addr#: nature can produce the appearance of design without any purpose. *makes a note* I shall have to rewrite the Physics. Book Two, at least.",
  lose:"*resumes his walk without you* An unexamined objection is not worth hearing, #addr#. Come back with a sharper one.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "Perhaps the useful forms simply survived and the ones that did not work died out.",
    "The survivors pass their useful traits on to their offspring.",
    "The eye could build up gradually, through tiny changes over many generations."
  ]
};
