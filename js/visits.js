// Shared visitor count via Abacus (https://v2.jasoncameron.dev/abacus): free, no sign-up, no key.
// Nothing is stored on the visitor's device: every page load adds one and returns the total.
// The request carries no cookies or identifiers, though Abacus necessarily sees the visitor's IP
// address; the footnote says so. If the service is unreachable the count simply stays hidden.
const URL = "https://abacus.jasoncameron.dev/hit/dialectica/visits";

export async function showVisits(el, fetchImpl = globalThis.fetch, wrap = el) {
  if (!el || typeof fetchImpl !== "function") return null;
  try {
    const res = await fetchImpl(URL, { credentials: "omit", referrerPolicy: "no-referrer" });
    if (!res.ok) return null;
    const { value } = await res.json();
    if (!Number.isFinite(value)) return null;
    el.textContent = `${value.toLocaleString()} ${value === 1 ? "visit" : "visits"}`;
    wrap.classList.remove("hidden");
    return value;
  } catch {
    return null;
  }
}

if (typeof document !== "undefined") showVisits(document.getElementById("visits"), globalThis.fetch, document.getElementById("visitsWrap"));
