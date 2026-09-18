"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const field =
    "w-full rounded-md border border-stone-line bg-white px-4 py-3 text-charcoal placeholder:text-charcoal-muted focus:border-clay focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";

  if (done) {
    return (
      <div className="rounded-2xl border border-stone-line bg-white p-8 text-center shadow-sm" role="status">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-clay/10 text-clay">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <h3 className="mt-4 font-serif text-2xl text-charcoal">Message sent</h3>
        <p className="mt-2 text-charcoal-muted">Thanks for reaching out — we&apos;ll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form
      className="rounded-2xl border border-stone-line bg-white p-6 shadow-sm sm:p-8"
      onSubmit={async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        try {
          const res = await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, phone, message, source: "contact-page", companyWebsite }),
          });
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
      }}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="cf-name" className="mb-1 block text-sm font-medium text-charcoal">Name</label>
          <input id="cf-name" required value={name} onChange={(e) => setName(e.target.value)} className={field} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="cf-email" className="mb-1 block text-sm font-medium text-charcoal">Email</label>
            <input id="cf-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
          </div>
          <div>
            <label htmlFor="cf-phone" className="mb-1 block text-sm font-medium text-charcoal">Phone</label>
            <input id="cf-phone" type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className={field} />
          </div>
        </div>
        <div>
          <label htmlFor="cf-message" className="mb-1 block text-sm font-medium text-charcoal">How can we help?</label>
          <textarea id="cf-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className={field} placeholder="Tell us a bit about your project or question…" />
        </div>
      </div>

      {/* Honeypot */}
      <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="cf-company-website">Leave this field empty</label>
        <input id="cf-company-website" type="text" tabIndex={-1} autoComplete="off" value={companyWebsite} onChange={(e) => setCompanyWebsite(e.target.value)} />
      </div>

      {error && <p className="mt-4 text-sm text-error" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-full bg-clay px-6 py-3 font-semibold text-paper transition-colors hover:bg-clay-dark disabled:opacity-50"
      >
        {submitting ? "Sending…" : "Send Message"}
      </button>
      <p className="mt-4 text-center text-xs text-charcoal-muted">
        By submitting, you agree to our{" "}
        <Link href="/terms" className="underline hover:text-charcoal">Terms</Link> and{" "}
        <Link href="/privacy" className="underline hover:text-charcoal">Privacy Policy</Link>.
      </p>
    </form>
  );
}
