/* =====================================================================
   UI
   Everything that touches the DOM: the timeline, the dialogue view, the
   meters and the end-of-conversation panel.
   ===================================================================== */
import { Conversation, DIFFICULTY, hintCost } from "./engine.js";
import * as store from "./storage.js";

const $ = id => document.getElementById(id);
export const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fmt = s => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>");
const stars = n => "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
const fast = () => !!window.DIALECTICA_FAST || /[?&]fast\b/.test(location.search);

let PHILOSOPHERS = [];
let C = null;       // the current Conversation
let busy = false;
let admin = false;  // admin mode: everything open, debug tools, wins not saved

export function initUI(philosophers) {
  PHILOSOPHERS = philosophers;
  $("composer").addEventListener("submit", e => { e.preventDefault(); submit(); });
  $("input").addEventListener("keydown", e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } });
  $("hintBtn").onclick = () => { if (C && !C.over && !busy) show(C.hint()); };
  $("restartBtn").onclick = () => { if (C && !busy) startTalk(C.ph.id); };
  $("mapBtn").onclick = () => showView("map");
  $("moreBtn").onclick = () => {
    const s = $("side"); s.classList.toggle("expanded");
    $("moreBtn").textContent = s.classList.contains("expanded") ? "Hide details ▴" : "More details ▾";
  };
  $("resetAll").onclick = () => { store.resetProgress(); renderMap(); };
  admin = store.loadAdmin() || /[?&]admin\b/.test(location.search);
  if (admin) store.saveAdmin(true);
  $("adminToggle").onclick = () => { admin = !admin; store.saveAdmin(admin); applyAdmin(); renderMap(); };
  $("jumpBtn").onclick = () => { if (C && admin && !busy) show(C.jumpTo($("nodeSelect").value)); };
  $("refillBtn").onclick = () => { if (C && admin && !busy) show(C.refill()); };
  $("walkBtn").onclick = () => {
    if (!C || !admin) return;
    const w = C.ph.walkthrough || [];
    if (!w.length) return;
    C.walkIdx = ((C.walkIdx ?? -1) + 1) % w.length;
    $("input").value = w[C.walkIdx]; $("input").focus();
  };
  applyAdmin();
  $("themeBtn").onclick = () => {
    const root = document.documentElement;
    const cur = root.getAttribute("data-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const nxt = cur === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nxt);
    store.saveTheme(nxt);
  };
  $("count").textContent = PHILOSOPHERS.length;
  showView("map");
}

function applyAdmin() {
  $("adminBadge").hidden = !admin;
  $("adminNote").hidden = !admin;
  $("adminBox").hidden = !admin || !C;
  $("adminToggle").textContent = "Admin mode: " + (admin ? "on" : "off");
  $("adminToggle").setAttribute("aria-pressed", String(admin));
}

/* A thinker is open if it is first, if the previous one is convinced,
   or if it (or anyone later) was already convinced — so new thinkers
   added between old ones never lock a returning player out. */
function isUnlocked(i) {
  const p = store.progress();
  if (admin || p.unlocked || i === 0) return true;
  if (store.isDone(PHILOSOPHERS[i - 1].id)) return true;
  return PHILOSOPHERS.slice(i).some(ph => store.isDone(ph.id));
}

function renderMap() {
  const tl = $("timeline"); tl.innerHTML = "";
  let era = "";
  PHILOSOPHERS.forEach((ph, i) => {
    if (ph.era !== era) { era = ph.era; const e = document.createElement("div"); e.className = "era"; e.textContent = era; tl.appendChild(e); }
    const best = store.bestTurns(ph.id), done = best !== null, open = isUnlocked(i);
    const b = document.createElement("button");
    b.className = "card " + (done ? "done" : open ? "open" : "locked");
    b.disabled = !open;
    b.dataset.id = ph.id;
    b.setAttribute("aria-label", ph.name + (done ? " (convinced)" : open ? "" : " (locked)"));
    b.innerHTML =
      '<div class="portrait" style="background:' + ph.color + '">' + esc(ph.glyph) + "</div>" +
      "<div><h3>" + esc(ph.name) + '</h3><div class="meta">' + esc(ph.dates) + " · " + esc(ph.place) + "</div>" +
      '<div class="claims">' + (open ? "“" + esc(ph.core) + "”<br><i>Convince them: " + esc(ph.target) + "</i>" : "<i>Convince " + esc(PHILOSOPHERS[i - 1].name) + " to unlock.</i>") + "</div></div>" +
      '<div class="status"><span class="stars" title="Difficulty">' + stars(ph.diff) + "</span>" + DIFFICULTY[ph.diff] +
      (done ? '<br><span class="ok">✓ Convinced</span><br>best: ' + best + " exchanges" : "") + "</div>";
    if (open) b.onclick = () => startTalk(ph.id);
    tl.appendChild(b);
  });
  if (PHILOSOPHERS.length && PHILOSOPHERS.every(p => store.isDone(p.id))) {
    const d = document.createElement("div"); d.className = "box"; d.style.marginTop = "18px";
    d.innerHTML = "<h4>Finale</h4><p>You have argued your way across twenty-five centuries and talked every one of them out of their most cherished conviction. Socrates would be proud, and then he would ask you what you think you know.</p>";
    tl.appendChild(d);
  }
}

function showView(v) {
  $("mapView").classList.toggle("hidden", v !== "map");
  $("talkView").classList.toggle("hidden", v !== "talk");
  $("mapBtn").hidden = v !== "talk";
  if (v === "map") { renderMap(); window.scrollTo(0, 0); }
}

