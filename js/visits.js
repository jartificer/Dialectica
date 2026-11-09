// Silent visit counter, nothing shown on the page. Every page load downloads one tiny,
// unchanging file attached to the GitHub release tagged "counter"; GitHub tallies the
// file's downloads, which the site owner reads from the API. The site is already served
// by GitHub Pages, so no new service sees the visit, and nothing is stored on the device.
const REPO = "jartificer/Dialectica";
export const HIT_URL = `https://github.com/${REPO}/releases/download/counter/visits.txt`;

export function recordVisit(fetchImpl = globalThis.fetch) {
  if (typeof fetchImpl !== "function") return Promise.resolve(false);
  // GitHub doesn't let other sites read the download, so it is sent "no-cors": it still counts.
  return Promise.resolve()
    .then(() => fetchImpl(HIT_URL, { mode: "no-cors", credentials: "omit", referrerPolicy: "no-referrer", cache: "no-store" }))
    .then(() => true, () => false);
}

if (typeof document !== "undefined") recordVisit();
