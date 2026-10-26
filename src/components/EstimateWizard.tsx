"use client";

import { useState } from "react";
import Link from "next/link";
import { SMS_CONSENT_VERSION } from "@/lib/legal";

const PROJECT_TYPES = [
  { value: "KITCHEN", label: "Kitchen", icon: "🍳" },
  { value: "BATHROOM", label: "Bathroom", icon: "🛁" },
  { value: "ADDITION", label: "Addition", icon: "🏗️" },
  { value: "WHOLE_HOME", label: "Whole-home", icon: "🏠" },
  { value: "OTHER", label: "Something else", icon: "✨" },
] as const;

const BUDGETS = ["Under $15,000", "$15,000–$35,000", "$35,000–$75,000", "$75,000+", "Not sure yet"];
const TIMELINES = ["ASAP", "Within 3 months", "3–6 months", "6–12 months", "Just researching"];

type ProjectType = (typeof PROJECT_TYPES)[number]["value"];

const TOTAL_STEPS = 4;

export default function EstimateWizard({ source = "estimate-wizard" }: { source?: string }) {
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState<ProjectType | null>(null);
  const [budgetRange, setBudgetRange] = useState("");
  const [timeline, setTimeline] = useState("");
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [companyWebsite, setCompanyWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const next = () => setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const canAdvanceFrom1 = projectType !== null;
  const canAdvanceFrom2 = budgetRange !== "" && timeline !== "";
  const canSubmit = name.trim() !== "" && email.trim() !== "" && phone.trim() !== "";

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = { ok: true, json: async () => ({ error: "", demo: true }) }; // Local simulation: no request and no persistence.
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-2xl border border-stone-line bg-white p-8 text-center shadow-sm" role="status">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-clay/10 text-clay">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-4 font-serif text-2xl text-charcoal">Demo request complete</h3>
        <p className="mt-2 text-charcoal-muted">
          Demo complete. Nothing was sent or saved, and no real estimate or callback was requested.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-md border border-stone-line bg-white px-4 py-3 text-charcoal placeholder:text-charcoal-muted focus:border-clay focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";

  return (
    <div className="rounded-2xl border border-stone-line bg-white p-6 shadow-sm sm:p-8">
      <p className="mb-4 text-sm text-charcoal-muted">Demo only. Use fictional details; nothing is sent, saved or subscribed.</p>
      {/* Progress */}
      <div className="mb-6 flex items-center gap-2" aria-hidden="true">
        {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i < step ? "bg-clay" : "bg-stone-line"}`} />
        ))}
      </div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-charcoal-muted">
        Step {step} of {TOTAL_STEPS}
      </p>

      {step === 1 && (
        <div>
          <h3 className="font-serif text-xl text-charcoal">What kind of project is this?</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {PROJECT_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setProjectType(t.value)}
                aria-pressed={projectType === t.value}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 px-3 py-5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay ${
                  projectType === t.value ? "border-clay bg-clay/5 text-clay-dark" : "border-stone-line text-charcoal hover:border-clay/40"
                }`}
              >
                <span className="text-2xl" aria-hidden="true">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={next}
            disabled={!canAdvanceFrom1}
            className="mt-6 w-full rounded-full bg-clay px-6 py-3 font-semibold text-paper transition-colors hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 className="font-serif text-xl text-charcoal">A bit about scope</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-charcoal">Rough budget range</label>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudgetRange(b)}
                    aria-pressed={budgetRange === b}
                    className={`rounded-full border-2 px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay ${
                      budgetRange === b ? "border-clay bg-clay/5 text-clay-dark" : "border-stone-line text-charcoal hover:border-clay/40"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-charcoal">Timeline</label>
              <div className="flex flex-wrap gap-2">
                {TIMELINES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimeline(t)}
                    aria-pressed={timeline === t}
                    className={`rounded-full border-2 px-4 py-2 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay ${
                      timeline === t ? "border-clay bg-clay/5 text-clay-dark" : "border-stone-line text-charcoal hover:border-clay/40"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="ew-zip" className="mb-1 block text-sm font-medium text-charcoal">ZIP code (optional)</label>
              <input id="ew-zip" value={zip} onChange={(e) => setZip(e.target.value)} className={field} placeholder="37902" />
            </div>
            <div>
              <label htmlFor="ew-message" className="mb-1 block text-sm font-medium text-charcoal">Tell us a bit more (optional)</label>
              <textarea id="ew-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={3} className={field} placeholder="e.g. Opening up a galley kitchen, adding an island…" />
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={back} className="rounded-full border border-stone-line px-6 py-3 font-semibold text-charcoal hover:bg-stone">
              Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canAdvanceFrom2}
              className="flex-1 rounded-full bg-clay px-6 py-3 font-semibold text-paper transition-colors hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 className="font-serif text-xl text-charcoal">How should we reach you?</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="ew-name" className="mb-1 block text-sm font-medium text-charcoal">Name</label>
              <input id="ew-name" required value={name} onChange={(e) => setName(e.target.value)} className={field} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="ew-email" className="mb-1 block text-sm font-medium text-charcoal">Email</label>
                <input id="ew-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
              </div>
              <div>
                <label htmlFor="ew-phone" className="mb-1 block text-sm font-medium text-charcoal">Phone</label>
                <input id="ew-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className={field} />
              </div>
            </div>
            <label className="flex items-start gap-2 text-xs text-charcoal-muted">
              <input
                type="checkbox"
                checked={smsConsent}
                onChange={(e) => setSmsConsent(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-stone-line"
              />
              <span>
                I agree to receive text messages about my project from Fieldstone Kitchen &amp; Bath Co. Message &amp; data rates may apply. Message frequency varies. Reply STOP to cancel, HELP for help. Consent isn&apos;t a condition of any purchase.
              </span>
            </label>
          </div>
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={back} className="rounded-full border border-stone-line px-6 py-3 font-semibold text-charcoal hover:bg-stone">
              Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canSubmit}
              className="flex-1 rounded-full bg-clay px-6 py-3 font-semibold text-paper transition-colors hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              Review request
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h3 className="font-serif text-xl text-charcoal">Review &amp; send</h3>
          <dl className="mt-4 divide-y divide-stone-line rounded-lg border border-stone-line text-sm">
            {[
              ["Project", PROJECT_TYPES.find((t) => t.value === projectType)?.label],
              ["Budget", budgetRange],
              ["Timeline", timeline],
              ["Contact", `${name} · ${email} · ${phone}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-4 py-3">
                <dt className="text-charcoal-muted">{k}</dt>
                <dd className="text-right font-medium text-charcoal">{v}</dd>
              </div>
            ))}
          </dl>

          {/* Honeypot — invisible to real visitors. */}
          <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="ew-company-website">Leave this field empty</label>
            <input
              id="ew-company-website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={companyWebsite}
              onChange={(e) => setCompanyWebsite(e.target.value)}
            />
          </div>

          {error && (
            <p className="mt-4 text-sm text-error" role="alert">{error}</p>
          )}

          <div className="mt-6 flex gap-3">
            <button type="button" onClick={back} className="rounded-full border border-stone-line px-6 py-3 font-semibold text-charcoal hover:bg-stone">
              Back
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={submitting}
              className="flex-1 rounded-full bg-clay px-6 py-3 font-semibold text-paper transition-colors hover:bg-clay-dark disabled:opacity-50"
            >
              {submitting ? "Sending…" : "Preview my request"}
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-charcoal-muted">
            This local preview sends nothing. Read our{" "}
            <Link href="/terms" className="underline hover:text-charcoal">Terms</Link> and{" "}
            <Link href="/privacy" className="underline hover:text-charcoal">Privacy Policy</Link>.
          </p>
        </div>
      )}
    </div>
  );
}
