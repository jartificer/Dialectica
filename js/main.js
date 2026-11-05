/* Entry point: restore settings, load the philosophers, start the UI. */
import { loadPhilosophers } from "./registry.js";
import { loadProgress, loadTheme } from "./storage.js";
import { initUI } from "./ui.js";

const theme = loadTheme();
if (theme) document.documentElement.setAttribute("data-theme", theme);
loadProgress();

const philosophers = await loadPhilosophers();
initUI(philosophers);
window.__dialecticaBooted = true;
