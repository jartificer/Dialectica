/* Entry point: restore settings, load the philosophers, start the UI. */
import { loadPhilosophers } from "./registry.js";
import { loadProgress, loadTheme } from "./storage.js";
import { initUI } from "./ui.js";
import { loadPortraits } from "./portraits.js";

const theme = loadTheme();
if (theme) document.documentElement.setAttribute("data-theme", theme);
loadProgress();

const philosophers = await loadPhilosophers();
await loadPortraits(philosophers);
initUI(philosophers);
window.__dialecticaBooted = true;
