import React, { useEffect, useRef, useState } from "react";
import { STATES_AND_UTS, isValidPincode, lookupPincode } from "../utils/indiaLocation";

/*
 * PIN code, City / District and State fields for the registration forms.
 * Typing a valid PIN fills in City and State from India Post data; both stay editable, and a value
 * the person typed themselves is never overwritten.
 * `onChange` is the form's normal change handler; it receives { target: { name, value } }.
 */
export default function LocationFields({ idPrefix, data, errors, onChange }) {
  const [lookup, setLookup] = useState({ state: "idle", text: "" });
  const autoFilled = useRef({ city: "", state: "" }); // values the last lookup filled in
  const latest = useRef(data); // the lookup finishes later, so it reads the current values from here
  latest.current = data;

  const set = (name, value) => onChange({ target: { name, value } });

  // A field may be changed by a lookup only if it is empty or still holds what a lookup put there.
  const mayFill = (name) => !latest.current[name] || latest.current[name] === autoFilled.current[name];

  const fill = (name, value) => {
    if (!mayFill(name)) return;
    set(name, value);
    autoFilled.current[name] = value;
  };

  // Stops a previous PIN's city/state from standing when the new PIN can't be looked up.
  const clearAutoFilled = () => ["city", "state"].forEach((name) => { if (latest.current[name]) fill(name, ""); });

  useEffect(() => {
    const pin = String(data.pincode || "").trim();
    if (!isValidPincode(pin)) {
      setLookup({ state: "idle", text: "" });
      return undefined;
    }
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLookup({ state: "loading", text: "Looking up your PIN code…" });
      try {
        const found = await lookupPincode(pin, { signal: controller.signal });
        if (controller.signal.aborted) return;
        if (!found) {
          clearAutoFilled();
          setLookup({ state: "warn", text: "We couldn't find this PIN code. Please check it, or fill in your city and state below." });
          return;
        }
        if (found.city) fill("city", found.city);
        if (found.state) fill("state", found.state);
        const place = [found.city, found.state].filter(Boolean).join(", ");
        setLookup({ state: "ok", text: `Found: ${place}. You can change these below if they're not right.` });
      } catch {
        if (!controller.signal.aborted) {
          clearAutoFilled();
          setLookup({ state: "warn", text: "Couldn't look up the PIN code right now. Please fill in your city and state below." });
        }
      }
    }, 350);
    return () => { controller.abort(); clearTimeout(timer); };
    // Re-run only when the PIN changes; city/state are read at lookup time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.pincode]);

  const statusColor = { loading: "var(--text-muted)", ok: "#15803d", warn: "#b45309" }[lookup.state];

  return (
    <>
      <div className={`reg-field ${errors.pincode ? "reg-field-error" : ""}`}>
        <label className="reg-label" htmlFor={`${idPrefix}-pincode`}>
          PIN Code<span className="reg-required"> *</span>
        </label>
        <p className="reg-hint">Your 6-digit PIN code. We'll fill in your city and state from it.</p>
        <input id={`${idPrefix}-pincode`} className={`reg-input ${errors.pincode ? "input-error" : ""}`}
          type="text" inputMode="numeric" name="pincode" maxLength={6} autoComplete="postal-code"
          value={data.pincode} placeholder="e.g. 834001"
          onChange={(e) => set("pincode", e.target.value.replace(/\D/g, "").slice(0, 6))} />
        {lookup.text && (
          <p className="reg-hint" role="status" aria-live="polite" style={{ color: statusColor, marginTop: "6px" }}>
            {lookup.text}
          </p>
        )}
        {errors.pincode && <p className="reg-error" role="alert">{errors.pincode}</p>}
      </div>

      <div className="reg-grid-2">
        <div className={`reg-field ${errors.city ? "reg-field-error" : ""}`}>
          <label className="reg-label" htmlFor={`${idPrefix}-city`}>
            City / District<span className="reg-required"> *</span>
          </label>
          <input id={`${idPrefix}-city`} className={`reg-input ${errors.city ? "input-error" : ""}`}
            type="text" name="city" value={data.city} onChange={onChange}
            placeholder="e.g. Ranchi" autoComplete="address-level2" />
          {errors.city && <p className="reg-error" role="alert">{errors.city}</p>}
        </div>
        <div className={`reg-field ${errors.state ? "reg-field-error" : ""}`}>
          <label className="reg-label" htmlFor={`${idPrefix}-state`}>
            State / Union Territory<span className="reg-required"> *</span>
          </label>
          <select id={`${idPrefix}-state`} className={`reg-input ${errors.state ? "input-error" : ""}`}
            name="state" value={data.state} onChange={onChange} autoComplete="address-level1">
            <option value="">Select your state…</option>
            {STATES_AND_UTS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.state && <p className="reg-error" role="alert">{errors.state}</p>}
        </div>
      </div>
    </>
  );
}
