// Keeps a registration form's answers in this browser tab, so refreshing the page doesn't lose them.
// sessionStorage survives refresh and back/forward, and is cleared when the tab is closed, so answers
// aren't left behind on a shared computer. If storage is unavailable (e.g. private mode) the form
// simply works as before.

const PREFIX = "nexjyoti-draft:";
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

export function loadDraft(key) {
  try {
    const raw = window.sessionStorage.getItem(PREFIX + key);
    if (!raw) return null;
    const draft = JSON.parse(raw);
    if (!draft || typeof draft !== "object" || !(Date.now() - draft.savedAt < MAX_AGE_MS)) {
      clearDraft(key);
      return null;
    }
    return draft;
  } catch {
    return null;
  }
}

export function saveDraft(key, draft) {
  try {
    window.sessionStorage.setItem(PREFIX + key, JSON.stringify({ ...draft, savedAt: Date.now() }));
  } catch {
    // Storage full or blocked: nothing to do, the form keeps working without it.
  }
}

export function clearDraft(key) {
  try {
    window.sessionStorage.removeItem(PREFIX + key);
  } catch {
    // ignore
  }
}

/** Saved answers laid over the form's initial values, keeping only fields of the expected type. */
export function restoreAnswers(initial, saved) {
  const answers = { ...initial };
  if (!saved || typeof saved !== "object") return answers;
  Object.keys(initial).forEach((field) => {
    const value = saved[field];
    const sameType = Array.isArray(initial[field]) ? Array.isArray(value) : typeof value === typeof initial[field];
    if (field in saved && sameType) answers[field] = value;
  });
  return answers;
}

/** True if at least one answer has been given. */
export function hasAnswers(saved) {
  if (!saved || typeof saved !== "object") return false;
  return Object.values(saved).some((v) => (Array.isArray(v) ? v.length > 0 : typeof v === "string" ? v.trim() !== "" : v === true));
}
