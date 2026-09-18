import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { PRIVACY_POLICY_VERSION, LEGAL_LAST_UPDATED } from "@/lib/legal";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE_NAME}`,
};

export default async function PrivacyPage() {
  const { home } = await getSettings();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-widest text-clay">Legal</p>
      <h1 className="mt-3 font-serif text-4xl text-charcoal">Privacy Policy</h1>
      <p className="mt-2 text-sm text-charcoal-muted">
        Last updated {LEGAL_LAST_UPDATED} · Version {PRIVACY_POLICY_VERSION}
      </p>

      <div className="prose-legal mt-10 space-y-8 text-charcoal">
        <section>
          <h2 className="font-serif text-xl text-charcoal">Information we collect</h2>
          <p className="mt-2 text-charcoal-muted">
            When you request a free estimate or contact us through this site, we collect the information you
            provide directly: your name, email address, phone number, ZIP code, and any project details you
            share (project type, budget range, timeline, and message). We do not collect this information from
            any other source.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-charcoal">How we use it</h2>
          <p className="mt-2 text-charcoal-muted">
            We use the information you submit solely to respond to your estimate request or inquiry, schedule
            and manage your project if you become a client, and — only if you separately opt in — send project
            updates by text message. We do not sell, rent, or share your personal information with third parties
            for their marketing purposes.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-charcoal">SMS communications</h2>
          <p className="mt-2 text-charcoal-muted">
            If you check the box to receive text messages, we will send you texts related to your project.
            Message and data rates may apply, and message frequency varies. You can opt out at any time by
            replying STOP, or get help by replying HELP. Consent to receive texts is never a condition of any
            purchase or service.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-charcoal">Data retention & security</h2>
          <p className="mt-2 text-charcoal-muted">
            We retain lead and contact information for as long as reasonably necessary to respond to your
            inquiry and, if you become a client, to service your project. Data is stored in an access-controlled
            database; our admin dashboard requires authentication to view or manage any submitted information.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-charcoal">Your choices</h2>
          <p className="mt-2 text-charcoal-muted">
            You may ask us to access, correct, or delete the information we hold about you at any time by
            contacting us at {home.email}.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-charcoal">Contact</h2>
          <p className="mt-2 text-charcoal-muted">
            Questions about this policy can be sent to {home.email} or {home.phone}.
          </p>
        </section>
      </div>
    </div>
  );
}