export function startTalk(id) {
  const ph = PHILOSOPHERS.find(p => p.id === id);
  if (!ph) return;
  C = new Conversation(ph);
  showView("talk");
  $("pPortrait").textContent = ph.glyph; $("pPortrait").style.background = ph.color;
  $("pName").textContent = ph.name;
  $("pMeta").textContent = ph.dates + " · " + stars(ph.diff) + " " + DIFFICULTY[ph.diff];
  $("pCore").textContent = "“" + ph.core + "”";
  $("pTarget").textContent = ph.target;
  $("pBio").textContent = ph.bio;
  $("hintBtn").textContent = hintCost(ph) ? "Hint (−1 patience)" : "Hint (free)";
  $("nodeSelect").innerHTML = Object.keys(ph.nodes).map(id => '<option value="' + esc(id) + '">' + esc(id) + "</option>").join("");
  $("debugTxt").textContent = "Send a message to see how it was parsed.";
  applyAdmin();
  $("log").innerHTML = "";
  $("endPanel").classList.add("hidden"); $("composer").classList.remove("hidden");
  show(C.opening());
}

function addMsg(m) {
  const d = document.createElement("div");
  if (m.who === "hint") {
    d.className = "msg hint";
    d.innerHTML = "<b>" + esc(m.label) + ":</b> " + esc(m.text) + (m.cost ? " <span style='opacity:.7'>(−" + m.cost + " patience)</span>" : "");
  } else {
    d.className = "msg " + m.who + (m.cls ? " " + m.cls : "");
    d.innerHTML = m.who === "you" ? esc(m.text) : fmt(m.text);
  }
  $("log").appendChild(d);
  $("log").scrollTop = $("log").scrollHeight;
}

/* Play lines one by one, with a "thinking" pause before the philosopher speaks. */
function show(lines) {
  busy = true; $("sendBtn").disabled = true;
  const conv = C;
  let i = 0;
  const step = () => {
    if (conv !== C) return; // the player restarted mid-reply
    if (i >= lines.length) {
      busy = false; $("sendBtn").disabled = false; updateSide();
      if (C.result) end(C.result); else $("input").focus();
      return;
    }
    const m = lines[i++];
    if (m.who !== "them") { addMsg(m); step(); return; }
    const t = document.createElement("div"); t.className = "typing";
    t.innerHTML = esc(C.ph.name.split(" ")[0]) + " is thinking<span>.</span><span>.</span><span>.</span>";
    $("log").appendChild(t); $("log").scrollTop = $("log").scrollHeight;
    const delay = fast() ? 0 : Math.min(1500, 350 + m.text.length * 4);
    setTimeout(() => { t.remove(); if (conv === C) { addMsg(m); step(); } }, delay);
  };
  updateSide();
  step();
}

function updateSide() {
  if (!C) return;
  const ph = C.ph;
  $("convBar").style.width = C.conv + "%";
  $("convTxt").textContent = C.conv + "% convinced";
  $("turnTxt").textContent = C.turns + " exchange" + (C.turns === 1 ? "" : "s");
  const pips = $("pips"); pips.innerHTML = "";
  for (let i = 0; i < ph.patience; i++) { const s = document.createElement("span"); if (i >= C.pat) s.className = "gone"; pips.appendChild(s); }
  pips.classList.toggle("low", C.pat <= 2);
  pips.setAttribute("aria-label", "Patience " + Math.max(0, C.pat) + " of " + ph.patience);
  $("pStance").textContent = C.stance;
  $("pMood").textContent = C.mood;
  if (admin) {
    $("nodeSelect").value = C.node;
    const d = C.debug;
    $("debugTxt").textContent = "Node: " + C.node + " · patience " + Math.max(0, C.pat) + "/" + ph.patience + " · conviction " + C.conv + "%" +
      (d ? "\nLast reply: " + d.kind + (d.detail ? " (" + d.detail + ")" : "") +
        "\nQuoted back: " + (d.frag ? "“" + d.frag + "”" : "none") + " · echo word: " + (d.echo || "none") : "");
  }
}

function submit() {
  if (busy || !C || C.over) return;
  const raw = $("input").value.trim();
  if (!raw) return;
  $("input").value = "";
  addMsg({ who: "you", text: raw });
  show(C.respond(raw));
}

function end(result) {
  updateSide();
  $("composer").classList.add("hidden");
  const p = $("endPanel"); p.classList.remove("hidden"); p.innerHTML = "";
  const btn = (label, cls, fn) => { const b = document.createElement("button"); b.className = cls; b.textContent = label; b.onclick = fn; p.appendChild(b); };
  if (result === "win") {
    if (admin) addMsg({ who: "sys", text: "Admin mode: this win was not saved to your progress." });
    else store.recordWin(C.ph.id, C.turns);
    const next = PHILOSOPHERS[PHILOSOPHERS.indexOf(C.ph) + 1];
    if (next) btn("Next: " + next.name + " →", "btn", () => startTalk(next.id));
    else if (!admin && PHILOSOPHERS.every(p => store.isDone(p.id))) addMsg({ who: "sys", cls: "good", text: "You have convinced every philosopher on the timeline. Twenty-five centuries, argued down." });
  } else {
    btn("Try again", "btn", () => startTalk(C.ph.id));
  }
  btn("Back to timeline", "btn ghost", () => showView("map"));
}
