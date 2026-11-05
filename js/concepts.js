/* Shared concept lexicon.
   A pattern "@name" in any philosopher's `need` list expands to every entry here.
   Philosopher files may add their own concepts under `concepts: {...}`; those are
   merged over these for that philosopher only. */
export const CONCEPTS = {
  neg: ["not", "no", "never", "cannot", "nothing", "neither", "nor", "without", "impossible", "none"],
  fire: ["fire", "flame*", "burn*", "heat", "hot", "blaze", "ember*", "sun", "lava"],
  air: ["air", "wind", "breath", "mist", "vapour", "vapor", "sky"],
  earth: ["earth", "soil", "dirt", "ground", "stone*", "rock*", "land", "sand", "dust", "clay", "metal*", "iron", "bronze"],
  same: ["same", "permanent*", "constant*", "unchang*", "unchanging", "stable", "endur*", "eternal", "fixed", "persist*", "forever", "always", "stays", "remain*", "everlasting", "timeless"],
  contradict: ["contradict*", "inconsistent", "paradox*", "self-refut*", "selfrefut*", "refutes itself", "defeat*", "undermine*", "absurd", "incoheren*", "hypocri*", "circular"],
  truth: ["true", "truth", "fact", "facts", "objective*", "absolute*", "real", "reality", "correct"],
  change: ["chang*", "becom*", "motion", "move*", "moving", "movement", "grow*", "alter*", "process*", "transform*", "flux", "flow*"],
  exist: ["exist*", "real", "reality", "actual*", "out there", "outside the mind", "in reality"]
};
