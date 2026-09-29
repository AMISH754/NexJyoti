// India PIN code lookup and the lists behind the City / State and Blood Group fields.

// 28 states and 8 union territories (official names).
export const STATES_AND_UTS = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi",
  "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

export const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Don't know"];

const PIN_PATTERN = /^[1-9]\d{5}$/;
export const isValidPincode = (pin) => PIN_PATTERN.test(String(pin || "").trim());

const key = (s) => String(s || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z]/g, "");

// The PIN code service still uses some old or misspelt names.
const STATE_ALIASES = {
  andamanandnicobar: "Andaman and Nicobar Islands",
  pondicherry: "Puducherry",
  chattisgarh: "Chhattisgarh",
  orissa: "Odisha",
  uttaranchal: "Uttarakhand",
  damananddiu: "Dadra and Nagar Haveli and Daman and Diu",
  dadraandnagarhaveli: "Dadra and Nagar Haveli and Daman and Diu",
  nctofdelhi: "Delhi",
  newdelhi: "Delhi",
};
const LADAKH_DISTRICTS = ["leh", "kargil", "lehladakh"];

/** Maps a state name from the PIN code service to one of STATES_AND_UTS ("" if it can't). */
export function normalizeState(state, district) {
  const k = key(state);
  // Leh and Kargil have been in Ladakh since 2019; the service still lists them under Jammu & Kashmir.
  if (k === "jammuandkashmir" && LADAKH_DISTRICTS.includes(key(district))) return "Ladakh";
  if (STATE_ALIASES[k]) return STATE_ALIASES[k];
  return STATES_AND_UTS.find((s) => key(s) === k) || "";
}

/**
 * Looks up a 6-digit PIN code with the free India Post data service (api.postalpincode.in).
 * Resolves to { city, state } (either may be "" if unknown), or null if the PIN has no records.
 * Rejects on network errors or timeout, so callers can ask the person to type the details instead.
 */
export async function lookupPincode(pin, { signal, timeoutMs = 8000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  signal?.addEventListener("abort", () => controller.abort());
  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${String(pin).trim()}`, { signal: controller.signal });
    if (!res.ok) throw new Error(`PIN lookup failed (${res.status})`);
    const [result] = await res.json();
    const offices = result?.Status === "Success" ? result.PostOffice || [] : [];
    if (!offices.length) return null;

    // Most post offices under one PIN share a district; take the most common one.
    const counts = {};
    offices.forEach((o) => { if (o.District) counts[o.District] = (counts[o.District] || 0) + 1; });
    const city = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0] || "";
    const office = offices.find((o) => o.District === city) || offices[0];
    return { city, state: normalizeState(office.State, office.District) };
  } finally {
    clearTimeout(timer);
  }
}
