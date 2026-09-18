import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { TERMS_VERSION, LEGAL_LAST_UPDATED } from "@/lib/legal";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: `Terms of Service | ${SITE_NAME}`,
};

export default async function TermsPage() {
  const { home } = await getSettings();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-widest text-clay">Legal</p>
      <h1 className="mt-3 font-serif text-4xl text-charcoal">Terms of Service</h1>
      <p className="mt-2 text-sm text-charcoal-muted">
        Last updated {LEGAL_LAST_UPDATED} · Version {TERMS_VERSION}
      </p>

      <div className="mt-10 space-y-8 text-charcoal">
        <section>
          <h2 className="font-serif text-xl text-charcoal">Use of this site</h2>
          <p className="mt-2 text-charcoal-muted">
            This website is provided to share information about {SITE_NAME}&apos;s services and to let visitors
            request estimates or contact us. By using this site, you agree to provide accurate information in
            any form you submit and not to use the site for any unlawful purpose.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-charcoal">Estimates are not contracts</h2>
          <p className="mt-2 text-charcoal-muted">
            Information submitted through the estimate wizard or contact form is a request for a conversation,
            not a binding quote or agreement. Final pricing, scope, and timelines are established in a written
            proposal signed by both parties before any work begins.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-charcoal">No warranty on site content</h2>
          <p className="mt-2 text-charcoal-muted">
            While we try to keep information on this site accurate, project photos, pricing ranges, and
            timelines are provided for general reference and may not reflect current availability or costs.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-charcoal">Limitation of liability</h2>
          <p className="mt-2 text-charcoal-muted">
            {SITE_NAME} is not liable for any indirect, incidental, or consequential damages arising from your
            use of this website, to the fullest extent permitted by law.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-charcoal">Changes to these terms</h2>
          <p className="mt-2 text-charcoal-muted">
            We may update these terms from time to time. Continued use of the site after changes are posted
            constitutes acceptance of the revised terms.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-charcoal">Contact</h2>
          <p className="mt-2 text-charcoal-muted">Questions can be sent to {home.email} or {home.phone}.</p>
        </section>
      </div>
    </div>
  );
}
