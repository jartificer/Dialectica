// Shared visitor count via Abacus (https://v2.jasoncameron.dev/abacus): free, no sign-up, no key.
// The first load in a browser tab adds one visit; reloads in that tab only read the total.
// If the service is unreachable the line simply stays hidden.
const COUNTER = "https://abacus.jasoncameron.dev";
const KEY = "dialectica/visits";
const SEEN = "dialectica.visitCounted";

export async function showVisits(el, fetchImpl = globalThis.fetch, wrap = el) {
  if (!el || typeof fetchImpl !== "function") return null;
  let counted = false;
  try { counted = sessionStorage.getItem(SEEN) === "1"; } catch {}
  try {
    const res = await fetchImpl(`${COUNTER}/${counted ? "get" : "hit"}/${KEY}`);
    if (!res.ok) return null;
    const { value } = await res.json();
    if (!Number.isFinite(value)) return null;
    try { sessionStorage.setItem(SEEN, "1"); } catch {}
    el.textContent = `${value.toLocaleString()} ${value === 1 ? "visit" : "visits"}`;
    wrap.classList.remove("hidden");
    return value;
  } catch {
    return null;
  }
}

if (typeof document !== "undefined") showVisits(document.getElementById("visits"), globalThis.fetch, document.getElementById("visitsWrap"));
