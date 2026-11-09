// Visitor count without a third party: every page load downloads one tiny, unchanging file
// attached to the GitHub release tagged "counter", and GitHub's public API reports how many
// times that file has been downloaded. The site is already served by GitHub Pages, so no new
// service sees the visit, and nothing is stored on the visitor's device. GitHub can take a
// while to update the count. If anything fails (e.g. the release is missing) the count stays hidden.
const REPO = "jartificer/Dialectica";
const TAG = "counter";
const FILE = "visits.txt";
export const HIT_URL = `https://github.com/${REPO}/releases/download/${TAG}/${FILE}`;
export const COUNT_URL = `https://api.github.com/repos/${REPO}/releases/tags/${TAG}`;

export async function showVisits(el, fetchImpl = globalThis.fetch, wrap = el) {
  if (!el || typeof fetchImpl !== "function") return null;
  const quiet = { credentials: "omit", referrerPolicy: "no-referrer", cache: "no-store" };
  // GitHub doesn't let other sites read the download, so it is sent "no-cors": it still counts.
  try { await fetchImpl(HIT_URL, { ...quiet, mode: "no-cors" }); } catch {}
  try {
    const res = await fetchImpl(COUNT_URL, { ...quiet, headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) return null;
    const release = await res.json();
    const asset = (release.assets || []).find(a => a.name === FILE);
    const value = asset && asset.download_count;
    if (!Number.isFinite(value)) return null;
    el.textContent = `${value.toLocaleString()} ${value === 1 ? "visit" : "visits"}`;
    wrap.classList.remove("hidden");
    return value;
  } catch {
    return null;
  }
}

if (typeof document !== "undefined") showVisits(document.getElementById("visits"), globalThis.fetch, document.getElementById("visitsWrap"));
