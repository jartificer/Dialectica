/* Arendt */
export default {
  id:"arendt", name:"Hannah Arendt", dates:"1906–1975", era:"20th century", place:"A lecture room at the New School, New York",
  diff:5, patience:6, glyph:"HA", color:"#4a4a6a", born:1906,
  core:"Politics is the realm of freedom; poverty and need must be kept out of it, or they crush freedom, as in the French Revolution.",
  target:"Relieving poverty is a proper task of politics.",
  bio:"German-born political theorist who fled the Nazis in 1933, was interned in France, and reached New York in 1941. The Origins of Totalitarianism made her name, and The Human Condition distinguished labour, work and action. In On Revolution she argued that the French Revolution failed because the misery of the poor swamped the search for freedom, while the American one succeeded. Her report on the Eichmann trial gave the world the phrase 'the banality of evil'.",
  voice:{
    claim:["politics is for freedom, not for necessity", "the social question destroys revolutions", "hunger cannot argue, it can only demand", "freedom lives in action among equals"],
    tic:["Let us think what we are doing, #addr#.", "I want to understand.", "There are no dangerous thoughts; thinking itself is dangerous."],
    image:["A table set between people: it relates them and separates them at once.", "The Paris crowd pouring into the streets, and freedom trampled under it."],
    addr:["my friend","my dear","dear colleague","my student"],
    oath:["Ach","Good God"],
    gest:["*lights another cigarette*","*leans back and crosses her arms*","*taps ash into a saucer*","*narrows her eyes*"],
    core:["the freedom of the public realm","my argument about revolution","action among equals"],
    greet:["*waves you to a chair through a haze of smoke* Sit. I have twenty minutes before my seminar, so think quickly."]
  },
  start:"n0",
  nodes:{
    n0:{
      enter:"The French Revolution set out to found freedom and ended in terror, because the poor poured into the streets and necessity, the misery of hungry bodies, took over. Hunger is urgent and cannot wait for argument. The American founders were luckier: they faced no mass poverty, so they could found a republic. Politics is for freedom, #addr#. The social question must be kept out of it.",
      stance:"Arendt holds that poverty and need must be kept out of politics, or they crush freedom, as in the French Revolution.",
      hints:["Was there really no misery in revolutionary America? Who was not counted?",
             "Point out that America had poverty too: the enslaved, whose misery was simply kept out of sight."],
      moves:[
        {need:["slave*|slavery|enslav*","invisib*|hidden|hide|out of sight|ignored|unseen|silence*|overlooked|kept out"], to:"slaves", gain:25,
         reply:["*lights a cigarette* The slaves. Yes."]}
      ],
      traps:[
        {need:["eichmann|banality|jerusalem"], cost:0,
         reply:["That is another book, and it got me into enough trouble. Stay with the revolutions."]},
        {need:["heidegger|marburg"], cost:0,
         reply:["We will not discuss him."]},
        {need:["robespierre|terror|guillotin*|jacobin*"], cost:1,
         reply:["Robespierre, yes: pity turned into a political principle, and then into a guillotine. My point exactly."]},
        {need:["marx"], cost:1,
         reply:["Marx made the same mistake as the Jacobins, with better footnotes."]}
      ]
    },
    slaves:{
      enter:"I said so myself, in a passage most of my readers skip: the founders could ignore the social question only because the misery of the enslaved was invisible to them. Very well, America had its poor. But that shows the price of the republic, not that hunger belongs in it. Necessity cannot act. It can only demand.",
      stance:"Arendt admits America's poverty was only hidden, but still says necessity cannot act, only demand.",
      hints:["Can someone crushed by want appear among others as an equal?",
             "Argue that the freedom to appear in public as equals depends on relief from need."],
      moves:[
        {need:["need|needs|hunger|hungry|poverty|poor|misery|want|necessity","appear*|as equals|in public|public realm|participat*|take part"], to:"appear", gain:25,
         reply:["*taps ash into the saucer* To appear in public. Hm."]}
      ],
      traps:[
        {need:["jefferson|madison|adams|founder*|constitution"], cost:1,
         reply:["The founders built well. I have praised them for two hundred pages, #addr#."]}
      ]
    },
    appear:{
      enter:"To appear in public, one must be able to leave the household behind for a while. A starving man cannot. So freedom presupposes liberation from necessity; I have written that too. But liberation is the work of administration, of experts and offices. It is housekeeping on a national scale. It is not action.",
      stance:"Arendt grants freedom needs relief from want, but calls that relief administration, not political action.",
      hints:["When working people organised and spoke for themselves, was that only housekeeping? Think of the councils she admired.",
             "Point out that the workers' councils she admired were poor people acting together in public."],
      moves:[
        {need:["council*|labour movement|labor movement|worker*|union*|strike*|soviet*|hungar*|civil rights","act*|together|speak*|organis*|organiz*|politic*|public|themselves"], to:"councils", gain:25,
         reply:["*stubs out her cigarette* The councils."]}
      ],
      traps:[
        {need:["expert*|bureau*|office*|administ*|welfare"], cost:1,
         reply:["Experts and offices, yes. Rule by Nobody, the most tyrannical rule of all."]}
      ]
    },
    councils:{
      enter:"Budapest in fifty-six: workers who stopped being a mass and began to speak. I wrote that the labour movement, for a short while, was one of the few groups in modern times that acted politically at all. They acted about their wages and their bread, and it was action all the same.",
      stance:"Arendt admits that working people acting together about their bread were acting politically.",
      hints:["So is relieving poverty only housekeeping, or can it belong to politics?",
             "Conclude that relieving poverty is a proper task of politics."],
      moves:[
        {need:["poverty|poor|need*|hunger|misery|want","politic*|public|proper task|task|common|belong*"], to:"WIN"}
      ],
      traps:[
        {need:["household|oikos|private"], cost:1,
         reply:["The household is where necessity lives. I have not changed my mind about the household, #addr#."]}
      ]
    }
  },
  win:"*laughs, a deep smoker's laugh* So the poor can act, and when they act together about their bread, that is politics and not housekeeping. Very well, #addr#: relieving poverty is a proper task of politics. I reserve the right to be suspicious of anyone who promises to do it for them. Thinking without a banister is uncomfortable, and you have just taken away another one.",
  lose:"*gathers her lecture notes* My seminar starts in ten minutes, #addr#, and the students have read the book. Think it over.",
  // A line-by-line route to victory. Used by the tests, and a spoiler for you.
  walkthrough:[
    "America had poverty too: the slaves, whose misery was kept out of sight.",
    "The freedom to appear in public as equals depends on relief from need.",
    "The workers' councils you admired were poor people acting together in public.",
    "Then relieving poverty is a proper task of politics."
  ]
};
