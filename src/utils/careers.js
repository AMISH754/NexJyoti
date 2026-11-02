// The careers page talks to the NexJyoti Hub (hub.nexjyoti.org), where HR and Leadership post openings and review
// applications. The Hub's `careers` function lists the open roles and receives applications with the résumé and photo;
// the files go to the Hub's private storage, never to Cloudinary or Firestore.

const CAREERS_URL = import.meta.env.VITE_HUB_CAREERS_URL || "https://saflssmkcsrwahexntkx.supabase.co/functions/v1/careers";

export const MAX_RESUME = 2 * 1024 * 1024;
export const MAX_PHOTO = 1024 * 1024;

export const ENGAGEMENTS = {
  "full-time": { label: "Full-time", paid: true },
  "part-time": { label: "Part-time", paid: true },
  consultant: { label: "Consultant", paid: true },
  "paid-intern": { label: "Paid internship", paid: true },
  "unpaid-intern": { label: "Unpaid internship", paid: false },
};
export const MODES = { "on-site": "On-site", remote: "Remote", hybrid: "Hybrid" };

export async function fetchOpenings() {
  const res = await fetch(CAREERS_URL, { headers: { accept: "application/json" } });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "Could not load the openings");
  return body.openings || [];
}

/* Sends an application: a FormData with the answers, `resume` and optionally `photo`. Resolves to the result
 * ("received", "updated" or "in_progress"), or throws an Error with a message to show. */
export async function sendApplication(form) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 45000);
  try {
    const res = await fetch(CAREERS_URL, { method: "POST", body: form, signal: controller.signal });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.error || "Could not send your application. Please try again.");
    return body.result;
  } catch (e) {
    if (e.name === "AbortError") throw new Error("This is taking too long. Please check your connection and try again.");
    throw e;
  } finally {
    clearTimeout(timer);
  }
}

/* A photo made smaller on the phone first (longest side 900px, JPEG), so it uploads fast and fits the 1 MB limit. */
export async function shrinkPhoto(file) {
  if (!file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 900 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.85));
    return blob ? new File([blob], "photo.jpg", { type: "image/jpeg" }) : file;
  } catch {
    return file;
  }
}

export const formatDate = (ymd) => (ymd
  ? new Date(`${ymd}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
  : "");

/* An offer letter for /careers/offer/<token>, or throws with a message to show. */
export async function fetchOffer(token) {
  const res = await fetch(`${CAREERS_URL}?offer=${encodeURIComponent(token)}`, { headers: { accept: "application/json" }, cache: "no-store" });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "Could not load the offer");
  return body.offer;
}

/* The candidate's answer: accept (with their typed name) or decline. Resolves to "accepted" or "declined". */
export async function answerOffer(token, { accept, name, note }) {
  const res = await fetch(CAREERS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "respond", token, accept, name, note }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || "Could not save your answer. Please try again.");
  return body.result;
}
