// Sends a registration to the NexJyoti Hub (hub.nexjyoti.org) as well, where a lead or coordinator approves it and the
// applicant is invited to the Hub. The Hub's `apply` function checks the answers again, limits repeated submissions and
// emails the applicant a "we've received it" note. Firestore stays the record for now, so the form succeeds if either
// one saves it.

const HUB_APPLY_URL = import.meta.env.VITE_HUB_APPLY_URL || "https://saflssmkcsrwahexntkx.supabase.co/functions/v1/apply";
const TIMEOUT_MS = 10000;

export async function sendToHub(type, answers) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(HUB_APPLY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...answers, type }),
      signal: controller.signal,
      keepalive: true,
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(body.error || `Hub answered ${res.status}`);
    return body;
  } finally {
    clearTimeout(timer);
  }
}

/* Saves to Firestore and the Hub together. Resolves if at least one of them saved it; otherwise throws the Firestore
 * error (the one people are used to seeing). */
export async function saveRegistration(saveToFirestore, type, answers) {
  const [firestore, hub] = await Promise.allSettled([saveToFirestore(), sendToHub(type, answers)]);
  if (hub.status === "rejected") console.warn("Hub registration failed:", hub.reason?.message || hub.reason);
  if (firestore.status === "rejected") {
    console.error("Firestore submission error:", firestore.reason);
    if (hub.status === "rejected") throw firestore.reason;
  }
}
