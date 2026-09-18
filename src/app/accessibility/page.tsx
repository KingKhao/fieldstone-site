import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";
import { getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: `Accessibility | ${SITE_NAME}`,
};

export default async function AccessibilityPage() {
  const { home } = await getSettings();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-xs font-semibold uppercase tracking-widest text-clay">Legal</p>
      <h1 className="mt-3 font-serif text-4xl text-charcoal">Accessibility Statement</h1>
      <p className="mt-2 text-sm text-charcoal-muted">Last updated {LEGAL_LAST_UPDATED}</p>

      <div className="mt-10 space-y-8 text-charcoal">
        <section>
          <h2 className="font-serif text-xl text-charcoal">Our commitment</h2>
          <p className="mt-2 text-charcoal-muted">
            {SITE_NAME} is committed to making this website usable by as many people as possible, including
            people who use assistive technology such as screen readers or keyboard-only navigation.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-charcoal">What we&apos;ve built in</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-charcoal-muted">
            <li>Visible keyboard focus indicators throughout the site</li>
            <li>Before/after comparison sliders that are fully operable by keyboard (arrow keys, Home, End)</li>
            <li>Semantic headings and landmarks for screen reader navigation</li>
            <li>Text and background color combinations that meet WCAG AA contrast minimums</li>
            <li>Reduced-motion support for visitors who prefer minimal animation</li>
            <li>Descriptive alt text on meaningful images</li>
          </ul>
        </section>
        <section>
          <h2 className="font-serif text-xl text-charcoal">Ongoing work</h2>
          <p className="mt-2 text-charcoal-muted">
            Accessibility is an ongoing effort. If you encounter a barrier using this site, please let us know —
            we take reports seriously and will work to address them.
          </p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-charcoal">Contact</h2>
          <p className="mt-2 text-charcoal-muted">
            Reach us at {home.email} or {home.phone} to report an accessibility issue.
          </p>
        </section>
      </div>
    </div>
  );
}
